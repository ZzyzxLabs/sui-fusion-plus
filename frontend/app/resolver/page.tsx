"use client";

import { useState } from "react";
import { useSuiClientInfiniteQuery } from "@mysten/dapp-kit";

export default function Resolver() {
  const [pendingOrders, setPendingOrders] = useState([
    {
      id: "1",
      fromChain: "ETH",
      toChain: "SUI",
      amount: "1.5",
      makerAddress: "0x1234...5678",
      takerAddress: "0xabcd...efgh",
      orderHash: "0x1234567890abcdef...",
      createdAt: "2024-01-15 10:30:00",
    },
    {
      id: "2",
      fromChain: "SUI",
      toChain: "ETH",
      amount: "100",
      makerAddress: "0x9876...5432",
      takerAddress: "0xdcba...hgfe",
      orderHash: "0xfedcba0987654321...",
      createdAt: "2024-01-14 15:45:00",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [isResolving, setIsResolving] = useState(false);

  const handleResolve = async (orderId: string) => {
    setIsResolving(true);
    // Simulate resolution process
    setTimeout(() => {
      setPendingOrders((prev) => prev.filter((order) => order.id !== orderId));
      setIsResolving(false);
      setSelectedOrder(null);
    }, 2000);
  };

  // const {
  //   data,
  //   isPending,
  //   isError,
  //   error,
  //   isFetching,
  //   fetchNextPage,
  //   hasNextPage,
  // } = useSuiClientInfiniteQuery("get", {
  //   owner: "0x123",
  // });
  // if (isPending) {
  //   return <div>Loading...</div>;
  // }
  // if (isError) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <div className='w-full max-w-6xl p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800'>
        <h1 className='text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white'>
          Order Resolver
        </h1>

        <div className='space-y-6'>
          {/* Resolver Statistics */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
            <div className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
              <h3 className='text-lg font-semibold text-blue-600 dark:text-blue-400'>
                Pending Orders
              </h3>
              <p className='text-2xl font-bold text-blue-700 dark:text-blue-300'>
                {pendingOrders.length}
              </p>
            </div>
            <div className='bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
              <h3 className='text-lg font-semibold text-green-600 dark:text-green-400'>
                Resolved Today
              </h3>
              <p className='text-2xl font-bold text-green-700 dark:text-green-300'>
                12
              </p>
            </div>
            <div className='bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg'>
              <h3 className='text-lg font-semibold text-purple-600 dark:text-purple-400'>
                Total Resolved
              </h3>
              <p className='text-2xl font-bold text-purple-700 dark:text-purple-300'>
                156
              </p>
            </div>
          </div>

          {/* Pending Orders */}
          <div className='bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden'>
            <div className='px-6 py-4 border-b border-gray-200 dark:border-gray-600'>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Pending Orders to Resolve
              </h2>
            </div>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-600'>
                <thead className='bg-gray-50 dark:bg-gray-800'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                      Order ID
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                      From
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                      To
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                      Amount
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                      Maker
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                      Taker
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                      Created
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600'>
                  {pendingOrders.map((order) => (
                    <tr
                      key={order.id}
                      className='hover:bg-gray-50 dark:hover:bg-gray-600'
                    >
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                        #{order.id}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>
                        {order.fromChain}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>
                        {order.toChain}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>
                        {order.amount}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>
                        {order.makerAddress}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>
                        {order.takerAddress}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>
                        {order.createdAt}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                        <button
                          onClick={() => setSelectedOrder(order.id)}
                          className='text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3'
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleResolve(order.id)}
                          disabled={isResolving}
                          className='text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 disabled:opacity-50'
                        >
                          {isResolving && selectedOrder === order.id
                            ? "Resolving..."
                            : "Resolve"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Details Modal */}
          {selectedOrder && (
            <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
              <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800'>
                <div className='mt-3'>
                  <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-4'>
                    Order Details
                  </h3>
                  <div className='space-y-3'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                        Order Hash
                      </label>
                      <p className='text-sm text-gray-900 dark:text-white break-all'>
                        {
                          pendingOrders.find((o) => o.id === selectedOrder)
                            ?.orderHash
                        }
                      </p>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                        From Chain
                      </label>
                      <p className='text-sm text-gray-900 dark:text-white'>
                        {
                          pendingOrders.find((o) => o.id === selectedOrder)
                            ?.fromChain
                        }
                      </p>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                        To Chain
                      </label>
                      <p className='text-sm text-gray-900 dark:text-white'>
                        {
                          pendingOrders.find((o) => o.id === selectedOrder)
                            ?.toChain
                        }
                      </p>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                        Amount
                      </label>
                      <p className='text-sm text-gray-900 dark:text-white'>
                        {
                          pendingOrders.find((o) => o.id === selectedOrder)
                            ?.amount
                        }
                      </p>
                    </div>
                  </div>
                  <div className='flex justify-end space-x-3 mt-6'>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className='px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600'
                    >
                      Close
                    </button>
                    <button
                      onClick={() => handleResolve(selectedOrder)}
                      disabled={isResolving}
                      className='px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50'
                    >
                      {isResolving ? "Resolving..." : "Resolve Order"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {pendingOrders.length === 0 && (
            <div className='text-center py-12'>
              <div className='mx-auto h-12 w-12 text-gray-400'>
                <svg fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h3 className='mt-2 text-sm font-medium text-gray-900 dark:text-white'>
                No pending orders
              </h3>
              <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                All orders have been resolved successfully.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
