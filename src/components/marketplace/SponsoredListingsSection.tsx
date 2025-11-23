export default function SponsoredListingsSection() {
  const listings = [
    {
      title: "Industrial Grade Steel Pipes",
      supplier: "SteelCorp Limited",
      price: "₹12.50",
      originalPrice: "₹18.00",
      location: "Mumbai",
    },
    {
      title: "Industrial Grade Steel Pipes",
      supplier: "SteelCorp Limited",
      price: "₹12.50",
      originalPrice: "₹18.00",
      location: "Delhi",
    },
  ];

  return (
    <div className="bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Sponsored Listings
        </h2>
        <span className="text-sm text-gray-600">See more</span>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {listings.map((listing, index) => (
          <div
            key={index}
            className="border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
              <span className="text-sm text-gray-400">Product Image</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                {listing.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                by {listing.supplier}
              </p>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl font-bold text-gray-900">
                  {listing.price}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {listing.originalPrice}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-600">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {listing.location}
                </span>
              </div>
              <button className="w-full py-2 border border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-900 hover:text-white transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
