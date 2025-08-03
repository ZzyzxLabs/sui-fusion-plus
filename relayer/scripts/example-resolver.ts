#!/usr/bin/env tsx

/**
 * Example script demonstrating resolver usage
 * This shows how to manually create and use the resolver service
 */

import { ResolverService, createResolverConfig } from './resolver';
import { logger, LogLevel } from '../src/utils/logger';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function runExample() {
  try {
    // Set debug log level for detailed output
    logger.setLogLevel(LogLevel.DEBUG);
    
    logger.info('🚀 Starting Resolver Example');
    
    // Create configuration
    const config = createResolverConfig();
    logger.info('Configuration created', config);
    
    // Create resolver instance
    const resolver = new ResolverService(config);
    
    // Start resolver (this will run indefinitely)
    logger.info('Starting resolver service...');
    await resolver.start();
    
  } catch (error) {
    logger.error('Example failed', error);
    process.exit(1);
  }
}

// Run example if executed directly
if (require.main === module) {
  runExample();
}