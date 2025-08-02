/**
 * Configuration management utility
 */
export interface Config {
  port: number;
  nodeEnv: string;
  allowedOrigins: string[];
  
  // Blockchain RPC URLs
  rpcUrls: {
    ethereum: string;
    sui: string;
    polygon: string;
    bsc: string;
  };
  
  // Fee configuration
  relayerFeePercentage: number;
  minFeeUsd: number;
  
  // Block confirmations
  confirmationBlocks: {
    ethereum: number;
    sui: number;
    polygon: number;
    bsc: number;
  };
}

/**
 * Get application configuration from environment variables
 */
export function getConfig(): Config {
  return {
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    
    rpcUrls: {
      ethereum: process.env.ETHEREUM_RPC_URL || 'https://eth-mainnet.alchemyapi.io/v2/demo',
      sui: process.env.SUI_RPC_URL || 'https://fullnode.mainnet.sui.io',
      polygon: process.env.POLYGON_RPC_URL || 'https://polygon-rpc.com',
      bsc: process.env.BSC_RPC_URL || 'https://bsc-dataseed.binance.org'
    },
    
    relayerFeePercentage: parseFloat(process.env.RELAYER_FEE_PERCENTAGE || '0.1'),
    minFeeUsd: parseFloat(process.env.MIN_FEE_USD || '1.0'),
    
    confirmationBlocks: {
      ethereum: parseInt(process.env.CONFIRMATION_BLOCKS_ETH || '12', 10),
      sui: parseInt(process.env.CONFIRMATION_BLOCKS_SUI || '1', 10),
      polygon: parseInt(process.env.CONFIRMATION_BLOCKS_POLYGON || '20', 10),
      bsc: parseInt(process.env.CONFIRMATION_BLOCKS_BSC || '15', 10)
    }
  };
}

export default getConfig;