"use client";

import { Send, AlertCircle, Check } from "lucide-react";
import { useState, useEffect } from "react";
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
      const response = await rfqService.createRFQ(formData);

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
        (err as Error).message || "An error occurred while creating the RFQ"
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
    <div className="min-h-screen px-15 py-6">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="text-[27px] font-semibold text-[#0d1b2a] mb-6">
          Post New RFQ
        </h1>

        {/* Success Message */}
        {success && (
          <div className="mb-5 p-3 bg-green-50 border border-green-200 flex items-center gap-2 rounded-[8px]">
            <Check className="w-4 h-4 text-green-600 shrink-0" />
            <p className="text-sm text-green-800">
              RFQ created successfully! Suppliers will start sending quotes
              soon.
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-5 p-3 bg-red-50 border border-red-200 flex items-center gap-2 rounded-[8px]">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[15px] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)] p-[23px]"
        >
          {/* Product Title */}
          <div className="mb-6">
            <label className="block text-[17px] font-medium text-[#0d1b2a] mb-[5px]">
              Product Title<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="eg., Industrial Electronic Components"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full h-[56px] px-4 border border-[#bebebe] rounded-[10px] text-[16px] text-gray-900 placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe]"
              required
              disabled={loading}
            />
          </div>

          {/* Category and Industry */}
          <div className="grid grid-cols-2 gap-[30px] mb-6">
            <div>
              <label className="block text-[17px] font-medium text-[#0d1b2a] mb-[5px]">
                Category<span className="text-red-600">*</span>
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                className="w-full h-[42px] px-3 border border-[#bebebe] rounded-[8px] text-[12px] text-gray-900 placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe] appearance-none bg-white"
                required
                disabled={loading}
              >
                <option value="" className="text-[#9c9c9c]">
                  Select Category
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[17px] font-medium text-[#0d1b2a] mb-[5px]">
                Industry<span className="text-red-600">*</span>
              </label>
              <select
                value={formData.industryId}
                onChange={(e) =>
                  setFormData({ ...formData, industryId: e.target.value })
                }
                className="w-full h-[42px] px-3 border border-[#bebebe] rounded-[8px] text-[12px] text-gray-900 placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe] appearance-none bg-white"
                required
                disabled={loading}
              >
                <option value="" className="text-[#9c9c9c]">
                  Select industry
                </option>
                {industries.map((ind) => (
                  <option key={ind.id} value={ind.id}>
                    {ind.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quantity and Unit */}
          <div className="grid grid-cols-2 gap-[30px] mb-6">
            <div>
              <label className="block text-[17px] font-medium text-[#0d1b2a] mb-[5px]">
                Quantity<span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                placeholder="eg., 500"
                value={formData.quantity || ""}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: Number(e.target.value) })
                }
                className="w-full h-[42px] px-3 border border-[#bebebe] rounded-[8px] text-[12px] text-gray-900 placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe]"
                required
                min="1"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-[17px] font-medium text-[#0d1b2a] mb-[5px]">
                Unit
              </label>
              <select
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value as RFQUnit })
                }
                className="w-full h-[42px] px-3 border border-[#bebebe] rounded-[8px] text-[12px] text-gray-900 placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe] appearance-none bg-white"
                required
                disabled={loading}
              >
                <option value="" className="text-[#9c9c9c]">
                  Select Unit
                </option>
                {units.map((group) => (
                  <optgroup key={group.category} label={group.category}>
                    {group.items.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          {/* Budget Range and Required by Date */}
          <div className="grid grid-cols-2 gap-[30px] mb-6">
            <div>
              <label className="block text-[17px] font-medium text-[#0d1b2a] mb-[5px]">
                Budget
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
                className="w-full h-[42px] px-3 border border-[#bebebe] rounded-[8px] text-[12px] text-gray-900 placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe]"
                disabled={loading}
                min="0"
              />
            </div>

            <div>
              <label className="block text-[17px] font-medium text-[#0d1b2a] mb-[5px]">
                Required by Date
              </label>
              <input
                type="date"
                placeholder="dd-mm-yy"
                value={formData.requiredByDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, requiredByDate: e.target.value })
                }
                className="w-full h-[42px] px-3 border border-[#bebebe] rounded-[8px] text-[12px] text-gray-900 placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe]"
                disabled={loading}
              />
            </div>
          </div>

          {/* Detailed Requirements */}
          <div className="mb-6">
            <label className="block text-[17px] font-medium text-[#0d1b2a] mb-[5px]">
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
              rows={4}
              className="w-full px-3 py-2 border border-[#bebebe] rounded-[8px] text-[12px] text-gray-900 placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe] resize-none"
              disabled={loading}
            />
          </div>

          {/* Preferred Location and RFQ Duration */}
          <div className="grid grid-cols-2 gap-[30px] mb-9">
            <div>
              <label className="block text-[17px] font-medium text-[#0d1b2a] mb-[5px]">
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
                className="w-full h-[42px] px-3 border border-[#bebebe] rounded-[8px] text-[12px] text-gray-900 placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe]"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-[17px] font-medium text-[#0d1b2a] mb-[5px]">
                RFQ Duration<span className="text-red-600">*</span>
              </label>
              <select
                value={formData.durationDays}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    durationDays: Number(e.target.value),
                  })
                }
                className="w-full h-[42px] px-3 border border-[#bebebe] rounded-[8px] text-[12px] text-gray-900 placeholder:text-[#9c9c9c] focus:outline-none focus:ring-1 focus:ring-[#bebebe] appearance-none bg-white"
                required
                disabled={loading}
              >
                {durations.map((duration) => (
                  <option key={duration.value} value={duration.value}>
                    {duration.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-[191px] h-[45px] bg-[#1e3a8a] text-white text-[15px] font-semibold rounded-[11px] hover:bg-[#1e3a8a]/90 transition-colors flex items-center justify-center gap-[11px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Posting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
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
