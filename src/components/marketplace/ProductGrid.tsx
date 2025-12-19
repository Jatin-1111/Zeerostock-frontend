"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";
import MarketplaceFilterSidebar from "@/components/marketplace/MarketplaceFilterSidebar";
import { marketplaceService } from "@/services/marketplace.service";
import type { Product } from "@/types/api.types";

interface ProductGridProps {
  initialQuery?: string;
}

export default function ExploreProductGrid({
  initialQuery = "",
}: ProductGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    initialQuery || searchParams.get("q") || ""
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("relevance"); // Will be used for sorting feature
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filters, setFilters] = useState<Record<string, any>>({});

  const fetchProducts = useCallback(
    async (query?: string) => {
      try {
        setIsLoading(true);
        setError(null);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const apiFilters: Record<string, any> = {
          page: currentPage,
          limit: 20,
          sortBy: sortBy === "relevance" ? undefined : sortBy,
          ...filters,
        };

        if (query) {
          apiFilters.search = query;
        }

        const response = await marketplaceService.getProducts(apiFilters);

        if (response.success && response.data) {
          const productsList = Array.isArray(response.data.products)
            ? response.data.products
            : [];
          setProducts(productsList);
          setTotalPages(response.data.pagination?.totalPages || 1);
        } else {
          // Handle case where API returns success but no data
          setProducts([]);
          setTotalPages(1);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Unable to load products. Please try again later.");
        setProducts([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, sortBy, filters]
  );

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
      fetchProducts(query);
    } else {
      fetchProducts();
    }
  }, [searchParams, fetchProducts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    router.push(`/marketplace?q=${encodeURIComponent(query)}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen">
      {/* Filter Sidebar - Collapsable */}
      {/* <MarketplaceFilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFilterChange={handleFilterChange}
      /> */}

      {/* Main Content */}
      <div className="flex-1">
        {/* Header with Search */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-3ww0">
          <div className="flex items-center gap-3 p-3">
            {/* Menu Button - Toggle Filter Sidebar */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="p-1.5 text-black rounded-lg transition-colors"
              aria-label="Toggle filters"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-3xl">
              <div className="relative flex items-center gap-2 border-2 border-gray-900 rounded-lg">
                <div className="flex items-center px-2 border-r border-gray-300">
                  <span className="text-xs font-medium">All</span>
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search for products, categories, etc"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(searchQuery);
                    }
                  }}
                  className="flex-1 px-2 py-2 text-xs focus:outline-none"
                />
                <button
                  onClick={() => handleSearch(searchQuery)}
                  className="px-4 py-2 bg-white text-black text-xs font-medium hover:bg-gray-100 transition-colors rounded-r-lg"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-3 mb-3">
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <svg
                    className="w-4 h-4 text-red-600 mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="text-xs font-semibold text-red-800 mb-1">
                      Error Loading Products
                    </h3>
                    <p className="text-xs text-red-600">{error}</p>
                  </div>
                </div>
                <button
                  onClick={() => fetchProducts(searchQuery)}
                  className="ml-3 px-3 py-1.5 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shrink-0"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="p-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="bg-gray-200 aspect-283/202 animate-pulse"></div>
                  <div className="p-3 space-y-1.5">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-5xl mb-3">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchQuery ? "No products found" : "No products available"}
              </h3>
              <p className="text-gray-600 mb-3 text-sm">
                {searchQuery
                  ? `Try adjusting your search or filters`
                  : "Check back later for new products"}
              </p>
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    router.push("/marketplace");
                  }}
                  className="px-4 py-1.5 bg-[#1a5f52] text-white text-sm rounded-lg hover:bg-[#155144]"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product, index) => (
                  <div
                    key={product?.productId || index}
                    className="bg-white border border-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    {/* Product Image */}
                    <div className="relative bg-gray-100 aspect-283/202 flex items-center justify-center overflow-hidden">
                      {product?.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.image}
                          alt={product?.title || "Product"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">No Image</span>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      {/* Title */}
                      <h3 className="text-[15px] font-medium text-gray-900 mb-1.5 line-clamp-2">
                        {product?.title || "Untitled Product"}
                      </h3>

                      {/* Price and Rating */}
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className="w-3.5 h-[13px]"
                              viewBox="0 0 19 18"
                              fill="#FFD700"
                            >
                              <path d="M9.5 0l2.5 6.5h6.5l-5 4 2 6.5-6-4.5-6 4.5 2-6.5-5-4h6.5z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-[15px] text-gray-600">
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {(product as any)?.rating ||
                            (product as any)?.averageRating ||
                            "4.5"}
                        </span>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <svg
                          className="w-3 h-3 text-gray-600"
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
                        <span className="text-[15px] text-gray-600">
                          {product?.city || "Unknown Location"}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="mb-3">
                        <span className="text-[15px] font-medium text-gray-900">
                          ₹{(product?.price || 0).toLocaleString("en-IN")}
                        </span>
                        {product?.originalPrice &&
                          product.originalPrice > (product.price || 0) && (
                            <span className="text-[15px] text-gray-500 line-through ml-1.5">
                              ₹{product.originalPrice.toLocaleString("en-IN")}
                            </span>
                          )}
                      </div>

                      {/* View Details Button */}
                      <Link href={`/product/${product?.slug || "unknown"}`}>
                        <button className="w-full py-2 bg-white border-2 border-gray-900 text-gray-900 text-[15px] font-medium rounded hover:bg-gray-900 hover:text-white transition-colors">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {totalPages > currentPage && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="px-6 py-3 bg-white border-2 border-gray-900 text-gray-900 text-[14px] font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
                  >
                    Load More Products
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
