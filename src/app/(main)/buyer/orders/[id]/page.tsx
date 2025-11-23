import Link from "next/link";

export default function OrderTrackingPage({
  params,
}: {
  params: { id: string };
}) {
  const orderId = params.id;

  // Timeline data
  const timeline = [
    {
      step: "Order Placed",
      date: "Jan 15, 2025 - 10:30 AM",
      completed: true,
    },
    {
      step: "Payment Confirmed",
      date: "Jan 15, 2025 - 10:35 AM",
      completed: true,
    },
    {
      step: "In Transit",
      date: "Jan 16, 2025 - 2:00 PM",
      completed: true,
    },
    {
      step: "Out for Delivery",
      date: "Jan 18, 2025 - 9:00 AM",
      completed: false,
    },
    {
      step: "Delivered",
      date: "Expected: Jan 18, 2025",
      completed: false,
    },
  ];

  // Order items
  const orderItems = [
    {
      id: 1,
      name: "Industrial Electronics Components",
      quantity: 100,
      price: 50,
    },
    {
      id: 2,
      name: "Medical Equipment Surplus",
      quantity: 50,
      price: 120,
    },
  ];

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 250;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto py-12 px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Order #{orderId}
            </h1>
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              In Transit
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white p-8 border-2 border-gray-900 rounded-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Order Status
          </h2>
          <div className="relative">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-6 mb-8 last:mb-0"
              >
                {/* Icon/Checkmark */}
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      item.completed
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {item.completed ? (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < timeline.length - 1 && (
                    <div
                      className={`absolute left-6 top-12 w-0.5 h-16 ${
                        item.completed ? "bg-gray-900" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
                {/* Text */}
                <div className="flex-1 pt-2">
                  <h3
                    className={`text-xl font-bold ${
                      item.completed ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {item.step}
                  </h3>
                  <p
                    className={`text-sm ${
                      item.completed ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white p-8 border-2 border-gray-900 rounded-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Order Details
          </h2>
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between pb-4 border-b border-gray-300 last:border-b-0"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold text-gray-900">
                  ${(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t-2 border-gray-300 space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span>${shipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t-2 border-gray-300">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="bg-white p-8 border-2 border-gray-900 rounded-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Delivery Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Shipping Address</h3>
              <div className="text-gray-700">
                <p className="font-medium">John Doe</p>
                <p>123 Business Ave</p>
                <p>San Francisco, CA 94105</p>
                <p>United States</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Contact Info</h3>
              <div className="text-gray-700">
                <p>john@company.com</p>
                <p>+1 (555) 123-4567</p>
              </div>
              <h3 className="font-bold text-gray-900 mt-6 mb-3">
                Carrier Info
              </h3>
              <div className="text-gray-700">
                <p>FedEx Express</p>
                <p className="font-medium">Tracking: FDX123456789</p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-gray-50 p-8 border-2 border-gray-900 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Need Help?</h2>
          <div className="flex items-center gap-4">
            <Link
              href="/support"
              className="px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </Link>
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
