"use client";

import { Download, MoreVertical } from "lucide-react";

export default function SupplierOrders() {
  const orders = [
    {
      id: "ORD-001",
      supplier: "SteelCorp Ind",
      items: "Industrial Steel Pipe",
      amount: 15000,
      status: "shipped",
      orderDate: "2024-01-10",
      expectedD: "2024-01-10",
    },
    {
      id: "ORD-001",
      supplier: "SteelCorp Ind",
      items: "Industrial Steel Pipe",
      amount: 15000,
      status: "shipped",
      orderDate: "2024-01-10",
      expectedD: "2024-01-10",
    },
    {
      id: "ORD-001",
      supplier: "SteelCorp Ind",
      items: "Industrial Steel Pipe",
      amount: 15000,
      status: "shipped",
      orderDate: "2024-01-10",
      expectedD: "2024-01-10",
    },
    {
      id: "ORD-001",
      supplier: "SteelCorp Ind",
      items: "Industrial Steel Pipe",
      amount: 15000,
      status: "shipped",
      orderDate: "2024-01-10",
      expectedD: "2024-01-10",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      shipped: "bg-green-100 text-green-800 border-green-300",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      delivered: "bg-blue-100 text-blue-800 border-blue-300",
      cancelled: "bg-red-100 text-red-800 border-red-300",
    };
    return (
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
            <p className="text-sm text-gray-600">
              Track and manage your orders
            </p>
          </div>
          <button className="px-6 py-3 bg-gray-900 text-white text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors">
            <Download className="w-4 h-4" />
            Export Orders
          </button>
        </div>

        {/* Table */}
        <div className="border-2 border-gray-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Supplier
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Order Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Expected D
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y-2 divide-gray-900">
                {orders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.supplier}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {order.items}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      ₹{order.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-medium border ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.orderDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.expectedD}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="p-2 hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
