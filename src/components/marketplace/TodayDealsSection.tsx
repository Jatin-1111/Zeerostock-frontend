import Link from "next/link";

export default function TodayDealsSection() {
  const deals = [
    {
      title: "Industrial Steel Pipes - Grade A36",
      supplier: "SteelCorp USA",
      price: "₹12.50",
      originalPrice: "₹18.00",
      discount: "32% Off",
      location: "Mumbai",
    },
    {
      title: "Industrial Steel Pipes - Grade A36",
      supplier: "SteelCorp USA",
      price: "₹12.50",
      originalPrice: "₹18.00",
      discount: "32% Off",
      location: "Mumbai",
    },
    {
      title: "Industrial Steel Pipes - Grade A36",
      supplier: "SteelCorp USA",
      price: "₹12.50",
      originalPrice: "₹18.00",
      discount: "32% Off",
      location: "Mumbai",
    },
  ];

  return (
    <div className="bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Today&apos;s Exclusive Deals
        </h2>
        <Link href="#" className="text-sm text-blue-600 hover:underline">
          View more →
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {deals.map((deal, index) => (
          <div
            key={index}
            className="border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
              <span className="text-sm text-gray-400">Product Image</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{deal.title}</h3>
              <p className="text-sm text-gray-600 mb-3">by {deal.supplier}</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl font-bold text-gray-900">
                  {deal.price}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {deal.originalPrice}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                  {deal.discount}
                </span>
                <span className="text-xs text-gray-600">
                  📍 {deal.location}
                </span>
              </div>
              <button className="w-full mt-3 py-2 border border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-900 hover:text-white transition-colors">
                View Deal
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
