"use client";

import { Send, AlertCircle, Check, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import rfqService from "@/services/rfq.service";
import type {
  CreateRFQRequest,
  Category,
  Industry,
  RFQUnit,
} from "@/types/buyer.types";

export default function PostRFQPage() {
  const [formData, setFormData] = useState<CreateRFQRequest>({
    title: "",
    categoryId: "",
    industryId: "",
    quantity: 0,
    unit: "pieces" as RFQUnit,
    budgetMin: undefined,
    budgetMax: undefined,
    requiredByDate: "",
    detailedRequirements: "",
    preferredLocation: "",
    durationDays: 7,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Dropdown states
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [isUnitOpen, setIsUnitOpen] = useState(false);
  const [isDurationOpen, setIsDurationOpen] = useState(false);

  // Refs for click outside detection
  const categoryRef = useRef<HTMLDivElement>(null);
  const industryRef = useRef<HTMLDivElement>(null);
  const unitRef = useRef<HTMLDivElement>(null);
  const durationRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
      if (
        industryRef.current &&
        !industryRef.current.contains(event.target as Node)
      ) {
        setIsIndustryOpen(false);
      }
      if (unitRef.current && !unitRef.current.contains(event.target as Node)) {
        setIsUnitOpen(false);
      }
      if (
        durationRef.current &&
        !durationRef.current.contains(event.target as Node)
      ) {
        setIsDurationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load categories and industries on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesRes, industriesRes] = await Promise.all([
          rfqService.getCategories(),
          rfqService.getIndustries(),
        ]);

        // Handle categories - check both nested and direct data
        if (categoriesRes.success) {
          const cats =
            categoriesRes.data?.categories || categoriesRes.data || [];
          setCategories(Array.isArray(cats) ? cats : []);
        }

        // Handle industries - check both nested and direct data
        if (industriesRes.success) {
          const inds =
            industriesRes.data?.industries || industriesRes.data || [];
          setIndustries(Array.isArray(inds) ? inds : []);
        }
      } catch (err) {
        setError("Failed to load form data. Please refresh the page.");
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, []);

  const units: { category: string; items: RFQUnit[] }[] = [
    {
      category: "General Units",
      items: ["pieces", "boxes", "pallets"],
    },
    { category: "Weight", items: ["kg", "lbs", "tons"] },
    { category: "Length", items: ["meters", "feet"] },
    { category: "Volume", items: ["liters", "gallons"] },
  ];

  const durations = [
    { label: "1 Day", value: 1 },
    { label: "3 Days", value: 3 },
    { label: "5 Days", value: 5 },
    { label: "7 Days", value: 7 },
    { label: "10 Days", value: 10 },
    { label: "14 Days", value: 14 },
    { label: "21 Days", value: 21 },
    { label: "30 Days", value: 30 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      // Prepare data with proper null handling for empty fields
      const submitData = {
        ...formData,
        requiredByDate: formData.requiredByDate || undefined,
        budgetMin: formData.budgetMin || undefined,
        budgetMax: formData.budgetMax || undefined,
        preferredLocation: formData.preferredLocation || undefined,
      };

      const response = await rfqService.createRFQ(submitData);

      if (response.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          title: "",
          categoryId: "",
          industryId: "",
          quantity: 0,
          unit: "pieces" as RFQUnit,
          budgetMin: undefined,
          budgetMax: undefined,
          requiredByDate: "",
          detailedRequirements: "",
          preferredLocation: "",
          durationDays: 7,
        });

        // Show success message for 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(response.message || "Failed to create RFQ");
      }
    } catch (err: unknown) {
      setError(
        (err as Error).message || "An error occurred while creating the RFQ",
      );
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-gray-900 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-11 py-8 sm:py-10">
      {/* Added w-full so it doesn't shrink when flex column is applied */}
      <div className="w-full max-w-[750px] mx-auto">
        <h1 className="text-[16px] sm:text-[18px] md:text-[20px] font-semibold text-[#0d1b2a] mb-3 sm:mb-4 md:mb-4.5">
          Post New RFQ
        </h1>

        {/* Success Message */}
        {success && (
          <div className="mb-3 sm:mb-4 p-2 bg-green-50 border border-green-200 flex items-center gap-1.5 rounded-[6px]">
            <Check className="w-3 h-3 text-green-600 shrink-0" />
            <p className="text-[11px] sm:text-xs text-green-800">
              RFQ created successfully! Suppliers will start sending quotes
              soon.
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-3 sm:mb-4 p-2 bg-red-50 border border-red-200 flex items-center gap-1.5 rounded-[6px]">
            <AlertCircle className="w-3 h-3 text-red-600 shrink-0" />
            <p className="text-[11px] sm:text-xs text-red-800">{error}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[10px] sm:rounded-[11px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] p-[14px] sm:p-[17px]"
        >
          {/* Product Title */}
          <div className="mb-3 sm:mb-4 md:mb-4.5">
            <label className="block text-[12px] sm:text-[13px] font-medium text-[#0d1b2a] mb-[4px]">
              Product Title<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="eg., Industrial Electronic Components"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full h-[30px] sm:h-[32px] px-2 border border-[#bebebe] rounded-[6px] text-[9px] text-gray-900 placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe]"
              required
              disabled={loading}
            />
          </div>

          {/* Category */}
          <div className="mb-3 sm:mb-4 md:mb-4.5">
            <label className="block text-[12px] sm:text-[13px] font-medium text-[#0d1b2a] mb-[4px]">
              Category<span className="text-red-600">*</span>
            </label>
            <div className="relative" ref={categoryRef}>
              <button
                type="button"
                onClick={() => !loading && setIsCategoryOpen(!isCategoryOpen)}
                className="w-full h-[30px] sm:h-[32px] px-2 pr-8 border border-[#bebebe] rounded-[6px] text-[9px] text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] hover:border-[#8a8a8a] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-left"
                disabled={loading}
              >
                <span
                  className={
                    formData.categoryId ? "text-gray-900" : "text-[#9c9c9c]"
                  }
                >
                  {formData.categoryId
                    ? categories.find((c) => c.id === formData.categoryId)?.name
                    : "Select Category"}
                </span>
              </button>
              <motion.div
                animate={{ rotate: isCategoryOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
              >
                <ChevronDown className="w-3.5 h-3.5 text-[#666]" />
              </motion.div>
              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-50 w-full mt-1 bg-white border border-[#bebebe] rounded-[6px] shadow-lg max-h-[200px] overflow-y-auto"
                  >
                    {categories.map((cat) => (
                      <div
                        key={cat.id}
                        onClick={() => {
                          setFormData({ ...formData, categoryId: cat.id });
                          setIsCategoryOpen(false);
                        }}
                        className="px-2 py-2 text-[9px] text-gray-900 hover:bg-[#f0f9ff] hover:text-[#1e3a8a] cursor-pointer transition-colors"
                      >
                        {cat.name}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Industry */}
          <div className="mb-3 sm:mb-4 md:mb-4.5">
            <label className="block text-[12px] sm:text-[13px] font-medium text-[#0d1b2a] mb-[4px]">
              Industry<span className="text-red-600">*</span>
            </label>
            <div className="relative" ref={industryRef}>
              <button
                type="button"
                onClick={() => !loading && setIsIndustryOpen(!isIndustryOpen)}
                className="w-full h-[30px] sm:h-[32px] px-2 pr-8 border border-[#bebebe] rounded-[6px] text-[9px] text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] hover:border-[#8a8a8a] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-left"
                disabled={loading}
              >
                <span
                  className={
                    formData.industryId ? "text-gray-900" : "text-[#9c9c9c]"
                  }
                >
                  {formData.industryId
                    ? industries.find((i) => i.id === formData.industryId)?.name
                    : "Select industry"}
                </span>
              </button>
              <motion.div
                animate={{ rotate: isIndustryOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
              >
                <ChevronDown className="w-3.5 h-3.5 text-[#666]" />
              </motion.div>
              <AnimatePresence>
                {isIndustryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-50 w-full mt-1 bg-white border border-[#bebebe] rounded-[6px] shadow-lg max-h-[200px] overflow-y-auto"
                  >
                    {industries.map((ind) => (
                      <div
                        key={ind.id}
                        onClick={() => {
                          setFormData({ ...formData, industryId: ind.id });
                          setIsIndustryOpen(false);
                        }}
                        className="px-2 py-2 text-[9px] text-gray-900 hover:bg-[#f0f9ff] hover:text-[#1e3a8a] cursor-pointer transition-colors"
                      >
                        {ind.name}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Quantity and Unit */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-[22.5px] mb-3 sm:mb-4 md:mb-4.5">
            <div>
              <label className="block text-[12px] sm:text-[13px] font-medium text-[#0d1b2a] mb-[4px]">
                Quantity<span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                placeholder="eg., 500"
                value={formData.quantity || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: Number(e.target.value),
                  })
                }
                className="w-full h-[30px] sm:h-[32px] px-2 border border-[#bebebe] rounded-[6px] text-[9px] text-gray-900 placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe]"
                required
                min="1"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-[12px] sm:text-[13px] font-medium text-[#0d1b2a] mb-[4px]">
                Unit
              </label>
              <div className="relative" ref={unitRef}>
                <button
                  type="button"
                  onClick={() => !loading && setIsUnitOpen(!isUnitOpen)}
                  className="w-full h-[30px] sm:h-[32px] px-2 pr-8 border border-[#bebebe] rounded-[6px] text-[9px] text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] hover:border-[#8a8a8a] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-left"
                  disabled={loading}
                >
                  <span
                    className={
                      formData.unit ? "text-gray-900" : "text-[#9c9c9c]"
                    }
                  >
                    {formData.unit || "Select Unit"}
                  </span>
                </button>
                <motion.div
                  animate={{ rotate: isUnitOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <ChevronDown className="w-3.5 h-3.5 text-[#666]" />
                </motion.div>
                <AnimatePresence>
                  {isUnitOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-50 w-full mt-1 bg-white border border-[#bebebe] rounded-[6px] shadow-lg max-h-[200px] overflow-y-auto"
                    >
                      {units.map((group) => (
                        <div key={group.category}>
                          <div className="px-2 py-1.5 text-[8px] font-semibold text-[#0d1b2a] bg-gray-50">
                            {group.category}
                          </div>
                          {group.items.map((unit) => (
                            <div
                              key={unit}
                              onClick={() => {
                                setFormData({ ...formData, unit });
                                setIsUnitOpen(false);
                              }}
                              className="px-2 pl-4 py-2 text-[9px] text-gray-900 hover:bg-[#f0f9ff] hover:text-[#1e3a8a] cursor-pointer transition-colors"
                            >
                              {unit}
                            </div>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Budget Range */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-[22.5px] mb-3 sm:mb-4 md:mb-4.5">
            <div>
              <label className="block text-[12px] sm:text-[13px] font-medium text-[#0d1b2a] mb-[4px]">
                Min Budget
              </label>
              <input
                type="number"
                placeholder="eg., 20,000"
                value={formData.budgetMin || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({
                    ...formData,
                    budgetMin: value ? Number(value) : undefined,
                  });
                }}
                className="w-full h-[30px] sm:h-[32px] px-2 border border-[#bebebe] rounded-[6px] text-[9px] text-gray-900 placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe]"
                disabled={loading}
                min="0"
              />
            </div>
            <div>
              <label className="block text-[12px] sm:text-[13px] font-medium text-[#0d1b2a] mb-[4px]">
                Max Budget
              </label>
              <input
                type="number"
                placeholder="eg., 50,000"
                value={formData.budgetMax || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({
                    ...formData,
                    budgetMax: value ? Number(value) : undefined,
                  });
                }}
                className="w-full h-[30px] sm:h-[32px] px-2 border border-[#bebebe] rounded-[6px] text-[9px] text-gray-900 placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe]"
                disabled={loading}
                min="0"
              />
            </div>
          </div>

          {/* Required by Date */}
          <div className="mb-3 sm:mb-4 md:mb-4.5">
            <label className="block text-[12px] sm:text-[13px] font-medium text-[#0d1b2a] mb-[4px]">
              Required by Date
            </label>
            <input
              type="date"
              placeholder="dd-mm-yy"
              value={formData.requiredByDate || ""}
              onChange={(e) =>
                setFormData({ ...formData, requiredByDate: e.target.value })
              }
              className="w-full h-[30px] sm:h-[32px] px-2 border border-[#bebebe] rounded-[6px] text-[9px] text-gray-900 placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe]"
              disabled={loading}
            />
          </div>

          {/* Detailed Requirements */}
          <div className="mb-3 sm:mb-4 md:mb-4.5">
            <label className="block text-[12px] sm:text-[13px] font-medium text-[#0d1b2a] mb-[4px]">
              Detailed Requirements
            </label>
            <textarea
              placeholder="Describe your specific requirements, quality standards, certifications needed etc."
              value={formData.detailedRequirements || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  detailedRequirements: e.target.value,
                })
              }
              rows={3}
              className="w-full px-2 py-1.5 border border-[#bebebe] rounded-[6px] text-[9px] text-gray-900 placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe] resize-none"
              disabled={loading}
            />
          </div>

          {/* Preferred Location and RFQ Duration */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-[22.5px] mb-[20px] sm:mb-[24px] md:mb-[27px]">
            <div>
              <label className="block text-[12px] sm:text-[13px] font-medium text-[#0d1b2a] mb-[4px]">
                Preferred Location
              </label>
              <input
                type="text"
                placeholder="eg., Within 100 km of mumbai"
                value={formData.preferredLocation || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preferredLocation: e.target.value,
                  })
                }
                className="w-full h-[30px] sm:h-[32px] px-2 border border-[#bebebe] rounded-[6px] text-[9px] text-gray-900 placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe]"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-[12px] sm:text-[13px] font-medium text-[#0d1b2a] mb-[4px]">
                RFQ Duration<span className="text-red-600">*</span>
              </label>
              <div className="relative" ref={durationRef}>
                <button
                  type="button"
                  onClick={() => !loading && setIsDurationOpen(!isDurationOpen)}
                  className="w-full h-[30px] sm:h-[32px] px-2 pr-8 border border-[#bebebe] rounded-[6px] text-[9px] text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] hover:border-[#8a8a8a] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-left"
                  disabled={loading}
                >
                  <span className="text-gray-900">
                    {
                      durations.find((d) => d.value === formData.durationDays)
                        ?.label
                    }
                  </span>
                </button>
                <motion.div
                  animate={{ rotate: isDurationOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <ChevronDown className="w-3.5 h-3.5 text-[#666]" />
                </motion.div>
                <AnimatePresence>
                  {isDurationOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-50 w-full mt-1 bg-white border border-[#bebebe] rounded-[6px] shadow-lg max-h-[200px] overflow-y-auto"
                    >
                      {durations.map((duration) => (
                        <div
                          key={duration.value}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              durationDays: duration.value,
                            });
                            setIsDurationOpen(false);
                          }}
                          className="px-2 py-2 text-[9px] text-gray-900 hover:bg-[#f0f9ff] hover:text-[#1e3a8a] cursor-pointer transition-colors"
                        >
                          {duration.label}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-[191px] h-[40px] sm:h-[45px] bg-[#1e3a8a] text-white text-[13px] sm:text-[15px] font-semibold rounded-[10px] sm:rounded-[11px] hover:bg-[#1e3a8a]/90 transition-colors flex items-center justify-center gap-[9px] sm:gap-[11px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 sm:h-5 w-4 sm:w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Posting...
                </>
              ) : (
                <>
                  <Send className="w-4 sm:w-5 h-4 sm:h-5" />
                  Post RFQ
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
