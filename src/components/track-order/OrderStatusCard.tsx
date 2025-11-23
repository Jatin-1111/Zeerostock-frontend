"use client";

import { Calendar } from "lucide-react";

interface OrderStatusCardProps {
  orderId: string;
  placedDate: string;
  status: string;
  currentLocation: string;
  lastUpdated: string;
  estimatedDelivery: string;
}

export default function OrderStatusCard({
  orderId,
  placedDate,
  status,
  currentLocation,
  lastUpdated,
  estimatedDelivery,
}: OrderStatusCardProps) {
  return (
    <div className="bg-white border-2 border-gray-900 rounded p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Order #{orderId}
          </h2>
          <p className="text-sm text-gray-600">Placed on {placedDate}</p>
        </div>
        <button className="px-6 py-2 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors">
          In Transit
        </button>
      </div>

      {/* Status Info */}
      <div className="bg-gray-50 border-2 border-gray-900 rounded p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{status}</h3>
            <p className="text-gray-600 mb-3">
              Current Location: {currentLocation}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Last updated {lastUpdated}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Est. delivery {estimatedDelivery}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
