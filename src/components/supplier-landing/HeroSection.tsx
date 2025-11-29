"use client";

import { Check } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="bg-white p-14">
      <p className="text-sm text-gray-600 mb-2">For Smart Suppliers</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Turn Surplus Inventory Into Immediate Cash Flow
          </h1>
          <p className="text-gray-600 mb-6">
            Connect with global buyers actively seeking surplus inventory. Our
            AI-powered platform matches your products with verified buyers,
            ensuring fast sales and secure payments.
          </p>
          <div className="flex gap-4 mb-6">
            <button className="px-6 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors">
              Start Selling Today
            </button>
            <button className="px-6 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors">
              View Success Stories
            </button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-900">Free listings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-900">
                Verified buyers only
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-900">Secure payments</span>
            </div>
          </div>
        </div>

        {/* Right Placeholder */}
        <div className="bg-gray-100 border-2 border-gray-900 rounded h-64 flex items-center justify-center">
          <svg
            className="w-24 h-24 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
