interface OrderSummaryProps {
  subtotal: number;
  savings: number;
  tax: number;
  shipping: number;
}

export default function OrderSummary({
  subtotal,
  savings,
  tax,
  shipping,
}: OrderSummaryProps) {
  const total = subtotal - savings + tax + shipping;

  return (
    <div className="border-2 border-gray-900 rounded p-6 sticky top-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

      <div className="space-y-3">
        <div className="flex justify-between text-gray-900">
          <span>Subtotal (3 Items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Total Savings</span>
          <span>-${savings.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-900">
          <span>Estimated Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-900">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>

        <div className="border-t-2 border-gray-900 pt-3 flex justify-between">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-lg font-bold text-gray-900">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <label className="flex items-start gap-2">
          <input type="checkbox" className="w-4 h-4 mt-0.5" />
          <span className="text-sm text-gray-700">
            Secure checkout with SSL encryption
          </span>
        </label>

        <label className="flex items-start gap-2">
          <input type="checkbox" className="w-4 h-4 mt-0.5" />
          <span className="text-sm text-gray-700">
            Fast shipping and handling
          </span>
        </label>
      </div>
    </div>
  );
}
