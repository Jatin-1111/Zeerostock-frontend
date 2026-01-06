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

// Invoice icon SVG (from Figma)
const InvoiceIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 70 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="70" height="70" rx="10" fill="#F3F4F6" />
    <path
      d="M20 20H50V50H20V20Z"
      fill="white"
      stroke="#1E3A8A"
      strokeWidth="2"
    />
    <line x1="25" y1="28" x2="45" y2="28" stroke="#1E3A8A" strokeWidth="1.5" />
    <line x1="25" y1="35" x2="45" y2="35" stroke="#1E3A8A" strokeWidth="1.5" />
    <line x1="25" y1="42" x2="35" y2="42" stroke="#1E3A8A" strokeWidth="1.5" />
  </svg>
);

// Download icon SVG
const DownloadIconSVG = () => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 3V16M12.5 16L18 10.5M12.5 16L7 10.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M4 19H21" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function InvoicesList({
  invoices,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
}: InvoicesListProps) {
  const getStatusStyles = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    const styles: Record<
      string,
      { bg: string; text: string; label: string; icon?: string }
    > = {
      paid: {
        bg: "#2AAE7A",
        text: "#FFFFFF",
        label: "Completed",
        icon: "check",
      },
      completed: {
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
      overdue: { bg: "#EF4444", text: "#FFFFFF", label: "Overdue" },
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

  if (loading) {
    return (
      <div className="w-full bg-white rounded-[15px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="p-12 text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-[15px]">Loading invoices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white rounded-[15px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-red-100 border-2 border-red-600 mx-auto flex items-center justify-center mb-4 rounded">
            <span className="text-3xl">❌</span>
          </div>
          <h3 className="text-[19.5px] font-semibold text-[#0D1B2A] mb-2">
            Error
          </h3>
          <p className="text-gray-600 text-[15px]">{error}</p>
        </div>
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="w-full bg-white rounded-[15px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 border-2 border-gray-900 mx-auto flex items-center justify-center mb-4 rounded">
            <span className="text-3xl">📄</span>
          </div>
          <h3 className="text-[19.5px] font-semibold text-[#0D1B2A] mb-2">
            No Invoices Yet
          </h3>
          <p className="text-gray-600 text-[15px]">Invoices will appear here</p>
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
        {/* Header */}
        <div className="flex items-center justify-between px-[50px] py-[30px]">
          <h3 className="text-[26px] font-semibold text-[#0D1B2A] tracking-[0.5px]">
            Invoices
          </h3>
          <button
            className="flex items-center justify-center gap-[10px] px-[110px] py-[15px] bg-[#1E3A8A] text-white rounded-[15px] hover:bg-[#1e3a8aee] transition-colors"
            onClick={() => alert("Download all functionality coming soon")}
          >
            <div className="w-[25px] h-[25px]">
              <DownloadIconSVG />
            </div>
            <span className="text-[20px] font-semibold">Download All</span>
          </button>
        </div>

        {/* Invoice Items */}
        <div className="px-[50px] pb-[50px] space-y-[25px]">
          {invoices.map((invoice) => {
            const statusStyles = getStatusStyles(invoice.status);

            return (
              <div
                key={invoice.id}
                className="bg-[#FBFBFB] rounded-[20px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden"
              >
                <div className="flex items-center px-[50px] py-[30px]">
                  {/* Invoice Icon */}
                  <div className="w-[70px] h-[70px] flex-shrink-0">
                    <InvoiceIcon />
                  </div>

                  {/* Order and Invoice Details */}
                  <div className="flex-1 ml-[30px]">
                    <p className="text-[20px] font-medium text-[#0D1B2A] tracking-[0.5px] leading-[28px] mb-[8px]">
                      {invoice.order_number} -{" "}
                      {invoice.buyer_name ||
                        invoice.buyer_company ||
                        "Customer"}
                    </p>
                    <p className="text-[20px] text-[#9C9C9C] tracking-[0.5px] leading-[28px]">
                      {invoice.invoice_number} •{" "}
                      {formatDate(invoice.issue_date)}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-[20px] ml-[40px]">
                    {invoice.status.toLowerCase() === "processing" && (
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="11"
                          cy="11"
                          r="10"
                          stroke="#9C9C9C"
                          strokeWidth="2"
                        />
                        <path
                          d="M11 6V11L14 14"
                          stroke="#9C9C9C"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}

                    <div
                      className="flex items-center gap-[10px] px-[20px] py-[7px] rounded-[100px]"
                      style={{
                        backgroundColor: statusStyles.bg,
                      }}
                    >
                      {statusStyles.icon === "check" && (
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 11L9 15L17 7"
                            stroke={statusStyles.text}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      {statusStyles.icon === "timer" && (
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="11"
                            cy="12"
                            r="8"
                            stroke={statusStyles.text}
                            strokeWidth="2"
                          />
                          <path
                            d="M11 8V12L14 14"
                            stroke={statusStyles.text}
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M8 2H14"
                            stroke={statusStyles.text}
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                      <span
                        className="text-[20px] tracking-[0.5px] leading-[28px]"
                        style={{ color: statusStyles.text }}
                      >
                        {statusStyles.label}
                      </span>
                    </div>
                  </div>

                  {/* Download Button */}
                  <button
                    className="ml-[20px] flex items-center justify-center p-[10px] bg-[#1E3A8A] border border-white rounded-[10px] hover:bg-[#1e3a8aee] transition-colors"
                    onClick={() =>
                      alert(
                        `Download invoice ${invoice.invoice_number} coming soon`
                      )
                    }
                  >
                    <div className="w-[25px] h-[25px]">
                      <DownloadIconSVG />
                    </div>
                  </button>
                </div>

                {/* Processing Warning (if status is processing) */}
                {invoice.status.toLowerCase() === "processing" && (
                  <div className="mx-[50px] mb-[30px] px-[20px] py-[15px] bg-[#FFF3CF] rounded-[20px]">
                    <p className="text-[13px] text-[#FFCC33] leading-[22px]">
                      We are currently processing your Invoice. Please try again
                      later...
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination - keeping outside of scaled container for better usability */}
    </div>
  );
}
