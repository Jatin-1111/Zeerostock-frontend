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
        const items = response.data.items || [];
        setItems(items);
      } else {
        console.error("API response not successful:", response);
        setError(response.message || "Failed to load wishlist");
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
          prev.filter((item) => item.product?.id !== productId)
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
      (item) => item.product?.status !== "active"
    );
    if (unavailable.length === 0) {
      alert("No unavailable items to clear");
      return;
    }
    if (!confirm("Clear all unavailable items?")) return;

    for (const item of unavailable) {
      if (item.product?.id) {
        await handleRemove(item.product.id);
      }
    }
  };

  const getPriceChange = (item: WatchlistItem) => {
    if (!item.priceAtAdd || !item.product?.priceAfter) return null;

    const priceDiff = item.product?.priceAfter - item.priceAtAdd;
    const percentChange = (priceDiff / item.priceAtAdd) * 100;

    return {
      amount: Math.abs(priceDiff),
      percent: Math.abs(percentChange),
      isIncrease: priceDiff > 0,
    };
  };

  return (
    <div className="min-h-screen bg-[#eefbf6] px-[60px] py-[45px]">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="mb-[30px] flex justify-between items-center">
          <h1 className="text-[27px] font-semibold text-[#0d1b2a] m-0">
            My Wishlist
          </h1>
          <button
            onClick={clearUnavailableItems}
            className="text-[12px] font-semibold text-[#1e3a8a] bg-transparent border-none cursor-pointer px-3 py-1.5"
          >
            Clear Unavailable Items
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-[23px] p-[15px] bg-[#fee] border border-[#fcc] text-[#c33] rounded-lg text-xs">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(263px,1fr))] gap-[23px]">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-[#fbfbfb] rounded-[11px] p-[19px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.15)]"
              >
                <div className="w-full aspect-[4/3] bg-[#e5e5e5] rounded-lg mb-[15px] animate-pulse" />
                <div className="h-[15px] bg-[#e5e5e5] rounded mb-[9px] animate-pulse" />
                <div className="h-[15px] bg-[#e5e5e5] rounded w-3/4 animate-pulse" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          /* Empty State */
          <div className="text-center py-[75px]">
            <div className="inline-flex items-center justify-center w-[60px] h-[60px] mb-[23px]">
              <Heart className="w-[60px] h-[60px] text-[#9c9c9c]" />
            </div>
            <h2 className="text-2xl font-semibold text-[#0d1b2a] mb-[11px]">
              Your wishlist is empty
            </h2>
            <p className="text-[13.5px] text-[#9c9c9c] mb-[30px]">
              Start adding products to your wishlist to keep track of items you
              love
            </p>
            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center bg-[#1e3a8a] text-white px-[30px] py-[11px] rounded-lg text-[13.5px] font-semibold no-underline transition-colors hover:bg-[#152d6b]"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-[repeat(auto-fill,minmax(263px,1fr))] gap-[23px]">
            {items.map((item) => {
              // Skip items without product data
              if (!item.product) {
                console.warn("Item without product data:", item);
                return null;
              }

              const priceChange = getPriceChange(item);
              const isAvailable = item.product?.status === "active";

              return (
                <div
                  key={item.id}
                  className="bg-[#fbfbfb] rounded-[11px] p-[19px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.15)] relative flex flex-col"
                >
                  {/* Product Image */}
                  <Link
                    href={`/product/${item.product?.slug || ""}`}
                    className="no-underline"
                  >
                    <div className="relative w-full aspect-[4/3] bg-[#f0f0f0] rounded-lg overflow-hidden mb-[15px]">
                      {item.product?.imageUrl ? (
                        <img
                          src={item.product?.imageUrl}
                          alt={item.product?.title || "Product"}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#9c9c9c] text-base">
                          No Image
                        </div>
                      )}
                      {!isAvailable && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white text-xl font-semibold ">
                            Not Available
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Remove & Heart Buttons */}
                  <button
                    onClick={() =>
                      item.product?.id && handleRemove(item.product?.id)
                    }
                    disabled={removingId === item.product?.id || !isAvailable}
                    className={`absolute top-[26px] left-[26px] bg-white text-black border-2 border-[#0d1b2a] rounded-md p-1.5 flex items-center justify-center ${
                      removingId === item.product?.id
                        ? "cursor-wait"
                        : "cursor-pointer"
                    } ${!isAvailable ? "opacity-50" : "opacity-100"}`}
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="absolute top-[26px] right-[26px] bg-white rounded-md p-1.5 flex items-center justify-center border-2 border-[#0d1b2a]">
                    <Heart className="w-3.5 h-3.5 fill-[#0d1b2a] text-[#0d1b2a]" />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col">
                    <Link
                      href={`/product/${item.product?.slug || ""}`}
                      className="no-underline mb-[9px]"
                    >
                      <h3 className="text-[15px] font-semibold text-[#0d1b2a] m-0 leading-[1.4] hover:text-[#1e3a8a]">
                        {item.product?.title || "Unknown Product"}
                      </h3>
                    </Link>

                    {/* Location */}
                    {(item.product?.city || item.product?.state) && (
                      <p className="text-[11px] text-[#9c9c9c] m-0 mb-[11px]">
                        {item.product?.city}
                        {item.product?.city && item.product?.state && ", "}
                        {item.product?.state}
                      </p>
                    )}

                    {/* Price */}
                    <div className="mb-[11px]">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[21px] font-semibold text-[#0d1b2a]">
                          ₹{item.product.priceAfter?.toLocaleString()}
                        </span>
                        {item.product?.priceBefore &&
                          item.product?.priceBefore >
                            (item.product?.priceAfter || 0) && (
                            <>
                              <span className="text-xs text-[#9c9c9c] line-through">
                                ₹{item.product?.priceBefore?.toLocaleString()}
                              </span>
                              {item.product?.discountPercent && (
                                <span className="bg-[#d4edda] text-[#155724] text-[11px] font-semibold px-2 py-0.5 rounded-[5px]">
                                  {item.product?.discountPercent}% OFF
                                </span>
                              )}
                            </>
                          )}
                      </div>

                      {/* Price Change Since Added */}
                      {priceChange && (
                        <p
                          className={`text-[11px] mt-1.5 m-0 ${
                            priceChange.isIncrease
                              ? "text-[#dc3545]"
                              : "text-[#28a745]"
                          }`}
                        >
                          {priceChange.isIncrease ? "↑" : "↓"}{" "}
                          {priceChange.percent.toFixed(1)}% since added
                        </p>
                      )}
                    </div>

                    {/* Action Button */}
                    {isAvailable ? (
                      <Link
                        href={`/product/${item.product?.slug || ""}`}
                        className="flex items-center justify-center gap-2.5 w-full bg-[#1e3a8a] text-white p-3 rounded-[11px] text-base font-semibold no-underline mt-auto transition-colors hover:bg-[#152d6b]"
                      >
                        <ShoppingCart className="w-[18px] h-[18px]" />
                        View Product
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-[#e5e5e5] text-[#9c9c9c] p-3 rounded-[11px] border-none text-base font-semibold cursor-not-allowed mt-auto"
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
    </div>
  );
}
