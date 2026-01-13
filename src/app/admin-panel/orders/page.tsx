"use client";

import { useState, useEffect } from "react";
import {
  List,
  Truck,
  Clock,
  AlertTriangle,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AdminLayout, StatsCard, PageHeader } from "@/components/admin-panel";
import { useRouter } from "next/navigation";

interface OrderItem {
  itemId: string;
  productTitle: string;
  quantity: number;
  finalPrice: string;
  subtotal: string;
  itemStatus: string;
}

interface Order {
  id: string;
  order_number: string;
  created_at: string;
  status: string;
  total_amount: string;
  shipping_address: {
    company?: string;
    firstName?: string;
    lastName?: string;
  };
  shipping_partner?: string;
  tracking_number?: string;
  delivery_eta?: string;
  order_items: OrderItem[];
}

interface Stats {
  totalOrders: number;
  inTransit: number;
  pendingDispatch: number;
  deliveryIssues: number;
}

export default function OrdersLogisticsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    inTransit: 0,
    pendingDispatch: 0,
    deliveryIssues: 0,
  });
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 0 });
  const router = useRouter();

  const filterButtons = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Shipped", value: "shipped" },
    { label: "In transit", value: "in_transit" },
  ];

  useEffect(() => {
    fetchStats();
    fetchOrders();
  }, [currentPage, activeFilter, searchTerm]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/orders/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch stats");

      const result = await response.json();
      setStats(result.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "50",
        ...(activeFilter !== "all" && { status: activeFilter }),
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/orders?${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch orders");

      const result = await response.json();
      setOrders(result.data.orders);
      setPagination(result.data.pagination);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (orderId: string) => {
    router.push(`/admin-panel/orders/${orderId}`);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on search
  };

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      delivered: "bg-gray-100 text-gray-700",
      in_transit: "bg-blue-100 text-blue-700",
      pending: "bg-yellow-100 text-yellow-700",
      shipped: "bg-purple-100 text-purple-700",
      processing: "bg-orange-100 text-orange-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return statusColors[status] || "bg-gray-100 text-gray-700";
  };

  const formatStatus = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getBuyerName = (shippingAddress: Order["shipping_address"]) => {
    if (shippingAddress.company) return shippingAddress.company;
    return `${shippingAddress.firstName || ""} ${
      shippingAddress.lastName || ""
    }`.trim();
  };

  const statsCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders.toString(),
      change: `${pagination.total} orders`,
      icon: List,
    },
    {
      title: "Orders in transit",
      value: stats.inTransit.toString(),
      change: "Active shipments",
      icon: Truck,
    },
    {
      title: "Pending dispatch",
      value: stats.pendingDispatch.toString(),
      change: "Awaiting shipment",
      icon: Clock,
    },
    {
      title: "Delivery issues",
      value: stats.deliveryIssues.toString(),
      change: "Requires attention",
      icon: AlertTriangle,
    },
  ];

  if (loading && orders.length === 0) {
    return (
      <AdminLayout>
        <PageHeader
          title="Orders & Logistics"
          description="Monitor order lifecycle, logistics progress, delays, and exceptions across the global supply chain."
        />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <PageHeader
          title="Orders & Logistics"
          description="Monitor order lifecycle, logistics progress, delays, and exceptions across the global supply chain."
          actions={
            <button className="bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-900 transition-colors">
              Export
            </button>
          }
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {statsCards.map((card, index) => (
            <StatsCard key={index} {...card} />
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white border border-gray-200 mb-4">
          {/* Filter Buttons */}
          <div className="flex items-center gap-2 p-4 border-b border-gray-200">
            {filterButtons.map((filter) => (
              <button
                key={filter.value}
                onClick={() => {
                  setActiveFilter(filter.value);
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeFilter === filter.value
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order number, buyer, or tracking number..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 mb-4">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-black">
                  ORDER ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black">
                  BUYER
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black">
                  AMOUNT
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black">
                  STATUS
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black">
                  LOGISTICS
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black">
                  TRACKING
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center">
                    <p className="text-sm text-gray-500">
                      No orders found.{" "}
                      {searchTerm && "Try adjusting your search."}
                    </p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-black">
                        {order.order_number}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(order.created_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-black">
                        {getBuyerName(order.shipping_address)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.order_items?.length || 0} item(s)
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-black">
                        ${parseFloat(order.total_amount).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {formatStatus(order.status)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-black">
                        {order.shipping_partner || "Not assigned"}
                      </div>
                      {order.delivery_eta && (
                        <div className="text-xs text-gray-500">
                          ETA:{" "}
                          {new Date(order.delivery_eta).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-xs text-gray-600 font-mono">
                        {order.tracking_number || "N/A"}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleViewOrder(order.id)}
                        className="text-black hover:text-gray-600"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between bg-white border border-gray-200 px-6 py-3">
            <p className="text-sm text-gray-600">
              Showing {orders.length} of {pagination.total} orders
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(pagination.totalPages, prev + 1)
                  )
                }
                disabled={currentPage === pagination.totalPages}
                className="p-2 border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
