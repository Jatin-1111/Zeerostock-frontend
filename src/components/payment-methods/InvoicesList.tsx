"use client";

import { Download } from "lucide-react";

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
    switch (status.toLowerCase()) {
      case "paid":
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
      case "processing":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[15px] shadow-md overflow-hidden">
      {loading ? (
        <div className="py-11 text-center">
          <div className="animate-spin h-6 w-6 border-[2px] border-[#2aae7a] border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-gray-500 text-[9px]">Loading invoices...</p>
        </div>
      ) : invoices.length === 0 ? (
        <div className="py-11 text-center">
          <p className="text-gray-500 text-[9px]">No invoices found</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-[8px] text-[#0d1b2a]">
                    INVOICE #
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-[8px] text-[#0d1b2a]">
                    ORDER #
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-[8px] text-[#0d1b2a]">
                    BUYER
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-[8px] text-[#0d1b2a]">
                    AMOUNT
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-[8px] text-[#0d1b2a]">
                    ISSUE DATE
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-[8px] text-[#0d1b2a]">
                    DUE DATE
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-[8px] text-[#0d1b2a]">
                    STATUS
                  </th>
                  <th className="px-3 py-2 text-center font-medium text-[8px] text-[#0d1b2a]">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-[8px] text-gray-900 font-medium">
                      {invoice.invoice_number}
                    </td>
                    <td className="px-4.5 py-3 text-[10px] text-gray-600">
                      {invoice.order_number}
                    </td>
                    <td className="px-4.5 py-3 text-[10px] text-gray-900">
                      {invoice.buyer_name || invoice.buyer_company}
                    </td>
                    <td className="px-4.5 py-3 text-[10px] text-gray-900 font-semibold">
                      ₹{invoice.total_amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4.5 py-3 text-[10px] text-gray-700">
                      {new Date(invoice.issue_date).toLocaleDateString(
                        "en-IN",
                        { year: "numeric", month: "short", day: "numeric" }
                      )}
                    </td>
                    <td className="px-4.5 py-3 text-[10px] text-gray-700">
                      {new Date(invoice.due_date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4.5 py-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-medium border ${getStatusColor(
                          invoice.status
                        )}`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-4.5 py-3 text-center">
                      <button
                        onClick={() =>
                          alert("Download functionality coming soon")
                        }
                        className="inline-flex items-center gap-1.5 px-2 py-1.5 text-[10px] font-medium text-[#1e3a8a] hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 p-4.5 border-t">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-1.5 bg-[#1e3a8a] text-white rounded-lg text-[10px] font-medium hover:bg-[#1e3a8a]/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-[10px]">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-1.5 bg-[#1e3a8a] text-white rounded-lg text-[10px] font-medium hover:bg-[#1e3a8a]/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
