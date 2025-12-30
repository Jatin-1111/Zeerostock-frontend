"use client";

import { Download } from "lucide-react";

interface Invoice {
  id: string;
  invoice_number: string;
  order_number: string;
  total_amount: number;
  status: string;
  issue_date: string;
  due_date: string;
  supplier_name: string;
}

interface BuyerInvoicesListProps {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function BuyerInvoicesList({
  invoices,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
}: BuyerInvoicesListProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
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
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      {loading ? (
        <div className="py-20 text-center">
          <div className="animate-spin h-10 w-10 border-4 border-[#2aae7a] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="font-['Poppins'] text-gray-500">Loading invoices...</p>
        </div>
      ) : invoices.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-['Poppins'] text-gray-500">No invoices found</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-['Poppins'] font-medium text-sm text-[#0d1b2a]">
                    INVOICE #
                  </th>
                  <th className="px-6 py-4 text-left font-['Poppins'] font-medium text-sm text-[#0d1b2a]">
                    ORDER #
                  </th>
                  <th className="px-6 py-4 text-left font-['Poppins'] font-medium text-sm text-[#0d1b2a]">
                    SUPPLIER
                  </th>
                  <th className="px-6 py-4 text-left font-['Poppins'] font-medium text-sm text-[#0d1b2a]">
                    AMOUNT
                  </th>
                  <th className="px-6 py-4 text-left font-['Poppins'] font-medium text-sm text-[#0d1b2a]">
                    ISSUE DATE
                  </th>
                  <th className="px-6 py-4 text-left font-['Poppins'] font-medium text-sm text-[#0d1b2a]">
                    DUE DATE
                  </th>
                  <th className="px-6 py-4 text-left font-['Poppins'] font-medium text-sm text-[#0d1b2a]">
                    STATUS
                  </th>
                  <th className="px-6 py-4 text-center font-['Poppins'] font-medium text-sm text-[#0d1b2a]">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-['Poppins'] text-sm text-gray-900 font-medium">
                      {invoice.invoice_number}
                    </td>
                    <td className="px-6 py-4 font-['Poppins'] text-sm text-gray-600">
                      {invoice.order_number}
                    </td>
                    <td className="px-6 py-4 font-['Poppins'] text-sm text-gray-900">
                      {invoice.supplier_name}
                    </td>
                    <td className="px-6 py-4 font-['Poppins'] text-sm text-gray-900 font-semibold">
                      ₹{invoice.total_amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 font-['Poppins'] text-sm text-gray-700">
                      {new Date(invoice.issue_date).toLocaleDateString(
                        "en-IN",
                        { year: "numeric", month: "short", day: "numeric" }
                      )}
                    </td>
                    <td className="px-6 py-4 font-['Poppins'] text-sm text-gray-700">
                      {new Date(invoice.due_date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          invoice.status
                        )}`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() =>
                          alert("Download functionality coming soon")
                        }
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#1e3a8a] hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 p-6 border-t">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-5 py-2 bg-[#1e3a8a] text-white rounded-lg font-['Poppins'] text-sm font-medium hover:bg-[#1e3a8a]/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="font-['Poppins'] text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-5 py-2 bg-[#1e3a8a] text-white rounded-lg font-['Poppins'] text-sm font-medium hover:bg-[#1e3a8a]/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
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
