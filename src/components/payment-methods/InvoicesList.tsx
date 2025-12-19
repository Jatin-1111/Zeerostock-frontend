"use client";

import { FileText, Download, ChevronLeft, ChevronRight } from "lucide-react";

interface Invoice {
  id: string;
  invoice_number: string;
  order_id: string;
  order_number: string;
  amount: number;
  tax_amount: number;
  total_amount: number;
  status: string;
  issue_date: string;
  due_date: string;
  paid_date: string | null;
  created_at: string;
  buyer_name: string;
  buyer_company: string;
  buyer_email: string;
}

interface InvoicesListProps {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function InvoicesList({
  invoices,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
}: InvoicesListProps) {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      paid: "bg-green-500",
      pending: "bg-yellow-500",
      overdue: "bg-red-500",
      cancelled: "bg-gray-500",
    };
    return colors[status.toLowerCase()] || "bg-gray-500";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="bg-white border-2 border-gray-900 p-12 text-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading invoices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border-2 border-gray-900 p-12 text-center">
        <div className="w-16 h-16 bg-red-100 border-2 border-red-600 mx-auto flex items-center justify-center mb-4">
          <span className="text-3xl">❌</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Error</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="bg-white border-2 border-gray-900 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 border-2 border-gray-900 mx-auto flex items-center justify-center mb-4">
          <span className="text-3xl">📄</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          No Invoices Yet
        </h3>
        <p className="text-gray-600">Invoices will appear here</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white border-2 border-gray-900">
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-900">
          <h3 className="text-lg font-bold text-gray-900">Invoices</h3>
          <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors">
            <Download className="w-4 h-4" />
            Download All
          </button>
        </div>

        <div className="p-6 space-y-4">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-4 border-2 border-gray-900"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-gray-100 border-2 border-gray-900 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-gray-900" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">
                    {invoice.order_number} - {invoice.buyer_name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {invoice.invoice_number} • Issued:{" "}
                    {formatDate(invoice.issue_date)}
                    {invoice.due_date &&
                      ` • Due: ${formatDate(invoice.due_date)}`}
                  </p>
                  {invoice.buyer_company && (
                    <p className="text-xs text-gray-500 mt-1">
                      {invoice.buyer_company}
                    </p>
                  )}
                </div>
                <div className="text-right mr-4">
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="text-sm font-medium text-gray-900">
                    ₹{invoice.amount.toLocaleString()}
                  </p>
                  {invoice.tax_amount > 0 && (
                    <p className="text-xs text-gray-500">
                      Tax: ₹{invoice.tax_amount.toLocaleString()}
                    </p>
                  )}
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    ₹{invoice.total_amount.toLocaleString()}
                  </p>
                  <span
                    className={`${getStatusColor(
                      invoice.status
                    )} text-white text-xs font-medium px-3 py-1 inline-block mt-1 capitalize`}
                  >
                    {invoice.status}
                  </span>
                </div>
              </div>
              <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border-2 border-gray-900 bg-white text-gray-900 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 border-2 border-gray-900 bg-white text-gray-900 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
