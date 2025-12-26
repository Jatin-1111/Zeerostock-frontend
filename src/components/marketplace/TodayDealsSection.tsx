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
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "45px 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              background: "#f3f4f6",
              borderRadius: "10px",
            }}
            className="animate-pulse"
          ></div>
          <div
            style={{
              height: "40px",
              width: "300px",
              background: "#f3f4f6",
              borderRadius: "10px",
            }}
            className="animate-pulse"
          ></div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "32px",
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                height: "428px",
                background: "#f3f4f6",
                borderRadius: "20px",
              }}
              className="animate-pulse"
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
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 0" }}>
      {/* Section Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {/* Fire Icon */}
        <div style={{ width: "58px", height: "60px", position: "relative" }}>
          <svg
            width="38"
            height="50"
            viewBox="0 0 38 50"
            style={{ position: "absolute", left: "10px", top: "5px" }}
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
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "35px",
              color: "#0d1b2a",
              margin: "0 0 8px 0",
            }}
          >
            Today's Featured Deals
          </h2>
          <div
            style={{
              display: "inline-block",
              background: "#FFD700",
              padding: "3px 21.5px",
              borderRadius: "5px",
            }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                color: "#0d1b2a",
              }}
            >
              Save up to 70%
            </span>
          </div>
        </div>
      </div>

      {/* Deals Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "32px",
        }}
      >
        {deals.map((deal, index) => (
          <Link
            key={deal?.productId || index}
            href={`/product/${deal?.slug || "unknown"}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "15px",
                boxShadow: "0px 0px 8px 0px rgba(24,181,34,0.25)",
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.2s",
                height: "428px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Product Image */}
              <div
                style={{
                  width: "260px",
                  height: "152px",
                  margin: "8px",
                  borderRadius: "15px",
                  background: "#f3f4f6",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {deal?.image ? (
                  <img
                    src={deal.image}
                    alt={deal?.title || "Deal"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#9ca3af",
                      fontSize: "14px",
                    }}
                  >
                    Product Image
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div style={{ padding: "0 20px" }}>
                {/* Title */}
                <h3
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "#0d1b2a",
                    margin: "12px 0 7px 0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {deal?.title || "Special Deal"}
                </h3>

                {/* Location and Rating */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "14px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <svg width="17" height="18" viewBox="0 0 17 18" fill="none">
                      <path
                        d="M8.5 0C5.5 0 3 2.5 3 5.5C3 9.5 8.5 16 8.5 16C8.5 16 14 9.5 14 5.5C14 2.5 11.5 0 8.5 0ZM8.5 7.5C7.4 7.5 6.5 6.6 6.5 5.5C6.5 4.4 7.4 3.5 8.5 3.5C9.6 3.5 10.5 4.4 10.5 5.5C10.5 6.6 9.6 7.5 8.5 7.5Z"
                        fill="#0d1b2a"
                      />
                    </svg>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        fontSize: "12px",
                        color: "#0d1b2a",
                      }}
                    >
                      {deal?.city || "Mumbai"}, IN
                    </span>
                  </div>

                  {/* Star Rating */}
                  <div style={{ display: "flex", gap: "3px" }}>
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
                <div style={{ marginBottom: "23px" }}>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: "29px",
                      color: "#1e3a8a",
                      marginRight: "12px",
                    }}
                  >
                    ₹{(deal?.price || 15000).toLocaleString("en-IN")}
                  </span>
                  {deal?.originalPrice &&
                    deal.originalPrice > (deal.price || 0) && (
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 700,
                          fontSize: "21px",
                          color: "#787878",
                          textDecoration: "line-through",
                          position: "relative",
                        }}
                      >
                        ₹{deal.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                </div>

                {/* View Deal Button */}
                <div
                  style={{
                    background: "#1e3a8a",
                    borderRadius: "15px",
                    padding: "14px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontSize: "22px",
                      color: "white",
                    }}
                  >
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
