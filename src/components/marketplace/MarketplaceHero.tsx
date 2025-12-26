"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MarketplaceHero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <div className="relative w-full max-w-[1200px] h-[400px] mx-auto rounded-2xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden bg-gradient-to-br from-[#eefbf6] to-[#e8f8f2]">
      {/* Main heading */}
      <h1 className="absolute left-1/2 top-[77.5px] -translate-x-1/2 -translate-y-1/2 font-poppins font-normal text-7xl text-[#0d1b2a] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] whitespace-nowrap m-0">
        B2B Surplus Marketplace
      </h1>

      {/* Subheading */}
      <p className="absolute left-1/2 top-[155.5px] -translate-x-1/2 -translate-y-1/2 font-inter font-medium text-2xl text-[#787878] whitespace-nowrap m-0">
        Millions of products. Thousands of suppliers. One marketplace
      </p>

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="absolute left-1/2 top-[240px] -translate-x-1/2 bg-[#EBEBEB] bg-opacity-65 border border-gray-200 rounded-full flex items-center h-[65px] w-[819px]"
      >
        {/* All dropdown */}
        <div className="relative">
          <div
            className="flex items-center gap-1 px-4 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="font-inter font-medium text-sm text-gray-700 whitespace-nowrap">
              {selectedCategory}
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9L12 15L18 9"
                stroke="#374151"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-48 max-h-80 overflow-y-auto">
              {categories.map((category) => (
                <div
                  key={category}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-inter text-sm text-gray-700"
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsDropdownOpen(false);
                  }}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-[#58606D]" />

        {/* Search input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for products, categories, etc"
          className="flex-1 border-none bg-transparent outline-none font-inter font-normal text-sm text-gray-700 px-4"
        />

        {/* Divider */}
        <div className="w-px h-6 bg-[#58606D]" />

        {/* Filter icon */}
        <div className="px-3 cursor-pointer flex items-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
              stroke="#374151"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-[#58606D]" />

        {/* Search button */}
        <button
          type="submit"
          className="font-inter font-medium text-sm text-gray-700 bg-transparent border-none cursor-pointer px-5 h-full"
        >
          Search
        </button>
      </form>
    </div>
  );
}
