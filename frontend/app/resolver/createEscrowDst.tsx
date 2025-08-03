"use client";

import { useState } from "react";
import {
  createEscrowDst,
  CreateEscrowDstArgs,
} from "../../../atomic_swap/atomic_swap/escrow-dst/functions";
import {
  useCurrentAccount,
  useSuiClient,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";

export const useCreateEscrowDst = () => {
  const account = useCurrentAccount();
  const suiClient = useSuiClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
        },
      }),
  });

  const executeCreateEscrowDst = async (args: {
    vecU81: number[];
    vecU82: number[];
    address1: string;
    address2: string;
    coin1: string;
    coin2: string;
    typeArg?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Create a new transaction
      const tx = new Transaction();

      // Get the clock object (this is a standard Sui object)
      const clock = tx.object("0x6");

      // Create the escrow with the provided arguments
      const createEscrowArgs: CreateEscrowDstArgs = {
        vecU81: args.vecU81,
        vecU82: args.vecU82,
        address1: args.address1,
        address2: args.address2,
        coin1: tx.object(args.coin1),
        coin2: tx.object(args.coin2),
        clock: clock,
      };

      // Call the createEscrowDst function
      createEscrowDst(tx, args.typeArg || "0x2::sui::SUI", createEscrowArgs);

      // Execute the transaction
      signAndExecuteTransaction(
        {
          transaction: tx,
          chain: "sui:testnet",
        },
        {
          onSuccess: (result) => {
            console.log("Escrow created successfully:", result);
            setSuccess("Escrow created successfully!");
            setIsLoading(false);
          },
          onError: (error) => {
            console.error("Failed to create escrow:", error);
            setError(`Failed to create escrow: ${error.message}`);
            setIsLoading(false);
          },
        }
      );
    } catch (err) {
      console.error("Error creating escrow:", err);
      setError(
        `Error creating escrow: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
      setIsLoading(false);
    }
  };

  return {
    executeCreateEscrowDst,
    isLoading,
    error,
    success,
    account: account?.address,
  };
};

// Simplified component for connected users
export const CreateEscrowDstComponent = () => {
  const { executeCreateEscrowDst, isLoading, error, success, account } =
    useCreateEscrowDst();
  const [formData, setFormData] = useState({
    vecU81: [1, 2, 3, 4, 5],
    vecU82: [6, 7, 8, 9, 10],
    address1: "",
    address2: "",
    coin1: "",
    coin2: "",
    typeArg: "0x2::sui::SUI",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await executeCreateEscrowDst({
      ...formData,
      address1: formData.address1 || account || "",
      address2: formData.address2 || account || "",
    });
  };

  const handleQuickCreate = async () => {
    // Quick create with default values
    await executeCreateEscrowDst({
      vecU81: [1, 2, 3, 4, 5],
      vecU82: [6, 7, 8, 9, 10],
      address1: account || "",
      address2: account || "",
      coin1: "0x2::sui::SUI", // Default SUI coin
      coin2: "0x2::sui::SUI", // Default SUI coin
      typeArg: "0x2::sui::SUI",
    });
  };

  return (
    <div className='p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
          Create Escrow Destination
        </h2>
        <div className='text-sm text-gray-500 dark:text-gray-400'>
          Connected: {account?.slice(0, 6)}...{account?.slice(-4)}
        </div>
      </div>

      {error && (
        <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'>
          {error}
        </div>
      )}

      {success && (
        <div className='mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded dark:bg-green-900/20 dark:border-green-800 dark:text-green-400'>
          {success}
        </div>
      )}

      {/* Quick Create Button */}
      <div className='mb-6'>
        <button
          onClick={handleQuickCreate}
          disabled={isLoading}
          className='w-full py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium'
        >
          {isLoading ? "Creating..." : "Quick Create Escrow (Default Values)"}
        </button>
        <p className='text-xs text-gray-500 dark:text-gray-400 mt-2 text-center'>
          Uses default values and your connected address
        </p>
      </div>

      <div className='border-t border-gray-200 dark:border-gray-700 pt-6'>
        <h3 className='text-lg font-semibold mb-4 text-gray-900 dark:text-white'>
          Custom Create
        </h3>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Address 1
              </label>
              <input
                type='text'
                value={formData.address1}
                onChange={(e) =>
                  setFormData({ ...formData, address1: e.target.value })
                }
                placeholder={account || "Enter address 1"}
                className='w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Address 2
              </label>
              <input
                type='text'
                value={formData.address2}
                onChange={(e) =>
                  setFormData({ ...formData, address2: e.target.value })
                }
                placeholder={account || "Enter address 2"}
                className='w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Coin 1 Object ID
              </label>
              <input
                type='text'
                value={formData.coin1}
                onChange={(e) =>
                  setFormData({ ...formData, coin1: e.target.value })
                }
                placeholder='Enter coin 1 object ID'
                className='w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Coin 2 Object ID
              </label>
              <input
                type='text'
                value={formData.coin2}
                onChange={(e) =>
                  setFormData({ ...formData, coin2: e.target.value })
                }
                placeholder='Enter coin 2 object ID'
                className='w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Type Argument
            </label>
            <input
              type='text'
              value={formData.typeArg}
              onChange={(e) =>
                setFormData({ ...formData, typeArg: e.target.value })
              }
              placeholder='0x2::sui::SUI'
              className='w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
            />
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium'
          >
            {isLoading ? "Creating Escrow..." : "Create Custom Escrow"}
          </button>
        </form>
      </div>
    </div>
  );
};
