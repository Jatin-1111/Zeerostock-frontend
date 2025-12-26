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
    <div
      style={{
        backgroundColor: "#eefbf6",
        minHeight: "100vh",
        position: "relative",
        paddingTop: "100.5px",
        paddingBottom: "45px",
      }}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 60px" }}>
        {/* Page Title and Export Button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "80.25px",
          }}
        >
          <h1
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "27px",
              color: "#0d1b2a",
              margin: 0,
            }}
          >
            My Orders
          </h1>
          <button
            style={{
              backgroundColor: "#1e3a8a",
              color: "white",
              padding: "0 82.5px",
              height: "45px",
              borderRadius: "11.25px",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "7.5px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "13.5px",
              cursor: "pointer",
            }}
          >
            <FrameIcon />
            Export Orders
          </button>
        </div>

        {error && (
          <div
            style={{
              marginBottom: "15px",
              padding: "12px",
              backgroundColor: "#fee",
              border: "1px solid #fcc",
              borderRadius: "6px",
              color: "#c00",
            }}
          >
            {error}
          </div>
        )}

        {/* Orders Table */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            boxShadow: "0px 0px 6px 0px rgba(0,0,0,0.25)",
            overflow: "hidden",
            minHeight: "371.25px",
            width: "100%",
          }}
        >
          {/* Table Headers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "140px 200px 1fr 140px 120px 140px 140px 120px",
              height: "69px",
              alignItems: "center",
              borderBottom: "1px solid #e5e5e5",
              width: "100%",
            }}
          >
            <div
              style={{
                paddingLeft: "22.5px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                color: "#0d1b2a",
                letterSpacing: "0.5px",
              }}
            >
              ORDER ID
            </div>
            <div
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                color: "#0d1b2a",
                letterSpacing: "0.5px",
              }}
            >
              SUPPLIER
            </div>
            <div
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                color: "#0d1b2a",
                letterSpacing: "0.5px",
              }}
            >
              ITEMS
            </div>
            <div
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                color: "#0d1b2a",
                letterSpacing: "0.5px",
              }}
            >
              AMOUNT
            </div>
            <div
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                color: "#0d1b2a",
                letterSpacing: "0.5px",
              }}
            >
              STATUS
            </div>
            <div
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                color: "#0d1b2a",
                letterSpacing: "0.5px",
                lineHeight: "18px",
              }}
            >
              ORDER
              <br />
              DATE
            </div>
            <div
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                color: "#0d1b2a",
                letterSpacing: "0.5px",
                lineHeight: "18px",
              }}
            >
              EXPECTED
              <br />
              DATE
            </div>
            <div
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                color: "#0d1b2a",
                letterSpacing: "0.5px",
              }}
            >
              ACTIONS
            </div>
          </div>

          {/* Table Rows */}
          {isLoading ? (
            <div
              style={{
                padding: "45px 0",
                textAlign: "center",
                fontFamily: "Inter, sans-serif",
                fontSize: "15px",
                color: "#9c9c9c",
              }}
            >
              <div className="animate-pulse">Loading orders...</div>
            </div>
          ) : orders.length === 0 ? (
            <div
              style={{
                padding: "45px 0",
                textAlign: "center",
                fontFamily: "Inter, sans-serif",
                fontSize: "15px",
                color: "#9c9c9c",
              }}
            >
              No orders found
            </div>
          ) : (
            orders.map((order, index) => (
              <div
                key={order.orderId || order.orderNumber}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "140px 200px 1fr 140px 120px 140px 140px 120px",
                  height: "75px",
                  alignItems: "center",
                  boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.25)",
                  backgroundColor: "white",
                  width: "100%",
                }}
              >
                {/* Order ID */}
                <div
                  style={{
                    paddingLeft: "22.5px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "#9c9c9c",
                    letterSpacing: "0.5px",
                    lineHeight: "21px",
                  }}
                >
                  {order.orderNumber}
                </div>

                {/* Supplier - with green underline on hover */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: "15px",
                      color: "#000000",
                      letterSpacing: "0.5px",
                      lineHeight: "21px",
                      padding: "7.5px",
                      display: "inline-block",
                      cursor: "pointer",
                      transition: "border-bottom 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderBottom = "2px solid #18b522";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderBottom =
                        "2px solid transparent";
                    }}
                  >
                    {order.supplierName}
                  </div>
                </div>

                {/* Items */}
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "15px",
                    color: "#000000",
                    letterSpacing: "0.5px",
                    lineHeight: "21px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={order.items}
                >
                  {order.items}
                </div>

                {/* Amount */}
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "15px",
                    color: "#000000",
                    letterSpacing: "0.5px",
                    lineHeight: "21px",
                  }}
                >
                  ₹
                  {parseFloat(String(order.totalAmount || 0)).toLocaleString(
                    "en-IN",
                    { maximumFractionDigits: 2 }
                  )}
                </div>

                {/* Status */}
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "15px",
                    color: getStatusColor(order.status),
                    letterSpacing: "0.5px",
                    lineHeight: "21px",
                    textTransform: "capitalize",
                  }}
                >
                  {order.status}
                </div>

                {/* Order Date */}
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "15px",
                    color: "#000000",
                    letterSpacing: "0.5px",
                    lineHeight: "21px",
                  }}
                >
                  {new Date(order.orderDate).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </div>

                {/* Expected Date */}
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "15px",
                    color: "#000000",
                    letterSpacing: "0.5px",
                    lineHeight: "21px",
                  }}
                >
                  {order.estimatedDelivery
                    ? new Date(order.estimatedDelivery).toLocaleDateString(
                        "en-IN",
                        { year: "numeric", month: "2-digit", day: "2-digit" }
                      )
                    : "-"}
                </div>

                {/* Actions */}
                <div style={{ paddingLeft: "12px" }}>
                  <Link href={`/buyer/track-order/${order.orderNumber}`}>
                    <button
                      style={{
                        border: "0.5px solid #747474",
                        borderRadius: "7.5px",
                        padding: "7.5px",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
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
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                padding: "9px 18px",
                border: "2px solid #0d1b2a",
                borderRadius: "6px",
                backgroundColor: "white",
                fontFamily: "Poppins, sans-serif",
                fontSize: "12px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            >
              Previous
            </button>
            <span
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "12px",
                color: "#0d1b2a",
              }}
            >
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{
                padding: "9px 18px",
                border: "2px solid #0d1b2a",
                borderRadius: "6px",
                backgroundColor: "white",
                fontFamily: "Poppins, sans-serif",
                fontSize: "12px",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages ? 0.5 : 1,
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
