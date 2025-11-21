export default function TrendingListingsSection() {
  const listings = [
    {
      title: "Industrial Electronics Compon",
      supplier: "Electroni",
      price: "₹20,00,00",
      originalPrice: "₹40,00,00",
      views: "234 view",
      daysLeft: "2 days left",
    },
    {
      title: "Industrial Electronics Compon",
      supplier: "Electroni",
      price: "₹20,00,00",
      originalPrice: "₹40,00,00",
      views: "234 view",
      daysLeft: "2 days left",
    },
    {
      title: "Industrial Electronics Compon",
      supplier: "Electroni",
      price: "₹20,00,00",
      originalPrice: "₹40,00,00",
      views: "234 view",
      daysLeft: "2 days left",
    },
  ];

  const categories = [
    { name: "Electronics", percentage: "+24%", positive: true },
    { name: "Machinery", percentage: "+10%", positive: true },
    { name: "Textiles", percentage: "-7%", positive: false },
    { name: "Automotive", percentage: "+13%", positive: true },
    { name: "Materials", percentage: "+3%", positive: true },
  ];

  return (
    <section className="bg-white p-8 md:p-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Trending Listings & Market Analytics
        </h2>
        <p className="text-gray-500 text-lg">
          Discover high-demand inventory and stay informed with real-time market
          insights
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Listings - Left Column */}
        <div className="lg:col-span-2 space-y-4">
          {listings.map((listing, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 border-2 border-gray-300 rounded hover:shadow-md transition-shadow"
            >
              <div className="w-32 h-24 bg-white border border-gray-300 rounded flex items-center justify-center shrink-0">
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-1">
                    Listing Image
                  </div>
                  <svg
                    className="w-12 h-12 mx-auto text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {listing.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {listing.supplier}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    {listing.views}
                  </span>
                  <span className="flex items-center gap-1">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {listing.daysLeft}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900 mb-1">
                  {listing.price}
                </div>
                <div className="text-sm text-gray-500 line-through mb-2">
                  {listing.originalPrice}
                </div>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                  Save
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Market Analytics - Right Column */}
        <div className="space-y-4">
          {/* Live Market Trends */}
          <div className="border-2 border-gray-300 rounded p-6">
            <div className="flex items-center gap-2 mb-4">
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <h3 className="font-semibold text-gray-900">
                Live Market Trends
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Top 5 Categories</p>
            <div className="space-y-3">
              {categories.map((category, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{category.name}</span>
                  <span
                    className={`text-sm font-semibold ${
                      category.positive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {category.percentage}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Volume Today */}
          <div className="border-2 border-gray-300 rounded p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">₹77Cr</div>
            <div className="text-sm text-gray-500">Total Volume Today</div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-gray-300 rounded p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">156</div>
              <div className="text-xs text-gray-500">Active Listings</div>
            </div>
            <div className="border-2 border-gray-300 rounded p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">89</div>
              <div className="text-xs text-gray-500">Live Auctions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
