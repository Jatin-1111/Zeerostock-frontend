"use client";

import { Wallet, Clock, TrendingUp, FileText } from "lucide-react";

interface PaymentSummary {
  total_transactions: number;
  total_spent: number;
  pending_amount: number;
  spent_this_month: number;
}

interface BuyerPaymentMethodsStatsProps {
  summary: PaymentSummary | null;
}

export default function BuyerPaymentMethodsStats({
  summary,
}: BuyerPaymentMethodsStatsProps) {
  if (!summary) {
    return (
      <div className="mb-3">
        <div className="grid grid-cols-4 gap-[17px]">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="relative h-[76px] animate-pulse rounded-[11px] bg-white shadow-[0px_0px_3px_0px_rgba(24,181,34,0.25)]"
            >
              <div className="p-[10px]">
                <div className="mb-[11px] h-[11px] w-[40%] rounded-[2px] bg-[#E5E7EB]"></div>
                <div className="mb-[6px] h-[18px] w-[60%] rounded-[2px] bg-[#E5E7EB]"></div>
                <div className="h-[8px] w-[50%] rounded-[2px] bg-[#E5E7EB]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: Wallet,
      label: "Total Spent",
      value: `₹${(summary.total_spent || 0).toLocaleString("en-IN")}`,
      subtitle: "All time",
      subtitleColor: "#9C9C9C",
      iconBgColor: "#DBEAFE",
      iconColor: "#3B82F6",
    },
    {
      icon: Clock,
      label: "Pending",
      value: `₹${(summary.pending_amount || 0).toLocaleString("en-IN")}`,
      subtitle: "Processing",
      subtitleColor: "#EAB308",
      iconBgColor: "#FEF9C3",
      iconColor: "#EAB308",
    },
    {
      icon: TrendingUp,
      label: "This Month",
      value: `₹${(summary.spent_this_month || 0).toLocaleString("en-IN")}`,
      subtitle: "+12% from last month",
      subtitleColor: "#2AAE7A",
      iconBgColor: "#EEFFEF",
      iconColor: "#2AAE7A",
    },
    {
      icon: FileText,
      label: "Transactions",
      value: (summary.total_transactions || 0).toString(),
      subtitle: "Last 30 days",
      subtitleColor: "#9C9C9C",
      iconBgColor: "#F5F5F5",
      iconColor: "#9C9C9C",
    },
  ];

  return (
    <div className="mb-3">
      <div className="grid grid-cols-4 gap-[17px]">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative h-[76px] overflow-hidden rounded-[11px] bg-white shadow-[0px_0px_3px_0px_rgba(24,181,34,0.25)]"
          >
            {/* Label */}
            <div className="absolute left-[10px] top-[15px] -translate-y-1/2 text-xs font-medium leading-normal text-[#9C9C9C]">
              {stat.label}
            </div>

            {/* Value */}
            <div className="absolute left-[10px] top-[39px] -translate-y-1/2 text-xl font-semibold leading-normal text-[#0D1B2A]">
              {stat.value}
            </div>

            {/* Subtitle */}
            <div
              className="absolute left-[10px] top-[58px] -translate-y-1/2 text-xs font-medium leading-normal"
              style={{ color: stat.subtitleColor }}
            >
              {stat.subtitle}
            </div>

            {/* Icon */}
            <div
              className="absolute right-[11px] top-[11px] flex h-[25px] w-[25px] items-center justify-center rounded-[100px] p-[6px]"
              style={{ background: stat.iconBgColor }}
            >
              <stat.icon
                className="w-[13px] h-[13px]"
                style={{ color: stat.iconColor }}
                strokeWidth={2}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
