interface OrderHeaderProps {
  orderNumber: string;
  placedDate: string;
  trackingNumber?: string;
}

export default function OrderHeader({
  orderNumber,
  placedDate,
  trackingNumber,
}: OrderHeaderProps) {
  return (
    <div className="text-center mb-8">
      {/* Success Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Order Confirmed!
      </h1>
      <p className="text-gray-600 mb-6">
        Thank you for your order. We&apos;ve received your order and will
        process it shortly.
      </p>

      {/* Order Details */}
      <div className="flex items-center justify-center gap-8 text-sm flex-wrap">
        <div className="flex items-center gap-2">
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-gray-600">Order</span>
          <span className="font-semibold text-gray-900">{orderNumber}</span>
        </div>
        <div className="flex items-center gap-2">
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-gray-600">Placed on</span>
          <span className="font-semibold text-gray-900">{placedDate}</span>
        </div>
        {trackingNumber && (
          <div className="flex items-center gap-2">
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span className="text-gray-600">Tracking ID</span>
            <span className="font-semibold text-blue-600">
              {trackingNumber}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
