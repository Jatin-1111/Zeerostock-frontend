"use client";

import { useState } from "react";

export default function OrderSummary() {
  const [promoCode, setPromoCode] = useState("");

  return (
    <div className="space-y-6">
      {/* Promo Code */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Promo Code</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter Promo Code"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Apply
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal (3 items)</span>
            <span className="font-semibold">₹ 75,962.00</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Total Savings</span>
            <span className="font-semibold text-green-600">-₹ 13,254.75</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Estimated Tax</span>
            <span className="font-semibold">₹ 3,290.60</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Shipping</span>
            <span className="font-semibold text-green-600">Free</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xl font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-gray-900">₹ 74,85.00</span>
          </div>
        </div>

        <button className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors mb-3">
          Proceed to Checkout
        </button>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <svg
            className="w-5 h-5 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>Secure checkout with 256-bit SSL encryption</span>
        </div>

        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 hover:underline">
            Free shipping on cart &gt; ₹25,000
          </button>
        </div>
      </div>
    </div>
  );
}
