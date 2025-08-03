import { ethers, Interface, Signature, id } from 'ethers';
import * as Sdk from 'cross-chain-sdk-custom';
import { Address } from 'cross-chain-sdk-custom';
import EscrowFactoryContract from './abi/factory.json';
import ResolverContract from './abi/resolver.json';

/**
 * Order interface compatible with our relayer's Order type
 */
export interface RelayerOrder {
  id: string;
  order: {
    amount?: string;
    asset?: string;
    destination?: string;
    [key: string]: any;
  };
  signature?: string;
  [key: string]: any;
}

/**
 * Resolver class for interacting with the EVM Resolver contract
 * Based on evm_contract/tests/resolver.ts
 */
export class EvmResolver {
  private readonly iface: Interface;

  constructor(
    private readonly srcAddress: string,
    private readonly dstAddress: string,
    resolverAbi: any[]
  ) {
    this.iface = new Interface(ResolverContract.abi);
  }

  /**
   * Convert Immutables to array format for ethers encoding
   * Based on Solidity struct: (bytes32,bytes32,uint256,uint256,uint256,uint256,uint256,uint256)
   * Note: Only 8 fields, no extra bytes parameter
   */
  private immutablesToArray(immutables: Sdk.Immutables): any[] {
    // Get the built immutables to access the correct timelocks format
    const builtImmutables = immutables.build();
    
    return [
      immutables.orderHash,                    // bytes32 orderHash
      immutables.hashLock.toString(),         // bytes32 hashlock (use public method)
      immutables.maker.toString(),            // address maker (uint256 format)
      immutables.taker.toString(),            // address taker (uint256 format)  
      immutables.token.toString(),            // address token (uint256 format)
      immutables.amount.toString(),           // uint256 amount
      immutables.safetyDeposit.toString(),    // uint256 safetyDeposit
      builtImmutables.timelocks               // uint256 timelocks (from build() method)
      // No extra bytes parameter - only 8 fields total
    ];
  }

  public deploySrc(
    chainId: number,
    order: Sdk.CrossChainOrder,
    signature: string,
    takerTraits: Sdk.TakerTraits,
    amount: bigint,
    hashLock = order.escrowExtension.hashLockInfo
  ): ethers.TransactionRequest {
    const { r, yParityAndS: vs } = Signature.from(signature);
    const { args, trait } = takerTraits.encode();
    const immutables = order.toSrcImmutables(chainId, new Address(this.srcAddress), amount, hashLock);

    return {
      to: this.srcAddress,
      data: this.iface.encodeFunctionData('deploySrc', [
        immutables.build(),
        order.build(),
        r,
        vs,
        amount,
        trait,
        args
      ]),
      value: order.escrowExtension.srcSafetyDeposit
    };
  }

  public deployDst(
    immutables: Sdk.Immutables
  ): ethers.TransactionRequest {
    return {
      to: this.dstAddress,
      data: this.iface.encodeFunctionData('deployDst', [
        this.immutablesToArray(immutables),
        immutables.timeLocks.toSrcTimeLocks().privateCancellation
      ]),
      value: immutables.safetyDeposit
    };
  }

  public withdraw(
    side: 'src' | 'dst',
    escrow: Address,
    secret: string,
    immutables: Sdk.Immutables
  ): ethers.TransactionRequest {
    return {
      to: side === 'src' ? this.srcAddress : this.dstAddress,
      data: this.iface.encodeFunctionData('withdraw', [escrow.toString(), secret, this.immutablesToArray(immutables)])
    };
  }

  public cancel(side: 'src' | 'dst', escrow: Address, immutables: Sdk.Immutables): ethers.TransactionRequest {
    return {
      to: side === 'src' ? this.srcAddress : this.dstAddress,
      data: this.iface.encodeFunctionData('cancel', [escrow.toString(), this.immutablesToArray(immutables)])
    };
  }
}

/**
 * Convert RelayerOrder to SDK CrossChainOrder
 * This is a simplified conversion - in production, you'll need more sophisticated mapping
 */
