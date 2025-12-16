"use client";

import { FileText, Clock, DollarSign, ShoppingBag } from "lucide-react";
import type { OrderStats } from "@/types/buyer.types";

interface StatsCardsProps {
  stats: OrderStats | null;
  isLoading: boolean;
}

export default function StatsCards({ stats, isLoading }: StatsCardsProps) {
  const statsData = [
    {
      label: "Total Orders",
      value: isLoading ? "-" : (stats?.totalOrders || 0).toString(),
      icon: ShoppingBag,
    },
    {
      label: "Active Orders",
      value: isLoading ? "-" : (stats?.activeOrders || 0).toString(),
      icon: Clock,
    },
    {
      label: "Completed Orders",
      value: isLoading ? "-" : (stats?.completedOrders || 0).toString(),
      icon: FileText,
    },
    {
      label: "Total Spent",
      value: isLoading
        ? "-"
        : `₹${(stats?.totalSpent || 0).toLocaleString("en-IN")}`,
      icon: DollarSign,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white border-2 border-gray-900 rounded p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {isLoading ? (
                    <span className="animate-pulse bg-gray-200 h-8 w-20 block rounded"></span>
                  ) : (
                    stat.value
                  )}
                </p>
              </div>
              <Icon className="w-12 h-12 text-gray-900" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
