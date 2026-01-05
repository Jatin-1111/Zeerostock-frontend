"use client";

import { Clock, MessageSquare, CheckCircle } from "lucide-react";
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
      // Remove empty search parameter to avoid validation errors
      const cleanFilters = { ...filters };
      if (!cleanFilters.search) {
        delete cleanFilters.search;
      }
      const response = await quoteService.getMyQuotes(cleanFilters);

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
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Get status badge styling
  const getStatusBadge = (status: QuoteStatus) => {
    switch (status) {
      case "pending":
        return {
          bg: "bg-[#fc3]",
          text: "text-black",
          icon: <Clock className="w-[22px] h-[22px]" />,
          label: "Pending",
        };
      case "accepted":
        return {
          bg: "bg-[#2aae7a]",
          text: "text-white",
          icon: <CheckCircle className="w-[16px] h-[16px]" />,
          label: "Completed",
        };
      case "rejected":
        return {
          bg: "bg-red-500",
          text: "text-white",
          icon: <Clock className="w-[22px] h-[22px]" />,
          label: "Rejected",
        };
      case "expired":
        return {
          bg: "bg-gray-500",
          text: "text-white",
          icon: <Clock className="w-[22px] h-[22px]" />,
          label: "Expired",
        };
      default:
        return {
          bg: "bg-gray-500",
          text: "text-white",
          icon: <Clock className="w-[22px] h-[22px]" />,
          label: status,
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#eefbf6] px-[60px] py-[100px]">
      {/* Page Title */}
      <h1 className="text-[27px] font-semibold text-[#0d1b2a] mb-[43px]">
        My Quotes
      </h1>

      {/* Divider Line */}
      <div className="w-full h-[1px] bg-gray-300 mb-[30px]" />

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-[#1e3a8a] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-[#0d1b2a]">Loading quotes...</p>
          </div>
        </div>
      ) : quotes.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-[18px] font-medium text-[#0d1b2a] mb-2">
            No quotes found
          </h3>
          <p className="text-[#9c9c9c]">
            You haven&apos;t received any quotes yet. Create an RFQ to get
            started.
          </p>
        </div>
      ) : (
        <div className="space-y-[30px]">
          {quotes.map((quote) => {
            const statusBadge = getStatusBadge(quote.status);
            return (
              <div
                key={quote.id}
                className="bg-[#fbfbfb] rounded-[15px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] overflow-hidden"
              >
                {/* Quote Header */}
                <div className="px-[21px] py-[15px] flex items-center justify-between">
                  <div>
                    <h2 className="text-[18px] font-medium text-black mb-[8px]">
                      {quote.rfq?.title || "RFQ Title"}
                    </h2>
                    <p className="text-[15px] font-medium text-[#9c9c9c]">
                      Supplier: {quote.supplier?.companyName || "Unknown"}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={`${statusBadge.bg} ${statusBadge.text} px-[15px] py-[5px] rounded-[100px] flex items-center gap-[8px]`}
                  >
                    {statusBadge.icon}
                    <span className="text-[15px] font-normal tracking-[0.5px]">
                      {statusBadge.label}
                    </span>
                  </div>
                </div>

                {/* Quote Details Grid */}
                <div className="px-[28px] pt-[18px] pb-[22px] grid grid-cols-4 gap-[22px]">
                  <div>
                    <p className="text-[20px] font-medium text-[#9c9c9c] mb-[16px]">
                      Quote Price
                    </p>
                    <p className="text-[26px] font-medium text-black">
                      <span className="font-bold">₹</span>
                      {(quote.quotePrice || 0).toLocaleString("en-IN")}
                    </p>
                    {quote.rfq?.budgetMin && quote.rfq?.budgetMax && (
                      <p className="text-[15px] font-medium text-black mt-[3px]">
                        <span className="font-bold">₹</span>
                        {(quote.rfq.budgetMax || 0).toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-[15px] font-medium text-[#9c9c9c] mb-[12px]">
                      Delivery
                    </p>
                    <p className="text-[20px] font-medium text-black">
                      {quote.deliveryDays} Days
                    </p>
                  </div>

                  <div>
                    <p className="text-[15px] font-medium text-[#9c9c9c] mb-[12px]">
                      Validity
                    </p>
                    <p className="text-[20px] font-medium text-black">
                      {formatDate(quote.validUntil)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[15px] font-medium text-[#9c9c9c] mb-[12px]">
                      RFQ ID
                    </p>
                    <p className="text-[20px] font-medium text-black">
                      {quote.quoteNumber}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-[24px] h-[1px] bg-gray-300" />

                {/* Action Buttons */}
                <div className="px-[117px] py-[22px] flex items-center justify-center gap-[19px]">
                  {quote.status === "pending" && (
                    <button
                      onClick={() => handleAcceptQuote(quote.id)}
                      disabled={acceptingQuoteId === quote.id}
                      className="bg-[#1e3a8a] text-white w-[191px] h-[45px] rounded-[11px] text-[15px] font-semibold hover:bg-[#152d6b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {acceptingQuoteId === quote.id
                        ? "Accepting..."
                        : "Accept Quote"}
                    </button>
                  )}

                  <button className="border border-[#9c9c9c] w-[191px] h-[45px] rounded-[11px] flex items-center justify-center gap-[11px] text-[#898989] text-[15px] font-medium hover:bg-gray-50 transition-colors">
                    <MessageSquare className="w-[18px] h-[18px]" />
                    <span>Help Desk</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-[45px] flex items-center justify-center gap-[15px]">
          <button
            onClick={() =>
              setFilters({ ...filters, page: pagination.page - 1 })
            }
            disabled={pagination.page === 1}
            className="px-[30px] py-[15px] bg-[#1e3a8a] text-white rounded-[10px] text-[18px] font-medium hover:bg-[#152d6b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="text-[14px] font-medium text-[#0d1b2a]">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() =>
              setFilters({ ...filters, page: pagination.page + 1 })
            }
            disabled={pagination.page === pagination.totalPages}
            className="px-[30px] py-[15px] bg-[#1e3a8a] text-white rounded-[10px] text-[18px] font-medium hover:bg-[#152d6b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[15px] p-[30px] max-w-md w-full mx-4 shadow-[0px_0px_8px_0px_rgba(0,0,0,0.3)]">
            <h3 className="text-[18px] font-bold text-[#0d1b2a] mb-[15px]">
              Reject Quote
            </h3>
            <p className="text-[12px] text-[#9c9c9c] mb-[15px]">
              Please provide a reason for rejecting this quote:
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter reason..."
              rows={4}
              className="w-full px-[11px] py-[9px] border border-gray-300 rounded-[8px] text-[12px] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] resize-none mb-[15px]"
              disabled={!!rejectingQuoteId}
            />
            <div className="flex items-center gap-[11px]">
              <button
                onClick={handleRejectQuote}
                disabled={!!rejectingQuoteId || !rejectReason.trim()}
                className="flex-1 px-[15px] py-[9px] bg-red-600 text-white rounded-[8px] text-[12px] font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="flex-1 px-[15px] py-[9px] bg-white border-2 border-gray-300 text-[#0d1b2a] rounded-[8px] text-[12px] font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
