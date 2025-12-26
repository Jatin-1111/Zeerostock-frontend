"use client";

import { useState } from "react";
import { Filter, Check } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

interface Filters {
  categories: string[];
  industries: string[];
  conditions: string[];
  listingTypes: string[];
  features: string[];
  priceRange: { min: number; max: number };
}

interface MarketplaceFilterSidebarProps {
  onFilterChange?: (filters: Filters) => void;
  isOpen: boolean;
  onClose?: () => void;
}

export default function MarketplaceFilterSidebar({
  onFilterChange,
  isOpen,
  onClose,
}: MarketplaceFilterSidebarProps) {
  const [priceRange, setPriceRange] = useState({ min: 30000, max: 50000 });
  const [categories, setCategories] = useState<FilterOption[]>([
    { id: "all", label: "All categories", checked: true },
    { id: "materials", label: "Materials", checked: false },
    { id: "electronics", label: "Electronics", checked: false },
    { id: "electronics2", label: "Electronics", checked: false },
    { id: "automotive", label: "Automotive", checked: false },
    { id: "machinery", label: "Machinery", checked: false },
    { id: "textiles", label: "Textiles", checked: false },
    { id: "chemicals", label: "Chemicals", checked: false },
    { id: "healthcare", label: "Healthcare", checked: false },
  ]);

  const [industries, setIndustries] = useState<FilterOption[]>([
    { id: "all", label: "All Industries", checked: false },
    { id: "construction", label: "Construction", checked: false },
    { id: "technology", label: "Techonolgy", checked: false },
    { id: "manufacturing", label: "Manufacturing", checked: false },
    { id: "fashion", label: "Fashion", checked: false },
    { id: "medical", label: "Medical", checked: false },
  ]);

  const [conditions, setConditions] = useState<FilterOption[]>([
    { id: "new", label: "New", checked: false },
    { id: "likenew", label: "Like New", checked: false },
    { id: "good", label: "Good", checked: false },
    { id: "fair", label: "Fair", checked: false },
  ]);

  const [listingTypes, setListingTypes] = useState<FilterOption[]>([
    { id: "auction", label: "Auction", checked: false },
    { id: "fixed", label: "Fixed", checked: false },
    { id: "negotiable", label: "Negotiable", checked: false },
  ]);

  const [features, setFeatures] = useState<FilterOption[]>([
    { id: "verified", label: "Verified Supplier", checked: false },
    { id: "trending", label: "Trending", checked: false },
    { id: "flashdeal", label: "Flash Deal", checked: false },
    { id: "sponsored", label: "Sponsored", checked: false },
    { id: "freeshipping", label: "Free Shipping", checked: false },
    { id: "bulkdiscount", label: "Bulk Discount", checked: false },
  ]);

  const handleCheckboxChange = (
    section: string,
    optionId: string,
    setState: React.Dispatch<React.SetStateAction<FilterOption[]>>
  ) => {
    setState((prev) =>
      prev.map((option) =>
        option.id === optionId
          ? { ...option, checked: !option.checked }
          : option
      )
    );
    // Trigger filter change callback
    if (onFilterChange) {
      setTimeout(() => {
        onFilterChange({
          categories: categories.filter((c) => c.checked).map((c) => c.id),
          industries: industries.filter((i) => i.checked).map((i) => i.id),
          conditions: conditions.filter((c) => c.checked).map((c) => c.id),
          listingTypes: listingTypes.filter((l) => l.checked).map((l) => l.id),
          features: features.filter((f) => f.checked).map((f) => f.id),
          priceRange,
        });
      }, 0);
    }
  };

  const FilterCheckbox = ({
    option,
    onChange,
  }: {
    option: FilterOption;
    onChange: () => void;
  }) => (
    <div className="flex items-center justify-between py-2">
      <label
        className={`text-[15px] font-medium cursor-pointer ${
          option.checked ? "text-[#2aae7a]" : "text-[#787878]"
        }`}
      >
        {option.label}
      </label>
      <button
        onClick={onChange}
        className={`w-[23px] h-[23px] border-2 rounded-[4px] flex items-center justify-center cursor-pointer transition-colors ${
          option.checked
            ? "bg-[#2aae7a] border-[#2aae7a]"
            : "bg-white border-[#cacaca]"
        }`}
      >
        {option.checked && <Check className="w-[15px] h-[15px] text-white" />}
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          sticky top-0 h-screen bg-white 
          shadow-[1px_0px_4px_0px_rgba(0,0,0,0.25)]
          transition-all duration-300 ease-in-out
          overflow-y-auto overflow-x-hidden
          ${isOpen ? "w-[266px] opacity-100" : "w-0 opacity-0"}
        `}
      >
        <div
          className={`w-[266px] px-[18px] py-6 ${isOpen ? "" : "invisible"}`}
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-[23px] h-[23px] text-[#0d1b2a]" />
            <h2 className="text-[20px] font-medium text-[#0d1b2a]">Filters</h2>
          </div>

          {/* Categories */}
          <div className="mb-[18px]">
            <h3 className="text-[20px] font-medium text-[#0d1b2a] mb-3">
              Categories
            </h3>
            <div className="space-y-1">
              {categories.map((option) => (
                <FilterCheckbox
                  key={option.id}
                  option={option}
                  onChange={() =>
                    handleCheckboxChange("categories", option.id, setCategories)
                  }
                />
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 my-[18px]"></div>

          {/* Industries */}
          <div className="mb-[18px]">
            <h3 className="text-[20px] font-medium text-[#0d1b2a] mb-3">
              Industries
            </h3>
            <div className="space-y-1">
              {industries.map((option) => (
                <FilterCheckbox
                  key={option.id}
                  option={option}
                  onChange={() =>
                    handleCheckboxChange("industries", option.id, setIndustries)
                  }
                />
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 my-[18px]"></div>

          {/* Price Range */}
          <div className="mb-[18px]">
            <h3 className="text-[20px] font-medium text-[#0d1b2a] mb-2">
              Price Range
            </h3>
            <p className="text-[14px] font-medium text-[#0d1b2a] mb-3">
              ₹{priceRange.min.toLocaleString()}- ₹
              {priceRange.max.toLocaleString()}
            </p>
            <div className="relative pt-2 pb-[18px]">
              <input
                type="range"
                min="0"
                max="100000"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({
                    ...priceRange,
                    max: parseInt(e.target.value),
                  })
                }
                className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#2aae7a]"
              />
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 my-[18px]"></div>

          {/* Condition */}
          <div className="mb-[18px]">
            <h3 className="text-[20px] font-medium text-[#0d1b2a] mb-3">
              Condition
            </h3>
            <div className="space-y-1">
              {conditions.map((option) => (
                <FilterCheckbox
                  key={option.id}
                  option={option}
                  onChange={() =>
                    handleCheckboxChange("conditions", option.id, setConditions)
                  }
                />
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 my-[18px]"></div>

          {/* Listing Type */}
          <div className="mb-[18px]">
            <h3 className="text-[20px] font-medium text-[#0d1b2a] mb-3">
              Listing Type
            </h3>
            <div className="space-y-1">
              {listingTypes.map((option) => (
                <FilterCheckbox
                  key={option.id}
                  option={option}
                  onChange={() =>
                    handleCheckboxChange(
                      "listingTypes",
                      option.id,
                      setListingTypes
                    )
                  }
                />
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 my-[18px]"></div>

          {/* Features */}
          <div className="mb-[18px]">
            <h3 className="text-[20px] font-medium text-[#0d1b2a] mb-3">
              Features
            </h3>
            <div className="space-y-1">
              {features.map((option) => (
                <FilterCheckbox
                  key={option.id}
                  option={option}
                  onChange={() =>
                    handleCheckboxChange("features", option.id, setFeatures)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
