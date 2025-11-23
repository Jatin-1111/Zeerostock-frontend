"use client";

import Link from "next/link";
import { Edit2, Clock } from "lucide-react";

export default function ActiveRFQsList() {
  const rfqs = [
    {
      id: 1,
      title: "Industrial Electronics Components",
      category: "Electronics",
      status: "Active",
      statusColor: "text-gray-900",
      amount: "₹200000",
      units: "500 units",
      responses: "12 Responses",
      timeLeft: "3 days",
    },
    {
      id: 2,
      title: "Automotive Parts - Brake Systems",
      category: "Automotive",
      status: "urgent",
      statusColor: "text-red-600",
      amount: "₹228,000",
      units: "200 units",
      responses: "8 responses",
      timeLeft: "1 day",
    },
    {
      id: 3,
      title: "Medical Equipment Supplies",
      category: "Healthcare",
      status: "active",
      statusColor: "text-gray-900",
      amount: "₹265,000",
      units: "100 units",
      responses: "15 responses",
      timeLeft: "5 days",
    },
  ];

  return (
    <div className="bg-white border-2 border-gray-900 rounded p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Active RFQs</h2>
        <p className="text-sm text-gray-600">
          types of status: active, inactive and urgent
        </p>
      </div>

      <div className="space-y-4">
        {rfqs.map((rfq) => (
          <div key={rfq.id} className="border-2 border-gray-900 rounded p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {rfq.title}
                </h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-600">{rfq.category}</span>
                  <span className={`font-medium ${rfq.statusColor}`}>
                    {rfq.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{rfq.responses}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {rfq.amount}
                </p>
                <p className="text-sm text-gray-600 mb-3">{rfq.units}</p>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{rfq.timeLeft}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/buyer/dashboard/rfq/${rfq.id}/quotes`}
                className="px-6 py-2 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors"
              >
                View Quotes
              </Link>
              <button className="px-6 py-2 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
