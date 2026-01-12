"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { searchService } from "@/services/search.service";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

export default function HeroSectionV2() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    condition: [] as string[],
    listingType: [] as string[],
    priceRange: { min: "", max: "" },
  });

  const categories = [
    "All",
    "Industrial Equipment",
    "Electronics",
    "Raw Materials",
    "Chemicals",
    "Machinery",
    "Packaging Materials",
    "Automotive Parts",
  ];

  const loadPopularSearches = useCallback(async () => {
    try {
      const response = await searchService.getPopularSearches(5);
      if (response.success && response.data) {
        setPopularSearches(
          response.data.popularSearches.map((item) => item.query)
        );
      }
    } catch (error) {
      console.error("Failed to load popular searches:", error);
    }
  }, []);

  const loadRecentSearches = useCallback(async () => {
    try {
      const response = await searchService.getRecentSearches(5);
      if (response.success && response.data) {
        setRecentSearches(
          response.data.recentSearches.map((item) => item.query)
        );
      }
    } catch (error) {
      console.error("Failed to load recent searches:", error);
    }
  }, []);

  const fetchSuggestions = useCallback(async () => {
    try {
      const response = await searchService.getSuggestions(searchQuery, 5);
      if (response.success && response.data) {
        setSuggestions(response.data.suggestions.map((item) => item.text));
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    }
  }, [searchQuery]);

  // Load popular and recent searches
  useEffect(() => {
    const loadData = async () => {
      await loadPopularSearches();
      if (isAuthenticated) {
        await loadRecentSearches();
      }
    };
    void loadData();
  }, [isAuthenticated, loadPopularSearches, loadRecentSearches]);

  // Get suggestions as user types
  useEffect(() => {
    // Early return for short queries - suggestions will be cleared via useMemo
    if (searchQuery.length < 2) {
      return;
    }

    const timer = setTimeout(() => {
      void fetchSuggestions();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, fetchSuggestions]);

  // Clear suggestions when query is too short (derived state)
  useMemo(() => {
    if (searchQuery.length < 2 && suggestions.length > 0) {
      // Use queueMicrotask to avoid setState during render
      queueMicrotask(() => {
        setSuggestions([]);
        setShowSuggestions(false);
      });
    }
  }, [searchQuery, suggestions.length]);

  const handleSearch = async () => {
    // Track search analytics
    if (searchQuery.trim()) {
      try {
        await searchService.trackSearch(searchQuery, 0);
      } catch (error) {
        console.error("Failed to track search:", error);
      }
    }

    const params = new URLSearchParams();

    if (searchQuery.trim()) {
      params.append("q", searchQuery);
    }
    if (selectedCategory !== "All") {
      params.append("category", selectedCategory);
    }
    if (filters.condition.length > 0) {
      params.append("condition", filters.condition.join(","));
    }
    if (filters.listingType.length > 0) {
      params.append("listingType", filters.listingType.join(","));
    }
    if (filters.priceRange.min) {
      params.append("minPrice", filters.priceRange.min);
    }
    if (filters.priceRange.max) {
      params.append("maxPrice", filters.priceRange.max);
    }

    router.push(
      `/marketplace${params.toString() ? `?${params.toString()}` : ""}`
    );
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    handleSearch();
  };

  const toggleFilter = (type: "condition" | "listingType", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative w-full shadow-[0px_1px_4px_0px_rgba(24,181,34,0.25)] py-2 sm:py-3 md:py-[13px]">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          alt="Hero Background"
          className="absolute h-full w-full object-cover"
          src={"/Home.jpg"}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 md:pt-10 lg:pt-[44px] space-y-6">
        {/* Headline */}
        <h1 className="text-center max-w-full sm:max-w-[400px] md:max-w-[450px] lg:max-w-[507px] mb-2 sm:mb-3 md:mb-[10px]">
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-tight sm:leading-normal md:leading-[47px] text-[#0d1b2a] font-medium block text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            Unlock Hidden Value in{" "}
            <span className="text-[#2ec096]">Surplus Inventory</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-[10px] leading-normal sm:leading-relaxed md:leading-[13px] text-[#868181] text-center font-semibold max-w-full sm:max-w-[400px] md:max-w-[450px] lg:max-w-[507px] px-4 sm:px-0">
          Connect suppliers, buyers, and agents with trust, transparency, and
          speed.
        </p>

        {/* Search Bar */}
        <div className="mt-4 sm:mt-6 md:mt-[29px] bg-[rgba(251,251,251,0.65)] rounded-2xl sm:rounded-3xl md:rounded-[33px] shadow-[0px_0px_27px_0px_rgba(0,0,0,0.25)] px-3 sm:px-4 md:px-[13px] py-2 sm:py-3 md:py-[5px] flex flex-row items-center gap-2 sm:gap-0 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[40%]">
          {/* Category Dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center gap-1 sm:gap-[5px] hover:opacity-80 transition-opacity"
            >
              <span className="text-xs sm:text-[11px] font-semibold text-gray-700 opacity-80 whitespace-nowrap">
                {selectedCategory}
              </span>
              <ChevronDown className="w-4 h-4 sm:w-[17px] sm:h-[17px] text-gray-700 opacity-80" />
            </button>

            {/* Category Dropdown */}
            <AnimatePresence>
              {showCategoryDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute top-full left-0 mt-1.5 bg-white rounded-md shadow-lg border border-gray-200 z-50 min-w-[120px] overflow-hidden"
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowCategoryDropdown(false);
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-gray-100 text-gray-700 text-[10px] sm:text-[11px] font-medium transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-[23px] w-px bg-gray-300 mx-2 md:mx-[7px]" />

          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => {
                if (
                  searchQuery.length === 0 &&
                  (recentSearches.length > 0 || popularSearches.length > 0)
                ) {
                  setShowSuggestions(true);
                }
              }}
              placeholder="Search Industrial Equipment, Electronics, etc"
              className="text-xs sm:text-[10px] md:text-[9px] font-medium text-gray-700 opacity-80 px-2 sm:px-[5px] bg-transparent border-none outline-none w-full"
            />

            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 w-full min-w-[200px] max-w-[300px] max-h-60 overflow-y-auto">
                {/* Suggestions */}
                {suggestions.length > 0 && (
                  <div className="py-1.5">
                    <div className="px-3 py-1 text-xs font-semibold text-gray-500">
                      Suggestions
                    </div>
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm text-gray-700"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                {/* Recent Searches */}
                {searchQuery.length === 0 && recentSearches.length > 0 && (
                  <div className="py-1.5 border-t border-gray-100">
                    <div className="px-3 py-1 text-xs font-semibold text-gray-500">
                      Recent Searches
                    </div>
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(search)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm text-gray-700"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                )}

                {/* Popular Searches */}
                {searchQuery.length === 0 && popularSearches.length > 0 && (
                  <div className="py-1.5 border-t border-gray-100">
                    <div className="px-3 py-1 text-xs font-semibold text-gray-500">
                      Popular Searches
                    </div>
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(search)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm text-gray-700"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-[20px] sm:h-[23px] w-px bg-gray-300 mx-1 sm:mx-2 md:mx-[7px] shrink-0" />

          {/* Actions - Filter and Search */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-[7px] relative shrink-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="hover:opacity-80 transition-opacity"
            >
              <SlidersHorizontal className="w-4 h-4 sm:w-[17px] sm:h-[17px] text-gray-700 opacity-80" />
            </button>

            {/* Filter Dropdown */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute top-full right-0 mt-1.5 bg-white rounded-md shadow-lg border border-gray-200 z-50 w-[160px] sm:w-[180px] p-2 overflow-hidden"
                >
                  <h3 className="font-semibold text-gray-900 mb-1.5 text-[10px] sm:text-[11px]">
                    Filters
                  </h3>

                  {/* Condition */}
                  <div className="mb-2">
                    <p className="text-[9px] sm:text-[10px] font-medium text-gray-700 mb-1">
                      Condition
                    </p>
                    <div className="space-y-1">
                      {["New", "Like New", "Good", "Fair"].map((condition) => (
                        <label
                          key={condition}
                          className="flex items-center gap-1 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filters.condition.includes(condition)}
                            onChange={() =>
                              toggleFilter("condition", condition)
                            }
                            className="rounded w-2.5 h-2.5"
                          />
                          <span className="text-[10px] sm:text-[11px] text-gray-700">
                            {condition}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Listing Type */}
                  <div className="mb-2">
                    <p className="text-[9px] sm:text-[10px] font-medium text-gray-700 mb-1">
                      Listing Type
                    </p>
                    <div className="space-y-1">
                      {["Sale", "Auction", "Clearance"].map((type) => (
                        <label
                          key={type}
                          className="flex items-center gap-1 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filters.listingType.includes(type)}
                            onChange={() => toggleFilter("listingType", type)}
                            className="rounded w-2.5 h-2.5"
                          />
                          <span className="text-[10px] sm:text-[11px] text-gray-700">
                            {type}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-2">
                    <p className="text-[9px] sm:text-[10px] font-medium text-gray-700 mb-1">
                      Price Range
                    </p>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.priceRange.min}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: {
                              ...prev.priceRange,
                              min: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-1.5 py-0.5 border border-gray-300 rounded text-[10px]"
                      />
                      <span className="text-gray-500 text-[10px]">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.priceRange.max}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: {
                              ...prev.priceRange,
                              max: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-1.5 py-0.5 border border-gray-300 rounded text-[10px]"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-full bg-[#022778] text-white py-1 rounded-md text-[10px] sm:text-[11px] font-medium hover:opacity-90 transition-opacity"
                  >
                    Apply Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="h-5 w-px bg-gray-300 shrink-0" />
            <button
              onClick={handleSearch}
              className="text-xs sm:text-[11px] md:text-[12px] font-semibold text-gray-700 opacity-80 px-2 sm:px-3 md:px-2 hover:opacity-60 transition-opacity whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-4 sm:mt-6 md:mt-[30px] flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-[11px] w-full sm:w-auto px-4 sm:px-0">
          <button
            onClick={() => router.push("/signup")}
            className="bg-[#022778] text-white text-xs sm:text-[11px] font-semibold rounded-xl h-10 sm:h-[35px] w-full sm:w-32 md:w-[140px] flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            Get Started
          </button>
          <button
            onClick={() => router.push("/marketplace")}
            className="bg-white text-[#2aae7a] text-xs sm:text-[11px] font-semibold rounded-xl h-10 sm:h-[35px] w-full sm:w-32 md:w-[140px] flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            Explore Marketplace
          </button>
        </div>

        {/* Stats Bar */}
        <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-[67px] text-center px-4">
          <p className="text-[10px] sm:text-xs md:text-[12px] font-bold text-[#c8c8c8] whitespace-normal sm:whitespace-nowrap">
            10,000 Businesses Connected &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            $50M+ Inventory Traded &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 97%
            Success Rate &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 24/7 Support
          </p>
        </div>
      </div>
    </section>
  );
}
