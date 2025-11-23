import { Trash2, Heart } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const products = [
    {
      id: 1,
      title: "Premium Fabric Materials",
      category: "European Textiles",
      price: "₹35,000",
      originalPrice: "₹40,000",
      priceAlert: "₹30,000",
      timeLeft: "4d 20h",
    },
    {
      id: 2,
      title: "Premium Fabric Materials",
      category: "European Textiles",
      price: "₹35,000",
      originalPrice: "₹40,000",
      priceAlert: "₹30,000",
      timeLeft: "4d 20h",
    },
    {
      id: 3,
      title: "Premium Fabric Materials",
      category: "European Textiles",
      price: "₹35,000",
      originalPrice: "₹40,000",
      priceAlert: "₹30,000",
      timeLeft: "4d 20h",
    },
    {
      id: 4,
      title: "Premium Fabric Materials",
      category: "European Textiles",
      price: "₹35,000",
      originalPrice: "₹40,000",
      priceAlert: "₹30,000",
      timeLeft: "4d 20h",
    },
    {
      id: 5,
      title: "Premium Fabric Materials",
      category: "European Textiles",
      price: "₹35,000",
      originalPrice: "₹40,000",
      priceAlert: "₹30,000",
      timeLeft: "4d 20h",
    },
    {
      id: 6,
      title: "Premium Fabric Materials",
      category: "European Textiles",
      price: "₹35,000",
      originalPrice: "₹40,000",
      priceAlert: "₹30,000",
      timeLeft: "4d 20h",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border-2 border-gray-900 rounded overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative bg-gray-100 aspect-[4/3] flex items-center justify-center">
                <button className="absolute top-4 left-4 p-2 bg-white border border-gray-900 rounded hover:bg-gray-50">
                  <Trash2 className="w-4 h-4 text-gray-900" />
                </button>
                <button className="absolute top-4 right-4 p-2 bg-white rounded hover:bg-gray-50">
                  <Heart className="w-5 h-5 text-gray-900 fill-gray-900" />
                </button>
                <span className="text-gray-400 text-sm">Product Image</span>
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{product.category}</p>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {product.price}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {product.originalPrice}
                  </span>
                </div>

                <p className="text-xs text-gray-600 mb-3">
                  Price alert: {product.priceAlert}
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-600 mb-4">
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
                  <span>{product.timeLeft}</span>
                </div>

                {/* Action Buttons - 2x2 Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <button className="px-4 py-2 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors">
                    Add to cart
                  </button>
                  <button className="px-4 py-2 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors">
                    Buy Now
                  </button>
                  <button className="px-4 py-2 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
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
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    Alert
                  </button>
                  <Link
                    href={`/product/${product.id}`}
                    className="px-4 py-2 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
