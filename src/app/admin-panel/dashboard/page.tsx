"use client";

import { useState } from "react";
import { Users, List, FileCheck, DollarSign, Eye } from "lucide-react";
import {
  AdminLayout,
  StatsCard,
  PageHeader,
  BarChart,
} from "@/components/admin-panel";

export default function AdminDashboard() {
  const [heatMapTab, setHeatMapTab] = useState("India");
  const [listingTab, setListingTab] = useState("Last 6 months");

  const statsCards = [
    {
      title: "Total Users",
      value: "42,827",
      change: "+12%",
      subtitle: "Buyers 28,571 / Supplier 12,256",
      icon: Users,
    },
    {
      title: "Live Listing",
      value: "12,827",
      subtitle: "Active today: 1,224",
      icon: List,
    },
    {
      title: "Pending Verification",
      value: "321",
      subtitle: "High Volume\nKYC Pending",
      icon: FileCheck,
    },
    {
      title: "Active Escrow Orders",
      value: "$3.4M",
      subtitle: "Holding\nEscrow holds $156k",
      icon: DollarSign,
    },
  ];

  const heatMapData = [
    { state: "Maharashtra", users: 8000, percentage: 25 },
    { state: "Delhi", users: 5000, percentage: 15 },
    { state: "Gujarat", users: 5000, percentage: 15 },
    { state: "Tamil Nadu", users: 4000, percentage: 12 },
    { state: "Karnataka", users: 8000, percentage: 25 },
  ];

  const riskAlerts = [
    {
      text: "Suspicious activity detected #XYZ - 12,000",
      time: "12 min ago",
      action: "Investigate",
      actionColor: "text-red-600",
    },
    {
      text: "Duplicate listing detected",
      time: "16 min ago",
      action: "View",
      actionColor: "text-blue-600",
    },
    {
      text: "Suspicious login activity for user #YYY",
      time: "1 hour ago",
      action: "Lock Account",
      actionColor: "text-red-600",
    },
  ];

  const recentActivities = [
    {
      text: "New user John Morris (LTD signed up",
      time: "7 min ago",
    },
    {
      text: "License release for orders #1012 - 53323",
      time: "14 min ago",
    },
    {
      text: 'New Listing "TMT Steel Bars" by ABC Steel',
      time: "16 min ago",
    },
    {
      text: "Escrow release for orders #1012 - 53323",
      time: "34 min ago",
    },
  ];

  const pendingKYC = [
    {
      company: "SteelCorp Ind",
      docs: "GST, PAN",
      trustScore: "72/100",
    },
    {
      company: "SteelCorp Ind",
      docs: "GST, PAN",
      trustScore: "72/100",
    },
    {
      company: "SteelCorp Ind",
      docs: "GST, PAN",
      trustScore: "72/100",
    },
    {
      company: "Mega Polymers",
      docs: "PAN",
      trustScore: "23/100",
    },
    {
      company: "SteelCorp Ind",
      docs: "GST, PAN",
      trustScore: "72/100",
    },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <PageHeader
        title="Admin Dashboard"
        description="Welcome back, Admin. Here's what's happening today."
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {statsCards.map((card, index) => (
          <StatsCard key={index} {...card} />
        ))}
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* User Heat Map */}
        <div className="col-span-2 bg-white border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-[16px] font-bold text-black">
                User Heat Map
              </h3>
              <p className="text-[12px] text-gray-500">
                Active user across India's elasticity
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setHeatMapTab("India")}
                className={`px-4 py-1.5 text-[12px] font-medium transition-colors ${
                  heatMapTab === "India"
                    ? "bg-black text-white"
                    : "bg-white text-gray-600 border border-gray-300"
                }`}
              >
                India
              </button>
              <button
                onClick={() => setHeatMapTab("Global")}
                className={`px-4 py-1.5 text-[12px] font-medium transition-colors ${
                  heatMapTab === "Global"
                    ? "bg-black text-white"
                    : "bg-white text-gray-600 border border-gray-300"
                }`}
              >
                Global
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {heatMapData.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="text-[12px] text-gray-600 w-24">
                  {item.state}
                </span>
                <div className="flex-1 relative">
                  <div className="h-6 bg-gray-100 relative">
                    <div
                      className="h-full bg-black"
                      style={{ width: `${item.percentage * 4}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-medium text-black">
                    {item.users.toLocaleString()} users
                  </span>
                  <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center text-[10px] text-gray-600">
                    +{item.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Alerts Panel */}
        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-[16px] font-bold text-black mb-4">
            Risk Alerts Panel
          </h3>
          <div className="space-y-4">
            {riskAlerts.map((alert, index) => (
              <div key={index} className="border border-gray-200 p-3">
                <p className="text-[12px] text-black mb-1">{alert.text}</p>
                <p className="text-[10px] text-gray-500 mb-2">{alert.time}</p>
                <button
                  className={`text-[11px] font-medium ${alert.actionColor} hover:underline`}
                >
                  {alert.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Listing Status */}
        <div className="col-span-2 bg-white border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-[16px] font-bold text-black">
                Listing Status
              </h3>
              <p className="text-[12px] text-gray-500">Inventory breakdown</p>
            </div>
            <div className="flex gap-2">
              {["Last 6 months", "Last 12 months", "Month-by-data"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setListingTab(tab)}
                    className={`px-3 py-1.5 text-[11px] font-medium transition-colors ${
                      listingTab === tab
                        ? "bg-black text-white"
                        : "bg-white text-gray-600 border border-gray-300"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Bar Chart */}
          <div className="relative h-64">
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-gray-500">
              <span>2000</span>
              <span>1600</span>
              <span>1000</span>
              <span>500</span>
              <span>100</span>
              <span>0</span>
            </div>
            <div className="ml-12 h-full flex items-end justify-around gap-8">
              {/* Live */}
              <div className="flex flex-col items-center flex-1">
                <div className="relative w-full h-full flex items-end justify-center">
                  <div
                    className="w-20 bg-gray-400 relative"
                    style={{ height: "75%" }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-100 border border-gray-300 px-2 py-1 text-[10px] whitespace-nowrap">
                      Active Escrow
                      <br />
                      1747
                    </div>
                  </div>
                </div>
                <span className="text-[12px] text-gray-600 mt-2">Live</span>
              </div>

              {/* Pending */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-20 bg-gray-300" style={{ height: "55%" }} />
                <span className="text-[12px] text-gray-600 mt-2">Pending</span>
              </div>

              {/* Flagged */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-20 bg-gray-800" style={{ height: "20%" }} />
                <span className="text-[12px] text-gray-600 mt-2">Flagged</span>
              </div>

              {/* Expired */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-20 bg-gray-300" style={{ height: "45%" }} />
                <span className="text-[12px] text-gray-600 mt-2">Expired</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-[16px] font-bold text-black mb-4">
            Recent Activity Feed
          </h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="border border-gray-200 p-3">
                <p className="text-[12px] text-black mb-1">{activity.text}</p>
                <p className="text-[10px] text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Supplier KYC Table */}
      <div className="bg-white border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-[16px] font-bold text-black">
            Pending Supplier KYC
          </h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-[12px] font-bold text-black uppercase">
                COMPANY
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-bold text-black uppercase">
                SUBMITTED DOC
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-bold text-black uppercase">
                TRUST SCORE
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-bold text-black uppercase">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pendingKYC.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-[14px] text-black">
                  {item.company}
                </td>
                <td className="px-6 py-4 text-[14px] text-black">
                  {item.docs}
                </td>
                <td className="px-6 py-4 text-[14px] text-black">
                  {item.trustScore}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 text-gray-600 cursor-pointer hover:text-black" />
                    <button className="text-[12px] text-black hover:underline">
                      Approve
                    </button>
                    <button className="text-[12px] text-black hover:underline">
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
