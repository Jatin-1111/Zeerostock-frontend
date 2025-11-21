import Link from "next/link";

export default function MarketplaceHero() {
  return (
    <div className="bg-white p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          B2B Surplus Marketplace
        </h1>
        <p className="text-gray-600">
          Browse products, filter options, or upload & match in seconds.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-6">
        <div className="relative flex gap-2">
          <input
            type="text"
            placeholder="Search surplus products, suppliers..."
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Sponsored Products */}
      <div className="border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Sponsored products
          </h2>
          <Link href="#" className="text-sm text-blue-600 hover:underline">
            View All Deals →
          </Link>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Premium listings with verified suppliers
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="border border-gray-200 p-4">
              <div className="w-full h-32 bg-gray-100 rounded mb-3 flex items-center justify-center">
                <span className="text-xs text-gray-400">Product Image</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Industrial Steel Pipes
              </h3>
              <p className="text-xs text-gray-600 mb-2">by AlterECO INDIA</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold text-gray-900">₹12.50</span>
                <span className="text-xs text-gray-500 line-through">
                  ₹20.00
                </span>
              </div>
              <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                List price
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
