"use client";

import { useEffect, useState } from "react";
import {
  Star,
  Check,
  MessageCircle,
  ThumbsUp,
  Download,
  MapPin,
  Calendar,
  Package,
  DollarSign,
  Eye,
  Clock,
} from "lucide-react";
import { supplierService } from "@/services/supplier.service";
import { useAuth } from "@/contexts/AuthContext";

interface RFQ {
  id: string;
  rfq_number: string;
  title: string;
  quantity: number;
  unit: string;
  budget_min: number | null;
  budget_max: number | null;
  required_by_date: string | null;
  detailed_requirements: string;
  preferred_location: string | null;
  duration_days: number;
  status: string;
  view_count: number;
  quote_count: number;
  expires_at: string | null;
  created_at: string;
  category_name: string | null;
  industry_name: string | null;
  buyer_name: string;
  buyer_company: string | null;
  buyer_city: string | null;
  buyer_state: string | null;
  has_quoted: boolean;
}

export default function SupplierRFQ() {
  const { user } = useAuth();
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("active");

  useEffect(() => {
    fetchRFQs();
  }, [page, statusFilter]);

  const fetchRFQs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await supplierService.getRFQs({
        page,
        limit: 10,
        status: statusFilter,
      });

      if (response.success && response.data) {
        setRfqs(response.data.rfqs);
        setTotalPages(response.data.pagination.totalPages);
      } else {
        setError(response.message || "Failed to fetch RFQs");
      }
    } catch (err: any) {
      console.error("Error fetching RFQs:", err);
      setError(err.message || "An error occurred while fetching RFQs");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return "Not specified";
    return `₹${amount.toLocaleString()}`;
  };

  const getStatusBadge = (status: string, hasQuoted: boolean) => {
    if (hasQuoted) {
      return (
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium border border-blue-300">
          Quoted
        </span>
      );
    }

    const statusConfig: Record<
      string,
      { bg: string; text: string; border: string }
    > = {
      active: {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-300",
      },
      closed: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-300",
      },
      expired: {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-300",
      },
      fulfilled: {
        bg: "bg-purple-100",
        text: "text-purple-800",
        border: "border-purple-300",
      },
    };

    const config = statusConfig[status] || statusConfig.active;

    return (
      <span
        className={`inline-block px-3 py-1 ${config.bg} ${config.text} text-xs font-medium border ${config.border}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
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
              You need to be in supplier mode to view RFQs.
            </p>
          </div>
          <button
            onClick={() => (window.location.href = "/supplier")}
            className="w-full px-6 py-3 bg-gray-900 text-white font-semibold border-2 border-gray-900 hover:bg-gray-800 transition-colors"
          >
            Switch to Supplier Mode
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading RFQ opportunities...</p>
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
            onClick={fetchRFQs}
            className="px-6 py-3 bg-gray-900 text-white font-semibold border-2 border-gray-900 hover:bg-gray-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-medium text-gray-900">
              RFQ Opportunities
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Browse and respond to buyer requests for quotes
            </p>
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter("active")}
              className={`px-4 py-2 text-sm font-medium border-2 transition-colors ${
                statusFilter === "active"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter("closed")}
              className={`px-4 py-2 text-sm font-medium border-2 transition-colors ${
                statusFilter === "closed"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Closed
            </button>
          </div>
        </div>

        {/* RFQ Cards */}
        {rfqs.length === 0 ? (
          <div className="text-center py-16 border-2 border-gray-300">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No RFQs Available
            </h3>
            <p className="text-gray-600">
              {statusFilter === "active"
                ? "There are no active RFQ opportunities at the moment."
                : "You have no closed RFQs."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {rfqs.map((rfq) => (
              <div key={rfq.id} className="border-2 border-gray-300 p-6">
                {/* Header Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-gray-900 mb-1">
                      {rfq.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>
                        Buyer:{" "}
                        <span className="text-gray-900 font-medium">
                          {rfq.buyer_company || rfq.buyer_name}
                        </span>
                      </span>
                      {rfq.category_name && (
                        <span className="text-blue-600">
                          {rfq.category_name}
                        </span>
                      )}
                      {(rfq.buyer_city || rfq.buyer_state) && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>
                            {[rfq.buyer_city, rfq.buyer_state]
                              .filter(Boolean)
                              .join(", ")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(rfq.status, rfq.has_quoted)}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{rfq.view_count} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{rfq.quote_count} quotes</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Row */}
                <div className="grid grid-cols-4 gap-6 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Package className="w-3 h-3" />
                      Quantity
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                      {rfq.quantity.toLocaleString()} {rfq.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      Budget Range
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                      {rfq.budget_min && rfq.budget_max
                        ? `${formatCurrency(rfq.budget_min)} - ${formatCurrency(
                            rfq.budget_max
                          )}`
                        : "Negotiable"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Required By
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                      {formatDate(rfq.required_by_date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      RFQ ID
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                      {rfq.rfq_number}
                    </p>
                  </div>
                </div>

                {/* Requirements */}
                {rfq.detailed_requirements && (
                  <div className="mb-4 p-3 bg-gray-50 border border-gray-200">
                    <p className="text-xs text-gray-600 mb-1 font-medium">
                      Requirements:
                    </p>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {rfq.detailed_requirements}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  {rfq.has_quoted ? (
                    <>
                      <button
                        onClick={() =>
                          (window.location.href = `/supplier/rfqs/${rfq.id}`)
                        }
                        className="px-4 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                      >
                        View Details
                      </button>
                      <span className="text-sm text-blue-600 font-medium">
                        ✓ You have submitted a quote for this RFQ
                      </span>
                    </>
                  ) : rfq.status === "active" ? (
                    <>
                      <button
                        onClick={() =>
                          (window.location.href = `/supplier/rfqs/${rfq.id}`)
                        }
                        className="px-4 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Submit Quote
                      </button>
                      <button
                        onClick={() =>
                          (window.location.href = `/supplier/rfqs/${rfq.id}`)
                        }
                        className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-900 text-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        View Details
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() =>
                        (window.location.href = `/supplier/rfqs/${rfq.id}`)
                      }
                      className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-900 text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      View Details
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border-2 border-gray-300 text-gray-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 border-2 border-gray-300 text-gray-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
