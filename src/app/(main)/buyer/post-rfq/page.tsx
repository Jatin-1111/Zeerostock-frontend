"use client";

import { Send } from "lucide-react";
import { useState } from "react";

export default function PostRFQPage() {
  const [formData, setFormData] = useState({
    productTitle: "",
    category: "",
    industry: "",
    quantity: "",
    unit: "",
    budgetRange: "",
    requiredByDate: "",
    detailedRequirements: "",
    preferredLocation: "",
    rfqDuration: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Post New RFQ</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-gray-900 rounded p-8"
        >
          {/* Product Title */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Product Title*
            </label>
            <input
              type="text"
              placeholder="e.g., Industrial Electronics Components"
              value={formData.productTitle}
              onChange={(e) =>
                setFormData({ ...formData, productTitle: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          {/* Category and Industry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Category*
                <span className="text-blue-600 text-xs ml-2">
                  Make dropdown
                </span>
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="automotive">Automotive</option>
                <option value="healthcare">Healthcare</option>
                <option value="textiles">Textiles</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Industry*
                <span className="text-blue-600 text-xs ml-2">
                  Make dropdown
                </span>
              </label>
              <select
                value={formData.industry}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              >
                <option value="">Select Industry</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="construction">Construction</option>
                <option value="retail">Retail</option>
                <option value="healthcare">Healthcare</option>
              </select>
            </div>
          </div>

          {/* Quantity and Unit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Quantity*
              </label>
              <input
                type="text"
                placeholder="e.g., 500"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Unit*
                <span className="text-blue-600 text-xs ml-2">
                  Make dropdown
                </span>
              </label>
              <select
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              >
                <option value="">Select unit</option>
                <option value="pieces">Pieces</option>
                <option value="kg">Kilograms</option>
                <option value="tons">Tons</option>
                <option value="liters">Liters</option>
              </select>
            </div>
          </div>

          {/* Budget Range and Required by Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Budget Range
              </label>
              <input
                type="text"
                placeholder="e.g., ₹20,000 - ₹50,000"
                value={formData.budgetRange}
                onChange={(e) =>
                  setFormData({ ...formData, budgetRange: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Required by Date
                <span className="text-blue-600 text-xs ml-2">
                  Make calendar selector
                </span>
              </label>
              <input
                type="text"
                placeholder="dd-mm-yyyy"
                value={formData.requiredByDate}
                onChange={(e) =>
                  setFormData({ ...formData, requiredByDate: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>

          {/* Detailed Requirements */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Detailed Requirements
            </label>
            <textarea
              placeholder="Describe your specific requirements, quality standards, certifications needed, etc."
              value={formData.detailedRequirements}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  detailedRequirements: e.target.value,
                })
              }
              rows={6}
              className="w-full px-4 py-2 border-2 border-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          {/* Preferred Location */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Preferred Location
            </label>
            <input
              type="text"
              placeholder="e.g., Within 100 KM of Mumbai"
              value={formData.preferredLocation}
              onChange={(e) =>
                setFormData({ ...formData, preferredLocation: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          {/* RFQ Duration */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-900 mb-2">
              RFQ Duration*
              <span className="text-blue-600 text-xs ml-2">Make dropdown</span>
            </label>
            <select
              value={formData.rfqDuration}
              onChange={(e) =>
                setFormData({ ...formData, rfqDuration: e.target.value })
              }
              className="w-full px-4 py-2 border-2 border-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            >
              <option value="">Select duration</option>
              <option value="3">3 days</option>
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Post RFQ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
