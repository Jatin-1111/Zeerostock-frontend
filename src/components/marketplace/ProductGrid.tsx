"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Menu, ChevronDown, MapPin } from "lucide-react";
import MarketplaceFilterSidebar from "@/components/marketplace/MarketplaceFilterSidebar";
import { marketplaceService } from "@/services/marketplace.service";
import type { Product, Category } from "@/types/api.types";

interface ProductGridProps {
  initialQuery?: string;
  initialCategory?: string;
}

export default function ExploreProductGrid({
  initialQuery = "",
  initialCategory,
}: ProductGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    initialQuery || searchParams.get("q") || "",
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy] = useState("relevance"); // Will be used for sorting feature
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [categories, setCategories] = useState<Category[]>([]);

  // Determine if we need to initialize filters from URL (Category)
  const categoryParam = searchParams.get("category") || initialCategory;
  const shouldInitializeCategory = !!categoryParam;
  const [isInitializing, setIsInitializing] = useState(
    shouldInitializeCategory,
  );

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await marketplaceService.getCategories();
        if (response.success && response.data?.categories) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Initialize filters from URL parameters
  useEffect(() => {
    if (!shouldInitializeCategory) {
      setIsInitializing(false);
      return;
    }

    if (categories.length > 0) {
      console.log("[ProductGrid] URL category param:", categoryParam);

      const category = categories.find(
        (cat) => cat.name.toLowerCase() === categoryParam.toLowerCase(),
      );

      if (category) {
        console.log(
          "[ProductGrid] Setting activeFilters with category ID:",
          category.id,
        );
        setActiveFilters((prev) => ({
          ...prev,
          categories: [category.id],
        }));
      } else {
        console.warn(
          "[ProductGrid] Category not found for name:",
          categoryParam,
        );
      }
      setIsInitializing(false);
    }
  }, [shouldInitializeCategory, categoryParam, categories]);

  const fetchProducts = async (query?: string) => {
    if (isInitializing) return; // Prevent double-fetch if initializing filters

    try {
      setIsLoading(true);
      setError(null);

      // Build API filters from active filters
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const apiFilters: Record<string, any> = {
        page: currentPage,
        limit: 20,
        sortBy: sortBy === "relevance" ? undefined : sortBy,
      };

      // Add price range
      if (activeFilters.priceRange) {
        if (activeFilters.priceRange.min > 0) {
          apiFilters.minPrice = activeFilters.priceRange.min;
        }
        if (activeFilters.priceRange.max < 100000) {
          apiFilters.maxPrice = activeFilters.priceRange.max;
        }
      }

      // Add conditions (array to comma-separated string)
      if (activeFilters.conditions && activeFilters.conditions.length > 0) {
        apiFilters.condition = activeFilters.conditions;
      }

      // Add listing types
      if (activeFilters.listingTypes && activeFilters.listingTypes.length > 0) {
        apiFilters.listingType = activeFilters.listingTypes;
      }

      // Add categories (use first category as categoryId)
      if (activeFilters.categories && activeFilters.categories.length > 0) {
        apiFilters.categoryId = activeFilters.categories[0];
      }

      // Add industries (use first industry as industryId)
      if (activeFilters.industries && activeFilters.industries.length > 0) {
        apiFilters.industryId = activeFilters.industries[0];
      }

      // Add features
      if (activeFilters.features && activeFilters.features.length > 0) {
        // Handle verified supplier
        if (activeFilters.features.includes("verified")) {
          apiFilters.verified = true;
        }
        // Handle trending - can be used with sort
        if (activeFilters.features.includes("trending")) {
          apiFilters.trending = true;
        }
        // Handle flash deal - high discount filter
        if (activeFilters.features.includes("flashdeal")) {
          apiFilters.minDiscount = 30; // 30% or more discount
        }
      }

      if (query) {
        apiFilters.q = query;
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
  };

  // Separate effect for search params
  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  // Fetch products when dependencies change
  useEffect(() => {
    const query = searchParams.get("q");
    fetchProducts(query || undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, sortBy, activeFilters, searchParams, isInitializing]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    router.push(`/marketplace?q=${encodeURIComponent(query)}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (newFilters: Record<string, any>) => {
    console.log("Filter change received:", newFilters);
    setActiveFilters(newFilters);
    setCurrentPage(1);
  };

  // Calculate total active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (activeFilters.categories?.length > 0)
      count += activeFilters.categories.length;
    if (activeFilters.industries?.length > 0)
      count += activeFilters.industries.length;
    if (activeFilters.conditions?.length > 0)
      count += activeFilters.conditions.length;
    if (activeFilters.listingTypes?.length > 0)
      count += activeFilters.listingTypes.length;
    if (activeFilters.features?.length > 0)
      count += activeFilters.features.length;
    if (
      activeFilters.priceRange &&
      (activeFilters.priceRange.min > 0 ||
        activeFilters.priceRange.max < 100000)
    )
      count += 1;
    return count;
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen">
      {/* Filter Sidebar - Collapsable */}
      <MarketplaceFilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFilterChange={handleFilterChange}
        initialFilters={activeFilters}
      />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header with Search */}
        <div className="bg-white shadow-[0px_0.5px_2.5px_0px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-2.5 px-2.5 py-4">
            {/* Menu Button - Toggle Filter Sidebar */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="text-gray-700 transition-colors flex-shrink-0 relative"
              aria-label="Toggle filters"
            >
              <Menu className="w-5 h-5" />
              {getActiveFiltersCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2aae7a] text-white text-[8px] font-bold px-1 py-0.5 rounded-full min-w-[16px] text-center">
                  {getActiveFiltersCount()}
                </span>
              )}
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center bg-[rgba(235,235,235,0.65)] rounded-[10px] shadow-[0px_0px_2.5px_0px_rgba(24,181,34,0.5)] px-3 py-1.5">
                {/* Category Dropdown */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-[11px] font-semibold text-[#374151] opacity-80">
                    All
                  </span>
                  <ChevronDown className="w-4 h-4 text-[#374151] opacity-80" />
                  <div className="w-px h-5 bg-gray-300 mx-1"></div>
                </div>

                {/* Search Input */}
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
                  className="flex-1 bg-transparent text-[9.5px] font-medium text-[#374151] opacity-80 focus:outline-none placeholder:text-[#374151] placeholder:opacity-80 min-w-0 px-2"
                />

                {/* Search Button */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="w-px h-5 bg-gray-300"></div>
                  <button
                    onClick={() => handleSearch(searchQuery)}
                    className="text-[12px] font-medium text-[#374151] opacity-80 hover:opacity-100 transition-opacity px-2"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {getActiveFiltersCount() > 0 && (
            <div className="px-2.5 py-2 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-medium text-[#787878]">
                  Active Filters:
                </span>
                {activeFilters.categories?.map((catId: string) => (
                  <span
                    key={catId}
                    className="px-2 py-1 bg-[#2aae7a] text-white text-[9px] font-medium rounded-full"
                  >
                    {activeFilters.categoryNames?.[catId] || catId}
                  </span>
                ))}
                {activeFilters.industries?.map((indId: string) => (
                  <span
                    key={indId}
                    className="px-2 py-1 bg-[#1e3a8a] text-white text-[9px] font-medium rounded-full"
                  >
                    {activeFilters.industryNames?.[indId] || indId}
                  </span>
                ))}
                {activeFilters.conditions?.map((cond: string) => (
                  <span
                    key={cond}
                    className="px-2 py-1 bg-purple-600 text-white text-[9px] font-medium rounded-full"
                  >
                    {cond}
                  </span>
                ))}
                {activeFilters.listingTypes?.map((type: string) => (
                  <span
                    key={type}
                    className="px-2 py-1 bg-orange-600 text-white text-[9px] font-medium rounded-full"
                  >
                    {type}
                  </span>
                ))}
                {activeFilters.features?.map((feat: string) => (
                  <span
                    key={feat}
                    className="px-2 py-1 bg-pink-600 text-white text-[9px] font-medium rounded-full"
                  >
                    {feat}
                  </span>
                ))}
                {activeFilters.priceRange &&
                  (activeFilters.priceRange.min > 0 ||
                    activeFilters.priceRange.max < 100000) && (
                    <span className="px-2 py-1 bg-teal-600 text-white text-[9px] font-medium rounded-full">
                      ₹{activeFilters.priceRange.min.toLocaleString()} - ₹
                      {activeFilters.priceRange.max.toLocaleString()}
                    </span>
                  )}
                <button
                  onClick={clearAllFilters}
                  className="ml-auto px-2 py-1 text-[9px] font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-2.5 py-1">
            <div className="p-2.5 bg-red-50 border border-red-200 rounded">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-1.5">
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
                    <h3 className="text-[6px] font-semibold text-red-800 mb-0.5">
                      Error Loading Products
                    </h3>
                    <p className="text-[5px] text-red-600">{error}</p>
                  </div>
                </div>
                <button
                  onClick={() => fetchProducts(searchQuery)}
                  className="ml-1.5 px-1.5 py-0.5 text-[5px] bg-red-600 text-white rounded hover:bg-red-700 transition-colors shrink-0"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="p-2.5">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-[10px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] overflow-hidden"
                >
                  <div className="bg-gray-200 aspect-[283/202] animate-pulse m-1.5 rounded-[10px]"></div>
                  <div className="px-2.5 pb-2 space-y-1">
                    <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-2 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-5">
              <div className="text-gray-400 text-2xl mb-1">🔍</div>
              <h3 className="text-[7.5px] font-semibold text-[#0d1b2a] mb-1">
                {searchQuery ? "No products found" : "No products available"}
              </h3>
              <p className="text-[#787878] mb-1 text-[6px]">
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
                  className="px-2.5 py-1 bg-[#1e3a8a] text-white text-[5px] rounded hover:bg-[#1e3a8a]/90 transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {products.map((product, index) => (
                  <div
                    key={product?.productId || index}
                    className="bg-white rounded-[10px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"
                  >
                    {/* Product Image */}
                    <div className="relative bg-gray-100 aspect-[283/202] flex items-center justify-center overflow-hidden m-1.5 rounded-[10px] flex-shrink-0">
                      {product?.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.image}
                          alt={product?.title || "Product"}
                          className="w-full h-full object-cover rounded-[10px]"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="text-gray-400 text-[5px]">
                          No Image
                        </span>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="px-2.5 pb-2 flex flex-col flex-1">
                      {/* Title - Fixed Height */}
                      <div className="mb-1 h-10 flex flex-col">
                        <h3 className="text-[10px] font-medium text-[#0d1b2a] mb-0.5 line-clamp-2 flex-1">
                          {product?.title || "Untitled Product"}
                        </h3>
                        <span className="text-[7px] font-medium text-[#787878]">
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          ({(product as any)?.reviewCount || "1336"})
                        </span>
                      </div>

                      {/* Rating Stars - Fixed Height */}
                      <div className="flex items-center gap-0.5 mb-1 h-2.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className="w-2.5 h-2.5"
                            viewBox="0 0 19 18"
                            fill={star <= 4 ? "#FFD700" : "none"}
                            stroke={star > 4 ? "#FFD700" : "none"}
                            strokeWidth={star > 4 ? "1" : "0"}
                          >
                            <path d="M9.5 0l2.5 6.5h6.5l-5 4 2 6.5-6-4.5-6 4.5 2-6.5-5-4h6.5z" />
                          </svg>
                        ))}
                      </div>

                      {/* Location - Fixed Height */}
                      <div className="flex items-center gap-1 mb-1 h-3.5">
                        <MapPin className="w-2 h-2 text-[#0d1b2a] flex-shrink-0" />
                        <span className="text-[9px] font-medium text-[#0d1b2a] truncate">
                          {product?.city || "Mumbai"}, IN
                        </span>
                      </div>

                      {/* Price - Fixed Height */}
                      <div className="mb-1 flex items-center gap-1.5 h-5">
                        <span className="text-[13.5px] font-bold text-[#1e3a8a]">
                          ₹{(product?.price || 0).toLocaleString("en-IN")}
                        </span>
                        {product?.originalPrice &&
                          product.originalPrice > (product.price || 0) && (
                            <span className="text-[10px] font-bold text-[#787878] relative inline-block">
                              <span className="line-through">
                                ₹{product.originalPrice.toLocaleString("en-IN")}
                              </span>
                            </span>
                          )}
                      </div>

                      {/* View Deal Button - Fixed at Bottom */}
                      <Link
                        href={`/product/${product?.slug || "unknown"}`}
                        className="mt-auto"
                      >
                        <button className="w-full py-2 bg-[#1e3a8a] text-white text-[10px] font-semibold rounded-[7.5px] hover:bg-[#1e3a8a]/90 transition-colors">
                          View Deal
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {totalPages > currentPage && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="px-5 py-2.5 bg-white border-2 border-[#1e3a8a] text-[#1e3a8a] text-[15px] font-medium rounded hover:bg-[#1e3a8a] hover:text-white transition-colors"
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
