"use client";

import { useEffect, useState } from "react";
import { supplierService } from "@/services/supplier.service";
import { useAuth } from "@/contexts/AuthContext";
import PaymentMethodsStats from "@/components/payment-methods/PaymentMethodsStats";
import SavedPaymentMethods from "@/components/payment-methods/SavedPaymentMethods";
import SecurityProtection from "@/components/payment-methods/SecurityProtection";
import TransactionHistoryTable from "@/components/payment-methods/TransactionHistoryTable";
import InvoicesList from "@/components/payment-methods/InvoicesList";

interface PaymentSummary {
  total_transactions: number;
  total_received: number;
  pending_amount: number;
  received_this_month: number;
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
  buyer_name: string;
  buyer_company: string;
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
  buyer_name: string;
  buyer_company: string;
  buyer_email: string;
}

export default function PaymentMethodsPage() {
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

  useEffect(() => {
    fetchPaymentData();
  }, [transactionPage]);

  useEffect(() => {
    fetchInvoiceData();
  }, [invoicePage]);

  const fetchPaymentData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await supplierService.getPayments({
        page: transactionPage,
        limit: 10,
      });

      if (response.success && response.data) {
        setPaymentSummary(response.data.summary);
        setTransactions(response.data.transactions);
        setTransactionTotalPages(response.data.pagination.totalPages);
      } else {
        setError(response.message || "Failed to fetch payment data");
      }
    } catch (err: any) {
      console.error("Error fetching payments:", err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoiceData = async () => {
    try {
      setError(null);
      const response = await supplierService.getInvoices({
        page: invoicePage,
        limit: 10,
      });

      if (response.success && response.data) {
        setInvoices(response.data.invoices);
        setInvoiceTotalPages(response.data.pagination.totalPages);
      } else {
        setError(response.message || "Failed to fetch invoices");
      }
    } catch (err: any) {
      console.error("Error fetching invoices:", err);
      setError(err.message || "An error occurred");
    }
  };

  // Role check
  if (user && user.activeRole !== "supplier") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EEFBF6]">
        <div className="mx-auto max-w-md p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border-2 border-red-600 bg-red-100">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Access Restricted
            </h2>
            <p className="mb-6 text-gray-600">
              You need to be in supplier mode to view payments. Your current
              role is: <strong>{user.activeRole}</strong>
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => (window.location.href = "/supplier")}
              className="w-full border-2 border-gray-900 bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Switch to Supplier Mode
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
      width="26"
      height="26"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#2AAE7A]"
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
      <div className="mx-auto w-full max-w-[1440px] px-[45px] py-[23px]">
        {/* Page Header */}
        <div className="mb-[8px]">
          <div className="flex items-center rounded-[11px] bg-white px-[46px] py-[11px] shadow-[0px_0px_8px_0px_rgba(24,181,34,0.25)]">
            <div className="flex items-center gap-[20px]">
              {/* Icon Box */}
              <div className="flex items-center justify-center rounded-[6px] bg-[#EEFFEF] p-[8px] shadow-[0px_0px_8px_0px_rgba(24,181,34,0.25)]">
                <CardIcon />
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <h1 className="m-0 text-xl font-semibold leading-normal text-[#0D1B2A]">
                  Payment Method
                </h1>
                <p className="m-0 text-base font-medium leading-normal text-[#9C9C9C]">
                  Manage payment method and transaction history
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <PaymentMethodsStats summary={paymentSummary} />

        {/* Tabs Navigation */}
        <div className="mb-[14px] mt-[14px]">
          <div className="relative">
            {/* Horizontal line under all tabs */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E5E7EB]" />

            {/* Tabs */}
            <div className="relative flex gap-[37px] pl-[23px]">
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
                  className={`relative cursor-pointer border-none bg-transparent py-[5px] text-xs font-medium leading-tight tracking-[0.3px] transition-colors duration-200 ${
                    activeTab === tab.id ? "text-[#2AAE7A]" : "text-[#0D1B2A]"
                  }`}
                >
                  {tab.label}
                  {/* Active underline */}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-[-1px] left-0 right-0 h-[1.5px] rounded-t-[1.5px] bg-[#2AAE7A]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "payment-methods" && (
          <div className="flex flex-col gap-[17px]">
            <SavedPaymentMethods
              methods={[]}
              loading={false}
              onAdd={() => alert("Add payout method functionality coming soon")}
              onEdit={(id) => alert(`Edit payout method ${id} coming soon`)}
              onDelete={(id) => alert(`Delete payout method ${id} coming soon`)}
            />
            <SecurityProtection />
          </div>
        )}

        {activeTab === "transaction-history" && (
          <TransactionHistoryTable
            transactions={transactions}
            loading={loading}
            error={error}
            currentPage={transactionPage}
            totalPages={transactionTotalPages}
            onPageChange={setTransactionPage}
          />
        )}

        {activeTab === "invoices" && (
          <InvoicesList
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
