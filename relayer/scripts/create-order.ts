import * as Sdk from 'cross-chain-sdk-custom';
import {fromTwos, Interface, Signature, TransactionRequest} from 'ethers'
import { CrossChainOrder, NetworkEnum } from 'cross-chain-sdk-custom';
import { config } from './config';
import {
  computeAddress,
  Contract,
  ContractFactory,
  JsonRpcProvider,
  MaxUint256,
  parseEther,
  parseUnits,
  randomBytes,
  Wallet as SignerWallet,
  formatUnits,
  Wallet
} from 'ethers';
import axios from 'axios';
import resolverAbi from '../src/utils/abi/resolver.json';

// Type extraction
const { Address } = Sdk;

// Constants
const UINT_40_MAX = (1n << 40n) - 1n;

// Utility function
function uint8ArrayToHex(bytes: Uint8Array): string {
  return '0x' + Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Mock deployment info
interface DeploymentInfo {
  escrowFactory: string;
  resolver: string;
}

const src: DeploymentInfo = {
  escrowFactory: process.env.EVM_ESCROW_FACTORY_ADDRESS || '',
  resolver: process.env.EVM_RESOLVER_ADDRESS || ''
};

async function main(): Promise<void> {
  try {
    // Setup providers and wallets
    const srcProvider = new JsonRpcProvider(config.chain.source.url);
    const dstProvider = new JsonRpcProvider(config.chain.destination.url);
    
    const srcChainUser = new Wallet(config.chain.source.ownerPrivateKey, srcProvider);
    const dstChainUser = new Wallet(config.chain.destination.ownerPrivateKey, dstProvider);
    
    // Chain IDs - mapping to NetworkEnum
    const srcChainId = config.chain.source.chainId === 11155111 ? NetworkEnum.SEPOLIA : NetworkEnum.ETHEREUM;
    const dstChainId = config.chain.destination.chainId === 56 ? NetworkEnum.BINANCE : NetworkEnum.POLYGON;
    
    // Get current timestamp from blockchain (like simple-contract-test.ts)
    const latestBlock = await srcProvider.getBlock('latest');
    const srcTimestamp = BigInt(latestBlock!.timestamp);
    
    // Generate receiver and token addresses
    const receiver = Sdk.hashTo20Bytes('0x22233a6316cf6030d5d1286a41f80c3a54196156d5f6079d8e476ea0f7aeb537');
    const takerToken = Sdk.hashTo20Bytes('0x2::sui::SUI');
    
    console.log('receiver', receiver);
    console.log('source chain user address:', await srcChainUser.getAddress());
    console.log('destination chain user address:', await dstChainUser.getAddress());
    
    // User creates order
    const secret = uint8ArrayToHex(randomBytes(32)); // note: use crypto secure random number in real world
    console.log('Generated secret:', secret);
    
    const order = Sdk.CrossChainOrder.new(
      new Address(src.escrowFactory),
      {
        salt: Sdk.randBigInt(1000n),
        maker: new Address(await srcChainUser.getAddress()),
        makingAmount: parseUnits('1', 6), // 減少到 1 USDC (測試用)
        takingAmount: parseUnits('0.99', 6), // 對應 0.99 USDC
        makerAsset: new Address(config.chain.source.tokens.USDC.address),
        takerAsset: new Address(takerToken),
        receiver: new Address(receiver),
      },
      {
        hashLock: Sdk.HashLock.forSingleFill(secret),
        timeLocks: Sdk.TimeLocks.new({
          srcWithdrawal: 10n, // 10sec finality lock for test
          srcPublicWithdrawal: 120n, // 2m for private withdrawal
          srcCancellation: 121n, // 1sec public withdrawal
          srcPublicCancellation: 122n, // 1sec private cancellation
          dstWithdrawal: 10n, // 10sec finality lock for test
          dstPublicWithdrawal: 100n, // 100sec private withdrawal
          dstCancellation: 101n // 1sec public withdrawal
        }),
        srcChainId,
        dstChainId,
        srcSafetyDeposit: parseEther('0.001'),
        dstSafetyDeposit: parseEther('0.001')
      },
      {
        auction: new Sdk.AuctionDetails({
          initialRateBump: 0,
          points: [],
          duration: 120n,
          startTime: srcTimestamp
        }),
        whitelist: [
          {
            address: new Address(src.resolver),
            allowFrom: 0n
          }
        ],
        resolvingStartTime: 0n
      },
      {
        nonce: Sdk.randBigInt(UINT_40_MAX),
        allowPartialFills: false,
        allowMultipleFills: false
      }
    );

    // Get order hash and typed data for signing
    const orderHash = order.getOrderHash(srcChainId);
    
    // Get typed data for EIP-712 signing
    const typedData = order.getTypedData(srcChainId);
    
    // Sign the typed data using EIP-712
    // Extract only the Order type and remove EIP712Domain from types
    const orderTypes = { Order: typedData.types.Order };
    const signature = await srcChainUser.signTypedData(
      typedData.domain,
      orderTypes,
      typedData.message
    );
    
    console.log('Order created successfully!');
    console.log('Order hash:', orderHash);
    console.log('Signature:', signature);

    // 檢查 USDC 餘額和授權 (like simple-contract-test.ts)
    console.log('\n💰 檢查 USDC 餘額和授權...');
    const usdcContract = new Contract(
      config.chain.source.tokens.USDC.address,
      [
        'function balanceOf(address account) view returns (uint256)',
        'function allowance(address owner, address spender) view returns (uint256)',
        'function symbol() view returns (string)'
      ],
      srcChainUser
    );
    
    const usdcBalance = await usdcContract.balanceOf(await srcChainUser.getAddress());
    const lopAddress = '0x111111125421ca6dc452d289314280a0f8842a65'; // 1inch LOP v4 on Sepolia
    const allowance = await usdcContract.allowance(await srcChainUser.getAddress(), lopAddress);
    
    console.log('💰 當前 USDC 餘額:', formatUnits(usdcBalance, 6), 'USDC');
    console.log('✅ LOP 授權額度:', formatUnits(allowance, 6), 'USDC');
    console.log('📊 訂單需要:', formatUnits(order.makingAmount, 6), 'USDC');
    
    if (usdcBalance < order.makingAmount) {
      console.log('⚠️  USDC 餘額不足，需要先獲取測試 USDC');
      console.log('   🚰 Aave Faucet: https://staging.aave.com/faucet/');
      console.log('   💡 或者減少 makingAmount');
      throw new Error('Insufficient USDC balance');
    }
    
    if (allowance < order.makingAmount) {
      console.log('⚠️  需要先授權 USDC 給 Limit Order Protocol');
      console.log('   📍 LOP 地址:', lopAddress);
      console.log('   💡 執行: await usdcContract.approve("' + lopAddress + '", ethers.parseUnits("1000", 6))');
      throw new Error('Insufficient USDC allowance for LOP');
    }
    
    console.log('✅ 餘額和授權檢查通過');

    // Additional order information
    console.log('\nOrder Details:');
    console.log('- Making Amount:', formatUnits(order.makingAmount, 6), 'USDC');
    console.log('- Taking Amount:', formatUnits(order.takingAmount, 6), 'Target Token');
    console.log('- Maker:', await srcChainUser.getAddress());
    console.log('- Receiver:', receiver);
    console.log('- Source Chain ID:', srcChainId.toString());
    console.log('- Destination Chain ID:', dstChainId.toString());

    // Submit order to backend
    console.log('\n📤 Submitting order to backend...');
    await submitOrderToBackend(order, orderHash, signature, srcChainId);
    
  } catch (error) {
    console.error('Error in main function:', error);
    throw error;
  }
}

/**
 * Submit the signed order to the backend relayer service
 */
async function submitOrderToBackend(
  order: CrossChainOrder,
  orderHash: string,
  signature: string,
  chainId: NetworkEnum
): Promise<void> {
  try {
    // Backend server URL (from env or default)
    const serverUrl = process.env.SERVER_URL || 'http://localhost:8000';
    
    const takerTraits = Sdk.TakerTraits.default()
    .setExtension(order.extension)
    .setAmountMode(Sdk.AmountMode.maker)
    .setAmountThreshold(order.takingAmount)
    
    // Determine chain type based on NetworkEnum
    const chainType = isEvmChain(chainId) ? 'evm' : 'sui';
    console.log('order', order);
    const {r, yParityAndS: vs} = Signature.from(signature)
    const {args, trait} = takerTraits.encode()
    const immutables = order.toSrcImmutables(11155111, new Sdk.Address(process.env.EVM_RESOLVER_ADDRESS || ''), order.makingAmount, order.escrowExtension.hashLockInfo)
    const iface = new Interface(resolverAbi.abi)
    const deploySrc = {
        to: process.env.EVM_RESOLVER_ADDRESS || '',
        data: iface.encodeFunctionData('deploySrc', [
            immutables.build(),
            order.build(),
            r,
            vs,
            order.makingAmount,
            trait,
            args
        ]),
        value: order.escrowExtension.srcSafetyDeposit.toString()
    }
    console.log('deploySrc', deploySrc);
    // Prepare order payload for backend
    const orderPayload = {
      chain: chainType,
      payload: {
        order: {
          deploySrc: deploySrc,
          orderHash: orderHash,
          chainId: chainId,
        },
        signature: signature,
        orderHash: orderHash,
        // Include additional metadata
        metadata: {
          createdAt: new Date().toISOString(),
          version: '1.0.0',
          sdkVersion: 'cross-chain-sdk-custom'
        }
        
      }
    };

    console.log('🔄 Sending POST request to:', `${serverUrl}/api/v1/relayer/orders`);
    console.log('📦 Payload preview:', JSON.stringify(orderPayload, (key, value) => 
      typeof value === 'bigint' ? value.toString() : value, 2));

    // Send POST request to backend
    const response = await axios.post(
      `${serverUrl}/api/v1/relayer/orders`,
      orderPayload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000 // 30 second timeout
      }
    );

    // Handle successful response
    if (response.status === 201) {
      console.log('✅ Order submitted successfully!');
      console.log('📋 Response:', {
        orderId: response.data.orderId,
        status: response.data.status,
        message: response.data.message,
        estimatedProcessingTime: response.data.estimatedProcessingTime,
        fee: response.data.fee
      });
      
      // Store order ID for later reference
      const orderId = response.data.orderId;
      console.log(`\n🔍 You can check order status with: GET ${serverUrl}/api/v1/relayer/order/${orderId}`);
      
    } else {
      console.warn('⚠️ Unexpected response status:', response.status);
      console.log('Response data:', response.data);
    }

  } catch (error) {
    console.error('❌ Failed to submit order to backend:');
    
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error status
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        // Network error
        console.error('Network error - no response received');
        console.error('Please check if the backend server is running on:', process.env.SERVER_URL || 'http://localhost:8000');
      } else {
        console.error('Request setup error:', error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    
    throw error;
  }
}

/**
 * Check if the given chain is an EVM-compatible chain
 */
function isEvmChain(chainId: NetworkEnum): boolean {
  const evmChains = [
    NetworkEnum.ETHEREUM,
    NetworkEnum.SEPOLIA,
    NetworkEnum.POLYGON,
    NetworkEnum.BINANCE,
    NetworkEnum.ARBITRUM,
    NetworkEnum.OPTIMISM,
    NetworkEnum.FANTOM,
    NetworkEnum.AVALANCHE
  ];
  
  return evmChains.includes(chainId);
}

// Execute main function
// Check if this file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
    .then(() => {
      console.log('Example completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Example failed:', error);
      process.exit(1);
    });
}

export { main, config, uint8ArrayToHex };