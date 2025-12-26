"use client";

import { Wallet, Clock as ClockIcon, DollarSign, Package } from "lucide-react";
import type { OrderStats } from "@/types/buyer.types";

interface StatsCardsProps {
  stats: OrderStats | null;
  isLoading: boolean;
}

export default function StatsCards({ stats, isLoading }: StatsCardsProps) {
  const statsData = [
    {
      label: "Active RFQs",
      value: isLoading ? "-" : (stats?.activeOrders || 0).toString(),
      icon: Wallet,
      bgColor: "#dbeafe",
    },
    {
      label: "Pending Quotes",
      value: isLoading ? "-" : (stats?.activeOrders || 0).toString(),
      icon: ClockIcon,
      bgColor: "#dbeafe",
    },
    {
      label: "Total Saving",
      value: isLoading
        ? "-"
        : `₹${(stats?.totalSpent || 0).toLocaleString("en-IN")}`,
      icon: DollarSign,
      bgColor: "#dbeafe",
    },
    {
      label: "Active Orders",
      value: isLoading ? "-" : (stats?.activeOrders || 0).toString(),
      icon: Package,
      bgColor: "#dbeafe",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[22px]">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-[15px] shadow-[0px_0px_5px_0px_rgba(24,181,34,0.25)] h-[101px] px-[11px] py-[24px] relative overflow-hidden"
          >
            {/* Icon Circle */}
            <div
              className="absolute left-[11px] top-1/2 -translate-y-1/2 w-[52px] h-[52px] rounded-full flex items-center justify-center"
              style={{ backgroundColor: stat.bgColor }}
            >
              <Icon
                className="w-[38px] h-[38px] text-[#1e3a8a]"
                strokeWidth={1.5}
              />
            </div>

            {/* Text Content */}
            <div className="ml-[68px]">
              <p
                className="text-[15px] font-medium text-[#9c9c9c] leading-normal mb-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {stat.label}
              </p>
              {isLoading ? (
                <div className="animate-pulse bg-gray-200 h-6 w-15 rounded"></div>
              ) : (
                <p
                  className="text-[24px] font-semibold text-[#0d1b2a] leading-normal"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {stat.value}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
