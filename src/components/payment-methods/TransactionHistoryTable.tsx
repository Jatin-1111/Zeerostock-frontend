"use client";

import { Eye, Download, ChevronLeft, ChevronRight } from "lucide-react";

interface Transaction {
  id: string;
  transaction_id: string;
  order_id: string;
  order_number: string;
  amount: number;
  payment_method: string;
  payment_gateway: string;
  status: string;
  created_at: string;
  updated_at: string;
  buyer_name: string;
  buyer_company: string;
}

interface TransactionHistoryTableProps {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function TransactionHistoryTable({
  transactions,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
}: TransactionHistoryTableProps) {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      completed: "bg-green-500",
      success: "bg-green-500",
      pending: "bg-yellow-500",
      processing: "bg-blue-500",
      failed: "bg-red-500",
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
        <p className="text-gray-600">Loading transactions...</p>
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

  if (transactions.length === 0) {
    return (
      <div className="bg-white border-2 border-gray-900 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 border-2 border-gray-900 mx-auto flex items-center justify-center mb-4">
          <span className="text-3xl">💳</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          No Transactions Yet
        </h3>
        <p className="text-gray-600">Payment transactions will appear here</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white border-2 border-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-900">
                <th className="text-left p-4 text-sm font-bold text-gray-900">
                  Date
                </th>
                <th className="text-left p-4 text-sm font-bold text-gray-900">
                  Transaction ID
                </th>
                <th className="text-left p-4 text-sm font-bold text-gray-900">
                  Order
                </th>
                <th className="text-left p-4 text-sm font-bold text-gray-900">
                  Buyer
                </th>
                <th className="text-left p-4 text-sm font-bold text-gray-900">
                  Method
                </th>
                <th className="text-left p-4 text-sm font-bold text-gray-900">
                  Amount
                </th>
                <th className="text-left p-4 text-sm font-bold text-gray-900">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-bold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b-2 border-gray-900">
                  <td className="p-4 text-sm text-gray-900">
                    {formatDate(transaction.created_at)}
                  </td>
                  <td className="p-4 text-sm font-medium text-gray-900">
                    {transaction.transaction_id}
                  </td>
                  <td className="p-4 text-sm text-gray-900">
                    {transaction.order_number}
                  </td>
                  <td className="p-4 text-sm text-gray-900">
                    <div>
                      <div className="font-medium">
                        {transaction.buyer_name}
                      </div>
                      {transaction.buyer_company && (
                        <div className="text-xs text-gray-500">
                          {transaction.buyer_company}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-900">
                    <div className="capitalize">
                      {transaction.payment_method}
                    </div>
                    <div className="text-xs text-gray-500">
                      {transaction.payment_gateway}
                    </div>
                  </td>
                  <td className="p-4 text-sm font-bold text-gray-900">
                    ₹{transaction.amount.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`${getStatusColor(
                        transaction.status
                      )} text-white text-xs font-medium px-3 py-1 inline-block capitalize`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 border-2 border-gray-900 hover:bg-gray-100 transition-colors">
                        <Eye className="w-4 h-4 text-gray-900" />
                      </button>
                      <button className="p-2 border-2 border-gray-900 hover:bg-gray-100 transition-colors">
                        <Download className="w-4 h-4 text-gray-900" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
