"use client";

import { useState, useEffect } from "react";
import { Search, Eye, Filter, TrendingUp } from "lucide-react";
import { AdminLayout, PageHeader } from "@/components/admin-panel";
import { useRouter } from "next/navigation";
import adminService, { RFQ } from "@/services/admin.service";

export default function AdminRFQsPage() {
  const router = useRouter();
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRFQs, setTotalRFQs] = useState(0);

  useEffect(() => {
    fetchRFQs();
  }, [statusFilter, currentPage]);

  const fetchRFQs = async () => {
    try {
      setLoading(true);
      setError("");

      const params: any = {
        page: currentPage,
        limit: 20,
        sortBy: "createdAt",
        sortOrder: "DESC",
      };

      if (statusFilter !== "all") {
        params.status = statusFilter;
      }

      const response = await adminService.getRFQs(params);

      if (response.success && response.data) {
        setRfqs(response.data.rfqs);
        setTotalPages(response.data.pagination.totalPages);
        setTotalRFQs(response.data.pagination.total);
      }
    } catch (err: any) {
      console.error("Error fetching RFQs:", err);
      setError(err.message || "Failed to load RFQs");
    } finally {
      setLoading(false);
    }
  };

  const filteredRFQs = rfqs.filter((rfq) => {
    const matchesSearch =
      searchTerm === "" ||
      rfq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rfq.rfqNumber.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "fulfilled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <PageHeader
          title="Market Demand Analysis - RFQs"
          description="View buyer requests to identify market demand and supplier opportunities"
        />

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Total RFQs</div>
            <div className="text-2xl font-bold text-gray-900">{totalRFQs}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Active RFQs</div>
            <div className="text-2xl font-bold text-green-600">
              {rfqs.filter((r) => r.status === "active").length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Closed</div>
            <div className="text-2xl font-bold text-gray-600">
              {rfqs.filter((r) => r.status === "closed").length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Expired</div>
            <div className="text-2xl font-bold text-red-600">
              {rfqs.filter((r) => r.status === "expired").length}
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by title, RFQ number, or buyer company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
                <option value="expired">Expired</option>
                <option value="fulfilled">Fulfilled</option>
              </select>
              <button
                onClick={() => router.push("/admin-panel/rfqs/stats")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <TrendingUp className="h-4 w-4" />
                View Analytics
              </button>
            </div>
          </div>
        </div>

        {/* RFQ Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading RFQs...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-600">{error}</div>
          ) : filteredRFQs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No RFQs found</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        RFQ Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Buyer Info
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Industry / Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRFQs.map((rfq) => (
                      <tr key={rfq.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          {rfq.rfqNumber}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {rfq.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="text-gray-500 italic">
                            View detail page
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div>{rfq.industryName || "N/A"}</div>
                          <div className="text-xs text-gray-500">
                            {rfq.categoryName || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {rfq.quantity} {rfq.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              rfq.status,
                            )}`}
                          >
                            {rfq.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(rfq.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() =>
                              router.push(`/admin-panel/rfqs/${rfq.id}`)
                            }
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
