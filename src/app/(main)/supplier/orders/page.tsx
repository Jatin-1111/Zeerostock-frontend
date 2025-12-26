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
      <div className="min-h-screen bg-[#EEFBF6] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 border-2 border-red-600 mx-auto flex items-center justify-center mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Access Restricted
            </h2>
            <p className="text-gray-600 mb-6">
              You need to be in supplier mode to view orders. Your current role
              is: <strong>{user.activeRole}</strong>
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => (window.location.href = "/supplier")}
              className="w-full px-6 py-3 bg-gray-900 text-white font-semibold border-2 border-gray-900 hover:bg-gray-800 transition-colors"
            >
              Switch to Supplier Mode
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full px-6 py-3 bg-[#EEFBF6] text-gray-900 font-semibold border-2 border-gray-900 hover:bg-gray-50 transition-colors"
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
      <div className="min-h-screen bg-[#EEFBF6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#EEFBF6] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 border-2 border-red-600 mx-auto flex items-center justify-center mb-4">
              <span className="text-3xl">❌</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
          </div>
          <button
            onClick={fetchOrders}
            className="px-6 py-3 bg-gray-900 text-white font-semibold border-2 border-gray-900 hover:bg-gray-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#EEFBF6] px-12 py-6"
      style={{ maxWidth: "100%", margin: "0 auto" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-9">
        <h1
          className="text-[27px] font-semibold text-[#0d1b2a]"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          My orders
        </h1>
        <button
          className="bg-[#1e3a8a] text-white rounded-[11px] flex items-center gap-2 hover:bg-[#1e40af] transition-colors"
          style={{
            width: "180px",
            height: "45px",
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            justifyContent: "center",
          }}
        >
          <Download className="w-5 h-5" />
          Export Orders
        </button>
      </div>

      {/* Table */}
      {orders.length > 0 ? (
        <>
          <div
            className="bg-white rounded-[15px] overflow-hidden"
            style={{
              boxShadow: "0px 0px 4.5px 0px rgba(0, 0, 0, 0.25)",
              width: "100%",
            }}
          >
            {/* Table Headers */}
            <div
              className="flex items-center h-[69px] border-b"
              style={{
                borderColor: "#e5e5e5",
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >
              <div style={{ flex: "1 1 120px", minWidth: "120px" }}>
                <p
                  className="text-[15px] font-medium text-[#0d1b2a]"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    letterSpacing: "0.38px",
                    lineHeight: "18px",
                  }}
                >
                  ORDER ID
                </p>
              </div>
              <div style={{ flex: "1 1 150px", minWidth: "150px" }}>
                <p
                  className="text-[15px] font-medium text-[#0d1b2a]"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    letterSpacing: "0.38px",
                    lineHeight: "18px",
                  }}
                >
                  SUPPLIER
                </p>
              </div>
              <div style={{ flex: "1.5 1 200px", minWidth: "200px" }}>
                <p
                  className="text-[15px] font-medium text-[#0d1b2a]"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    letterSpacing: "0.38px",
                    lineHeight: "18px",
                  }}
                >
                  ITEMS
                </p>
              </div>
              <div style={{ flex: "1 1 120px", minWidth: "120px" }}>
                <p
                  className="text-[15px] font-medium text-[#0d1b2a]"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    letterSpacing: "0.38px",
                    lineHeight: "18px",
                  }}
                >
                  AMOUNT
                </p>
              </div>
              <div style={{ flex: "1 1 120px", minWidth: "120px" }}>
                <p
                  className="text-[15px] font-medium text-[#0d1b2a]"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    letterSpacing: "0.38px",
                    lineHeight: "18px",
                  }}
                >
                  STATUS
                </p>
              </div>
              <div style={{ flex: "1 1 120px", minWidth: "120px" }}>
                <p
                  className="text-[15px] font-medium text-[#0d1b2a]"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    letterSpacing: "0.38px",
                    lineHeight: "18px",
                  }}
                >
                  ORDER
                  <br />
                  DATE
                </p>
              </div>
              <div style={{ flex: "1 1 120px", minWidth: "120px" }}>
                <p
                  className="text-[15px] font-medium text-[#0d1b2a]"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    letterSpacing: "0.38px",
                    lineHeight: "18px",
                  }}
                >
                  EXPECTED
                  <br />
                  DATE
                </p>
              </div>
              <div style={{ flex: "0 0 80px", minWidth: "80px" }}>
                <p
                  className="text-[15px] font-medium text-[#0d1b2a]"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    letterSpacing: "0.38px",
                    lineHeight: "18px",
                  }}
                >
                  ACTIONS
                </p>
              </div>
            </div>

            {/* Table Rows */}
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center h-[75px] border-b hover:bg-gray-50 transition-colors"
                style={{
                  borderColor: "#e5e5e5",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
              >
                {/* Order ID */}
                <div style={{ flex: "1 1 120px", minWidth: "120px" }}>
                  <p
                    className="text-[15px] font-medium text-[#9c9c9c]"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      letterSpacing: "0.38px",
                      lineHeight: "21px",
                    }}
                  >
                    {order.order_number}
                  </p>
                </div>

                {/* Supplier/Buyer */}
                <div style={{ flex: "1 1 150px", minWidth: "150px" }}>
                  <p
                    className="text-[15px] font-normal text-black"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      letterSpacing: "0.38px",
                      lineHeight: "21px",
                      borderBottom: "2px solid #2aae7a",
                      display: "inline-block",
                      paddingBottom: "2px",
                    }}
                  >
                    {order.buyer_company || order.buyer_name}
                  </p>
                </div>

                {/* Items */}
                <div style={{ flex: "1.5 1 200px", minWidth: "200px" }}>
                  <p
                    className="text-[15px] font-normal text-black truncate"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      letterSpacing: "0.38px",
                      lineHeight: "21px",
                    }}
                  >
                    {order.items[0]?.product_title || "N/A"}
                  </p>
                </div>

                {/* Amount */}
                <div style={{ flex: "1 1 120px", minWidth: "120px" }}>
                  <p
                    className="text-[15px] font-normal text-black"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      letterSpacing: "0.38px",
                      lineHeight: "21px",
                    }}
                  >
                    {formatCurrency(order.total_amount)}
                  </p>
                </div>

                {/* Status */}
                <div style={{ flex: "1 1 120px", minWidth: "120px" }}>
                  <p
                    className="text-[15px] font-normal capitalize"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      letterSpacing: "0.38px",
                      lineHeight: "21px",
                      color: getStatusColor(order.status),
                    }}
                  >
                    {order.status}
                  </p>
                </div>

                {/* Order Date */}
                <div style={{ flex: "1 1 120px", minWidth: "120px" }}>
                  <p
                    className="text-[15px] font-normal text-black"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      letterSpacing: "0.38px",
                      lineHeight: "21px",
                    }}
                  >
                    {formatDate(order.created_at)}
                  </p>
                </div>

                {/* Expected Date */}
                <div style={{ flex: "1 1 120px", minWidth: "120px" }}>
                  <p
                    className="text-[15px] font-normal text-black"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      letterSpacing: "0.38px",
                      lineHeight: "21px",
                    }}
                  >
                    {formatDate(order.updated_at)}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ flex: "0 0 80px", minWidth: "80px" }}>
                  <button
                    className="border border-[#747474] rounded-[8px] p-1.5 hover:bg-gray-100 transition-colors"
                    style={{ borderWidth: "0.38px" }}
                  >
                    <MoreVertical className="w-5 h-5 text-[#747474]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-5">
              <div
                className="text-[11px] text-[#9c9c9c]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 bg-[#EEFBF6] border border-[#9c9c9c] text-[#0d1b2a] rounded-[8px] text-[11px] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center gap-1.5"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <ChevronLeft className="w-3 h-3" />
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 bg-[#EEFBF6] border border-[#9c9c9c] text-[#0d1b2a] rounded-[8px] text-[11px] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center gap-1.5"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Next
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div
          className="bg-[#EEFBF6] rounded-[15px] p-9 text-center"
          style={{
            boxShadow: "0px 0px 4.5px 0px rgba(0, 0, 0, 0.25)",
            width: "100%",
          }}
        >
          <div className="w-12 h-12 bg-[#FAFAFA] mx-auto flex items-center justify-center mb-3 rounded-lg">
            <span className="text-2xl">📦</span>
          </div>
          <h3
            className="text-[15px] font-semibold text-[#0d1b2a] mb-1.5"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            No Orders Yet
          </h3>
          <p
            className="text-[12px] text-[#9c9c9c]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Orders from buyers will appear here
          </p>
        </div>
      )}
    </div>
  );
}
