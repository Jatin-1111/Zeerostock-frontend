"use client";

import { useCartStore } from "@/stores/cartStore";
import { useState } from "react";

/**
 * Cart Debug Panel
 * Add this component to your cart page during development to see real-time state
 * Remove or hide in production
 *
 * Usage: <CartDebugPanel />
 */
export default function CartDebugPanel() {
  const { cart, loading, error, items, itemCount, pricing } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  // Initialize sessionId directly from localStorage
  const getSessionId = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("zeerostock_guest_session") || "No session";
    }
    return "No session";
  };

  const sessionId = getSessionId();

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 z-50"
      >
        🐛 Debug Cart
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-blue-600 rounded-lg shadow-xl p-4 max-w-md max-h-96 overflow-auto z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">Cart Debug Panel</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3 text-sm">
        {/* Session Info */}
        <div className="border-b pb-2">
          <h4 className="font-semibold text-blue-600">Session</h4>
          <p className="text-xs break-all font-mono">{sessionId}</p>
        </div>

        {/* Loading State */}
        <div className="border-b pb-2">
          <h4 className="font-semibold text-blue-600">State</h4>
          <p>
            Loading:{" "}
            <span className={loading ? "text-yellow-600" : "text-green-600"}>
              {loading ? "Yes" : "No"}
            </span>
          </p>
          {error && <p className="text-red-600">Error: {error}</p>}
        </div>

        {/* Cart Summary */}
        <div className="border-b pb-2">
          <h4 className="font-semibold text-blue-600">Cart Summary</h4>
          <p>Item Count: {itemCount}</p>
          <p>Items Array Length: {items?.length || 0}</p>
        </div>

        {/* Items */}
        <div className="border-b pb-2">
          <h4 className="font-semibold text-blue-600">Items</h4>
          {items && items.length > 0 ? (
            <ul className="space-y-1 max-h-32 overflow-y-auto">
              {items.map((item, idx) => (
                <li
                  key={idx}
                  className="text-xs border-l-2 border-blue-300 pl-2"
                >
                  <p className="font-medium">{item.title}</p>
                  <p>ID: {item.itemId}</p>
                  <p>
                    Qty: {item.quantity} × ₹{item.price}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No items</p>
          )}
        </div>

        {/* Pricing */}
        <div className="border-b pb-2">
          <h4 className="font-semibold text-blue-600">Pricing</h4>
          {pricing ? (
            <div className="text-xs">
              <p>Subtotal: ₹{pricing.subtotal?.toFixed(2) || 0}</p>
              <p>GST: ₹{pricing.gst?.toFixed(2) || 0}</p>
              <p>Shipping: ₹{pricing.shipping?.toFixed(2) || 0}</p>
              <p>Platform Fee: ₹{pricing.platformFee?.toFixed(2) || 0}</p>
              <p className="font-bold">
                Total: ₹{pricing.total?.toFixed(2) || 0}
              </p>
              {pricing.savings && pricing.savings > 0 && (
                <p className="text-green-600">
                  Savings: ₹{pricing.savings.toFixed(2)}
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">No pricing</p>
          )}
        </div>

        {/* Raw Cart Object */}
        <details className="text-xs">
          <summary className="cursor-pointer font-semibold text-blue-600">
            Raw Cart Object
          </summary>
          <pre className="mt-2 p-2 bg-gray-100 rounded overflow-x-auto">
            {JSON.stringify(cart, null, 2)}
          </pre>
        </details>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              localStorage.removeItem("zeerostock_guest_session");
              window.location.reload();
            }}
            className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
          >
            Clear Session
          </button>
          <button
            onClick={() => {
              console.log("Cart State:", useCartStore.getState());
              alert("Check console for cart state");
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
          >
            Log State
          </button>
        </div>
      </div>
    </div>
  );
}
