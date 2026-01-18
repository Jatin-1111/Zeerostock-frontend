"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Filter, Check } from "lucide-react";
import { marketplaceService } from "@/services/marketplace.service";
import type { Category, Industry } from "@/types/api.types";

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
  categoryNames?: Record<string, string>; // Map of ID to name
  industryNames?: Record<string, string>; // Map of ID to name
}

interface MarketplaceFilterSidebarProps {
  onFilterChange?: (filters: Filters) => void;
  isOpen: boolean;
  onClose?: () => void;
  initialFilters?: Partial<Filters>;
}

export default function MarketplaceFilterSidebar({
  onFilterChange,
  isOpen,
  onClose,
  initialFilters,
}: MarketplaceFilterSidebarProps) {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [categories, setCategories] = useState<FilterOption[]>([
    { id: "all", label: "All categories", checked: true },
  ]);

  const [industries, setIndustries] = useState<FilterOption[]>([
    { id: "all", label: "All Industries", checked: false },
  ]);

  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingIndustries, setIsLoadingIndustries] = useState(true);
  const hasAppliedInitialFilters = useRef(false);

  // Fetch categories from backend (only once on mount)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await marketplaceService.getCategories();
        if (response.success && response.data?.categories) {
          const categoryOptions: FilterOption[] = [
            {
              id: "all",
              label: "All categories",
              checked: true,
            },
            ...response.data.categories.map((cat: Category) => ({
              id: cat.id,
              label: cat.name,
              checked: false,
            })),
          ];
          setCategories(categoryOptions);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Apply initial filters when categories are loaded
  useEffect(() => {
    console.log("[Sidebar] Initial filters effect:", {
      hasApplied: hasAppliedInitialFilters.current,
      initialFilters: initialFilters?.categories,
      categoriesLength: categories.length,
    });

    if (
      !hasAppliedInitialFilters.current &&
      initialFilters?.categories &&
      initialFilters.categories.length > 0 &&
      categories.length > 1
    ) {
      const initialCategoryIds = initialFilters.categories;
      console.log(
        "[Sidebar] Applying initial category filters:",
        initialCategoryIds
      );

      setCategories((prev) =>
        prev.map((cat) => ({
          ...cat,
          checked:
            cat.id === "all" ? false : initialCategoryIds.includes(cat.id),
        }))
      );
      hasAppliedInitialFilters.current = true;
      console.log("[Sidebar] Initial filters applied");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.length]);

  // Fetch industries from backend
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await marketplaceService.getIndustries();
        if (response.success && response.data?.industries) {
          const industryOptions: FilterOption[] = [
            { id: "all", label: "All Industries", checked: false },
            ...response.data.industries.map((ind: Industry) => ({
              id: ind.id,
              label: ind.name,
              checked: false,
            })),
          ];
          setIndustries(industryOptions);
        }
      } catch (error) {
        console.error("Error fetching industries:", error);
      } finally {
        setIsLoadingIndustries(false);
      }
    };

    fetchIndustries();
  }, []);

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

  // Trigger filter change whenever any filter state changes
  useEffect(() => {
    console.log("[Sidebar] Filter change effect:", {
      isLoadingCategories,
      isLoadingIndustries,
    });

    // Don't trigger filter change until categories are fully loaded
    if (isLoadingCategories || isLoadingIndustries) {
      console.log("[Sidebar] Skipping - still loading");
      return;
    }

    if (onFilterChange) {
      const selectedCategories = categories
        .filter((c) => c.checked && c.id !== "all")
        .map((c) => c.id);
      const selectedIndustries = industries
        .filter((i) => i.checked && i.id !== "all")
        .map((i) => i.id);
      const selectedConditions = conditions
        .filter((c) => c.checked)
        .map((c) => c.id);
      const selectedListingTypes = listingTypes
        .filter((l) => l.checked)
        .map((l) => l.id);
      const selectedFeatures = features
        .filter((f) => f.checked)
        .map((f) => f.id);

      // Create name mappings
      const categoryNames: Record<string, string> = {};
      categories.forEach((c) => {
        categoryNames[c.id] = c.label;
      });

      const industryNames: Record<string, string> = {};
      industries.forEach((i) => {
        industryNames[i.id] = i.label;
      });

      console.log(
        "[Sidebar] onFilterChange called with categories:",
        selectedCategories
      );

      onFilterChange({
        categories: selectedCategories,
        industries: selectedIndustries,
        conditions: selectedConditions,
        listingTypes: selectedListingTypes,
        features: selectedFeatures,
        priceRange,
        categoryNames,
        industryNames,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, industries, conditions, listingTypes, features, priceRange]);

  // Handle Escape key to close sidebar
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen && onClose) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleEscapeKey]);

  const handleCheckboxChange = (
    section: string,
    optionId: string,
    setState: React.Dispatch<React.SetStateAction<FilterOption[]>>,
    currentState: FilterOption[]
  ) => {
    // Handle "All" logic for categories and industries
    if (optionId === "all") {
      setState((prev) =>
        prev.map((option) => ({
          ...option,
          checked: option.id === "all",
        }))
      );
    } else {
      setState((prev) =>
        prev.map((option) => {
          if (option.id === optionId) {
            return { ...option, checked: !option.checked };
          }
          // Uncheck "All" if any other option is checked
          if (option.id === "all") {
            return { ...option, checked: false };
          }
          return option;
        })
      );
    }
  };

  const handlePriceChange = (type: "min" | "max", value: number) => {
    setPriceRange((prev) => {
      const newRange = { ...prev, [type]: value };
      // Ensure min doesn't exceed max and max doesn't go below min
      if (type === "min" && newRange.min > newRange.max) {
        newRange.max = newRange.min;
      } else if (type === "max" && newRange.max < newRange.min) {
        newRange.min = newRange.max;
      }
      return newRange;
    });
  };

  const clearAllFilters = () => {
    setCategories((prev) =>
      prev.map((option) => ({
        ...option,
        checked: option.id === "all",
      }))
    );
    setIndustries((prev) =>
      prev.map((option) => ({
        ...option,
        checked: false,
      }))
    );
    setConditions((prev) =>
      prev.map((option) => ({
        ...option,
        checked: false,
      }))
    );
    setListingTypes((prev) =>
      prev.map((option) => ({
        ...option,
        checked: false,
      }))
    );
    setFeatures((prev) =>
      prev.map((option) => ({
        ...option,
        checked: false,
      }))
    );
    setPriceRange({ min: 0, max: 100000 });
  };

  // Count active filters (excluding "all" selections)
  const activeFiltersCount =
    categories.filter((c) => c.checked && c.id !== "all").length +
    industries.filter((i) => i.checked && i.id !== "all").length +
    conditions.filter((c) => c.checked).length +
    listingTypes.filter((l) => l.checked).length +
    features.filter((f) => f.checked).length +
    (priceRange.min > 0 || priceRange.max < 100000 ? 1 : 0);

  const FilterCheckbox = ({
    option,
    onChange,
  }: {
    option: FilterOption;
    onChange: () => void;
  }) => (
    <div className="flex items-center justify-between py-[10px]">
      <label
        onClick={onChange}
        className={`text-[12px] font-medium cursor-pointer select-none ${
          option.checked ? "text-[#2aae7a]" : "text-[#787878]"
        }`}
      >
        {option.label}
      </label>
      <button
        onClick={onChange}
        className={`w-[15px] h-[15px] border-2 rounded-[4px] flex items-center justify-center cursor-pointer transition-colors flex-shrink-0 ${
          option.checked
            ? "bg-[#2aae7a] border-[#2aae7a]"
            : "bg-white border-[#cacaca]"
        }`}
        aria-label={`${option.checked ? "Uncheck" : "Check"} ${option.label}`}
      >
        {option.checked && <Check className="w-[10px] h-[10px] text-white" />}
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:sticky lg:top-0 left-0 h-[calc(100vh-64px)] lg:h-screen bg-white 
          shadow-[1px_0px_4px_0px_rgba(0,0,0,0.25)]
          transition-all duration-300 ease-in-out
          overflow-y-auto overflow-x-hidden
          z-50 lg:z-auto
          ${isOpen ? "w-[220px] opacity-100" : "w-0 opacity-0 lg:w-0"}
        `}
      >
        <div
          className={`w-[220px] px-[13px] py-[25px] ${
            isOpen ? "" : "invisible"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-[20px]">
            <div className="flex items-center gap-[10px]">
              <Filter className="w-[12px] h-[12px] text-[#0d1b2a]" />
              <h2 className="text-[13px] font-medium text-[#0d1b2a]">
                Filters
              </h2>
              {activeFiltersCount > 0 && (
                <span className="bg-[#2aae7a] text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-[10px] font-medium text-[#2aae7a] hover:text-[#239662] transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-[12px] font-medium text-[#0d1b2a] mb-[20px]">
              Categories
            </h3>
            <div className="space-y-[4px]">
              {categories.map((option) => (
                <FilterCheckbox
                  key={option.id}
                  option={option}
                  onChange={() =>
                    handleCheckboxChange(
                      "categories",
                      option.id,
                      setCategories,
                      categories
                    )
                  }
                />
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 my-[21px]"></div>

          {/* Industries */}
          <div className="mb-6">
            <h3 className="text-[12px] font-medium text-[#0d1b2a] mb-[20px]">
              Industries
            </h3>
            <div className="space-y-[4px]">
              {industries.map((option) => (
                <FilterCheckbox
                  key={option.id}
                  option={option}
                  onChange={() =>
                    handleCheckboxChange(
                      "industries",
                      option.id,
                      setIndustries,
                      industries
                    )
                  }
                />
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 my-[21px]"></div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-[12px] font-medium text-[#0d1b2a] mb-2">
              Price Range
            </h3>
            <p className="text-[12px] font-medium text-[#0d1b2a] mb-3">
              ₹{priceRange.min.toLocaleString("en-IN")}- ₹
              {priceRange.max.toLocaleString("en-IN")}
            </p>
            <div className="space-y-2">
              <div>
                <label className="text-[10px] text-[#787878] mb-1 block">
                  Min: ₹{priceRange.min.toLocaleString("en-IN")}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={priceRange.min}
                  onChange={(e) =>
                    handlePriceChange("min", parseInt(e.target.value))
                  }
                  className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#2aae7a]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#787878] mb-1 block">
                  Max: ₹{priceRange.max.toLocaleString("en-IN")}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={priceRange.max}
                  onChange={(e) =>
                    handlePriceChange("max", parseInt(e.target.value))
                  }
                  className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#2aae7a]"
                />
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 my-[21px]"></div>

          {/* Condition */}
          <div className="mb-6">
            <h3 className="text-[12px] font-medium text-[#0d1b2a] mb-[20px]">
              Condition
            </h3>
            <div className="space-y-[4px]">
              {conditions.map((option) => (
                <FilterCheckbox
                  key={option.id}
                  option={option}
                  onChange={() =>
                    handleCheckboxChange(
                      "conditions",
                      option.id,
                      setConditions,
                      conditions
                    )
                  }
                />
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 my-[21px]"></div>

          {/* Listing Type */}
          <div className="mb-6">
            <h3 className="text-[12px] font-medium text-[#0d1b2a] mb-[20px]">
              Listing Type
            </h3>
            <div className="space-y-[4px]">
              {listingTypes.map((option) => (
                <FilterCheckbox
                  key={option.id}
                  option={option}
                  onChange={() =>
                    handleCheckboxChange(
                      "listingTypes",
                      option.id,
                      setListingTypes,
                      listingTypes
                    )
                  }
                />
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 my-[21px]"></div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-[12px] font-medium text-[#0d1b2a] mb-[20px]">
              Features
            </h3>
            <div className="space-y-[4px]">
              {features.map((option) => (
                <FilterCheckbox
                  key={option.id}
                  option={option}
                  onChange={() =>
                    handleCheckboxChange(
                      "features",
                      option.id,
                      setFeatures,
                      features
                    )
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
