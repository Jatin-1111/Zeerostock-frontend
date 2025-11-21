"use client";

import { useState } from "react";

interface CartItem {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  quantity: number;
  availability: string;
  shipping: string;
  delivery: string;
}

export default function CartItems() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "Industrial Grade Steel Pipes",
      subtitle: "by SteelCorp USA",
      price: 12.5,
      originalPrice: 18.0,
      quantity: 3000,
      availability: "In Stock",
      shipping: "Truck: 6-8 Days",
      delivery: "Est. 1st Week, Mar, 2025",
    },
    {
      id: 2,
      title: "Industrial Grade Steel Pipes",
      subtitle: "by SteelCorp USA",
      price: 12.5,
      originalPrice: 18.0,
      quantity: 1000,
      availability: "In Stock",
      shipping: "Truck: 6-8 Days",
      delivery: "Est. 1st Week, Mar, 2025",
    },
    {
      id: 3,
      title: "Industrial Grade Steel Pipes",
      subtitle: "by SteelCorp USA",
      price: 12.5,
      originalPrice: 18.0,
      quantity: 2000,
      availability: "Escrow Available",
      shipping: "Truck: 6-8 Days",
      delivery: "Est. 1st Week, Mar, 2025",
    },
  ]);

  const [selectAll, setSelectAll] = useState(false);

  const updateQuantity = (id: number, newQuantity: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900">Cart Items (3)</h2>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(e) => setSelectAll(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Select All</span>
          </label>
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded hover:bg-white text-sm">
          Remove Selected
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex gap-4">
              <input
                type="checkbox"
                className="w-4 h-4 mt-1 rounded border-gray-300"
              />

              <div className="w-24 h-24 bg-gray-100 rounded shrink-0 flex items-center justify-center">
                <span className="text-xs text-gray-400">Product Image</span>
              </div>

              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.subtitle}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>New: {item.availability}</span>
                      <span>Industrial Materials</span>
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4 text-green-600"
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
                        {item.availability}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
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
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                        {item.shipping}
                      </span>
                      <span className="flex items-center gap-1">
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
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {item.delivery}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl font-bold text-gray-900">
                        ₹{item.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{item.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">32% OFF</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 100)
                            }
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.id,
                                parseInt(e.target.value) || 1
                              )
                            }
                            className="w-20 px-2 py-1 text-center border-x border-gray-300 focus:outline-none"
                          />
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 100)
                            }
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs text-gray-600">
                          (MIN: 100, Max: 2000)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="p-2 text-gray-400 hover:text-red-500">
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
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
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
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500"
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
                      <span className="text-sm text-gray-600">Item Total</span>
                      <span className="text-lg font-bold text-gray-900">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-gray-600">You Saves</span>
                      <span className="text-sm font-semibold text-green-600">
                        ₹
                        {(
                          (item.originalPrice - item.price) *
                          item.quantity
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
