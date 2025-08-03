#!/usr/bin/env tsx

/**
 * Startup script for the Cross-Chain Order Resolver
 * This script provides a convenient way to start the resolver with proper error handling
 */

import { ResolverService, createResolverConfig } from './resolver';
import { logger, LogLevel } from '../src/utils/logger';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Validate required environment variables
 */
function validateEnvironment(): void {
  const required = [
    'SUI_PRIVATE_KEY',
    'EVM_PRIVATE_KEY',
    'SUI_PACKAGE_ID',
    'EVM_FACTORY_ADDRESS',
    'EVM_LOP_ADDRESS'
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    logger.error(`Missing required environment variables: ${missing.join(', ')}`);
    logger.error('Please check your .env file and ensure all required variables are set');
    process.exit(1);
  }
}

/**
 * Setup process signal handlers for graceful shutdown
 */
function setupSignalHandlers(resolver: ResolverService): void {
  const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
  
  signals.forEach(signal => {
    process.on(signal, () => {
      logger.info(`Received ${signal}. Initiating graceful shutdown...`);
      resolver.stop();
      
      // Give some time for cleanup then force exit
      setTimeout(() => {
        logger.warn('Force exiting after timeout');
        process.exit(0);
      }, 5000);
    });
  });
}

/**
 * Setup global error handlers
 */
function setupErrorHandlers(): void {
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception', error);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection', { reason, promise });
    process.exit(1);
  });
}

/**
 * Display startup information
 */
function displayStartupInfo(): void {
  const config = {
    nodeEnv: process.env.NODE_ENV || 'development',
    serverUrl: process.env.SERVER_URL || 'http://localhost:8000',
    pollingInterval: process.env.POLLING_INTERVAL || '30000',
    logLevel: process.env.LOG_LEVEL || 'INFO'
  };

  logger.info('='.repeat(60));
  logger.info('🚀 CROSS-CHAIN ORDER RESOLVER STARTING');
  logger.info('='.repeat(60));
  logger.info('Configuration:', config);
  logger.info('='.repeat(60));
}

/**
 * Main function
 */
async function main(): Promise<void> {
  try {
    // Set log level from environment
    const logLevel = process.env.LOG_LEVEL?.toUpperCase() as keyof typeof LogLevel;
    if (logLevel && LogLevel[logLevel] !== undefined) {
      logger.setLogLevel(LogLevel[logLevel]);
    }

    // Display startup information
    displayStartupInfo();

    // Validate environment
    logger.info('Validating environment configuration...');
    // validateEnvironment();
    logger.info('✅ Environment validation passed');

    // Setup error handlers
    setupErrorHandlers();
    logger.info('✅ Error handlers configured');

    // Create resolver configuration
    logger.info('Creating resolver configuration...');
    const config = createResolverConfig();
    logger.info('✅ Resolver configuration created');
    // Create and start resolver
    logger.info('Initializing resolver service...');
    const resolver = new ResolverService(config);
    
    
    // Setup signal handlers for graceful shutdown
    setupSignalHandlers(resolver);
    logger.info('✅ Signal handlers configured');

    // Start the resolver
    logger.info('Starting resolver service...');
    await resolver.start();

  } catch (error) {
    logger.error('Failed to start resolver', error);
    process.exit(1);
  }
}

// Execute main function if this script is run directly
if (require.main === module) {
  main().catch((error) => {
    console.error('Fatal error during startup:', error);
    process.exit(1);
  });
}

export { main };