interface OrderItem {
  id: number;
  name: string;
  seller: string;
  quantity: number;
  price: number;
  rating: number;
  status: string;
  trackingId: string;
}

interface OrderItemsProps {
  items: OrderItem[];
}

export default function OrderItems({ items }: OrderItemsProps) {
  return (
    <div className="border-2 border-gray-900 rounded p-6 mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Order Items:</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="border-b border-gray-300 pb-4">
            <div className="flex gap-4">
              {/* Product Image Placeholder */}
              <div className="w-24 h-24 border-2 border-gray-900 rounded flex items-center justify-center bg-gray-50">
                <svg
                  className="w-12 h-12 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      by {item.seller}
                      <span className="ml-2 flex items-center gap-1">
                        <svg
                          className="w-4 h-4 text-gray-900"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {item.rating}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Qty: {item.quantity} @ ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Ships: {item.status}
                    </p>
                  </div>
                </div>

                {/* Tracking ID */}
                <div className="bg-gray-50 px-3 py-2 rounded mt-2 inline-block">
                  <p className="text-xs text-gray-600">
                    Tracking ID:{" "}
                    <span className="font-mono text-gray-900">
                      {item.trackingId}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
