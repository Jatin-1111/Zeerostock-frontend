"use client";

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

// Eye icon SVG
const EyeIcon = () => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 5C7.5 5 3.5 12.5 3.5 12.5C3.5 12.5 7.5 20 12.5 20C17.5 20 21.5 12.5 21.5 12.5C21.5 12.5 17.5 5 12.5 5Z"
      stroke="#000000"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12.5" cy="12.5" r="3" stroke="#000000" strokeWidth="1.5" />
  </svg>
);

// Download icon SVG
const DownloadIcon = () => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 3V16M12.5 16L18 10.5M12.5 16L7 10.5"
      stroke="#000000"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 19H21"
      stroke="#000000"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Checkmark icon SVG
const CheckIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 11L9 15L17 7"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Timer icon SVG
const TimerIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="11" cy="12" r="8" stroke="#000000" strokeWidth="2" />
    <path
      d="M11 8V12L14 14"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default function TransactionHistoryTable({
  transactions,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
}: TransactionHistoryTableProps) {
  const getStatusStyles = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    const styles: Record<
      string,
      { bg: string; text: string; label: string; icon?: string }
    > = {
      completed: {
        bg: "#2AAE7A",
        text: "#FFFFFF",
        label: "Completed",
        icon: "check",
      },
      success: {
        bg: "#2AAE7A",
        text: "#FFFFFF",
        label: "Completed",
        icon: "check",
      },
      pending: {
        bg: "#FFCC33",
        text: "#000000",
        label: "Processing",
        icon: "timer",
      },
      processing: {
        bg: "#FFCC33",
        text: "#000000",
        label: "Processing",
        icon: "timer",
      },
      failed: { bg: "#EF4444", text: "#FFFFFF", label: "Failed" },
      cancelled: { bg: "#6B7280", text: "#FFFFFF", label: "Cancelled" },
    };
    return (
      styles[normalizedStatus] || {
        bg: "#6B7280",
        text: "#FFFFFF",
        label: status,
      }
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const getTransactionType = (transaction: Transaction) => {
    // Map payment methods or other data to transaction types
    const method = transaction.payment_method?.toLowerCase() || "";
    if (method.includes("refund")) return "Refund";
    if (method.includes("payout")) return "Payout";
    return "Payment";
  };

  if (loading) {
    return (
      <div className="w-full bg-white rounded-[20px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="p-12 text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-[15px] font-['Inter']">
            Loading transactions...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white rounded-[20px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-red-100 border-2 border-red-600 mx-auto flex items-center justify-center mb-4 rounded">
            <span className="text-3xl">❌</span>
          </div>
          <h3 className="text-[19.5px] font-['Poppins'] font-semibold text-[#0D1B2A] mb-2">
            Error
          </h3>
          <p className="text-gray-600 text-[15px] font-['Inter']">{error}</p>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="w-full bg-white rounded-[20px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 border-2 border-gray-900 mx-auto flex items-center justify-center mb-4 rounded">
            <span className="text-3xl">💳</span>
          </div>
          <h3 className="text-[19.5px] font-['Poppins'] font-semibold text-[#0D1B2A] mb-2">
            No Transactions Yet
          </h3>
          <p className="text-gray-600 text-[15px] font-['Inter']">
            Payment transactions will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full"
      style={{
        transform: "scale(0.75)",
        transformOrigin: "top left",
        width: "133.33%",
      }}
    >
      <div className="bg-white rounded-[20px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[186px_162px_312px_312px_257px_257px] gap-0 px-[30px] py-[41px] border-b border-gray-200">
          <div className="text-[20px] font-['Poppins'] font-medium text-[#0D1B2A] tracking-[0.5px]">
            DATE
          </div>
          <div className="text-[20px] font-['Poppins'] font-medium text-[#0D1B2A] tracking-[0.5px]">
            TYPE
          </div>
          <div className="text-[20px] font-['Poppins'] font-medium text-[#0D1B2A] tracking-[0.5px]">
            DESCRIPTION
          </div>
          <div className="text-[20px] font-['Poppins'] font-medium text-[#0D1B2A] tracking-[0.5px]">
            AMOUNT
          </div>
          <div className="text-[20px] font-['Poppins'] font-medium text-[#0D1B2A] tracking-[0.5px]">
            STATUS
          </div>
          <div className="text-[20px] font-['Poppins'] font-medium text-[#0D1B2A] tracking-[0.5px]">
            ACTIONS
          </div>
        </div>

        {/* Table Rows */}
        <div className="space-y-0">
          {transactions.map((transaction) => {
            const statusStyles = getStatusStyles(transaction.status);
            const transactionType = getTransactionType(transaction);

            return (
              <div
                key={transaction.id}
                className="bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] grid grid-cols-[186px_162px_312px_312px_257px_257px] gap-0 px-[30px] py-[36px] items-center"
              >
                {/* Date */}
                <div className="text-[20px] font-['Inter'] font-medium text-[#9C9C9C] tracking-[0.5px] leading-[28px]">
                  {formatDate(transaction.created_at)}
                </div>

                {/* Type */}
                <div className="text-[20px] font-['Inter'] text-black tracking-[0.5px] leading-[28px]">
                  {transactionType}
                </div>

                {/* Description */}
                <div className="text-[20px] font-['Inter'] text-black tracking-[0.5px] leading-[28px]">
                  {transaction.order_number || transaction.buyer_name}
                </div>

                {/* Amount */}
                <div className="text-[20px] font-['Inter'] text-black tracking-[0.5px] leading-[28px]">
                  $
                  {transaction.amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>

                {/* Status */}
                <div>
                  <div
                    className="inline-flex items-center gap-[10px] px-[20px] py-[7px] rounded-[100px]"
                    style={{
                      backgroundColor: statusStyles.bg,
                    }}
                  >
                    {statusStyles.icon === "check" && <CheckIcon />}
                    {statusStyles.icon === "timer" && <TimerIcon />}
                    <span
                      className="text-[20px] font-['Inter'] tracking-[0.5px] leading-[28px]"
                      style={{ color: statusStyles.text }}
                    >
                      {statusStyles.label}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-[10px]">
                  <button
                    className="flex items-center justify-center p-[10px] border border-[#747474] rounded-[10px] hover:bg-gray-50 transition-colors"
                    onClick={() =>
                      alert(
                        `View transaction ${transaction.transaction_id} details coming soon`
                      )
                    }
                  >
                    <EyeIcon />
                  </button>
                  <button
                    className="flex items-center justify-center p-[10px] border border-[#747474] rounded-[10px] hover:bg-gray-50 transition-colors"
                    onClick={() =>
                      alert(
                        `Download transaction ${transaction.transaction_id} coming soon`
                      )
                    }
                  >
                    <DownloadIcon />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination - keeping outside of scaled container for better usability */}
    </div>
  );
}
