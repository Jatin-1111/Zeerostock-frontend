"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { marketplaceService } from "@/services/marketplace.service";
import type { Product } from "@/types/api.types";

export default function TodayDealsSection() {
  const [deals, setDeals] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setIsLoading(true);
        const response = await marketplaceService.getFeaturedDeals();
        if (response?.success && response?.data) {
          const dealsList = Array.isArray(response.data)
            ? response.data.slice(0, 3)
            : [];
          setDeals(dealsList);
        } else {
          console.warn("No featured deals data received:", response);
          setDeals([]);
        }
      } catch (error) {
        console.error("Error fetching deals:", error);
        setDeals([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Today&apos;s Exclusive Deals
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 overflow-hidden">
              <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (deals.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Today&apos;s Exclusive Deals
        </h2>
        <Link
          href="/marketplace?filter=deals"
          className="text-sm text-blue-600 hover:underline"
        >
          View more →
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {deals.map((deal, index) => (
          <Link
            key={deal?.productId || index}
            href={`/product/${deal?.slug || "unknown"}`}
          >
            <div className="border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                {deal?.image ? (
                  <img
                    src={deal.image}
                    alt={deal?.title || "Deal"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement!.innerHTML =
                        '<span class="text-sm text-gray-400">Product Image</span>';
                    }}
                  />
                ) : (
                  <span className="text-sm text-gray-400">Product Image</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                  {deal?.title || "Special Deal"}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  by {deal?.seller?.name || "Zeerostock Supplier"}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl font-bold text-gray-900">
                    ₹{(deal?.price || 0).toLocaleString("en-IN")}
                  </span>
                  {deal?.originalPrice &&
                    deal.originalPrice > (deal.price || 0) && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{deal.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                </div>
                <div className="flex items-center justify-between">
                  {deal?.discountPercent && deal.discountPercent > 0 && (
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-900 text-xs font-medium rounded border border-gray-900">
                      {deal.discountPercent}% Off
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-xs text-gray-600">
                    <svg
                      className="w-3 h-3 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {deal?.city || "Unknown"}, {deal?.state || "Unknown"}
                  </span>
                </div>
                <button className="w-full mt-3 py-2 border border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-900 hover:text-white transition-colors">
                  View Deal
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
