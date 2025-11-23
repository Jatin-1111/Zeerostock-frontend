"use client";

import { Search } from "lucide-react";
import { useState } from "react";

interface TrackOrderFormProps {
  onTrack: (orderId: string) => void;
}

export default function TrackOrderForm({ onTrack }: TrackOrderFormProps) {
  const [orderId, setOrderId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      onTrack(orderId.trim());
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-center mb-12">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 border-4 border-gray-900 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
      </div>

      {/* Title and Description */}
      <h1 className="text-4xl font-bold text-gray-900 mb-3">
        Track Your Order
      </h1>
      <p className="text-gray-600 mb-8">
        Enter your order ID to see real-time tracking information
      </p>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="bg-white border-2 border-gray-900 rounded p-6">
          <label className="block text-left text-sm font-bold text-gray-900 mb-3">
            Order ID
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="e.g., ZS-2024-001287"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Track
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded p-4 text-left">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <p className="font-bold text-blue-900 mb-2">
                  Where to find your Order ID?
                </p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Check your order confirmation email</li>
                  <li>
                    • Find it in your account dashboard under &ldquo;My
                    Orders&rdquo;
                  </li>
                  <li>• Look for the format: ZS-YYYY-XXXXXX</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 text-left">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="px-6 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            View All Orders
          </button>
          <button className="px-6 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
