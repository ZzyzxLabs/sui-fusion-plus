/**
 * Basic types for the relayer service
 */

export interface Order {
  id: string;
  sourceChain: string;
  destinationChain: string;
  sourceToken: string;
  destinationToken: string;
  amount: string;
  recipient: string;
  sender: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  transactionHash?: string;
  destinationTransactionHash?: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export interface RelayerStatus {
  isActive: boolean;
  supportedChains: string[];
  pendingOrders: number;
  processedOrders: number;
  totalOrders: number;
  lastProcessedBlock: {
    [chainId: string]: number;
  };
  balances: {
    [chainId: string]: {
      [tokenAddress: string]: string;
    };
  };
}

export interface SupportedChain {
  chainId: string;
  name: string;
  rpcUrl: string;
  isActive: boolean;
  supportedTokens: string[];
  blockConfirmations: number;
}

export interface SubmitOrderRequest {
  sourceChain: string;
  destinationChain: string;
  sourceToken: string;
  destinationToken: string;
  amount: string;
  recipient: string;
  sender: string;
  deadline?: number;
  slippage?: number;
}

export interface SubmitOrderResponse {
  orderId: string;
  status: OrderStatus;
  estimatedProcessingTime: number;
  fee: string;
  message: string;
}

export interface GetOrdersFilters {
  status?: OrderStatus;
  sourceChain?: string;
  destinationChain?: string;
  sender?: string;
  limit?: number;
  offset?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
    hasMore: boolean;
  };
}