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
    <div className="min-h-screen bg-[#EEFBF6]">
      <div className="max-w-[1300px] mx-auto py-12">
        <div className="flex justify-between">
          {/* Welcome Header */}
          <div className="mb-[18px]">
            <h1 className="text-[27px] font-semibold text-[#0d1b2a] mb-[6px]">
              Welcome Back, {user?.companyName || user?.firstName}
            </h1>
            <p className="text-lg font-medium text-[#9c9c9c]">
              Here&apos;s your business overview
            </p>
          </div>

          {/* Add Product Button */}
          <div className="mb-6">
            <Link
              href="/supplier/inventory"
              className="inline-flex items-center gap-2 px-4 py-[11px] bg-[#2aae7a] text-white text-base font-semibold rounded-[11px] hover:bg-[#25996b] transition-colors"
            >
              <Plus className="w-[18px] h-[18px]" />
              Add Product
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[18px] mb-6">
          {/* Active Listings */}
          <div
            className="bg-white rounded-[15px] p-[18px] relative overflow-hidden"
            style={{ boxShadow: "0px 0px 6px 0px rgba(24, 181, 34, 0.25)" }}
          >
            <p className="text-base font-medium text-[#9c9c9c] mb-[6px]">
              Active Listings
            </p>
            <p className="text-2xl font-semibold text-[#0d1b2a] mb-[6px]">
              {stats.listings.active_listings}
            </p>
            <p className="text-xs font-medium text-[#9c9c9c]">
              {formatNumber(stats.listings.total_views)} total views
            </p>
            <div className="absolute right-[18px] top-1/2 -translate-y-1/2 w-[44px] h-[44px] flex items-center justify-center">
              <Package className="w-6 h-6 text-[#2aae7a]" strokeWidth={1.5} />
            </div>
          </div>

          {/* RFQ Matches */}
          <div
            className="bg-white rounded-[15px] p-[18px] relative overflow-hidden"
            style={{ boxShadow: "0px 0px 6px 0px rgba(24, 181, 34, 0.25)" }}
          >
            <p className="text-base font-medium text-[#9c9c9c] mb-[6px]">
              RFQ Matches
            </p>
            <p className="text-2xl font-semibold text-[#0d1b2a] mb-[6px]">5</p>
            <p className="text-xs font-medium text-[#9c9c9c]">Processing</p>
            <div className="absolute right-[18px] top-1/2 -translate-y-1/2 w-[45px] h-[45px] bg-[#dbeafe] rounded-full flex items-center justify-center">
              <MessageSquarePlus
                className="w-[23px] h-[23px] text-[#3b82f6]"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Monthly Revenue */}
          <div
            className="bg-white rounded-[15px] p-[18px] relative overflow-hidden"
            style={{ boxShadow: "0px 0px 6px 0px rgba(24, 181, 34, 0.25)" }}
          >
            <p className="text-base font-medium text-[#9c9c9c] mb-[6px]">
              Monthly Revenue
            </p>
            <p className="text-2xl font-semibold text-[#2aae7a] mb-[6px]">
              {formatCurrency(stats.orders.revenue_this_month)}
            </p>
            <p className="text-xs font-medium text-[#2aae7a]">
              +12% from last month
            </p>
            <div className="absolute right-[18px] top-1/2 -translate-y-1/2 w-[45px] h-[45px] bg-[#eeffef] rounded-full flex items-center justify-center">
              <TrendingUp
                className="w-[23px] h-[23px] text-[#2aae7a]"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Pending Orders */}
          <div
            className="bg-white rounded-[15px] p-[18px] relative overflow-hidden"
            style={{ boxShadow: "0px 0px 6px 0px rgba(24, 181, 34, 0.25)" }}
          >
            <p className="text-base font-medium text-[#9c9c9c] mb-[6px]">
              Pending Orders
            </p>
            <p className="text-2xl font-semibold text-[#eab308] mb-[6px]">
              {stats.orders.pending_orders}
            </p>
            <p className="text-xs font-medium text-[#9c9c9c]">Last 30 days</p>
            <div className="absolute right-[18px] top-1/2 -translate-y-1/2 w-[45px] h-[45px] bg-[#fef9c3] rounded-full flex items-center justify-center">
              <Clock
                className="w-[23px] h-[23px] text-[#eab308]"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
          {/* Active Listings Performance */}
          <div
            className="bg-white rounded-[15px] p-[18px]"
            style={{ boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <h2 className="text-lg font-medium text-[#0d1b2a] mb-6">
              Active Listings Performance
            </h2>

            {stats.recentActivity.length === 0 ? (
              <div className="text-center py-9">
                <Package className="w-9 h-9 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-3">No listings yet</p>
                <Link
                  href="/supplier/inventory"
                  className="px-3 py-[6px] bg-gray-900 text-white text-xs hover:bg-gray-800"
                >
                  Create Your First Listing
                </Link>
              </div>
            ) : (
              <div className="space-y-[18px]">
                {stats.recentActivity.slice(0, 3).map((listing) => (
                  <div
                    key={listing.id}
                    className="bg-[#fbfbfb] rounded-[15px] p-3 flex items-center gap-3 relative"
                    style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
                  >
                    <div className="w-[121px] h-[91px] bg-gray-200 rounded-[8px] flex items-center justify-center shrink-0 overflow-hidden">
                      {listing.image_url ? (
                        <img
                          src={listing.image_url}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-[9px]">
                          No Image
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[17px] font-medium text-black mb-[6px] line-clamp-1">
                        {listing.title}
                      </h3>
                      <div className="flex items-center gap-[6px] mb-[9px]">
                        <span className="bg-[#eeffef] px-[9px] py-[3px] rounded-full text-[11px] font-medium text-[#2aae7a]">
                          Electronics
                        </span>
                        <span className="bg-[#eeffef] px-[9px] py-[3px] rounded-full text-[11px] font-medium text-[#2aae7a]">
                          Active
                        </span>
                      </div>
                      <div className="flex items-center gap-[18px] text-sm text-[#9c9c9c]">
                        <span className="font-medium">
                          {listing.views_count} Views
                        </span>
                        <span className="font-medium">
                          {listing.watchers_count} Watching
                        </span>
                        <span className="font-medium">12 Bids</span>
                      </div>
                    </div>
                    <div className="text-right self-start pt-[6px]">
                      <p className="text-[23px] font-semibold text-black mb-[6px]">
                        {formatCurrency(listing.price_after)}
                      </p>
                      <p className="text-base font-medium text-[#9c9c9c] mb-6">
                        600 units
                      </p>
                      <div className="flex items-center gap-[6px] text-[17px] text-[#0d1b2a]">
                        <Clock className="w-[18px] h-[18px]" />
                        <span className="font-medium">3d 14h</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-[18px]">
            {/* Performance Insights */}
            <div
              className="bg-white rounded-[15px] p-[18px]"
              style={{ boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.25)" }}
            >
              <h3 className="text-lg font-medium text-[#0d1b2a] mb-[18px]">
                Performance Insights
              </h3>

              {/* Rating Display */}
              <div className="flex items-center justify-center mb-[18px]">
                <p className="text-[29px] font-medium text-[#2aae7a]">4.8</p>
                <Star className="w-7 h-7 text-[#2aae7a] fill-[#2aae7a] ml-[6px]" />
              </div>
              <p className="text-base font-medium text-[#9c9c9c] text-center mb-6">
                Supplier Rating
              </p>

              {/* Metrics */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium text-[#0d1b2a]">
                    Response Rate
                  </span>
                  <span className="text-base font-medium text-[#2aae7a]">
                    98%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium text-[#0d1b2a]">
                    On-Time Delivery
                  </span>
                  <span className="text-base font-medium text-[#2aae7a]">
                    96%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium text-[#0d1b2a]">
                    Quote Win Rate
                  </span>
                  <span className="text-base font-medium text-[#2aae7a]">
                    36%
                  </span>
                </div>
              </div>
            </div>

            {/* Top RFQ Match */}
            <div
              className="bg-white rounded-[15px] p-[18px]"
              style={{ boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.25)" }}
            >
              <h3 className="text-lg font-medium text-[#0d1b2a] mb-[18px]">
                Top RFQ Match
              </h3>
              <p className="text-base font-medium text-[#0d1b2a] mb-[3px]">
                Industrial Electronic
              </p>
              <p className="text-sm font-medium text-[#9c9c9c] mb-3">
                95% Match
              </p>
              <p className="text-lg font-semibold text-black mb-[18px]">
                ₹180,000
              </p>
              <Link
                href="/supplier/rfq"
                className="flex items-center justify-center gap-2 w-full py-[11px] bg-[#1e3a8a] text-white text-xs font-semibold rounded-lg hover:bg-[#1e40af] transition-colors"
              >
                <Send className="w-4 h-4" />
                Submit Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
