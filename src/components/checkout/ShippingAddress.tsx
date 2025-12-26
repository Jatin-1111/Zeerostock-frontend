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

  // Form fields for the address
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  useEffect(() => {
    fetchAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Populate form when address is selected
  useEffect(() => {
    if (selectedAddress) {
      // Split contact_name into first and last name
      const nameParts = selectedAddress.contact_name?.split(" ") || ["", ""];
      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(" ") || "");

      setCompanyName(selectedAddress.landmark || "");
      setStreetAddress(selectedAddress.address_line1 || "");
      setCity(selectedAddress.city || "");
      setState(selectedAddress.state || "");
      setZipCode(selectedAddress.pincode || "");
      setPhoneNumber(selectedAddress.contact_phone || "");
      setSpecialInstructions(selectedAddress.address_line2 || "");
    }
  }, [selectedAddress]);

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

  const handleFormSubmit = () => {
    // Create a temp address object from form data to pass to parent
    const tempAddress: Address = {
      id: selectedAddress?.id || "0",
      user_id: "",
      contact_name: `${firstName} ${lastName}`.trim(),
      contact_phone: phoneNumber,
      address_line1: streetAddress,
      address_line2: specialInstructions,
      city: city,
      state: state,
      pincode: zipCode,
      landmark: companyName,
      address_type: "shipping",
      is_default: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    onAddressSelect(tempAddress);
    onContinue();
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-[20px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] p-8">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0d1b2a] mx-auto"></div>
          <p
            className="mt-4 text-[#9c9c9c]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Address Information Card */}
      <div className="bg-white rounded-[15px] shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)] p-[23px]">
        {/* Header with Location Icon */}
        <div className="flex items-center gap-3 mb-6">
          <svg
            width="20"
            height="20"
            viewBox="0 0 26 26"
            fill="none"
            stroke="#0d1b2a"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 10.5C21 17.5 13 23.5 13 23.5C13 23.5 5 17.5 5 10.5C5 6.36 8.36 3 12.5 3C16.64 3 20 6.36 20 10.5Z"
            />
            <circle
              cx="13"
              cy="10.5"
              r="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2
            className="text-[18px] font-semibold text-[#0d1b2a]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Address Information
          </h2>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-6">
          {/* First Name & Last Name Row */}
          <div className="grid grid-cols-2 gap-[34px]">
            <div>
              <label
                className="block text-[13px] font-medium text-[#0d1b2a] mb-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Label text"
                className="w-full h-[42px] px-4 text-[12px] text-[#0d1b2a] border border-[#bebebe] rounded-[8px] focus:outline-none focus:border-[#0d1b2a]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              />
            </div>
            <div>
              <label
                className="block text-[13px] font-medium text-[#0d1b2a] mb-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Label text"
                className="w-full h-[42px] px-4 text-[12px] text-[#0d1b2a] border border-[#bebebe] rounded-[8px] focus:outline-none focus:border-[#0d1b2a]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              />
            </div>
          </div>

          {/* Company Name */}
          <div>
            <label
              className="block text-[13px] font-medium text-[#0d1b2a] mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Label text"
              className="w-full h-[42px] px-4 text-[12px] text-[#0d1b2a] border border-[#bebebe] rounded-[8px] focus:outline-none focus:border-[#0d1b2a]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            />
          </div>

          {/* Street Address */}
          <div>
            <label
              className="block text-[13px] font-medium text-[#0d1b2a] mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Street Address
            </label>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              placeholder="Label text"
              className="w-full h-[42px] px-4 text-[12px] text-[#0d1b2a] border border-[#bebebe] rounded-[8px] focus:outline-none focus:border-[#0d1b2a]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            />
          </div>

          {/* City, State, ZIP Code Row */}
          <div className="grid grid-cols-[191px_195px_150px] gap-[19px]">
            <div>
              <label
                className="block text-[13px] font-medium text-[#0d1b2a] mb-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Label text"
                className="w-full h-[42px] px-4 text-[12px] text-[#0d1b2a] border border-[#bebebe] rounded-[8px] focus:outline-none focus:border-[#0d1b2a]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              />
            </div>
            <div>
              <label
                className="block text-[13px] font-medium text-[#0d1b2a] mb-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                State
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="Label text"
                  className="w-full h-[42px] px-4 text-[12px] text-[#0d1b2a] border border-[#bebebe] rounded-[8px] focus:outline-none focus:border-[#0d1b2a]"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                />
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bebebe] pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <div>
              <label
                className="block text-[13px] font-medium text-[#0d1b2a] mb-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                ZIP Code
              </label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Label text"
                className="w-full h-[42px] px-4 text-[12px] text-[#0d1b2a] border border-[#bebebe] rounded-[8px] focus:outline-none focus:border-[#0d1b2a]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label
              className="block text-[13px] font-medium text-[#0d1b2a] mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Label text"
              className="w-[308px] h-[42px] px-4 text-[12px] text-[#0d1b2a] border border-[#bebebe] rounded-[8px] focus:outline-none focus:border-[#0d1b2a]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            />
          </div>

          {/* Special Delivery Instructions */}
          <div>
            <label
              className="block text-[13px] font-medium text-[#0d1b2a] mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Special Delivery Instruction
            </label>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Label text"
              rows={5}
              className="w-full h-[135px] px-4 py-4 text-[12px] text-[#0d1b2a] border border-[#bebebe] rounded-[8px] focus:outline-none focus:border-[#0d1b2a] resize-none"
              style={{ fontFamily: "Roboto, sans-serif" }}
            />
          </div>
        </div>
      </div>

      {/* Shipping Method Card */}
      <div className="bg-white rounded-[15px] shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)] p-[23px]">
        {/* Header with Location Icon */}
        <div className="flex items-center gap-3 mb-6">
          <svg
            width="20"
            height="20"
            viewBox="0 0 26 26"
            fill="none"
            stroke="#0d1b2a"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 10.5C21 17.5 13 23.5 13 23.5C13 23.5 5 17.5 5 10.5C5 6.36 8.36 3 12.5 3C16.64 3 20 6.36 20 10.5Z"
            />
            <circle
              cx="13"
              cy="10.5"
              r="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2
            className="text-[18px] font-semibold text-[#0d1b2a]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Shipping Method
          </h2>
        </div>

        {/* Shipping Options */}
        <div className="space-y-4">
          {/* Standard Shipping */}
          <div
            onClick={() => onShippingMethodSelect("standard")}
            className={`h-[64px] px-[16px] flex items-center rounded-[8px] cursor-pointer transition-all ${
              selectedShippingMethod === "standard"
                ? "bg-[#eeffef] border-2 border-[#2aae7a]"
                : "bg-white border border-[#e8e8e8]"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                {/* Radio Button */}
                <div
                  className={`w-[16px] h-[16px] rounded-full border-2 flex items-center justify-center ${
                    selectedShippingMethod === "standard"
                      ? "border-[#2aae7a]"
                      : "border-[#bebebe]"
                  }`}
                >
                  {selectedShippingMethod === "standard" && (
                    <div className="w-[8px] h-[8px] rounded-full bg-[#2aae7a]" />
                  )}
                </div>

                {/* Method Details */}
                <div>
                  <h3
                    className="text-[14px] font-medium text-[#0d1b2a] mb-1"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Standard Shipping
                  </h3>
                  <p
                    className="text-[12px] font-normal text-[#9c9c9c]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Delivery in 5-7 business days
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <span
                  className="text-[14px] font-medium text-[#0d1b2a]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  FREE
                </span>
              </div>
            </div>
          </div>

          {/* Expedited Shipping */}
          <div
            onClick={() => onShippingMethodSelect("express")}
            className={`h-[64px] px-[16px] flex items-center rounded-[8px] cursor-pointer transition-all ${
              selectedShippingMethod === "express"
                ? "bg-[#eeffef] border-2 border-[#2aae7a]"
                : "bg-white border border-[#e8e8e8]"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                {/* Radio Button */}
                <div
                  className={`w-[16px] h-[16px] rounded-full border-2 flex items-center justify-center ${
                    selectedShippingMethod === "express"
                      ? "border-[#2aae7a]"
                      : "border-[#bebebe]"
                  }`}
                >
                  {selectedShippingMethod === "express" && (
                    <div className="w-[8px] h-[8px] rounded-full bg-[#2aae7a]" />
                  )}
                </div>

                {/* Method Details */}
                <div>
                  <h3
                    className="text-[14px] font-medium text-[#0d1b2a] mb-1"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Expedited Shipping
                  </h3>
                  <p
                    className="text-[12px] font-normal text-[#9c9c9c]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Delivery in 2-3 business days
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <span
                  className="text-[14px] font-medium text-[#0d1b2a]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  $50
                </span>
              </div>
            </div>
          </div>

          {/* Overnight Shipping */}
          <div
            onClick={() => onShippingMethodSelect("overnight")}
            className={`h-[64px] px-[16px] flex items-center rounded-[8px] cursor-pointer transition-all ${
              selectedShippingMethod === "overnight"
                ? "bg-[#eeffef] border-2 border-[#2aae7a]"
                : "bg-white border border-[#e8e8e8]"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                {/* Radio Button */}
                <div
                  className={`w-[16px] h-[16px] rounded-full border-2 flex items-center justify-center ${
                    selectedShippingMethod === "overnight"
                      ? "border-[#2aae7a]"
                      : "border-[#bebebe]"
                  }`}
                >
                  {selectedShippingMethod === "overnight" && (
                    <div className="w-[8px] h-[8px] rounded-full bg-[#2aae7a]" />
                  )}
                </div>

                {/* Method Details */}
                <div>
                  <h3
                    className="text-[14px] font-medium text-[#0d1b2a] mb-1"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Overnight Shipping
                  </h3>
                  <p
                    className="text-[12px] font-normal text-[#9c9c9c]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Delivery in 1 business day
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <span
                  className="text-[14px] font-medium text-[#0d1b2a]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  $500
                </span>
              </div>
            </div>
          </div>

          {/* Freight Shipping */}
          <div
            onClick={() => onShippingMethodSelect("freight")}
            className={`h-[64px] px-[16px] flex items-center rounded-[8px] cursor-pointer transition-all ${
              selectedShippingMethod === "freight"
                ? "bg-[#eeffef] border-2 border-[#2aae7a]"
                : "bg-white border border-[#e8e8e8]"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                {/* Radio Button */}
                <div
                  className={`w-[16px] h-[16px] rounded-full border-2 flex items-center justify-center ${
                    selectedShippingMethod === "freight"
                      ? "border-[#2aae7a]"
                      : "border-[#bebebe]"
                  }`}
                >
                  {selectedShippingMethod === "freight" && (
                    <div className="w-[8px] h-[8px] rounded-full bg-[#2aae7a]" />
                  )}
                </div>

                {/* Method Details */}
                <div>
                  <h3
                    className="text-[14px] font-medium text-[#0d1b2a] mb-1"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Freight Shipping
                  </h3>
                  <p
                    className="text-[12px] font-normal text-[#9c9c9c]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    For large or bulk orders
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <span
                  className="text-[14px] font-medium text-[#0d1b2a]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  FREE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => window.history.back()}
          className="h-[45px] px-12 bg-white border border-[#9c9c9c] rounded-[11px] text-[15px] font-semibold text-[#9c9c9c] hover:bg-gray-50 transition-colors"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
        >
          Back to cart
        </button>
        <button
          onClick={handleFormSubmit}
          disabled={
            !firstName ||
            !lastName ||
            !streetAddress ||
            !city ||
            !state ||
            !zipCode ||
            !phoneNumber
          }
          className="h-[45px] px-12 bg-[#1e3a8a] rounded-[11px] text-[15px] font-semibold text-white hover:bg-[#2d4a99] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
