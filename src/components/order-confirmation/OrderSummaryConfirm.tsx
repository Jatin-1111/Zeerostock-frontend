interface OrderSummaryConfirmProps {
  subtotal: number;
  itemCount: number;
  savings: number;
  tax: number;
  shipping: string;
  total: number;
}

export default function OrderSummaryConfirm({
  subtotal,
  itemCount,
  savings,
  tax,
  shipping,
  total,
}: OrderSummaryConfirmProps) {
  return (
    <div className="border-2 border-gray-900 rounded p-6 mb-6">
      <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>

      <div className="space-y-3">
        <div className="flex justify-between text-sm text-gray-900">
          <span>Subtotal ({itemCount} Items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm text-green-600">
          <span>Total Savings</span>
          <span>-${savings.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-900">
          <span>Estimated Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-900">
          <span>Shipping</span>
          <span>{shipping}</span>
        </div>

        <div className="border-t-2 border-gray-900 pt-3 flex justify-between">
          <span className="font-bold text-gray-900">Total</span>
          <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <svg
            className="w-4 h-4 text-gray-900"
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
          <span>Secure checkout with SSL encryption</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <svg
            className="w-4 h-4 text-gray-900"
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
          <span>Fast shipping and handling</span>
        </div>
      </div>
    </div>
  );
}
