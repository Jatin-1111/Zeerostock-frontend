"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Filter } from "lucide-react";
import { marketplaceService } from "@/services/marketplace.service";
import type { Product } from "@/types/api.types";

export default function AllProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");
  const [location, setLocation] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [productCount, setProductCount] = useState(0);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const categoryRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
    { value: "rating", label: "Top Rated" },
  ];

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [sortBy, location, selectedCategory, minPrice, maxPrice]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await marketplaceService.getCategories(50);
      if (response?.success && response?.data) {
        const categoriesList = Array.isArray(response.data?.categories)
          ? response.data.categories
          : [];
        setCategories(categoriesList);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const filters: any = {
        limit: 10,
        sort: sortBy === "relevance" ? undefined : sortBy,
      };

      if (location !== "all") {
        filters.state = location;
      }

      if (selectedCategory) {
        // Find the category ID from the selected category name
        const category = categories.find(
          (cat) => cat.name === selectedCategory,
        );
        if (category) {
          filters.categoryId = category.id;
        }
      }

      if (minPrice) {
        filters.minPrice = parseFloat(minPrice);
      }

      if (maxPrice) {
        filters.maxPrice = parseFloat(maxPrice);
      }

      const response = await marketplaceService.getProducts(filters);
      if (response?.success && response?.data) {
        const productsList = Array.isArray(response.data?.products)
          ? response.data.products
          : [];
        setProducts(productsList);
        setProductCount(productsList.length);
      } else {
        console.warn("No products data received:", response);
        setProducts([]);
        setProductCount(0);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setProductCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setLocation("all");
    setSortBy("relevance");
  };

  const applyFilters = () => {
    fetchProducts();
    setShowFilters(false);
  };

  // Filter out expired products
  const isProductExpired = (product: Product): boolean => {
    if (!product.expiryDate && !product.expiration && !product.expiresAt) {
      return false; // No expiry date = not expired
    }

    const expiryDate = new Date(
      product.expiryDate || product.expiration || product.expiresAt,
    );
    return expiryDate < new Date();
  };

  const activeProducts = products.filter(
    (product) => !isProductExpired(product),
  );

  return (
    <div className="max-w-[900px] mx-auto py-9 px-3">
      {/* Header with title and filters */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[18px] md:text-[24px] text-[#1a1a1a] m-0 whitespace-nowrap">
            All products
          </h2>

          {/* Filters */}
          <div className="flex items-center gap-2 md:gap-[19px]">
            {/* Category dropdown */}
            <motion.div
              ref={categoryRef}
              className="relative shrink-0"
              transition={{ duration: 0.2 }}
            >
              <div
                className="flex items-center gap-1 md:gap-[19px] border-b border-[#787878] pb-[4px] cursor-pointer"
                onClick={() => {
                  setIsCategoryOpen(!isCategoryOpen);
                  if (!isCategoryOpen) setIsSortOpen(false);
                }}
              >
                <span className="text-[11px] text-[#787878] font-medium whitespace-nowrap max-w-[80px] md:max-w-[150px] overflow-hidden text-ellipsis">
                  {selectedCategory
                    ? selectedCategory
                    : `All Categories (${categories.length || 0})`}
                </span>
                <motion.div
                  animate={{ rotate: isCategoryOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown
                    size={15}
                    className="shrink-0 text-[#787878]"
                    strokeWidth={1.5}
                  />
                </motion.div>
              </div>

              {/* Category Dropdown menu */}
              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 md:left-0 mt-1.5 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] w-full min-w-full max-h-60 overflow-y-auto"
                  >
                    <motion.div
                      whileHover={{ backgroundColor: "#f3f4f6" }}
                      className="px-3 py-1.5 cursor-pointer text-[11px] text-[#787878] font-medium"
                      onClick={() => {
                        setSelectedCategory("");
                        setIsCategoryOpen(false);
                      }}
                    >
                      All Categories ({categories.length || 0})
                    </motion.div>
                    {categories.map((category) => (
                      <motion.div
                        key={category.id}
                        whileHover={{ backgroundColor: "#f3f4f6" }}
                        className="px-3 py-1.5 cursor-pointer text-[11px] text-[#787878] font-medium"
                        onClick={() => {
                          setSelectedCategory(category.name);
                          setIsCategoryOpen(false);
                        }}
                      >
                        {category.name}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Sort dropdown */}
            <motion.div
              ref={sortRef}
              className="relative shrink-0 hidden md:block"
              transition={{ duration: 0.2 }}
            >
              <div
                className="flex items-center gap-1 md:gap-[19px] border-b border-[#787878] pb-[4px] cursor-pointer"
                onClick={() => {
                  setIsSortOpen(!isSortOpen);
                  if (!isSortOpen) setIsCategoryOpen(false);
                }}
              >
                <span className="text-[11px] text-[#787878] font-medium whitespace-nowrap">
                  {sortOptions.find((opt) => opt.value === sortBy)?.label ||
                    "Relevance"}
                </span>
                <motion.div
                  animate={{ rotate: isSortOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown
                    size={15}
                    className="shrink-0 text-[#787878]"
                    strokeWidth={1.5}
                  />
                </motion.div>
              </div>

              {/* Sort Dropdown menu */}
              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 md:left-0 mt-1.5 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] w-full min-w-full max-h-60 overflow-y-auto"
                  >
                    {sortOptions.map((option) => (
                      <motion.div
                        key={option.value}
                        whileHover={{ backgroundColor: "#f3f4f6" }}
                        className="px-3 py-1.5 cursor-pointer text-[11px] text-[#787878] font-medium"
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortOpen(false);
                        }}
                      >
                        {option.label}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* More Filters button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 cursor-pointer bg-transparent border-none outline-none"
            >
              <Filter
                size={17}
                className={showFilters ? "text-[#1e3a8a]" : "text-[#787878]"}
                strokeWidth={1.5}
              />
              <span
                className={`text-[11px] font-medium hidden sm:inline ${
                  showFilters ? "text-[#1e3a8a]" : "text-[#787878]"
                }`}
              >
                More Filters
              </span>
              {(selectedCategory || minPrice || maxPrice) && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-1.5 h-1.5 bg-[#1e3a8a] rounded-full"
                />
              )}
            </motion.button>
          </div>
        </div>

        {/* Expandable Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-[#e5e7eb] rounded-[10px] p-5 shadow-lg mb-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#374151] mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full h-[36px] px-3 border border-[#d1d5db] rounded-[7px] text-[11px] text-[#374151] bg-white cursor-pointer appearance-none hover:border-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:ring-opacity-20 transition-all"
                    >
                      <option value="">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#374151] mb-2">
                      Price Range
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full h-[36px] px-3 border border-[#d1d5db] rounded-[7px] text-[11px] text-[#374151] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:ring-opacity-20 transition-all"
                      />
                      <span className="text-[#9ca3af]">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full h-[36px] px-3 border border-[#d1d5db] rounded-[7px] text-[11px] text-[#374151] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:ring-opacity-20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-end gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={clearFilters}
                      className="flex-1 h-[36px] border border-[#d1d5db] rounded-[7px] text-[11px] font-medium text-[#374151] bg-white hover:bg-[#f9fafb] transition-colors"
                    >
                      Clear All
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={applyFilters}
                      className="flex-1 h-[36px] bg-[#1e3a8a] rounded-[7px] text-[11px] font-medium text-white hover:bg-[#1e40af] transition-colors"
                    >
                      Apply Filters
                    </motion.button>
                  </div>
                </div>

                {/* Active Filters Display */}
                {(selectedCategory ||
                  minPrice ||
                  maxPrice ||
                  location !== "all") && (
                  <div className="mt-4 pt-4 border-t border-[#e5e7eb]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-medium text-[#6b7280]">
                        Active Filters:
                      </span>
                      {selectedCategory && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#eff6ff] text-[#1e3a8a] rounded-full text-[10px] font-medium"
                        >
                          {selectedCategory}
                          <button
                            onClick={() => setSelectedCategory("")}
                            className="hover:bg-[#dbeafe] rounded-full p-0.5"
                          >
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M18 6L6 18M6 6L18 18"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </motion.span>
                      )}
                      {(minPrice || maxPrice) && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#eff6ff] text-[#1e3a8a] rounded-full text-[10px] font-medium"
                        >
                          ₹{minPrice || "0"} - ₹{maxPrice || "∞"}
                          <button
                            onClick={() => {
                              setMinPrice("");
                              setMaxPrice("");
                            }}
                            className="hover:bg-[#dbeafe] rounded-full p-0.5"
                          >
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M18 6L6 18M6 6L18 18"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </motion.span>
                      )}
                      {location !== "all" && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#eff6ff] text-[#1e3a8a] rounded-full text-[10px] font-medium"
                        >
                          {location}
                          <button
                            onClick={() => setLocation("all")}
                            className="hover:bg-[#dbeafe] rounded-full p-0.5"
                          >
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M18 6L6 18M6 6L18 18"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </motion.span>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
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
      ) : activeProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">⏰</div>
          <h3 className="text-xl text-[#0d1b2a] mb-2">All products expired</h3>
          <p className="text-sm text-gray-600 mb-4 max-w-lg mx-auto">
            The available products have expired. Please check back later for
            fresh inventory.
          </p>
          <button
            onClick={() => clearFilters()}
            className="px-[18px] py-2 bg-[#1e3a8a] text-white border-none rounded-lg cursor-pointer text-[12px] hover:bg-[#2d4a9a] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {activeProducts.map((product, index) => (
              <motion.div
                key={product?.productId || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={`/product/${product?.slug || "unknown"}`}
                  className="no-underline"
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-1 transition-transform duration-200 cursor-pointer h-full flex flex-col">
                    {/* Product image */}
                    <div className="w-full h-32 sm:h-40 bg-gray-100 relative">
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
                    <div className="p-3 flex flex-col flex-1">
                      <h3 className="font-medium text-[12px] text-[#1a1a1a] m-0 mb-1.5 line-clamp-2 min-h-[32px]">
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
                        <span className="text-[9px] text-gray-600 truncate max-w-[100px]">
                          {product?.city || "Mumbai"},IN
                        </span>
                      </div>

                      <div className="mt-auto">
                        {/* Price */}
                        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                          <span className="font-bold text-lg sm:text-xl text-[#2D4A9A]">
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
                  </div>
                </Link>
              </motion.div>
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
