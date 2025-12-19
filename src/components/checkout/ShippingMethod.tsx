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
    <div className="border-2 border-gray-900 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Select Shipping Method
      </h2>

      <div className="space-y-4 mb-8">
        {shippingOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => onMethodSelect(option.id)}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedMethod === option.id
                ? "border-gray-900 bg-gray-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                {/* Radio Button */}
                <div className="mt-1">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === option.id
                        ? "border-gray-900"
                        : "border-gray-400"
                    }`}
                  >
                    {selectedMethod === option.id && (
                      <div className="w-3 h-3 rounded-full bg-gray-900" />
                    )}
                  </div>
                </div>

                {/* Method Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {option.name}
                    </h3>
                    {option.price === 0 && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        FREE
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {option.description}
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
                    <span>Estimated: {option.estimatedDays}</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="text-right ml-4">
                {option.price === 0 ? (
                  <span className="text-lg font-bold text-green-600">FREE</span>
                ) : (
                  <span className="text-lg font-bold text-gray-900">
                    ₹{option.price}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-100 transition-colors"
        >
          Back to Address
        </button>
        <button
          onClick={onContinue}
          disabled={!selectedMethod}
          className="px-6 py-3 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}
