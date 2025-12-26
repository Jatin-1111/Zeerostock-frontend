"use client";

import { useEffect, useState } from "react";
import { Trash2, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { buyerService } from "@/services/buyer.service";
import type { WatchlistItem } from "@/types/buyer.types";

export default function WishlistPage() {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await buyerService.getWatchlist({ page: 1, limit: 50 });
      if (response.success && response.data) {
        setItems(response.data.items || []);
      }
    } catch (err) {
      console.error("Error fetching watchlist:", err);
      setError("Failed to load wishlist");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (productId: string) => {
    if (!confirm("Remove this item from your wishlist?")) return;

    try {
      setRemovingId(productId);
      const response = await buyerService.removeFromWatchlist(productId);
      if (response.success) {
        setItems((prev) =>
          prev.filter((item) => item.product.id !== productId)
        );
      }
    } catch (err) {
      console.error("Error removing from watchlist:", err);
      alert("Failed to remove item from wishlist");
    } finally {
      setRemovingId(null);
    }
  };

  const clearUnavailableItems = async () => {
    const unavailable = items.filter(
      (item) => item.product.status !== "active"
    );
    if (unavailable.length === 0) {
      alert("No unavailable items to clear");
      return;
    }
    if (!confirm("Clear all unavailable items?")) return;

    for (const item of unavailable) {
      await handleRemove(item.product.id);
    }
  };

  const getPriceChange = (item: WatchlistItem) => {
    if (!item.priceAtAdd || !item.product.priceAfter) return null;

    const priceDiff = item.product.priceAfter - item.priceAtAdd;
    const percentChange = (priceDiff / item.priceAtAdd) * 100;

    return {
      amount: Math.abs(priceDiff),
      percent: Math.abs(percentChange),
      isIncrease: priceDiff > 0,
    };
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#eefbf6",
        padding: "45px 60px",
      }}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            marginBottom: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "27px",
              fontWeight: 600,
              fontFamily: "Poppins, sans-serif",
              color: "#0d1b2a",
              margin: 0,
            }}
          >
            My Wishlist
          </h1>
          <button
            onClick={clearUnavailableItems}
            style={{
              fontSize: "12px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              color: "#1e3a8a",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "6px 12px",
            }}
          >
            Clear Unavailable Items
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              marginBottom: "23px",
              padding: "15px",
              backgroundColor: "#fee",
              border: "1px solid #fcc",
              color: "#c33",
              borderRadius: "8px",
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
            }}
          >
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(263px, 1fr))",
              gap: "23px",
            }}
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#fbfbfb",
                  borderRadius: "11px",
                  padding: "19px",
                  boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.15)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    backgroundColor: "#e5e5e5",
                    borderRadius: "8px",
                    marginBottom: "15px",
                    animation: "pulse 2s infinite",
                  }}
                />
                <div
                  style={{
                    height: "15px",
                    backgroundColor: "#e5e5e5",
                    borderRadius: "4px",
                    marginBottom: "9px",
                    animation: "pulse 2s infinite",
                  }}
                />
                <div
                  style={{
                    height: "15px",
                    backgroundColor: "#e5e5e5",
                    borderRadius: "4px",
                    width: "75%",
                    animation: "pulse 2s infinite",
                  }}
                />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          /* Empty State */
          <div style={{ textAlign: "center", padding: "75px 0" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "60px",
                height: "60px",
                marginBottom: "23px",
              }}
            >
              <Heart
                style={{ width: "60px", height: "60px", color: "#9c9c9c" }}
              />
            </div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 600,
                fontFamily: "Poppins, sans-serif",
                color: "#0d1b2a",
                marginBottom: "11px",
              }}
            >
              Your wishlist is empty
            </h2>
            <p
              style={{
                fontSize: "13.5px",
                fontFamily: "Inter, sans-serif",
                color: "#9c9c9c",
                marginBottom: "30px",
              }}
            >
              Start adding products to your wishlist to keep track of items you
              love
            </p>
            <Link
              href="/marketplace"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#1e3a8a",
                color: "white",
                padding: "11px 30px",
                borderRadius: "8px",
                fontSize: "13.5px",
                fontWeight: 600,
                fontFamily: "Poppins, sans-serif",
                textDecoration: "none",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#152d6b";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#1e3a8a";
              }}
            >
              Browse Products
            </Link>
          </div>
        ) : (
          /* Product Grid */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(263px, 1fr))",
              gap: "23px",
            }}
          >
            {items.map((item) => {
              const priceChange = getPriceChange(item);
              const isAvailable = item.product.status === "active";

              return (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: "#fbfbfb",
                    borderRadius: "11px",
                    padding: "19px",
                    boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.15)",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Product Image */}
                  <Link
                    href={`/product/${item.product.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "4/3",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "8px",
                        overflow: "hidden",
                        marginBottom: "15px",
                      }}
                    >
                      {item.product.imageUrl ? (
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
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
                            color: "#9c9c9c",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "16px",
                          }}
                        >
                          No Image
                        </div>
                      )}
                      {!isAvailable && (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span
                            style={{
                              color: "white",
                              fontSize: "20px",
                              fontWeight: 600,
                              fontFamily: "Poppins, sans-serif",
                            }}
                          >
                            Not Available
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Remove & Heart Buttons */}
                  <button
                    onClick={() => handleRemove(item.product.id)}
                    disabled={removingId === item.product.id || !isAvailable}
                    style={{
                      position: "absolute",
                      top: "26px",
                      left: "26px",
                      backgroundColor: "white",
                      border: "2px solid #0d1b2a",
                      borderRadius: "6px",
                      padding: "6px",
                      cursor:
                        removingId === item.product.id ? "wait" : "pointer",
                      opacity: !isAvailable ? 0.5 : 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    title="Remove from wishlist"
                  >
                    <Trash2 style={{ width: "14px", height: "14px" }} />
                  </button>

                  <div
                    style={{
                      position: "absolute",
                      top: "26px",
                      right: "26px",
                      backgroundColor: "white",
                      borderRadius: "6px",
                      padding: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Heart
                      style={{
                        width: "14px",
                        height: "14px",
                        fill: "#0d1b2a",
                        color: "#0d1b2a",
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Link
                      href={`/product/${item.product.slug}`}
                      style={{ textDecoration: "none", marginBottom: "9px" }}
                    >
                      <h3
                        style={{
                          fontSize: "15px",
                          fontWeight: 600,
                          fontFamily: "Poppins, sans-serif",
                          color: "#0d1b2a",
                          margin: 0,
                          lineHeight: "1.4",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#1e3a8a";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "#0d1b2a";
                        }}
                      >
                        {item.product.title}
                      </h3>
                    </Link>

                    {/* Location */}
                    {(item.product.city || item.product.state) && (
                      <p
                        style={{
                          fontSize: "11px",
                          fontFamily: "Inter, sans-serif",
                          color: "#9c9c9c",
                          margin: "0 0 11px 0",
                        }}
                      >
                        {item.product.city}
                        {item.product.city && item.product.state && ", "}
                        {item.product.state}
                      </p>
                    )}

                    {/* Price */}
                    <div style={{ marginBottom: "11px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "21px",
                            fontWeight: 600,
                            fontFamily: "Poppins, sans-serif",
                            color: "#0d1b2a",
                          }}
                        >
                          ₹{item.product.priceAfter?.toLocaleString()}
                        </span>
                        {item.product.priceBefore &&
                          item.product.priceBefore >
                            item.product.priceAfter && (
                            <>
                              <span
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Inter, sans-serif",
                                  color: "#9c9c9c",
                                  textDecoration: "line-through",
                                }}
                              >
                                ₹{item.product.priceBefore.toLocaleString()}
                              </span>
                              {item.product.discountPercent && (
                                <span
                                  style={{
                                    backgroundColor: "#d4edda",
                                    color: "#155724",
                                    fontSize: "11px",
                                    fontWeight: 600,
                                    fontFamily: "Inter, sans-serif",
                                    padding: "3px 8px",
                                    borderRadius: "5px",
                                  }}
                                >
                                  {item.product.discountPercent}% OFF
                                </span>
                              )}
                            </>
                          )}
                      </div>

                      {/* Price Change Since Added */}
                      {priceChange && (
                        <p
                          style={{
                            fontSize: "11px",
                            fontFamily: "Inter, sans-serif",
                            marginTop: "6px",
                            margin: 0,
                            color: priceChange.isIncrease
                              ? "#dc3545"
                              : "#28a745",
                          }}
                        >
                          {priceChange.isIncrease ? "↑" : "↓"}{" "}
                          {priceChange.percent.toFixed(1)}% since added
                        </p>
                      )}
                    </div>

                    {/* Action Button */}
                    {isAvailable ? (
                      <Link
                        href={`/product/${item.product.slug}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                          width: "100%",
                          backgroundColor: "#1e3a8a",
                          color: "white",
                          padding: "12px",
                          borderRadius: "11px",
                          fontSize: "16px",
                          fontWeight: 600,
                          fontFamily: "Poppins, sans-serif",
                          textDecoration: "none",
                          marginTop: "auto",
                          transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#152d6b";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#1e3a8a";
                        }}
                      >
                        <ShoppingCart
                          style={{ width: "18px", height: "18px" }}
                        />
                        View Product
                      </Link>
                    ) : (
                      <button
                        disabled
                        style={{
                          width: "100%",
                          backgroundColor: "#e5e5e5",
                          color: "#9c9c9c",
                          padding: "12px",
                          borderRadius: "11px",
                          border: "none",
                          fontSize: "16px",
                          fontWeight: 600,
                          fontFamily: "Poppins, sans-serif",
                          cursor: "not-allowed",
                          marginTop: "auto",
                        }}
                      >
                        Not Available
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Keyframes for pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
