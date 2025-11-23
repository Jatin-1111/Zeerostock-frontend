"use client";

import { useState } from "react";

interface PaymentMethodProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function PaymentMethod({
  onContinue,
  onBack,
}: PaymentMethodProps) {
  const [selectedPayment, setSelectedPayment] = useState("credit-card");
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const [billingAddress, setBillingAddress] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const paymentMethods = [
    {
      id: "credit-card",
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, American Express",
      iconPath:
        "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    },
    {
      id: "escrow",
      name: "Escrow Payment",
      description:
        "Recommended for high-value orders\nProcessing in escrow - Fee: 2.5% of order value",
      iconPath:
        "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    },
    {
      id: "wire",
      name: "Wire Transfer",
      description:
        "Direct bank transfer for large orders\nProcessing time: 1-3 business days - Fee: $0",
      iconPath:
        "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    },
    {
      id: "net",
      name: "Net Terms",
      description:
        "For approved business accounts\nNet-30 payment terms available - Fee: No processing fee",
      iconPath:
        "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Payment Method */}
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
                selectedPayment === method.id
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={selectedPayment === method.id}
                onChange={(e) => setSelectedPayment(e.target.value)}
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
                <div className="text-sm text-gray-500 mt-1 whitespace-pre-line">
                  {method.description}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Payment Details (for credit card) */}
      {selectedPayment === "credit-card" && (
        <div className="border-2 border-gray-900 rounded p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4">
            Payment Details
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-900 mb-2">
                Card Number
              </label>
              <input
                type="text"
                value={cardDetails.cardNumber}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                }
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-900 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={cardDetails.expiryDate}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      expiryDate: e.target.value,
                    })
                  }
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-900 mb-2">CVV</label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-900 mb-2">
                Name on Card
              </label>
              <input
                type="text"
                value={cardDetails.cardName}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cardName: e.target.value })
                }
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* Billing Address */}
      <div className="border-2 border-gray-900 rounded p-6">
        <div className="flex items-center gap-2 mb-4">
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
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <h2 className="text-lg font-bold text-gray-900">Billing Address</h2>
        </div>

        <label className="flex items-center gap-2 mb-4 cursor-pointer">
          <input
            type="checkbox"
            checked={sameAsShipping}
            onChange={(e) => setSameAsShipping(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-900">
            Note: Billing form fills if checked UNSEC4CTC0
          </span>
        </label>

        {!sameAsShipping && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-900 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={billingAddress.firstName}
                  onChange={(e) =>
                    setBillingAddress({
                      ...billingAddress,
                      firstName: e.target.value,
                    })
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
                  value={billingAddress.lastName}
                  onChange={(e) =>
                    setBillingAddress({
                      ...billingAddress,
                      lastName: e.target.value,
                    })
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
                value={billingAddress.companyName}
                onChange={(e) =>
                  setBillingAddress({
                    ...billingAddress,
                    companyName: e.target.value,
                  })
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
                value={billingAddress.streetAddress}
                onChange={(e) =>
                  setBillingAddress({
                    ...billingAddress,
                    streetAddress: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-900 mb-2">City</label>
                <input
                  type="text"
                  value={billingAddress.city}
                  onChange={(e) =>
                    setBillingAddress({
                      ...billingAddress,
                      city: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-900 mb-2">
                  State
                </label>
                <input
                  type="text"
                  value={billingAddress.state}
                  onChange={(e) =>
                    setBillingAddress({
                      ...billingAddress,
                      state: e.target.value,
                    })
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
                  value={billingAddress.zipCode}
                  onChange={(e) =>
                    setBillingAddress({
                      ...billingAddress,
                      zipCode: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
            </div>
          </div>
        )}
      </div>

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
          className="px-6 py-2.5 bg-gray-900 text-white rounded font-medium hover:bg-gray-800"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
