"use client";

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
    description: "Delivery in 5-7 business days",
    price: 0,
    estimatedDays: "5-7 business days",
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "Delivery in 2-3 business days",
    price: 100,
    estimatedDays: "2-3 business days",
  },
  {
    id: "overnight",
    name: "Overnight Delivery",
    description: "Next business day delivery",
    price: 250,
    estimatedDays: "1 business day",
  },
];

export default function ShippingMethod({
  selectedMethod,
  onMethodSelect,
  onContinue,
  onBack,
}: ShippingMethodProps) {
  return (
    <div className="border-2 border-gray-900 rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-5">
        Select Shipping Method
      </h2>

      <div className="space-y-3 mb-6">
        {shippingOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => onMethodSelect(option.id)}
            className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
              selectedMethod === option.id
                ? "border-gray-900 bg-gray-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2 flex-1">
                {/* Radio Button */}
                <div className="mt-0.5">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === option.id
                        ? "border-gray-900"
                        : "border-gray-400"
                    }`}
                  >
                    {selectedMethod === option.id && (
                      <div className="w-2 h-2 rounded-full bg-gray-900" />
                    )}
                  </div>
                </div>

                {/* Method Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {option.name}
                    </h3>
                    {option.price === 0 && (
                      <span
                        className="text-2xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded"
                        style={{ fontSize: "10px" }}
                      >
                        FREE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-1.5">
                    {option.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <svg
                      className="w-3 h-3"
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
                    <span>Estimated: {option.estimatedDays}</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="text-right ml-3">
                {option.price === 0 ? (
                  <span className="text-base font-bold text-green-600">
                    FREE
                  </span>
                ) : (
                  <span className="text-base font-bold text-gray-900">
                    ₹{option.price}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-3">
        <button
          onClick={onBack}
          className="px-5 py-2 border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-100 transition-colors text-sm"
        >
          Back to Address
        </button>
        <button
          onClick={onContinue}
          disabled={!selectedMethod}
          className="px-5 py-2 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}
