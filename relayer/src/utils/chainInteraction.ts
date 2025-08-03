import { SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { ethers, Interface, Signature } from 'ethers';
import * as Sdk from 'cross-chain-sdk-custom';
import { Address } from 'cross-chain-sdk-custom';
import { SdkEvmInteraction } from './evmResolver';



/**
 * Chain interaction utilities for cross-chain operations
 */

/**
 * Sui chain interaction utilities
 */
export class SuiInteraction {
  private client: SuiClient;
  private keypair: Ed25519Keypair;
  private packageId: string;

  constructor(rpcUrl: string, privateKey: string, packageId: string) {
    this.client = new SuiClient({ url: rpcUrl });
    this.keypair = Ed25519Keypair.fromSecretKey(privateKey);
    this.packageId = packageId;
  }

  /**
   * Get the Sui address for the current keypair
   */
  getAddress(): string {
    return this.keypair.getPublicKey().toSuiAddress();
  }

  /**
   * Deploy source escrow on Sui
   */
  async deploySourceEscrow(params: {
    order: string;
    orderHash: Uint8Array;
    winnerCap: string;
    safetyDeposit: string;
    hashlock: Uint8Array;
    coinType: string;
  }): Promise<{ escrowId: string; txHash: string }> {
    const tx = new Transaction();
    
    tx.moveCall({
      target: `${this.packageId}::resolver::deploy_src`,
      arguments: [
        tx.object(params.order),
        tx.pure('vector<u8>', Array.from(params.orderHash)),
        tx.object(params.winnerCap),
        tx.pure('vector<u8>', Array.from(params.hashlock))
      ],
      typeArguments: [params.coinType]
    });

    const result = await this.client.signAndExecuteTransaction({
      transaction: tx,
      signer: this.keypair,
      options: {
        showEffects: true,
        showObjectChanges: true
      }
    });

    if (result.effects?.status?.status !== 'success') {
      throw new Error(`Sui transaction failed: ${result.effects?.status?.error}`);
    }

    // Extract created escrow object ID
    const createdObjects = result.effects?.created || [];
    const escrowObject = createdObjects.find(obj => 
      obj.reference && obj.reference.objectId
    );

    if (!escrowObject) {
      throw new Error('Failed to find created escrow object');
    }

    return {
      escrowId: escrowObject.reference!.objectId,
      txHash: result.digest
    };
  }

  /**
   * Deploy destination escrow on Sui
   * Based on deployed contract signature: deploy_dst(order_hash, hashlock, maker, resolver, dst_coin, clock, ctx)
   */
  async deployDestinationEscrow(params: {
    orderHash: Uint8Array;
    hashlock: Uint8Array;
    maker: string;
    resolver: string;
    dstAmount: bigint;
    coinType: string;
  }): Promise<{ escrowId: string; txHash: string, result: any }> {
    console.log('deployDestinationEscrow', params);
    const tx = new Transaction();
    
    let splitDstCoin;
    
    // Special handling for SUI coins to avoid gas conflicts
    if (params.coinType === '0x2::sui::SUI') {
      // For SUI, split from the gas coin to avoid conflicts
      [splitDstCoin] = tx.splitCoins(tx.gas, [params.dstAmount]);
    } else {
      // For other coin types, get coins from wallet and split normally
      const coins = await this.client.getCoins({
        owner: this.getAddress(),
        coinType: params.coinType
      });

      if (coins.data.length < 1) {
        throw new Error(`Insufficient ${params.coinType} coins in resolver wallet for dst_token`);
      }

      [splitDstCoin] = tx.splitCoins(tx.object(coins.data[0].coinObjectId), [params.dstAmount]);
    }
    
    tx.moveCall({
      target: `${this.packageId}::resolver::deploy_dst`,
      arguments: [
        tx.pure('vector<u8>', Array.from(params.orderHash)),
        tx.pure('vector<u8>', Array.from(params.hashlock)),
        tx.pure.address('0xbab2e67782112ba74979cdd861a29b746af3793017cbc7b931af2fecc9480218'),
        tx.pure.address(params.resolver),
        splitDstCoin,
        tx.object('0x6') // Clock object
      ],
      typeArguments: [params.coinType]
    });

    const result = await this.client.signAndExecuteTransaction({
      transaction: tx,
      signer: this.keypair,
      options: {
        showEffects: true,
        showObjectChanges: true
      }
    });
    console.log('deployDestinationEscrow result', result);

    if (result.effects?.status?.status !== 'success') {
      throw new Error(`Sui transaction failed: ${result.effects?.status?.error}`);
    }

    // Extract created escrow object ID
    const createdObjects = result.effects?.created || [];
    const escrowObject = createdObjects.find(obj => 
      obj.reference && obj.reference.objectId
    );

    if (!escrowObject) {
      throw new Error('Failed to find created escrow object');
    }

    return {
      escrowId: escrowObject.reference!.objectId,
      txHash: result.digest,
      result: result
    };
  }

  /**
   * Fill order on Sui LOP
   */
  async fillOrder(params: {
    order: string;
    escrow: string;
    amount: string;
    coinType: string;
  }): Promise<{ txHash: string }> {
    const tx = new Transaction();
    
    tx.moveCall({
      target: `${this.packageId}::limit_order_protocol::fill_order`,
      arguments: [
        tx.object(params.order),
        tx.object(params.escrow),
        tx.pure('u64', params.amount)
      ],
      typeArguments: [params.coinType]
    });

    const result = await this.client.signAndExecuteTransaction({
      transaction: tx,
      signer: this.keypair,
      options: {
        showEffects: true
      }
    });

    if (result.effects?.status?.status !== 'success') {
      throw new Error(`Sui fill order failed: ${result.effects?.status?.error}`);
    }

    return {
      txHash: result.digest
    };
  }

  /**
   * Withdraw from destination escrow
   */
  async withdrawDestination(params: {
    escrow: string;
    secret: Uint8Array;
    timelock: string;
    coinType: string;
  }): Promise<{ txHash: string }> {
    const tx = new Transaction();
    
    tx.moveCall({
      target: `${this.packageId}::escrow_dst::withdraw`,
      arguments: [
        tx.object(params.escrow),
        tx.pure('vector<u8>', Array.from(params.secret)),
        tx.object(params.timelock)
      ],
      typeArguments: [params.coinType]
    });

    const result = await this.client.signAndExecuteTransaction({
      transaction: tx,
      signer: this.keypair,
      options: {
        showEffects: true
      }
    });

    if (result.effects?.status?.status !== 'success') {
      throw new Error(`Sui withdraw failed: ${result.effects?.status?.error}`);
    }

    return {
      txHash: result.digest
    };
  }

  /**
   * Get escrow status
   */
  async getEscrowStatus(escrowId: string): Promise<{
    exists: boolean;
    locked: boolean;
    amount?: string;
    owner?: string;
  }> {
    try {
      const objectInfo = await this.client.getObject({
        id: escrowId,
        options: { 
          showContent: true,
          showType: true
        }
      });

      if (!objectInfo.data) {
        return { exists: false, locked: false };
      }

      // Parse object content to get escrow status
      const content = objectInfo.data.content;
      if (content && 'fields' in content) {
        const fields = content.fields as any;
        return {
          exists: true,
          locked: fields.locked || false,
          amount: fields.amount?.toString(),
          owner: fields.owner
        };
      }

      return { exists: true, locked: false };
    } catch (error) {
      console.error(`Error getting Sui escrow status:`, error);
      return { exists: false, locked: false };
    }
  }

  /**
   * Wait for transaction confirmation
   */
  async waitForConfirmation(txHash: string, maxRetries: number = 10): Promise<boolean> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const txResult = await this.client.getTransactionBlock({
          digest: txHash,
          options: { showEffects: true }
        });

        if (txResult.effects?.status?.status === 'success') {
          return true;
        } else if (txResult.effects?.status?.status === 'failure') {
          throw new Error(`Transaction failed: ${txResult.effects?.status?.error}`);
        }
      } catch (error) {
        if (i === maxRetries - 1) {
          throw error;
        }
      }

      // Wait 2 seconds before retry
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    return false;
  }

  /**
   * Withdraw from Sui destination escrow using secret
   * Based on: withdraw<T0>(escrow, secret, timelock, clock, ctx)
   */
  async withdrawFromEscrow(params: {
    immutables: any;
    escrowId: string;
    secret: string;
    coinType: string;
  }): Promise<{ txHash: string }> {
    const tx = new Transaction();
    console.log('withdrawFromEscrow', JSON.stringify(params.immutables, null, 2));

    console.log('immutables', params.immutables.objectChanges,typeof params.immutables, typeof params.immutables.objectChanges);
    const { timelocks, escrowDsts } = await this.extractTimelockAndEscrowDst(params.immutables);
    
    // Convert secret from hex string to Uint8Array
    const secretBytes = new Uint8Array(
      params.secret.slice(2).match(/.{2}/g)!.map((byte: string) => parseInt(byte, 16))
    );

    // Query for timelock objects related to this escrow
    // In practice, you'd need to find the specific timelock for this escrow ID
    // const timelockObjects = await this.client.getOwnedObjects({
    //   owner: this.getAddress(),
    //   filter: {
    //     StructType: `${this.packageId}::timelocks::Timelock`
    //   },
    //   options: {
    //     showContent: true
    //   }
    // });

    // if (timelockObjects.data.length === 0) {
    //   throw new Error('No timelock objects found for this resolver');
    // }

    // For now, use the first timelock (in production, match by escrow ID)
   

    console.log(`🔓 Withdrawing from Sui escrow: ${escrowDsts}`);
    console.log(`🔑 Using secret: ${params.secret.slice(0, 10)}...`);
    console.log(`⏰ Using timelock: ${timelocks}`);

    tx.moveCall({
      target: `${this.packageId}::escrow_dst::withdraw`,
      arguments: [
        tx.object(escrowDsts),           // escrow
        tx.pure('vector<u8>', Array.from(secretBytes)), // secret
        tx.object(timelocks),                // timelock
        tx.object('0x6'),                     // clock
      ],
      typeArguments: [params.coinType]
    });

    const result = await this.client.signAndExecuteTransaction({
      transaction: tx,
      signer: this.keypair,
      options: {
        showEffects: true,
        showEvents: true,
        showObjectChanges: true
      }
    });

    if (result.effects?.status?.status !== 'success') {
      throw new Error(`Sui withdrawal failed: ${result.effects?.status?.error}`);
    }

    console.log(`✅ Sui withdrawal successful: ${result.digest}`);

    return {
      txHash: result.digest
    };
  }
  async extractTimelockAndEscrowDst(result: any) {
    const timelockStruct = this.packageId+'::timelocks::Timelock';
    const escrowDstPrefix = this.packageId+'::escrow_dst::EscrowDst<0x2::sui::SUI>';
    console.log('extractTimelockAndEscrowDst', result.objectChanges);
    const timelocks = result.objectChanges.filter(
      (oc: any) => oc.objectType === timelockStruct && oc.type === 'created'
    );
  
    const escrowDsts = result.objectChanges.filter(
      (oc: any) => oc.objectType.startsWith(escrowDstPrefix) && oc.type === 'created'
    );
  
    return {
      timelocks: timelocks[0].objectId,
      escrowDsts: escrowDsts[0].objectId,
    };
  }
  
}

