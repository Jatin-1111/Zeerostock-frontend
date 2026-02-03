"use client";

import { useEffect, useState } from "react";
import { Trash2, Heart, ShoppingCart, Bell, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buyerService } from "@/services/buyer.service";
import { cartService } from "@/services/cart.service";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/utils/currency.utils";
import type { WatchlistItem } from "@/types/buyer.types";

export default function WishlistPage() {
  const router = useRouter();
  const { currency } = useAuth();
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);

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
          prev.filter((item) => item.product?.id !== productId),
        );
      }
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      alert("Failed to remove item from wishlist");
    } finally {
      setRemovingId(null);
    }
  };

  const clearUnavailableItems = async () => {
    const unavailable = items.filter(
      (item) => item.product?.status !== "active",
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

  const handleAddToCart = async (productId: string) => {
    try {
      setAddingToCartId(productId);
      const response = await cartService.addToCart(productId, 1);
      if (response.success) {
        alert("Product added to cart successfully!");
      } else {
        alert(response.message || "Failed to add product to cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart");
    } finally {
      setAddingToCartId(null);
    }
  };

  const handleBuyNow = async (productId: string) => {
    try {
      setAddingToCartId(productId);
      const response = await cartService.addToCart(productId, 1);
      if (response.success) {
        router.push("/buyer/cart");
      } else {
        alert(response.message || "Failed to add product to cart");
      }
    } catch (err) {
      console.error("Error in buy now:", err);
      alert("Failed to proceed with purchase");
    } finally {
      setAddingToCartId(null);
    }
  };

  const getTimeRemaining = (expiresAt: string | null) => {
    if (!expiresAt) return "No expiry";

    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();

    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `${days}d ${hours}h remaining`;
  };

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto">
        {/* Page Title */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-10 pt-3 sm:pt-3.5 md:pt-4 pb-2.5 sm:pb-2.75 md:pb-3">
          <h1 className="text-base sm:text-[17px] md:text-lg font-semibold text-[#0d1b2a] m-0">
            My Wishlist
          </h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 mb-2.5 sm:mb-2.75 md:mb-3 px-2 py-1.5 bg-red-50 border border-red-200 text-red-600 rounded text-xs">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.25 md:gap-3.5 px-4 sm:px-6 md:px-8 lg:px-10">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-[10px] shadow-sm overflow-hidden"
                style={{
                  boxShadow: "0px 0px 2.5px 0px rgba(255,255,255,0.25)",
                }}
              >
                <div className="w-full h-[80px] sm:h-[90px] md:h-[99px] bg-gray-200 animate-pulse" />
                <div className="p-2 sm:p-2.25 md:p-2.5">
                  <div className="h-2.5 sm:h-2.75 md:h-3 bg-gray-200 rounded mb-1.25 sm:mb-1.375 md:mb-1.5 animate-pulse" />
                  <div className="h-2.5 sm:h-2.75 md:h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 sm:py-18 md:py-20 px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-4.5 md:mb-5">
              <Heart className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-gray-400" />
            </div>
            <h2 className="text-sm sm:text-[15px] md:text-base font-semibold text-[#0d1b2a] mb-1.5 sm:mb-1.75 md:mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-xs sm:text-[13px] md:text-sm text-gray-500 mb-5 sm:mb-5.5 md:mb-6">
              Start adding products to your wishlist to keep track of items you
              love
            </p>
            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center bg-[#1e3a8a] text-white px-6 sm:px-7 md:px-8 py-2 sm:py-2.25 md:py-2.5 rounded-lg text-xs sm:text-[13px] md:text-sm font-medium no-underline transition-colors hover:bg-[#152d6b]"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.25 md:gap-3.5 px-4 sm:px-6 md:px-8 lg:px-10 pb-8 sm:pb-9 md:pb-10">
            {items.map((item) => {
              if (!item.product) {
                console.warn("Item without product data:", item);
                return null;
              }

              const priceChange = getPriceChange(item);
              const isAvailable = item.product?.status === "active";

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-[8px] sm:rounded-[9px] md:rounded-[10px] overflow-hidden relative flex flex-col"
                  style={{
                    boxShadow: "0px 0px 3px 0px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  {/* Product Image */}
                  <div className="relative">
                    <Link
                      href={`/product/${item.product?.slug || ""}`}
                      className="block no-underline"
                    >
                      <div className="relative w-full h-[80px] sm:h-[90px] md:h-[99px] bg-gray-100 overflow-hidden">
                        {item.product?.imageUrl ? (
                          <img
                            src={item.product?.imageUrl}
                            alt={item.product?.title || "Product"}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                            No Image
                          </div>
                        )}
                        {!isAvailable && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">
                              Not Available
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Trash Button - Top Left */}
                    <button
                      onClick={() =>
                        item.product?.id && handleRemove(item.product?.id)
                      }
                      disabled={removingId === item.product?.id || !isAvailable}
                      className="absolute top-[4px] sm:top-[4.5px] md:top-[5px] left-[4px] sm:left-[4.5px] md:left-[5px] bg-white/70 backdrop-blur-sm rounded-[13px] sm:rounded-[14px] md:rounded-[15px] p-[4px] sm:p-[4.5px] md:p-[5px] flex items-center justify-center cursor-pointer hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ width: "20px", height: "20px" }}
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-2.5 sm:w-2.75 md:w-3 h-2.5 sm:h-2.75 md:h-3 text-[#0d1b2a]" />
                    </button>

                    {/* Heart Button - Top Right */}
                    <div
                      className="absolute top-[4px] sm:top-[4.5px] md:top-[5px] right-[4px] sm:right-[4.5px] md:right-[5px] bg-white/70 backdrop-blur-sm rounded-[13px] sm:rounded-[14px] md:rounded-[15px] p-[4px] sm:p-[4.5px] md:p-[5px] flex items-center justify-center"
                      style={{ width: "21px", height: "21px" }}
                    >
                      <Heart className="w-3 sm:w-3.25 md:w-3.5 h-3 sm:h-3.25 md:h-3.5 fill-red-500 text-red-500" />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col p-2 sm:p-2.25 md:p-2.5">
                    {/* Product Title */}
                    <Link
                      href={`/product/${item.product?.slug || ""}`}
                      className="no-underline mb-1.25 sm:mb-1.375 md:mb-1.5"
                    >
                      <h3 className="text-[9px] sm:text-[9.5px] md:text-[10px] font-medium text-[#0d1b2a] m-0 leading-tight hover:text-[#1e3a8a]">
                        {item.product?.title || "Unknown Product"}
                      </h3>
                    </Link>

                    {/* Location */}
                    {item.product?.city || item.product?.state ? (
                      <p className="text-[6.5px] sm:text-[6.75px] md:text-[7px] text-[#9c9c9c] m-0 mb-1.5 sm:mb-1.75 md:mb-2">
                        {[item.product?.city, item.product?.state]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    ) : null}

                    {/* Price Section */}
                    <div className="mb-1.5 sm:mb-1.75 md:mb-2">
                      <div className="flex items-center gap-0.75 sm:gap-0.875 md:gap-1 mb-0.5 flex-wrap">
                        <span className="text-[11px] sm:text-[12px] md:text-[13px] font-bold text-[#1e3a8a]">
                          {formatPrice(item.product.priceAfter, currency)}
                        </span>
                      </div>

                      {/* Active Badge */}
                      {isAvailable && (
                        <div className="inline-flex items-center justify-center bg-[#eeffef] rounded-full px-1.25 sm:px-1.375 md:px-1.5 py-0.5 mb-1.25 sm:mb-1.375 md:mb-1.5">
                          <span className="text-[7px] sm:text-[7.25px] md:text-[7.5px] text-[#2aae7a] font-medium">
                            Active
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Price Alerts */}
                    <div className="flex justify-between items-center">
                      {item.priceAtAdd && (
                        <p className="text-[6.5px] sm:text-[6.75px] md:text-[7px] text-[#9c9c9c] m-0 mb-0.75 sm:mb-0.875 md:mb-1">
                          <span>Price alerts </span>
                          <span className="font-bold">
                            {formatPrice(item.priceAtAdd, currency)}
                          </span>
                        </p>
                      )}
                      {/* Time Remaining */}
                      <div className="flex items-center gap-0.75 sm:gap-0.875 md:gap-1 mb-1.25 sm:mb-1.375 md:mb-1.5">
                        <Clock className="w-2 sm:w-2.25 md:w-2.5 h-2 sm:h-2.25 md:h-2.5 text-[#9c9c9c]" />
                        <span className="text-[5.5px] sm:text-[5.75px] md:text-[6px] text-[#9c9c9c]">
                          {getTimeRemaining(item.product?.expiresAt)}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-gray-200 my-1.25 sm:my-1.375 md:my-1.5"></div>

                    {/* Action Buttons Grid */}
                    <div className="grid grid-cols-2 gap-1.25 sm:gap-1.375 md:gap-1.5 mt-auto">
                      {/* Add to Cart */}
                      <button
                        onClick={() =>
                          item.product?.id && handleAddToCart(item.product.id)
                        }
                        disabled={
                          !isAvailable || addingToCartId === item.product?.id
                        }
                        className="border border-[#9c9c9c] bg-white text-[#9c9c9c] rounded-[6.5px] sm:rounded-[7px] md:rounded-[7.5px] px-2 sm:px-2.25 md:px-2.5 py-1.25 sm:py-1.375 md:py-1.5 text-[7.5px] sm:text-[7.75px] md:text-[8px] font-medium hover:border-gray-400 hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {addingToCartId === item.product?.id
                          ? "Adding..."
                          : "Add to cart"}
                      </button>

                      {/* Buy Now */}
                      <button
                        onClick={() =>
                          item.product?.id && handleBuyNow(item.product.id)
                        }
                        disabled={
                          !isAvailable || addingToCartId === item.product?.id
                        }
                        className="bg-[#1e3a8a] text-white rounded-[6.5px] sm:rounded-[7px] md:rounded-[7.5px] px-2 sm:px-2.25 md:px-2.5 py-1.25 sm:py-1.375 md:py-1.5 text-[7.5px] sm:text-[7.75px] md:text-[8px] font-medium hover:bg-[#152d6b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {addingToCartId === item.product?.id
                          ? "Processing..."
                          : "Buy Now"}
                      </button>

                      {/* Alert - Non-functional as requested */}
                      <button
                        disabled
                        className="border border-[#9c9c9c] bg-white text-[#9c9c9c] rounded-[6.5px] sm:rounded-[7px] md:rounded-[7.5px] px-2 sm:px-2.25 md:px-2.5 py-1.25 sm:py-1.375 md:py-1.5 text-[7.5px] sm:text-[7.75px] md:text-[8px] font-medium opacity-50 cursor-not-allowed flex items-center justify-center gap-0.75 sm:gap-0.875 md:gap-1"
                        title="Price alerts coming soon"
                      >
                        <Bell className="w-2 sm:w-2.25 md:w-2.5 h-2 sm:h-2.25 md:h-2.5" />
                        Alert
                      </button>

                      {/* View Details */}
                      <Link
                        href={`/product/${item.product?.slug || ""}`}
                        className="bg-[#1e3a8a] text-white rounded-[6.5px] sm:rounded-[7px] md:rounded-[7.5px] px-2 sm:px-2.25 md:px-2.5 py-1.25 sm:py-1.375 md:py-1.5 text-[7.5px] sm:text-[7.75px] md:text-[8px] font-medium hover:bg-[#152d6b] transition-colors flex items-center justify-center no-underline"
                      >
                        View Details
                      </Link>
                    </div>
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
