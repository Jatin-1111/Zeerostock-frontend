"use client";

import { useState, useEffect } from "react";
import { buyerService } from "@/services/buyer.service";
import type { Address } from "@/types/buyer.types";

interface ShippingAddressProps {
  selectedAddress: Address | null;
  onAddressSelect: (address: Address) => void;
  selectedShippingMethod: string;
  onShippingMethodSelect: (method: string) => void;
  onContinue: () => void;
}

export default function ShippingAddress({
  selectedAddress,
  onAddressSelect,
  selectedShippingMethod,
  onShippingMethodSelect,
  onContinue,
}: ShippingAddressProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newAddress, setNewAddress] = useState({
    contact_name: "",
    contact_phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    address_type: "shipping" as "shipping" | "billing" | "both",
    is_default: false,
  });

  useEffect(() => {
    fetchAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      const response = await buyerService.getAddresses();
      if (response.success && response.data?.addresses) {
        setAddresses(response.data.addresses);
        // Auto-select default address if none selected
        if (!selectedAddress && response.data.addresses.length > 0) {
          const defaultAddr =
            response.data.addresses.find((addr: Address) => addr.is_default) ||
            response.data.addresses[0];
          onAddressSelect(defaultAddr);
        }
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
      setError("Failed to load addresses");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAddress = async () => {
    try {
      setError(null);
      const response = await buyerService.addAddress(newAddress);
      if (response.success && response.data) {
        await fetchAddresses();
        setShowAddForm(false);
        setNewAddress({
          contact_name: "",
          contact_phone: "",
          address_line1: "",
          address_line2: "",
          city: "",
          state: "",
          pincode: "",
          landmark: "",
          address_type: "shipping",
          is_default: false,
        });
      } else {
        setError(response.message || "Failed to add address");
      }
    } catch (err) {
      console.error("Error adding address:", err);
      const error = err as any;
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to add address. Please check all fields and try again."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="border-2 border-gray-900 rounded p-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading addresses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Shipping Address Selection */}
      <div className="border-2 border-gray-900 rounded p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
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
            <h2 className="text-lg font-bold text-gray-900">
              Select Shipping Address
            </h2>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            {showAddForm ? "Cancel" : "+ Add New Address"}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Add New Address Form */}
        {showAddForm && (
          <div className="mb-6 p-4 border-2 border-gray-300 rounded bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-4">
              Add New Address
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-900 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={newAddress.contact_name}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      contact_name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-900 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={newAddress.contact_phone}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      contact_phone: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-900 mb-1">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  value={newAddress.address_line1}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      address_line1: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-900 mb-1">
                  Address Line 2
                </label>
                <input
                  type="text"
                  value={newAddress.address_line2}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      address_line2: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-900 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  value={newAddress.city}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-900 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  value={newAddress.state}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-900 mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  value={newAddress.pincode}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, pincode: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-900 mb-1">
                  Landmark
                </label>
                <input
                  type="text"
                  value={newAddress.landmark || ""}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, landmark: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
                />
              </div>
            </div>
            <button
              onClick={handleAddAddress}
              disabled={
                !newAddress.contact_name ||
                !newAddress.contact_phone ||
                !newAddress.address_line1 ||
                !newAddress.city ||
                !newAddress.state ||
                !newAddress.pincode
              }
              className="px-4 py-2 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Address
            </button>
          </div>
        )}

        {/* Saved Addresses */}
        {addresses.length === 0 && !showAddForm ? (
          <div className="text-center py-8 text-gray-500">
            <p>No saved addresses. Please add a new address.</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 px-4 py-2 bg-gray-900 text-white rounded font-medium hover:bg-gray-800"
            >
              Add Address
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {addresses.map((address) => (
              <div
                key={address.id}
                onClick={() => onAddressSelect(address)}
                className={`p-4 border-2 rounded cursor-pointer transition-all ${
                  selectedAddress?.id === address.id
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      checked={selectedAddress?.id === address.id}
                      onChange={() => onAddressSelect(address)}
                      className="mt-1"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">
                          {address.contact_name}
                        </span>
                        {address.is_default && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                            Default
                          </span>
                        )}
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded capitalize">
                          {address.address_type}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-600 space-y-0.5">
                        <div>{address.contact_phone}</div>
                        <div>{address.address_line1}</div>
                        {address.address_line2 && (
                          <div>{address.address_line2}</div>
                        )}
                        <div>
                          {address.city}, {address.state} - {address.pincode}
                        </div>
                        {address.landmark && (
                          <div>Landmark: {address.landmark}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Shipping Method Selection */}
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
          <h2 className="text-lg font-bold text-gray-900">
            Select Shipping Method
          </h2>
        </div>

        <div className="space-y-4">
          {/* Standard Shipping */}
          <div
            onClick={() => onShippingMethodSelect("standard")}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedShippingMethod === "standard"
                ? "border-gray-900 bg-gray-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-1">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedShippingMethod === "standard"
                        ? "border-gray-900"
                        : "border-gray-400"
                    }`}
                  >
                    {selectedShippingMethod === "standard" && (
                      <div className="w-3 h-3 rounded-full bg-gray-900" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">
                      Standard Shipping
                    </h3>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      FREE
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Delivery in 5-7 business days
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Estimated: 5-7 business days</span>
                  </div>
                </div>
              </div>
              <div className="text-right ml-4">
                <span className="text-lg font-bold text-green-600">FREE</span>
              </div>
            </div>
          </div>

          {/* Express Shipping */}
          <div
            onClick={() => onShippingMethodSelect("express")}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedShippingMethod === "express"
                ? "border-gray-900 bg-gray-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-1">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedShippingMethod === "express"
                        ? "border-gray-900"
                        : "border-gray-400"
                    }`}
                  >
                    {selectedShippingMethod === "express" && (
                      <div className="w-3 h-3 rounded-full bg-gray-900" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Express Shipping
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Delivery in 2-3 business days
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Estimated: 2-3 business days</span>
                  </div>
                </div>
              </div>
              <div className="text-right ml-4">
                <span className="text-lg font-bold text-gray-900">₹100</span>
              </div>
            </div>
          </div>

          {/* Overnight Delivery */}
          <div
            onClick={() => onShippingMethodSelect("overnight")}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedShippingMethod === "overnight"
                ? "border-gray-900 bg-gray-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-1">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedShippingMethod === "overnight"
                        ? "border-gray-900"
                        : "border-gray-400"
                    }`}
                  >
                    {selectedShippingMethod === "overnight" && (
                      <div className="w-3 h-3 rounded-full bg-gray-900" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Overnight Delivery
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Next business day delivery
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Estimated: 1 business day</span>
                  </div>
                </div>
              </div>
              <div className="text-right ml-4">
                <span className="text-lg font-bold text-gray-900">₹250</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end">
        <button
          onClick={onContinue}
          disabled={!selectedAddress}
          className="px-6 py-2.5 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}


