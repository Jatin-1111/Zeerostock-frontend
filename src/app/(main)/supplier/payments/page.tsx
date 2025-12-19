"use client";

import { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";
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
              You need to be in supplier mode to view payments. Your current
              role is: <strong>{user.activeRole}</strong>
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => (window.location.href = "/supplier")}
              className="w-full px-6 py-3 bg-gray-900 text-white font-semibold border-2 border-gray-900 hover:bg-gray-800 transition-colors"
            >
              Switch to Supplier Mode
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

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gray-100 border-2 border-gray-900 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-gray-900" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Payment Methods
              </h1>
              <p className="text-sm text-gray-600">
                Manage payment methods and transaction history
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <PaymentMethodsStats summary={paymentSummary} />

        {/* Tabs Navigation */}
        <div className="inline-flex gap-0 mb-6 border-2 border-gray-900">
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
              className={`px-6 py-3 text-sm font-medium last:border-r-0 transition-colors bg-white text-black ${
                activeTab === tab.id ? "border-2 border-gray-900" : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "payment-methods" && (
          <div>
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
