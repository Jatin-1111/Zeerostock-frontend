"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Trash2,
  Heart,
  Share2,
  Minus,
  Plus,
  Check,
} from "lucide-react";

export default function CartItems() {
  const { items, loading, fetchCart, updateQuantity, removeItem } =
    useCartStore();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const toggleSelectItem = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(items.map((item) => item.itemId)));
    }
  };

  const removeSelected = () => {
    selectedItems.forEach((itemId) => removeItem(itemId));
    setSelectedItems(new Set());
  };

  if (loading) {
    return (
      <div className="w-full bg-white rounded-2xl shadow-md p-5">
        <div className="text-center py-3">
          <p className="text-gray-500 text-xs">Loading cart items...</p>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="w-full bg-white rounded-2xl shadow-md p-5">
        <div className="text-center py-5">
          <div className="w-6 h-6 mx-auto mb-2 text-gray-300">
            <svg
              className="w-full h-full"
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
          </div>
          <h3 className="text-xs font-semibold text-gray-900 mb-1">
            Your cart is empty
          </h3>
          <p className="text-gray-500 mb-2 text-[10px]">
            Add items to your cart to see them here
          </p>
          <a
            href="/marketplace"
            className="inline-block px-3 py-1 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#17327c] transition-colors text-[10px] font-medium"
          >
            Browse Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-white shadow-sm px-2 py-2 flex items-center justify-between border-b">
        <h2 className="text-xs font-medium text-[#0d1b2a]">
          Cart Items ({items.length})
        </h2>

        <div className="flex items-center gap-2.5">
          {/* Select All */}
          <button
            onClick={toggleSelectAll}
            className="flex items-center gap-1.5 px-2 py-0.5"
          >
            <div
              className={`w-3.5 h-3.5 rounded flex items-center justify-center border-2 transition-colors ${
                selectedItems.size === items.length
                  ? "bg-[#2aae7a] border-[#2aae7a]"
                  : "bg-white border-[#2aae7a]"
              }`}
            >
              {selectedItems.size === items.length && (
                <Check className="w-2 h-2 text-white" strokeWidth={3} />
              )}
            </div>
            <span className="text-sm font-medium text-[#0d1b2a]">
              Select All
            </span>
          </button>

          {/* Remove Selected */}
          {selectedItems.size > 0 && (
            <button
              onClick={removeSelected}
              className="flex items-center gap-1.5 px-4 py-1.5 border-2 border-red-500 rounded-xl bg-white hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-3 h-3 text-red-500" />
              <span className="text-sm font-semibold text-red-500">
                Remove Selected
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-2.5">
        {items.map((item) => {
          const discountPercent =
            item.originalPrice && item.originalPrice > item.price
              ? Math.round(
                  ((item.originalPrice - item.price) / item.originalPrice) * 100
                )
              : 0;

          const isSelected = selectedItems.has(item.itemId);

          return (
            <div
              key={item.itemId}
              className="bg-[#fbfbfb] rounded-2xl shadow-sm p-4 relative"
            >
              {/* Selection Checkbox */}
              <button
                onClick={() => toggleSelectItem(item.itemId)}
                className="absolute top-1.5 left-1.5 z-10"
              >
                <div
                  className={`w-3.5 h-3.5 rounded flex items-center justify-center border-2 transition-colors ${
                    isSelected
                      ? "bg-[#2aae7a] border-[#2aae7a]"
                      : "bg-white border-[#2aae7a]"
                  }`}
                >
                  {isSelected && (
                    <Check className="w-2 h-2 text-white" strokeWidth={3} />
                  )}
                </div>
              </button>

              <div className="flex gap-2.5">
                {/* Product Image */}
                <div className="w-16 h-16 bg-gray-100 rounded-lg shrink-0 relative overflow-hidden">
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

                {/* Product Details */}
                <div className="flex-1">
                  {/* Title and Tags */}
                  <h3 className="text-sm font-semibold text-[#1e3a8a] mb-1.5">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-1.5 mb-1.5">
                    {item.category && (
                      <span className="px-1.5 py-0.5 bg-[#eeffef] text-[#2aae7a] text-xs font-medium rounded-full">
                        {item.category}
                      </span>
                    )}
                    {item.condition && (
                      <span className="px-1.5 py-0.5 bg-[#eeffef] text-[#2aae7a] text-xs font-medium rounded-full capitalize">
                        {item.condition}
                      </span>
                    )}
                  </div>

                  {/* Location and Delivery */}
                  <div className="flex items-center gap-2.5 mb-2.5 text-[#9c9c9c]">
                    {item.seller?.name && (
                      <div className="flex items-center gap-0.5">
                        <MapPin className="w-2 h-2" />
                        <span className="text-xs font-medium">
                          {item.seller.name}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-0.5">
                      <Clock className="w-2 h-2" />
                      <span className="text-xs font-medium">3-5 Days</span>
                    </div>
                  </div>

                  {/* Action Icons */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <button className="p-0 hover:opacity-70 transition-opacity">
                      <Heart className="w-3 h-3 text-[#9c9c9c]" />
                    </button>
                    <button className="p-0 hover:opacity-70 transition-opacity">
                      <Share2 className="w-3 h-3 text-[#9c9c9c]" />
                    </button>
                    <button
                      onClick={() => removeItem(item.itemId)}
                      className="p-0 hover:opacity-70 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3 text-[#9c9c9c]" />
                    </button>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-xs font-medium text-[#9c9c9c]">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-[#2aae7a] rounded-xl overflow-hidden">
                      <button
                        onClick={() => {
                          const newQty = Math.max(1, item.quantity - 1);
                          updateQuantity(item.itemId, newQty);
                        }}
                        disabled={item.quantity <= 1}
                        className="w-6 h-6 bg-[#2aae7a] hover:bg-[#259968] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-3 h-3 text-white" strokeWidth={3} />
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
                            updateQuantity(item.itemId, newQty);
                          }
                        }}
                        className="w-10 h-6 text-center text-xs font-normal text-[#2aae7a] bg-white border-none focus:outline-none"
                        min="1"
                        max={item.availability?.currentStock || 999}
                      />
                      <button
                        onClick={() => {
                          const maxQty = item.availability?.currentStock || 999;
                          const newQty = Math.min(item.quantity + 1, maxQty);
                          if (newQty > item.quantity) {
                            updateQuantity(item.itemId, newQty);
                          }
                        }}
                        disabled={
                          item.availability?.currentStock !== undefined &&
                          item.quantity >= item.availability.currentStock
                        }
                        className="w-6 h-6 bg-[#2aae7a] hover:bg-[#259968] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3 h-3 text-white" strokeWidth={3} />
                      </button>
                    </div>
                    <span className="text-xs text-[#9c9c9c]">
                      (Min: 10, Max: 2000)
                    </span>
                  </div>

                  {/* Warnings */}
                  {item.availability?.priceChanged && (
                    <div className="text-xs text-orange-600 mb-1.5">
                      ⚠️ Price has changed
                    </div>
                  )}
                  {!item.availability?.isAvailable && (
                    <div className="text-xs text-red-600 mb-1.5">
                      ❌ This product is no longer available
                    </div>
                  )}
                  {item.availability?.stockChanged && (
                    <div className="text-xs text-orange-600 mb-1.5">
                      Only {item.availability.currentStock} left in stock
                    </div>
                  )}

                  {/* Divider */}
                  <div className="border-t border-gray-300 mb-2.5"></div>

                  {/* Bottom Row: Item Total */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#9c9c9c] font-medium">
                        Item Total:
                      </span>
                      <span className="text-sm font-medium text-[#1e3a8a] ml-2">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price Column */}
                <div className="flex flex-col items-end gap-1.5">
                  {/* Current Price */}
                  <div className="text-base font-semibold text-[#1e3a8a]">
                    ₹{item.price.toLocaleString()}
                  </div>

                  {/* Original Price */}
                  {item.originalPrice && item.originalPrice > item.price && (
                    <div className="relative text-sm font-semibold text-[#bebebe]">
                      <span>₹{item.originalPrice.toLocaleString()}</span>
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#bebebe] transform -translate-y-1/2"></div>
                    </div>
                  )}

                  {/* Discount Badge */}
                  {discountPercent > 0 && (
                    <div className="text-sm font-semibold text-[#2aae7a]">
                      {discountPercent}% Off
                    </div>
                  )}

                  {/* You Saved Badge */}
                  {item.originalPrice && item.originalPrice > item.price && (
                    <div className="bg-[#eeffef] px-2 py-0.5 rounded-2xl mt-auto">
                      <span className="text-xs font-semibold text-[#2aae7a]">
                        You Saved: ₹
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
          );
        })}
      </div>
    </div>
  );
}
