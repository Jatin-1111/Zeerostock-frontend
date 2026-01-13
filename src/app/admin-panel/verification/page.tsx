"use client";

import { useState, useEffect } from "react";
import { Search, Eye, AlertCircle } from "lucide-react";
import { AdminLayout, PageHeader } from "@/components/admin-panel";
import { useRouter } from "next/navigation";

interface Verification {
  id: string;
  supplierId: string;
  companyName: string;
  contactPerson: string;
  category: string;
  verificationStatus: string;
  submittedAt: string;
  trustScore?: number;
}

interface Stats {
  pendingCount: number;
  underReviewCount: number;
  verifiedCount: number;
  rejectedCount: number;
}

export default function SupplierVerificationPage() {
  const router = useRouter();
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchVerifications();
    fetchStats();
  }, [statusFilter]);

  const fetchVerifications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");

      const params = new URLSearchParams({
        page: "1",
        limit: "50",
        ...(statusFilter !== "all" && { status: statusFilter }),
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/supplier-verifications/all?${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch verifications");

      const result = await response.json();
      setVerifications(result.data.verifications || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch verifications");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/supplier-verifications/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch stats");

      const result = await response.json();
      setStats(result.data);
    } catch (err: any) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const handleViewDetails = (verificationId: string) => {
    router.push(`/admin-panel/verification/${verificationId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "verified":
        return "text-green-600";
      case "pending":
        return "text-gray-600";
      case "under_review":
        return "text-blue-600";
      case "rejected":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusText = (status: string) => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const filteredVerifications = verifications.filter((v) =>
    searchTerm
      ? v.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.supplierId?.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <PageHeader
          title="Supplier Verification"
          description="Manage and review supplier verification request and documents"
        />

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">PENDING</p>
              <p className="text-2xl font-bold text-black">
                {stats.pendingCount}
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">UNDER REVIEW</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.underReviewCount}
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">VERIFIED</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.verifiedCount}
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">REJECTED</p>
              <p className="text-2xl font-bold text-red-600">
                {stats.rejectedCount}
              </p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white border border-gray-200 mb-4 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2">
              {["all", "pending", "under_review", "verified", "rejected"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                      statusFilter === status
                        ? "bg-black text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {status
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </button>
                )
              )}
            </div>

            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by company or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64 bg-white border border-gray-200">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : filteredVerifications.length === 0 ? (
          <div className="text-center py-12 bg-white border border-gray-200">
            <p className="text-gray-500 text-sm">No verifications found</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-black">
                    Supplier ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-black">
                    COMPANY
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-black">
                    Contact Person
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-black">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-black">
                    Submitted Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-black">
                    STATUS
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-black">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredVerifications.map((verification) => (
                  <tr key={verification.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-black">
                      {verification.supplierId || verification.id}
                    </td>
                    <td className="px-4 py-4 text-sm text-black">
                      {verification.companyName || "N/A"}
                    </td>
                    <td className="px-4 py-4 text-sm text-black">
                      {verification.contactPerson || "N/A"}
                    </td>
                    <td className="px-4 py-4 text-sm text-black">
                      {verification.category || "N/A"}
                    </td>
                    <td className="px-4 py-4 text-sm text-black">
                      {new Date(verification.submittedAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`text-sm font-medium ${getStatusColor(
                          verification.verificationStatus
                        )}`}
                      >
                        {getStatusText(verification.verificationStatus)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleViewDetails(verification.id)}
                        className="hover:bg-gray-100 p-1 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
