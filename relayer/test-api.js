/**
 * Simple test script for the enhanced relayer API
 * Run with: node test-api.js
 * 
 * Make sure the relayer server is running on port 3000
 */

import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/relayer';

// Helper function to make API calls
async function apiCall(method, endpoint, data = null) {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
      status: error.response?.status || 500
    };
  }
}

// Test data
const evmOrderData = {
  chain: 'evm',
  payload: {
    evm: {
      order: {
        asset: '0xA0b86a33E6776808d5f67De71Ff7efCE9b5A0AA5',
        amount: '1000000000000000000',
        dstInfo: {
          chain: 'sui',
          recipient: '0x1234567890abcdef1234567890abcdef12345678'
        },
        nonce: '12345',
        expiry: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
      },
      signature: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234',
      maker: '0x742D35Cc6634C0532925a3b8D42C05E4d4F3fA58'
    }
  }
};

const suiOrderData = {
  chain: 'sui',
  payload: {
    sui: {
      order: {
        asset: '0x2::sui::SUI',
        amount: '1000000000',
        dstInfo: {
          chain: 'ethereum',
          recipient: '0x742D35Cc6634C0532925a3b8D42C05E4d4F3fA58'
        }
      },
      txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab'
    }
  }
};

async function runTests() {
  console.log('🚀 Starting Relayer API Tests\n');

  // Test 1: Submit EVM Order
  console.log('📝 Test 1: Submit EVM Order');
  const evmOrderResult = await apiCall('POST', '/orders', evmOrderData);
  if (evmOrderResult.success) {
    console.log('✅ EVM Order submitted successfully');
    console.log('   Order Hash:', evmOrderResult.data.orderHash);
    console.log('   Status:', evmOrderResult.data.status);
    var evmOrderHash = evmOrderResult.data.orderHash;
  } else {
    console.log('❌ EVM Order submission failed:', evmOrderResult.error);
  }
  console.log('');

  // Test 2: Submit Sui Order
  console.log('📝 Test 2: Submit Sui Order');
  const suiOrderResult = await apiCall('POST', '/orders', suiOrderData);
  if (suiOrderResult.success) {
    console.log('✅ Sui Order submitted successfully');
    console.log('   Order Hash:', suiOrderResult.data.orderHash);
    console.log('   Status:', suiOrderResult.data.status);
    var suiOrderHash = suiOrderResult.data.orderHash;
  } else {
    console.log('❌ Sui Order submission failed:', suiOrderResult.error);
  }
  console.log('');

  // Test 3: Get Orders
  console.log('📝 Test 3: Get All Orders');
  const ordersResult = await apiCall('GET', '/orders?limit=5');
  if (ordersResult.success) {
    console.log('✅ Orders retrieved successfully');
    console.log('   Total Orders:', ordersResult.data.pagination.total);
    console.log('   Orders in response:', ordersResult.data.data.length);
  } else {
    console.log('❌ Get orders failed:', ordersResult.error);
  }
  console.log('');

  // Test 4: Get Order by Hash (if we have one)
  if (evmOrderHash) {
    console.log('📝 Test 4: Get Order by Hash');
    const orderByHashResult = await apiCall('GET', `/orders/${evmOrderHash}`);
    if (orderByHashResult.success) {
      console.log('✅ Order retrieved by hash successfully');
      console.log('   Order Hash:', orderByHashResult.data.orderHash);
      console.log('   Chain:', orderByHashResult.data.chain);
      console.log('   Status:', orderByHashResult.data.status);
    } else {
      console.log('❌ Get order by hash failed:', orderByHashResult.error);
    }
    console.log('');
  }

  // Test 5: Get Signature
  if (evmOrderHash) {
    console.log('📝 Test 5: Get Signature');
    const signatureResult = await apiCall('GET', `/signature?orderHash=${evmOrderHash}`);
    if (signatureResult.success) {
      console.log('✅ Signature retrieved successfully');
      console.log('   Target Chain:', signatureResult.data.targetChain);
      console.log('   Signature:', signatureResult.data.signature.substring(0, 20) + '...');
    } else {
      console.log('❌ Get signature failed:', signatureResult.error);
    }
    console.log('');
  }

  // Test 6: Submit Auction Bid
  if (evmOrderHash) {
    console.log('📝 Test 6: Submit Auction Bid');
    const auctionData = {
      orderHash: evmOrderHash,
      bidAmount: '1100000000000000000',
      bidder: '0x742D35Cc6634C0532925a3b8D42C05E4d4F3fA58',
      parameters: {
        gasPrice: '20000000000',
        deadline: Math.floor(Date.now() / 1000) + 3600
      }
    };
    
    const auctionResult = await apiCall('POST', '/auction', auctionData);
    if (auctionResult.success) {
      console.log('✅ Auction bid submitted successfully');
      console.log('   Auction ID:', auctionResult.data.auctionId);
      var auctionId = auctionResult.data.auctionId;
    } else {
      console.log('❌ Auction bid submission failed:', auctionResult.error);
    }
    console.log('');
  }

  // Test 7: Get Auction Details
  if (auctionId) {
    console.log('📝 Test 7: Get Auction Details');
    const auctionDetailsResult = await apiCall('GET', `/auction/${auctionId}`);
    if (auctionDetailsResult.success) {
      console.log('✅ Auction details retrieved successfully');
      console.log('   Status:', auctionDetailsResult.data.status);
      console.log('   Highest Bid:', auctionDetailsResult.data.highestBid?.amount || 'None');
      console.log('   Total Bids:', auctionDetailsResult.data.bids.length);
    } else {
      console.log('❌ Get auction details failed:', auctionDetailsResult.error);
    }
    console.log('');
  }

  // Test 8: Verify Escrow
  if (evmOrderHash) {
    console.log('📝 Test 8: Verify Escrow');
    const verifyData = {
      orderHash: evmOrderHash,
      escrowSrc: '0x1111111111111111111111111111111111111111',
      escrowDst: '0x2222222222222222222222222222222222222222',
      verificationType: 'preflight',
      details: {
        txHash: '0x3333333333333333333333333333333333333333333333333333333333333333',
        status: 'confirmed'
      }
    };
    
    const verifyResult = await apiCall('POST', '/verify', verifyData);
    if (verifyResult.success) {
      console.log('✅ Escrow verification successful');
      console.log('   Verified:', verifyResult.data.verified);
      console.log('   Issues:', verifyResult.data.issues.length);
    } else {
      console.log('❌ Escrow verification failed:', verifyResult.error);
    }
    console.log('');
  }

  console.log('🏁 Tests completed!');
}

// Run the tests
runTests().catch(console.error);