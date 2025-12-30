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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 border-2 border-red-600 mx-auto flex items-center justify-center mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Access Restricted
            </h2>
            <p className="text-gray-600 mb-6">
              You need to be in buyer mode to view payments. Your current role
              is: <strong>{user.activeRole}</strong>
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => (window.location.href = "/buyer")}
              className="w-full px-6 py-3 bg-gray-900 text-white font-semibold border-2 border-gray-900 hover:bg-gray-800 transition-colors"
            >
              Switch to Buyer Mode
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full px-6 py-3 bg-white text-gray-900 font-semibold border-2 border-gray-900 hover:bg-gray-50 transition-colors"
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
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
    <div style={{ minHeight: "100vh" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "40px 80px",
        }}
      >
        {/* Page Header with scaling */}
        <div
          style={{
            transform: "scale(0.75)",
            transformOrigin: "top left",
            width: "133.33%",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              boxShadow: "0px 0px 10px 0px rgba(24,181,34,0.25)",
              padding: "20px 81px 20px 81px",
              display: "flex",
              alignItems: "center",
              marginBottom: "71px",
            }}
          >
            <div style={{ display: "flex", gap: "34px", alignItems: "center" }}>
              {/* Icon Box */}
              <div
                style={{
                  background: "#EEFFEF",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px 0px rgba(24,181,34,0.25)",
                  padding: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CardIcon />
              </div>

              {/* Text Content */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h1
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "36px",
                    color: "#0D1B2A",
                    lineHeight: "normal",
                    margin: 0,
                  }}
                >
                  Payment Method
                </h1>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "24px",
                    color: "#9C9C9C",
                    lineHeight: "normal",
                    margin: 0,
                  }}
                >
                  Manage payment method and transaction history
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <BuyerPaymentMethodsStats summary={paymentSummary} />

        {/* Tabs Navigation with scaling */}
        <div
          style={{
            transform: "scale(0.75)",
            transformOrigin: "top left",
            width: "133.33%",
            marginBottom: "50px",
            marginTop: "50px",
          }}
        >
          <div style={{ position: "relative" }}>
            {/* Horizontal line under all tabs */}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                right: "0",
                height: "1px",
                background: "#E5E7EB",
              }}
            />

            {/* Tabs */}
            <div
              style={{
                display: "flex",
                gap: "65px",
                position: "relative",
                paddingLeft: "40px",
              }}
            >
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
                  style={{
                    background: "transparent",
                    border: "none",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "20px",
                    color: activeTab === tab.id ? "#2AAE7A" : "#0D1B2A",
                    letterSpacing: "0.5px",
                    lineHeight: "24px",
                    padding: "8px 0",
                    cursor: "pointer",
                    position: "relative",
                    transition: "color 0.2s ease",
                  }}
                >
                  {tab.label}
                  {/* Active underline */}
                  {activeTab === tab.id && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-1px",
                        left: "0",
                        right: "0",
                        height: "3px",
                        background: "#2AAE7A",
                        borderRadius: "2px 2px 0 0",
                      }}
                    />
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
