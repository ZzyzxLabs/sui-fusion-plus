# Cross-Chain Order Resolver

This resolver service handles the complete cross-chain order resolution flow for the SUI Fusion Plus project.

## Overview

The resolver is responsible for:

1. **Polling for Orders**: Continuously monitors the backend server for pending cross-chain orders
2. **Auction Resolution**: Retrieves auction information and determines the optimal resolution direction
3. **Escrow Deployment**: Creates escrow contracts on both source and destination chains
4. **Order Execution**: Interacts with Limit Order Protocol (LOP) to fill orders
5. **Verification**: Validates escrow states and notifies the backend for final verification
6. **Status Management**: Updates order status throughout the resolution process

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Backend API   │    │    Resolver     │    │  Blockchain     │
│                 │    │    Service      │    │   Networks      │
│ • Order Mgmt    │◄──►│                 │◄──►│                 │
│ • Verification  │    │ • Order Poll    │    │ • Sui Network   │
│ • Status Track  │    │ • Escrow Deploy │    │ • EVM Chains    │
└─────────────────┘    │ • LOP Interact  │    └─────────────────┘
                       │ • Verification  │
                       └─────────────────┘
```

## Features

### 🔄 Automated Order Processing
- Polls backend server for pending orders
- Determines optimal cross-chain direction (Sui↔EVM)
- Handles both directions seamlessly

### 🏦 Escrow Management
- Deploys source and destination escrows
- Validates escrow states and balances
- Ensures atomic cross-chain transfers

### 🔗 Multi-Chain Support
- **Sui Network**: Native Move contract interactions
- **EVM Chains**: Ethereum, Polygon, BSC support
- Extensible architecture for additional chains

### 🛡️ Robust Error Handling
- Comprehensive logging with contextual information
- Automatic retry mechanisms
- Graceful failure recovery

### ⚡ Performance Optimized
- Parallel transaction processing
- Efficient chain interaction utilities
- Configurable confirmation requirements

## Setup

### 1. Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env
```

Configure the following required variables:
```env
# Private Keys (Required)
SUI_PRIVATE_KEY=your_sui_private_key_hex
EVM_PRIVATE_KEY=your_evm_private_key_hex

# Contract Addresses (Required)
SUI_PACKAGE_ID=0x...
EVM_FACTORY_ADDRESS=0x...
EVM_LOP_ADDRESS=0x...

# RPC URLs (Optional - defaults provided)
SUI_RPC_URL=https://fullnode.testnet.sui.io
ETHEREUM_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your-key

# Server Configuration
SERVER_URL=http://localhost:3000
POLLING_INTERVAL=30000
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build Dependencies

```bash
npm run build-sdk
```

## Running the Resolver

### Development Mode
```bash
npm run resolver
# or with auto-restart
npm run resolver:dev
```

### Production Mode
```bash
npm run build
npm run resolver:build
```

### Manual Execution
```bash
tsx scripts/startResolver.ts
```

## Configuration Options

| Variable | Description | Default |
|----------|-------------|---------|
| `POLLING_INTERVAL` | Time between order polls (ms) | 30000 |
| `MAX_RETRIES` | Max transaction retry attempts | 5 |
| `CONFIRMATION_BLOCKS_ETH` | EVM confirmation blocks | 12 |
| `CONFIRMATION_BLOCKS_SUI` | Sui confirmation blocks | 1 |
| `LOG_LEVEL` | Logging level (DEBUG/INFO/WARN/ERROR) | INFO |

## Order Resolution Flow

### 1. Order Discovery
```typescript
// Polls backend for pending orders
GET /api/v1/relayer/orders?status=pending
```

### 2. Auction Resolution
```typescript
// Gets resolve intent and auction info
GET /api/v1/relayer/resolve-intent?orderId={id}
```

### 3. Escrow Deployment
- **Sui→EVM**: Deploy source escrow on Sui, destination on EVM
- **EVM→Sui**: Deploy source escrow on EVM, destination on Sui

### 4. Order Execution
- Interact with LOP to fill the order
- Lock funds in appropriate escrows
- Wait for transaction confirmations

### 5. Verification
```typescript
// Verify escrow states
POST /api/v1/relayer/verify
{
  "orderId": "order_123",
  "escrowSrc": "0x...",
  "escrowDst": "0x..."
}
```

### 6. Completion
- Update order status to COMPLETED or FAILED
- Log resolution results

## Chain Interactions

### Sui Network
- **Package**: Move contracts for escrow and LOP
- **Transactions**: Signed with Ed25519 keypair
- **Confirmations**: Immediate finality

### EVM Chains
- **Contracts**: Solidity escrow factory and LOP
- **Transactions**: Signed with ECDSA wallet
- **Confirmations**: Configurable block depth

## Monitoring and Logging

### Log Levels
- **DEBUG**: Detailed execution flow
- **INFO**: Important events and status changes
- **WARN**: Recoverable issues
- **ERROR**: Critical failures

### Log Context
Every log entry includes:
- Timestamp
- Order ID (when applicable)
- Chain information
- Transaction hashes

### Example Log Output
```
2025-01-09T10:30:00.000Z INFO  [order_123] [sui] Starting order processing
2025-01-09T10:30:01.000Z INFO  [order_123] [sui] [0xabc123...] Sui source escrow deployed
2025-01-09T10:30:02.000Z INFO  [order_123] [evm] [0xdef456...] EVM destination escrow deployed
2025-01-09T10:30:05.000Z INFO  [order_123] Order completed successfully
```

## Error Handling

### Common Issues
1. **Missing Private Keys**: Ensure both SUI and EVM keys are configured
2. **Invalid Contract Addresses**: Verify package/contract addresses
3. **Insufficient Funds**: Ensure wallets have enough balance for gas
4. **Network Connectivity**: Check RPC endpoint availability

### Retry Logic
- Automatic retry for transient failures
- Exponential backoff for network issues
- Maximum retry limits to prevent infinite loops

### Graceful Shutdown
- SIGINT/SIGTERM handling
- Cleanup of pending operations
- Safe state preservation

## Development

### Code Structure
```
scripts/
├── resolver.ts          # Main resolver service
├── startResolver.ts     # Startup script
src/utils/
├── chainInteraction.ts  # Blockchain utilities
├── logger.ts           # Logging system
└── config.ts           # Configuration management
```

### Adding New Chains
1. Extend `chainInteraction.ts` with new chain class
2. Update configuration interface
3. Add chain-specific logic to resolver
4. Update documentation

### Testing
```bash
# Type checking
npm run type-check

# Build test
npm run build

# Integration test with testnet
npm run resolver
```

## Security Considerations

⚠️ **Important**: Never commit private keys to version control

- Use environment variables for sensitive data
- Rotate keys regularly
- Monitor wallet balances
- Use separate keys for different environments
- Implement rate limiting for production use

## Troubleshooting

### Resolver Won't Start
- Check environment variable configuration
- Verify network connectivity to RPC endpoints
- Ensure private keys are valid hex strings

### Orders Not Processing
- Confirm backend server is running and accessible
- Check order status in backend database
- Verify contract addresses are correct

### Transaction Failures
- Check wallet balances for gas fees
- Verify contract state on blockchain explorers
- Review error logs for specific failure reasons

## Support

For issues and questions:
1. Review logs for error details
2. Check configuration against examples
3. Verify blockchain network status
4. Submit issue with relevant log excerpts