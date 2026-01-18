"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Edit2 } from "lucide-react";
import rfqService from "@/services/rfq.service";
import type { RFQ, RFQFilters } from "@/types/buyer.types";

export default function MyRFQsPage() {
  const [rfqs, setRFQs] = useState<RFQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchRFQs = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const filters: RFQFilters = {
        page: currentPage,
        limit: 10,
      };

      if (statusFilter !== "all") {
        filters.status = statusFilter as any;
      }

      const response = await rfqService.getMyRFQs(filters);

      if (response.success && response.data) {
        const rfqsData = response.data.items || [];
        setRFQs(rfqsData);
        setTotalPages(response.data.pagination?.totalPages || 1);
      } else {
        setError(response.message || "Failed to load RFQs");
      }
    } catch (err) {
      console.error("Error fetching RFQs:", err);
      setError("Failed to load RFQs");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, statusFilter]);

  useEffect(() => {
    fetchRFQs();
  }, [fetchRFQs]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200";
      case "closed":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "expired":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#eefbf6] pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-semibold text-2xl text-[#0d1b2a]">My RFQs</h1>
          <Link
            href="/buyer/rfq/post"
            className="bg-[#1e3a8a] text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#1e3a8a]/90 transition-colors"
          >
            + Post New RFQ
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Loading State */}
          {isLoading ? (
            <div className="py-20 text-center">
              <div className="animate-spin h-10 w-10 border-4 border-[#2aae7a] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">Loading RFQs...</p>
            </div>
          ) : rfqs.length === 0 ? (
            /* Empty State */
            <div className="py-20 text-center">
              <p className="text-gray-500 mb-2">No RFQs found.</p>
              <Link
                href="/buyer/rfq/post"
                className="text-[#1e3a8a] font-medium hover:underline"
              >
                Post your first RFQ
              </Link>
            </div>
          ) : (
            /* Table */
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 py-3 text-left font-medium text-xs text-[#0d1b2a] tracking-wide">
                      RFQ ID
                    </th>
                    <th className="px-3 py-3 text-left font-medium text-xs text-[#0d1b2a] tracking-wide">
                      TITLE
                    </th>
                    <th className="px-3 py-3 text-left font-medium text-xs text-[#0d1b2a] tracking-wide">
                      QTY
                    </th>
                    <th className="px-3 py-3 text-left font-medium text-xs text-[#0d1b2a] tracking-wide">
                      BUDGET
                    </th>
                    <th className="px-3 py-3 text-left font-medium text-xs text-[#0d1b2a] tracking-wide">
                      STATUS
                    </th>
                    <th className="px-3 py-3 text-left font-medium text-xs text-[#0d1b2a] tracking-wide">
                      POSTED
                    </th>
                    <th className="px-3 py-3 text-left font-medium text-xs text-[#0d1b2a] tracking-wide">
                      EXPIRES
                    </th>
                    <th className="px-3 py-3 text-center font-medium text-xs text-[#0d1b2a] tracking-wide">
                      QUOTES
                    </th>
                    <th className="px-3 py-3 text-center font-medium text-xs text-[#0d1b2a] tracking-wide">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {rfqs.map((rfq) => (
                    <tr
                      key={rfq.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* RFQ ID */}
                      <td className="px-3 py-3 font-medium text-xs text-gray-500 whitespace-nowrap">
                        {rfq.rfqNumber}
                      </td>

                      {/* Title */}
                      <td className="px-3 py-3">
                        <Link
                          href={`/buyer/rfq/${rfq.id}`}
                          className="text-sm text-gray-900 hover:text-[#2aae7a] transition-colors line-clamp-2 max-w-xs"
                        >
                          {rfq.title}
                        </Link>
                      </td>

                      {/* Quantity */}
                      <td className="px-3 py-3 text-xs text-gray-700 whitespace-nowrap">
                        <span className="font-medium">{rfq.quantity}</span>{" "}
                        <span className="text-gray-500">{rfq.unit}</span>
                      </td>

                      {/* Budget */}
                      <td className="px-3 py-3 text-xs text-gray-900 whitespace-nowrap">
                        {rfq.budgetMin && rfq.budgetMax ? (
                          `₹${parseFloat(String(rfq.budgetMin)).toLocaleString(
                            "en-IN"
                          )} - ₹${parseFloat(
                            String(rfq.budgetMax)
                          ).toLocaleString("en-IN")}`
                        ) : rfq.budgetMin ? (
                          `₹${parseFloat(String(rfq.budgetMin)).toLocaleString(
                            "en-IN"
                          )}+`
                        ) : rfq.budgetMax ? (
                          `Up to ₹${parseFloat(
                            String(rfq.budgetMax)
                          ).toLocaleString("en-IN")}`
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-3 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(
                            rfq.status
                          )}`}
                        >
                          {rfq.status}
                        </span>
                      </td>

                      {/* Posted Date */}
                      <td className="px-3 py-3 text-xs text-gray-700 whitespace-nowrap">
                        {formatDate(rfq.createdAt)}
                      </td>

                      {/* Expires On */}
                      <td className="px-3 py-3 text-xs text-gray-700 whitespace-nowrap">
                        {formatDate(rfq.expiresAt)}
                      </td>

                      {/* Quotes Count */}
                      <td className="px-3 py-3 text-center">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 font-semibold text-xs text-blue-700">
                          {rfq.quoteCount || 0}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-3 py-3 text-center">
                        <Link
                          href={`/buyer/rfq/edit/${rfq.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors"
                          title={
                            rfq.quoteCount && rfq.quoteCount > 0
                              ? `Edit RFQ (${rfq.quoteCount} pending quote(s) will be marked as outdated)`
                              : "Edit RFQ"
                          }
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && rfqs.length > 0 && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#1e3a8a] text-white rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-[#0d1b2a]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#1e3a8a] text-white rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
