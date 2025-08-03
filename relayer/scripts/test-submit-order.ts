#!/usr/bin/env tsx

/**
 * Test script to demonstrate order creation and submission
 * This script creates a cross-chain order, signs it, and submits to the backend
 */

import { main } from './create-order';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testOrderSubmission() {
  try {
    console.log('🚀 Starting order creation and submission test...');
    console.log('📡 Backend URL:', process.env.SERVER_URL || 'http://localhost:8000');
    
    // Run the main example function which now includes backend submission
    await main();
    
    console.log('\n✅ Test completed successfully!');
    console.log('📝 Next steps:');
    console.log('   1. Check the resolver logs to see if the order was picked up');
    console.log('   2. Monitor the order processing through the backend API');
    console.log('   3. Verify escrow deployments on both chains');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED')) {
        console.error('\n💡 Troubleshooting:');
        console.error('   - Make sure the backend server is running');
        console.error('   - Check if SERVER_URL is correct in your .env file');
        console.error('   - Verify the server is listening on the specified port');
      } else if (error.message.includes('400')) {
        console.error('\n💡 Troubleshooting:');
        console.error('   - Check the order payload format');
        console.error('   - Verify all required fields are present');
        console.error('   - Ensure signature is valid');
      }
    }
    
    process.exit(1);
  }
}

// Run test if executed directly
if (require.main === module) {
  testOrderSubmission();
}

export { testOrderSubmission };