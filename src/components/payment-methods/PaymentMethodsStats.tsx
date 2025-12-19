"use client";

import { DollarSign, Clock, TrendingUp, Receipt } from "lucide-react";

interface PaymentSummary {
  total_transactions: number;
  total_received: number;
  pending_amount: number;
  received_this_month: number;
}

interface PaymentMethodsStatsProps {
  summary: PaymentSummary | null;
}

export default function PaymentMethodsStats({
  summary,
}: PaymentMethodsStatsProps) {
  if (!summary) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white border-2 border-gray-900 p-4 animate-pulse"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-200 border-2 border-gray-900"></div>
              <div className="flex-1">
                <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-28"></div>
          </div>
        ))}
      </div>
    );
  }

  const stats = [
    {
      icon: DollarSign,
      label: "Total Received",
      value: `₹${(summary.total_received || 0).toLocaleString()}`,
      subtitle: "All time",
      bgColor: "bg-white",
      iconColor: "text-blue-600",
    },
    {
      icon: Clock,
      label: "Pending",
      value: `₹${(summary.pending_amount || 0).toLocaleString()}`,
      subtitle: "Processing",
      bgColor: "bg-white",
      iconColor: "text-yellow-600",
    },
    {
      icon: TrendingUp,
      label: "This Month",
      value: `₹${(summary.received_this_month || 0).toLocaleString()}`,
      subtitle: "Current month earnings",
      bgColor: "bg-white",
      iconColor: "text-green-600",
    },
    {
      icon: Receipt,
      label: "Transactions",
      value: (summary.total_transactions || 0).toString(),
      subtitle: "Total completed",
      bgColor: "bg-white",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} border-2 border-gray-900 p-4`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gray-100 border-2 border-gray-900 flex items-center justify-center">
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-xs text-gray-600">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
          <p className="text-xs text-gray-600">{stat.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
