"use client";

interface ReviewOrderProps {
  onBack: () => void;
  onPlaceOrder: () => void;
}

export default function ReviewOrder({
  onBack,
  onPlaceOrder,
}: ReviewOrderProps) {
  const orderItems = [
    {
      id: 1,
      name: "Industrial Grade Steel Pipes - Mixed Sizes",
      quantity: 100,
      price: 45.0,
    },
    {
      id: 2,
      name: "Industrial Grade Steel Pipes - Mixed Sizes",
      quantity: 50,
      price: 45.0,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="border-2 border-gray-900 rounded p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
        <div className="space-y-4">
          {orderItems.map((item) => (
            <div key={item.id} className="border-b border-gray-300 pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    @ Promotional Gifts
                  </div>
                  <div className="text-sm text-gray-500">
                    Qty: {item.quantity} @ ${item.price.toFixed(2)}
                  </div>
                </div>
                <div className="text-right font-bold text-gray-900">
                  ${(item.quantity * item.price).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="grid grid-cols-2 gap-6">
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
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <h3 className="text-base font-bold text-gray-900">
              Payment Method
            </h3>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-gray-900">Credit/Debit Card</div>
            <div className="text-sm text-gray-500">
              Visa, Mastercard, American Express
            </div>
          </div>
        </div>

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
                d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
              />
            </svg>
            <h3 className="text-base font-bold text-gray-900">
              Shipping Method
            </h3>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-gray-900">Standard Shipping</div>
            <div className="text-sm text-gray-500">5-7 business days</div>
          </div>
        </div>
      </div>

      {/* Terms Agreement */}
      <div className="border-2 border-gray-900 rounded p-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 mt-1" />
          <div className="flex-1">
            <span className="font-medium text-gray-900">
              I agree to the Terms of Service and Privacy Policy
            </span>
            <p className="text-sm text-gray-500 mt-1">
              By placing this order, you agree to our terms and acknowledge that
              you&apos;ve read our policy
            </p>
          </div>
        </label>
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
          onClick={onPlaceOrder}
          className="px-6 py-2.5 bg-gray-900 text-white rounded font-medium hover:bg-gray-800"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
