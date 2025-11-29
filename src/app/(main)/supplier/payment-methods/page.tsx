"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import PaymentMethodsStats from "@/components/payment-methods/PaymentMethodsStats";
import SavedPaymentMethods from "@/components/payment-methods/SavedPaymentMethods";
import SecurityProtection from "@/components/payment-methods/SecurityProtection";
import TransactionHistoryTable from "@/components/payment-methods/TransactionHistoryTable";
import InvoicesList from "@/components/payment-methods/InvoicesList";

export default function PaymentMethodsPage() {
  const [activeTab, setActiveTab] = useState<
    "payment-methods" | "transaction-history" | "invoices"
  >("payment-methods");

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
        <PaymentMethodsStats />

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
            <SavedPaymentMethods />
            <SecurityProtection />
          </div>
        )}

        {activeTab === "transaction-history" && <TransactionHistoryTable />}

        {activeTab === "invoices" && <InvoicesList />}
      </div>
    </div>
  );
}
