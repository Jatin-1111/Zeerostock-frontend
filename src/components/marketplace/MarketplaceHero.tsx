"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
      className="relative w-full max-w-[900px] mx-auto rounded-2xl shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)] min-h-[300px] md:h-[300px] bg-[#eefbf6] overflow-hidden flex flex-col justify-center items-center px-4 py-8 md:py-0"
      style={{ overflow: "visible" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/hero-marketplace.jpg"
          alt="Marketplace Hero Background"
          fill
          className="object-cover opacity-30 md:opacity-100 rounded-2xl"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full text-center">
        {/* Main heading */}
        <h1 className="font-normal text-[28px] md:text-[54px] text-[#0d1b2a] drop-shadow-[0_3px_3px_rgba(0,0,0,0.25)] m-0 leading-tight">
          B2B Surplus Marketplace
        </h1>

        {/* Subheading */}
        <p className="font-medium text-[12px] md:text-[18px] text-[#787878] mt-2 md:mt-4 max-w-[90%]">
          Millions of products. Thousands of suppliers. One marketplace
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="bg-[#EBEBEB]/65 border border-gray-200 rounded-full flex flex-row items-center w-full max-w-[614px] mt-6 md:mt-8 h-[44px] md:h-[49px] px-1 md:px-0"
        >
          {/* All dropdown */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <div
              className="flex items-center gap-1 px-2 md:px-3 cursor-pointer h-full"
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
                if (!isDropdownOpen) setIsFilterOpen(false);
              }}
            >
              <span className="font-medium text-[10.5px] text-gray-700 whitespace-nowrap max-w-[60px] md:max-w-none truncate sm:block hidden">
                {selectedCategory}
              </span>
              <span className="font-medium text-[10.5px] text-gray-700 whitespace-nowrap block sm:hidden">
                {selectedCategory === "All"
                  ? "All"
                  : selectedCategory.slice(0, 3) + ".."}
              </span>

              <motion.svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0"
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
                      className="px-3 py-1.5 cursor-pointer text-[10.5px] text-gray-700"
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
          <div className="w-px h-[18px] bg-[#58606D] shrink-0" />

          {/* Search input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="flex-1 min-w-0 border-none bg-transparent outline-none font-normal text-[10.5px] text-gray-700 px-2 md:px-3"
          />

          {/* Divider */}
          <div className="w-px h-6 bg-[#58606D] shrink-0" />

          {/* Filter icon */}
          <div className="relative shrink-0" ref={filterRef}>
            <div
              className="px-2 cursor-pointer flex items-center h-full"
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
                  <div className="text-[10.5px] font-medium text-gray-700 mb-2">
                    Quick Filters
                  </div>
                  <motion.div
                    whileHover={{ backgroundColor: "#d3d1d1" }}
                    className="px-2 py-1.5 cursor-pointer text-[10.5px] text-gray-600 rounded"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Price: Low to High
                  </motion.div>
                  <motion.div
                    whileHover={{ backgroundColor: "#d3d1d1" }}
                    className="px-2 py-1.5 cursor-pointer text-[10.5px] text-gray-600 rounded"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Price: High to Low
                  </motion.div>
                  <motion.div
                    whileHover={{ backgroundColor: "#d3d1d1" }}
                    className="px-2 py-1.5 cursor-pointer text-[10.5px] text-gray-600 rounded"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Newest First
                  </motion.div>
                  <motion.div
                    whileHover={{ backgroundColor: "#d3d1d1" }}
                    className="px-2 py-1.5 cursor-pointer text-[10.5px] text-gray-600 rounded"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Most Popular
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-[#58606D] shrink-0" />

          {/* Search button */}
          <button
            type="submit"
            className="font-medium text-[10.5px] text-gray-700 bg-transparent border-none cursor-pointer px-3 md:px-4 h-full shrink-0"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
