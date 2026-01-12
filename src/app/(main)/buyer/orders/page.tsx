"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Download, Eye } from "lucide-react"; // The upgrade
import { buyerService } from "@/services/buyer.service";
import type { OrderSummary } from "@/types/buyer.types";

// Extended type for orders with supplier and items
type OrderWithDetails = OrderSummary & {
  supplierName?: string;
  items?: string;
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
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

      if (response.success && response.data) {
        // Backend returns { orders: [...], pagination: {...} } or { items: [...], pagination: {...} }
        const ordersData =
          (response.data as any).orders || response.data.items || [];

        // Map backend order format to OrderSummary format
        const mappedOrders: OrderWithDetails[] = ordersData.map(
          (order: any) => {
            let supplierName = "Unknown Supplier";
            if (
              order.order_items &&
              Array.isArray(order.order_items) &&
              order.order_items.length > 0 &&
              order.order_items[0].supplier_name
            ) {
              supplierName = order.order_items[0].supplier_name;
            }

            let itemsText = "No items";
            if (
              order.order_items &&
              Array.isArray(order.order_items) &&
              order.order_items.length > 0
            ) {
              const itemNames = order.order_items
                .map((item: any) => item.product_title)
                .filter((name: string) => name);

              if (itemNames.length > 0) {
                itemsText = itemNames.join(", ");
              } else {
                itemsText = `${order.order_items.length} item(s)`;
              }
            }

            return {
              orderId: order.id,
              orderNumber: order.order_number,
              status: order.status,
              paymentStatus: order.payment_status,
              totalAmount: order.total_amount,
              itemCount: order.order_items?.length || 0,
              orderDate: order.created_at,
              estimatedDelivery: order.estimated_delivery,
              supplierName,
              items: itemsText,
            };
          }
        );

        setOrders(mappedOrders);
        setTotalPages(response.data.pagination?.totalPages || 1);
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

  // Removed the duplicate useEffect. You're welcome.
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const getStatusColor = (status: string) => {
    if (status === "shipped" || status === "delivered") {
      return "#2aae7a";
    }
    return "#000000";
  };

  return (
    <div className="relative min-h-screen pb-[20px] sm:pb-[28px] md:pb-[34px] pt-[60px] sm:pt-[68px] md:pt-[75px]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-7.5">
        {/* Page Title and Export Button */}
        <div className="mb-[40px] sm:mb-[50px] md:mb-[60px] flex flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <h1 className="m-0 text-[16px] sm:text-[18px] md:text-[20px] font-semibold text-[#0d1b2a]">
            My Orders
          </h1>
          <button className="flex h-[32px] sm:h-[34px] md:h-[36px] cursor-pointer items-center gap-[4px] sm:gap-[5px] md:gap-[5.5px] rounded-[7px] sm:rounded-[8px] md:rounded-[8.5px] border-none bg-[#1e3a8a] px-[20px] sm:px-[25px] md:px-[31px] text-[9px] sm:text-[9.5px] md:text-[10px] font-semibold text-white transition-colors hover:bg-[#1e40af]">
            <Download size={14} className="stroke-[2.5]" />
            Export Orders
          </button>
        </div>

        {error && (
          <div className="mb-[11px] rounded-[4.5px] border border-[#fcc] bg-[#fee] p-[9px] text-[#c00] text-xs">
            {error}
          </div>
        )}

        {/* Orders Table/Cards */}
        <div className="min-h-[200px] sm:min-h-[240px] lg:min-h-[278px] w-full overflow-hidden rounded-[10px] sm:rounded-[10.5px] lg:rounded-[11px] bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] sm:shadow-[0px_0px_4.2px_0px_rgba(0,0,0,0.25)] lg:shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)]">
          {/* Table Headers - Hidden on mobile */}
          <div className="hidden lg:grid h-[52px] w-full grid-cols-[105px_150px_1fr_105px_90px_105px_105px_90px] items-center border-b border-[#e5e5e5]">
            <div className="pl-[17px] text-[11px] font-medium tracking-[0.4px] text-center text-[#0d1b2a]">
              ORDER ID
            </div>
            <div className="text-[11px] font-medium tracking-[0.4px] text-center text-[#0d1b2a]">
              SUPPLIER
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
          {isLoading ? (
            <div className="py-[28px] sm:py-[31px] lg:py-[34px] text-center text-[10px] sm:text-[10.5px] lg:text-[11px] text-[#9c9c9c]">
              <div className="animate-pulse">Loading orders...</div>
            </div>
          ) : orders.length === 0 ? (
            <div className="py-[28px] sm:py-[31px] lg:py-[34px] text-center text-[10px] sm:text-[10.5px] lg:text-[11px] text-[#9c9c9c]">
              No orders found
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.orderId || order.orderNumber}
                className="lg:grid lg:h-[56px] lg:grid-cols-[105px_150px_1fr_105px_90px_105px_105px_90px] lg:items-center bg-white shadow-[0px_1.5px_3px_0px_rgba(0,0,0,0.25)] my-5 lg:my-0 mx-3 lg:mx-0 rounded-lg lg:rounded-none p-4 lg:p-0 hover:bg-slate-50 transition-colors"
              >
                {/* Mobile Card Layout */}
                <div className="lg:hidden space-y-3">
                  {/* Order ID and Status */}
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-medium tracking-[0.4px] text-[#9c9c9c]">
                      {order.orderNumber}
                    </div>
                    <div
                      className="text-[11px] font-medium tracking-[0.4px] capitalize px-3 py-1 rounded-full"
                      style={{
                        color: getStatusColor(order.status),
                        backgroundColor:
                          getStatusColor(order.status) === "#2aae7a"
                            ? "#e6f7f0"
                            : "#fff4e6",
                      }}
                    >
                      {order.status}
                    </div>
                  </div>

                  {/* Items */}
                  <div className="text-[12px] font-medium text-black">
                    {order.items}
                  </div>

                  {/* Supplier */}
                  <div className="text-[11px] text-[#6b7280]">
                    Supplier:{" "}
                    <span className="text-black font-medium">
                      {order.supplierName}
                    </span>
                  </div>

                  {/* Gray Section - Amount, Dates */}
                  <div className="bg-[#f6f6f6] -mx-4 -mb-4 p-4 rounded-b-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#6b7280]">Amount</span>
                      <span className="text-[12px] font-medium text-black">
                        ₹
                        {parseFloat(
                          String(order.totalAmount || 0)
                        ).toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#6b7280]">
                        Order Date
                      </span>
                      <span className="text-[11px] text-black">
                        {new Date(order.orderDate).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#6b7280]">
                        Est. Delivery
                      </span>
                      <span className="text-[11px] text-black">
                        {order.estimatedDelivery
                          ? new Date(
                              order.estimatedDelivery
                            ).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })
                          : "N/A"}
                      </span>
                    </div>
                    <div className="pt-2">
                      <Link
                        href={`/buyer/track-order/${order.orderId}`}
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
                  {order.orderNumber}
                </div>

                {/* Supplier */}
                <div className="hidden lg:flex text-center flex-col">
                  <div className="inline-block cursor-pointer border-b-2 border-transparent p-[5.5px] text-[11px] font-normal leading-[16px] tracking-[0.4px] text-black transition-all duration-200 hover:border-[#18b522]">
                    {order.supplierName}
                  </div>
                </div>

                {/* Items */}
                <div
                  className="hidden lg:block text-center overflow-hidden text-ellipsis whitespace-nowrap text-[11px] font-normal leading-[16px] tracking-[0.4px] text-black pr-2"
                  title={order.items}
                >
                  {order.items}
                </div>

                {/* Amount */}
                <div className="hidden lg:block text-center text-[11px] font-normal leading-[16px] tracking-[0.4px] text-black">
                  ₹
                  {parseFloat(String(order.totalAmount || 0)).toLocaleString(
                    "en-IN",
                    { maximumFractionDigits: 2 }
                  )}
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
                  {new Date(order.orderDate).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </div>

                {/* Expected Date */}
                <div className="hidden lg:block text-center text-[11px] font-normal leading-[16px] tracking-[0.4px] text-black">
                  {order.estimatedDelivery
                    ? new Date(order.estimatedDelivery).toLocaleDateString(
                        "en-IN",
                        { year: "numeric", month: "2-digit", day: "2-digit" }
                      )
                    : "-"}
                </div>

                {/* Actions */}
                <div className="hidden lg:block">
                  <Link href={`/buyer/track-order/${order.orderNumber}`}>
                    <div className="flex cursor-pointer items-center justify-center rounded-[5.5px] bg-transparent transition-colors text-[#0d1b2a]">
                      <Eye size={16} className="stroke-[1.5]" />
                    </div>
                  </Link>
                </div>
              </div>
            ))
          )}
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
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="cursor-pointer rounded-[4px] sm:rounded-[4.2px] lg:rounded-[4.5px] border-2 border-[#0d1b2a] bg-white px-[11px] sm:px-[12px] lg:px-[13.5px] py-[5.5px] sm:py-[6px] lg:py-[6.75px] text-[8.5px] sm:text-[8.7px] lg:text-[9px] disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
