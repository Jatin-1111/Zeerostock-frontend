"use client";

import { useState } from "react";

export default function CategorySection() {
  const [showAll, setShowAll] = useState(false);

  const categories = [
    {
      name: "Electronics",
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
        >
          <rect x="8" y="12" width="48" height="32" rx="2" strokeWidth="2" />
          <path
            d="M20 44h24M32 44v8M24 52h16"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      name: "Industrial",
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M12 52h40M16 52V32l12-8v28M28 24l12-8v36"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="22" cy="38" r="2" fill="currentColor" />
          <circle cx="22" cy="46" r="2" fill="currentColor" />
          <circle cx="34" cy="30" r="2" fill="currentColor" />
          <circle cx="34" cy="38" r="2" fill="currentColor" />
          <circle cx="34" cy="46" r="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: "Construction",
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M32 8L8 28h8v20h40V28h8L32 8z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M28 48V36h8v12" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: "Agriculture",
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="32" cy="20" r="8" strokeWidth="2" />
          <circle cx="16" cy="32" r="6" strokeWidth="2" />
          <circle cx="48" cy="32" r="6" strokeWidth="2" />
          <path
            d="M32 28v24M24 40l-8 8M40 40l8 8"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      name: "Cosmetics",
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M20 16h24v8H20zM22 24v24c0 2 1 4 3 4h14c2 0 3-2 3-4V24"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="28"
            y1="12"
            x2="28"
            y2="16"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="36"
            y1="12"
            x2="36"
            y2="16"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      name: "Appliances",
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
        >
          <rect x="12" y="8" width="40" height="48" rx="2" strokeWidth="2" />
          <line x1="12" y1="20" x2="52" y2="20" strokeWidth="2" />
          <circle cx="20" cy="14" r="2" fill="currentColor" />
          <circle cx="28" cy="14" r="2" fill="currentColor" />
          <circle cx="32" cy="36" r="10" strokeWidth="2" />
          <path d="M32 30v6l4 4" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "Hand Tools",
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M16 32l16-16 16 16M20 28l-8 8 12 12 8-8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M36 20l8 8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "Decor",
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M32 8v8M32 48v8M48 32h8M8 32h8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="32" cy="32" r="12" strokeWidth="2" />
          <path d="M32 20c-4 0-8 2-8 8s4 8 8 8" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: "Cleaning items",
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M24 16h16v12H24zM28 28v24M20 44h16c2 0 4 2 4 4v4H16v-4c0-2 2-4 4-4z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="28"
            y1="12"
            x2="28"
            y2="16"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      name: "Fasteners",
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M32 8v48M20 20l12-8 12 8M20 44l12 8 12-8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="24" y1="32" x2="40" y2="32" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: "Plumbing Materials",
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M16 32h12v12H16zM36 32h12v12H36zM28 26v20"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M28 38h8v8h-8z" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: "Electricals",
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M28 8h8l-4 20h8L24 56l8-24h-8l8-24z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: "Power Tools",
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
        >
          <rect x="20" y="24" width="24" height="28" rx="2" strokeWidth="2" />
          <path
            d="M26 16h12v8H26zM28 32h8M28 40h8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="32" cy="46" r="3" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: "PPE",
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M32 8c-8 0-16 4-16 12v8c0 8 8 12 16 12s16-4 16-12v-8c0-8-8-12-16-12z"
            strokeWidth="2"
          />
          <path
            d="M20 28c-4 2-8 6-8 12v8h40v-8c0-6-4-10-8-12"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="24"
            y1="16"
            x2="28"
            y2="20"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="40"
            y1="16"
            x2="36"
            y2="20"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      name: "Abrasives",
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="32" cy="32" r="20" strokeWidth="2" />
          <circle cx="32" cy="32" r="8" strokeWidth="2" />
          <path
            d="M32 12v8M32 44v8M52 32h-8M20 32h-8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M44 20l-6 6M26 38l-6 6M44 44l-6-6M26 26l-6-6"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      name: "Chisels & Drill bits",
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M16 16l8 8M24 24l16 16M40 40l8 8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M28 20h8v8h-8z" strokeWidth="2" />
          <path
            d="M36 28l12 12-4 4-12-12"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      name: "Food Containers",
      icon: (
        <svg
          className="w-16 h-16"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M16 20h32v28H16z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 20v-4c0-2 2-4 4-4h16c2 0 4 2 4 4v4"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line x1="16" y1="28" x2="48" y2="28" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  const displayedCategories = showAll ? categories : categories.slice(0, 6);

  return (
    <div className="max-w-[1200px] mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-semibold text-[28px] text-[#1a1a1a] m-0">
          Shop by Category
        </h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="font-medium text-base text-gray-600 bg-transparent border-none cursor-pointer hover:text-[#2D4A9A] transition-colors"
        >
          {showAll ? "Show less" : "View all categories"}
        </button>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {displayedCategories.map((category, index) => (
          <button
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center gap-4 border-none cursor-pointer hover:-translate-y-1 transition-transform duration-200"
          >
            <div className="text-gray-700">{category.icon}</div>
            <span className="font-medium text-sm text-[#1a1a1a] text-center leading-tight">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
