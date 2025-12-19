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

  const getPriceChange = (item: WatchlistItem) => {
    if (!item.priceAtAdd || !item.product.priceAfter) return null;

    const change = item.product.priceAfter - item.priceAtAdd;
    const percentChange = (change / item.priceAtAdd) * 100;

    if (Math.abs(percentChange) < 1) return null;

    return {
      amount: change,
      percent: percentChange,
      isIncrease: change > 0,
    };
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          {items.length > 0 && (
            <button
              onClick={async () => {
                if (confirm("Clear all unavailable items?")) {
                  try {
                    await buyerService.clearUnavailableItems();
                    fetchWatchlist();
                  } catch (err) {
                    console.error("Failed to clear unavailable items:", err);
                    alert("Failed to clear unavailable items");
                  }
                }
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Clear Unavailable Items
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white border-2 border-gray-900 rounded overflow-hidden"
              >
                <div className="bg-gray-200 aspect-4/3 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Start adding products to your wishlist to keep track of items you
              love
            </p>
            <Link
              href="/marketplace"
              className="inline-block px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-800"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => {
              const priceChange = getPriceChange(item);
              return (
                <div
                  key={item.id}
                  className="bg-white border-2 border-gray-900 rounded overflow-hidden"
                >
                  {/* Product Image */}
                  <Link href={`/product/${item.product.slug}`}>
                    <div className="relative bg-gray-100 aspect-4/3 flex items-center justify-center overflow-hidden group">
                      {item.product.imageUrl ? (
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">No Image</span>
                      )}

                      {item.product.status !== "active" && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-bold">
                            Not Available
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>

                  <button
                    onClick={() => handleRemove(item.product.id)}
                    disabled={removingId === item.product.id}
                    className="absolute top-4 left-4 p-2 bg-white border border-gray-900 rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4 text-gray-900" />
                  </button>
                  <button className="absolute top-4 right-4 p-2 bg-white rounded hover:bg-gray-50">
                    <Heart className="w-5 h-5 text-gray-900 fill-gray-900" />
                  </button>

                  {/* Product Details */}
                  <div className="p-4">
                    <Link href={`/product/${item.product.slug}`}>
                      <h3 className="font-bold text-gray-900 mb-1 hover:text-blue-600">
                        {item.product.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-3">
                      {item.product.city}, {item.product.state}
                    </p>

                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{item.product.priceAfter?.toLocaleString("en-IN")}
                      </span>
                      {item.product.priceBefore &&
                        item.product.priceBefore > item.product.priceAfter && (
                          <>
                            <span className="text-sm text-gray-400 line-through">
                              ₹
                              {item.product.priceBefore.toLocaleString("en-IN")}
                            </span>
                            <span className="text-sm text-green-600 font-medium">
                              {item.product.discountPercent}% off
                            </span>
                          </>
                        )}
                    </div>

                    {priceChange && (
                      <div
                        className={`text-xs mb-3 ${
                          priceChange.isIncrease
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {priceChange.isIncrease ? "↑" : "↓"}
                        {Math.abs(priceChange.percent).toFixed(1)}% since added
                      </div>
                    )}

                    {item.product.status === "active" &&
                    item.product.quantity > 0 ? (
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="w-full px-4 py-2 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        View Product
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="w-full px-4 py-2 bg-gray-300 text-gray-500 rounded font-medium cursor-not-allowed"
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
