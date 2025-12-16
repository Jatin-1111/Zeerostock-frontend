"use client";

import { useState } from "react";
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

export default function OrdersLogisticsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const statsCards = [
    {
      title: "Total Orders",
      value: "12,580",
      change: "12% vs Last Month",
      icon: List,
    },
    {
      title: "Orders in transit",
      value: "4,322",
      change: "-4% vs Last Month",
      icon: Truck,
    },
    {
      title: "Pending dispatch",
      value: "1,104",
      change: "-1% efficiency drop",
      icon: Clock,
    },
    {
      title: "Delivery issues",
      value: "76",
      change: "-26% less issue (Good)",
      icon: AlertTriangle,
    },
  ];

  const filterButtons = ["All", "Pending", "Shipped", "In transit"];

  const ordersData = [
    {
      orderId: "#ORD-24912",
      date: "Oct 24,2025",
      buyer: "Tech Source Inc.",
      supplier: "Global Parts Ltd.",
      amount: "$450,000",
      status: "In transit",
      statusColor: "bg-blue-100 text-blue-700",
      logistics: "DHL Express",
      logisticsInfo: "Exp. Oct 26",
      tracking: "TRK-695281",
    },
    {
      orderId: "#ORD-24912",
      date: "Oct 24,2025",
      buyer: "Tech Source Inc.",
      supplier: "Global Parts Ltd.",
      amount: "$450,000",
      status: "Delivered",
      statusColor: "bg-gray-100 text-gray-700",
      logistics: "FEDEX",
      logisticsInfo: "Exp. Oct 26",
      tracking: "TRK-695281",
    },
    {
      orderId: "#ORD-24912",
      date: "Oct 24,2025",
      buyer: "Tech Source Inc.",
      supplier: "Global Parts Ltd.",
      amount: "$450,000",
      status: "Pending dispatch",
      statusColor: "bg-yellow-100 text-yellow-700",
      logistics: "UPS Freight",
      logisticsInfo: "Exp. Oct 26",
      tracking: "TRK-695281",
    },
    {
      orderId: "#ORD-24912",
      date: "Oct 24,2025",
      buyer: "Tech Source Inc.",
      supplier: "Global Parts Ltd.",
      amount: "$450,000",
      status: "Shipped",
      statusColor: "bg-purple-100 text-purple-700",
      logistics: "DHL Express",
      logisticsInfo: "Exp. Oct 26",
      tracking: "TRK-695281",
    },
  ];

  const handleViewOrder = (orderId: string) => {
    router.push(`/admin-panel/orders/${orderId}`);
  };

  return (
    <AdminLayout>
      {/* Header */}
      <PageHeader
        title="Orders & Logistics"
        description="Monitor order lifecycle, logistics progress, delays, and exceptions across the global supply chain."
        actions={
          <button className="bg-black text-white px-4 py-2 text-[13px] font-medium hover:bg-gray-900 transition-colors">
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
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 text-[12px] font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="order number / Logis. Org/i..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 text-[13px] text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 mb-4">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-[11px] font-bold text-black">
                ORDER ID
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-bold text-black">
                PARTIES (BUYER/
                <br />
                SUPPLIER)
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-bold text-black">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-bold text-black">
                Status
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-bold text-black">
                Logistics
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-bold text-black">
                Tracking
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ordersData.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="text-[13px] font-medium text-black">
                    {order.orderId}
                  </div>
                  <div className="text-[11px] text-gray-500">{order.date}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="mb-2">
                    <div className="text-[12px] font-medium text-black">
                      {order.buyer}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-600">
                      V/s {order.supplier}
                    </div>
                    <div className="text-[10px] text-gray-500">S Ltd</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-[13px] text-black">
                  {order.amount}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-medium ${order.statusColor}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="text-[12px] font-medium text-black">
                    {order.logistics}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    {order.logisticsInfo}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => handleViewOrder(order.orderId)}
                    className="flex items-center gap-2 text-[11px] text-black hover:underline"
                  >
                    {order.tracking}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <p className="text-[12px] text-gray-600">
          Showing 1 to 4 of 100 results
        </p>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button
            className={`w-8 h-8 border flex items-center justify-center text-[12px] font-medium transition-colors ${
              currentPage === 1
                ? "bg-black text-white border-black"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
          <button
            className={`w-8 h-8 border flex items-center justify-center text-[12px] font-medium transition-colors ${
              currentPage === 2
                ? "bg-black text-white border-black"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setCurrentPage(2)}
          >
            2
          </button>
          <button
            className={`w-8 h-8 border flex items-center justify-center text-[12px] font-medium transition-colors ${
              currentPage === 3
                ? "bg-black text-white border-black"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setCurrentPage(3)}
          >
            3
          </button>
          <button className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