/**
 * EVM chain interaction utilities
 * Based on actual contract implementations from evm_contract
 */
export class EvmInteraction {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private factoryAddress: string;
  private resolverAddress: string;
  private lopAddress: string;

  // Contract ABIs based on actual contract implementations
  private escrowFactoryAbi = [
    'function createDstEscrow((bytes32,bytes32,uint256,uint256,uint256,uint256,uint256,uint256,bytes) dstImmutables, uint256 srcCancellationTimestamp) external payable',
    'function addressOfEscrowSrc((bytes32,bytes32,uint256,uint256,uint256,uint256,uint256,uint256,bytes) immutables) external view returns (address)',
    'function addressOfEscrowDst((bytes32,bytes32,uint256,uint256,uint256,uint256,uint256,uint256,bytes) immutables) external view returns (address)',
    'function ESCROW_SRC_IMPLEMENTATION() external view returns (address)',
    'function ESCROW_DST_IMPLEMENTATION() external view returns (address)',
    'event SrcEscrowCreated((bytes32,bytes32,uint256,uint256,uint256,uint256,uint256,uint256,bytes) srcImmutables, (uint256,uint256,uint256,uint256,uint256,bytes) dstImmutablesComplement)',
    'event DstEscrowCreated(address escrow, bytes32 hashlock, uint256 taker)'
  ];

