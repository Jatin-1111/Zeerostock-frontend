"use client";

import { Truck } from "lucide-react";

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

interface ShippingMethodProps {
  selectedMethod: string;
  onMethodSelect: (methodId: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

const shippingOptions: ShippingOption[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "Free for order over $1000",
    price: 0,
    estimatedDays: "5-6 Business Days",
  },
  {
    id: "express",
    name: "Expedited Shipping",
    description: "Faster delivery with tracking",
    price: 50,
    estimatedDays: "2-3 Business Days",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Next day delivery by 5 PM",
    price: 500,
    estimatedDays: "1 Business Days",
  },
  {
    id: "freight",
    name: "Freight Shipping",
    description: "For large/heavy items- Quote provided",
    price: 0,
    estimatedDays: "7-10 Business Days",
  },
];

export default function ShippingMethod({
  selectedMethod,
  onMethodSelect,
  onContinue,
  onBack,
}: ShippingMethodProps) {
  return (
    <div className="bg-white rounded-[10px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] p-[15px_15px_20px_15px]">
      {/* Header */}
      <div className="flex items-center gap-[10px] mb-[15px]">
        <Truck className="w-[13px] h-[13px] text-gray-900" strokeWidth={1.5} />
        <h2 className="text-sm font-semibold text-[#0D1B2A]">
          Shipping Method
        </h2>
      </div>

      {/* Shipping Options */}
      <div className="space-y-[10px] mb-4">
        {shippingOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => onMethodSelect(option.id)}
            className={`h-[43px] rounded-[10px] cursor-pointer transition-all ${
              selectedMethod === option.id
                ? "bg-[#EEFFEF] border-[1.5px] border-[#2AAE7A]"
                : "bg-white border border-[#E8E8E8]"
            }`}
          >
            <div className="flex items-center gap-[7.5px] h-full px-[12px]">
              {/* Radio Button */}
              <div className="shrink-0">
                <div
                  className={`w-[11px] h-[11px] rounded-full border-[1px] flex items-center justify-center ${
                    selectedMethod === option.id
                      ? "border-[#2AAE7A]"
                      : "border-[#9C9C9C]"
                  }`}
                >
                  {selectedMethod === option.id && (
                    <div className="w-[5px] h-[5px] rounded-full bg-[#2AAE7A]" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex items-center justify-between flex-1">
                {/* Left: Name and Description */}
                <div className="flex flex-col">
                  <h3 className="text-xs font-medium text-[#0D1B2A] leading-normal">
                    {option.name}
                  </h3>
                  <p className="text-xs text-[#9C9C9C] leading-tight">
                    {option.description}
                  </p>
                </div>

                {/* Right: Price and Estimated Days */}
                <div className="flex flex-col items-end text-right">
                  <p
                    className={`text-xs font-medium leading-normal ${
                      option.price === 0 ? "text-[#2AAE7A]" : "text-[#0D1B2A]"
                    }`}
                  >
                    {option.price === 0 ? "FREE" : `$${option.price}`}
                  </p>
                  <p className="text-xs text-[#9C9C9C] leading-tight">
                    {option.estimatedDays}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-3">
        <button
          onClick={onBack}
          className="px-[18px] py-[7.5px] border-[1.5px] border-[#9C9C9C] text-[#9C9C9C] rounded-[6px] text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Back to Address
        </button>
        <button
          onClick={onContinue}
          disabled={!selectedMethod}
          className="px-[24px] py-[7.5px] bg-[#1E3A8A] text-white rounded-[6px] text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
