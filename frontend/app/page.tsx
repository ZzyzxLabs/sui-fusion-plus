
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { UINT_40_MAX } from '@/cross-chain-sdk-custom/fusion-sdk/src';
import { keccak256, parseEther, toUtf8Bytes, sha256 } from 'ethers';
import { HashLock, MerkleLeaf } from '@/cross-chain-sdk-custom/cross-chain-sdk/src/cross-chain-order/hash-lock/hash-lock';
import { CrossChainOrder } from '@/cross-chain-sdk-custom/cross-chain-sdk/src/cross-chain-order';
import { Address, AuctionDetails, NetworkEnum } from '@1inch/fusion-sdk';
import { TimeLocks } from '@/cross-chain-sdk-custom/cross-chain-sdk/src/cross-chain-order/time-locks';
import { TRUE_ERC20, ESCROW_FACTORY } from '@/cross-chain-sdk-custom/cross-chain-sdk/src/deployments';
import { config } from './config';
import { useAccount, useConnect, useDisconnect, useBalance, useSignTypedData } from 'wagmi';

import { randBiInt } from '@/cross-chain-sdk-custom/limit-order-sdk/src/utils/rand-bigint';
import { Network } from 'inspector/promises';
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClientQuery,
  useAutoConnectWallet,
  useSuiClient,
  useSuiClientQueries,
} from "@mysten/dapp-kit";
import { ConnectButton } from "@mysten/dapp-kit";
import { placeLimit } from './utils/place_limit';
const generateSecrets = (numParts: number) => {
  const secrets: string[] = [];
  for (let i = 0; i < numParts; i++) {
    const randomBytes = new Uint8Array(32);
    window.crypto.getRandomValues(randomBytes);
    secrets.push('0x' + Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join(''));
  }
  return secrets;
};

const ChainIcon = ({ chain }: { chain: 'ETH' | 'SUI' }) => {
  if (chain === 'ETH') {
    return (
      <svg className="w-6 h-6" viewBox="0 0 32 32">
        <g fill="none" fillRule="evenodd">
          <circle cx="16" cy="16" r="16" fill="#627EEA" />
          <g fill="#FFF" fillRule="nonzero">
            <path fillOpacity=".602" d="M16.498 4v8.87l7.497 3.35z" />
            <path d="M16.498 4L9 16.22l7.498-3.35z" />
            <path fillOpacity=".602" d="M16.498 21.968v6.027L24 17.616z" />
            <path d="M16.498 27.995v-6.028L9 17.616z" />
            <path fillOpacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z" />
            <path fillOpacity=".602" d="M9 16.22l7.498 4.353v-7.701z" />
          </g>
        </g>
      </svg>
    );
  } else {
    return (
      <svg className="w-6 h-6" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#6FBCF0" />
        <path fill="#FFF" d="M16 7l-4.5 2.598v10.804L16 23l4.5-2.598V9.598L16 7zm3.5 11.902L16 21.5l-3.5-2.598v-8.608L16 8.5l3.5 1.794v8.608z" />
      </svg>
    );
  }
};

