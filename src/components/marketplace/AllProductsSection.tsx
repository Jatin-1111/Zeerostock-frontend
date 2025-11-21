export default function AllProductsSection() {
  const products = Array(10).fill({
    title: "Industrial Steel Pipes",
    supplier: "AlterECO INDIA",
    price: "₹12.50",
    originalPrice: "₹18.00",
    location: "Mumbai",
  });

  return (
    <div className="bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">All Products</h2>
        <div className="flex items-center gap-4">
          <select className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-600">
            <option>All Located IN STATE</option>
            <option>Maharashtra</option>
            <option>Delhi</option>
            <option>Karnataka</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-600">
            <option>Show All</option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded hover:bg-white text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
              <span className="text-xs text-gray-400">Product Image</span>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {product.title}
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                by {product.supplier}
              </p>
              <div className="flex items-center gap-1 mb-2">
                <span className="text-base font-bold text-gray-900">
                  {product.price}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  {product.originalPrice}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">
                  📍 {product.location}
                </span>
                <button className="text-gray-400 hover:text-red-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
              <button className="w-full py-2 border border-gray-900 text-gray-900 rounded text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors">
                View Deal
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium">
          Load more results
        </button>
      </div>
    </div>
  );
}
