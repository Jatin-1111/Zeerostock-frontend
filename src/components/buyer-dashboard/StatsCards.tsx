"use client";

import { FileText, Clock, DollarSign, ShoppingBag } from "lucide-react";

export default function StatsCards() {
  const stats = [
    {
      label: "Active RFQs",
      value: "3",
      icon: FileText,
    },
    {
      label: "Pending Quotes",
      value: "1",
      icon: Clock,
    },
    {
      label: "Total Savings",
      value: "₹85,570",
      icon: DollarSign,
    },
    {
      label: "Active Orders",
      value: "2",
      icon: ShoppingBag,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white border-2 border-gray-900 rounded p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <Icon className="w-12 h-12 text-gray-900" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
