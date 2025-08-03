import axios from 'axios';
import dotenv from 'dotenv';
import { getConfig } from '../src/utils/config';
import { Order, OrderStatus } from '../src/types';
import { SuiInteraction, EvmInteraction, createChainInteractions } from '../src/utils/chainInteraction';
import { SdkEvmInteraction } from '../src/utils/evmResolver';
import { logger, LogLevel } from '../src/utils/logger';

// Load environment variables
dotenv.config();

/**
 * Configuration interface for the resolver
 */
interface ResolverConfig {
  serverUrl: string;
  pollingInterval: number;
  maxRetries: number;
  confirmationBlocks: {
    sui: number;
    evm: number;
  };
  privateKeys: {
    sui?: string;
    evm?: string;
  };
  rpcUrls: {
    sui: string;
    evm: string;
  };
}

/**
 * Escrow deployment result
 */
interface EscrowDeployment {
  escrowAddress: string;
  transactionHash: string;
  chain: 'sui' | 'evm';
  srcImmutables?: any;
  dstImmutablesComplement?: any;
}

/**
 * Auction information for order resolution
 */
interface AuctionInfo {
  orderId: string;
  direction: 'sui-to-evm' | 'evm-to-sui';
  sourceChain: 'sui' | 'evm';
  targetChain: 'sui' | 'evm';
  auctionPrice?: string;
  resolver: string;
}

/**
 * Order resolution service that handles cross-chain order processing
 */
class ResolverService {
  private config: ResolverConfig;
  private chainInteractions!: {
    sui: SuiInteraction;
    evm: SdkEvmInteraction;
  };
  private isRunning = false;

  constructor(config: ResolverConfig) {
    this.config = config;
    this.initializeChainClients();
  }

  /**
   * Initialize blockchain clients
   */
  private initializeChainClients(): void {
    if (!this.config.privateKeys.sui || !this.config.privateKeys.evm) {
      throw new Error('Both Sui and EVM private keys must be configured');
    }

    this.chainInteractions = createChainInteractions({
      sui: {
        rpcUrl: this.config.rpcUrls.sui,
        privateKey: this.config.privateKeys.sui,
        packageId: process.env.SUI_PACKAGE_ID || ''
      },
      evm: {
        rpcUrl: this.config.rpcUrls.evm,
        privateKey: this.config.privateKeys.evm,
        factoryAddress: process.env.EVM_FACTORY_ADDRESS || '',
        resolverAddress: process.env.EVM_RESOLVER_ADDRESS || '',
        lopAddress: process.env.EVM_LOP_ADDRESS || ''
      }
    });

    logger.info('Blockchain clients initialized successfully');
  }

  /**
   * Start the resolver service
   */
  public async start(): Promise<void> {
    if (this.isRunning) {
      console.log('⚠️ Resolver is already running');
      return;
    }

    this.isRunning = true;
    console.log('🚀 Starting resolver service...');

    // Start polling loop
    this.pollOrders();
  }

  /**
   * Stop the resolver service
   */
  public stop(): void {
    this.isRunning = false;
    console.log('⏹️ Resolver service stopped');
  }

  /**
   * Main polling loop for processing orders
   */
  private async pollOrders(): Promise<void> {
    while (this.isRunning) {
      try {
        logger.debug('Polling for orders...');
        
        // Step 1: Get pending/unprocessed orders
        const orders = await this.getPendingOrders();
        
        if (orders.length === 0) {
          logger.debug('No orders to process');
        } else {
          logger.info(`Found ${orders.length} orders to process`);
        }

        // Step 2: Process each order
        for (const order of orders) {
          try {
            await this.processOrder(order);
          } catch (error) {
            logger.error(`Error processing order`, error, { orderId: order.id });
            // Continue with next order even if one fails
            continue;
          }
        }

      } catch (error) {
        logger.error('Error in polling loop', error);
      }

      // Wait before next poll
      await this.sleep(this.config.pollingInterval);
    }
  }

