"use client";

import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import Link from "next/link";
import { buyerService } from "@/services/buyer.service";
import type { OrderSummary } from "@/types/buyer.types";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchOrders = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params: Record<string, string | number> = {
        page: currentPage,
        limit: 10,
      };
      if (statusFilter !== "all") {
        params.status = statusFilter;
      }

      console.log("Fetching orders with params:", params);
      const response = await buyerService.getOrderHistory(params);
      console.log("Orders response:", response);

      if (response.success && response.data) {
        setOrders(response.data.items || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
        console.log("Orders loaded:", response.data.items?.length || 0);
      } else {
        console.error("Failed to fetch orders:", response);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { bg: string; text: string; label: string }
    > = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "Pending",
      },
      confirmed: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: "Confirmed",
      },
      processing: {
        bg: "bg-purple-100",
        text: "text-purple-800",
        label: "Processing",
      },
      shipped: {
        bg: "bg-indigo-100",
        text: "text-indigo-800",
        label: "Shipped",
      },
      delivered: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Delivered",
      },
      cancelled: { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" },
      refunded: { bg: "bg-gray-100", text: "text-gray-800", label: "Refunded" },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <button className="px-6 py-2.5 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Orders
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-4 py-2 rounded ${
              statusFilter === "all"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            className={`px-4 py-2 rounded ${
              statusFilter === "pending"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter("shipped")}
            className={`px-4 py-2 rounded ${
              statusFilter === "shipped"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          >
            Shipped
          </button>
          <button
            onClick={() => setStatusFilter("delivered")}
            className={`px-4 py-2 rounded ${
              statusFilter === "delivered"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          >
            Delivered
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        <div className="bg-white border-2 border-gray-900 rounded overflow-hidden">
          <table className="w-full">
            <thead className="bg-white border-b-2 border-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                  Order Number
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                  Order Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    <div className="animate-pulse">Loading orders...</div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.orderId || order.orderNumber}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {order.itemCount || 0} item(s)
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      ₹
                      {parseFloat(
                        String(order.totalAmount || 0)
                      ).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(order.orderDate).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Link
                        href={`/buyer/orders/${order.orderId}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border-2 border-gray-900 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-900">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border-2 border-gray-900 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
