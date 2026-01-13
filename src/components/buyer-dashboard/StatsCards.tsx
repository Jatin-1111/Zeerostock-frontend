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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-[16.5px]">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-[10px] sm:rounded-[11px] shadow-[0px_0px_4px_0px_rgba(24,181,34,0.25)] h-[70px] sm:h-[76px] px-[8px] py-[14px] sm:py-[18px] relative overflow-hidden"
          >
            {/* Icon Circle */}
            <div
              className="absolute left-[8px] top-1/2 -translate-y-1/2 w-[36px] sm:w-[39px] h-[36px] sm:h-[39px] rounded-full flex items-center justify-center"
              style={{ backgroundColor: stat.bgColor }}
            >
              <Icon
                className="w-[24px] sm:w-[28.5px] h-[24px] sm:h-[28.5px] text-[#1e3a8a]"
                strokeWidth={1.5}
              />
            </div>

            {/* Text Content */}
            <div className="ml-[46px] sm:ml-[51px]">
              <p className="text-xs sm:text-xs font-medium text-[#9c9c9c] leading-normal mb-1 sm:mb-1.5">
                {stat.label}
              </p>
              {isLoading ? (
                <div className="animate-pulse bg-gray-200 h-4 sm:h-4.5 w-10 sm:w-11 rounded"></div>
              ) : (
                <p className="text-lg sm:text-xl font-semibold text-[#0d1b2a] leading-normal">
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
