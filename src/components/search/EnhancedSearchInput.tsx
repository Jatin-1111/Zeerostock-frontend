"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Clock, TrendingUp, X } from "lucide-react";
import { searchService } from "@/services/search.service";
import { useAuth } from "@/contexts/AuthContext";

interface EnhancedSearchInputProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  showPopularSearches?: boolean;
  autoFocus?: boolean;
}

export default function EnhancedSearchInput({
  placeholder = "Search products, suppliers...",
  onSearch,
  className = "",
  showPopularSearches = true,
  autoFocus = false,
}: EnhancedSearchInputProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const [didYouMean, setDidYouMean] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load popular and recent searches on mount
  useEffect(() => {
    if (showPopularSearches) {
      loadPopularSearches();
    }
    if (isAuthenticated) {
      loadRecentSearches();
    }
  }, [isAuthenticated, showPopularSearches]);

  // Get suggestions as user types
  useEffect(() => {
    if (query.length >= 2) {
      const timer = setTimeout(() => {
        fetchSuggestions();
      }, 300); // Debounce
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setDidYouMean(null);
    }
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadPopularSearches = async () => {
    try {
      const response = await searchService.getPopularSearches(5);
      if (response?.success && response?.data?.popularSearches) {
        setPopularSearches(
          response.data.popularSearches.map((item) => item.query)
        );
      }
    } catch (error) {
      console.error("Failed to load popular searches:", error);
    }
  };

  const loadRecentSearches = async () => {
    try {
      const response = await searchService.getRecentSearches(5);
      if (response?.success && response?.data?.recentSearches) {
        setRecentSearches(
          response.data.recentSearches.map((item) => item.query)
        );
      }
    } catch (error) {
      console.error("Failed to load recent searches:", error);
    }
  };

  const fetchSuggestions = async () => {
    setIsLoading(true);
    try {
      const response = await searchService.getSuggestions(query, 5);
      if (response.success && response.data) {
        setSuggestions(response.data.suggestions.map((item) => item.text));
      }
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;

    // Track search analytics
    try {
      await searchService.trackSearch(searchQuery, 0);
    } catch (error) {
      console.error("Failed to track search:", error);
    }

    setShowDropdown(false);

    if (onSearch) {
      onSearch(searchQuery);
    } else {
      router.push(`/marketplace?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const clearQuery = () => {
    setQuery("");
    setSuggestions([]);
    setDidYouMean(null);
    inputRef.current?.focus();
  };

  const showEmptyState =
    showDropdown &&
    query.length === 0 &&
    (recentSearches.length > 0 || popularSearches.length > 0);
  const showSuggestionsState =
    showDropdown && (suggestions.length > 0 || isLoading);

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative flex items-center">
        <div className="absolute left-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-600" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowDropdown(true)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-10 pr-10 py-3 border text-gray-600 border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-[#1a5f52] focus:border-transparent"
        />
        {query && (
          <button
            onClick={clearQuery}
            className="absolute right-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {(showEmptyState || showSuggestionsState) && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
        >
          {/* Loading State */}
          {isLoading && (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin inline-block w-5 h-5 border-2 border-gray-300 border-t-[#1a5f52] rounded-full"></div>
            </div>
          )}

          {/* Suggestions */}
          {!isLoading && suggestions.length > 0 && (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                Suggestions
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                >
                  <Search className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{suggestion}</span>
                </button>
              ))}
            </div>
          )}

          {/* Did You Mean */}
          {didYouMean && (
            <div className="px-4 py-3 border-t border-gray-100">
              <span className="text-sm text-gray-600">Did you mean: </span>
              <button
                onClick={() => handleSuggestionClick(didYouMean)}
                className="text-sm text-[#1a5f52] hover:underline font-medium"
              >
                {didYouMean}
              </button>
            </div>
          )}

          {/* Recent Searches */}
          {query.length === 0 && recentSearches.length > 0 && (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase flex items-center gap-2">
                <Clock className="w-3 h-3" />
                Recent Searches
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                >
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* Popular Searches */}
          {query.length === 0 &&
            popularSearches.length > 0 &&
            (!isAuthenticated || recentSearches.length === 0) && (
              <div className="py-2 border-t border-gray-100">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase flex items-center gap-2">
                  <TrendingUp className="w-3 h-3" />
                  Popular Searches
                </div>
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                  >
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{search}</span>
                  </button>
                ))}
              </div>
            )}

          {/* Empty State */}
          {!isLoading &&
            query.length >= 2 &&
            suggestions.length === 0 &&
            !didYouMean && (
              <div className="px-4 py-6 text-center text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No suggestions found</p>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
