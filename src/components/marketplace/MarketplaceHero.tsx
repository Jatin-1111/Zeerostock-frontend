"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function MarketplaceHero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const categories = [
    "All",
    "Electronics",
    "Industrial",
    "Construction",
    "Agriculture",
    "Cosmetics",
    "Appliances",
    "Hand Tools",
    "Decor",
    "Cleaning items",
    "Fasteners",
    "Plumbing materials",
    "Electricals",
    "Power Tools",
    "PPE",
    "Abrasives",
    "Chisels & Drill bits",
    "Food Containers",
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      params.set("q", searchQuery);
      if (selectedCategory !== "All") {
        params.set("category", selectedCategory);
      }
      router.push(`/marketplace?${params.toString()}`);
    }
  };

  return (
    <div
      className="relative w-full max-w-[900px] mx-auto rounded-2xl shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)] h-[300px] bg-[#eefbf6] bg-[url('/hero-marketplace.jpg')] bg-cover bg-center bg-no-repeat"
      style={{ overflow: "visible" }}
    >
      {/* Main heading */}
      <h1 className="absolute left-1/2 top-[58px] -translate-x-1/2 -translate-y-1/2 font-normal text-5xl text-[#0d1b2a] drop-shadow-[0_3px_3px_rgba(0,0,0,0.25)] whitespace-nowrap m-0">
        B2B Surplus Marketplace
      </h1>

      {/* Subheading */}
      <p className="absolute left-1/2 top-[117px] -translate-x-1/2 -translate-y-1/2 font-medium text-xl text-[#787878] whitespace-nowrap m-0">
        Millions of products. Thousands of suppliers. One marketplace
      </p>

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="absolute left-1/2 top-[180px] -translate-x-1/2 bg-[#EBEBEB] border border-gray-200 rounded-full flex items-center h-[49px] w-[614px]"
      >
        {/* All dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-1 px-3 cursor-pointer"
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
              if (!isDropdownOpen) setIsFilterOpen(false);
            }}
          >
            <span className="font-medium text-xs text-gray-700 whitespace-nowrap">
              {selectedCategory}
            </span>
            <motion.svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#374151"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </div>

          {/* Dropdown menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-1.5 bg-[#EBEBEB] border border-gray-200 rounded-lg shadow-lg z-[9999] space-y-[0.5px] w-36 max-h-60 overflow-y-auto"
              >
                {categories.map((category) => (
                  <motion.div
                    key={category}
                    whileHover={{ backgroundColor: "#d3d1d1" }}
                    className="px-3 py-1.5 cursor-pointer text-xs text-gray-700"
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {category}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="w-px h-[18px] bg-[#58606D]" />

        {/* Search input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for products, categories, etc"
          className="flex-1 border-none bg-transparent outline-none font-normal text-xs text-gray-700 px-3"
        />

        {/* Divider */}
        <div className="w-px h-6 bg-[#58606D]" />

        {/* Filter icon */}
        <div className="relative" ref={filterRef}>
          <div
            className="px-2 cursor-pointer flex items-center"
            onClick={() => {
              setIsFilterOpen(!isFilterOpen);
              if (!isFilterOpen) setIsDropdownOpen(false);
            }}
          >
            <motion.svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              animate={{ scale: isFilterOpen ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <path
                d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
                stroke="#374151"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </div>

          {/* Filter dropdown */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-1.5 bg-[#EBEBEB] border border-gray-200 rounded-lg shadow-lg space-y-[0.5px] z-[9999] w-48 p-3"
              >
                <div className="text-xs font-medium text-gray-700 mb-2">
                  Quick Filters
                </div>
                <motion.div
                  whileHover={{ backgroundColor: "#d3d1d1" }}
                  className="px-2 py-1.5 cursor-pointer text-xs text-gray-600 rounded"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Price: Low to High
                </motion.div>
                <motion.div
                  whileHover={{ backgroundColor: "#d3d1d1" }}
                  className="px-2 py-1.5 cursor-pointer text-xs text-gray-600 rounded"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Price: High to Low
                </motion.div>
                <motion.div
                  whileHover={{ backgroundColor: "#d3d1d1" }}
                  className="px-2 py-1.5 cursor-pointer text-xs text-gray-600 rounded"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Newest First
                </motion.div>
                <motion.div
                  whileHover={{ backgroundColor: "#d3d1d1" }}
                  className="px-2 py-1.5 cursor-pointer text-xs text-gray-600 rounded"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Most Popular
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-[#58606D]" />

        {/* Search button */}
        <button
          type="submit"
          className="font-medium text-xs text-gray-700 bg-transparent border-none cursor-pointer px-4 h-full"
        >
          Search
        </button>
      </form>
    </div>
  );
}
