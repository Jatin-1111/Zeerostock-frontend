"use client";

import { useState } from "react";

interface ShippingAddressProps {
  onContinue: () => void;
}

export default function ShippingAddress({ onContinue }: ShippingAddressProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    notes: "",
  });

  const [selectedShipping, setSelectedShipping] = useState("standard");

  const shippingOptions = [
    {
      id: "standard",
      name: "Standard Shipping",
      description: "Delivered in 5-7 business days",
      price: "FREE",
      delivery: "5-7 Business Days",
    },
    {
      id: "expedited",
      name: "Expedited Shipping",
      description: "Faster delivery in 2-3 business days",
      price: "$150",
      delivery: "2-3 Business Days",
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      description: "Next day delivery by 5 PM",
      price: "$300",
      delivery: "1 Business Days",
    },
    {
      id: "freight",
      name: "Freight Shipping",
      description: "For large or bulk orders",
      price: "FREE",
      delivery: "3-5 Business Days",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Shipping Address */}
      <div className="border-2 border-gray-900 rounded p-6">
        <div className="flex items-center gap-2 mb-6">
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
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h2 className="text-lg font-bold text-gray-900">Shipping Address</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-900 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-900 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-900 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-900 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-900 mb-2">
              Street Address
            </label>
            <input
              type="text"
              value={formData.streetAddress}
              onChange={(e) =>
                setFormData({ ...formData, streetAddress: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-900 mb-2">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-900 mb-2">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-900 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) =>
                  setFormData({ ...formData, zipCode: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-900 mb-2">
              Loading dock access, special delivery times, etc.
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Shipping Method */}
      <div className="border-2 border-gray-900 rounded p-6">
        <div className="flex items-center gap-2 mb-6">
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
          <h2 className="text-lg font-bold text-gray-900">Shipping Method</h2>
        </div>

        <div className="space-y-3">
          {shippingOptions.map((option) => (
            <label
              key={option.id}
              className={`flex items-center justify-between p-4 border-2 rounded cursor-pointer transition-colors ${
                selectedShipping === option.id
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping"
                  value={option.id}
                  checked={selectedShipping === option.id}
                  onChange={(e) => setSelectedShipping(e.target.value)}
                  className="w-4 h-4"
                />
                <div>
                  <div className="font-medium text-gray-900">{option.name}</div>
                  <div className="text-sm text-gray-500">
                    {option.description}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">{option.price}</div>
                <div className="text-sm text-gray-500">{option.delivery}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button className="px-6 py-2.5 border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50">
          Back to Cart
        </button>
        <button
          onClick={onContinue}
          className="px-6 py-2.5 bg-gray-900 text-white rounded font-medium hover:bg-gray-800"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
