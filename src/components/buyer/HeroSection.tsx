import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-white p-8">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm text-gray-600 mb-4">For Smart Buyers</p>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Source Surplus Inventory at 30-60% Below Market Price
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Access verified surplus inventory from top manufacturers. Get
              exceptional value on high-quality surplus inventory through our
              AI-powered marketplace. Reduce costs, speed up procurement, and
              grow your bottom line.
            </p>
            <div className="flex items-center gap-4 mb-8">
              <Link
                href="/signup"
                className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Start Sourcing Now
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Request Demo
              </Link>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border-2 border-gray-900 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-gray-900"
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
                </div>
                <span className="text-sm text-gray-600">Free to Join</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border-2 border-gray-900 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-gray-900"
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
                </div>
                <span className="text-sm text-gray-600">No Hidden fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border-2 border-gray-900 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-gray-900"
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
                </div>
                <span className="text-sm text-gray-600">Instant Access</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center border-2 border-gray-900">
            <span className="text-gray-400">Image/Illustration</span>
          </div>
        </div>
      </div>
    </section>
  );
}
