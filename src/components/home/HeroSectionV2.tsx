"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Filter } from "lucide-react";
import { searchService } from "@/services/search.service";
import { useAuth } from "@/contexts/AuthContext";

const imgHeroBackground =
  "https://www.figma.com/api/mcp/asset/5bd287c3-4c2c-4c09-8256-b56732d470e4";
const imgFloatingImage =
  "https://www.figma.com/api/mcp/asset/f630ba7a-2110-4476-be94-b4cc3e985e05";

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
    <section className="relative w-full h-[777px] shadow-[0px_1px_4px_0px_rgba(24,181,34,0.25)]">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          alt=""
          className="absolute h-[128.6%] left-0 max-w-none top-[-1.05%] w-full object-cover"
          src={imgHeroBackground}
        />
      </div>

      {/* Floating Image - Right Side */}
      <div className="absolute right-[77px] top-[419px] bg-[#eeffef] rounded-[60px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.25)] p-2.5">
        <img
          alt=""
          className="w-[54px] h-[54px] object-cover rounded-full"
          src={imgFloatingImage}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center pt-[83px]">
        {/* Headline */}
        <h1 className="text-center w-[1015px] mb-5">
          <span className="text-[80px] leading-[93px] text-[#0d1b2a] font-medium">
            Unlock Hidden Vale in{" "}
          </span>
          <span className="text-[80px] leading-[93px] text-[#2ec096] font-medium">
            Surplus Inventory
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-[20px] leading-[25px] text-[#868181] text-center font-semibold w-[1015px]">
          Connect suppliers, buyers, and agents with trust, transparency, and
          speed.
        </p>

        {/* Search Bar */}
        <div className="mt-[57px] bg-[rgba(251,251,251,0.65)] rounded-[50px] shadow-[0px_0px_40.7px_0px_rgba(0,0,0,0.25)] px-[25px] py-2.5 flex items-center gap-[60px]">
          {/* Left Section - Category Dropdown */}
          <div className="flex items-center gap-2.5 relative">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            >
              <span className="text-[22px] font-semibold text-gray-700 opacity-80">
                {selectedCategory}
              </span>
              <ChevronDown className="w-[35px] h-[35px] text-gray-700 opacity-80" />
            </button>

            {/* Category Dropdown */}
            {showCategoryDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-[200px]">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowCategoryDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg text-gray-700"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            <div className="h-[45px] w-px bg-gray-300 mx-[13px]" />
            <div className="relative flex-1">
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
                className="text-[19px] font-medium text-gray-700 opacity-80 pl-2.5 bg-transparent border-none outline-none w-[450px]"
              />

              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 w-[450px] max-h-80 overflow-y-auto">
                  {/* Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="py-2">
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
                    <div className="py-2 border-t border-gray-100">
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
                    <div className="py-2 border-t border-gray-100">
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
          </div>

          {/* Right Section - Filter and Search */}
          <div className="flex items-center gap-[15px] relative">
            <div className="h-[45px] w-px bg-gray-300" />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="hover:opacity-80 transition-opacity"
            >
              <Filter className="w-[35px] h-[35px] text-gray-700 opacity-80" />
            </button>

            {/* Filter Dropdown */}
            {showFilters && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 w-[320px] p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Filters</h3>

                {/* Condition */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Condition
                  </p>
                  <div className="space-y-2">
                    {["New", "Like New", "Good", "Fair"].map((condition) => (
                      <label
                        key={condition}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.condition.includes(condition)}
                          onChange={() => toggleFilter("condition", condition)}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-700">
                          {condition}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Listing Type */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Listing Type
                  </p>
                  <div className="space-y-2">
                    {["Sale", "Auction", "Clearance"].map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.listingType.includes(type)}
                          onChange={() => toggleFilter("listingType", type)}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </p>
                  <div className="flex items-center gap-2">
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
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <span className="text-gray-500">-</span>
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
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full bg-[#022778] text-white py-2 rounded-lg text-sm font-medium hover:opacity-90"
                >
                  Apply Filters
                </button>
              </div>
            )}

            <div className="h-[45px] w-px bg-gray-300" />
            <button
              onClick={handleSearch}
              className="text-[24px] font-medium text-gray-700 opacity-80 w-[84px] text-center hover:opacity-60 transition-opacity"
            >
              Search
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-[60px] flex gap-[23px]">
          <button
            onClick={() => router.push("/signup")}
            className="bg-[#022778] text-white text-[22px] font-semibold rounded-xl h-[70px] w-[280px] flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            Get Started
          </button>
          <button
            onClick={() => router.push("/marketplace")}
            className="bg-white text-[#2aae7a] text-[22px] font-semibold rounded-xl h-[70px] w-[280px] flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            Explore Marketplace
          </button>
        </div>

        {/* Stats Bar */}
        <div className="mt-[135px] text-center">
          <p className="text-[24px] font-bold text-[#c8c8c8]">
            10,000 Businesses Connected &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            $50M+ Inventory Traded &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 97%
            Success Rate &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 24/7 Support
          </p>
        </div>
      </div>
    </section>
  );
}
