"use client";

import { useState } from "react";
import {
  DollarSign,
  List,
  TrendingUp,
  AlertCircle,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import { AdminLayout, StatsCard, PageHeader } from "@/components/admin-panel";

export default function EscrowPaymentsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const statsCards = [
    {
      title: "Total Escrow value",
      value: "$12,42,827",
      change: "12% vs Last Month",
      icon: DollarSign,
    },
    {
      title: "Held in escrow",
      value: "$33,12,827",
      change: "4% vs Last Month",
      icon: List,
    },
    {
      title: "Released amount",
      value: "$82,64,321",
      change: "8% vs Last Month",
      icon: TrendingUp,
    },
    {
      title: "Frozen / Dispute",
      value: "$3,00,642",
      change: "2% vs Last Month",
      icon: AlertCircle,
    },
  ];

  const filterButtons = [
    "All",
    "Held",
    "Released",
    "Frozen",
    "Escrow Payments",
  ];

  const escrowData = [
    {
      orderId: "#CRD-24912",
      date: "Oct 24, 2025",
      buyer: "Tech Source Inc.",
      supplier: "Global Parts Ltd.",
      amount: "$450,000",
      status: "Processing",
      statusColor: "bg-blue-100 text-blue-700",
      paymentStage: "Processing",
      progress: 60,
    },
    {
      orderId: "#CRD-24912",
      date: "Oct 24, 2025",
      buyer: "Tech Source Inc.",
      supplier: "Global Parts Ltd.",
      amount: "$450,000",
      status: "Dispute",
      statusColor: "bg-red-100 text-red-700",
      paymentStage: "Frozen",
      progress: 30,
      progressLabel: "Held",
    },
    {
      orderId: "#CRD-24912",
      date: "Oct 24, 2025",
      buyer: "Tech Source Inc.",
      supplier: "Global Parts Ltd.",
      amount: "$450,000",
      status: "Paid",
      statusColor: "bg-gray-100 text-gray-700",
      paymentStage: "Completed",
      progress: 100,
    },
    {
      orderId: "#CRD-24912",
      date: "Oct 24, 2025",
      buyer: "Tech Source Inc.",
      supplier: "Global Parts Ltd.",
      amount: "$450,000",
      status: "Pending",
      statusColor: "bg-gray-100 text-gray-700",
      paymentStage: "Initiated",
      progress: 10,
    },
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <PageHeader
          title="Escrow & Payments"
          description="Monitor real-time escrow status, release verified payments and manage dispute resolutions."
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
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${
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
                placeholder="Search orders, buyers, suppliers..."
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
                  PARTIES (BUYER/
                  <br />
                  SUPPLIER)
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black">
                  Payment Stage
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {escrowData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-black">
                      {item.orderId}
                    </div>
                    <div className="text-xs text-gray-500">{item.date}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <User className="w-3 h-3 text-gray-600" />
                      </div>
                      <span className="text-sm text-black">
                        {item.buyer}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <User className="w-3 h-3 text-gray-600" />
                      </div>
                      <span className="text-sm text-black">
                        {item.supplier}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-black">
                    {item.amount}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${item.statusColor}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-black">
                            {item.paymentStage}
                          </span>
                          <span className="text-xs text-black">
                            {item.progress}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-200 relative">
                          <div
                            className="h-full bg-black"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        {item.progressLabel && (
                          <span className="text-xs text-gray-500 mt-0.5 block">
                            {item.progressLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <button className="hover:bg-gray-100 p-1.5 rounded transition-colors">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing 1 to 4 of 97 results
          </p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              className={`w-8 h-8 border flex items-center justify-center text-sm font-medium transition-colors ${
                currentPage === 1
                  ? "bg-black text-white border-black"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            <button
              className={`w-8 h-8 border flex items-center justify-center text-sm font-medium transition-colors ${
                currentPage === 2
                  ? "bg-black text-white border-black"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setCurrentPage(2)}
            >
              2
            </button>
            <button
              className={`w-8 h-8 border flex items-center justify-center text-sm font-medium transition-colors ${
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
      </div>
    </AdminLayout>
  );
}