export function convertToSdkOrder(
  relayerOrder: RelayerOrder,
  escrowFactory: Address,
  srcChainId: number,
  dstChainId: number,
  fillAmount?: string
): Sdk.CrossChainOrder {
  // Default values - these should be properly configured based on your use case
  const defaultTimestamp = BigInt(Math.floor(Date.now() / 1000));
  
  // Use fillAmount if provided, otherwise use default amounts
  const makingAmount = fillAmount ? BigInt(fillAmount) : BigInt(relayerOrder.order.makingAmount || '100000000');
  const takingAmount = BigInt(relayerOrder.order.takingAmount || String(makingAmount * 99n / 100n)); // Default to 99% of making amount
  console.log('relayerOrder', JSON.stringify(relayerOrder, null, 2));
  return Sdk.CrossChainOrder.new(
    escrowFactory,
    {
      salt: Sdk.randBigInt(1000n),
      maker: new Address(relayerOrder.order.maker || '0x0000000000000000000000000000000000000000'),
      makingAmount,
      takingAmount,
      makerAsset: new Address(relayerOrder.order.makerAsset || '0x0000000000000000000000000000000000000000'),
      takerAsset: new Address(relayerOrder.order.takerAsset || '0x0000000000000000000000000000000000000000'),
      receiver: new Address(relayerOrder.order.receiver || '0x0000000000000000000000000000000000000000')
    },
    {
      hashLock: Sdk.HashLock.forSingleFill('0x' + '00'.repeat(32)), // Default secret
      timeLocks: Sdk.TimeLocks.new({
        srcWithdrawal: 10n,
        srcPublicWithdrawal: 120n,
        srcCancellation: 121n,
        srcPublicCancellation: 122n,
        dstWithdrawal: 10n,
        dstPublicWithdrawal: 100n,
        dstCancellation: 101n
      }),
      srcChainId,
      dstChainId,
      srcSafetyDeposit: ethers.parseEther('0.001'),
      dstSafetyDeposit: ethers.parseEther('0.001')
    },
    {
      auction: new Sdk.AuctionDetails({
        initialRateBump: 0,
        points: [],
        duration: 120n,
        startTime: defaultTimestamp
      }),
      whitelist: [
        {
          address: new Address(relayerOrder.order.resolver || '0x0000000000000000000000000000000000000000'),
          allowFrom: 0n
        }
      ],
      resolvingStartTime: 0n
    },
    {
      nonce: Sdk.randBigInt(1000000000n),
      allowPartialFills: false,
      allowMultipleFills: false
    }
  );
}

/**
 * Enhanced EVM interaction using the SDK-based resolver
 */
export class SdkEvmInteraction {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private resolver: EvmResolver;

  // Contract ABIs
  private resolverAbi = [
    'function deploySrc((bytes32,bytes32,uint256,uint256,uint256,uint256,uint256,uint256,bytes) immutables, (uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256) order, bytes32 r, bytes32 vs, uint256 amount, uint256 takerTraits, bytes args) external payable',
    'function deployDst((bytes32,bytes32,uint256,uint256,uint256,uint256,uint256,uint256,bytes) dstImmutables, uint256 srcCancellationTimestamp) external payable',
    'function withdraw(address escrow, bytes32 secret, (bytes32,bytes32,uint256,uint256,uint256,uint256,uint256,uint256,bytes) immutables) external',
    'function cancel(address escrow, (bytes32,bytes32,uint256,uint256,uint256,uint256,uint256,uint256,bytes) immutables) external'
  ];

  // Factory contract ABI for events - based on actual contract
  private factoryAbi = [
    'event SrcEscrowCreated((bytes32,bytes32,address,address,address,uint256,uint256,uint256,bytes) srcImmutables, (address,uint256,address,uint256,uint256,bytes) dstImmutablesComplement)'
  ];

