"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { cartService } from "@/services/cart.service";
import toast from "react-hot-toast";

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

      // GST is 18% (typically included in price)
      const tax = (subtotal * 0.18) / 1.18;

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
        toast.success("Coupon applied successfully!");
        // Update discount from response
        if (response.data?.discount) {
          setSummary((prev) => ({
            ...prev,
            couponDiscount: response.data?.discount || 0,
          }));
        }
      }
    } catch (error) {
      toast.error("Failed to apply coupon");
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
    <div className="space-y-6">
      {/* Promo Code */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Promo Code</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter Promo Code"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button
            onClick={handleApplyCoupon}
            disabled={isApplyingCoupon}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isApplyingCoupon ? "Applying..." : "Apply"}
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal ({summary.itemCount} items)</span>
            <span className="font-semibold">
              ₹{" "}
              {summary.subtotal.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          {summary.savings > 0 && (
            <div className="flex justify-between text-gray-700">
              <span>Total Savings</span>
              <span className="font-semibold text-green-600">
                -₹{" "}
                {summary.savings.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          )}
          {summary.couponDiscount > 0 && (
            <div className="flex justify-between text-gray-700">
              <span>Coupon Discount</span>
              <span className="font-semibold text-green-600">
                -₹{" "}
                {summary.couponDiscount.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          )}
          <div className="flex justify-between text-gray-700">
            <span>Estimated Tax (GST)</span>
            <span className="font-semibold">
              ₹{" "}
              {summary.tax.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Shipping</span>
            <span className="font-semibold text-green-600">
              {summary.shipping === 0
                ? "Free"
                : `₹ ${summary.shipping.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}`}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xl font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-gray-900">
              ₹{" "}
              {summary.total.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={!items || items.length === 0}
          className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed to Checkout
        </button>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <svg
            className="w-5 h-5 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>Secure checkout with 256-bit SSL encryption</span>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-blue-600">
            {summary.subtotal > 25000
              ? "🎉 You qualify for free shipping!"
              : `Add ₹${(25000 - summary.subtotal).toLocaleString(
                  "en-IN"
                )} more for free shipping`}
          </p>
        </div>
      </div>
    </div>
  );
}
