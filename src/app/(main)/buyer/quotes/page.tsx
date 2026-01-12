"use client";

import { MessageSquare, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import quoteService from "@/services/quote.service";
import type { Quote, QuoteStatus, QuoteFilters } from "@/types/buyer.types";

type ModalType = "confirm" | "success" | "error" | null;

interface ModalState {
  type: ModalType;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

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
  const [modal, setModal] = useState<ModalState>({
    type: null,
    title: "",
    message: "",
  });

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
    setModal({
      type: "confirm",
      title: "Accept Quote",
      message: "Are you sure you want to accept this quote?",
      onConfirm: async () => {
        try {
          setModal({ type: null, title: "", message: "" });
          setAcceptingQuoteId(quoteId);
          const response = await quoteService.acceptQuote(quoteId, {
            createOrder: false,
          });

          if (response.success) {
            // Refresh quotes
            await fetchQuotes();
            setModal({
              type: "success",
              title: "Success",
              message: "Quote accepted successfully!",
            });
          } else {
            setModal({
              type: "error",
              title: "Error",
              message: response.message || "Failed to accept quote",
            });
          }
        } catch (err: unknown) {
          setModal({
            type: "error",
            title: "Error",
            message: (err as Error).message || "An error occurred",
          });
        } finally {
          setAcceptingQuoteId(null);
        }
      },
      onCancel: () => {
        setModal({ type: null, title: "", message: "" });
      },
    });
  };

  // Handle reject quote
  const handleRejectQuote = async () => {
    if (!selectedQuoteForReject || !rejectReason.trim()) {
      setModal({
        type: "error",
        title: "Validation Error",
        message: "Please provide a reason for rejection",
      });
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
        setModal({
          type: "success",
          title: "Success",
          message: "Quote rejected successfully",
        });
      } else {
        setModal({
          type: "error",
          title: "Error",
          message: response.message || "Failed to reject quote",
        });
      }
    } catch (err: unknown) {
      setModal({
        type: "error",
        title: "Error",
        message: (err as Error).message || "An error occurred",
      });
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
          icon: <Clock className="w-3 h-3" />,
          label: "Pending",
        };
      case "accepted":
        return {
          bg: "bg-[#2aae7a]",
          text: "text-white",
          icon: (
            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" fill="currentColor" />
              <path
                d="M5.5 8L7 9.5L10.5 6"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
          label: "Completed",
        };
      case "rejected":
        return {
          bg: "bg-red-500",
          text: "text-white",
          icon: <Clock className="w-3 h-3" />,
          label: "Rejected",
        };
      case "expired":
        return {
          bg: "bg-gray-500",
          text: "text-white",
          icon: <Clock className="w-3 h-3" />,
          label: "Expired",
        };
      default:
        return {
          bg: "bg-gray-500",
          text: "text-white",
          icon: <Clock className="w-3 h-3" />,
          label: status,
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#eefbf6] px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-14 lg:py-16">
      {/* Page Title */}
      <h1 className="text-base sm:text-lg md:text-xl lg:text-lg font-semibold text-[#0d1b2a] mb-3 sm:mb-4">
        My Quotes
      </h1>

      {/* Divider Line */}
      <div className="w-full h-px bg-gray-300 mb-4 sm:mb-5" />

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-8 sm:py-10 md:py-12">
          <div className="text-center">
            <div className="animate-spin h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 border-3 sm:border-4 border-[#1e3a8a] border-t-transparent rounded-full mx-auto mb-3 sm:mb-4"></div>
            <p className="text-sm sm:text-base text-[#0d1b2a]">
              Loading quotes...
            </p>
          </div>
        </div>
      ) : quotes.length === 0 ? (
        <div className="text-center py-8 sm:py-10 md:py-12">
          <MessageSquare className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-[#0d1b2a] mb-2">
            No quotes found
          </h3>
          <p className="text-sm sm:text-base text-[#9c9c9c]">
            You haven&apos;t received any quotes yet. Create an RFQ to get
            started.
          </p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {quotes.map((quote) => {
            const statusBadge = getStatusBadge(quote.status);
            return (
              <div
                key={quote.id}
                className="bg-[#fbfbfb] rounded-[8px] sm:rounded-[10px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)] overflow-hidden"
              >
                {/* Quote Header */}
                <div className="px-2.5 sm:px-3 md:px-3.5 py-2 sm:py-2.5 flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-2">
                    <h2 className="text-[11px] sm:text-xs md:text-xs font-medium text-black mb-0.5 sm:mb-1 truncate">
                      {quote.rfq?.title || "RFQ Title"}
                    </h2>
                    <p className="text-[9px] sm:text-[10px] font-medium text-[#9c9c9c] truncate">
                      Supplier: {quote.supplier?.companyName || "Unknown"}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={`${statusBadge.bg} ${statusBadge.text} px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full flex items-center gap-1 sm:gap-1.5 flex-shrink-0`}
                  >
                    {statusBadge.icon}
                    <span className="text-[9px] sm:text-[10px] font-normal tracking-[0.25px] whitespace-nowrap">
                      {statusBadge.label}
                    </span>
                  </div>
                </div>

                {/* Quote Details Grid */}
                <div className="px-2.5 sm:px-3 md:px-3.5 pt-1.5 sm:pt-2 pb-2 sm:pb-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-medium text-[#9c9c9c] mb-1 sm:mb-1.5">
                      Quote Price
                    </p>
                    <p className="text-[12px] sm:text-[13px] font-medium text-black">
                      <span className="font-bold">₹</span>
                      {(quote.quotePrice || 0).toLocaleString("en-IN")}
                    </p>
                    {quote.rfq?.budgetMin && quote.rfq?.budgetMax && (
                      <p className="text-[9px] sm:text-[10px] font-medium text-black mt-0.5">
                        <span className="font-bold">₹</span>
                        {(quote.rfq.budgetMax || 0).toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-[9px] sm:text-[10px] font-medium text-[#9c9c9c] mb-1 sm:mb-1.5">
                      Delivery
                    </p>
                    <p className="text-[12px] sm:text-[13px] font-medium text-black">
                      {quote.deliveryDays} Days
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] sm:text-[10px] font-medium text-[#9c9c9c] mb-1 sm:mb-1.5">
                      Validity
                    </p>
                    <p className="text-[12px] sm:text-[13px] font-medium text-black">
                      {formatDate(quote.validUntil)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] sm:text-[10px] font-medium text-[#9c9c9c] mb-1 sm:mb-1.5">
                      RFQ ID
                    </p>
                    <p className="text-[12px] sm:text-[13px] font-medium text-black truncate">
                      {quote.quoteNumber}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-2.5 sm:mx-3 h-px bg-gray-300" />

                {/* Action Buttons */}
                <div className="px-2.5 sm:px-3 py-2 sm:py-2.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-2 sm:gap-2.5">
                  {quote.status === "pending" && (
                    <button
                      onClick={() => handleAcceptQuote(quote.id)}
                      disabled={acceptingQuoteId === quote.id}
                      className="bg-[#1e3a8a] text-white w-full sm:w-32 h-7 sm:h-7 rounded-[7px] text-[9px] sm:text-[10px] font-semibold hover:bg-[#152d6b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {acceptingQuoteId === quote.id
                        ? "Accepting..."
                        : "Accept Quote"}
                    </button>
                  )}

                  <button className="border border-[#9c9c9c] w-full sm:w-32 h-7 sm:h-7 rounded-[7px] flex items-center justify-center gap-1 sm:gap-1.5 text-[#898989] text-[9px] sm:text-[10px] font-medium hover:bg-gray-50 transition-colors">
                    <MessageSquare className="w-3 h-3" />
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
        <div className="mt-4 sm:mt-5 md:mt-6 flex items-center justify-center gap-2 sm:gap-3">
          <button
            onClick={() =>
              setFilters({ ...filters, page: pagination.page - 1 })
            }
            disabled={pagination.page === 1}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1e3a8a] text-white rounded-[5px] text-[8px] sm:text-[9px] font-medium hover:bg-[#152d6b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="text-[7px] sm:text-[8px] font-medium text-[#0d1b2a] whitespace-nowrap">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() =>
              setFilters({ ...filters, page: pagination.page + 1 })
            }
            disabled={pagination.page === pagination.totalPages}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1e3a8a] text-white rounded-[5px] text-[8px] sm:text-[9px] font-medium hover:bg-[#152d6b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Animated Modals */}
      <AnimatePresence>
        {modal.type && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => {
              if (modal.type !== "confirm") {
                setModal({ type: null, title: "", message: "" });
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white rounded-[7px] p-3 sm:p-4 md:p-5 max-w-[90vw] sm:max-w-sm md:max-w-md w-full mx-2 sm:mx-4 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.3)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Confirm Modal */}
              {modal.type === "confirm" && (
                <>
                  <h3 className="text-[9px] sm:text-[10px] md:text-[11px] font-bold text-[#0d1b2a] mb-2">
                    {modal.title}
                  </h3>
                  <p className="text-[6px] sm:text-[7px] md:text-[8px] text-[#9c9c9c] mb-3">
                    {modal.message}
                  </p>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      onClick={modal.onConfirm}
                      className="flex-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#1e3a8a] text-white rounded-[4px] text-[6px] sm:text-[7px] md:text-[8px] font-medium hover:bg-[#152d6b] transition-colors"
                    >
                      Yes, Accept
                    </button>
                    <button
                      onClick={modal.onCancel}
                      className="flex-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 text-[#0d1b2a] rounded-[4px] text-[6px] sm:text-[7px] md:text-[8px] font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}

              {/* Success Modal */}
              {modal.type === "success" && (
                <>
                  <div className="flex items-center gap-2 sm:gap-2.5 mb-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#2aae7a] flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                    </div>
                    <h3 className="text-[9px] sm:text-[10px] md:text-[11px] font-bold text-[#0d1b2a]">
                      {modal.title}
                    </h3>
                  </div>
                  <p className="text-[6px] sm:text-[7px] md:text-[8px] text-[#9c9c9c] mb-3 ml-7 sm:ml-8">
                    {modal.message}
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={() =>
                        setModal({ type: null, title: "", message: "" })
                      }
                      className="px-4 sm:px-5 md:px-6 py-1 sm:py-1.5 bg-[#2aae7a] text-white rounded-[4px] text-[6px] sm:text-[7px] md:text-[8px] font-medium hover:bg-[#249866] transition-colors"
                    >
                      OK
                    </button>
                  </div>
                </>
              )}

              {/* Error Modal */}
              {modal.type === "error" && (
                <>
                  <div className="flex items-center gap-2 sm:gap-2.5 mb-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-600 flex items-center justify-center">
                      <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                    </div>
                    <h3 className="text-[9px] sm:text-[10px] md:text-[11px] font-bold text-[#0d1b2a]">
                      {modal.title}
                    </h3>
                  </div>
                  <p className="text-[6px] sm:text-[7px] md:text-[8px] text-[#9c9c9c] mb-3 ml-7 sm:ml-8">
                    {modal.message}
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={() =>
                        setModal({ type: null, title: "", message: "" })
                      }
                      className="px-4 sm:px-5 md:px-6 py-1 sm:py-1.5 bg-red-600 text-white rounded-[4px] text-[6px] sm:text-[7px] md:text-[8px] font-medium hover:bg-red-700 transition-colors"
                    >
                      OK
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-[7px] p-3 sm:p-4 md:p-5 max-w-[90vw] sm:max-w-sm md:max-w-md w-full shadow-[0px_0px_4px_0px_rgba(0,0,0,0.3)]">
            <h3 className="text-[9px] sm:text-[10px] md:text-[11px] font-bold text-[#0d1b2a] mb-2">
              Reject Quote
            </h3>
            <p className="text-[6px] sm:text-[7px] md:text-[8px] text-[#9c9c9c] mb-2">
              Please provide a reason for rejecting this quote:
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter reason..."
              rows={4}
              className="w-full px-1.5 sm:px-2 py-1 sm:py-1.5 border border-gray-300 rounded-[4px] text-[6px] sm:text-[7px] md:text-[8px] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] resize-none mb-2"
              disabled={!!rejectingQuoteId}
            />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={handleRejectQuote}
                disabled={!!rejectingQuoteId || !rejectReason.trim()}
                className="flex-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-red-600 text-white rounded-[4px] text-[6px] sm:text-[7px] md:text-[8px] font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="flex-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-gray-300 text-[#0d1b2a] rounded-[4px] text-[6px] sm:text-[7px] md:text-[8px] font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
