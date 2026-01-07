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
      if (response?.success && response?.data) {
        const productsList = Array.isArray(response.data?.products)
          ? response.data.products
          : [];
        setProducts(productsList);
      } else {
        console.warn("No products data received:", response);
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
    <div className="max-w-[900px] mx-auto py-9 px-3">
      {/* Header with title and filters */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-[24px] text-[#1a1a1a] m-0">
          All products
        </h2>

        {/* Filters */}
        <div className="flex items-center gap-2">
          {/* Category dropdown */}
          <div className="relative">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-[150px] h-[30px] px-2 pr-8 border border-gray-300 rounded-lg text-[10.5px] text-gray-700 bg-white cursor-pointer appearance-none"
            >
              <option value="all">All Categories (15,420)</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
            </select>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#666"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-[105px] h-[30px] px-2 pr-8 border border-gray-300 rounded-lg text-[10.5px] text-gray-700 bg-white cursor-pointer appearance-none"
            >
              <option value="relevance">Relevance</option>
              <option value="price_asc">Low to High</option>
              <option value="price_desc">High to Low</option>
              <option value="newest">Newest First</option>
            </select>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#666"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* More Filters button */}
          <button className="flex items-center gap-1.5 px-3 h-[30px] border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors cursor-pointer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
                stroke="#666"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[10.5px] text-gray-700">More Filters</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow-md"
            >
              <div className="w-full h-30 bg-gray-200 animate-pulse"></div>
              <div className="p-3">
                <div className="h-4 bg-gray-200 mb-1.5 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 w-3/5 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🏪</div>
          <h3 className="text-xl text-[#0d1b2a] mb-2">No products available</h3>
          <p className="text-sm text-gray-600 mb-4 max-w-lg mx-auto">
            {location !== "all"
              ? `No products found in ${location}. Try selecting a different location.`
              : "Products are being added to our marketplace. Check back soon!"}
          </p>
          <button
            onClick={() => fetchProducts()}
            className="px-[18px] py-2 bg-[#1e3a8a] text-white border-none rounded-lg cursor-pointer text-[12px] hover:bg-[#2d4a9a] transition-colors"
          >
            Refresh
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4">
            {products.map((product, index) => (
              <Link
                key={product?.productId || index}
                href={`/product/${product?.slug || "unknown"}`}
                className="no-underline"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-1 transition-transform duration-200 cursor-pointer">
                  {/* Product image */}
                  <div className="w-full h-30 bg-gray-100">
                    {product?.image ? (
                      <img
                        src={product.image}
                        alt={product?.title || "Product"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : null}
                  </div>

                  {/* Product details */}
                  <div className="p-3">
                    <h3 className="font-medium text-[12px] text-[#1a1a1a] m-0 mb-1.5 truncate">
                      {product?.title || "Product"}
                    </h3>

                    {/* Stars and rating count */}
                    <div className="flex items-center gap-1 mb-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          width="10.5"
                          height="10.5"
                          viewBox="0 0 19 18"
                          fill="none"
                        >
                          <path
                            d="M9.5 0L11.6 6.9L19 6.9L13 11.1L15.1 18L9.5 13.8L3.9 18L6 11.1L0 6.9L7.4 6.9L9.5 0Z"
                            fill="#FFD700"
                          />
                        </svg>
                      ))}
                      <span className="text-[9px] text-gray-500 ml-0.5">
                        (2338)
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1 mb-2">
                      <svg
                        width="10.5"
                        height="10.5"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                          fill="#666"
                        />
                      </svg>
                      <span className="text-[9px] text-gray-600">
                        {product?.city || "Mumbai"},IN
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="font-bold text-xl text-[#2D4A9A]">
                        ₹{(product?.price || 0).toLocaleString("en-IN")}
                      </span>
                      {product?.originalPrice &&
                        product.originalPrice > (product.price || 0) && (
                          <span className="text-[10.5px] text-gray-400 line-through">
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                    </div>

                    {/* View Deal button */}
                    <button className="w-full h-[30px] bg-[#2D4A9A] rounded-lg border-none cursor-pointer font-semibold text-[10.5px] text-white hover:bg-[#3d5aaa] transition-colors">
                      View Deal
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More button */}
          <div className="text-center mt-8">
            <Link href="/marketplace?filter=all" className="no-underline">
              <button className="px-6 py-2 text-[14px] text-[#0d1b2a] bg-transparent border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                Load More Products
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
