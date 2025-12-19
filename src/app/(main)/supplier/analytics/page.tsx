"use client";

import { useEffect, useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Clock,
  Users,
  Eye,
  MessageSquare,
  Star,
} from "lucide-react";
import { supplierService } from "@/services/supplier.service";
import { useAuth } from "@/contexts/AuthContext";

interface AnalyticsData {
  overview: {
    active_listings: number;
    total_views: number;
    total_watchers: number;
    total_inquiries: number;
    avg_rating: number;
    new_listings: number;
    total_orders: number;
    total_revenue: number;
    revenue_this_month: number;
    revenue_growth: number;
    avg_response_hours: number;
    response_rate: number;
  };
  salesByCategory: Array<{
    category: string;
    listing_count: number;
    total_views: number;
    revenue: number;
  }>;
  performanceMetrics: Array<{
    date: string;
    listings_added: number;
    total_views: number;
    total_watchers: number;
  }>;
  topProducts: Array<{
    id: string;
    title: string;
    image_url: string;
    price_after: number;
    views_count: number;
    watchers_count: number;
    inquiries_count: number;
    rating: number;
    review_count: number;
  }>;
  period: number;
}

export default function SupplierAnalytics() {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await supplierService.getAnalytics({ period: 30 });
      if (response.success && response.data) {
        setAnalyticsData(response.data);
      } else {
        setError(response.message || "Failed to fetch analytics data");
      }
    } catch (err: any) {
      console.error("Error fetching analytics:", err);
      setError(err.message || "An error occurred while fetching analytics");
    } finally {
      setLoading(false);
    }
  };

  // Role check
  if (user && user.activeRole !== "supplier") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 border-2 border-red-600 mx-auto flex items-center justify-center mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Access Restricted
            </h2>
            <p className="text-gray-600 mb-6">
              You need to be in supplier mode to view analytics. Your current
              role is: <strong>{user.activeRole}</strong>
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => (window.location.href = "/supplier")}
              className="w-full px-6 py-3 bg-gray-900 text-white font-semibold border-2 border-gray-900 hover:bg-gray-800 transition-colors"
            >
              Switch to Supplier Mode
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full px-6 py-3 bg-white text-gray-900 font-semibold border-2 border-gray-900 hover:bg-gray-50 transition-colors"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 border-2 border-red-600 mx-auto flex items-center justify-center mb-4">
              <span className="text-3xl">❌</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
          </div>
          <button
            onClick={fetchAnalytics}
            className="px-6 py-3 bg-gray-900 text-white font-semibold border-2 border-gray-900 hover:bg-gray-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return null;
  }

  const { overview, salesByCategory } = analyticsData;
  const maxCategoryValue = Math.max(
    ...salesByCategory.map((d) => d.revenue),
    1
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-sm text-gray-600">
            Track your performance metrics and insights (Last 30 days)
          </p>
        </div>

        {/* Primary Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Revenue */}
          <div className="bg-white border-2 border-gray-900 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-100 border-2 border-gray-900 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">
                  ₹{(overview.total_revenue || 0).toLocaleString()}
                </p>
              </div>
            </div>
            <p
              className={`text-xs font-medium ${
                (overview.revenue_growth || 0) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {(overview.revenue_growth || 0) >= 0 ? "+" : ""}
              {(overview.revenue_growth || 0).toFixed(1)}% from last month
            </p>
          </div>

          {/* Response Rate (Win Rate equivalent) */}
          <div className="bg-white border-2 border-gray-900 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-100 border-2 border-gray-900 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Response Rate</p>
                <p className="text-3xl font-bold text-gray-900">
                  {(overview.response_rate || 0).toFixed(1)}%
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-600 font-medium">
              {overview.total_inquiries || 0} total inquiries
            </p>
          </div>

          {/* Avg Response Time */}
          <div className="bg-white border-2 border-gray-900 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-100 border-2 border-gray-900 flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Avg. Response Time</p>
                <p className="text-3xl font-bold text-gray-900">
                  {(overview.avg_response_hours || 0).toFixed(1)} hrs
                </p>
              </div>
            </div>
            <p className="text-xs text-green-600 font-medium">
              Faster is better
            </p>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Active Listings */}
          <div className="bg-white border-2 border-gray-900 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-gray-600" />
              <p className="text-xs text-gray-600">Active Listings</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {overview.active_listings || 0}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              +{overview.new_listings || 0} new this month
            </p>
          </div>

          {/* Total Views */}
          <div className="bg-white border-2 border-gray-900 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-5 h-5 text-gray-600" />
              <p className="text-xs text-gray-600">Total Views</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {(overview.total_views || 0).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">Product impressions</p>
          </div>

          {/* Total Inquiries */}
          <div className="bg-white border-2 border-gray-900 p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-gray-600" />
              <p className="text-xs text-gray-600">Total Inquiries</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {overview.total_inquiries || 0}
            </p>
            <p className="text-xs text-gray-500 mt-1">Customer requests</p>
          </div>

          {/* Average Rating */}
          <div className="bg-white border-2 border-gray-900 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-gray-600" />
              <p className="text-xs text-gray-600">Avg. Rating</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {overview.avg_rating ? overview.avg_rating.toFixed(1) : "N/A"}
            </p>
            <p className="text-xs text-gray-500 mt-1">Customer satisfaction</p>
          </div>
        </div>

        {/* Sales by Category Chart */}
        <div className="bg-white border-2 border-gray-900 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Revenue by Category (Top 10)
          </h2>

          {salesByCategory.length > 0 ? (
            <div className="space-y-6">
              {salesByCategory.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        ({item.listing_count} listings, {item.total_views}{" "}
                        views)
                      </span>
                    </div>
                    <span className="text-sm font-bold text-green-600">
                      +₹{(item.revenue || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="relative w-full h-8 bg-gray-100 border-2 border-gray-900">
                    <div
                      className="absolute left-0 top-0 h-full bg-blue-600 border-r-2 border-gray-900"
                      style={{
                        width: `${(item.revenue / maxCategoryValue) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No category data available yet</p>
              <p className="text-sm mt-2">
                Start selling to see your performance by category
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
