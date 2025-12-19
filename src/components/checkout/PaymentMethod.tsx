"use client";

import { useState } from "react";

interface PaymentDetails {
  upiId: string;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

interface PaymentMethodProps {
  selectedMethod: "cod" | "online" | "upi";
  onMethodSelect: (method: "cod" | "online" | "upi") => void;
  onPaymentDetailsChange: (details: PaymentDetails) => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function PaymentMethod({
  selectedMethod,
  onMethodSelect,
  onPaymentDetailsChange,
  onContinue,
  onBack,
}: PaymentMethodProps) {
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleDetailsChange = (field: string, value: string) => {
    const updated = { ...paymentDetails, [field]: value };
    setPaymentDetails(updated);
    onPaymentDetailsChange(updated);
  };

  const paymentMethods = [
    {
      id: "cod" as const,
      name: "Cash on Delivery (COD)",
      description: "Pay with cash when your order is delivered",
      fee: "No additional fee",
      iconPath:
        "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      id: "online" as const,
      name: "Online Payment",
      description: "Credit/Debit Card, Net Banking",
      fee: "Secure payment processing",
      iconPath:
        "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    },
    {
      id: "upi" as const,
      name: "UPI Payment",
      description: "Pay using UPI apps (GPay, PhonePe, Paytm)",
      fee: "Instant payment confirmation",
      iconPath:
        "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
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
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          <h2 className="text-lg font-bold text-gray-900">Payment Method</h2>
        </div>

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-start gap-3 p-4 border-2 rounded cursor-pointer transition-colors ${
                selectedMethod === method.id
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={(e) =>
                  onMethodSelect(e.target.value as "cod" | "online" | "upi")
                }
                className="w-4 h-4 mt-1"
              />
              <div className="flex-1">
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
                      d={method.iconPath}
                    />
                  </svg>
                  <span className="font-medium text-gray-900">
                    {method.name}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {method.description}
                </div>
                <div className="text-xs text-gray-400 mt-1">{method.fee}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* UPI Details */}
      {selectedMethod === "upi" && (
        <div className="border-2 border-gray-900 rounded p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4">
            UPI Details
          </h3>
          <div>
            <label className="block text-sm text-gray-900 mb-2">
              UPI ID (Optional)
            </label>
            <input
              type="text"
              value={paymentDetails.upiId}
              onChange={(e) => handleDetailsChange("upiId", e.target.value)}
              placeholder="yourname@upi"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
            />
            <p className="text-xs text-gray-500 mt-1">
              You&apos;ll be redirected to your UPI app to complete payment
            </p>
          </div>
        </div>
      )}

      {/* Card Details */}
      {selectedMethod === "online" && (
        <div className="border-2 border-gray-900 rounded p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4">
            Card Details
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-900 mb-2">
                Card Number *
              </label>
              <input
                type="text"
                value={paymentDetails.cardNumber}
                onChange={(e) =>
                  handleDetailsChange("cardNumber", e.target.value)
                }
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-900 mb-2">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  value={paymentDetails.expiryDate}
                  onChange={(e) =>
                    handleDetailsChange("expiryDate", e.target.value)
                  }
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-900 mb-2">
                  CVV *
                </label>
                <input
                  type="text"
                  value={paymentDetails.cvv}
                  onChange={(e) => handleDetailsChange("cvv", e.target.value)}
                  placeholder="123"
                  maxLength={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-900 mb-2">
                Name on Card *
              </label>
              <input
                type="text"
                value={paymentDetails.cardName}
                onChange={(e) =>
                  handleDetailsChange("cardName", e.target.value)
                }
                placeholder="JOHN DOE"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded">
            <svg
              className="w-5 h-5 text-blue-600 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <p className="text-sm text-blue-800">
              Your payment information is encrypted and secure
            </p>
          </div>
        </div>
      )}

      {/* COD Information */}
      {selectedMethod === "cod" && (
        <div className="border-2 border-gray-900 rounded p-6">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-green-600 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Cash on Delivery Selected
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Pay with cash when your order is delivered</li>
                <li>• No advance payment required</li>
                <li>• Make sure to keep exact change ready</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2.5 border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50"
        >
          Previous Step
        </button>
        <button
          onClick={onContinue}
          disabled={
            selectedMethod === "online" &&
            (!paymentDetails.cardNumber ||
              !paymentDetails.cardName ||
              !paymentDetails.expiryDate ||
              !paymentDetails.cvv)
          }
          className="px-6 py-2.5 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Review Order
        </button>
      </div>
    </div>
  );
}
