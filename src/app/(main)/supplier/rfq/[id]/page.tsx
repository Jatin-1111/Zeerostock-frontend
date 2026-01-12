"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Package,
  DollarSign,
  MapPin,
  Clock,
  Building,
  User,
  FileText,
  Send,
} from "lucide-react";
import { supplierService } from "@/services/supplier.service";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface RFQDetail {
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
  buyer_email?: string;
}

export default function RFQDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [rfq, setRfq] = useState<RFQDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Quote form state
  const [quoteData, setQuoteData] = useState({
    quotePrice: "",
    deliveryDays: "",
    validUntil: "",
    notes: "",
  });

  useEffect(() => {
    if (params.id) {
      fetchRFQDetails();
    }
  }, [params.id]);

  const fetchRFQDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await supplierService.getRFQById(params.id as string);

      if (response.success && response.data) {
        setRfq(response.data.rfq);
      } else {
        setError(response.message || "Failed to fetch RFQ details");
      }
    } catch (err: any) {
      console.error("Error fetching RFQ details:", err);
      setError(err.message || "An error occurred while fetching RFQ details");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !quoteData.quotePrice ||
      !quoteData.deliveryDays ||
      !quoteData.validUntil
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const response = await supplierService.submitQuote(params.id as string, {
        quotePrice: parseFloat(quoteData.quotePrice),
        deliveryDays: parseInt(quoteData.deliveryDays),
        validUntil: quoteData.validUntil,
        notes: quoteData.notes || undefined,
      });

      if (response.success) {
        toast.success("Quote submitted successfully! Buyer has been notified.");

        // Refresh RFQ details to show updated state
        await fetchRFQDetails();

        // Reset form
        setQuoteData({
          quotePrice: "",
          deliveryDays: "",
          validUntil: "",
          notes: "",
        });
      } else {
        toast.error(response.message || "Failed to submit quote");
      }
    } catch (err: any) {
      console.error("Error submitting quote:", err);
      toast.error(err.message || "An error occurred while submitting quote");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return "Not specified";
    return `₹${amount.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading RFQ details...</p>
        </div>
      </div>
    );
  }

  if (error || !rfq) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 border-2 border-red-600 mx-auto flex items-center justify-center mb-4">
              <span className="text-3xl">❌</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
            <p className="text-gray-600 mb-6">{error || "RFQ not found"}</p>
          </div>
          <button
            onClick={() => router.push("/supplier/rfq")}
            className="px-6 py-3 bg-gray-900 text-white font-semibold border-2 border-gray-900 hover:bg-gray-800 transition-colors"
          >
            Back to RFQs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto p-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/supplier/rfq")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to RFQs
        </button>

        {/* Header */}
        <div className="mb-6 pb-6 border-b-2 border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                {rfq.title}
              </h1>
              <p className="text-sm text-gray-600">
                RFQ ID: {rfq.rfq_number} | Posted on{" "}
                {formatDate(rfq.created_at)}
              </p>
            </div>
            <div className="text-right">
              {rfq.has_quoted ? (
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium border-2 border-blue-300">
                  ✓ Quote Submitted
                </span>
              ) : rfq.status === "active" ? (
                <span className="inline-block px-4 py-2 bg-green-100 text-green-800 text-sm font-medium border-2 border-green-300">
                  Active
                </span>
              ) : (
                <span className="inline-block px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium border-2 border-gray-300">
                  {rfq.status.charAt(0).toUpperCase() + rfq.status.slice(1)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - RFQ Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Buyer Information */}
            <div className="border-2 border-gray-300 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Building className="w-5 h-5" />
                Buyer Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Company</p>
                  <p className="font-medium text-gray-900">
                    {rfq.buyer_company || rfq.buyer_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="font-medium text-gray-900">
                    {[rfq.buyer_city, rfq.buyer_state]
                      .filter(Boolean)
                      .join(", ") || "Not specified"}
                  </p>
                </div>
                {rfq.category_name && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Category</p>
                    <p className="font-medium text-gray-900">
                      {rfq.category_name}
                    </p>
                  </div>
                )}
                {rfq.industry_name && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Industry</p>
                    <p className="font-medium text-gray-900">
                      {rfq.industry_name}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* RFQ Details */}
            <div className="border-2 border-gray-300 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                RFQ Details
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Package className="w-4 h-4" />
                    <p className="text-sm">Quantity</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {rfq.quantity.toLocaleString()} {rfq.unit}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <p className="text-sm">Budget Range</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {rfq.budget_min && rfq.budget_max
                      ? `${formatCurrency(rfq.budget_min)} - ${formatCurrency(
                          rfq.budget_max
                        )}`
                      : "Negotiable"}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Calendar className="w-4 h-4" />
                    <p className="text-sm">Required By</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatDate(rfq.required_by_date)}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <MapPin className="w-4 h-4" />
                    <p className="text-sm">Preferred Location</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {rfq.preferred_location || "Not specified"}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Clock className="w-4 h-4" />
                    <p className="text-sm">RFQ Duration</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {rfq.duration_days} days
                  </p>
                </div>
                {rfq.expires_at && (
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Clock className="w-4 h-4" />
                      <p className="text-sm">Expires On</p>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatDate(rfq.expires_at)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Detailed Requirements */}
            {rfq.detailed_requirements && (
              <div className="border-2 border-gray-300 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Detailed Requirements
                </h2>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {rfq.detailed_requirements}
                </p>
              </div>
            )}

            {/* Statistics */}
            <div className="border-2 border-gray-300 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                RFQ Statistics
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {rfq.view_count}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Quotes Submitted</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {rfq.quote_count}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quote Submission Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {rfq.has_quoted ? (
                <div className="border-2 border-blue-300 bg-blue-50 p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 border-2 border-blue-600 mx-auto flex items-center justify-center mb-4 rounded-full">
                      <span className="text-3xl">✓</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Quote Already Submitted
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      You have already submitted a quote for this RFQ. The buyer
                      has been notified and will review your quote.
                    </p>
                    <button
                      onClick={() => router.push("/supplier/quotes")}
                      className="w-full px-4 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      View My Quotes
                    </button>
                  </div>
                </div>
              ) : rfq.status !== "active" ? (
                <div className="border-2 border-gray-300 bg-gray-50 p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 border-2 border-gray-600 mx-auto flex items-center justify-center mb-4">
                      <span className="text-3xl">🔒</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      RFQ Closed
                    </h3>
                    <p className="text-sm text-gray-600">
                      This RFQ is no longer accepting quotes.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmitQuote}
                  className="border-2 border-gray-300 p-6"
                >
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Submit Your Quote
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quote Price (₹)<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        value={quoteData.quotePrice}
                        onChange={(e) =>
                          setQuoteData({
                            ...quoteData,
                            quotePrice: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 text-sm focus:outline-none focus:border-gray-900"
                        placeholder="Enter your quote price"
                        min="0"
                        step="0.01"
                        required
                        disabled={submitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Days<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        value={quoteData.deliveryDays}
                        onChange={(e) =>
                          setQuoteData({
                            ...quoteData,
                            deliveryDays: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 text-sm focus:outline-none focus:border-gray-900"
                        placeholder="Number of days for delivery"
                        min="1"
                        required
                        disabled={submitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Valid Until<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="date"
                        value={quoteData.validUntil}
                        onChange={(e) =>
                          setQuoteData({
                            ...quoteData,
                            validUntil: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 text-sm focus:outline-none focus:border-gray-900"
                        min={new Date().toISOString().split("T")[0]}
                        required
                        disabled={submitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Notes
                      </label>
                      <textarea
                        value={quoteData.notes}
                        onChange={(e) =>
                          setQuoteData({ ...quoteData, notes: e.target.value })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 text-sm focus:outline-none focus:border-gray-900 resize-none"
                        rows={4}
                        placeholder="Add any additional information about your quote..."
                        disabled={submitting}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full px-4 py-3 bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Quote
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
