"use client";

import { useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";
import Image from "next/image";

export default function CartItems() {
  const { items, loading, fetchCart, updateQuantity, removeItem } =
    useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (loading) {
    return (
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
        <div className="text-center py-8">
          <p className="text-gray-500">Loading cart items...</p>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
        <div className="text-center py-8">
          <svg
            className="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-500 mb-4">
            Add items to your cart to see them here
          </p>
          <a
            href="/marketplace"
            className="inline-block px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Browse Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900">
            Cart Items ({items.length})
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const discountPercent =
            item.originalPrice && item.originalPrice > item.price
              ? Math.round(
                  ((item.originalPrice - item.price) / item.originalPrice) * 100
                )
              : 0;

          return (
            <div
              key={item.itemId}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded shrink-0 relative overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                      No Image
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      {item.seller?.name && (
                        <p className="text-sm text-gray-600 mb-2">
                          by {item.seller.name}
                          {item.seller.verified && (
                            <span
                              className="ml-1 text-blue-600"
                              title="Verified Seller"
                            >
                              ✓
                            </span>
                          )}
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        {item.condition && (
                          <span className="capitalize">{item.condition}</span>
                        )}
                        {item.category && <span>{item.category}</span>}
                        {item.available !== false &&
                        item.availability?.isAvailable !== false ? (
                          <span className="flex items-center gap-1 text-green-600">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            In Stock
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-600">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            Unavailable
                          </span>
                        )}
                      </div>

                      {/* Warnings */}
                      {item.availability?.priceChanged && (
                        <div className="text-xs text-orange-600 mb-1">
                          ⚠️ Price has changed
                        </div>
                      )}
                      {!item.availability?.isAvailable && (
                        <div className="text-xs text-red-600 mb-1">
                          ❌ This product is no longer available
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl font-bold text-gray-900">
                          ₹{item.price.toFixed(2)}
                        </span>
                        {item.originalPrice &&
                          item.originalPrice > item.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ₹{item.originalPrice.toFixed(2)}
                            </span>
                          )}
                      </div>
                      {discountPercent > 0 && (
                        <p className="text-xs text-gray-600 mb-3">
                          {discountPercent}% OFF
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-700">
                            Quantity:
                          </span>
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              onClick={() => {
                                const newQty = Math.max(1, item.quantity - 1);
                                updateQuantity(item.itemId, newQty);
                              }}
                              disabled={item.quantity <= 1}
                              className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (val && val > 0) {
                                  const maxQty =
                                    item.availability?.currentStock || 999;
                                  const newQty = Math.min(val, maxQty);
                                  if (val > maxQty) {
                                    // Show warning if trying to exceed stock
                                    console.warn(
                                      `Only ${maxQty} units available`
                                    );
                                  }
                                  updateQuantity(item.itemId, newQty);
                                }
                              }}
                              className="w-20 px-2 py-1 text-center border-x border-gray-300 focus:outline-none"
                              min="1"
                              max={item.availability?.currentStock || 999}
                            />
                            <button
                              onClick={() => {
                                const maxQty =
                                  item.availability?.currentStock || 999;
                                const newQty = Math.min(
                                  item.quantity + 1,
                                  maxQty
                                );
                                if (newQty > item.quantity) {
                                  updateQuantity(item.itemId, newQty);
                                }
                              }}
                              disabled={
                                item.availability?.currentStock !== undefined &&
                                item.quantity >= item.availability.currentStock
                              }
                              className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              +
                            </button>
                          </div>
                          {item.availability?.stockChanged && (
                            <p className="text-xs text-orange-600 mt-1">
                              Only {item.availability.currentStock} left in
                              stock
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => removeItem(item.itemId)}
                          className="p-2 text-gray-400 hover:text-red-500"
                          title="Remove item"
                        >
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Item Total
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                      {item.originalPrice &&
                        item.originalPrice > item.price && (
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-sm text-gray-600">
                              You Save
                            </span>
                            <span className="text-sm font-semibold text-green-600">
                              ₹
                              {(
                                (item.originalPrice - item.price) *
                                item.quantity
                              ).toLocaleString()}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