  /**
   * Get pending orders from the backend server
   */
  private async getPendingOrders(): Promise<Order[]> {
    try {
      const response = await axios.get(`${this.config.serverUrl}/api/v1/relayer/orders`, {
        params: {
          status: OrderStatus.PENDING,
          limit: 50
        }
      });

      const orders = response.data.data || [];
      logger.debug(`Fetched ${orders.length} pending orders from server`);
      return orders;
    } catch (error) {
      logger.error('Failed to fetch orders from server', error);
      return [];
    }
  }

  /**
   * Poll for order secret until it's available
   */
  private async pollForOrderSecret(orderId: string, escrows: { source: EscrowDeployment; destination: EscrowDeployment }): Promise<string> {
    const maxPolls = 300; // Maximum 300 polls (50 minutes with 10-second intervals)
    const pollInterval = 10000; // 10 seconds
    let pollCount = 0;

    logger.info(`Starting to poll for order secret`, { maxPolls, pollInterval }, { orderId });

    while (pollCount < maxPolls) {
      try {
        pollCount++;
        logger.debug(`Polling for secret - attempt ${pollCount}/${maxPolls}`, null, { orderId });

        // Get order status from backend
        const response = await axios.get(`${this.config.serverUrl}/api/v1/relayer/order/${orderId}`, {
          timeout: 10000
        });

        const order = response.data;
        
        if (!order) {
          throw new Error(`Order not found: ${orderId}`);
        }

        // Check if secret is available
        if (order.secret && order.secret.trim() !== '') {
          logger.info(`Order secret received after ${pollCount} polls`, 
            { secretPreview: order.secret.substring(0, 10) + '...' }, 
            { orderId });
          return order.secret;
        }

        // Log current order status for debugging
        logger.debug(`Order status check`, { 
          status: order.status, 
          hasSecret: !!order.secret 
        }, { orderId });

        // Check if order is in a failed state
        if (order.status === OrderStatus.FAILED || order.status === OrderStatus.CANCELLED) {
          throw new Error(`Order is in ${order.status} state, cannot get secret`);
        }

        // Wait before next poll
        await this.sleep(pollInterval);

      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          logger.error(`Order not found: ${orderId}`, error, { orderId });
          throw new Error(`Order not found: ${orderId}`);
        }
        
        logger.warn(`Error polling for secret (attempt ${pollCount}/${maxPolls})`, error, { orderId });
        
        // If we've exhausted retries, throw the error
        if (pollCount >= maxPolls) {
          throw error;
        }
        
        // Wait before retry
        await this.sleep(pollInterval);
      }
    }

