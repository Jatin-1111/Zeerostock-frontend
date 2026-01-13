"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { supplierService, SupplierOrder } from "@/services/supplier.service";
import { useAuth } from "@/contexts/AuthContext";

export default function SupplierOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<SupplierOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter] = useState<string>("");
  const itemsPerPage = 10;

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await supplierService.getOrders({
        page: currentPage,
        limit: itemsPerPage,
        ...(statusFilter && { status: statusFilter }),
      });

      if (response.success && response.data) {
        setOrders(response.data.orders);
        setTotalPages(response.data.pagination.totalPages);
      } else {
        setError(response.message || "Failed to fetch orders");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(
        (err as Error).message || "An error occurred while fetching orders"
      );
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter, itemsPerPage]);

  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter, fetchOrders]);

  const getStatusColor = (status: string) => {
    const statusConfig: Record<string, string> = {
      pending: "#f59e0b",
      confirmed: "#3b82f6",
      processing: "#8b5cf6",
      shipped: "#2aae7a",
      delivered: "#10b981",
      cancelled: "#ef4444",
    };
    return statusConfig[status] || statusConfig.pending;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  // Role check
  if (user && user.activeRole !== "supplier") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EEFBF6]">
        <div className="mx-auto max-w-md p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border-2 border-red-600 bg-red-100">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Access Restricted
            </h2>
            <p className="mb-6 text-gray-600">
              You need to be in supplier mode to view orders. Your current role
              is: <strong>{user.activeRole}</strong>
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => (window.location.href = "/supplier")}
              className="w-full border-2 border-gray-900 bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Switch to Supplier Mode
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full border-2 border-gray-900 bg-[#EEFBF6] px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-50"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EEFBF6]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EEFBF6]">
        <div className="mx-auto max-w-md p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border-2 border-red-600 bg-red-100">
              <span className="text-3xl">❌</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Error</h2>
            <p className="mb-6 text-gray-600">{error}</p>
          </div>
          <button
            onClick={fetchOrders}
            className="border-2 border-gray-900 bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#EEFBF6] pt-[75px] pb-[34px]">
      <div className="mx-auto max-w-[1440px] px-7.5">
        {/* Header */}
        <div className="mb-[60px] flex items-center justify-between">
          <h1 className="text-xl font-semibold text-[#0d1b2a]">My orders</h1>
          <button className="flex h-[34px] items-center justify-center gap-2 rounded-[8.5px] bg-[#1e3a8a] px-[30px] text-xs font-semibold text-white transition-colors hover:bg-[#1e40af]">
            <Download className="h-5 w-5" />
            Export Orders
          </button>
        </div>

        {/* Table */}
        {orders.length > 0 ? (
          <>
            <div className="overflow-x-auto w-full rounded-[11px] bg-white shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)]">
              <div className="min-w-fit">
                {/* Table Headers */}
                <div className="flex h-[52px] items-center border-b border-[#e5e5e5] px-[25px] gap-1">
                  <div className="w-[100px] flex-shrink-0">
                    <p className="text-xs font-medium leading-tight tracking-[0.4px] text-[#0d1b2a]">
                      ORDER ID
                    </p>
                  </div>
                  <div className="w-[150px] flex-shrink-0">
                    <p className="text-xs font-medium leading-tight tracking-[0.4px] text-[#0d1b2a]">
                      SUPPLIER
                    </p>
                  </div>
                  <div className="w-[150px] flex-shrink-0">
                    <p className="text-xs font-medium leading-tight tracking-[0.4px] text-[#0d1b2a]">
                      ITEMS
                    </p>
                  </div>
                  <div className="w-[100px] flex-shrink-0">
                    <p className="text-xs font-medium leading-tight tracking-[0.4px] text-[#0d1b2a]">
                      AMOUNT
                    </p>
                  </div>
                  <div className="w-[100px] flex-shrink-0">
                    <p className="text-xs font-medium leading-tight tracking-[0.4px] text-[#0d1b2a]">
                      STATUS
                    </p>
                  </div>
                  <div className="w-[110px] flex-shrink-0">
                    <p className="text-xs font-medium leading-tight tracking-[0.4px] text-[#0d1b2a]">
                      ORDER DATE
                    </p>
                  </div>
                  <div className="w-[110px] flex-shrink-0">
                    <p className="text-xs font-medium leading-tight tracking-[0.4px] text-[#0d1b2a]">
                      EXPECTED DATE
                    </p>
                  </div>
                  <div className="w-[70px] flex-shrink-0">
                    <p className="text-xs font-medium leading-tight tracking-[0.4px] text-[#0d1b2a]">
                      ACTIONS
                    </p>
                  </div>
                </div>

                {/* Table Rows */}
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex h-[56px] items-center border-b border-[#e5e5e5] px-[25px] transition-colors hover:bg-gray-50 gap-1"
                  >
                    {/* Order ID */}
                    <div className="w-[100px] flex-shrink-0">
                      <p className="text-xs font-medium leading-tight tracking-[0.4px] text-[#9c9c9c]">
                        {order.order_number}
                      </p>
                    </div>

                    {/* Supplier/Buyer */}
                    <div className="w-[150px] flex-shrink-0">
                      <p className="truncate pb-[2px] text-xs font-normal leading-tight tracking-[0.4px] text-black">
                        {order.buyer_company || order.buyer_name}
                      </p>
                    </div>

                    {/* Items */}
                    <div className="w-[150px] flex-shrink-0">
                      <p className="truncate text-xs font-normal leading-tight tracking-[0.4px] text-black">
                        {order.items[0]?.product_title || "N/A"}
                      </p>
                    </div>

                    {/* Amount */}
                    <div className="w-[100px] flex-shrink-0">
                      <p className="text-xs font-normal leading-tight tracking-[0.4px] text-black">
                        {formatCurrency(order.total_amount)}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="w-[100px] flex-shrink-0">
                      <p
                        className="text-xs font-normal capitalize leading-tight tracking-[0.4px]"
                        style={{
                          color: getStatusColor(order.status),
                        }}
                      >
                        {order.status}
                      </p>
                    </div>

                    {/* Order Date */}
                    <div className="w-[110px] flex-shrink-0">
                      <p className="text-xs font-normal leading-tight tracking-[0.4px] text-black">
                        {formatDate(order.created_at)}
                      </p>
                    </div>

                    {/* Expected Date */}
                    <div className="w-[110px] flex-shrink-0">
                      <p className="text-xs font-normal leading-tight tracking-[0.4px] text-black">
                        {formatDate(order.updated_at)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="w-[70px] flex-shrink-0 flex justify-center items-center">
                      <button className="rounded-[5.5px] border-[0.4px] border-[#747474] p-[5.5px] transition-colors hover:bg-gray-100">
                        <MoreVertical className="h-5 w-5 text-[#747474]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-[22.5px] flex items-center justify-between">
                <div className="text-xs text-[#9c9c9c]">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1.5 rounded-[4.5px] border border-[#9c9c9c] bg-[#EEFBF6] px-[13.5px] py-[6.75px] text-xs font-medium text-[#0d1b2a] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronLeft className="h-3 w-3" />
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1.5 rounded-[4.5px] border border-[#9c9c9c] bg-[#EEFBF6] px-[13.5px] py-[6.75px] text-xs font-medium text-[#0d1b2a] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full rounded-[11px] bg-[#EEFBF6] p-9 text-center shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)]">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[#FAFAFA]">
              <span className="text-2xl">📦</span>
            </div>
            <h3 className="mb-1.5 text-base font-semibold text-[#0d1b2a]">
              No Orders Yet
            </h3>
            <p className="text-sm text-[#9c9c9c]">
              Orders from buyers will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
