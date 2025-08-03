"use client";

import { useCallback, useState } from "react";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClientQuery,
  useAutoConnectWallet,
  useSuiClient,
} from "@mysten/dapp-kit";
import { package_addr } from "../utils/package";
import { fill_order } from "../utils/deploy_src";
export default function Resolver() {
  const [signedSignature, setSignedSignature] = useState<string | null>(null);
  const [pendingOrders, setPendingOrders] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [isResolving, setIsResolving] = useState(false);

  // Sui client hooks
  const suiClient = useSuiClient();
  const account = useCurrentAccount();
  useAutoConnectWallet();

  // sign & execute tx
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) => {
      setSignedSignature(signature);
      return await suiClient.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          showEffects: true,
          showEvents: true,
          showObjectChanges: true,
          showBalanceChanges: true,
          showRawEffects: true,
        },
      });
    },
  });

  const handleResolve = async (orderId: string) => {
    setIsResolving(true);
    setTimeout(() => {
      setPendingOrders((prev) => prev.filter((order) => order.id !== orderId));
      setIsResolving(false);
      setSelectedOrder(null);
    }, 2000);
  };

  /** 發送 Fill Order 交易 */
  const handleFillOrder = async (obj: any) => {
    try {
      const fields = obj.data?.content?.fields;
      if (!fields) throw new Error("Missing fields in AuctionWinner object");

      const orderId = fields.order_id; // object ID
      const coinType = "0x2::sui::SUI";

      // 直接從 fields 解析
      const orderHash = "1"; // 這裡應該是從 fields 中獲取 orderHash
      const hashlock =  "42"; // 這裡應該是從 fields 中獲取 hashlock
      console.log(orderId, orderHash, hashlock, obj.data.objectId, coinType);
      const tx = fill_order(
        orderId,
        orderHash,
        hashlock,
        obj.data.objectId,
        coinType
      );

      signAndExecuteTransaction(
        {
          transaction: tx,
          chain: "sui:testnet",
        },
        {
          onSuccess: (result) => {
            console.log("Fill Order executed successfully:", result);
          },
          onError: (error) => {
            console.error("Fill Order failed:", error);
          },
        }
      );
    } catch (error) {
      console.error("Fill Order error:", error);
      alert("Fill Order failed");
    }
  };

  // Query this account's owned objects
  const orderToFill = useSuiClientQuery("getOwnedObjects", {
    owner: account?.address,
    options: {
      showContent: true,
      showType: true,
    },
  });

  // 找出所有 AuctionWinner 物件
  const getWinnerAuctionObjects = useCallback(() => {
    if (!orderToFill.data) return [];

    return orderToFill.data.data.filter((obj) =>
      obj.data?.type?.includes(
        package_addr + "::limit_order_protocol::AuctionWinner"
      )
    );
  }, [orderToFill.data, package_addr]);

  const winnerAuctionObjects = getWinnerAuctionObjects();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-6xl p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Order Resolver
        </h1>

        {/* Winner Auction Orders 區塊 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Winner Auction Orders
          </h2>
          {winnerAuctionObjects.length > 0 ? (
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              {winnerAuctionObjects.map((obj, index) => {
                const orderId = obj.data?.content?.fields?.order_id;
                return (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-md"
                  >
                    <span>Order ID: {orderId}</span>
                    <button
                      onClick={() => handleFillOrder(obj)}
                      className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Fill Order
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No winner auctions found.
            </p>
          )}
        </div>
        </div>
    </main>
  );
}
