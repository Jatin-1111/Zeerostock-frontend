export default function ExploreProductGrid() {
  const products = Array(20).fill({
    title: "Industrial Steel Pipes",
    subtitle: "Grade A36 - 1kg",
    price: "₹12.50",
    originalPrice: "₹18.00",
    location: "Mumbai",
  });

  return (
    <div className="flex-1">
      {/* Search and Sort Bar */}
      <div className="bg-white border-b border-gray-200 p-4 mb-6 sticky top-0 z-10">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search thousands products here and get results..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Sort
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        <div className="mb-4 text-sm text-gray-600">Load more results</div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Yellow Badge */}
              {index % 3 === 0 && (
                <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded">
                  HOT
                </div>
              )}

              <div className="relative">
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-xs text-gray-400">Product Image</span>
                </div>
                {/* Heart Icon */}
                <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-white">
                  <svg
                    className="w-4 h-4 text-gray-400"
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

              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-xs text-gray-600 mb-2">{product.subtitle}</p>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base font-bold text-gray-900">
                    {product.price}
                  </span>
                  <span className="text-xs text-gray-500 line-through">
                    {product.originalPrice}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-600">
                    📍 {product.location}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
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
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
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

        <div className="mt-8 text-center">
          <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-colors">
            Load more results
          </button>
        </div>
      </div>
    </div>
  );
}
