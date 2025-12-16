"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import EnhancedSearchInput from "@/components/search/EnhancedSearchInput";
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
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
      fetchProducts(query);
    } else {
      fetchProducts();
    }
  }, [searchParams, sortBy, currentPage]);

  const fetchProducts = async (query?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const filters: any = {
        page: currentPage,
        limit: 20,
        sortBy: sortBy === "relevance" ? undefined : sortBy,
      };

      if (query) {
        filters.search = query;
      }

      const response = await marketplaceService.getProducts(filters);

      if (response.success && response.data) {
        const productsList = Array.isArray(response.data.products)
          ? response.data.products
          : [];
        setProducts(productsList);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setTotalProducts(response.data.pagination?.total || 0);
      } else {
        // Handle case where API returns success but no data
        setProducts([]);
        setTotalPages(1);
        setTotalProducts(0);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Unable to load products. Please try again later.");
      setProducts([]);
      setTotalPages(1);
      setTotalProducts(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    router.push(`/marketplace?q=${encodeURIComponent(query)}`);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return (
    <div className="flex-1">
      {/* Search and Sort Bar */}
      <div className="bg-white border-b border-gray-200 p-4 mb-6 sticky top-0 z-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <EnhancedSearchInput
                placeholder="Search thousands products here and get results..."
                showPopularSearches={true}
                onSearch={handleSearch}
              />
            </div>
          </div>

          {/* Filters and Sort */}
          {searchQuery && (
            <div className="flex flex-wrap gap-3 items-center text-sm">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                All Categories
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Price Range
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Location
              </button>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5f52]"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Results Header */}
      {searchQuery && (
        <div className="px-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Search results for "{searchQuery}"
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {isLoading
              ? "Loading..."
              : `Showing ${products.length} of ${totalProducts} results`}
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="px-4 mb-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0"
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
                  <h3 className="text-sm font-semibold text-red-800 mb-1">
                    Error Loading Products
                  </h3>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
              <button
                onClick={() => fetchProducts(searchQuery)}
                className="ml-4 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex-shrink-0"
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-200 aspect-square animate-pulse"></div>
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery ? "No products found" : "No products available"}
            </h3>
            <p className="text-gray-600 mb-4">
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
                className="px-6 py-2 bg-[#1a5f52] text-white rounded-lg hover:bg-[#155144]"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product, index) => (
                <Link
                  key={product?.productId || index}
                  href={`/product/${product?.slug || "unknown"}`}
                >
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="bg-gray-100 aspect-square flex items-center justify-center overflow-hidden relative">
                      {product?.image ? (
                        <img
                          src={product.image}
                          alt={product?.title || "Product"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.parentElement!.innerHTML =
                              '<span class="text-gray-400 text-sm">No Image</span>';
                          }}
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">No Image</span>
                      )}
                      {product?.discountPercent &&
                        product.discountPercent > 0 && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            {product.discountPercent}% OFF
                          </div>
                        )}
                      {product?.listingType === "auction" && (
                        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Auction
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                        {product?.title || "Untitled Product"}
                      </h3>
                      {product?.category && (
                        <p className="text-xs text-gray-600 mb-2">
                          {product.category.name}
                        </p>
                      )}
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-lg font-bold text-[#1a5f52]">
                          ₹{(product?.price || 0).toLocaleString("en-IN")}
                        </span>
                        {product?.originalPrice &&
                          product.originalPrice > (product.price || 0) && (
                            <span className="text-xs text-gray-400 line-through">
                              ₹{product.originalPrice.toLocaleString("en-IN")}
                            </span>
                          )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">
                          📍 {product?.city || "Unknown"},{" "}
                          {product?.state || "Unknown"}
                        </span>
                        <span className="text-xs text-[#1a5f52] font-medium">
                          View →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === page
                            ? "bg-[#1a5f52] text-white"
                            : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