export default function Home() {
  const [srcChain, setSrcChain] = useState<'ETH' | 'SUI'>('ETH');
  const [dstChain, setDstChain] = useState<'ETH' | 'SUI'>('SUI');
  const [amount, setAmount] = useState<string>('');
  const [estimatedAmount, setEstimatedAmount] = useState<string>('0');
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderAmount, setOrderAmount] = useState<string>('1');
  const [error, setError] = useState<string | null>(null);
  const [signedSignature, setSignedSignature] = useState<string | null>(null);
  
  
  //sui things
  const suiClient = useSuiClient();
  const account = useCurrentAccount();
  const autoConnectionStatus = useAutoConnectWallet();
  // Use the hook with custom execute function to get more detailed transaction results
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await suiClient.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          showEffects: true,
          showEvents: true,
          showObjectChanges: true,
          showBalanceChanges: true,
          showRawEffects: true,
        },
      }),
  });  // Get fuseTxFunctions from store

  
  const { connect, connectors, error: wagmiError, isLoading: wagmiIsLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const ethAccount = useAccount();
  const { data: balance } = useBalance({ address: ethAccount.address });

  const { signTypedDataAsync } = useSignTypedData();

  useEffect(() => {
    fetchExchangeRate();
  }, [srcChain, dstChain]);
  
  function normalizeType(typeStr) {
    return typeStr.replace(/^0x0+/, "0x");
  }

  const vaultAndCap = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address,
      options: { showType: true, showContent: true },
    },
    {
      enabled: !!account,
    }
  );

  const findMatchingCoins = () => {
    // 直接固定目標 coinType
    const targetCoinType = normalizeType("0x2::sui::SUI");

    // 遍歷資料並比對
    const matchingCoins =
      vaultAndCap.data?.data.filter((obj) => {
        const objType = obj.data?.type;
        if (!objType) return false;

        // 從 < > 中抽取 coin type
        const match = objType.match(/<([^>]+)>/);
        if (match && match[1]) {
          const extractedCoinType = normalizeType(match[1]);
          console.log(
            `Matching: extracted coin type = ${extractedCoinType}, target = ${targetCoinType}`
          );

          return extractedCoinType === targetCoinType;
        }
        return false;
      }) || [];

    console.log(`Found ${matchingCoins.length} matching coins`, matchingCoins, targetCoinType);

    return matchingCoins;
  };
  const fetchExchangeRate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${getCoinId(srcChain)},${getCoinId(dstChain)}&vs_currencies=usd`
      );
      const data = await response.json();

      // Calculate exchange rate from USD prices
      const srcUsdPrice = data[getCoinId(srcChain)].usd;
      const dstUsdPrice = data[getCoinId(dstChain)].usd;
      const rate = srcUsdPrice / dstUsdPrice;

      setExchangeRate(rate);
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error);
      setExchangeRate(srcChain === 'ETH' ? 10000 : 0.0001); // Fallback to mock rate
    } finally {
      setIsLoading(false);
    }
  };

  const safeExtractObjectIds = (coins) => {
    if (!coins) {
      console.log("No coins provided");
      return [];
    }
    
    if (!Array.isArray(coins)) {
      console.log("Coins is not an array:", typeof coins);
      return [];
    }
    
    return coins
      .filter(coin => coin && coin.data && coin.data.objectId)
      .map(coin => coin.data.objectId);
  };

  const getCoinId = (chain: 'ETH' | 'SUI') => {
    return chain === 'ETH' ? 'ethereum' : 'sui';
  };

  const getExchangeRate = () => {
    if (isLoading) return 'Loading exchange rate...';
    if (exchangeRate === 0) return 'Exchange rate unavailable';
    return `1 ${srcChain} = ${exchangeRate.toFixed(4)} ${dstChain}`;
  };

  const handleSwitch = () => {
    setSrcChain(dstChain);
    setDstChain(srcChain);
    setExchangeRate(1 / exchangeRate); // Invert the exchange rate
    // clear the input amount
    setAmount('');
    setEstimatedAmount('');
  };

  const createEVMOrder = async () => {
    // Check if we're in the browser
    if (typeof window === 'undefined') {
      return;
    }

    setError(null); // Clear any previous errors

    const amount = parseFloat(orderAmount);
    const estimatedTokens = parseFloat(estimatedAmount);

    if (!orderAmount || isNaN(amount) || amount === 0) {
      setError('Order amount must be greater than 0');
      return;
    }

    if (!estimatedAmount || isNaN(estimatedTokens) || estimatedTokens === 0) {
      setError('Token exchange amount cannot be 0');
      return;
    }

    if (srcChain !== 'ETH' || dstChain !== 'SUI') {
      setError('This function only supports ETH as source and SUI as destination chain.');
      return;
    }

    try {
      // Calculate number of parts based on the order amount
      const numParts = Math.ceil(parseFloat(orderAmount));

      // Generate secrets and create HashLock details
      const secrets = generateSecrets(numParts);

      // const { secretHashes, merkleLeaves, merkleRoot } = createHashLockDetails(secrets);

      // Create CrossChainOrder
      if (!ethAccount.address || !address) {
        setError('Please connect both ETH and SUI wallets.');
        return;
      }

      const makerAddress = new Address(ethAccount.address);

      const currentTimestamp = BigInt(Math.floor(Date.now() / 1000));
      const salt = randBigInt(1_000_000_000); // Use randBigInt for SSR-safe random number generation

      let dstNetworkEnum: NetworkEnum | number;
      let takerAssetAddress: Address;


      dstNetworkEnum = config.dstChainId; // SUI placeholder from config
      takerAssetAddress = new Address(sha256(toUtf8Bytes(address)).substring(0, 42)); // Hash SUI address and take first 20 bytes

      const order = CrossChainOrder.new(
        new Address('0x0000000000000000000000000000000000000011'), // Placeholder for escrow factory address
        {
          makerAsset: TRUE_ERC20[config.srcChainId],
          takerAsset: takerAssetAddress,
          makingAmount: BigInt(Math.floor(amount)), // Assuming 18 decimals for ETH
          takingAmount: BigInt(Math.floor(estimatedTokens)), // Assuming 9 decimals for SUI
          maker: makerAddress,
          salt: salt,
        },
        {
          hashLock: HashLock.forSingleFill(secrets[0]),
          timeLocks: TimeLocks.new({
            srcWithdrawal: config.srcWithdrawal,
            srcPublicWithdrawal: config.srcPublicWithdrawal,
            srcCancellation: config.srcCancellation,
            srcPublicCancellation: config.srcPublicCancellation,
            dstWithdrawal: config.dstWithdrawal,
            dstPublicWithdrawal: config.dstPublicWithdrawal,
            dstCancellation: config.dstCancellation,
          }),
          srcChainId: config.srcChainId,
          dstChainId: dstNetworkEnum,
          srcSafetyDeposit: parseEther('0.001'),
          dstSafetyDeposit: 0n
        },
        {
          auction: new AuctionDetails({
            initialRateBump: 0,
            points: [],
            duration: 120n,
            startTime: currentTimestamp
          }),
          whitelist: [
            {
              address: new Address('0x0000000000000000000000000001100000000000'), // Placeholder for whitelisted
              allowFrom: 0n
            }
          ],
          resolvingStartTime: 0n,
        },
        {
          nonce: randBigInt(UINT_40_MAX),
          allowPartialFills: false,
          allowMultipleFills: false,
        }
      );

      console.log('Created CrossChainOrder:', order);

      const orderHash = order.getOrderHash(config.srcChainId);
      const typedData = order.getTypedData(config.srcChainId);

      console.log('Order Hash:', orderHash);
      console.log('Typed Data:', typedData);

      console.log('Typed Data for signing:', typedData);
      console.log('Attempting to sign typed data...');

      const signature = await signTypedDataAsync({
        domain: typedData.domain,
        types: typedData.types,
        primaryType: typedData.primaryType,
        message: typedData.message,
        account: ethAccount.address,
      });


      console.log('Order Signature:', signature);

    } catch (err) {
      console.error('Failed to sign order:', err);
      setError('Failed to create order: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const createSUIOrder = async () => {
    const matchingCoins = findMatchingCoins();
    const coinObjectIds = safeExtractObjectIds(matchingCoins);
    if (coinObjectIds.length === 0) {
      setError('No matching SUI coins found in your wallet.');
      return;
    }
    let tx = placeLimit(
      coinObjectIds,
      "ETH",
      parseFloat(amount) * 1e9, // Convert to SUI's smallest unit
      parseFloat(estimatedAmount) * 1e9, // Convert to SUI's smallest unit
      "0x2::sui::SUI"
    );
    signAndExecuteTransaction({
      transaction: tx,
      chain: "sui:testnet", // Specify the chain you want to execute on
    },
    {
      onSuccess: (result) => {
        console.log('Transaction executed successfully:', result);
      },
      onError: (error) => {
        console.error('Transaction execution failed:', error);
        setError('Transaction execution failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    });
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const estimated = parseFloat(value || '0') * exchangeRate;
    setEstimatedAmount(estimated.toFixed(srcChain === 'ETH' ? 0 : 4));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800">
        <div className="space-y-4">
          {/* Connect Buttons */}
          <div className="flex flex-col justify-around space-y-2">
            {/* ETH Wallet Connection */}
            {ethAccount.isConnected ? (
              <div className="flex items-center justify-between w-full py-2 px-4 bg-gray-200 text-black rounded-lg font-medium">
                <span>{`${ethAccount.address.slice(0, 6)}...${ethAccount.address.slice(-4)} | ${balance?.formatted.slice(0, 6)} ${balance?.symbol}`}</span>
                <button onClick={() => disconnect()} className="py-1 px-2 bg-red-500 text-white rounded-md">Disconnect</button>
              </div>
            ) : (
              <button
                onClick={() => connect({ connector: connectors[0] })}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Connect Metamask
              </button>
            )}

            {/* SUI Wallet Connection */}
              <ConnectButton />
          </div>

          {/* Source Token Input */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-600 dark:text-gray-300">From</label>
              <div className="flex items-center gap-2">
                <ChainIcon chain={srcChain} />
                <span className="text-sm font-medium">{srcChain}</span>
              </div>
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0.0"
              className="w-full bg-transparent text-2xl outline-none"
            />
          </div>

          {/* Exchange Rate Display */}
          <div className={`text-center text-sm ${isLoading ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500 dark:text-gray-400'
            }`}>
            {getExchangeRate()}
          </div>

          {/* Switch Button */}
          <button
            onClick={handleSwitch}
            className="mx-auto block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </button>

          {/* Destination Token Input */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-600 dark:text-gray-300">To</label>
              <div className="flex items-center gap-2">
                <ChainIcon chain={dstChain} />
                <span className="text-sm font-medium">{dstChain}</span>
              </div>
            </div>
            <input
              type="text"
              value={estimatedAmount}
              readOnly
              className="w-full bg-transparent text-2xl outline-none"
            />
          </div>

          {/* Order Amount Input */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-600 dark:text-gray-300">Order Amount</label>
            </div>
            <input
              type="number"
              value={orderAmount}
              onChange={(e) => setOrderAmount(e.target.value)}
              placeholder="Enter order amount"
              className="w-full bg-transparent text-2xl outline-none"
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg">
              {error}
            </div>
          )}

          {/* Create Order Button */}
          <div className="flex justify-center">
            <button
              onClick={srcChain === 'ETH' ? createEVMOrder : createSUIOrder}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Create Order
            </button>
          </div>

          {/* Wallet Info */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            {ethAccount.isConnected && <div>ETH: {ethAccount.address}</div>}

          </div>
        </div>
      </div>

    </main>
  );
}
