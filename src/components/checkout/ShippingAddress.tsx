"use client";

import { useState, useEffect } from "react";
import { buyerService } from "@/services/buyer.service";
import type { Address } from "@/types/buyer.types";
import ShippingMethod from "./ShippingMethod";

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
      <div className="bg-white rounded-[13px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] p-5">
        <div className="text-center py-5">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0d1b2a] mx-auto"></div>
          <p className="mt-2.5 text-[#9c9c9c]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Address Information Card */}
      <div className="bg-white rounded-[10px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] p-[15px]">
        {/* Header with Location Icon */}
        <div className="flex items-center gap-2 mb-4">
          <svg
            width="13"
            height="13"
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
          <h2 className="text-[12px] font-semibold text-[#0d1b2a]">
            Address Information
          </h2>
        </div>

        {error && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs">
            {error}
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          {/* First Name & Last Name Row */}
          <div className="grid grid-cols-2 gap-[23px]">
            <div>
              <label className="block text-[9px] font-medium text-[#0d1b2a] mb-1.5">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full h-[28px] px-2.5 text-[8px] text-[#0d1b2a] border border-[#bebebe] rounded-[5px] focus:outline-none focus:border-[#0d1b2a]"
              />
            </div>
            <div>
              <label className="block text-[9px] font-medium text-[#0d1b2a] mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full h-[28px] px-2.5 text-[8px] text-[#0d1b2a] border border-[#bebebe] rounded-[5px] focus:outline-none focus:border-[#0d1b2a]"
              />
            </div>
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-[9px] font-medium text-[#0d1b2a] mb-1.5">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company Name"
              className="w-full h-[28px] px-2.5 text-[8px] text-[#0d1b2a] border border-[#bebebe] rounded-[5px] focus:outline-none focus:border-[#0d1b2a]"
            />
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-[9px] font-medium text-[#0d1b2a] mb-1.5">
              Street Address
            </label>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              placeholder="Street Address"
              className="w-full h-[28px] px-2.5 text-[8px] text-[#0d1b2a] border border-[#bebebe] rounded-[5px] focus:outline-none focus:border-[#0d1b2a]"
            />
          </div>

          {/* City, State, ZIP Code Row */}
          <div className="grid grid-cols-[127px_130px_100px] gap-[13px]">
            <div>
              <label className="block text-[9px] font-medium text-[#0d1b2a] mb-1.5">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="w-full h-[28px] px-2.5 text-[8px] text-[#0d1b2a] border border-[#bebebe] rounded-[5px] focus:outline-none focus:border-[#0d1b2a]"
              />
            </div>
            <div>
              <label className="block text-[9px] font-medium text-[#0d1b2a] mb-1.5">
                State
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State"
                  className="w-full h-[28px] px-2.5 text-[8px] text-[#0d1b2a] border border-[#bebebe] rounded-[5px] focus:outline-none focus:border-[#0d1b2a]"
                />
              </div>
            </div>
            <div>
              <label className="block text-[9px] font-medium text-[#0d1b2a] mb-1.5">
                ZIP Code
              </label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="ZIP Code"
                className="w-full h-[28px] px-2.5 text-[8px] text-[#0d1b2a] border border-[#bebebe] rounded-[5px] focus:outline-none focus:border-[#0d1b2a]"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-[9px] font-medium text-[#0d1b2a] mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone"
              className="w-[205px] h-[28px] px-2.5 text-[8px] text-[#0d1b2a] border border-[#bebebe] rounded-[5px] focus:outline-none focus:border-[#0d1b2a]"
            />
          </div>

          {/* Special Delivery Instructions */}
          <div>
            <label className="block text-[9px] font-medium text-[#0d1b2a] mb-1.5">
              Special Delivery Instruction
            </label>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Instructions"
              rows={5}
              className="w-full h-[90px] px-2.5 py-2.5 text-[8px] text-[#0d1b2a] border border-[#bebebe] rounded-[5px] focus:outline-none focus:border-[#0d1b2a] resize-none"
            />
          </div>
        </div>
      </div>

      {/* Shipping Method Component */}
      <ShippingMethod
        selectedMethod={selectedShippingMethod}
        onMethodSelect={onShippingMethodSelect}
        onContinue={handleFormSubmit}
        onBack={() => window.history.back()}
      />
    </div>
  );
}
