"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { marketplaceService } from "@/services/marketplace.service";
import type { Product } from "@/types/api.types";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/utils/currency.utils";

export default function SponsoredListingsSection() {
  const { currency } = useAuth();
  const [listings, setListings] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(true);
        const response = await marketplaceService.getSponsored();
        if (response?.success && response?.data) {
          const sponsoredList = Array.isArray(response.data)
            ? response.data.slice(0, 3)
            : [];
          setListings(sponsoredList);
        } else {
          console.warn("No sponsored listings data received:", response);
          setListings([]);
        }
      } catch (error) {
        console.error("Error fetching sponsored listings:", error);
        setListings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <svg
              className="h-5 w-5 text-gray-900"
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
            Sponsored Listings
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="overflow-hidden border border-gray-200">
              <div className="h-48 w-full animate-pulse bg-gray-200"></div>
              <div className="space-y-3 p-4">
                <div className="h-4 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (listings.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto max-w-[960px] py-[45px]">
      {/* Header with star icon and title */}
      <div className="mb-[29px] flex items-center gap-[15px]">
        {/* Star icon SVG */}
        <svg
          width="29"
          height="29"
          viewBox="0 0 39 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M19.5 3L24.5 13.5L36 15.5L27.75 23.5L29.5 35L19.5 29.5L9.5 35L11.25 23.5L3 15.5L14.5 13.5L19.5 3Z"
            fill="#FFD700"
            stroke="#FFA500"
            strokeWidth="2"
          />
        </svg>
        <h2 className="m-0 text-[26px] font-semibold text-[#0d1b2a]">
          Sponsored Listing
        </h2>
        <div className="ml-[15px] rounded-[4px] bg-[#FFF1C2] px-[13px] py-[2px]">
          <span className="text-[15px] font-medium text-[#0d1b2a]">
            Featured
          </span>
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-[repeat(3,276px)] justify-between gap-[24px]">
        {listings.map((listing, index) => (
          <Link
            key={listing?.productId || index}
            href={`/product/${listing?.slug || "unknown"}`}
            className="no-underline"
          >
            <div className="h-[321px] w-[276px] cursor-pointer rounded-[15px] bg-white shadow-[0px_0px_10px_0px_rgba(24,181,34,0.25)] transition-transform duration-200 hover:-translate-y-[4px]">
              {/* Product image */}
              <div className="m-[8px] h-[152px] w-[260px] overflow-hidden rounded-[15px] bg-[#f5f5f5]">
                {listing?.image ? (
                  <img
                    src={listing.image}
                    alt={listing?.title || "Sponsored Product"}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : null}
              </div>

              {/* Product details */}
              <div className="p-[20px]">
                <h3 className="mb-[8px] mt-0 overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-medium text-[#0d1b2a]">
                  {listing?.title || "Sponsored Product"}
                </h3>

                {/* Location and rating */}
                <div className="mb-[22px] flex items-center gap-[100px]">
                  {/* Location */}
                  <div className="flex items-center gap-[5px]">
                    <img
                      src="https://www.figma.com/api/mcp/asset/5a9dfa56-d9fc-4ee5-94da-e1b350476bfb"
                      alt="Location"
                      className="h-[18px] w-[17px]"
                    />
                    <span className="text-[12px] font-medium text-[#787878]">
                      {listing?.city || "Unknown"}
                    </span>
                  </div>

                  {/* 5 stars */}
                  <div className="flex gap-[4px]">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="19"
                        height="18"
                        viewBox="0 0 19 18"
                        fill="none"
                      >
                        <path
                          d="M9.5 0L11.6 6.9L19 6.9L13 11.1L15.1 18L9.5 13.8L3.9 18L6 11.1L0 6.9L7.4 6.9L9.5 0Z"
                          fill="#FFD700"
                        />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-[20px] flex items-center gap-[10px]">
                  <span className="text-[22px] font-bold text-[#1e3a8a]">
                    {formatPrice(listing?.price || 0, currency)}
                  </span>
                  {listing?.originalPrice &&
                    listing.originalPrice > (listing.price || 0) && (
                      <span className="text-[16px] font-medium text-[#787878] line-through">
                        {formatPrice(listing.originalPrice, currency)}
                      </span>
                    )}
                </div>

                {/* View Deal button */}
                <button className="mx-auto block h-[38px] w-[219px] cursor-pointer rounded-[11px] border-none bg-[#1e3a8a] text-[15px] font-semibold text-white">
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
