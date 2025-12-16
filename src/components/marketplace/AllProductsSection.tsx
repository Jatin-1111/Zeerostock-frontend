"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { marketplaceService } from "@/services/marketplace.service";
import type { Product } from "@/types/api.types";

export default function AllProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");
  const [location, setLocation] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, [sortBy, location]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const filters: any = {
        limit: 10,
        sortBy: sortBy === "relevance" ? undefined : sortBy,
      };

      if (location !== "all") {
        filters.state = location;
      }

      const response = await marketplaceService.getProducts(filters);
      if (response.success && response.data) {
        const productsList = Array.isArray(response.data.products)
          ? response.data.products
          : [];
        setProducts(productsList);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">All Products</h2>
        <div className="flex items-center gap-4">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-600"
          >
            <option value="all">All Located IN STATE</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-600"
          >
            <option value="relevance">Show All</option>
            <option value="price_asc">Low to High</option>
            <option value="price_desc">High to Low</option>
            <option value="newest">Newest First</option>
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

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border border-gray-200 overflow-hidden">
              <div className="w-full h-40 bg-gray-200 animate-pulse"></div>
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 px-4">
          <div className="text-gray-400 text-5xl mb-4">🏪</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No products available
          </h3>
          <p className="text-gray-600 mb-4 max-w-md mx-auto">
            {location !== "all"
              ? `No products found in ${location}. Try selecting a different location.`
              : "Products are being added to our marketplace. Check back soon!"}
          </p>
          <button
            onClick={() => fetchProducts()}
            className="px-6 py-2 bg-[#1a5f52] text-white rounded-lg hover:bg-[#155144] transition-colors"
          >
            Refresh
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((product, index) => (
              <Link
                key={product?.productId || index}
                href={`/product/${product?.slug || "unknown"}`}
              >
                <div className="border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="w-full h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                    {product?.image ? (
                      <img
                        src={product.image}
                        alt={product?.title || "Product"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.parentElement!.innerHTML =
                            '<span class="text-xs text-gray-400">Product Image</span>';
                        }}
                      />
                    ) : (
                      <span className="text-xs text-gray-400">
                        Product Image
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                      {product?.title || "Product"}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">
                      by {product?.seller?.name || "Zeerostock"}
                    </p>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-base font-bold text-gray-900">
                        ₹{(product?.price || 0).toLocaleString("en-IN")}
                      </span>
                      {product?.originalPrice &&
                        product.originalPrice > (product.price || 0) && (
                          <span className="text-xs text-gray-500 line-through">
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                    </div>
                    <div className="flex items-center justify-between mb-2">
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
                        {product?.city || "Unknown"}
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
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link href="/marketplace?filter=all">
              <button className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium">
                Load more results
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
