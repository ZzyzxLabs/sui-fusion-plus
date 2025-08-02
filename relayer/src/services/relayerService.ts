import {
  Order,
  OrderStatus,
  RelayerStatus,
  SupportedChain,
  SubmitOrderRequest,
  SubmitOrderResponse,
  GetOrdersFilters,
  PaginatedResponse
} from '../types';

/**
 * Service class for handling relayer operations
 */
export class RelayerService {
  private orders: Map<string, Order> = new Map();
  private orderCounter = 0;

  /**
   * Get current relayer status
   */
  public async getStatus(): Promise<RelayerStatus> {
    const pendingOrders = Array.from(this.orders.values()).filter(
      order => order.status === OrderStatus.PENDING || order.status === OrderStatus.PROCESSING
    ).length;

    const processedOrders = Array.from(this.orders.values()).filter(
      order => order.status === OrderStatus.COMPLETED
    ).length;

    return {
      isActive: true,
      supportedChains: ['sui', 'evm'],
      pendingOrders,
      processedOrders,
      totalOrders: this.orders.size,
    };
  }

  /**
   * Submit a new order for processing
   */
  public async submitOrder(orderData: SubmitOrderRequest): Promise<SubmitOrderResponse> {
    // Basic validation
    this.validateOrderData(orderData);

    const orderId = `order_${++this.orderCounter}_${Date.now()}`;
    
    
    const order: Order = {
      id: orderId,
      chain: orderData.chain,
      order: orderData.payload.order,
      txHash: orderData.payload.txHash || '',
      signature: orderData.payload.signature || '',
      status: OrderStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.orders.set(orderId, order);

    // Simulate order processing (in real implementation, this would trigger actual processing)
    // setTimeout(() => {
    //   this.processOrder(orderId);
    // }, 1000);

    return {
      orderId,
      status: OrderStatus.PENDING,
      estimatedProcessingTime: 300, // 5 minutes
      fee: '0.1', // 0.1% fee
      message: 'Order submitted successfully and is pending processing'
    };
  }

  /**
   * Get order status by ID
   */
  public async getOrderStatus(orderId: string): Promise<Order | null> {
    return this.orders.get(orderId) || null;
  }

  /**
   * Get all orders with optional filtering
   */
  public async getAllOrders(filters: GetOrdersFilters): Promise<PaginatedResponse<Order>> {
    let ordersArray = Array.from(this.orders.values());

    // Apply filters
    if (filters.status) {
      ordersArray = ordersArray.filter(order => order.status === filters.status);
    }
    if (filters.chain) {
      ordersArray = ordersArray.filter(order => order.chain === filters.chain);
    }
    // Sort by creation date (newest first)
    ordersArray.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    // Apply pagination
    const limit = filters.limit || 20;
    const offset = filters.offset || 0;
    const total = ordersArray.length;
    const paginatedOrders = ordersArray.slice(offset, offset + limit);

    return {
      data: paginatedOrders,
      pagination: {
        limit,
        offset,
        total,
        hasMore: offset + limit < total
      }
    };
  }

  /**
   * Cancel an order
   */
  public async cancelOrder(orderId: string): Promise<{ success: boolean; message: string }> {
    const order = this.orders.get(orderId);
    
    if (!order) {
      throw new Error('Order not found');
    }

    if (order.status === OrderStatus.COMPLETED) {
      throw new Error('Cannot cancel a completed order');
    }

    if (order.status === OrderStatus.CANCELLED) {
      throw new Error('Order is already cancelled');
    }

    order.status = OrderStatus.CANCELLED;
    order.updatedAt = new Date();
    this.orders.set(orderId, order);

    return {
      success: true,
      message: 'Order cancelled successfully'
    };
  }

  /**
   * Get supported chains
   */
  public async getSupportedChains(): Promise<SupportedChain[]> {
    return [
      {
        chainId: 'Sepolia',
        name: 'Sepolia',
        rpcUrl: 'https://eth-mainnet.alchemyapi.io/v2/...',
        isActive: true,
        supportedTokens: ['ETH', 'USDC', 'USDT', 'DAI'],
        blockConfirmations: 12
      },
      {
        chainId: 'Sui',
        name: 'Sui Network',
        rpcUrl: 'https://fullnode.mainnet.sui.io',
        isActive: true,
        supportedTokens: ['SUI', 'USDC'],
        blockConfirmations: 1
      }
    ];
  }

  /**
   * Validate order data
   */
  private validateOrderData(orderData: SubmitOrderRequest): void {
    if (!orderData.chain || !orderData.payload) {
      throw new Error('Chain and payload are required');
    }

    if (orderData.chain === 'sui') {
      if (!orderData.payload.order || !orderData.payload.txHash) {
        throw new Error('Order and txHash are required');
      }
    }
    if (orderData.chain === 'evm') {
      if (!orderData.payload.order || !orderData.payload.signature) {
        throw new Error('Order and signature are required');
      }
    }
  }

  /**
   * Simulate order processing
   */
  private async processOrder(orderId: string): Promise<void> {
    const order = this.orders.get(orderId);
    if (!order) return;

    // Update to processing
    order.status = OrderStatus.PROCESSING;
    order.updatedAt = new Date();
    this.orders.set(orderId, order);

    // Simulate processing time
    setTimeout(() => {
      const updatedOrder = this.orders.get(orderId);
      if (updatedOrder && updatedOrder.status === OrderStatus.PROCESSING) {
        // Simulate successful completion (90% success rate)
        const isSuccessful = Math.random() > 0.1;
        
        updatedOrder.status = isSuccessful ? OrderStatus.COMPLETED : OrderStatus.FAILED;
        updatedOrder.updatedAt = new Date();
        
        if (isSuccessful) {
          updatedOrder.transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;
          updatedOrder.destinationTransactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;
        }
        
        this.orders.set(orderId, updatedOrder);
        console.log(`Order ${orderId} ${isSuccessful ? 'completed' : 'failed'}`);
      }
    }, 5000); // 5 seconds processing time
  }
}