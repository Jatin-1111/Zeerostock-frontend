"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { marketplaceService } from "@/services/marketplace.service";
import type { Product } from "@/types/api.types";

export default function SponsoredListingsSection() {
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <svg
              className="w-5 h-5 text-gray-900"
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
        <div className="grid md:grid-cols-3 gap-4">
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

  if (listings.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "45px 0",
      }}
    >
      {/* Header with star icon and title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginBottom: "29px",
        }}
      >
        {/* Star icon SVG */}
        <svg
          width="29"
          height="29"
          viewBox="0 0 39 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0 }}
        >
          <path
            d="M19.5 3L24.5 13.5L36 15.5L27.75 23.5L29.5 35L19.5 29.5L9.5 35L11.25 23.5L3 15.5L14.5 13.5L19.5 3Z"
            fill="#FFD700"
            stroke="#FFA500"
            strokeWidth="2"
          />
        </svg>
        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "26px",
            color: "#0d1b2a",
            margin: 0,
          }}
        >
          Sponsored Listing
        </h2>
        <div
          style={{
            background: "#FFF1C2",
            borderRadius: "4px",
            padding: "2px 13px",
            marginLeft: "15px",
          }}
        >
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: "15px",
              color: "#0d1b2a",
            }}
          >
            Featured
          </span>
        </div>
      </div>

      {/* Products grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 276px)",
          gap: "24px",
          justifyContent: "space-between",
        }}
      >
        {listings.map((listing, index) => (
          <Link
            key={listing?.productId || index}
            href={`/product/${listing?.slug || "unknown"}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                width: "276px",
                height: "321px",
                background: "white",
                borderRadius: "15px",
                boxShadow: "0px 0px 10px 0px rgba(24,181,34,0.25)",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Product image */}
              <div
                style={{
                  width: "260px",
                  height: "152px",
                  margin: "8px",
                  borderRadius: "15px",
                  overflow: "hidden",
                  background: "#f5f5f5",
                }}
              >
                {listing?.image ? (
                  <img
                    src={listing.image}
                    alt={listing?.title || "Sponsored Product"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : null}
              </div>

              {/* Product details */}
              <div style={{ padding: "20px" }}>
                <h3
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "#0d1b2a",
                    margin: "0 0 8px 0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {listing?.title || "Sponsored Product"}
                </h3>

                {/* Location and rating */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "100px",
                    marginBottom: "22px",
                  }}
                >
                  {/* Location */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <img
                      src="https://www.figma.com/api/mcp/asset/5a9dfa56-d9fc-4ee5-94da-e1b350476bfb"
                      alt="Location"
                      style={{ width: "17px", height: "18px" }}
                    />
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        fontSize: "12px",
                        color: "#787878",
                      }}
                    >
                      {listing?.city || "Unknown"}
                    </span>
                  </div>

                  {/* 5 stars */}
                  <div style={{ display: "flex", gap: "4px" }}>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                      fontSize: "22px",
                      color: "#1e3a8a",
                    }}
                  >
                    ₹{(listing?.price || 0).toLocaleString("en-IN")}
                  </span>
                  {listing?.originalPrice &&
                    listing.originalPrice > (listing.price || 0) && (
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 500,
                          fontSize: "16px",
                          color: "#787878",
                          textDecoration: "line-through",
                        }}
                      >
                        ₹{listing.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                </div>

                {/* View Deal button */}
                <button
                  style={{
                    width: "219px",
                    height: "38px",
                    background: "#1e3a8a",
                    borderRadius: "11px",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "15px",
                    color: "white",
                    margin: "0 auto",
                    display: "block",
                  }}
                >
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
