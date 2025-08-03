import { ethers, Interface, Signature } from 'ethers';
import * as Sdk from 'cross-chain-sdk-custom';
import { Address } from 'cross-chain-sdk-custom';

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
    this.iface = new Interface(resolverAbi);
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
        immutables.build(),
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
      data: this.iface.encodeFunctionData('withdraw', [escrow.toString(), secret, immutables.build()])
    };
  }

  public cancel(side: 'src' | 'dst', escrow: Address, immutables: Sdk.Immutables): ethers.TransactionRequest {
    return {
      to: side === 'src' ? this.srcAddress : this.dstAddress,
      data: this.iface.encodeFunctionData('cancel', [escrow.toString(), immutables.build()])
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

  constructor(
    rpcUrl: string, 
    privateKey: string, 
    factoryAddress: string, 
    resolverAddress: string, 
    lopAddress: string
  ) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.resolver = new EvmResolver(resolverAddress, resolverAddress, this.resolverAbi);
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
  }> {
    try {
      // Use a reasonable default amount if auction price is 0 or not set
      const requestedAmount = params.amount && params.amount !== '0' ? params.amount : '100000000'; // 100 USDC default
      
      // Convert relayer order to SDK format with the correct fill amount
      const sdkOrder = convertToSdkOrder(
        params.relayerOrder,
        new Address(params.escrowFactory),
        params.srcChainId,
        params.dstChainId,
        requestedAmount
      );

      // Create taker traits
      const takerTraits = Sdk.TakerTraits.default()
        .setExtension(sdkOrder.extension)
        .setAmountMode(Sdk.AmountMode.maker)
        .setAmountThreshold(sdkOrder.takingAmount);

      // Use the makingAmount from the order to ensure full fill
      // This avoids the "partial fill" error when amount doesn't match makingAmount
      const fillAmountBigInt = sdkOrder.makingAmount;


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

      // Send transaction (add gasLimit like simple-contract-test.ts)
      const tx = await this.wallet.sendTransaction({
        ...txRequest,
        gasLimit: 10_000_000n  // Same as simple-contract-test.ts
      });
      console.log('waiting for tx: ', tx.hash);
      const receipt = await tx.wait(1);  // Wait for 1 confirmation like simple-contract-test.ts

      if (!receipt || receipt.status !== 1) {
        throw new Error('EVM source escrow deployment failed');
      }

      return {
        txHash: receipt.hash
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

      return {
        txHash: receipt.hash
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