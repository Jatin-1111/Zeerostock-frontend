"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { buyerService } from "@/services/buyer.service";
import type { OrderSummary } from "@/types/buyer.types";

// Extended type for orders with supplier and items
type OrderWithDetails = OrderSummary & {
  supplierName?: string;
  items?: string;
};

// Frame icon SVG
const FrameIcon = () => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.5 9L9 15.5"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.5 14.13V9H10.37"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
      console.log("Orders response:", response);

      if (response.success && response.data) {
        // Backend returns { orders: [...], pagination: {...} } or { items: [...], pagination: {...} }
        const ordersData =
          (response.data as any).orders || response.data.items || [];

        // Debug: Log the first order to see structure
        if (ordersData.length > 0) {
          console.log("First order structure:", ordersData[0]);
          console.log("Order items:", ordersData[0].order_items);
          console.log("Supplier:", ordersData[0].supplier);
        }

        // Map backend order format to OrderSummary format
        const mappedOrders: OrderWithDetails[] = ordersData.map(
          (order: any) => {
            // Extract supplier name from the first order item
            // Each order item has supplier_name, supplier_city fields
            let supplierName = "Unknown Supplier";
            if (
              order.order_items &&
              Array.isArray(order.order_items) &&
              order.order_items.length > 0 &&
              order.order_items[0].supplier_name
            ) {
              supplierName = order.order_items[0].supplier_name;
            }

            // Extract items - use product_title from order_items
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
        console.log("Orders loaded:", mappedOrders.length);
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

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const getStatusColor = (status: string) => {
    // Map to design's green color for shipped/delivered
    if (status === "shipped" || status === "delivered") {
      return "#2aae7a";
    }
    // Keep other statuses as black
    return "#000000";
  };

  return (
    <div className="relative min-h-screen bg-[#eefbf6] pb-[34px] pt-[75px]">
      <div className="mx-auto max-w-[1440px] px-7.5">
        {/* Page Title and Export Button */}
        <div className="mb-[60px] flex items-center justify-between">
          <h1 className="m-0 text-[20px] font-semibold text-[#0d1b2a]">
            My Orders
          </h1>
          <button className="flex h-[34px] cursor-pointer items-center gap-[5.5px] rounded-[8.5px] border-none bg-[#1e3a8a] px-[62px] text-[10px] font-semibold text-white">
            <FrameIcon />
            Export Orders
          </button>
        </div>

        {error && (
          <div className="mb-[11px] rounded-[4.5px] border border-[#fcc] bg-[#fee] p-[9px] text-[#c00] text-xs">
            {error}
          </div>
        )}

        {/* Orders Table */}
        <div className="min-h-[278px] w-full overflow-hidden rounded-[11px] bg-white shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)]">
          {/* Table Headers */}
          <div className="grid h-[52px] w-full grid-cols-[105px_150px_1fr_105px_90px_105px_105px_90px] items-center border-b border-[#e5e5e5]">
            <div className="pl-[17px] text-[11px] font-medium tracking-[0.4px] text-[#0d1b2a]">
              ORDER ID
            </div>
            <div className="text-[11px] font-medium tracking-[0.4px] text-[#0d1b2a]">
              SUPPLIER
            </div>
            <div className="text-[11px] font-medium tracking-[0.4px] text-[#0d1b2a]">
              ITEMS
            </div>
            <div className="text-[11px] font-medium tracking-[0.4px] text-[#0d1b2a]">
              AMOUNT
            </div>
            <div className="text-[11px] font-medium tracking-[0.4px] text-[#0d1b2a]">
              STATUS
            </div>
            <div className="text-[11px] font-medium leading-[13.5px] tracking-[0.4px] text-[#0d1b2a]">
              ORDER
              <br />
              DATE
            </div>
            <div className="text-[11px] font-medium leading-[13.5px] tracking-[0.4px] text-[#0d1b2a]">
              EXPECTED
              <br />
              DATE
            </div>
            <div className="text-[11px] font-medium tracking-[0.4px] text-[#0d1b2a]">
              ACTIONS
            </div>
          </div>

          {/* Table Rows */}
          {isLoading ? (
            <div className="py-[34px] text-center text-[11px] text-[#9c9c9c]">
              <div className="animate-pulse">Loading orders...</div>
            </div>
          ) : orders.length === 0 ? (
            <div className="py-[34px] text-center text-[11px] text-[#9c9c9c]">
              No orders found
            </div>
          ) : (
            orders.map((order, index) => (
              <div
                key={order.orderId || order.orderNumber}
                className="grid h-[56px] w-full grid-cols-[105px_150px_1fr_105px_90px_105px_105px_90px] items-center bg-white shadow-[0px_1.5px_3px_0px_rgba(0,0,0,0.25)]"
              >
                {/* Order ID */}
                <div className="pl-[17px] text-[11px] font-medium leading-[16px] tracking-[0.4px] text-[#9c9c9c]">
                  {order.orderNumber}
                </div>

                {/* Supplier - with green underline on hover */}
                <div className="flex flex-col">
                  <div className="inline-block cursor-pointer border-b-2 border-transparent p-[5.5px] text-[11px] font-normal leading-[16px] tracking-[0.4px] text-black transition-all duration-200 hover:border-[#18b522]">
                    {order.supplierName}
                  </div>
                </div>

                {/* Items */}
                <div
                  className="overflow-hidden text-ellipsis whitespace-nowrap text-[11px] font-normal leading-[16px] tracking-[0.4px] text-black"
                  title={order.items}
                >
                  {order.items}
                </div>

                {/* Amount */}
                <div className="text-[11px] font-normal leading-[16px] tracking-[0.4px] text-black">
                  ₹
                  {parseFloat(String(order.totalAmount || 0)).toLocaleString(
                    "en-IN",
                    { maximumFractionDigits: 2 }
                  )}
                </div>

                {/* Status */}
                <div
                  className="text-[11px] font-normal leading-[16px] tracking-[0.4px] capitalize"
                  style={{ color: getStatusColor(order.status) }}
                >
                  {order.status}
                </div>

                {/* Order Date */}
                <div className="text-[11px] font-normal leading-[16px] tracking-[0.4px] text-black">
                  {new Date(order.orderDate).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </div>

                {/* Expected Date */}
                <div className="text-[11px] font-normal leading-[16px] tracking-[0.4px] text-black">
                  {order.estimatedDelivery
                    ? new Date(order.estimatedDelivery).toLocaleDateString(
                        "en-IN",
                        { year: "numeric", month: "2-digit", day: "2-digit" }
                      )
                    : "-"}
                </div>

                {/* Actions */}
                <div className="pl-[9px]">
                  <Link href={`/buyer/track-order/${order.orderNumber}`}>
                    <button className="flex cursor-pointer items-center justify-center rounded-[5.5px] border-[0.4px] border-[#747474] bg-transparent p-[5.5px]">
                      <FrameIcon />
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-[22.5px] flex justify-center gap-[9px] items-center">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="cursor-pointer rounded-[4.5px] border-2 border-[#0d1b2a] bg-white px-[13.5px] py-[6.75px] text-[9px] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-[9px] text-[#0d1b2a]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="cursor-pointer rounded-[4.5px] border-2 border-[#0d1b2a] bg-white px-[13.5px] py-[6.75px] text-[9px] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
