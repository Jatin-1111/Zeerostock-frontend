"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { buyerService } from "@/services/buyer.service";
import BuyerPaymentMethodsStats from "@/components/buyer-payment-methods/BuyerPaymentMethodsStats";
import BuyerSavedPaymentMethods from "@/components/buyer-payment-methods/BuyerSavedPaymentMethods";
import BuyerSecurityProtection from "@/components/buyer-payment-methods/BuyerSecurityProtection";
import BuyerTransactionHistoryTable from "@/components/buyer-payment-methods/BuyerTransactionHistoryTable";
import BuyerInvoicesList from "@/components/buyer-payment-methods/BuyerInvoicesList";

interface PaymentSummary {
  total_transactions: number;
  total_spent: number;
  pending_amount: number;
  spent_this_month: number;
}

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
  supplier_name: string;
  supplier_company: string;
}

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
  supplier_name: string;
  supplier_company: string;
  supplier_email: string;
}

export default function BuyerPaymentMethodsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "payment-methods" | "transaction-history" | "invoices"
  >("payment-methods");
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummary | null>(
    null
  );
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transactionPage, setTransactionPage] = useState(1);
  const [invoicePage, setInvoicePage] = useState(1);
  const [transactionTotalPages, setTransactionTotalPages] = useState(1);
  const [invoiceTotalPages, setInvoiceTotalPages] = useState(1);

  const fetchPaymentData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await buyerService.getPayments({
        page: transactionPage,
        limit: 10,
      });

      if (response.success && response.data) {
        setPaymentSummary(response.data.summary);
        setTransactions(response.data.transactions);
        setTransactionTotalPages(response.data.pagination.totalPages);
      } else {
        setError("Failed to fetch payment data");
      }
    } catch (err: unknown) {
      console.error("Error fetching payments:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [transactionPage]);

  const fetchInvoiceData = useCallback(async () => {
    try {
      setError(null);

      const response = await buyerService.getInvoices({
        page: invoicePage,
        limit: 10,
      });

      if (response.success && response.data) {
        setInvoices(response.data.invoices);
        setInvoiceTotalPages(response.data.pagination.totalPages);
      } else {
        setError("Failed to fetch invoices");
      }
    } catch (err: unknown) {
      console.error("Error fetching invoices:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  }, [invoicePage]);

  useEffect(() => {
    fetchPaymentData();
  }, [fetchPaymentData]);

  useEffect(() => {
    fetchInvoiceData();
  }, [fetchInvoiceData]);

  // Role check
  if (user && user.activeRole !== "buyer") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="mx-auto max-w-md p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border-2 border-red-600 bg-red-100">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Access Restricted
            </h2>
            <p className="mb-6 text-gray-600">
              You need to be in buyer mode to view payments. Your current role
              is: <strong>{user.activeRole}</strong>
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => (window.location.href = "/buyer")}
              className="w-full border-2 border-gray-900 bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Switch to Buyer Mode
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full border-2 border-gray-900 bg-white px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-50"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading && !paymentSummary) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900"></div>
          <p className="text-gray-600">Loading payment data...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "payment-methods", label: "Payment Methods" },
    { id: "transaction-history", label: "Transaction History" },
    { id: "invoices", label: "Invoices" },
  ];

  // Custom Card Icon SVG
  const CardIcon = () => (
    <svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.875 15.9375H13.125C11.2275 15.9375 9.6875 17.4775 9.6875 19.375V31.875C9.6875 33.7725 11.2275 35.3125 13.125 35.3125H31.875C33.7725 35.3125 35.3125 33.7725 35.3125 31.875V19.375C35.3125 17.4775 33.7725 15.9375 31.875 15.9375Z"
        stroke="#2AAE7A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.6875 23.4375H35.3125"
        stroke="#2AAE7A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9375 29.6875H18.75"
        stroke="#2AAE7A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-[1440px] px-[80px] py-[40px]">
        {/* Page Header with scaling */}
        <div className="mb-[15px] w-[133.33%] origin-top-left scale-[0.75]">
          <div className="flex items-center rounded-[20px] bg-white px-[81px] py-[20px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.25)]">
            <div className="flex items-center gap-[34px]">
              {/* Icon Box */}
              <div className="flex items-center justify-center rounded-[10px] bg-[#EEFFEF] p-[15px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.25)]">
                <CardIcon />
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <h1 className="m-0 text-[36px] font-semibold leading-normal text-[#0D1B2A]">
                  Payment Method
                </h1>
                <p className="m-0 text-[24px] font-medium leading-normal text-[#9C9C9C]">
                  Manage payment method and transaction history
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <BuyerPaymentMethodsStats summary={paymentSummary} />

        {/* Tabs Navigation with scaling */}
        <div className="mb-[25px] mt-[25px] w-[133.33%] origin-top-left scale-[0.75]">
          <div className="relative">
            {/* Horizontal line under all tabs */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E5E7EB]" />

            {/* Tabs */}
            <div className="relative flex gap-[65px] pl-[40px]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(
                      tab.id as
                        | "payment-methods"
                        | "transaction-history"
                        | "invoices"
                    )
                  }
                  className={`relative cursor-pointer border-none bg-transparent py-[8px] text-[20px] font-medium leading-[24px] tracking-[0.5px] transition-colors duration-200 ${
                    activeTab === tab.id ? "text-[#2AAE7A]" : "text-[#0D1B2A]"
                  }`}
                >
                  {tab.label}
                  {/* Active underline */}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-[-1px] left-0 right-0 h-[3px] rounded-t-[2px] bg-[#2AAE7A]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "payment-methods" && (
          <div className="flex flex-col gap-6">
            <BuyerSavedPaymentMethods
              methods={[]}
              loading={false}
              onAdd={() =>
                alert("Add payment method functionality coming soon")
              }
              onEdit={(id: string) =>
                alert(`Edit payment method ${id} coming soon`)
              }
              onDelete={(id: string) =>
                alert(`Delete payment method ${id} coming soon`)
              }
            />
            <BuyerSecurityProtection />
          </div>
        )}

        {activeTab === "transaction-history" && (
          <BuyerTransactionHistoryTable
            transactions={transactions}
            loading={loading}
            error={error}
            currentPage={transactionPage}
            totalPages={transactionTotalPages}
            onPageChange={setTransactionPage}
          />
        )}

        {activeTab === "invoices" && (
          <BuyerInvoicesList
            invoices={invoices}
            loading={loading}
            error={error}
            currentPage={invoicePage}
            totalPages={invoiceTotalPages}
            onPageChange={setInvoicePage}
          />
        )}
      </div>
    </div>
  );
}
