"use client";

interface Transaction {
  id: string;
  transaction_id: string;
  order_number: string;
  amount: number;
  payment_method: string;
  status: string;
  created_at: string;
  supplier_name: string;
}

interface BuyerTransactionHistoryTableProps {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function BuyerTransactionHistoryTable({
  transactions,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
}: BuyerTransactionHistoryTableProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "failed":
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
          <p className="text-gray-500">Loading transactions...</p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-gray-500">No transactions found</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-medium text-sm text-[#0d1b2a]">
                    TRANSACTION ID
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-sm text-[#0d1b2a]">
                    ORDER
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-sm text-[#0d1b2a]">
                    SUPPLIER
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-sm text-[#0d1b2a]">
                    AMOUNT
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-sm text-[#0d1b2a]">
                    METHOD
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-sm text-[#0d1b2a]">
                    STATUS
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-sm text-[#0d1b2a]">
                    DATE
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {txn.transaction_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {txn.order_number}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {txn.supplier_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                      ₹{txn.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {txn.payment_method}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          txn.status
                        )}`}
                      >
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
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
            <div className="flex justify-center items-center gap-4 p-6 border-t">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-5 py-2 bg-[#1e3a8a] text-white rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-5 py-2 bg-[#1e3a8a] text-white rounded-lg text-sm font-medium hover:bg-[#1e3a8a]/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
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
