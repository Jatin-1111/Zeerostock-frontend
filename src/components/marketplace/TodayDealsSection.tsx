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
      <div className="mx-auto max-w-[960px] py-[45px]">
        <div className="mb-[30px] flex items-center gap-[15px]">
          <div className="h-[60px] w-[60px] animate-pulse rounded-[10px] bg-[#f3f4f6]"></div>
          <div className="h-[40px] w-[300px] animate-pulse rounded-[10px] bg-[#f3f4f6]"></div>
        </div>
        <div className="grid grid-cols-3 gap-[32px]">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[428px] animate-pulse rounded-[20px] bg-[#f3f4f6]"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (deals.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto max-w-[1280px] py-[60px]">
      {/* Section Header */}
      <div className="mb-[40px] flex items-center gap-[20px]">
        {/* Fire Icon */}
        <div className="relative h-[60px] w-[58px]">
          <svg
            width="38"
            height="50"
            viewBox="0 0 38 50"
            className="absolute left-[10px] top-[5px]"
          >
            <path
              d="M19 0C19 20 10 25 10 35C10 42 14 50 19 50C24 50 28 42 28 35C28 25 19 20 19 0Z"
              fill="#FF6B35"
            />
            <path
              d="M19 10C19 25 14 28 14 35C14 39 16 43 19 43C22 43 24 39 24 35C24 28 19 25 19 10Z"
              fill="#FFD700"
            />
          </svg>
        </div>

        {/* Heading and Tag */}
        <div>
          <h2 className="mb-[8px] text-3xl font-semibold text-[#0d1b2a]">
            Today&apos;s Featured Deals
          </h2>
          <div className="inline-block rounded-[5px] bg-[#FFD700] px-[21.5px] py-[3px]">
            <span className="text-xl font-semibold text-[#0d1b2a]">
              Save up to 70%
            </span>
          </div>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-3 gap-[32px]">
        {deals.map((deal, index) => (
          <Link
            key={deal?.productId || index}
            href={`/product/${deal?.slug || "unknown"}`}
            className="no-underline"
          >
            <div className="h-[428px] cursor-pointer overflow-hidden rounded-[15px] bg-white shadow-[0px_0px_8px_0px_rgba(24,181,34,0.25)] transition-transform duration-200 hover:-translate-y-[4px]">
              {/* Product Image */}
              <div className="relative m-[8px] h-[152px] w-[260px] overflow-hidden rounded-[15px] bg-[#f3f4f6]">
                {deal?.image ? (
                  <img
                    src={deal.image}
                    alt={deal?.title || "Deal"}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-base text-[#9ca3af]">
                    Product Image
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="px-[20px]">
                {/* Title */}
                <h3 className="mb-[7px] mt-[12px] overflow-hidden text-ellipsis whitespace-nowrap text-base font-medium text-[#0d1b2a]">
                  {deal?.title || "Special Deal"}
                </h3>

                {/* Location and Rating */}
                <div className="mb-[14px] flex items-center justify-between">
                  <div className="flex items-center gap-[5px]">
                    <svg width="17" height="18" viewBox="0 0 17 18" fill="none">
                      <path
                        d="M8.5 0C5.5 0 3 2.5 3 5.5C3 9.5 8.5 16 8.5 16C8.5 16 14 9.5 14 5.5C14 2.5 11.5 0 8.5 0ZM8.5 7.5C7.4 7.5 6.5 6.6 6.5 5.5C6.5 4.4 7.4 3.5 8.5 3.5C9.6 3.5 10.5 4.4 10.5 5.5C10.5 6.6 9.6 7.5 8.5 7.5Z"
                        fill="#0d1b2a"
                      />
                    </svg>
                    <span className="text-sm font-medium text-[#0d1b2a]">
                      {deal?.city || "Mumbai"}, IN
                    </span>
                  </div>

                  {/* Star Rating */}
                  <div className="flex gap-[3px]">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="19"
                        height="18"
                        viewBox="0 0 19 18"
                        fill={i < 4 ? "#FFD700" : "#D3D3D3"}
                      >
                        <path d="M9.5 0L11.6 6.9H18.9L13 11.1L15.1 18L9.5 13.8L3.9 18L6 11.1L0.1 6.9H7.4L9.5 0Z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-[23px]">
                  <span className="mr-[12px] text-2xl font-bold text-[#1e3a8a]">
                    ₹{(deal?.price || 15000).toLocaleString("en-IN")}
                  </span>
                  {deal?.originalPrice &&
                    deal.originalPrice > (deal.price || 0) && (
                      <span className="relative text-2xl font-bold text-[#787878] line-through">
                        ₹{deal.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                </div>

                {/* View Deal Button */}
                <div className="cursor-pointer rounded-[15px] bg-[#1e3a8a] p-[14px] text-center">
                  <span className="text-2xl font-semibold text-white">
                    View Deal
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
