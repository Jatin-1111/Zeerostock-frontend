"use client";

import { useState, useEffect } from "react";
import {
  DollarSign,
  Activity,
  UserCheck,
  TrendingUp,
  ChevronDown,
  User,
  Loader2,
} from "lucide-react";
import { AdminLayout, StatsCard, PageHeader } from "@/components/admin-panel";

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  buyersCount: number;
  suppliersCount: number;
}

interface VerificationStats {
  pending_count: string;
  verified_count: string;
  rejected_count: string;
}

interface OrderStats {
  totalOrders: number;
  totalRevenue: string;
  delivered: number;
}

interface LocationStats {
  state: string;
  users: number;
  activeUsers: number;
}

export default function ReportsAnalyticsPage() {
  const [timeframe, setTimeframe] = useState("Last 6 Month");
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [verificationStats, setVerificationStats] =
    useState<VerificationStats | null>(null);
  const [orderStats, setOrderStats] = useState<OrderStats | null>(null);
  const [locationStats, setLocationStats] = useState<LocationStats[]>([]);

  useEffect(() => {
    fetchReportsData();
  }, []);

  const fetchReportsData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");

      const [usersRes, verificationsRes, ordersRes, locationRes] =
        await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/stats`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/verification/stats`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/orders/stats`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/stats/by-location?limit=5`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

      if (usersRes.ok) {
        const data = await usersRes.json();
        setUserStats(data.data);
      }

      if (verificationsRes.ok) {
        const data = await verificationsRes.json();
        setVerificationStats(data.data);
      }

      if (ordersRes.ok) {
        const data = await ordersRes.json();
        setOrderStats(data.data);
      }

      if (locationRes.ok) {
        const data = await locationRes.json();
        setLocationStats(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch reports data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: "Total Revenue",
      value: orderStats
        ? `$${(parseFloat(orderStats.totalRevenue) / 1000).toFixed(1)}K`
        : "$0",
      change: "+2.5%", // TODO: Calculate from historical data
      icon: DollarSign,
    },
    {
      title: "Total Transactions",
      value: orderStats ? orderStats.totalOrders.toLocaleString() : "0",
      change: "+2.5%", // TODO: Calculate from historical data
      icon: Activity,
    },
    {
      title: "Active User",
      value: userStats ? userStats.activeUsers.toLocaleString() : "0",
      change: userStats
        ? `+${((userStats.activeUsers / userStats.totalUsers) * 100).toFixed(
            1
          )}%`
        : "+0%",
      icon: UserCheck,
    },
    {
      title: "Total Users",
      value: userStats ? userStats.totalUsers.toLocaleString() : "0",
      change: userStats
        ? `+${((userStats.newUsers / userStats.totalUsers) * 100).toFixed(1)}%`
        : "+0%",
      icon: TrendingUp,
    },
  ];

  const regionalData = locationStats.map((location) => {
    const totalUsers = locationStats.reduce((sum, loc) => sum + loc.users, 0);
    const marketShare =
      totalUsers > 0 ? ((location.users / totalUsers) * 100).toFixed(1) : "0.0";

    return {
      region: location.state,
      transactionVolume: location.users.toLocaleString(),
      growth: "+0%", // TODO: Calculate from historical data
      avgOrderValue: "₹0", // TODO: Calculate from order data by location
      marketShare: `${marketShare}%`,
    };
  });

  const conversionMetrics = [
    { label: "Visitor > User", value: "0%" }, // TODO: Implement visitor tracking analytics
    { label: "Listing > Order", value: "0%" }, // TODO: Implement product view to order conversion
    {
      label: "User Activation Rate:",
      value:
        userStats && userStats.totalUsers > 0
          ? `${((userStats.activeUsers / userStats.totalUsers) * 100).toFixed(
              1
            )}%`
          : "0%",
    },
  ];

  const platformHealth = [
    {
      label: "Trust Score:",
      value: verificationStats
        ? `${(
            (parseInt(verificationStats.verified_count) /
              (parseInt(verificationStats.verified_count) +
                parseInt(verificationStats.rejected_count))) *
            5
          ).toFixed(1)}/5`
        : "0/5",
    },
    {
      label: "Dispute Rate:",
      value: "0.3%", // TODO: Add dispute tracking in backend
    },
    {
      label: "Verification Rate:",
      value: verificationStats
        ? `${(
            (parseInt(verificationStats.verified_count) /
              (parseInt(verificationStats.verified_count) +
                parseInt(verificationStats.rejected_count) +
                parseInt(verificationStats.pending_count))) *
            100
          ).toFixed(1)}%`
        : "0%",
    },
  ];

  const financialMetrics = [
    {
      label: "Average Order Value:",
      value:
        orderStats && orderStats.delivered > 0
          ? `$${(parseFloat(orderStats.totalRevenue) / orderStats.delivered)
              .toFixed(0)
              .toLocaleString()}`
          : "$0",
    },
    {
      label: "Platform Fee Revenue:",
      value: orderStats
        ? `$${(parseFloat(orderStats.totalRevenue) * 0.07)
            .toFixed(0)
            .toLocaleString()}` // Assuming 7% platform fee
        : "$0",
    },
    {
      label: "Total Revenue:",
      value: orderStats
        ? `$${parseFloat(orderStats.totalRevenue).toFixed(0).toLocaleString()}`
        : "$0",
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-black" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-[24px] font-bold text-black mb-1">
              Analytics Overview
            </h2>
            <p className="text-[13px] text-gray-500">
              Welcome Back, here&apos;s your performance summary.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="appearance-none bg-white border border-gray-300 pl-4 pr-10 py-2 text-[13px] text-black cursor-pointer focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option>Last 6 Month</option>
                <option>Last 12 Month</option>
                <option>Last Year</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
            </div>
            <button className="bg-black text-white px-4 py-2 text-[13px] font-medium hover:bg-gray-900 transition-colors">
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {statsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 p-4 relative"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[12px] font-medium text-black">
                    {card.title}
                  </span>
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="text-[24px] font-bold text-black mb-1">
                  {card.value}
                </div>
                <div className="text-[11px] text-gray-500">{card.change}</div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Revenue & Order Trends */}
          <div className="col-span-2 bg-white border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-[14px] font-bold text-black">
                  Revenue & Order Trends
                </h3>
                <p className="text-[11px] text-gray-500">Last 6 months</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  <span className="text-[11px] text-gray-600">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-black" />
                  <span className="text-[11px] text-gray-600">Orders</span>
                </div>
              </div>
            </div>
            <div className="h-48 relative">
              {/* Simple line chart representation */}
              <svg className="w-full h-full" viewBox="0 0 500 200">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={i * 50}
                    x2="500"
                    y2={i * 50}
                    stroke="#E5E7EB"
                    strokeWidth="1"
                  />
                ))}
                {/* Revenue line (gray) */}
                <polyline
                  points="50,150 120,120 190,100 260,120 330,90 400,110"
                  fill="none"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                />
                {/* Orders line (black) */}
                <polyline
                  points="50,160 120,140 190,110 260,130 330,100 400,70"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                />
                {/* X-axis labels */}
                <text x="50" y="195" fontSize="10" fill="#6B7280">
                  Jan
                </text>
                <text x="120" y="195" fontSize="10" fill="#6B7280">
                  Feb
                </text>
                <text x="190" y="195" fontSize="10" fill="#6B7280">
                  Mar
                </text>
                <text x="260" y="195" fontSize="10" fill="#6B7280">
                  Apr
                </text>
                <text x="330" y="195" fontSize="10" fill="#6B7280">
                  May
                </text>
                <text x="400" y="195" fontSize="10" fill="#6B7280">
                  Jun
                </text>
              </svg>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-[14px] font-bold text-black mb-6">
              Category Distribution
            </h3>
            <div className="flex flex-col items-center">
              {/* Pie Chart */}
              <svg className="w-40 h-40 mb-4" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="#4B5563" />
                <path
                  d="M 100 100 L 100 20 A 80 80 0 0 1 180 100 Z"
                  fill="#9CA3AF"
                />
                <path
                  d="M 100 100 L 180 100 A 80 80 0 0 1 156 156 Z"
                  fill="#D1D5DB"
                />
                <path
                  d="M 100 100 L 156 156 A 80 80 0 0 1 44 156 Z"
                  fill="#6B7280"
                />
              </svg>
              {/* Legend */}
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#4B5563]" />
                    <span className="text-gray-600">Textiles 33%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#6B7280]" />
                    <span className="text-gray-600">Metals 15%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#9CA3AF]" />
                    <span className="text-gray-600">Automobile 10%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#D1D5DB]" />
                    <span className="text-gray-600">Electronics 25%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Growth Trends */}
        <div className="bg-white border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-[14px] font-bold text-black">
                User Growth Trends
              </h3>
              <p className="text-[11px] text-gray-500">Last 6 months</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-400" />
                <span className="text-[11px] text-gray-600">Buyers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-black" />
                <span className="text-[11px] text-gray-600">Supplier</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-[11px] text-gray-600">Agents</span>
              </div>
            </div>
          </div>
          <div className="h-48 relative">
            <svg className="w-full h-full" viewBox="0 0 700 200">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={i * 50}
                  x2="700"
                  y2={i * 50}
                  stroke="#E5E7EB"
                  strokeWidth="1"
                />
              ))}
              {/* Buyers line (gray) */}
              <polyline
                points="80,140 220,120 360,110 500,130 640,120"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="2"
              />
              {/* Supplier line (black) */}
              <polyline
                points="80,160 220,150 360,130 500,100 640,50"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
              />
              {/* Agents line (red) */}
              <polyline
                points="80,150 220,140 360,130 500,120 640,100"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
              />
              {/* X-axis labels */}
              <text x="80" y="195" fontSize="10" fill="#6B7280">
                Jan
              </text>
              <text x="220" y="195" fontSize="10" fill="#6B7280">
                Feb
              </text>
              <text x="360" y="195" fontSize="10" fill="#6B7280">
                Mar
              </text>
              <text x="500" y="195" fontSize="10" fill="#6B7280">
                Apr
              </text>
              <text x="640" y="195" fontSize="10" fill="#6B7280">
                May
              </text>
            </svg>
          </div>
        </div>

        {/* Regional Performance Table */}
        <div className="bg-white border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-[14px] font-bold text-black">
              Regional Performance
            </h3>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-[11px] font-bold text-black">
                  REGION
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-bold text-black">
                  TRANSACTION
                  <br />
                  VOLUME
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-bold text-black">
                  GROWTH (%)
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-bold text-black">
                  AVG. ORDER
                  <br />
                  VALUE
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-bold text-black">
                  MARKET
                  <br />
                  SHARE
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {regionalData.map((region, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-[13px] text-black">
                    {region.region}
                  </td>
                  <td className="px-6 py-4 text-[13px] text-black">
                    {region.transactionVolume}
                  </td>
                  <td className="px-6 py-4 text-[13px] text-black">
                    {region.growth}
                  </td>
                  <td className="px-6 py-4 text-[13px] text-black">
                    {region.avgOrderValue}
                  </td>
                  <td className="px-6 py-4 text-[13px] text-black">
                    {region.marketShare}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Metrics */}
        <div className="grid grid-cols-3 gap-6">
          {/* Conversion Metrics */}
          <div className="bg-white border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-[13px] font-bold text-black">
                Conversion Metrics
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {conversionMetrics.map((metric, index) => (
                <div key={index} className="p-4 flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-[11px] text-gray-500 mb-1">
                      {metric.label}
                    </p>
                    <p className="text-[16px] font-bold text-black">
                      {metric.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Health */}
          <div className="bg-white border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-[13px] font-bold text-black">
                Platform Health
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {platformHealth.map((metric, index) => (
                <div key={index} className="p-4 flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-[11px] text-gray-500 mb-1">
                      {metric.label}
                    </p>
                    <p className="text-[16px] font-bold text-black">
                      {metric.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Metrics */}
          <div className="bg-white border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-[13px] font-bold text-black">
                Financial Metrics
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {financialMetrics.map((metric, index) => (
                <div key={index} className="p-4 flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-[11px] text-gray-500 mb-1">
                      {metric.label}
                    </p>
                    <p className="text-[16px] font-bold text-black">
                      {metric.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
