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
        <h2 className="text-xl font-bold text-gray-900">
          ⚡ Sponsored Listings
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
                <span className="text-xs text-gray-600">
                  📍 {listing.location}
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
