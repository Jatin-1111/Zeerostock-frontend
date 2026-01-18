"use client";

import { useEffect, useState } from "react";
import { Download, MoreVertical, FileText } from "lucide-react";
import { supplierService } from "@/services/supplier.service";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface Quote {
  id: string;
  quote_number: string;
  rfq_number: string;
  buyer_company_name: string;
  product_title: string;
  quote_price: number;
  status: string;
  created_at: string;
  valid_until: string;
}

export default function SupplierQuotes() {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleError, setRoleError] = useState(false);

  useEffect(() => {
    if (user && user.activeRole !== "supplier") {
      setRoleError(true);
      setLoading(false);
      return;
    }
    fetchQuotes();
  }, [user]);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const response = await supplierService.getQuotes();

      if (response.success && response.data?.quotes) {
        setQuotes(response.data.quotes);
      } else {
        toast.error(response.message || "Failed to fetch quotes");
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
      toast.error("Failed to load quotes");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      shipped: "bg-green-100 text-green-800 border-green-300",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      accepted: "bg-blue-100 text-blue-800 border-blue-300",
      rejected: "bg-red-100 text-red-800 border-red-300",
      submitted: "bg-blue-100 text-blue-800 border-blue-300",
      expired: "bg-gray-100 text-gray-800 border-gray-300",
    };
    return (
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    );
  };

  if (roleError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Supplier Access Required
          </h2>
          <p className="text-gray-600">
            Please switch to supplier mode to access quotes.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quotes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Quotes</h1>
            <p className="text-sm text-gray-600">
              Track and manage your submitted quotes
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Add more columns if required by functional or
            </p>
          </div>
          <button className="px-6 py-3 bg-gray-900 text-white text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors">
            <Download className="w-4 h-4" />
            Export Quotes
          </button>
        </div>

        {/* Table */}
        <div className="border-2 border-gray-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Quote ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    RFQ
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Buyer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Quoted Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Valid Until
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y-2 divide-gray-900">
                {quotes.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium mb-2">
                        No quotes submitted yet
                      </p>
                      <p className="text-sm text-gray-500">
                        Browse RFQs and submit your first quote
                      </p>
                    </td>
                  </tr>
                ) : (
                  quotes.map((quote) => (
                    <tr key={quote.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {quote.quote_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        {quote.rfq_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {quote.buyer_company_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {quote.product_title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {formatCurrency(quote.quote_price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 text-xs font-medium border capitalize ${getStatusBadge(
                            quote.status
                          )}`}
                        >
                          {quote.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatDate(quote.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatDate(quote.valid_until)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="p-2 hover:bg-gray-100 transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
