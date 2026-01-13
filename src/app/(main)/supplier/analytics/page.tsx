"use client";

import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Clock } from "lucide-react";
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
    <div className="min-h-screen bg-[#eefbf6]">
      <div className="w-full mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-9">
          <h1 className="text-3xl font-semibold text-[#0d1b2a]">Analytics</h1>
        </div>

        {/* Primary Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Total Revenue */}
          <div className="bg-white rounded-[15px] shadow-[0px_0px_4.5px_0px_rgba(24,181,34,0.25)] p-6 h-[208px] relative">
            <p className="text-lg font-medium text-[#9c9c9c] mb-12">
              Total Revenue
            </p>
            <p className="text-3xl font-semibold text-[#2aae7a] mb-6">
              ₹{(overview.total_revenue || 0).toLocaleString()}
            </p>
            <p className="text-sm font-medium text-[#9c9c9c]">
              via traditional procurement
            </p>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#eeffef] rounded-full p-4">
              <BarChart3 className="w-[38px] h-[38px] text-[#2aae7a]" />
            </div>
          </div>

          {/* Quote Win Rate / Response Rate */}
          <div className="bg-white rounded-[15px] shadow-[0px_0px_4.5px_0px_rgba(24,181,34,0.25)] p-6 h-[208px] relative">
            <p className="text-lg font-medium text-[#9c9c9c] mb-12">
              Quote Win Rate
            </p>
            <p className="text-3xl font-semibold text-[#a855f7] mb-6">
              {(overview.response_rate || 0).toFixed(1)}%
            </p>
            <p className="text-sm font-medium text-[#9c9c9c]">
              via traditional procurement
            </p>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#f3e8ff] rounded-full p-4">
              <TrendingUp className="w-[38px] h-[38px] text-[#a855f7]" />
            </div>
          </div>

          {/* Avg Response Time */}
          <div className="bg-white rounded-[15px] shadow-[0px_0px_4.5px_0px_rgba(24,181,34,0.25)] p-6 h-[208px] relative">
            <p className="text-lg font-medium text-[#9c9c9c] mb-12">
              Avg. Response Time
            </p>
            <p className="text-3xl font-semibold text-[#3b82f6] mb-6">
              {(overview.avg_response_hours || 0).toFixed(1)}h
            </p>
            <p className="text-sm font-medium text-[#9c9c9c]">
              via traditional procurement
            </p>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#dbeafe] rounded-full p-4">
              <Clock className="w-[38px] h-[38px] text-[#3b82f6]" />
            </div>
          </div>
        </div>

        {/* Sales by Category Chart */}
        <div className="bg-white rounded-[15px] shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)] p-6 w-3/4">
          <h2 className="text-2xl font-medium text-[#0d1b2a] mb-9">
            Sales by Category
          </h2>

          {salesByCategory.length > 0 ? (
            <div className="space-y-6">
              {salesByCategory.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-[195px]">
                    <p className="text-lg font-medium text-[#9c9c9c]">
                      {item.category}
                    </p>
                  </div>
                  <div className="flex-1 relative">
                    <div className="bg-[#eee] h-[6px] rounded-lg w-full" />
                    <div
                      className="absolute top-0 left-0 bg-[#2aae7a] h-[6px] rounded-lg"
                      style={{
                        width: `${(item.revenue / maxCategoryValue) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="w-[90px] text-right">
                    <p className="text-lg font-semibold text-[#0d1b2a]">
                      ₹{(item.revenue || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-9 text-[#9c9c9c]">
              <p className="text-lg">No category data available yet</p>
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
