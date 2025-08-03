import * as Sdk from 'cross-chain-sdk-custom';
import { NetworkEnum } from 'cross-chain-sdk-custom';
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
  escrowFactory: '0x1234567890123456789012345678901234567890',
  resolver: '0x0987654321098765432109876543210987654321'
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
    
    // Get current timestamp
    const srcTimestamp = BigInt(Math.floor(Date.now() / 1000));
    
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
        makingAmount: parseUnits('100', 6),
        takingAmount: parseUnits('99', 6),
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
    
    // Additional order information
    console.log('\nOrder Details:');
    console.log('- Making Amount:', formatUnits(parseUnits('100', 6), 6), 'USDC');
    console.log('- Taking Amount:', formatUnits(parseUnits('99', 6), 6), 'Target Token');
    console.log('- Maker:', await srcChainUser.getAddress());
    console.log('- Receiver:', receiver);
    console.log('- Source Chain ID:', srcChainId.toString());
    console.log('- Destination Chain ID:', dstChainId.toString());
    
  } catch (error) {
    console.error('Error in main function:', error);
    throw error;
  }
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