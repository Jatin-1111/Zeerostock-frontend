"use client";

import { useState, useEffect } from "react";
import { Users, List, FileCheck, DollarSign, Eye, Loader2 } from "lucide-react";
import {
  AdminLayout,
  StatsCard,
  PageHeader,
  BarChart,
} from "@/components/admin-panel";

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  inactiveUsers: number;
  verifiedUsers: number;
  buyersCount: number;
  suppliersCount: number;
}

interface VerificationStats {
  pending_count: string;
  under_review_count: string;
  verified_count: string;
  rejected_count: string;
  total_count: string;
}

interface OrderStats {
  totalOrders: number;
  pending: number;
  processing: number;
  shipped: number;
  in_transit: number;
  delivered: number;
  cancelled: number;
  issue: number;
  totalRevenue: string;
  deliveryIssues: number;
}

interface PendingVerification {
  id: string;
  companyName: string;
  contactPerson: string;
  documents: {
    gstCertificate?: string;
    panCard?: string;
  };
  submittedAt: string;
}

interface LocationStats {
  state: string;
  users: number;
  activeUsers: number;
  percentage: number;
}

export default function AdminDashboard() {
  const [heatMapTab, setHeatMapTab] = useState("India");
  const [listingTab, setListingTab] = useState("Last 6 months");
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [verificationStats, setVerificationStats] =
    useState<VerificationStats | null>(null);
  const [orderStats, setOrderStats] = useState<OrderStats | null>(null);
  const [pendingVerifications, setPendingVerifications] = useState<
    PendingVerification[]
  >([]);
  const [locationStats, setLocationStats] = useState<LocationStats[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");

      // Fetch all dashboard data in parallel
      const [usersRes, verificationsRes, ordersRes, pendingRes, locationRes] =
        await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/stats`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/supplier-verifications/stats`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/orders/stats`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/supplier-verifications?page=1&limit=5`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
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

      if (pendingRes.ok) {
        const data = await pendingRes.json();
        setPendingVerifications(data.data?.verifications || []);
      }

      if (locationRes.ok) {
        const data = await locationRes.json();
        setLocationStats(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: "Total Users",
      value: userStats ? userStats.totalUsers.toLocaleString() : "0",
      change: userStats
        ? `+${((userStats.newUsers / userStats.totalUsers) * 100).toFixed(0)}%`
        : "+0%",
      subtitle: userStats
        ? `Buyers ${userStats.buyersCount.toLocaleString()} / Supplier ${userStats.suppliersCount.toLocaleString()}`
        : "Loading...",
      icon: Users,
    },
    {
      title: "Total Orders",
      value: orderStats ? orderStats.totalOrders.toLocaleString() : "0",
      subtitle: orderStats
        ? `Active: ${(
            orderStats.pending +
            orderStats.processing +
            orderStats.shipped +
            orderStats.in_transit
          ).toLocaleString()}`
        : "Loading...",
      icon: List,
    },
    {
      title: "Pending Verification",
      value: verificationStats ? verificationStats.pending_count : "0",
      subtitle: verificationStats
        ? `Under Review\n${verificationStats.under_review_count} pending`
        : "Loading...",
      icon: FileCheck,
    },
    {
      title: "Total Revenue",
      value: orderStats
        ? `$${(parseFloat(orderStats.totalRevenue) / 1000).toFixed(1)}K`
        : "$0",
      subtitle: orderStats
        ? `Delivered\n${orderStats.delivered} orders`
        : "Loading...",
      icon: DollarSign,
    },
  ];

  const riskAlerts = [
    {
      text:
        orderStats && orderStats.deliveryIssues > 0
          ? `${orderStats.deliveryIssues} delivery issues detected`
          : "No delivery issues",
      time: "Live",
      action: "Investigate",
      actionColor: "text-red-600",
    },
    {
      text:
        verificationStats && parseInt(verificationStats.under_review_count) > 0
          ? `${verificationStats.under_review_count} verifications under review`
          : "No pending reviews",
      time: "Live",
      action: "View",
      actionColor: "text-blue-600",
    },
    {
      text:
        orderStats && orderStats.cancelled > 0
          ? `${orderStats.cancelled} cancelled orders require attention`
          : "No cancelled orders",
      time: "Live",
      action: "Review",
      actionColor: "text-yellow-600",
    },
  ];

  const recentActivities = [
    {
      text: userStats
        ? `${userStats.newUsers} new users registered in last 30 days`
        : "Loading user activity...",
      time: "30 days",
    },
    {
      text: orderStats
        ? `${orderStats.delivered} orders delivered successfully`
        : "Loading order data...",
      time: "All time",
    },
    {
      text: verificationStats
        ? `${verificationStats.verified_count} suppliers verified`
        : "Loading verification data...",
      time: "All time",
    },
    {
      text: orderStats
        ? `${orderStats.in_transit} orders currently in transit`
        : "Loading transit data...",
      time: "Live",
    },
  ];

  const getTrustScore = (verification: PendingVerification) => {
    let score = 50;
    if (verification.documents?.gstCertificate) score += 25;
    if (verification.documents?.panCard) score += 25;
    return `${score}/100`;
  };

  const getSubmittedDocs = (verification: PendingVerification) => {
    const docs = [];
    if (verification.documents?.gstCertificate) docs.push("GST");
    if (verification.documents?.panCard) docs.push("PAN");
    return docs.length > 0 ? docs.join(", ") : "None";
  };

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
                  Active user across India&apos;s elasticity
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
              {locationStats.length > 0 ? (
                locationStats.map((item, index) => {
                  // Calculate bar width based on max users for better visualization
                  const maxUsers = Math.max(
                    ...locationStats.map((s) => s.users)
                  );
                  const barWidth = (item.users / maxUsers) * 100;

                  return (
                    <div key={index} className="flex items-center gap-4">
                      <span className="text-[12px] text-gray-600 w-24">
                        {item.state}
                      </span>
                      <div className="flex-1 relative">
                        <div className="h-6 bg-gray-100 relative">
                          <div
                            className="h-full bg-black"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-medium text-black">
                          {item.users.toLocaleString()} users
                        </span>
                        {/* Growth percentage - commented out until historical data available */}
                        {/* <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center text-[10px] text-gray-600">
                        +{item.percentage}%
                      </div> */}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No location data available
                </div>
              )}
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
                {/* Delivered */}
                <div className="flex flex-col items-center flex-1">
                  <div className="relative w-full h-full flex items-end justify-center">
                    <div
                      className="w-20 bg-green-500 relative"
                      style={{
                        height: orderStats
                          ? `${Math.min(
                              (orderStats.delivered / 2000) * 100,
                              100
                            )}%`
                          : "0%",
                      }}
                    >
                      {orderStats && orderStats.delivered > 0 && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-100 border border-gray-300 px-2 py-1 text-[10px] whitespace-nowrap">
                          Delivered
                          <br />
                          {orderStats.delivered}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-[12px] text-gray-600 mt-2">
                    Delivered
                  </span>
                </div>

                {/* In Transit */}
                <div className="flex flex-col items-center flex-1">
                  <div
                    className="w-20 bg-blue-500"
                    style={{
                      height: orderStats
                        ? `${Math.min(
                            (orderStats.in_transit / 2000) * 100,
                            100
                          )}%`
                        : "0%",
                    }}
                  />
                  <span className="text-[12px] text-gray-600 mt-2">
                    In Transit
                  </span>
                </div>

                {/* Processing */}
                <div className="flex flex-col items-center flex-1">
                  <div
                    className="w-20 bg-yellow-500"
                    style={{
                      height: orderStats
                        ? `${Math.min(
                            (orderStats.processing / 2000) * 100,
                            100
                          )}%`
                        : "0%",
                    }}
                  />
                  <span className="text-[12px] text-gray-600 mt-2">
                    Processing
                  </span>
                </div>

                {/* Pending */}
                <div className="flex flex-col items-center flex-1">
                  <div
                    className="w-20 bg-gray-400"
                    style={{
                      height: orderStats
                        ? `${Math.min((orderStats.pending / 2000) * 100, 100)}%`
                        : "0%",
                    }}
                  />
                  <span className="text-[12px] text-gray-600 mt-2">
                    Pending
                  </span>
                </div>

                {/* Cancelled */}
                <div className="flex flex-col items-center flex-1">
                  <div
                    className="w-20 bg-red-500"
                    style={{
                      height: orderStats
                        ? `${Math.min(
                            (orderStats.cancelled / 2000) * 100,
                            100
                          )}%`
                        : "0%",
                    }}
                  />
                  <span className="text-[12px] text-gray-600 mt-2">
                    Cancelled
                  </span>
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
              {pendingVerifications.length > 0 ? (
                pendingVerifications.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 text-[14px] text-black">
                      {item.companyName || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-[14px] text-black">
                      {getSubmittedDocs(item)}
                    </td>
                    <td className="px-6 py-4 text-[14px] text-black">
                      {getTrustScore(item)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <a
                          href={`/admin-panel/verification/${item.id}`}
                          className="cursor-pointer"
                        >
                          <Eye className="w-4 h-4 text-gray-600 hover:text-black" />
                        </a>
                        <button className="text-[12px] text-black hover:underline">
                          Approve
                        </button>
                        <button className="text-[12px] text-black hover:underline">
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No pending verifications
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
