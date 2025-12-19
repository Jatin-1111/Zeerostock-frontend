"use client";

import {
  CheckCircle,
  MessageCircle,
  XCircle,
  AlertCircle,
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";
import quoteService from "@/services/quote.service";
import type { Quote, QuoteStatus, QuoteFilters } from "@/types/buyer.types";

export default function MyQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<QuoteFilters>({
    page: 1,
    limit: 10,
    status: undefined,
    search: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [acceptingQuoteId, setAcceptingQuoteId] = useState<string | null>(null);
  const [rejectingQuoteId, setRejectingQuoteId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedQuoteForReject, setSelectedQuoteForReject] = useState<
    string | null
  >(null);

  // Fetch quotes
  const fetchQuotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await quoteService.getMyQuotes(filters);

      if (response.success && response.data) {
        setQuotes(response.data.items || []);
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
      } else {
        setError(response.message || "Failed to load quotes");
      }
    } catch (err: unknown) {
      setError(
        (err as Error).message || "An error occurred while loading quotes"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Handle accept quote
  const handleAcceptQuote = async (quoteId: string) => {
    if (!confirm("Are you sure you want to accept this quote?")) return;

    try {
      setAcceptingQuoteId(quoteId);
      const response = await quoteService.acceptQuote(quoteId, {
        createOrder: false,
      });

      if (response.success) {
        // Refresh quotes
        await fetchQuotes();
        alert("Quote accepted successfully!");
      } else {
        alert(response.message || "Failed to accept quote");
      }
    } catch (err: unknown) {
      alert((err as Error).message || "An error occurred");
    } finally {
      setAcceptingQuoteId(null);
    }
  };

  // Handle reject quote
  const handleRejectQuote = async () => {
    if (!selectedQuoteForReject || !rejectReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }

    try {
      setRejectingQuoteId(selectedQuoteForReject);
      const response = await quoteService.rejectQuote(selectedQuoteForReject, {
        reason: rejectReason,
      });

      if (response.success) {
        // Refresh quotes
        await fetchQuotes();
        setShowRejectModal(false);
        setRejectReason("");
        setSelectedQuoteForReject(null);
        alert("Quote rejected successfully");
      } else {
        alert(response.message || "Failed to reject quote");
      }
    } catch (err: unknown) {
      alert((err as Error).message || "An error occurred");
    } finally {
      setRejectingQuoteId(null);
    }
  };

  // Open reject modal
  const openRejectModal = (quoteId: string) => {
    setSelectedQuoteForReject(quoteId);
    setShowRejectModal(true);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Get status badge color
  const getStatusColor = (status: QuoteStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      case "expired":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Quotes</h1>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search quotes..."
                value={filters.search || ""}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value, page: 1 })
                }
                className="pl-10 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <select
              value={filters.status || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  status: e.target.value as QuoteStatus | undefined,
                  page: 1,
                })
              }
              className="px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-gray-900 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading quotes...</p>
            </div>
          </div>
        ) : quotes.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No quotes found
            </h3>
            <p className="text-gray-600">
              You haven&apos;t received any quotes yet. Create an RFQ to get
              started.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {quotes.map((quote) => (
                <div
                  key={quote.id}
                  className="bg-white border-2 border-gray-900 rounded p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h2 className="text-xl font-bold text-gray-900 mb-1">
                            {quote.rfq?.title || "RFQ Title"}
                          </h2>
                          <p className="text-sm text-gray-600">
                            Quote #{quote.quoteNumber}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            quote.status
                          )}`}
                        >
                          {quote.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-sm font-medium text-gray-900">
                          Supplier: {quote.supplier?.companyName || "Unknown"}
                        </span>
                        {quote.supplier?.phone && (
                          <span className="text-sm text-gray-600">
                            📞 {quote.supplier.phone}
                          </span>
                        )}
                        {quote.unreadMessageCount &&
                          quote.unreadMessageCount > 0 && (
                            <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                              {quote.unreadMessageCount} new messages
                            </span>
                          )}
                      </div>

                      <div className="grid grid-cols-4 gap-6">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">
                            Quote Price
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            {formatCurrency(quote.quotePrice)}
                          </p>
                          {quote.discountPercentage &&
                            quote.discountPercentage > 0 && (
                              <p className="text-xs text-green-600 font-medium">
                                Save {quote.discountPercentage}%
                              </p>
                            )}
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 mb-1">Quantity</p>
                          <p className="text-sm font-medium text-gray-900">
                            {quote.quantity} units
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 mb-1">Delivery</p>
                          <p className="text-sm font-medium text-gray-900">
                            {quote.deliveryDays} days
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 mb-1">
                            Valid Until
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {formatDate(quote.validUntil)}
                          </p>
                        </div>
                      </div>

                      {quote.notes && (
                        <div className="mt-4 p-3 bg-gray-50 rounded">
                          <p className="text-xs text-gray-600 mb-1">Notes:</p>
                          <p className="text-sm text-gray-900">{quote.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {quote.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleAcceptQuote(quote.id)}
                          disabled={acceptingQuoteId === quote.id}
                          className="px-6 py-2 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {acceptingQuoteId === quote.id ? (
                            <>
                              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                              Accepting...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Accept Quote
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => openRejectModal(quote.id)}
                          disabled={rejectingQuoteId === quote.id}
                          className="px-6 py-2 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <XCircle className="w-4 h-4" />
                          Decline
                        </button>
                      </>
                    )}
                    <button className="px-6 py-2 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() =>
                    setFilters({ ...filters, page: pagination.page - 1 })
                  }
                  disabled={pagination.page === 1}
                  className="px-4 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-gray-600">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() =>
                    setFilters({ ...filters, page: pagination.page + 1 })
                  }
                  disabled={pagination.page === pagination.totalPages}
                  className="px-4 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Reject Quote
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Please provide a reason for rejecting this quote:
              </p>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter reason..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 resize-none mb-4"
                disabled={!!rejectingQuoteId}
              />
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRejectQuote}
                  disabled={!!rejectingQuoteId || !rejectReason.trim()}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {rejectingQuoteId ? "Rejecting..." : "Confirm Reject"}
                </button>
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectReason("");
                    setSelectedQuoteForReject(null);
                  }}
                  disabled={!!rejectingQuoteId}
                  className="flex-1 px-4 py-2 bg-white border-2 border-gray-300 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


