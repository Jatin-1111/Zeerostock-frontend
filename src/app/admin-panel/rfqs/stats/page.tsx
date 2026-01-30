"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, TrendingUp, Package, Layers } from "lucide-react";
import { AdminLayout, PageHeader } from "@/components/admin-panel";
import { useRouter } from "next/navigation";
import adminService, { RFQStats } from "@/services/admin.service";

export default function AdminRFQStatsPage() {
  const router = useRouter();
  const [stats, setStats] = useState<RFQStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await adminService.getRFQStats();

      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (err: any) {
      console.error("Error fetching RFQ stats:", err);
      setError(err.message || "Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="text-center py-12">Loading statistics...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !stats) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="text-center py-12 text-red-600">
            {error || "Failed to load statistics"}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <button
            onClick={() => router.push("/admin-panel/rfqs")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to RFQs
          </button>
          <PageHeader
            title="RFQ Market Demand Analytics"
            description="Analyze buyer demand by industry and category to identify supplier opportunities"
          />
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div className="text-sm text-gray-600">Total RFQs</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {stats.overall.total}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-3 mb-2">
              <Package className="h-5 w-5 text-green-600" />
              <div className="text-sm text-gray-600">Active RFQs</div>
            </div>
            <div className="text-3xl font-bold text-green-600">
              {stats.overall.active}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-3 mb-2">
              <Layers className="h-5 w-5 text-gray-600" />
              <div className="text-sm text-gray-600">Closed RFQs</div>
            </div>
            <div className="text-3xl font-bold text-gray-600">
              {stats.overall.closed}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-3 mb-2">
              <Layers className="h-5 w-5 text-red-600" />
              <div className="text-sm text-gray-600">Expired RFQs</div>
            </div>
            <div className="text-3xl font-bold text-red-600">
              {stats.overall.expired}
            </div>
          </div>
        </div>

        {/* Industry & Category Breakdown */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Demand by Industry & Category
          </h2>
          <div className="text-sm text-gray-600 mb-4">
            This table shows the number of RFQs, average quantity requested, and
            total demand by industry and category. Use this to identify which
            supplier categories need more capacity.
          </div>

          {stats.byIndustry.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No RFQ data available yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Industry
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total RFQs
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg Quantity
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Quantity Requested
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Demand Level
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.byIndustry
                    .sort((a, b) => Number(b.totalRFQs) - Number(a.totalRFQs))
                    .map((item, index) => {
                      const totalRFQs = Number(item.totalRFQs);
                      const demandLevel =
                        totalRFQs > 10
                          ? "High"
                          : totalRFQs > 5
                            ? "Medium"
                            : "Low";
                      const demandColor =
                        demandLevel === "High"
                          ? "text-red-600 bg-red-50"
                          : demandLevel === "Medium"
                            ? "text-yellow-600 bg-yellow-50"
                            : "text-green-600 bg-green-50";

                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {item.industry?.name || "Unknown"}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {item.category?.name || "Unknown"}
                          </td>
                          <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900">
                            {totalRFQs}
                          </td>
                          <td className="px-6 py-4 text-sm text-right text-gray-900">
                            {Number(item.avgQuantity).toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">
                            {Number(item.totalQuantity).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`px-3 py-1 text-xs font-semibold rounded-full ${demandColor}`}
                            >
                              {demandLevel}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Insights */}
        <div className="mt-6 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            💡 Key Insights & Recommendations
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              • <strong>High Demand Categories:</strong> Industries/categories
              with 10+ RFQs indicate strong buyer demand. Prioritize supplier
              onboarding in these areas.
            </li>
            <li>
              • <strong>Supply Gap Analysis:</strong> Compare total quantity
              requested against current supplier capacity to identify gaps.
            </li>
            <li>
              • <strong>Expired RFQs:</strong> {stats.overall.expired} expired
              RFQs suggest buyers couldn't find suitable suppliers - opportunity
              to expand supplier network.
            </li>
            <li>
              • <strong>Active RFQs:</strong> {stats.overall.active} active
              requests represent current unmet demand requiring immediate
              supplier matching.
            </li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
