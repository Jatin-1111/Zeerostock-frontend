"use client";

interface OrderItem {
  id: string;
  name: string;
  supplier: string;
  quantity: number;
  price: string;
  image?: string;
}

interface OrderItemsProps {
  items: OrderItem[];
}

export default function OrderItems({ items }: OrderItemsProps) {
  return (
    <div className="bg-white border-2 border-gray-900 rounded p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Order Items</h3>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 p-4 border-2 border-gray-900 rounded"
          >
            {/* Product Image Placeholder */}
            <div className="w-20 h-20 bg-gray-100 border-2 border-gray-900 rounded flex items-center justify-center shrink-0">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 mb-1">{item.name}</h4>
              <p className="text-sm text-gray-600 mb-2">
                by {item.supplier} • {item.id}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600">Qty: {item.quantity}</span>
                <span className="text-gray-600">Price: {item.price}</span>
                <span className="font-bold text-gray-900">Total</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tracking Label */}
      <div className="mt-6 p-4 bg-gray-50 border-2 border-gray-900 rounded">
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-900">Tracking</span>
          <button className="text-sm text-gray-900 underline hover:text-gray-700">
            DOWNLOAD SHIPPING LABEL
          </button>
        </div>
      </div>
    </div>
  );
}
