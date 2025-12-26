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
  const [sortBy] = useState("relevance"); // Will be used for sorting feature
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
      <MarketplaceFilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFilterChange={handleFilterChange}
      />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header with Search */}
        <div className="bg-white shadow-[0px_1px_5px_0px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-[14px] px-[14px] py-[20px]">
            {/* Menu Button - Toggle Filter Sidebar */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="text-gray-700 transition-colors"
              aria-label="Toggle filters"
            >
              <Menu className="w-[26px] h-[26px]" />
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-[591px]">
              <div className="flex items-center gap-[245px] bg-[rgba(235,235,235,0.65)] rounded-[11px] shadow-[0px_0px_5px_0px_rgba(24,181,34,0.5)] px-[14px] py-[6px]">
                <div className="flex items-center gap-[6px]">
                  <span className="text-[13px] font-semibold text-[#374151] opacity-80">
                    All
                  </span>
                  <svg
                    className="w-[20px] h-[20px] text-[#374151] opacity-80"
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
                  <div className="w-0 h-[26px] border-l-2 border-gray-300 mx-[3px]"></div>
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
                    className="flex-1 bg-transparent text-[11px] font-medium text-[#374151] opacity-80 focus:outline-none placeholder:text-[#374151] placeholder:opacity-80 min-w-[169px]"
                  />
                </div>
                <div className="flex items-center gap-[8px]">
                  <div className="w-0 h-[26px] border-l-2 border-gray-300"></div>
                  <button
                    onClick={() => handleSearch(searchQuery)}
                    className="text-[14px] font-medium text-[#374151] opacity-80 hover:opacity-100 transition-opacity"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-[14px] py-3">
            <div className="p-[14px] bg-red-50 border border-red-200 rounded-[11px]">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-red-600 mt-0.5 shrink-0"
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
                    <h3 className="text-base font-semibold text-red-800 mb-1">
                      Error Loading Products
                    </h3>
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                </div>
                <button
                  onClick={() => fetchProducts(searchQuery)}
                  className="ml-3 px-4 py-2 text-sm bg-red-600 text-white rounded-[10px] hover:bg-red-700 transition-colors shrink-0"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="p-[14px]">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px]">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-[11px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] overflow-hidden"
                >
                  <div className="bg-gray-200 aspect-283/202 animate-pulse m-[6px] rounded-[11px]"></div>
                  <div className="px-[12px] pb-[11px] space-y-3">
                    <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-5xl mb-3">🔍</div>
              <h3 className="text-xl font-semibold text-[#0d1b2a] mb-2">
                {searchQuery ? "No products found" : "No products available"}
              </h3>
              <p className="text-[#787878] mb-3 text-base">
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
                  className="px-[14px] py-[7px] bg-[#1e3a8a] text-white text-sm rounded-[8px] hover:bg-[#1e3a8a]/90 transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px]">
                {products.map((product, index) => (
                  <div
                    key={product?.productId || index}
                    className="bg-white rounded-[11px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Product Image */}
                    <div className="relative bg-gray-100 aspect-283/202 flex items-center justify-center overflow-hidden m-[6px] rounded-[11px]">
                      {product?.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.image}
                          alt={product?.title || "Product"}
                          className="w-full h-full object-cover rounded-[11px]"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">No Image</span>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="px-[12px] pb-[11px]">
                      {/* Title and Reviews */}
                      <div className="mb-[5px]">
                        <h3 className="text-[11px] font-medium text-[#0d1b2a] mb-1 line-clamp-2">
                          {product?.title || "Untitled Product"}
                        </h3>
                        <span className="text-[8px] font-medium text-[#787878]">
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          ({(product as any)?.reviewCount || "1336"})
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-[5px]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className="w-[11px] h-[11px]"
                            viewBox="0 0 19 18"
                            fill={star <= 4 ? "#FFD700" : "none"}
                            stroke={star > 4 ? "#FFD700" : "none"}
                            strokeWidth={star > 4 ? "1" : "0"}
                          >
                            <path d="M9.5 0l2.5 6.5h6.5l-5 4 2 6.5-6-4.5-6 4.5 2-6.5-5-4h6.5z" />
                          </svg>
                        ))}
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1 mb-3">
                        <svg
                          className="w-[10px] h-[11px] text-[#0d1b2a]"
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
                        <span className="text-[11px] font-medium text-[#0d1b2a]">
                          {product?.city || "Mumbai"}, IN
                        </span>
                      </div>

                      {/* Price */}
                      <div className="mb-3">
                        <span className="text-[15px] font-bold text-[#1e3a8a]">
                          ₹{(product?.price || 0).toLocaleString("en-IN")}
                        </span>
                        {product?.originalPrice &&
                          product.originalPrice > (product.price || 0) && (
                            <span className="text-[11px] font-bold text-[#787878] line-through ml-2 relative">
                              ₹{product.originalPrice.toLocaleString("en-IN")}
                              <span className="absolute left-0 top-1/2 w-full h-0.5 bg-[#787878]"></span>
                            </span>
                          )}
                      </div>

                      {/* View Deal Button */}
                      <Link href={`/product/${product?.slug || "unknown"}`}>
                        <button className="w-full py-[8px] bg-[#1e3a8a] text-white text-[11px] font-semibold rounded-[8px] hover:bg-[#1e3a8a]/90 transition-colors">
                          View Deal
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
                    className="px-6 py-3 bg-white border-2 border-[#1e3a8a] text-[#1e3a8a] text-[11px] font-medium rounded-[8px] hover:bg-[#1e3a8a] hover:text-white transition-colors"
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
