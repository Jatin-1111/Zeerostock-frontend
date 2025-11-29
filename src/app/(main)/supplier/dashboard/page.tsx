"use client";

import {
  Package,
  Target,
  TrendingUp,
  Clock,
  Plus,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default function SupplierDashboard() {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto p-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Sarah&apos;s Manufacturing
          </h1>
          <p className="text-sm text-gray-600">
            Here&apos;s your business overview
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Last refreshed 45 minutes ago
          </p>
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
                  <p className="text-3xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-blue-600">2773 total views</p>
          </div>

          {/* RFQ Matches */}
          <div className="bg-white border-2 border-gray-900 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 border-2 border-gray-900 flex items-center justify-center">
                  <Target className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">RFQ Matches</p>
                  <p className="text-3xl font-bold text-gray-900">1</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-blue-600">1 match matches</p>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-white border-2 border-gray-900 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 border-2 border-gray-900 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">₹85,570</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-green-600 font-medium">
              +12% from last month
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
                  <p className="text-3xl font-bold text-gray-900">2</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-blue-600">1 shipping today</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Listings Performance */}
          <div className="lg:col-span-2 bg-white border-2 border-gray-900 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Active Listings Performance
              </h2>
              <p className="text-xs text-gray-600">
                Views of active, online, financial and organic
              </p>
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 p-4 border-2 border-gray-900"
                >
                  <div className="w-24 h-24 bg-gray-200 border-2 border-gray-900 flex items-center justify-center shrink-0">
                    <span className="text-gray-400 text-xs">Product Image</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-blue-600 mb-1">
                      Industrial Electronics Components
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">
                      Electronics • Active
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>12 Views</span>
                      <span>14 Watching</span>
                      <span>12 Bids</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900 mb-1">
                      ₹200000
                    </p>
                    <p className="text-xs text-gray-600">500 units</p>
                    <p className="text-xs text-gray-600">₹234.91</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Performance Insights */}
            <div className="bg-white border-2 border-gray-900 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Performance Insights
              </h3>
              <div className="text-center mb-4">
                <p className="text-4xl font-bold text-green-600 mb-2">4.8 ⭐</p>
                <p className="text-xs text-gray-600">Supplier Rating</p>
              </div>
              <div className="space-y-3 border-t-2 border-gray-900 pt-4">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Response Rate</span>
                  <span className="text-xs font-bold text-green-600">98%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">
                    On-Time Delivery
                  </span>
                  <span className="text-xs font-bold text-green-600">96%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Quote Win Rate</span>
                  <span className="text-xs font-bold text-green-600">34%</span>
                </div>
              </div>
            </div>

            {/* Top RFQ Match */}
            <div className="bg-white border-2 border-gray-900 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Top RFQ Match
              </h3>
              <div className="mb-4">
                <h4 className="text-sm font-bold text-blue-600 mb-1">
                  Industrial Electronic
                </h4>
                <p className="text-xs text-gray-600 mb-2">14% Match</p>
                <p className="text-lg font-bold text-gray-900">₹ 180000</p>
              </div>
              <Link
                href="/supplier/rfq"
                className="w-full py-2 bg-gray-900 text-white text-sm font-medium flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                Submit Quote
              </Link>
            </div>

            {/* Sponsored Ad */}
            <div className="bg-gray-100 border-2 border-gray-900 p-6">
              <p className="text-xs text-gray-600 mb-2">Sponsored Ads</p>
              <p className="text-sm font-bold text-gray-900">
                Promoted ads showcased
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
