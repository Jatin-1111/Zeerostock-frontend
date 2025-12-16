"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductDetail } from "@/types/api.types";

interface ProductInfoProps {
  product: ProductDetail;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(product.minimumOrderQuantity || 1);
  const [bidAmount, setBidAmount] = useState(product.price);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatTimeLeft = (seconds?: number | null) => {
    if (!seconds) return null;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}H : ${minutes}M`;
  };

  const estimatedTotal = bidAmount * quantity;
  const isAuction = product.listingType === "auction";

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Link href="/marketplace" className="hover:text-gray-900">
          Back to Marketplace
        </Link>
        {product.category && (
          <>
            <span>/</span>
            <span className="text-gray-900">{product.category.name}</span>
          </>
        )}
        {product.industry && (
          <>
            <span>/</span>
            <span className="text-gray-900">{product.industry.name}</span>
          </>
        )}
      </div>

      {/* Title and Price */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {product.title}
        </h1>
        <p className="text-gray-600 mb-4">
          {product.condition} • {product.city}, {product.state}
        </p>

        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-4xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-2xl text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-2">
          {product.minimumOrderQuantity &&
            `MOQ: ${product.minimumOrderQuantity} units`}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Product ID: {product.productId.substring(0, 8)}
        </p>
      </div>

      {/* Statistics */}
      <div className="flex items-center gap-6 py-4 border-t border-b border-gray-200">
        {isAuction && product.timeLeft && (
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-gray-600"
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
            <div>
              <p className="text-xs text-gray-600">Time Remaining</p>
              <p className="text-sm font-semibold text-gray-900">
                {formatTimeLeft(product.timeLeft)}
              </p>
            </div>
          </div>
        )}

        {product.views !== undefined && (
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <div>
              <p className="text-xs text-gray-600">Views</p>
              <p className="text-sm font-semibold text-gray-900">
                {product.views}
              </p>
            </div>
          </div>
        )}

        {product.watchers !== undefined && (
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-gray-600"
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
            <div>
              <p className="text-xs text-gray-600">Watching</p>
              <p className="text-sm font-semibold text-gray-900">
                {product.watchers}
              </p>
            </div>
          </div>
        )}

        {product.stockQuantity !== undefined && (
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <div>
              <p className="text-xs text-gray-600">Stock</p>
              <p className="text-sm font-semibold text-gray-900">
                {product.stockQuantity}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Place Your Bid / Order */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">
          {isAuction ? "Place Your Bid" : "Order Details"}
        </h3>

        {isAuction && (
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-2">
              Bid Amount
            </label>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) =>
                setBidAmount(parseFloat(e.target.value) || product.price)
              }
              placeholder={formatPrice(product.price)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <p className="text-xs text-gray-600 mt-1">
              Current price: {formatPrice(product.price)}
            </p>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">
            Quantity
            {product.minimumOrderQuantity &&
              ` (MOQ: ${product.minimumOrderQuantity})`}
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setQuantity(
                  Math.max(product.minimumOrderQuantity || 1, quantity - 1)
                )
              }
              className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 1;
                setQuantity(Math.max(product.minimumOrderQuantity || 1, val));
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
            >
              +
            </button>
            {product.stockQuantity && (
              <span className="text-sm text-gray-600 ml-2">
                Available: {product.stockQuantity}
              </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">
            Message to Seller (Optional)
          </label>
          <textarea
            placeholder="Add a note to the seller if required"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
      </div>

      {/* Estimated Total */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Estimated Total:</h3>
        <div className="flex justify-between items-center text-2xl font-bold text-gray-900 mb-4">
          <span>{formatPrice(estimatedTotal)}</span>
          <span className="text-sm font-normal text-gray-600">
            *taxes & fees extra
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {isAuction ? (
            <>
              <button className="py-3 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-900 hover:text-white transition-colors">
                <span className="mr-2">₹</span>
                Place Bid
              </button>
              <button className="py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Buy Now
              </button>
            </>
          ) : (
            <>
              <button className="py-3 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-900 hover:text-white transition-colors">
                Add to Cart
              </button>
              <button className="py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Buy Now
              </button>
            </>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 mt-4">
          <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Watchlist
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Request Quote
          </button>
        </div>
      </div>

      {/* Seller Info */}
      {product.seller && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">
            Seller Information
          </h3>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-gray-600">
                {product.seller.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{product.seller.name}</p>
              {product.seller.isVerified && (
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified Seller
                </p>
              )}
            </div>
          </div>
          {product.seller.rating !== undefined && product.seller.rating > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-yellow-500">★</span>
              <span className="font-medium">
                {product.seller.rating.toFixed(1)}
              </span>
              <span className="text-gray-600">rating</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
