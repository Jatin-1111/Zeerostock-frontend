"use client";

import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Clock } from "lucide-react";
import { supplierService } from "@/services/supplier.service";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/utils/currency.utils";

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
  const { user, currency } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null,
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
        <div className="text-center max-w-md mx-auto p-4 sm:p-8">
          <div className="mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 border-2 border-red-600 mx-auto flex items-center justify-center mb-3 sm:mb-4">
              <span className="text-2xl sm:text-3xl">⚠️</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Access Restricted
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              You need to be in supplier mode to view analytics. Your current
              role is: <strong>{user.activeRole}</strong>
            </p>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <button
              onClick={() => (window.location.href = "/supplier")}
              className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 text-white text-sm sm:text-base font-semibold border-2 border-gray-900 hover:bg-gray-800 transition-colors"
            >
              Switch to Supplier Mode
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-white text-gray-900 text-sm sm:text-base font-semibold border-2 border-gray-900 hover:bg-gray-50 transition-colors"
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
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
          <p className="text-sm sm:text-base text-gray-600">
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-4 sm:p-8">
          <div className="mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 border-2 border-red-600 mx-auto flex items-center justify-center mb-3 sm:mb-4">
              <span className="text-2xl sm:text-3xl">❌</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Error
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              {error}
            </p>
          </div>
          <button
            onClick={fetchAnalytics}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 text-white text-sm sm:text-base font-semibold border-2 border-gray-900 hover:bg-gray-800 transition-colors"
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
    1,
  );

  return (
    <div className="min-h-screen bg-[#eefbf6]">
      <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-4 py-4 sm:py-5 md:py-6 lg:py-4">
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-9 lg:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-2xl font-semibold text-[#0d1b2a]">
            Analytics
          </h1>
        </div>

        {/* Primary Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-3 mb-4 sm:mb-5 md:mb-6 lg:mb-4">
          {/* Total Revenue */}
          <div className="bg-white rounded-[15px] lg:rounded-[10px] shadow-[0px_0px_4.5px_0px_rgba(24,181,34,0.25)] lg:shadow-[0px_0px_3px_0px_rgba(24,181,34,0.25)] p-4 sm:p-5 md:p-6 lg:p-4 h-[180px] sm:h-[195px] md:h-[208px] lg:h-[139px] relative">
            <p className="text-base sm:text-lg lg:text-xs font-medium text-[#9c9c9c] mb-8 sm:mb-10 md:mb-12 lg:mb-8">
              Total Revenue
            </p>
            <p className="text-2xl sm:text-3xl md:text-[34px] lg:text-[23px] font-semibold text-[#2aae7a] mb-4 sm:mb-5 md:mb-6 lg:mb-4">
              {formatPrice(overview.total_revenue || 0, currency)}
            </p>
            <p className="text-xs sm:text-sm lg:text-[9px] font-medium text-[#9c9c9c]">
              via traditional procurement
            </p>
            <div className="absolute right-4 sm:right-5 md:right-6 lg:right-4 top-1/2 -translate-y-1/2 bg-[#eeffef] rounded-full p-3 sm:p-3.5 md:p-4 lg:p-[11px]">
              <BarChart3 className="w-8 h-8 sm:w-9 sm:h-9 md:w-[38px] md:h-[38px] lg:w-[25px] lg:h-[25px] text-[#2aae7a]" />
            </div>
          </div>

          {/* Quote Win Rate / Response Rate */}
          <div className="bg-white rounded-[15px] lg:rounded-[10px] shadow-[0px_0px_4.5px_0px_rgba(24,181,34,0.25)] lg:shadow-[0px_0px_3px_0px_rgba(24,181,34,0.25)] p-4 sm:p-5 md:p-6 lg:p-4 h-[180px] sm:h-[195px] md:h-[208px] lg:h-[139px] relative">
            <p className="text-base sm:text-lg lg:text-xs font-medium text-[#9c9c9c] mb-8 sm:mb-10 md:mb-12 lg:mb-8">
              Quote Win Rate
            </p>
            <p className="text-2xl sm:text-3xl md:text-[34px] lg:text-[23px] font-semibold text-[#a855f7] mb-4 sm:mb-5 md:mb-6 lg:mb-4">
              {(overview.response_rate || 0).toFixed(1)}%
            </p>
            <p className="text-xs sm:text-sm lg:text-[9px] font-medium text-[#9c9c9c]">
              via traditional procurement
            </p>
            <div className="absolute right-4 sm:right-5 md:right-6 lg:right-4 top-1/2 -translate-y-1/2 bg-[#f3e8ff] rounded-full p-3 sm:p-3.5 md:p-4 lg:p-[11px]">
              <TrendingUp className="w-8 h-8 sm:w-9 sm:h-9 md:w-[38px] md:h-[38px] lg:w-[25px] lg:h-[25px] text-[#a855f7]" />
            </div>
          </div>

          {/* Avg Response Time */}
          <div className="bg-white rounded-[15px] lg:rounded-[10px] shadow-[0px_0px_4.5px_0px_rgba(24,181,34,0.25)] lg:shadow-[0px_0px_3px_0px_rgba(24,181,34,0.25)] p-4 sm:p-5 md:p-6 lg:p-4 h-[180px] sm:h-[195px] md:h-[208px] lg:h-[139px] relative">
            <p className="text-base sm:text-lg lg:text-xs font-medium text-[#9c9c9c] mb-8 sm:mb-10 md:mb-12 lg:mb-8">
              Avg. Response Time
            </p>
            <p className="text-2xl sm:text-3xl md:text-[34px] lg:text-[23px] font-semibold text-[#3b82f6] mb-4 sm:mb-5 md:mb-6 lg:mb-4">
              {(overview.avg_response_hours || 0).toFixed(1)}h
            </p>
            <p className="text-xs sm:text-sm lg:text-[9px] font-medium text-[#9c9c9c]">
              via traditional procurement
            </p>
            <div className="absolute right-4 sm:right-5 md:right-6 lg:right-4 top-1/2 -translate-y-1/2 bg-[#dbeafe] rounded-full p-3 sm:p-3.5 md:p-4 lg:p-[11px]">
              <Clock className="w-8 h-8 sm:w-9 sm:h-9 md:w-[38px] md:h-[38px] lg:w-[25px] lg:h-[25px] text-[#3b82f6]" />
            </div>
          </div>
        </div>

        {/* Sales by Category Chart */}
        <div className="bg-white rounded-[15px] lg:rounded-[10px] shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)] lg:shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] p-4 sm:p-5 md:p-6 lg:p-4 w-full lg:w-1/2">
          <h2 className="text-lg sm:text-xl md:text-[21px] lg:text-sm font-medium text-[#0d1b2a] mb-6 sm:mb-8 md:mb-9 lg:mb-6">
            Sales by Category
          </h2>

          {salesByCategory.length > 0 ? (
            <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-4">
              {salesByCategory.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-4 lg:gap-[11px]"
                >
                  <div className="w-full sm:w-[150px] md:w-[195px] lg:w-[130px]">
                    <p className="text-base sm:text-lg lg:text-xs font-medium text-[#9c9c9c]">
                      {item.category}
                    </p>
                  </div>
                  <div className="flex-1 relative">
                    <div className="bg-[#eee] h-[6px] lg:h-[4px] rounded-lg w-full" />
                    <div
                      className="absolute top-0 left-0 bg-[#2aae7a] h-[6px] lg:h-[4px] rounded-lg"
                      style={{
                        width: `${(item.revenue / maxCategoryValue) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="w-full sm:w-[80px] md:w-[90px] lg:w-[60px] text-left sm:text-right">
                    <p className="text-base sm:text-lg lg:text-xs font-semibold text-[#0d1b2a]">
                      {formatPrice(item.revenue || 0, currency)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8 md:py-9 lg:py-6 text-[#9c9c9c]">
              <p className="text-base sm:text-lg lg:text-xs">
                No category data available yet
              </p>
              <p className="text-xs sm:text-sm lg:text-[9px] mt-2">
                Start selling to see your performance by category
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
