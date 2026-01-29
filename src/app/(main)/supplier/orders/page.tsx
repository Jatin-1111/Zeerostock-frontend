"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import { supplierService, SupplierOrder } from "@/services/supplier.service";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

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
        (err as Error).message || "An error occurred while fetching orders",
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
        <div className="mx-auto max-w-md p-4 sm:p-8 text-center">
          <div className="mb-4 sm:mb-6">
            <div className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center border-2 border-red-600 bg-red-100">
              <span className="text-2xl sm:text-3xl">⚠️</span>
            </div>
            <h2 className="mb-2 text-xl sm:text-2xl font-bold text-gray-900">
              Access Restricted
            </h2>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base text-gray-600">
              You need to be in supplier mode to view orders. Your current role
              is: <strong>{user.activeRole}</strong>
            </p>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <button
              onClick={() => (window.location.href = "/supplier")}
              className="w-full border-2 border-gray-900 bg-gray-900 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Switch to Supplier Mode
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full border-2 border-gray-900 bg-[#EEFBF6] px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-gray-900 transition-colors hover:bg-gray-50"
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
          <div className="mx-auto mb-3 sm:mb-4 h-12 w-12 sm:h-16 sm:w-16 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900"></div>
          <p className="text-sm sm:text-base text-gray-600">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EEFBF6]">
        <div className="mx-auto max-w-md p-4 sm:p-8 text-center">
          <div className="mb-4 sm:mb-6">
            <div className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center border-2 border-red-600 bg-red-100">
              <span className="text-2xl sm:text-3xl">❌</span>
            </div>
            <h2 className="mb-2 text-xl sm:text-2xl font-bold text-gray-900">
              Error
            </h2>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base text-gray-600">
              {error}
            </p>
          </div>
          <button
            onClick={fetchOrders}
            className="border-2 border-gray-900 bg-gray-900 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#EEFBF6] pb-[20px] sm:pb-[28px] md:pb-[34px] pt-[60px] sm:pt-[68px] md:pt-[75px]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-7.5">
        {/* Header */}
        <div className="mb-[40px] sm:mb-[50px] md:mb-[60px] flex flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <h1 className="m-0 text-[16px] sm:text-[18px] md:text-[20px] font-semibold text-[#0d1b2a]">
            My Orders
          </h1>
          <button className="flex h-[32px] sm:h-[34px] md:h-[36px] cursor-pointer items-center gap-[4px] sm:gap-[5px] md:gap-[5.5px] rounded-[7px] sm:rounded-[8px] md:rounded-[8.5px] border-none bg-[#1e3a8a] px-[20px] sm:px-[25px] md:px-[31px] text-xs font-semibold text-white transition-colors hover:bg-[#1e40af]">
            <Download size={14} className="stroke-[2.5]" />
            Export Orders
          </button>
        </div>

        {/* Orders Table/Cards */}
        {orders.length > 0 ? (
          <>
            <div className="w-full overflow-hidden rounded-[10px] sm:rounded-[10.5px] lg:rounded-[11px] bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] sm:shadow-[0px_0px_4.2px_0px_rgba(0,0,0,0.25)] lg:shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)]">
              {/* Table Headers - Hidden on mobile */}
              <div className="hidden lg:grid h-[52px] w-full grid-cols-[105px_150px_1fr_105px_90px_105px_105px_90px] items-center border-b border-[#e5e5e5]">
                <div className="pl-[17px] text-xs font-medium tracking-[0.4px] text-center text-[#0d1b2a]">
                  ORDER ID
                </div>
                <div className="text-[11px] font-medium tracking-[0.4px] text-center text-[#0d1b2a]">
                  BUYER
                </div>
                <div className="text-[11px] font-medium tracking-[0.4px] text-center text-[#0d1b2a]">
                  ITEMS
                </div>
                <div className="text-[11px] font-medium tracking-[0.4px] text-center text-[#0d1b2a]">
                  AMOUNT
                </div>
                <div className="text-[11px] font-medium tracking-[0.4px] text-center text-[#0d1b2a]">
                  STATUS
                </div>
                <div className="text-[11px] font-medium leading-[13.5px] tracking-[0.4px] text-center text-[#0d1b2a]">
                  ORDER
                  <br />
                  DATE
                </div>
                <div className="text-[11px] font-medium leading-[13.5px] tracking-[0.4px] text-center text-[#0d1b2a]">
                  EXPECTED
                  <br />
                  DATE
                </div>
                <div className="text-[11px] font-medium tracking-[0.4px] text-center text-[#0d1b2a]">
                  ACTIONS
                </div>
              </div>

              {/* Table Rows / Mobile Cards */}
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white shadow-[0px_1.5px_3px_0px_rgba(0,0,0,0.25)] my-5 lg:my-0 mx-3 lg:mx-0 rounded-lg lg:rounded-none p-4 lg:p-0 hover:bg-slate-50 transition-colors lg:grid lg:h-[56px] lg:grid-cols-[105px_150px_1fr_105px_90px_105px_105px_90px] lg:items-center"
                >
                  {/* Mobile Card Layout */}
                  <div className="lg:hidden space-y-3">
                    {/* Order ID and Status */}
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-medium tracking-[0.4px] text-[#9c9c9c]">
                        {order.order_number}
                      </div>
                      <div
                        className="text-[11px] font-medium tracking-[0.4px] capitalize px-3 py-1 rounded-full"
                        style={{
                          color: getStatusColor(order.status),
                          backgroundColor:
                            getStatusColor(order.status) === "#2aae7a"
                              ? "#e6f7f0"
                              : getStatusColor(order.status) === "#10b981"
                                ? "#e6f7f0"
                                : getStatusColor(order.status) === "#3b82f6"
                                  ? "#dbeafe"
                                  : getStatusColor(order.status) === "#8b5cf6"
                                    ? "#f3e8ff"
                                    : getStatusColor(order.status) === "#ef4444"
                                      ? "#fee2e2"
                                      : "#fff4e6",
                        }}
                      >
                        {order.status}
                      </div>
                    </div>

                    {/* Items */}
                    <div className="text-[12px] font-medium text-black">
                      {order.items[0]?.product_title || "N/A"}
                    </div>

                    {/* Buyer */}
                    <div className="text-[11px] text-[#6b7280]">
                      Buyer:{" "}
                      <span className="text-black font-medium">
                        {order.buyer_company || order.buyer_name}
                      </span>
                    </div>

                    {/* Gray Section - Amount, Dates */}
                    <div className="bg-[#f6f6f6] -mx-4 -mb-4 p-4 rounded-b-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#6b7280]">
                          Amount
                        </span>
                        <span className="text-[12px] font-medium text-black">
                          {formatCurrency(order.total_amount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#6b7280]">
                          Order Date
                        </span>
                        <span className="text-[11px] text-black">
                          {formatDate(order.created_at)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#6b7280]">
                          Expected Date
                        </span>
                        <span className="text-[11px] text-black">
                          {formatDate(order.updated_at)}
                        </span>
                      </div>
                      <div className="pt-2">
                        <Link
                          href={`/supplier/orders/${order.id}`}
                          className="flex items-center justify-center gap-1.5 rounded-md bg-[#1e3a8a] px-4 py-2 text-[10px] font-medium text-white hover:bg-[#1e40af] transition-colors"
                        >
                          <Eye size={14} />
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Table Row */}
                  {/* Order ID */}
                  <div className="hidden lg:block pl-[17px] text-center text-[11px] font-medium leading-[16px] tracking-[0.4px] text-[#9c9c9c]">
                    {order.order_number}
                  </div>

                  {/* Buyer */}
                  <div className="hidden lg:flex text-center flex-col">
                    <div className="inline-block cursor-pointer border-b-2 border-transparent p-[5.5px] text-xs font-normal leading-normal tracking-[0.4px] text-black transition-all duration-200 hover:border-[#18b522]">
                      {order.buyer_company || order.buyer_name}
                    </div>
                  </div>

                  {/* Items */}
                  <div
                    className="hidden lg:block text-center overflow-hidden text-ellipsis whitespace-nowrap text-[11px] font-normal leading-[16px] tracking-[0.4px] text-black pr-2"
                    title={order.items[0]?.product_title || "N/A"}
                  >
                    {order.items[0]?.product_title || "N/A"}
                  </div>

                  {/* Amount */}
                  <div className="hidden lg:block text-center text-[11px] font-normal leading-[16px] tracking-[0.4px] text-black">
                    {formatCurrency(order.total_amount)}
                  </div>

                  {/* Status */}
                  <div
                    className="hidden lg:block text-center text-[11px] font-normal leading-[16px] tracking-[0.4px] capitalize"
                    style={{ color: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </div>

                  {/* Order Date */}
                  <div className="hidden lg:block text-center text-[11px] font-normal leading-[16px] tracking-[0.4px] text-black">
                    {formatDate(order.created_at)}
                  </div>

                  {/* Expected Date */}
                  <div className="hidden lg:block text-center text-[11px] font-normal leading-[16px] tracking-[0.4px] text-black">
                    {formatDate(order.updated_at)}
                  </div>

                  {/* Actions */}
                  <div className="hidden lg:block">
                    <Link href={`/supplier/orders/${order.id}`}>
                      <div className="flex cursor-pointer items-center justify-center rounded-[5.5px] bg-transparent transition-colors text-[#0d1b2a]">
                        <Eye size={16} className="stroke-[1.5]" />
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-[18px] sm:mt-[20px] lg:mt-[22.5px] flex justify-center gap-[7px] sm:gap-[8px] lg:gap-[9px] items-center">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="cursor-pointer rounded-[4px] sm:rounded-[4.2px] lg:rounded-[4.5px] border-2 border-[#0d1b2a] bg-white px-[11px] sm:px-[12px] lg:px-[13.5px] py-[5.5px] sm:py-[6px] lg:py-[6.75px] text-[8.5px] sm:text-[8.7px] lg:text-[9px] disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="text-[8.5px] sm:text-[8.7px] lg:text-[9px] text-[#0d1b2a]">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="cursor-pointer rounded-[4px] sm:rounded-[4.2px] lg:rounded-[4.5px] border-2 border-[#0d1b2a] bg-white px-[11px] sm:px-[12px] lg:px-[13.5px] py-[5.5px] sm:py-[6px] lg:py-[6.75px] text-[8.5px] sm:text-[8.7px] lg:text-[9px] disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="w-full rounded-[11px] bg-white p-6 sm:p-9 text-center shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)]">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[#FAFAFA]">
              <span className="text-2xl">📦</span>
            </div>
            <h3 className="mb-1.5 text-sm sm:text-[15px] font-semibold text-[#0d1b2a]">
              No Orders Yet
            </h3>
            <p className="text-xs sm:text-[12px] text-[#9c9c9c]">
              Orders from buyers will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