  constructor(
    rpcUrl: string, 
    private privateKey: string, 
    private factoryAddress: string, 
    resolverAddress: string, 
    lopAddress: string
  ) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.resolver = new EvmResolver(resolverAddress, resolverAddress, this.resolverAbi);
  }

  /**
   * Get the source implementation address from the factory contract
   */
  public async getSourceImpl(): Promise<Sdk.Address> {
    return Sdk.Address.fromBigInt(
      BigInt(
        await this.provider.call({
          to: this.factoryAddress,
          data: id('ESCROW_SRC_IMPLEMENTATION()').slice(0, 10)
        })
      )
    );
  }

  /**
   * Get the destination implementation address from the factory contract
   */
  public async getDestinationImpl(): Promise<Sdk.Address> {
    return Sdk.Address.fromBigInt(
      BigInt(
        await this.provider.call({
          to: this.factoryAddress,
          data: id('ESCROW_DST_IMPLEMENTATION()').slice(0, 10)
        })
      )
    );
  }

  /**
   * Get SrcEscrowCreated event from a specific block (like main.spec.ts)
   */
  public async getSrcDeployEvent(blockHash: string): Promise<[Sdk.Immutables, Sdk.DstImmutablesComplement]> {
    const factoryInterface = new Interface(EscrowFactoryContract.abi)
    const event = factoryInterface.getEvent('SrcEscrowCreated')!;
    
    console.log(`Querying SrcEscrowCreated events for blockHash ${blockHash}`);
    console.log(`Factory address: ${this.factoryAddress}`);
    console.log(`Event topic: ${event.topicHash}`);
    
    const logs = await this.provider.getLogs({
      blockHash: blockHash,
      address: this.factoryAddress,
      topics: [event.topicHash]
    });

    console.log(`Found ${logs.length} SrcEscrowCreated events in blockHash ${blockHash}`);

    if (logs.length === 0) {
      throw new Error(`No SrcEscrowCreated event found in blockHash ${blockHash}. Factory: ${this.factoryAddress}`);
    }

    const [data] = logs.map((l) => factoryInterface.decodeEventLog(event, l.data, l.topics));
    console.log('Decoded event data:', data);

    const srcImmutables = data.srcImmutables; // Access by name instead of array index
    const dstImmutablesComplement = data.dstImmutablesComplement;

    return [
      Sdk.Immutables.new({
        orderHash: srcImmutables[0],
        hashLock: Sdk.HashLock.fromString(srcImmutables[1]),
        maker: Sdk.Address.fromBigInt(srcImmutables[2]),
        taker: Sdk.Address.fromBigInt(srcImmutables[3]),
        token: Sdk.Address.fromBigInt(srcImmutables[4]),
        amount: srcImmutables[5],
        safetyDeposit: srcImmutables[6],
        timeLocks: Sdk.TimeLocks.fromBigInt(srcImmutables[7])
        // Note: srcImmutables[8] is bytes parameters, which we skip for now
      }),
      Sdk.DstImmutablesComplement.new({
        maker: Sdk.Address.fromBigInt(dstImmutablesComplement[0]),
        amount: dstImmutablesComplement[1],
        token: Sdk.Address.fromBigInt(dstImmutablesComplement[2]),
        safetyDeposit: dstImmutablesComplement[3]
        // Note: dstImmutablesComplement[4] is chainId, dstImmutablesComplement[5] is bytes parameters
      })
    ];
  }

  /**
   * Deploy source escrow using SDK
   */
  async deploySrcEscrow(params: {
    relayerOrder: RelayerOrder;
    srcChainId: number;
    dstChainId: number;
    escrowFactory: string;
    amount: string;
  }): Promise<{ 
    txHash: string; 
    srcEscrowAddress?: string; 
    srcImmutables?: Sdk.Immutables;
    dstImmutablesComplement?: Sdk.DstImmutablesComplement;
  }> {
    try {
      // Use a reasonable default amount if auction price is 0 or not set
      const requestedAmount = params.amount && params.amount !== '0' ? params.amount : '100000000'; // 100 USDC default
      


      // Get transaction request
      // const txRequest = {
      //   to: '0x6d515828112Fe62fc38da6B58A888bEDe6E4F38f',
      //   data: '0xca218276a0de54da36492141c5a8a325e0693c47328ca2bb3513f21cc960e646776a199fcbc8b166ef846e6f175449553a6c6fbe9f2d4da05762c0a35a7dcf079f2d69f0000000000000000000000000839c3c382c3a81b1740de510890fa4b9ff5c8cc30000000000000000000000006d515828112fe62fc38da6b58a888bede6e4f38f0000000000000000000000007169d38820dfd117c3fa1f22a697dba58d90ba0600000000000000000000000000000000000000000000000000000000000f424000000000000000000000000000000000000000000000000000038d7ea4c680000000000000000065000000640000000a0000007a00000079000000780000000a0000000000000000000000855089bbfa11a683689e5d788759540c1e019b1dae000000000000000000000000839c3c382c3a81b1740de510890fa4b9ff5c8cc30000000000000000000000009e987ff67f92178f10179f8b68ebf74ab72b37da0000000000000000000000007169d38820dfd117c3fa1f22a697dba58d90ba06000000000000000000000000da0000d4000015a526378bb6fafc650cea5966f800000000000000000000000000000000000000000000000000000000000f424000000000000000000000000000000000000000000000000000000000000f1b308a0000000000000000000000d9c7587b7100688f0f8c000000000000000000008a0f14051a3753094e54ec7a4e65cd405488b9be4b194ed14efb356bea9583e12a8128d2093a5ac09427973edcee925b0b923db32f18cc79cd6b908277bffb2100000000000000000000000000000000000000000000000000000000000f42408000012f000000000000000000000000000000000000000000000000000f1b3000000000000000000000000000000000000000000000000000000000000002a0000000000000000000000000000000000000000000000000000000000000012f0000010f0000004a0000004a0000004a0000004a000000250000000000000000198d8047490317707b186a4de727ca3e13b1bd7800000000000000688f0f08000078000000198d8047490317707b186a4de727ca3e13b1bd7800000000000000688f0f08000078000000198d8047490317707b186a4de727ca3e13b1bd7800000000a6b58a888bede6e4f38f000008cbc8b166ef846e6f175449553a6c6fbe9f2d4da05762c0a35a7dcf079f2d69f00000000000000000000000000000000000000000000000000000000000000038000000000000000000000000f2a6dbde21fa81896948714f3921839cca420c91000000000000000000038d7ea4c68000000000000000000000038d7ea4c680000000000000000065000000640000000a0000007a00000079000000780000000a0000000000000000000000000000000000',
      //   value: 1000000000000000n
      // };
      const txRequest = {
        to: params.relayerOrder.order.deploySrc.to,
        data: params.relayerOrder.order.deploySrc.data,
        value: params.relayerOrder.order.deploySrc.value
      }

      // Send transaction with reasonable gas parameters
      const tx = await this.wallet.sendTransaction({
        ...txRequest,
        gasLimit: 2_000_000n,  // Reduced from 10M to 2M (still plenty for most transactions)
        maxFeePerGas: 50_000_000_000n, // 50 gwei - reasonable for testnet
        maxPriorityFeePerGas: 2_000_000_000n // 2 gwei - miner tip
      });
      console.log('waiting for tx: ', tx.hash);
      const receipt = await tx.wait(1);  // Wait for 1 confirmation like simple-contract-test.ts

      if (!receipt || receipt.status !== 1) {
        throw new Error('EVM source escrow deployment failed');
      }

      // Calculate the escrow address using SDK (same as main.spec.ts)
      // Get immutables from the deployment event (more accurate than reconstructing)
      console.log('Getting srcEscrowEvent from blockHash:', receipt.blockHash);
      
      const [srcImmutables, complement] = await this.getSrcDeployEvent(receipt.blockHash!);
      console.log('srcImmutables from event:', srcImmutables.toJSON());
      
      // Get the source implementation address from the factory contract
      const srcImplementation = await this.getSourceImpl();
      
      const escrowFactory = new Sdk.EscrowFactory(new Sdk.Address(params.escrowFactory));
      const srcEscrowAddress = escrowFactory.getSrcEscrowAddress(
        srcImmutables,
        srcImplementation
      );

      return {
        txHash: receipt.hash,
        srcEscrowAddress: srcEscrowAddress.toString(),
        srcImmutables: srcImmutables,
        dstImmutablesComplement: complement
      };
    } catch (error) {
      console.error('Error deploying EVM source escrow:', error);
      throw error;
    }
  }

  /**
   * Deploy destination escrow using SDK
   */
  async deployDstEscrow(params: {
    immutables: Sdk.Immutables;
  }): Promise<{ 
    txHash: string; 
    dstEscrowAddress?: string; 
  }> {
    try {
      const txRequest = this.resolver.deployDst(params.immutables);
      const tx = await this.wallet.sendTransaction(txRequest);
      const receipt = await tx.wait();

      if (!receipt || receipt.status !== 1) {
        throw new Error('EVM destination escrow deployment failed');
      }

      // Calculate the destination escrow address using SDK
      // Note: This requires the source immutables and other parameters from main.spec.ts pattern
      // For now, we'll use a placeholder since we don't have all required parameters
      // TODO: Pass required parameters (srcImmutables, dstDeployedAt, resolverAddress) to this method
      const dstEscrowAddress = '0x' + '1'.repeat(40); // Placeholder for dst escrow

      return {
        txHash: receipt.hash,
        dstEscrowAddress: dstEscrowAddress
      };
    } catch (error) {
      console.error('Error deploying EVM destination escrow:', error);
      throw error;
    }
  }

  /**
   * Wait for transaction confirmation
   */
  async waitForConfirmation(txHash: string, confirmations: number = 12): Promise<boolean> {
    try {
      const receipt = await this.provider.waitForTransaction(txHash, confirmations);
      return receipt?.status === 1;
    } catch (error) {
      console.error(`Error waiting for EVM confirmation:`, error);
      return false;
    }
  }

  /**
   * Get escrow status (placeholder implementation)
   */
  async getEscrowStatus(escrowAddress: string): Promise<{
    exists: boolean;
    locked: boolean;
    balance?: string;
    owner?: string;
  }> {
    try {
      const code = await this.provider.getCode(escrowAddress);
      if (code === '0x') {
        return { exists: false, locked: false };
      }

      // For now, we assume the escrow exists and is locked
      // In a full implementation, you would call the escrow contract to get the actual status
      return {
        exists: true,
        locked: true,
        balance: '0',
        owner: escrowAddress
      };
    } catch (error) {
      console.error(`Error getting EVM escrow status:`, error);
      return { exists: false, locked: false };
    }
  }

  /**
   * Withdraw funds from escrow using secret
   */
  async withdraw(params: {
    side: 'src' | 'dst';
    escrowAddress: string;
    secret: string;
    immutables: Sdk.Immutables;
  }): Promise<{ txHash: string }> {
    try {
      const txRequest = this.resolver.withdraw(
        params.side,
        new Sdk.Address(params.escrowAddress),
        params.secret,
        params.immutables
      );

      const tx = await this.wallet.sendTransaction({
        ...txRequest,
        gasLimit: 1_000_000n, // Reasonable gas limit for withdrawal
        maxFeePerGas: 50_000_000_000n, // 50 gwei
        maxPriorityFeePerGas: 2_000_000_000n // 2 gwei
      });

      console.log('Withdrawal tx sent:', tx.hash);
      const receipt = await tx.wait(1);

      if (!receipt || receipt.status !== 1) {
        throw new Error('EVM withdrawal transaction failed');
      }

      return { txHash: receipt.hash };
    } catch (error) {
      console.error('Error executing EVM withdrawal:', error);
      throw error;
    }
  }

  /**
   * Compatibility method for fillOrder
   */
  async fillOrder(params: {
    orderData: string;
    signature: string;
    escrowAddress: string;
    amount: string;
  }): Promise<{ txHash: string }> {
    console.warn('fillOrder called on EVM - this should be handled by deploySrc method');
    return { txHash: '0x' };
  }
}