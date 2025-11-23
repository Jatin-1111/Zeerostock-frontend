interface ShippingAddress {
  name: string;
  company: string;
  street: string;
  city: string;
  phone: string;
}

interface PaymentInfo {
  method: string;
  status: string;
}

interface ShippingInfo {
  method: string;
  date: string;
}

interface ShippingPaymentInfoProps {
  shippingAddress: ShippingAddress;
  paymentInfo: PaymentInfo;
  shippingInfo: ShippingInfo;
  escrowAmount: string;
}

export default function ShippingPaymentInfo({
  shippingAddress,
  paymentInfo,
  shippingInfo,
  escrowAmount,
}: ShippingPaymentInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Shipping Address */}
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
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h3 className="font-bold text-gray-900">Shipping Address</h3>
        </div>
        <div className="text-sm text-gray-700 space-y-1">
          <p className="font-medium">{shippingAddress.name}</p>
          <p>{shippingAddress.company}</p>
          <p>{shippingAddress.street}</p>
          <p>{shippingAddress.city}</p>
          <p className="pt-2">{shippingAddress.phone}</p>
        </div>
      </div>

      {/* Payment & Shipping */}
      <div className="border-2 border-gray-900 rounded p-6">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
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
            <h3 className="font-bold text-gray-900">Payment & Shipping</h3>
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">Payment Method</p>
            <p className="text-sm font-medium text-gray-900">
              {paymentInfo.method}
            </p>
          </div>

          {/* Payment Status */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">Payment Status</p>
            <p className="text-sm font-medium text-gray-900">
              {paymentInfo.status}
            </p>
          </div>

          {/* Shipping Method */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">Shipping Method</p>
            <p className="text-sm font-medium text-gray-900">
              {shippingInfo.method}
            </p>
          </div>

          {/* Escrow Release */}
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-500 mb-1">Escrow Release</p>
            <p className="text-sm font-medium text-gray-900">{escrowAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
