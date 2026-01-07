"use client";

import CartItems from "@/components/cart/CartItems";
import OrderSummary from "@/components/cart/OrderSummary";
import RelatedProducts from "@/components/cart/RelatedProducts";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export default function CartPage() {
  const { items } = useCartStore();
  const itemCount = items?.length || 0;

  return (
    <div className="min-h-screen bg-[#EEFBF6]">
      <div className="w-full px-4.5 md:px-15 py-7.5">
        {/* Page Header */}
        <div className="mb-6 bg-white rounded-2xl shadow-sm px-6 py-4.5 flex items-center justify-between">
          <div className="flex items-center gap-4.5">
            {/* Cart Icon */}
            <div className="w-10.5 h-10.5 bg-[#EEFBF6] rounded-lg flex items-center justify-center">
              <ShoppingCart
                className="w-6 h-6 text-[#2aae7a]"
                strokeWidth={2}
              />
            </div>

            {/* Title Section */}
            <div>
              <h1 className="text-2xl font-semibold text-[#0d1b2a] mb-0.75">
                Shopping Cart
              </h1>
              <p className="text-xs text-[#9c9c9c]">
                {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
              </p>
            </div>
          </div>

          {/* Browse Button */}
          <button className="px-6 py-2 bg-white border-2 border-[#1e3a8a] text-[#1e3a8a] rounded-xl text-xs font-semibold hover:bg-[#1e3a8a] hover:text-white transition-colors">
            Browse More Items
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4.5">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            <CartItems />
          </div>

          {/* Right Column - Order Summary & Related Products */}
          <div className="flex flex-col gap-4.5">
            <OrderSummary />
            <RelatedProducts />
          </div>
        </div>
      </div>
    </div>
  );
}
