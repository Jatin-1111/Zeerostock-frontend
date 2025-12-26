"use client";

import { useEffect, useState } from "react";
import {
  Package,
  MessageSquarePlus,
  TrendingUp,
  Clock,
  Plus,
  FileText,
  DollarSign,
  Eye,
  Star,
  Send,
} from "lucide-react";
import Link from "next/link";
import {
  supplierService,
  SupplierDashboardStats,
} from "@/services/supplier.service";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

// Force this page to be dynamically rendered
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function SupplierDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<SupplierDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [roleError, setRoleError] = useState(false);

  useEffect(() => {
    // Check if user has supplier role
    if (user && user.activeRole !== "supplier") {
      setRoleError(true);
      setLoading(false);
      return;
    }
    fetchDashboardStats();
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await supplierService.getDashboardStats();

      if (response.success && response.data) {
        setStats(response.data);
      } else {
        toast.error(response.message || "Failed to fetch dashboard stats");
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  // Show role error if user is not in supplier mode
  if (roleError) {
    return (
      <div className="min-h-screen bg-[#EEFBF6] flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Supplier Access Required
          </h2>
          <p className="text-gray-600 mb-6">
            You are currently in{" "}
            <span className="font-semibold">{user?.activeRole}</span> mode.
            Please switch to supplier mode to access this page.
          </p>
          <div className="space-y-3">
            {user?.roles?.includes("supplier") ? (
              <Link
                href="/profile?switchRole=supplier"
                className="block px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
              >
                Switch to Supplier Mode
              </Link>
            ) : (
              <Link
                href="/supplier/register"
                className="block px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
              >
                Register as Supplier
              </Link>
            )}
            <Link
              href="/"
              className="block px-6 py-3 border-2 border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-50"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load dashboard data</p>
          <button
            onClick={fetchDashboardStats}
            className="mt-4 px-4 py-2 bg-gray-900 text-white text-sm hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEFBF6]">
      <div className="max-w-[1440px] mx-auto px-20 py-16">
        <div className="flex justify-between">
          {/* Welcome Header */}
          <div className="mb-6">
            <h1
              className="text-[36px] font-semibold text-[#0d1b2a] mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Welcome Back, {user?.companyName || user?.firstName}
            </h1>
            <p
              className="text-2xl font-medium text-[#9c9c9c]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Here&apos;s your business overview
            </p>
          </div>

          {/* Add Product Button */}
          <div className="mb-8">
            <Link
              href="/supplier/inventory"
              className="inline-flex items-center gap-2.5 px-5 py-[15px] bg-[#2aae7a] text-white text-xl font-semibold rounded-[15px] hover:bg-[#25996b] transition-colors"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <Plus className="w-6 h-6" />
              Add Product
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Active Listings */}
          <div
            className="bg-white rounded-[20px] p-6 relative overflow-hidden"
            style={{ boxShadow: "0px 0px 6px 0px rgba(24, 181, 34, 0.25)" }}
          >
            <p
              className="text-xl font-medium text-[#9c9c9c] mb-2"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Active Listings
            </p>
            <p
              className="text-[32px] font-semibold text-[#0d1b2a] mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {stats.listings.active_listings}
            </p>
            <p
              className="text-sm font-medium text-[#9c9c9c]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {formatNumber(stats.listings.total_views)} total views
            </p>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[58px] h-[59px] flex items-center justify-center">
              <Package className="w-8 h-8 text-[#2aae7a]" strokeWidth={1.5} />
            </div>
          </div>

          {/* RFQ Matches */}
          <div
            className="bg-white rounded-[20px] p-6 relative overflow-hidden"
            style={{ boxShadow: "0px 0px 6px 0px rgba(24, 181, 34, 0.25)" }}
          >
            <p
              className="text-xl font-medium text-[#9c9c9c] mb-2"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              RFQ Matches
            </p>
            <p
              className="text-[32px] font-semibold text-[#0d1b2a] mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              5
            </p>
            <p
              className="text-sm font-medium text-[#9c9c9c]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Processing
            </p>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-[#dbeafe] rounded-full flex items-center justify-center">
              <MessageSquarePlus
                className="w-[30px] h-[30px] text-[#3b82f6]"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Monthly Revenue */}
          <div
            className="bg-white rounded-[20px] p-6 relative overflow-hidden"
            style={{ boxShadow: "0px 0px 6px 0px rgba(24, 181, 34, 0.25)" }}
          >
            <p
              className="text-xl font-medium text-[#9c9c9c] mb-2"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Monthly Revenue
            </p>
            <p
              className="text-[32px] font-semibold text-[#2aae7a] mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {formatCurrency(stats.orders.revenue_this_month)}
            </p>
            <p
              className="text-sm font-medium text-[#2aae7a]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              +12% from last month
            </p>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-[#eeffef] rounded-full flex items-center justify-center">
              <TrendingUp
                className="w-[30px] h-[30px] text-[#2aae7a]"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Pending Orders */}
          <div
            className="bg-white rounded-[20px] p-6 relative overflow-hidden"
            style={{ boxShadow: "0px 0px 6px 0px rgba(24, 181, 34, 0.25)" }}
          >
            <p
              className="text-xl font-medium text-[#9c9c9c] mb-2"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Pending Orders
            </p>
            <p
              className="text-[32px] font-semibold text-[#eab308] mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {stats.orders.pending_orders}
            </p>
            <p
              className="text-sm font-medium text-[#9c9c9c]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Last 30 days
            </p>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-[#fef9c3] rounded-full flex items-center justify-center">
              <Clock
                className="w-[30px] h-[30px] text-[#eab308]"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[825px_1fr] gap-6">
          {/* Active Listings Performance */}
          <div
            className="bg-white rounded-[20px] p-6"
            style={{ boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <h2
              className="text-2xl font-medium text-[#0d1b2a] mb-8"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Active Listings Performance
            </h2>

            {stats.recentActivity.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No listings yet</p>
                <Link
                  href="/supplier/inventory"
                  className="px-4 py-2 bg-gray-900 text-white text-sm hover:bg-gray-800"
                >
                  Create Your First Listing
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {stats.recentActivity.slice(0, 3).map((listing) => (
                  <div
                    key={listing.id}
                    className="bg-[#fbfbfb] rounded-[20px] p-4 flex items-center gap-4 relative"
                    style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
                  >
                    <div className="w-[161px] h-[121px] bg-gray-200 rounded-[10px] flex items-center justify-center shrink-0 overflow-hidden">
                      {listing.image_url ? (
                        <img
                          src={listing.image_url}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">No Image</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-[22px] font-medium text-black mb-2 line-clamp-1"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {listing.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="bg-[#eeffef] px-3 py-1 rounded-full text-[15px] font-medium text-[#2aae7a]"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          Electronics
                        </span>
                        <span
                          className="bg-[#eeffef] px-3 py-1 rounded-full text-[15px] font-medium text-[#2aae7a]"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          Active
                        </span>
                      </div>
                      <div
                        className="flex items-center gap-6 text-base text-[#9c9c9c]"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        <span className="font-medium">
                          {listing.views_count} Views
                        </span>
                        <span className="font-medium">
                          {listing.watchers_count} Watching
                        </span>
                        <span className="font-medium">12 Bids</span>
                      </div>
                    </div>
                    <div className="text-right self-start pt-2">
                      <p
                        className="text-[30px] font-semibold text-black mb-2"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {formatCurrency(listing.price_after)}
                      </p>
                      <p
                        className="text-xl font-medium text-[#9c9c9c] mb-8"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        600 units
                      </p>
                      <div
                        className="flex items-center gap-2 text-[22px] text-[#0d1b2a]"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        <Clock className="w-6 h-6" />
                        <span className="font-medium">3d 14h</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Performance Insights */}
            <div
              className="bg-white rounded-[20px] p-6"
              style={{ boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.25)" }}
            >
              <h3
                className="text-2xl font-medium text-[#0d1b2a] mb-6"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Performance Insights
              </h3>

              {/* Rating Display */}
              <div className="flex items-center justify-center mb-6">
                <p
                  className="text-[39px] font-medium text-[#2aae7a]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  4.8
                </p>
                <Star className="w-9 h-9 text-[#2aae7a] fill-[#2aae7a] ml-2" />
              </div>
              <p
                className="text-xl font-medium text-[#9c9c9c] text-center mb-8"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Supplier Rating
              </p>

              {/* Metrics */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span
                    className="text-xl font-medium text-[#0d1b2a]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Response Rate
                  </span>
                  <span
                    className="text-xl font-medium text-[#2aae7a]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    98%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className="text-xl font-medium text-[#0d1b2a]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    On-Time Delivery
                  </span>
                  <span
                    className="text-xl font-medium text-[#2aae7a]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    96%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className="text-xl font-medium text-[#0d1b2a]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Quote Win Rate
                  </span>
                  <span
                    className="text-xl font-medium text-[#2aae7a]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    36%
                  </span>
                </div>
              </div>
            </div>

            {/* Top RFQ Match */}
            <div
              className="bg-white rounded-[20px] p-6"
              style={{ boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.25)" }}
            >
              <h3
                className="text-2xl font-medium text-[#0d1b2a] mb-6"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Top RFQ Match
              </h3>
              <p
                className="text-xl font-medium text-[#0d1b2a] mb-1"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Industrial Electronic
              </p>
              <p
                className="text-base font-medium text-[#9c9c9c] mb-4"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                95% Match
              </p>
              <p
                className="text-2xl font-semibold text-black mb-6"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                ₹180,000
              </p>
              <Link
                href="/supplier/rfq"
                className="flex items-center justify-center gap-2.5 w-full py-[15px] bg-[#1e3a8a] text-white text-[15px] font-semibold rounded-xl hover:bg-[#1e40af] transition-colors"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <Send className="w-5 h-5" />
                Submit Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
