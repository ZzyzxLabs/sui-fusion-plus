import * as Sdk from 'cross-chain-sdk-custom';
import { NetworkEnum } from 'cross-chain-sdk-custom';

// Type definitions for configuration
export interface TokenConfig {
  address: string;
  donor: string;
}

export interface ChainConfig {
  chainId: number;
  url: string;
  createFork: boolean;
  limitOrderProtocol: string;
  wrappedNative: string;
  ownerPrivateKey: string;
  tokens: {
    USDC: TokenConfig;
  };
}

export interface Config {
  chain: {
    source: ChainConfig;
    destination: ChainConfig;
  };
}

// Environment variables with defaults
const getEnvVar = (name: string, defaultValue?: string): string => {
  const value = process.env[name];
  if (!value) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${name} is required`);
  }
  return value;
};

const getBoolEnvVar = (name: string, defaultValue: boolean = false): boolean => {
  const value = process.env[name];
  if (!value) return defaultValue;
  return value.toLowerCase() === 'true' || value === '1';
};

// Default URLs for testing (can be overridden by environment variables)
const DEFAULT_SRC_CHAIN_RPC = 'https://ethereum-sepolia.publicnode.com';
const DEFAULT_DST_CHAIN_RPC = 'https://bsc-dataseed.binance.org';

export const config: Config = {
  chain: {
    source: {
      chainId: 11155111, // Sepolia testnet
      url: getEnvVar('SRC_CHAIN_RPC', DEFAULT_SRC_CHAIN_RPC),
      createFork: getBoolEnvVar('SRC_CHAIN_CREATE_FORK', false),
      limitOrderProtocol: '0x111111125421ca6dc452d289314280a0f8842a65',
      wrappedNative: '0xb16F35c0Ae2912430DAc15764477E179D9B9EbEa', // WETH on Sepolia
      ownerPrivateKey: getEnvVar('SRC_PRIVATE_KEY', '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'),
      tokens: {
        USDC: {
          address: '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06',
          donor: '0xd86eabc64bb62aAedF01d1D9A148C51C1F5f1438'
        }
      }
    },
    destination: {
      chainId: 56, // BSC Mainnet
      url: getEnvVar('DST_CHAIN_RPC', DEFAULT_DST_CHAIN_RPC),
      createFork: getBoolEnvVar('DST_CHAIN_CREATE_FORK', false),
      limitOrderProtocol: '0x111111125421ca6dc452d289314280a0f8842a65',
      wrappedNative: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', // WBNB
      ownerPrivateKey: getEnvVar('DST_PRIVATE_KEY', '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'),
      tokens: {
        USDC: {
          address: '0x8965349fb649a33a30cbfda057d8ec2c48abe2a2',
          donor: '0x4188663a85C92EEa35b5AD3AA5cA7CeB237C6fe9'
        }
      }
    }
  }
};

// Export chain configuration type for type safety
export type SourceChainConfig = typeof config.chain.source;
export type DestinationChainConfig = typeof config.chain.destination;

// Utility functions for configuration validation
export const validateConfig = (cfg: Config): boolean => {
  try {
    // Validate URLs
    new URL(cfg.chain.source.url);
    new URL(cfg.chain.destination.url);
    
    // Validate addresses (basic check)
    const addressPattern = /^0x[a-fA-F0-9]{40}$/;
    const privateKeyPattern = /^0x[a-fA-F0-9]{64}$/;
    
    if (!addressPattern.test(cfg.chain.source.limitOrderProtocol)) {
      throw new Error('Invalid source limitOrderProtocol address');
    }
    
    if (!addressPattern.test(cfg.chain.destination.limitOrderProtocol)) {
      throw new Error('Invalid destination limitOrderProtocol address');
    }
    
    if (!privateKeyPattern.test(cfg.chain.source.ownerPrivateKey)) {
      throw new Error('Invalid source private key format');
    }
    
    if (!privateKeyPattern.test(cfg.chain.destination.ownerPrivateKey)) {
      throw new Error('Invalid destination private key format');
    }
    
    return true;
  } catch (error) {
    console.error('Configuration validation failed:', error);
    return false;
  }
};

// Validate configuration on import
if (!validateConfig(config)) {
  throw new Error('Invalid configuration detected');
}

console.log('Configuration loaded successfully');
console.log(`Source Chain: ${config.chain.source.chainId} (${config.chain.source.url})`);
console.log(`Destination Chain: ${config.chain.destination.chainId} (${config.chain.destination.url})`);

export default config;