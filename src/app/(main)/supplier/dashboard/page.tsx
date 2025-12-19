"use client";

import { useEffect, useState } from "react";
import {
  Package,
  Target,
  TrendingUp,
  Clock,
  Plus,
  FileText,
  DollarSign,
  Eye,
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
      <div className="min-h-screen bg-white flex items-center justify-center">
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
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto p-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.companyName || user?.firstName}
          </h1>
          <p className="text-sm text-gray-600">
            Here&apos;s your business overview
          </p>
          <p className="text-xs text-gray-500 mt-1">Last refreshed just now</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Link
            href="/supplier/inventory"
            className="px-6 py-3 bg-green-600 text-white text-sm font-medium flex items-center gap-2 hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
          <Link
            href="/supplier/rfq"
            className="px-6 py-3 bg-white border-2 border-gray-900 text-gray-900 text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Browse RFQs
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Active Listings */}
          <div className="bg-white border-2 border-gray-900 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 border-2 border-gray-900 flex items-center justify-center">
                  <Package className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Active Listings</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.listings.active_listings}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-blue-600">
              {formatNumber(stats.listings.total_views)} total views
            </p>
          </div>

          {/* Total Orders */}
          <div className="bg-white border-2 border-gray-900 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 border-2 border-gray-900 flex items-center justify-center">
                  <Target className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.orders.total_orders}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-blue-600">
              {stats.orders.delivered_orders} delivered
            </p>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-white border-2 border-gray-900 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 border-2 border-gray-900 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">This Month</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(stats.orders.revenue_this_month)}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Total: {formatCurrency(stats.orders.total_revenue)}
            </p>
          </div>

          {/* Pending Orders */}
          <div className="bg-white border-2 border-gray-900 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 border-2 border-gray-900 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Pending Orders</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.orders.pending_orders}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-blue-600">
              {stats.orders.processing_orders} processing
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white border-2 border-gray-900 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Recent Listings
              </h2>
              <Link
                href="/supplier/listings"
                className="text-xs text-blue-600 hover:underline"
              >
                View All
              </Link>
            </div>

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
              <div className="space-y-4">
                {stats.recentActivity.map((listing) => (
                  <div
                    key={listing.id}
                    className="flex items-center gap-4 p-4 border-2 border-gray-900"
                  >
                    <div className="w-24 h-24 bg-gray-200 border-2 border-gray-900 flex items-center justify-center shrink-0 overflow-hidden">
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
                      <h3 className="text-sm font-bold text-blue-600 mb-1 line-clamp-1">
                        {listing.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        Listed{" "}
                        {new Date(listing.created_at).toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {listing.views_count} Views
                        </span>
                        <span>{listing.watchers_count} Watching</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 mb-1">
                        {formatCurrency(listing.price_after)}
                      </p>
                      <Link
                        href={`/supplier/listings/${listing.id}/edit`}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white border-2 border-gray-900 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Total Listings</span>
                  <span className="text-xs font-bold text-gray-900">
                    {stats.listings.total_listings}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Sold Listings</span>
                  <span className="text-xs font-bold text-green-600">
                    {stats.listings.sold_listings}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Total Watchers</span>
                  <span className="text-xs font-bold text-blue-600">
                    {stats.listings.total_watchers}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Inquiries</span>
                  <span className="text-xs font-bold text-purple-600">
                    {stats.listings.total_inquiries}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border-2 border-gray-900 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Link
                  href="/supplier/listings"
                  className="block w-full py-2 px-4 text-sm border-2 border-gray-900 hover:bg-gray-100 transition-colors text-center"
                >
                  Manage Listings
                </Link>
                <Link
                  href="/supplier/orders"
                  className="block w-full py-2 px-4 text-sm border-2 border-gray-900 hover:bg-gray-100 transition-colors text-center"
                >
                  View Orders
                </Link>
                <Link
                  href="/supplier/analytics"
                  className="block w-full py-2 px-4 text-sm bg-gray-900 text-white hover:bg-gray-800 transition-colors text-center"
                >
                  View Analytics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
