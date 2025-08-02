# Setup SDK

## Initial Setup Steps

Follow these steps to set up the cross-chain SDK:

### 1. Check and Modify Package Manager in init.sh

Before running the setup, check the package manager used in the init.sh script and modify it to match your preferred one:

```bash
# View the current init.sh file
cat cross-chain-sdk-custom/init.sh
```

The script currently uses `npm install --legacy-peer-deps`. If you prefer to use a different package manager (like `pnpm`, `yarn`, or `bun`), you need to edit the init.sh file:

```bash
# Example: Change from npm to pnpm
# Edit cross-chain-sdk-custom/init.sh and replace:
# npm install --legacy-peer-deps
# with:
# pnpm install --legacy-peer-deps
```

**Note**: The project appears to have `pnpm-lock.yaml` files, suggesting `pnpm` might be the preferred package manager.

### 2. Navigate to Cross-Chain SDK Directory
```bash
cd cross-chain-sdk-custom
```

### 3. Make Init Script Executable
```bash
chmod +x init.sh
```

### 4. Execute Init Script
```bash
./init.sh
```

## Next Steps

After running the initial setup, you can proceed with further SDK configuration and usage.

## 📋 Package Integration

### For Relayer Service Integration

To integrate the cross-chain SDK into your relayer service, add the following to your `package.json`:

#### 1. Add Local Dependency
```json
{
  "dependencies": {
    "cross-chain-sdk-custom": "file:../cross-chain-sdk-custom/cross-chain-sdk"
  }
}
```

#### 2. Add Build Scripts
```json
{
  "scripts": {
    "build-sdk": "cd ../cross-chain-sdk-custom/cross-chain-sdk && npm run build",
    "build-all": "npm run build-sdk && npm run build",
    "dev-with-sdk": "npm run build-sdk && npm run dev"
  }
}
```

#### 3. Install Dependencies
```bash
npm install
```


