"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { cartService } from "@/services/cart.service";
import { toast } from "sonner";
import { Shield, Truck } from "lucide-react";

export default function OrderSummary() {
  const router = useRouter();
  const { items } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [summary, setSummary] = useState({
    itemCount: 0,
    subtotal: 0,
    savings: 0,
    tax: 0,
    shipping: 0,
    total: 0,
    couponDiscount: 0,
  });

  useEffect(() => {
    // Calculate summary from cart items
    if (items && items.length > 0) {
      const itemCount = items.length;
      const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const savings = items.reduce((sum, item) => {
        if (item.originalPrice && item.originalPrice > item.price) {
          return sum + (item.originalPrice - item.price) * item.quantity;
        }
        return sum;
      }, 0);

      // GST is 18% on subtotal
      const tax = subtotal * 0.18;

      // Free shipping for orders > 25000
      const shipping = subtotal > 25000 ? 0 : 500;

      const total = subtotal + shipping - summary.couponDiscount;

      setSummary({
        itemCount,
        subtotal,
        savings,
        tax,
        shipping,
        total,
        couponDiscount: summary.couponDiscount,
      });
    } else {
      setSummary({
        itemCount: 0,
        subtotal: 0,
        savings: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        couponDiscount: 0,
      });
    }
  }, [items, summary.couponDiscount]);

  const handleApplyCoupon = async () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }

    setIsApplyingCoupon(true);
    try {
      const response = await cartService.applyCoupon(promoCode);
      if (response.success && response.data) {
        // Toast is handled by cartStore
        // Update discount from response
        if (response.data?.discount) {
          setSummary((prev) => ({
            ...prev,
            couponDiscount: response.data?.discount || 0,
          }));
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleCheckout = () => {
    if (!items || items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    router.push("/buyer/checkout");
  };

  return (
    <div className="w-full space-y-2 sm:space-y-2.5 md:space-y-3">
      {/* Order Summary */}
      <div className="w-full bg-white rounded-xl sm:rounded-2xl shadow-md p-2 sm:p-3 md:p-4">
        <h3 className="text-xs sm:text-xs md:text-sm font-medium text-[#0d1b2a] mb-2 sm:mb-2.5 md:mb-3">
          Order Summary
        </h3>

        <div className="space-y-2 sm:space-y-2.5 mb-2.5 sm:mb-3 md:mb-3.5">
          <div className="flex justify-between items-center text-xs sm:text-xs md:text-sm">
            <span className="font-medium text-[#9c9c9c]">
              Subtotal ({summary.itemCount} items)
            </span>
            <span className="font-semibold text-[#bebebe] tracking-wide">
              ₹{summary.subtotal.toLocaleString("en-IN")}
            </span>
          </div>
          {summary.savings > 0 && (
            <div className="flex justify-between items-center text-xs sm:text-xs md:text-sm">
              <span className="font-medium text-[#2aae7a]">Total Saving</span>
              <span className="font-semibold text-[#2aae7a] tracking-wide">
                -₹{summary.savings.toLocaleString("en-IN")}
              </span>
            </div>
          )}
          {summary.couponDiscount > 0 && (
            <div className="flex justify-between items-center text-xs sm:text-xs md:text-sm">
              <span className="font-medium text-[#2aae7a]">
                Coupon Discount
              </span>
              <span className="font-semibold text-[#2aae7a] tracking-wide">
                -₹{summary.couponDiscount.toLocaleString("en-IN")}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center text-xs sm:text-xs md:text-sm">
            <span className="font-medium text-[#9c9c9c]">Estimated Tax</span>
            <span className="font-semibold text-[#bebebe] tracking-wide">
              ₹{summary.tax.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs sm:text-xs md:text-sm">
            <span className="font-medium text-[#9c9c9c]">Shipping</span>
            <span className="font-semibold text-[#2aae7a] tracking-wide">
              {summary.shipping === 0
                ? "Free"
                : `₹${summary.shipping.toLocaleString("en-IN")}`}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-2 sm:pt-2.5 md:pt-3 mb-3 sm:mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm sm:text-base md:text-lg font-semibold text-[#0d1b2a]">
              Total :
            </span>
            <span className="text-sm sm:text-base md:text-lg font-semibold text-[#1e3a8a] tracking-wide">
              ₹{summary.total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={!items || items.length === 0}
          className="w-full h-8 sm:h-9 md:h-10 bg-[#1e3a8a] text-white text-xs sm:text-sm md:text-base font-semibold rounded-lg sm:rounded-xl hover:bg-[#152d6b] transition-colors mb-2.5 sm:mb-3 md:mb-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed to Checkout
        </button>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Shield className="w-3.5 h-3.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-[#bebebe]" />
            <span className="text-xs sm:text-xs md:text-xs font-medium text-[#bebebe] tracking-wide">
              SSL Secure Checkout
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Truck className="w-3.5 h-3.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-[#bebebe]" />
            <span className="text-xs sm:text-xs md:text-xs font-medium text-[#bebebe] tracking-wide">
              Fast Shipping Options
            </span>
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div className="w-full bg-white rounded-xl sm:rounded-2xl shadow-md p-2 sm:p-3 md:p-4">
        <h3 className="text-xs sm:text-xs md:text-sm font-medium text-[#0d1b2a] mb-2 sm:mb-2.5">
          Have a promo code?
        </h3>
        <div className="flex gap-2 flex-row sm:gap-2.5">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter Code"
            className="h-8 sm:h-9 md:h-10 flex-1 min-w-0 px-2 sm:px-2.5 md:px-3 text-xs sm:text-xs md:text-sm font-medium text-[#0d1b2a] placeholder:text-[#9ca3af] border border-[#bebebe] rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all"
          />
          <button
            onClick={handleApplyCoupon}
            disabled={isApplyingCoupon}
            className="h-8 sm:h-9 md:h-10 sm:w-auto px-4 sm:px-5 md:px-6 bg-[#1e3a8a] text-white text-xs sm:text-xs md:text-sm font-semibold rounded-lg sm:rounded-xl hover:bg-[#152d6b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isApplyingCoupon ? "Applying..." : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
}
