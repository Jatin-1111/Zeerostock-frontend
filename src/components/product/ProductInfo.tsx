"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProductInfo() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Link href="/home" className="hover:text-gray-900">
          Back to Marketplace
        </Link>
        <span>/</span>
        <span className="text-gray-900">Industrial</span>
        <span>/</span>
        <span className="text-gray-900">
          Industrial Steel Pipes - Grade A36
        </span>
      </div>

      {/* Title and Price */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Industrial Steel Pipes - Grade A36
        </h1>
        <p className="text-gray-600 mb-4">Materials • 4 months</p>

        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-4xl font-bold text-gray-900">₹350,000</span>
          <span className="text-2xl text-gray-500 line-through">₹500,000</span>
        </div>

        <p className="text-sm text-gray-600 mb-2">
          per tonne / MOQ-Min order Qty
        </p>
        <p className="text-sm text-gray-600 mb-4">Product Id: PER0823</p>
      </div>

      {/* Specifications */}
      <div className="flex items-center gap-6 py-4 border-t border-b border-gray-200">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="text-xs text-gray-600">Time Remaining</p>
            <p className="text-sm font-semibold text-gray-900">24 H : 23+</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <div>
            <p className="text-xs text-gray-600">Total Bids</p>
            <p className="text-sm font-semibold text-gray-900">63</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <div>
            <p className="text-xs text-gray-600">Watching</p>
            <p className="text-sm font-semibold text-gray-900">47</p>
          </div>
        </div>
      </div>

      {/* Place Your Bid */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Place Your Bid</h3>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">
            Bid Amount (per tonne)
          </label>
          <input
            type="text"
            placeholder="₹ 350,000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <p className="text-xs text-gray-600 mt-1">
            Minimum increment: ₹10,000
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">
            Quantity (tonnes)
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
            >
              +
            </button>
            <span className="text-sm text-gray-600 ml-2">
              <svg
                className="w-5 h-5 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>{" "}
              MIN: 100, Max: 2000
            </span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">
            Message to Seller (Optional)
          </label>
          <textarea
            placeholder="Add a note to the seller if required"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
      </div>

      {/* Estimated Total */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Estimated Total:</h3>
        <div className="flex justify-between items-center text-2xl font-bold text-gray-900 mb-4">
          <span>₹ 185,000</span>
          <span className="text-sm font-normal text-gray-600">
            *taxes & licensing
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="py-3 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-900 hover:text-white transition-colors">
            <span className="mr-2">₹</span>
            Place Bid
          </button>
          <button className="py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Buy Now
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 mt-4">
          <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Wishlist
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Request Quote
          </button>
        </div>
      </div>
    </div>
  );
}