    throw new Error(`Timeout waiting for order secret after ${maxPolls} attempts (${(maxPolls * pollInterval) / 60000} minutes)`);
  }

  /**
   * Execute final withdrawal using the secret
   */
  private async executeWithdrawal(
    orderId: string, 
    secret: string, 
    escrows: { source: EscrowDeployment; destination: EscrowDeployment },
    auctionInfo: AuctionInfo
  ): Promise<void> {
    logger.info('Starting withdrawal process', { direction: auctionInfo.direction }, { orderId });

    try {
      // Get the immutables from the deployed escrows
      // For now, we'll implement a simplified version - in production you'd need the full immutables
      
      if (auctionInfo.direction === 'evm-to-sui') {
        // EVM -> Sui: withdraw from Sui dst escrow for user, then from EVM src escrow for resolver
        await this.withdrawFromSuiEscrow(orderId, secret, escrows.destination, 'dst');
        await this.withdrawFromEvmEscrow(orderId, secret, escrows.source, 'src');
      } else {
        // Sui -> EVM: withdraw from EVM dst escrow for user, then from Sui src escrow for resolver  
        await this.withdrawFromEvmEscrow(orderId, secret, escrows.destination, 'dst');
        await this.withdrawFromSuiEscrow(orderId, secret, escrows.source, 'src');
      }

      logger.info('All withdrawals completed successfully', null, { orderId });
    } catch (error) {
      logger.error('Failed to execute withdrawal', error, { orderId });
      throw error;
    }
  }

  /**
   * Withdraw funds from EVM escrow
   */
  private async withdrawFromEvmEscrow(
    orderId: string,
    secret: string, 
    escrow: EscrowDeployment,
    side: 'src' | 'dst'
  ): Promise<void> {
    logger.info('Withdrawing from EVM escrow', { escrowAddress: escrow.escrowAddress, side }, { orderId });
    
    try {
      if (!escrow.srcImmutables) {
        throw new Error('Missing srcImmutables for EVM withdrawal');
      }
      
      const result = await this.chainInteractions.evm.withdraw({
        side: side,
        escrowAddress: escrow.escrowAddress,
        secret: secret,
        immutables: escrow.srcImmutables
      });

      logger.info('EVM withdrawal completed', { txHash: result.txHash }, { orderId });
      
    } catch (error) {
      logger.error('Failed to withdraw from EVM escrow', error, { orderId });
      throw error;
    }
  }

  /**
   * Withdraw funds from Sui escrow  
   */
  private async withdrawFromSuiEscrow(
    orderId: string,
    secret: string,
    escrow: EscrowDeployment,
    side: 'src' | 'dst'
  ): Promise<void> {
    logger.info('Withdrawing from Sui escrow', { escrowAddress: escrow.escrowAddress, side }, { orderId });
    
    try {
      // Note: This is a simplified implementation
      // In production, you would need to implement Sui withdrawal logic
      logger.warn('Sui withdrawal not fully implemented', null, { orderId });
      
      // TODO: Implement Sui withdrawal
      // await this.chainInteractions.sui.withdraw(escrow.escrowAddress, secret, side);
      
    } catch (error) {
      logger.error('Failed to withdraw from Sui escrow', error, { orderId });  
      throw error;
    }
  }

  /**
   * Process a single order through the complete resolution flow
   */
  private async processOrder(order: Order): Promise<void> {
    const orderId = order.id;
    logger.info('Starting order processing', null, { orderId });

    try {
      // Step 1: Get resolve intent/auction information
      const auctionInfo = await this.getResolveIntent(orderId);
      logger.info('Retrieved auction information', auctionInfo, { orderId });

      // Step 2: Prepare and deploy escrows
      const escrows = await this.prepareEscrows(order, auctionInfo);
      logger.info('Escrows deployed successfully', escrows, { orderId });


      await this.notifyBackendVerification(orderId, escrows);
      logger.info('Backend verification notification sent', null, { orderId });

      // Step 3: Poll for order secret until received
      const secret = await this.pollForOrderSecret(orderId, escrows);
      logger.info('Order secret received', { secretLength: secret.length }, { orderId });
      // await for 13 seconds
      console.log('Waiting for 13 seconds');
      await new Promise(resolve => setTimeout(resolve, 13000));
      // Step 4: Execute final withdrawal using the secret
      await this.executeWithdrawal(orderId, secret, escrows, auctionInfo);
      logger.info('Withdrawal completed successfully', null, { orderId });

    } catch (error) {
      logger.error('Failed to process order', error, { orderId });
      // await this.updateOrderStatus(orderId, OrderStatus.FAILED);
    }
  }

  /**
   * Get resolve intent/auction information for an order
   */
  private async getResolveIntent(orderId: string): Promise<AuctionInfo> {
    try {
      const response = await axios.get(`${this.config.serverUrl}/api/v1/relayer/resolve-intent`, {
        params: { orderId }
      });

      const { order, targetChain } = response.data;
      
      // Determine direction based on chains
      const direction = targetChain === 'sui' ? 'evm-to-sui' : 'sui-to-evm';
      const sourceChain = direction === 'evm-to-sui' ? 'evm' : 'sui';

      return {
        orderId,
        direction,
        sourceChain,
        targetChain,
        resolver: 'resolver_address', // This should come from the response
        auctionPrice: order.amount || '0'
      };
    } catch (error) {
      console.error(`❌ Failed to get resolve intent for order ${orderId}:`, error);
      throw error;
    }
  }

  /**
   * Prepare and deploy escrows for both source and destination chains
   */
  private async prepareEscrows(order: Order, auctionInfo: AuctionInfo): Promise<{
    source: EscrowDeployment;
    destination: EscrowDeployment;
  }> {
    const orderId = order.id;
    logger.info('Preparing escrows', null, { orderId, chain: auctionInfo.direction });

    let sourceEscrow: EscrowDeployment;
    let destinationEscrow: EscrowDeployment;

    try {
      if (auctionInfo.direction === 'sui-to-evm') {
        // Deploy source escrow on Sui, destination escrow on EVM
        logger.debug('Deploying source escrow on Sui', null, { orderId, chain: 'sui' });
        sourceEscrow = await this.deploySuiEscrow(order, auctionInfo, 'source');
        
        logger.debug('Deploying destination escrow on EVM', null, { orderId, chain: 'evm' });
        destinationEscrow = await this.deployEvmEscrow(order, auctionInfo, 'destination');
      } else {
        // Deploy source escrow on EVM, destination escrow on Sui
        logger.debug('Deploying source escrow on EVM', null, { orderId, chain: 'evm' });
        sourceEscrow = await this.deployEvmEscrow(order, auctionInfo, 'source');
        
        logger.debug('Deploying destination escrow on Sui', null, { orderId, chain: 'sui' });
        // destinationEscrow = await this.deploySuiEscrow(order, auctionInfo, 'destination');

      }

      return {
        source: sourceEscrow,
        destination: sourceEscrow
      };
    } catch (error) {
      logger.error('Failed to prepare escrows', error, { orderId });
      throw error;
    }
  }

  /**
   * Deploy escrow contract on Sui
   */
  private async deploySuiEscrow(
    order: Order, 
    auctionInfo: AuctionInfo, 
    type: 'source' | 'destination'
  ): Promise<EscrowDeployment> {
    const orderId = order.id;
    
    try {
      if (type === 'source') {
        // Generate placeholder values - these should come from the order and auction info
        const orderHash = new Uint8Array(32); // Should be derived from order
        const hashlock = new Uint8Array(32); // Should be generated or provided
        
        const result = await this.chainInteractions.sui.deploySourceEscrow({
          order: order.order,
          orderHash,
          winnerCap: '', // Should be provided from auction winner
          safetyDeposit: '', // Should be provided from configuration
          hashlock,
          coinType: '0x2::sui::SUI'
        });

        logger.info('Sui source escrow deployed', result, { 
          orderId, 
          chain: 'sui', 
          txHash: result.txHash 
        });

        return {
          escrowAddress: result.escrowId,
          transactionHash: result.txHash,
          chain: 'sui'
        };
      } else {
        // Deploy destination escrow
        const orderHash = new Uint8Array(32); // Should be derived from order
        const hashlock = new Uint8Array(32); // Should be generated or provided
        
        const result = await this.chainInteractions.sui.deployDestinationEscrow({
          orderHash,
          hashlock,
          maker: order.order.maker || '',
          resolver: auctionInfo.resolver,
          dstCoin: '', // Should be provided from order
          safetyDeposit: '', // Should be provided from configuration
          coinType: '0x2::sui::SUI'
        });

        logger.info('Sui destination escrow deployed', result, { 
          orderId, 
          chain: 'sui', 
          txHash: result.txHash 
        });

        return {
          escrowAddress: result.escrowId,
          transactionHash: result.txHash,
          chain: 'sui'
        };
      }
    } catch (error) {
      logger.error(`Failed to deploy Sui ${type} escrow`, error, { orderId, chain: 'sui' });
      throw error;
    }
  }

  /**
   * Deploy escrow contract on EVM
   */
  private async deployEvmEscrow(
    order: Order, 
    auctionInfo: AuctionInfo, 
    type: 'source' | 'destination'
  ): Promise<EscrowDeployment> {
    const orderId = order.id;
    
    try {
      if (type === 'source') {
        return await this.deployEvmSrcEscrow(order, auctionInfo);
      } else {
        return await this.deployEvmDstEscrow(order, auctionInfo);
      }
    } catch (error) {
      logger.error(`Failed to deploy EVM ${type} escrow`, error, { orderId, chain: 'evm' });
      throw error;
    }
  }

  /**
   * Deploy source escrow on EVM using Resolver contract
   */
  private async deployEvmSrcEscrow(
    order: Order, 
    auctionInfo: AuctionInfo
  ): Promise<EscrowDeployment> {
    const orderId = order.id;
    
    try {
      const amount = auctionInfo.auctionPrice || '100000000'; // Default to 100 USDC in wei

      // Use the new SDK-based method
      const result = await this.chainInteractions.evm.deploySrcEscrow({
        relayerOrder: order,
        srcChainId: 11155111, // Sepolia testnet - should be configurable
        dstChainId: 97, // BSC testnet - should be configurable  
        escrowFactory: process.env.EVM_FACTORY_ADDRESS || '',
        amount
      });

      logger.info(`EVM source escrow deployed using SDK`, result, { 
        orderId, 
        chain: 'evm', 
        txHash: result.txHash 
      });

      return {
        escrowAddress: result.srcEscrowAddress || '',
        transactionHash: result.txHash,
        chain: 'evm',
        srcImmutables: result.srcImmutables,
        dstImmutablesComplement: result.dstImmutablesComplement
      };
    } catch (error) {
      logger.error(`Failed to deploy EVM source escrow`, error, { orderId, chain: 'evm' });
      throw error;
    }
  }

  /**
   * Deploy destination escrow on EVM using Resolver contract
   */
  private async deployEvmDstEscrow(
    order: Order, 
    auctionInfo: AuctionInfo
  ): Promise<EscrowDeployment> {
    const orderId = order.id;
    
    try {
      const dstImmutables = this.buildEvmImmutables(order, 'destination');
      const srcCancellationTimestamp = String(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
      
      const result = await this.chainInteractions.evm.deployDstEscrow({
        immutables: dstImmutables
      });

      logger.info(`EVM destination escrow deployed`, result, { 
        orderId, 
        chain: 'evm', 
        txHash: result.txHash 
      });

      return {
        escrowAddress: result.dstEscrowAddress || '',
        transactionHash: result.txHash,
        chain: 'evm'
      };
    } catch (error) {
      logger.error(`Failed to deploy EVM destination escrow`, error, { orderId, chain: 'evm' });
      throw error;
    }
  }

  


  /**
   * Notify backend to verify escrows
   */
  private async notifyBackendVerification(
    orderId: string,
    escrows: { source: EscrowDeployment; destination: EscrowDeployment }
  ): Promise<void> {
    try {
      logger.info('Sending verification request to backend', null, { orderId });
      
      const response = await axios.post(`${this.config.serverUrl}/api/v1/relayer/verify`, {
        orderId,
        escrowSrc: escrows.source.escrowAddress,
        escrowDst: escrows.destination.escrowAddress
      });

      if (!response.data.verified) {
        const issues = response.data.issues.join(', ');
        logger.error('Backend verification failed', { issues }, { orderId });
        throw new Error(`Backend verification failed: ${issues}`);
      }

      logger.info('Backend verification successful', response.data, { orderId });
    } catch (error) {
      logger.error('Backend verification request failed', error, { orderId });
      throw error;
    }
  }

  /**
   * Build EVM immutables structure for contract calls
   */
  private buildEvmImmutables(order: Order, type: 'source' | 'destination'): any {
    // This should be replaced with actual order data parsing
    const orderHashBytes = Array.from(new TextEncoder().encode(JSON.stringify(order.order)));
    const hashlockBytes = Array.from(new Uint8Array(32)); // Should be generated properly
    
    return {
      orderHash: '0x' + Buffer.from(orderHashBytes).toString('hex').padEnd(64, '0').slice(0, 64),
      hashlock: '0x' + Buffer.from(hashlockBytes).toString('hex'),
      maker: order.order.maker || '0x0000000000000000000000000000000000000000',
      taker: order.order.taker || '0x0000000000000000000000000000000000000000', 
      token: order.order.makerAsset || '0x0000000000000000000000000000000000000000',
      amount: order.order.makingAmount || '0',
      safetyDeposit: '1000000000000000000', // 1 ETH in wei
      timelocks: '0', // Should be calculated based on order timelocks
      parameters: '0x'
    };
  }

  /**
   * Build EVM order structure for contract calls
   */
  private buildEvmOrderStruct(order: Order): any {
    return {
      salt: order.order.salt || '0',
      maker: order.order.maker || '0x0000000000000000000000000000000000000000',
      receiver: order.order.receiver || '0x0000000000000000000000000000000000000000',
      makerAsset: order.order.makerAsset || '0x0000000000000000000000000000000000000000',
      takerAsset: order.order.takerAsset || '0x0000000000000000000000000000000000000000',
      makingAmount: order.order.makingAmount || '0',
      takingAmount: order.order.takingAmount || '0',
      makerTraits: order.order.makerTraits || '0'
    };
  }

  /**
   * Update order status
   */
  private async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    try {
      logger.info(`Updating order status to ${status}`, null, { orderId });
      
      // This would call a backend API to update order status
      // For now, we'll implement a simple status update
      const response = await axios.patch(`${this.config.serverUrl}/api/v1/relayer/order/${orderId}`, {
        status
      });
      
      if (response.status === 200) {
        logger.info(`Order status updated successfully to ${status}`, null, { orderId });
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      logger.error('Failed to update order status', error, { orderId });
      // Don't throw here as this is not critical to the resolution process
    }
  }



  /**
   * Sleep utility function
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Create resolver configuration from environment variables
 */
function createResolverConfig(): ResolverConfig {
  const appConfig = getConfig();
  
  return {
    serverUrl: process.env.SERVER_URL || 'http://localhost:8000',
    pollingInterval: parseInt(process.env.POLLING_INTERVAL || '30000', 10), // 30 seconds
    maxRetries: parseInt(process.env.MAX_RETRIES || '5', 10),
    confirmationBlocks: {
      sui: appConfig.confirmationBlocks.sui,
      evm: appConfig.confirmationBlocks.ethereum
    },
    privateKeys: {
      sui: process.env.SUI_PRIVATE_KEY,
      evm: process.env.EVM_PRIVATE_KEY
    },
    rpcUrls: {
      sui: appConfig.rpcUrls.sui,
      evm: appConfig.rpcUrls.ethereum
    }
  };
}

/**
 * Main function to start the resolver
 */
async function main() {
  console.log('🚀 Starting Cross-Chain Order Resolver...');

  try {
    const config = createResolverConfig();
    const resolver = new ResolverService(config);

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Received SIGINT. Gracefully shutting down...');
      resolver.stop();
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      console.log('\n🛑 Received SIGTERM. Gracefully shutting down...');
      resolver.stop();
      process.exit(0);
    });

    // Start the resolver
    await resolver.start();

  } catch (error) {
    console.error('❌ Failed to start resolver:', error);
    process.exit(1);
  }
}

// Start the resolver if this file is run directly
if (require.main === module) {
  main().catch(console.error);
}

export { ResolverService, createResolverConfig };