"use client";

import { Eye, Star, MessageCircle, Clock, Edit, BarChart3 } from "lucide-react";

export default function SupplierListings() {
  const listings = [
    {
      id: 1,
      title: "Premium Fabric Materials",
      price: 35000,
      originalPrice: 40000,
      previousPrice: 50000,
      available: "500 kms",
      views: 1234,
      rating: 4.5,
      comments: 23,
      watching: 45,
    },
    {
      id: 2,
      title: "Premium Fabric Materials",
      price: 35000,
      originalPrice: 40000,
      previousPrice: 50000,
      available: "500 kms",
      views: 1234,
      rating: 4.5,
      comments: 23,
      watching: 45,
    },
    {
      id: 3,
      title: "Premium Fabric Materials",
      price: 35000,
      originalPrice: 40000,
      previousPrice: 50000,
      available: "500 kms",
      views: 1234,
      rating: 4.5,
      comments: 23,
      watching: 45,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Active Listings
          </h1>
          <p className="text-sm text-gray-600">
            Manage your active product listings
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Enable auto-emailed, direct & Or one-page
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white border-2 border-gray-900 overflow-hidden"
            >
              {/* Product Image */}
              <div className="w-full h-64 bg-gray-200 border-b-2 border-gray-900 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Product Image</span>
              </div>

              {/* Product Details */}
              <div className="p-4">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {listing.title}
                </h3>

                {/* Pricing */}
                <div className="mb-3">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{listing.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{listing.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Price was: ₹{listing.previousPrice.toLocaleString()}
                  </p>
                </div>

                {/* Availability */}
                <p className="text-sm text-gray-600 mb-4">
                  {listing.available} available
                </p>

                {/* Stats Row */}
                <div className="flex items-center gap-4 pb-4 border-b border-gray-300">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-gray-600" />
                    <span className="text-xs text-gray-600">
                      {listing.views}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs text-gray-600">
                      {listing.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 text-gray-600" />
                    <span className="text-xs text-gray-600">
                      {listing.comments}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-xs text-gray-600">
                      {listing.watching}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <button className="flex-1 py-2 bg-white border-2 border-gray-900 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="flex-1 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Analytics
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
