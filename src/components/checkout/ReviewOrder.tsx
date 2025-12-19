"use client";

import Image from "next/image";
import type { Address } from "@/types/buyer.types";
import type { CartItem } from "@/types/api.types";

interface ReviewOrderProps {
  cartItems: CartItem[];
  shippingAddress: Address | null;
  billingAddress: Address | null;
  paymentMethod: string;
  shippingMethod?: string;
  orderNotes: string;
  onNotesChange: (notes: string) => void;
  onBack: () => void;
  onPlaceOrder: () => void;
  isPlacingOrder?: boolean;
}

export default function ReviewOrder({
  cartItems,
  shippingAddress,
  billingAddress,
  paymentMethod,
  shippingMethod = "standard",
  orderNotes,
  onNotesChange,
  onBack,
  onPlaceOrder,
  isPlacingOrder = false,
}: ReviewOrderProps) {
  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="border-2 border-gray-900 rounded p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.itemId}
                className="border-b border-gray-300 pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex justify-between items-start gap-4">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded border border-gray-200"
                    />
                  )}
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {item.category || "Product"}
                    </div>
                    <div className="text-sm text-gray-500">
                      Qty: {item.quantity} @ ₹{item.price.toFixed(2)}
                    </div>
                    {(item.discountPercent ?? 0) > 0 && (
                      <div className="text-xs text-green-600 mt-1">
                        {item.discountPercent}% off
                      </div>
                    )}
                  </div>
                  <div className="text-right font-bold text-gray-900">
                    ₹{(item.quantity * item.price).toFixed(2)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              No items in cart
            </div>
          )}
        </div>
      </div>

      {/* Addresses and Shipping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Address */}
        {shippingAddress && (
          <div className="border-2 border-gray-900 rounded p-6">
            <h3 className="text-base font-bold text-gray-900 mb-3">
              Shipping Address
            </h3>
            <div className="text-sm space-y-1">
              <div className="font-medium">{shippingAddress.contact_name}</div>
              <div>{shippingAddress.contact_phone}</div>
              <div>{shippingAddress.address_line1}</div>
              {shippingAddress.address_line2 && (
                <div>{shippingAddress.address_line2}</div>
              )}
              <div>
                {shippingAddress.city}, {shippingAddress.state} -{" "}
                {shippingAddress.pincode}
              </div>
            </div>
          </div>
        )}

        {/* Billing Address */}
        {billingAddress && (
          <div className="border-2 border-gray-900 rounded p-6">
            <h3 className="text-base font-bold text-gray-900 mb-3">
              Billing Address
            </h3>
            <div className="text-sm space-y-1">
              <div className="font-medium">{billingAddress.contact_name}</div>
              <div>{billingAddress.contact_phone}</div>
              <div>{billingAddress.address_line1}</div>
              {billingAddress.address_line2 && (
                <div>{billingAddress.address_line2}</div>
              )}
              <div>
                {billingAddress.city}, {billingAddress.state} -{" "}
                {billingAddress.pincode}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment and Shipping Method */}
      <div className="grid grid-cols-2 gap-6">
        <div className="border-2 border-gray-900 rounded p-6">
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="w-5 h-5 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <h3 className="text-base font-bold text-gray-900">
              Payment Method
            </h3>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-gray-900">
              {paymentMethod === "cod" && "Cash on Delivery"}
              {paymentMethod === "online" && "Online Payment"}
              {paymentMethod === "upi" && "UPI"}
            </div>
          </div>
        </div>

        <div className="border-2 border-gray-900 rounded p-6">
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="w-5 h-5 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
              />
            </svg>
            <h3 className="text-base font-bold text-gray-900">
              Shipping Method
            </h3>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-gray-900">
              {shippingMethod === "standard" && "Standard Shipping"}
              {shippingMethod === "express" && "Express Shipping"}
              {shippingMethod === "overnight" && "Overnight Delivery"}
            </div>
            <div className="text-sm text-gray-500">
              {shippingMethod === "standard" && "5-7 business days"}
              {shippingMethod === "express" && "2-3 business days"}
              {shippingMethod === "overnight" && "1 business day"}
            </div>
          </div>
        </div>
      </div>

      {/* Order Notes */}
      <div className="border-2 border-gray-900 rounded p-6">
        <label className="block">
          <span className="text-base font-bold text-gray-900 mb-2 block">
            Order Notes (Optional)
          </span>
          <textarea
            value={orderNotes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Special instructions for your order..."
            className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:border-gray-900 focus:outline-none resize-none"
            rows={3}
          />
        </label>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          disabled={isPlacingOrder}
          className="px-6 py-2.5 border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous Step
        </button>
        <button
          onClick={onPlaceOrder}
          disabled={
            isPlacingOrder || !shippingAddress || cartItems.length === 0
          }
          className="px-6 py-2.5 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isPlacingOrder ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Placing Order...
            </>
          ) : (
            "Place Order"
          )}
        </button>
      </div>
    </div>
  );
}