  private resolverAbi = [
    'function deploySrc((bytes32,bytes32,uint256,uint256,uint256,uint256,uint256,uint256,bytes) immutables, (uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256) order, bytes32 r, bytes32 vs, uint256 amount, uint256 takerTraits, bytes args) external payable',
    'function deployDst((bytes32,bytes32,uint256,uint256,uint256,uint256,uint256,uint256,bytes) dstImmutables, uint256 srcCancellationTimestamp) external payable',
    'function withdraw(address escrow, bytes32 secret, (bytes32,bytes32,uint256,uint256,uint256,uint256,uint256,uint256,bytes) immutables) external',
    'function cancel(address escrow, (bytes32,bytes32,uint256,uint256,uint256,uint256,uint256,uint256,bytes) immutables) external',
    'function arbitraryCalls(address[] targets, bytes[] arguments) external'
  ];

  private escrowAbi = [
    'function withdraw(bytes32 secret, (bytes32,bytes32,uint256,uint256,uint256,uint256,uint256,uint256,bytes) immutables) external',
    'function cancel((bytes32,bytes32,uint256,uint256,uint256,uint256,uint256,uint256,bytes) immutables) external'
  ];

  constructor(rpcUrl: string, privateKey: string, factoryAddress: string, resolverAddress: string, lopAddress: string) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.factoryAddress = factoryAddress;
    this.resolverAddress = resolverAddress;
    this.lopAddress = lopAddress;
  }

  /**
   * Deploy source escrow using Resolver contract (similar to test flow)
   */
  async deploySrcEscrow(params: {
    immutables: any; // Immutables struct
    order: any; // Order struct
    signature: string; // EIP-712 signature
    amount: string;
    takerTraits: string;
    args?: string;
  }): Promise<{ txHash: string; srcEscrowAddress?: string }> {
    const resolver = new ethers.Contract(this.resolverAddress, this.resolverAbi, this.wallet);
    
    // Parse signature into r, vs format (EIP-2098)
    const sig = ethers.Signature.from(params.signature);
    
    const tx = await resolver.deploySrc(
      params.immutables,
      params.order,
      sig.r,
      sig.yParityAndS,
      ethers.parseEther(params.amount),
      params.takerTraits,
      params.args || '0x',
      { value: params.immutables.safetyDeposit }
    );

    const receipt = await tx.wait();
    
    if (!receipt || receipt.status !== 1) {
      throw new Error('EVM source escrow deployment failed');
    }

    return {
      txHash: receipt.hash
    };
  }

  /**
   * Deploy destination escrow using Resolver contract
   */
  async deployDstEscrow(params: {
    dstImmutables: any; // Destination immutables struct
    srcCancellationTimestamp: string;
  }): Promise<{ txHash: string; dstEscrowAddress?: string }> {
    const resolver = new ethers.Contract(this.resolverAddress, this.resolverAbi, this.wallet);
    
    const tx = await resolver.deployDst(
      params.dstImmutables,
      params.srcCancellationTimestamp,
      { value: params.dstImmutables.safetyDeposit }
    );

    const receipt = await tx.wait();
    
    if (!receipt || receipt.status !== 1) {
      throw new Error('EVM destination escrow deployment failed');
    }

    return {
      txHash: receipt.hash
    };
  }

  /**
   * Withdraw funds from escrow using Resolver contract
   */
  async withdrawFromEscrow(params: {
    escrowAddress: string;
    secret: string;
    immutables: any; // Immutables struct
  }): Promise<{ txHash: string }> {
    const resolver = new ethers.Contract(this.resolverAddress, this.resolverAbi, this.wallet);
    
    const tx = await resolver.withdraw(
      params.escrowAddress,
      params.secret,
      params.immutables
    );

    const receipt = await tx.wait();
    
    if (!receipt || receipt.status !== 1) {
      throw new Error('EVM escrow withdrawal failed');
    }

    return {
      txHash: receipt.hash
    };
  }

  /**
   * Cancel escrow using Resolver contract
   */
  async cancelEscrow(params: {
    escrowAddress: string;
    immutables: any; // Immutables struct
  }): Promise<{ txHash: string }> {
    const resolver = new ethers.Contract(this.resolverAddress, this.resolverAbi, this.wallet);
    
    const tx = await resolver.cancel(
      params.escrowAddress,
      params.immutables
    );

    const receipt = await tx.wait();
    
    if (!receipt || receipt.status !== 1) {
      throw new Error('EVM escrow cancellation failed');
    }

    return {
      txHash: receipt.hash
    };
  }

  /**
   * Get escrow address from factory
   */
  async getSrcEscrowAddress(immutables: any): Promise<string> {
    const factory = new ethers.Contract(this.factoryAddress, this.escrowFactoryAbi, this.provider);
    return await factory.addressOfEscrowSrc(immutables);
  }

  /**
   * Get destination escrow address from factory
   */
  async getDstEscrowAddress(immutables: any): Promise<string> {
    const factory = new ethers.Contract(this.factoryAddress, this.escrowFactoryAbi, this.provider);
    return await factory.addressOfEscrowDst(immutables);
  }

  /**
   * Get SrcEscrowCreated event from transaction
   */
  async getSrcDeployEvent(txHash: string): Promise<any> {
    const factory = new ethers.Contract(this.factoryAddress, this.escrowFactoryAbi, this.provider);
    const receipt = await this.provider.getTransactionReceipt(txHash);
    
    if (!receipt) {
      throw new Error('Transaction receipt not found');
    }

    const logs = receipt.logs;
    for (const log of logs) {
      try {
        const parsed = factory.interface.parseLog(log);
        if (parsed?.name === 'SrcEscrowCreated') {
          return parsed.args;
        }
      } catch {
        // Skip logs that don't match
      }
    }
    
    throw new Error('SrcEscrowCreated event not found');
  }

  /**
   * Get escrow status by checking contract code and balance
   */
  async getEscrowStatus(escrowAddress: string): Promise<{
    exists: boolean;
    locked: boolean;
    balance?: string;
  }> {
    try {
      const code = await this.provider.getCode(escrowAddress);
      if (code === '0x') {
        return { exists: false, locked: false };
      }

      const balance = await this.provider.getBalance(escrowAddress);

      return {
        exists: true,
        locked: balance > 0, // Assume escrow is locked if it has balance
        balance: ethers.formatEther(balance)
      };
    } catch (error) {
      console.error(`Error getting EVM escrow status:`, error);
      return { exists: false, locked: false };
    }
  }

  /**
   * Fill order on EVM (Note: In the actual EVM flow, this is handled by deploySrc)
   */
  async fillOrder(params: {
    orderData: string;
    signature: string;
    escrowAddress: string;
    amount: string;
  }): Promise<{ txHash: string }> {
    // In the actual EVM flow, order filling is integrated with escrow deployment
    // This method is provided for interface compatibility
    console.warn('fillOrder called on EVM - this should be handled by deploySrc method');
    
    // For now, return a placeholder response
    // In reality, this functionality is embedded in the deploySrc method
    return {
      txHash: '0x0000000000000000000000000000000000000000000000000000000000000000'
    };
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
   * Get current gas price
   */
  async getCurrentGasPrice(): Promise<bigint> {
    const feeData = await this.provider.getFeeData();
    return feeData.gasPrice || BigInt(0);
  }

  /**
   * Estimate gas for transaction
   */
  async estimateGas(to: string, data: string, value: string = '0'): Promise<bigint> {
    return await this.provider.estimateGas({
      to,
      data,
      value: ethers.parseEther(value)
    });
  }
}

/**
 * Factory function to create chain interaction instances
 */
export function createChainInteractions(config: {
  sui: {
    rpcUrl: string;
    privateKey: string;
    packageId: string;
  };
  evm: {
    rpcUrl: string;
    privateKey: string;
    factoryAddress: string;
    resolverAddress: string;
    lopAddress: string;
  };
}): {
  sui: SuiInteraction;
  evm: SdkEvmInteraction;
} {
  const sui = new SuiInteraction(
    config.sui.rpcUrl,
    config.sui.privateKey,
    config.sui.packageId
  );

  const evm = new SdkEvmInteraction(
    config.evm.rpcUrl,
    config.evm.privateKey,
    config.evm.factoryAddress,
    config.evm.resolverAddress,
    config.evm.lopAddress
  );

  return { sui, evm };
}