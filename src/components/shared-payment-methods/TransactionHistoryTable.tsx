"use client";

import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/utils/currency.utils";

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
  // Supplier view fields
  buyer_name?: string;
  buyer_company?: string;
  // Buyer view fields
  supplier_name?: string;
  supplier_company?: string;
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
  const { currency } = useAuth();
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "success":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
      case "processing":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 text-center">
        <p className="text-red-700 text-xs sm:text-sm">{error}</p>
      </div>
    );
  }

  // Determine if this is buyer or supplier view
  const isBuyerView =
    transactions.length > 0 && transactions[0].supplier_name !== undefined;
  const counterpartyLabel = isBuyerView ? "SUPPLIER" : "BUYER";

  return (
    <div className="bg-white rounded-[15px] shadow-md overflow-hidden">
      {loading ? (
        <div className="py-8 sm:py-11 text-center">
          <div className="animate-spin h-5 w-5 sm:h-6 sm:w-6 border-[2px] border-[#2aae7a] border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-gray-500 text-[8px] sm:text-[9px]">
            Loading transactions...
          </p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="py-8 sm:py-11 text-center">
          <p className="text-gray-500 text-[8px] sm:text-[9px]">
            No transactions found
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left font-medium text-[7px] sm:text-[8px] md:text-[9px] text-[#0d1b2a]">
                    TRANSACTION ID
                  </th>
                  <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left font-medium text-[7px] sm:text-[8px] md:text-[9px] text-[#0d1b2a]">
                    ORDER
                  </th>
                  <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left font-medium text-[7px] sm:text-[8px] md:text-[9px] text-[#0d1b2a]">
                    {counterpartyLabel}
                  </th>
                  <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left font-medium text-[7px] sm:text-[8px] md:text-[9px] text-[#0d1b2a]">
                    AMOUNT
                  </th>
                  <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left font-medium text-[7px] sm:text-[8px] md:text-[9px] text-[#0d1b2a]">
                    METHOD
                  </th>
                  <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left font-medium text-[7px] sm:text-[8px] md:text-[9px] text-[#0d1b2a]">
                    STATUS
                  </th>
                  <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left font-medium text-[7px] sm:text-[8px] md:text-[9px] text-[#0d1b2a]">
                    DATE
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50">
                    <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-[7px] sm:text-[8px] md:text-[9px] text-gray-600">
                      {txn.transaction_id}
                    </td>
                    <td className="px-2 sm:px-3 md:px-4.5 py-2 sm:py-3 text-[9px] sm:text-[10px] md:text-[11px] text-gray-900">
                      {txn.order_number}
                    </td>
                    <td className="px-2 sm:px-3 md:px-4.5 py-2 sm:py-3 text-[9px] sm:text-[10px] md:text-[11px] text-gray-900">
                      {isBuyerView
                        ? txn.supplier_name || txn.supplier_company
                        : txn.buyer_name || txn.buyer_company}
                    </td>
                    <td className="px-2 sm:px-3 md:px-4.5 py-2 sm:py-3 text-[9px] sm:text-[10px] md:text-[11px] text-gray-900 font-semibold">
                      {formatPrice(txn.amount, currency)}
                    </td>
                    <td className="px-2 sm:px-3 md:px-4.5 py-2 sm:py-3 text-[9px] sm:text-[10px] md:text-[11px] text-gray-700">
                      {txn.payment_method}
                    </td>
                    <td className="px-2 sm:px-3 md:px-4.5 py-2 sm:py-3">
                      <span
                        className={`inline-flex px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-medium border ${getStatusColor(
                          txn.status,
                        )}`}
                      >
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-2 sm:px-3 md:px-4.5 py-2 sm:py-3 text-[9px] sm:text-[10px] md:text-[11px] text-gray-700">
                      {new Date(txn.created_at).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 sm:gap-3 p-3 sm:p-4 md:p-4.5 border-t">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#1e3a8a] text-white rounded-lg text-[9px] sm:text-[10px] font-medium hover:bg-[#1e3a8a]/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-[9px] sm:text-[10px]">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#1e3a8a] text-white rounded-lg text-[9px] sm:text-[10px] font-medium hover:bg-[#1e3a8a]/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
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
