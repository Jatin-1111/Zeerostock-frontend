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

        if (categoriesRes.success && categoriesRes.data?.categories) {
          setCategories(categoriesRes.data.categories);
        }
        if (industriesRes.success && industriesRes.data?.industries) {
          setIndustries(industriesRes.data.industries);
        }
      } catch (err) {
        console.error("Failed to load dropdown data:", err);
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
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Post New RFQ</h1>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 flex items-center gap-3">
            <Check className="w-5 h-5 text-green-600 shrink-0" />
            <p className="text-sm text-green-800">
              RFQ created successfully! Suppliers will start sending quotes
              soon.
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-900 p-8"
        >
          {/* Product Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Product Title*
            </label>
            <input
              type="text"
              placeholder="e.g., Industrial Electronics Components"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-900 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900"
              required
              disabled={loading}
            />
          </div>

          {/* Category and Industry */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Category*
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-900 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                required
                disabled={loading}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Industry*
              </label>
              <select
                value={formData.industryId}
                onChange={(e) =>
                  setFormData({ ...formData, industryId: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-900 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                required
                disabled={loading}
              >
                <option value="">Select Industry</option>
                {industries.map((ind) => (
                  <option key={ind.id} value={ind.id}>
                    {ind.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quantity and Unit */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Quantity*
              </label>
              <input
                type="number"
                placeholder="e.g., 500"
                value={formData.quantity || ""}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-900 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900"
                required
                min="1"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Unit*
              </label>
              <select
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value as RFQUnit })
                }
                className="w-full px-3 py-2 border border-gray-900 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                required
                disabled={loading}
              >
                <option value="">Select Unit</option>
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
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Budget Min (₹)
              </label>
              <input
                type="number"
                placeholder="e.g., 20000"
                value={formData.budgetMin || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    budgetMin: Number(e.target.value) || undefined,
                  })
                }
                className="w-full px-3 py-2 border border-gray-900 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900"
                min="0"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Budget Max (₹)
              </label>
              <input
                type="number"
                placeholder="e.g., 50000"
                value={formData.budgetMax || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    budgetMax: Number(e.target.value) || undefined,
                  })
                }
                className="w-full px-3 py-2 border border-gray-900 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900"
                min="0"
                disabled={loading}
              />
            </div>
          </div>

          {/* Required by Date */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Required by Date
            </label>
            <input
              type="date"
              value={formData.requiredByDate || ""}
              onChange={(e) =>
                setFormData({ ...formData, requiredByDate: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-900 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              disabled={loading}
            />
          </div>

          {/* Detailed Requirements */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Detailed Requirements
            </label>
            <textarea
              placeholder="Describe your specific requirements, quality standards, certifications needed, etc."
              value={formData.detailedRequirements || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  detailedRequirements: e.target.value,
                })
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-900 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 resize-none"
              disabled={loading}
            />
          </div>

          {/* Preferred Location */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Preferred Location
            </label>
            <input
              type="text"
              placeholder="e.g., Within 100 KM of Mumbai"
              value={formData.preferredLocation || ""}
              onChange={(e) =>
                setFormData({ ...formData, preferredLocation: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-900 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900"
              disabled={loading}
            />
          </div>

          {/* RFQ Duration */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              RFQ Duration*
            </label>
            <select
              value={formData.durationDays}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  durationDays: Number(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-gray-900 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
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

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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


