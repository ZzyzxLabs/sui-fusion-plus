'use client';

import { useState, useEffect } from 'react';
import { apiCall } from '../api/relayerInteract';

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiCall('GET', '/orders');
        if (response.success) {
          // Assuming the API returns an array of orders directly
          setOrders(response.data.data);
          console.log('Fetched orders:', response.data);
        } else {
          console.error('Failed to fetch orders:', response.error);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-6xl p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Manage Orders
        </h1>

        <div className="space-y-6">
          {/* Order Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Total Orders</h3>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{orders.length}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">Completed</h3>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                {orders.filter((order: any) => order.status === 'completed').length}
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">Pending</h3>
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                {orders.filter((order: any) => order.status === 'pending').length}
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">Failed</h3>
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                {orders.filter((order: any) => order.status === 'failed').length}
              </p>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      From
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {order.chain}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {order.targetChain}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {order.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${order.status === 'completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {order.createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                          View
                        </button>
                        <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Empty State */}
          {orders.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No orders</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Get started by creating a new cross-chain swap order.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 