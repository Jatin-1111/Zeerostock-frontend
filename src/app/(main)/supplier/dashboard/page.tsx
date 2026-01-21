"use client";

import { useEffect, useState } from "react";
import {
  Package,
  MessageSquarePlus,
  TrendingUp,
  Clock,
  Plus,
  Star,
  Send,
} from "lucide-react";
import Link from "next/link";
import {
  supplierService,
  SupplierDashboardStats,
} from "@/services/supplier.service";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

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
    <div className="min-h-screen bg-[#EEFBF6] px-15 py-4.5">
      <div className="flex justify-between items-start mb-4">
        {/* Welcome Header */}
        <div className="mb-4">
          <h1 className="text-[20px] font-semibold text-[#0d1b2a] leading-normal">
            Welcome Back, {user?.companyName || user?.firstName}
          </h1>
          <p className="text-[13.5px] font-medium text-[#9c9c9c] leading-normal mt-0.75">
            Here&apos;s your business overview
          </p>
        </div>

        {/* Add Product Button */}
        <div className="mb-4">
          <Link
            href="/supplier/listings/new"
            className="inline-flex items-center justify-center gap-[6px] h-[34px] px-[34px] bg-[#2aae7a] text-white text-[11px] font-semibold rounded-[8px] hover:bg-[#25996b] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-4.5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16.5px] mb-4.5">
          {/* Active Listings */}
          <div
            className="bg-white rounded-[11px] h-[76px] px-[8px] py-[18px] relative overflow-hidden"
            style={{ boxShadow: "0px 0px 4px 0px rgba(24, 181, 34, 0.25)" }}
          >
            <div className="absolute left-[8px] top-1/2 -translate-y-1/2 w-[39px] h-[39px] bg-[#eeffef] rounded-full flex items-center justify-center">
              <Package
                className="w-[28.5px] h-[28.5px] text-[#2aae7a]"
                strokeWidth={1.5}
              />
            </div>
            <div className="ml-[51px]">
              <p className="text-[11px] font-medium text-[#9c9c9c] leading-normal mb-1.5">
                Active Listings
              </p>
              <p className="text-[18px] font-semibold text-[#0d1b2a] leading-normal">
                {stats.listings.active_listings}
              </p>
            </div>
          </div>

          {/* RFQ Matches */}
          <div
            className="bg-white rounded-[11px] h-[76px] px-[8px] py-[18px] relative overflow-hidden"
            style={{ boxShadow: "0px 0px 4px 0px rgba(24, 181, 34, 0.25)" }}
          >
            <div className="absolute left-[8px] top-1/2 -translate-y-1/2 w-[39px] h-[39px] bg-[#dbeafe] rounded-full flex items-center justify-center">
              <MessageSquarePlus
                className="w-[28.5px] h-[28.5px] text-[#3b82f6]"
                strokeWidth={1.5}
              />
            </div>
            <div className="ml-[51px]">
              <p className="text-[11px] font-medium text-[#9c9c9c] leading-normal mb-1.5">
                RFQ Matches
              </p>
              <p className="text-[18px] font-semibold text-[#0d1b2a] leading-normal">
                {stats.rfqMatches?.totalMatches || 0}
              </p>
            </div>
          </div>

          {/* Monthly Revenue */}
          <div
            className="bg-white rounded-[11px] h-[76px] px-[8px] py-[18px] relative overflow-hidden"
            style={{ boxShadow: "0px 0px 4px 0px rgba(24, 181, 34, 0.25)" }}
          >
            <div className="absolute left-[8px] top-1/2 -translate-y-1/2 w-[39px] h-[39px] bg-[#eeffef] rounded-full flex items-center justify-center">
              <TrendingUp
                className="w-[28.5px] h-[28.5px] text-[#2aae7a]"
                strokeWidth={1.5}
              />
            </div>
            <div className="ml-[51px]">
              <p className="text-[11px] font-medium text-[#9c9c9c] leading-normal mb-1.5">
                Monthly Revenue
              </p>
              <p className="text-[18px] font-semibold text-[#2aae7a] leading-normal">
                {formatCurrency(stats.orders.revenue_this_month)}
              </p>
            </div>
          </div>

          {/* Pending Orders */}
          <div
            className="bg-white rounded-[11px] h-[76px] px-[8px] py-[18px] relative overflow-hidden"
            style={{ boxShadow: "0px 0px 4px 0px rgba(24, 181, 34, 0.25)" }}
          >
            <div className="absolute left-[8px] top-1/2 -translate-y-1/2 w-[39px] h-[39px] bg-[#fef9c3] rounded-full flex items-center justify-center">
              <Clock
                className="w-[28.5px] h-[28.5px] text-[#eab308]"
                strokeWidth={1.5}
              />
            </div>
            <div className="ml-[51px]">
              <p className="text-[11px] font-medium text-[#9c9c9c] leading-normal mb-1.5">
                Pending Orders
              </p>
              <p className="text-[18px] font-semibold text-[#eab308] leading-normal">
                {stats.orders.pending_orders}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex gap-4.5 mt-4.5">
        {/* Active Listings Performance */}
        <div className="basis-3/4">
          <div
            className="bg-white rounded-[11px] p-3.5 h-full"
            style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <h2 className="text-[15px] font-medium text-[#0d1b2a] mb-4.5">
              Active Listings Performance
            </h2>

            {stats.recentActivity.length === 0 ? (
              <div className="text-center py-6">
                <Package className="w-7 h-7 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">No listings yet</p>
                <Link
                  href="/supplier/listings/new"
                  className="inline-block px-2.5 py-1 bg-gray-900 text-white text-[10px] hover:bg-gray-800 rounded"
                >
                  Create Your First Listing
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {stats.recentActivity.slice(0, 3).map((listing) => (
                  <div
                    key={listing.id}
                    className="bg-[#fbfbfb] rounded-[10px] p-2.5 flex items-center gap-2.5 relative"
                    style={{
                      boxShadow: "0px 0px 3px 0px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <div className="w-[90px] h-[68px] bg-gray-200 rounded-[6px] flex items-center justify-center shrink-0 overflow-hidden">
                      {listing.image_url ? (
                        <img
                          src={listing.image_url}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-[8px]">
                          No Image
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[13px] font-medium text-black mb-1 line-clamp-1">
                        {listing.title}
                      </h3>
                      <div className="flex items-center gap-1 mb-1.5">
                        {listing.category_name && (
                          <span className="bg-[#eeffef] px-[7px] py-[2px] rounded-full text-[9px] font-medium text-[#2aae7a]">
                            {listing.category_name}
                          </span>
                        )}
                        <span className="bg-[#eeffef] px-[7px] py-[2px] rounded-full text-[9px] font-medium text-[#2aae7a]">
                          Active
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-[#9c9c9c]">
                        <span className="font-medium">
                          {listing.views_count} Views
                        </span>
                        <span className="font-medium">
                          {listing.watchers_count} Watching
                        </span>
                      </div>
                    </div>
                    <div className="text-right self-start pt-1">
                      <p className="text-[17px] font-semibold text-black mb-1">
                        {formatCurrency(listing.price_after)}
                      </p>
                      <p className="text-[12px] font-medium text-[#9c9c9c] mb-4">
                        {listing.quantity} units
                      </p>
                      <div className="flex items-center gap-1 text-[13px] text-[#0d1b2a]">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="font-medium">3d 14h</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="basis-1/4 flex flex-col gap-3.5">
          {/* Performance Insights */}
          <div
            className="bg-white rounded-[11px] p-3.5 flex-1 flex flex-col"
            style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <h3 className="text-[15px] font-medium text-[#0d1b2a] mb-3.5">
              Performance Insights
            </h3>

            {/* Rating Display */}
            <div className="flex items-center justify-center mb-3">
              <p className="text-[22px] font-medium text-[#2aae7a]">
                {stats.performance?.rating?.toFixed(1) || "N/A"}
              </p>
              {stats.performance?.rating && (
                <Star className="w-5 h-5 text-[#2aae7a] fill-[#2aae7a] ml-1" />
              )}
            </div>
            <p className="text-[12px] font-medium text-[#9c9c9c] text-center mb-4">
              Supplier Rating
            </p>

            {/* Metrics */}
            <div className="space-y-2 flex-grow flex flex-col justify-center">
              <div className="flex justify-between items-center">
                <span className="text-[12px] font-medium text-[#0d1b2a]">
                  Response Rate
                </span>
                <span className="text-[12px] font-medium text-[#2aae7a]">
                  {stats.performance?.responseRate
                    ? `${stats.performance.responseRate}%`
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] font-medium text-[#0d1b2a]">
                  On-Time Delivery
                </span>
                <span className="text-[12px] font-medium text-[#2aae7a]">
                  {stats.performance?.onTimeDelivery
                    ? `${stats.performance.onTimeDelivery}%`
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] font-medium text-[#0d1b2a]">
                  Quote Win Rate
                </span>
                <span className="text-[12px] font-medium text-[#2aae7a]">
                  {stats.performance?.quoteWinRate
                    ? `${stats.performance.quoteWinRate}%`
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Top RFQ Match */}
          <div
            className="bg-white rounded-[11px] p-3.5 flex-1 flex flex-col"
            style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <h3 className="text-[15px] font-medium text-[#0d1b2a] mb-3.5">
              Top RFQ Match
            </h3>
            {stats.rfqMatches && stats.rfqMatches.topMatch ? (
              <>
                <p className="text-[12px] font-medium text-[#0d1b2a] mb-[2px]">
                  {stats.rfqMatches.topMatch.title}
                </p>
                <p className="text-[11px] font-medium text-[#9c9c9c] mb-2">
                  {stats.rfqMatches.topMatch.matchPercentage}% Match
                </p>
                <p className="text-[15px] font-semibold text-black mb-3.5 flex-grow">
                  {formatCurrency(stats.rfqMatches.topMatch.estimatedValue)}
                </p>
                <Link
                  href="/supplier/rfq"
                  className="flex items-center justify-center gap-1.5 w-full h-[34px] bg-[#1e3a8a] text-white text-[10px] font-semibold rounded-[8px] hover:bg-[#1e40af] transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Quote
                </Link>
              </>
            ) : (
              <div className="text-center py-6 flex-grow flex flex-col items-center justify-center">
                <MessageSquarePlus className="w-7 h-7 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">No RFQ matches yet</p>
                <Link
                  href="/supplier/rfq"
                  className="inline-block px-2.5 py-1 bg-gray-900 text-white text-[10px] hover:bg-gray-800 rounded"
                >
                  Browse RFQs
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
