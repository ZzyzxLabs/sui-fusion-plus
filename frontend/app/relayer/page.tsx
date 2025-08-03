"use client";

import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClientQuery,
  useAutoConnectWallet,
  useSuiClient,
} from "@mysten/dapp-kit";
import { useState, useEffect } from "react";

export default function Relayer() {
  const [signedSignature, setSignedSignature] = useState<string | null>(null);
  const [ordersData, setOrdersData] = useState<any[]>([]); // 存所有 order 資料

  // sui things
  const suiClient = useSuiClient();
  const account = useCurrentAccount();
  const autoConnectionStatus = useAutoConnectWallet();

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

  // 查詢 events (orders_id)
  const orders_id = useSuiClientQuery("queryEvents", {
    query: {
      MoveModule: {
        module: "limit_order_protocol",
        package:
          "0x4694f34af00d2741b59a6a5e41a958e48737eeca3b2a169daac5bc38e57111a1",
      },
    },
    limit: 20,
  });

  // 查詢單一 order
  const getOrder = (objID: string) =>
    useSuiClientQuery("getObject", {
      id: objID,
    });

  // 頁面載入時解析 orders_id 並抓取每筆 order
  useEffect(() => {
    if (!orders_id.data) return;

    const fetchOrders = async () => {
      const events = orders_id.data.data || [];
      const parsedOrders = [];

      for (const ev of events) {
        const orderId = ev.parsedJson?.order_id;
        if (!orderId) continue;

        const orderData = await suiClient.getObject({
          id: orderId,
          options: {
            showContent: true,
            showType: true,
            showOwner: true,
          },
        });
        console.log(orderData.data?.content.fields);
        parsedOrders.push(orderData);
      }

      setOrdersData(parsedOrders);
    };

    fetchOrders();
  }, [orders_id.data]);

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-white">Orders List</h2>

      {orders_id.isLoading && (
        <p className="text-gray-400">Loading events...</p>
      )}

      {!orders_id.isLoading && ordersData.length === 0 && (
        <p className="text-gray-400">No orders found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ordersData.map((order, index) => {
          const fields = order.data?.content?.fields;
          return (
            <div
              key={index}
              className="relative rounded-xl p-5 shadow-lg bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-500 transition"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-white">
                  Order #{index + 1}
                </h3>
                <span className="text-xs text-gray-400 truncate max-w-[140px]">
                  {fields?.id?.id}
                </span>
              </div>

              {/* Order Info */}
              <div className="space-y-1 text-sm text-gray-300">
                <p>
                  <span className="font-medium text-gray-400">Maker:</span>{" "}
                  {fields?.maker}
                </p>
                <p>
                  <span className="font-medium text-gray-400">Dst:</span>{" "}
                  {fields?.dst_amount} {fields?.dst_token}
                </p>
                <p>
                  <span className="font-medium text-gray-400">Src:</span>{" "}
                  {fields?.src_amount} {fields?.src_token}
                </p>
                <p>
                  <span className="font-medium text-gray-400">Salt:</span>{" "}
                  {fields?.salt}
                </p>
              </div>

              {/* Input + Button */}
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Enter value..."
                  className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => console.log("Clicked order", fields)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition"
                >
                  Submit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
