# Cross-Chain Resolver Setup Guide

## Quick Start

### 1. Environment Setup

```bash
# Copy the environment template
cp env.example .env

# Edit the configuration
nano .env  # or use your preferred editor
```

### 2. Required Configuration

**Critical variables that MUST be set:**

```env
# Server endpoint (matches your backend)
SERVER_URL=http://localhost:8000

# Private keys for signing transactions
SUI_PRIVATE_KEY=your_sui_private_key_hex_format
EVM_PRIVATE_KEY=your_evm_private_key_hex_format

# Contract addresses (get these from your deployments)
SUI_PACKAGE_ID=0x...
EVM_FACTORY_ADDRESS=0x...
EVM_LOP_ADDRESS=0x...

# RPC endpoints
SUI_RPC_URL=https://fullnode.testnet.sui.io:443
ETHEREUM_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
```

### 3. Install Dependencies

```bash
npm install
npm run build-sdk
```

### 4. Run the Resolver

```bash
# Development mode (with validation disabled as per your changes)
npm run resolver:dev

# Production mode
npm run resolver

# Manual start
tsx scripts/startResolver.ts
```

## Configuration Explained

### Server Configuration
- `SERVER_URL`: Your backend API endpoint (you changed it to port 8000)
- `POLLING_INTERVAL`: How often to check for new orders (milliseconds)
- `MAX_RETRIES`: Number of retry attempts for failed operations

### Private Keys
- Generate new keypairs for testing:
  ```bash
  # For Sui
  sui client new-address ed25519
  
  # For EVM (using ethers.js)
  node -e "console.log(require('ethers').Wallet.createRandom().privateKey)"
  ```

### Contract Addresses
- Deploy your contracts first and update these addresses
- `SUI_PACKAGE_ID`: Your deployed Move package
- `EVM_FACTORY_ADDRESS`: Escrow factory contract
- `EVM_LOP_ADDRESS`: Limit Order Protocol contract

## Validation Bypass

Since you commented out `validateEnvironment()`, the resolver will start even with missing environment variables. This is useful for development but remember to:

1. Set the essential variables manually
2. Re-enable validation for production deployments

## Testing

### 1. Check Resolver Status
```bash
curl http://localhost:8000/api/v1/relayer/status
```

### 2. Submit Test Order
```bash
curl -X POST http://localhost:8000/api/v1/relayer/orders \
  -H "Content-Type: application/json" \
  -d '{
    "chain": "sui",
    "payload": {
      "order": {...},
      "txHash": "0x..."
    }
  }'
```

### 3. Monitor Logs
The resolver will output detailed logs showing:
- Order polling activity
- Escrow deployment progress
- Transaction confirmations
- Verification results

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Check `SERVER_URL` matches your backend port
   - Ensure backend server is running

2. **Private Key Errors**
   - Verify keys are in correct hex format (64 characters)
   - Ensure keys have sufficient balance for gas fees

3. **Contract Not Found**
   - Verify contract addresses are correct
   - Check if contracts are deployed on the right network

4. **RPC Errors**
   - Verify RPC URLs are accessible
   - Check API keys for services like Alchemy

### Debug Mode

Set `LOG_LEVEL=DEBUG` in your `.env` file for detailed logging:

```env
LOG_LEVEL=DEBUG
```

This will show all resolver operations including:
- Order polling requests
- Transaction details
- Escrow verification steps
- Backend API calls

## Security Checklist

- [ ] Private keys are not committed to version control
- [ ] Using testnet for development
- [ ] RPC endpoints are secured with API keys
- [ ] Wallet balances are monitored
- [ ] Environment validation enabled in production
- [ ] Proper access controls on the server

## Next Steps

1. Configure your environment variables
2. Test with a few orders on testnet
3. Monitor logs and performance
4. Gradually increase order volume
5. Set up monitoring and alerts for production

## Support

Check the logs first for error details. Most issues are configuration-related and can be resolved by:
1. Verifying environment variables
2. Checking network connectivity
3. Ensuring sufficient wallet balances
4. Validating contract addresses