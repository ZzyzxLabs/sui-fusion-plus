/**
 * Basic types for the relayer service
 */

export interface Order {
  id: string;
  chain: string;
  targetChain: string;
  order: any;
  txHash: string;
  signature: string;
  secret?: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  transactionHash?: string;
  destinationTransactionHash?: string;
  srcEscrowAddress?: string;
  dstEscrowAddress?: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
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
  chain: "sui" | "evm",
  payload: any
}

export interface SubmitOrderResponse {
  orderId: string;
  orderHash?: string; // For backward compatibility
  status: OrderStatus;
  estimatedProcessingTime: number;
  fee: string;
  message: string;
}

export interface GetOrdersFilters {
  status?: OrderStatus;
  chain?: string;
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

export interface SignatureRequest {
  orderId: string;
  resolverId?: string;
}

export interface SignatureResponse {
  orderId: string;
  signature?: string;
  targetChain: "sui" | "evm";
  order: any;
}

export interface VerifyRequest {
  orderId: string;
  escrowSrc: string;
  escrowDst: string;
}

export interface VerifyResponse {
  verified: boolean;
  issues: string[];
}

export interface SecretRequest {
  orderId: string;
  secret: string;
}

export interface SecretResponse {
  success: boolean;
  message: string;
  status: OrderStatus;
}