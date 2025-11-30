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

  const categories = [
    "Machinery & Equipment",
    "Electrical Components",
    "Electronics & IT Hardware",
    "Tools & Spares",
    "Industrial Supplies",
    "Chemicals & Raw Materials",
    "Packaging Material",
    "Material",
    "Automotive Parts",
    "Metals & Alloys",
    "Plastics & Polymers",
    "Textile & Fabrics",
    "Office Supplies",
    "Furniture & Fixtures",
    "Safety & PPE",
    "Consumer Goods",
    "HVAC & Refrigeration",
    "Solar & Renewable Equipment",
    "Medical & Lab Equipment",
    "Agriculture & Irrigation",
  ];

  const industries = [
    "Manufacturing",
    "Automotive",
    "Construction",
    "Electronics",
    "Electrical",
    "Chemical Processing",
    "Packaging",
    "FMCG",
    "Pharmaceutical",
    "Food & Beverage",
    "Retail & E-commerce",
    "Logistics & Warehousing",
    "Textile & Apparel",
    "Agriculture",
    "Mining & Metals",
    "Oil & Gas",
    "Renewable Energy",
    "Aerospace & Defence",
    "IT & Hardware",
    "Hospitality",
    "Healthcare",
    "Printing & Paper",
    "Plastics & Polymers",
    "Heavy Engineering",
  ];

  const units = [
    {
      category: "General Units",
      items: ["Piece", "Unit", "Set", "Box", "Packet", "Roll", "Lot"],
    },
    { category: "Weight", items: ["Kilogram (kg)", "Metric Ton (MT)"] },
    { category: "Length", items: ["Meter (m)"] },
    { category: "Volume", items: ["Liter (L)"] },
    { category: "Area", items: ["Square Meter (sq.m)"] },
  ];

  const durations = [
    "1 Day",
    "3 Days",
    "5 Days",
    "7 Days",
    "10 Days",
    "14 Days",
    "21 Days",
    "30 Days",
    "Custom Duration (Optional)",
  ];

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
              value={formData.productTitle}
              onChange={(e) =>
                setFormData({ ...formData, productTitle: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-900 text-sm text-gray-900 placeholder:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              required
            />
          </div>

          {/* Category and Industry */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Category*
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-900 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Industry*
              </label>
              <select
                value={formData.industry}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-900 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                required
              >
                <option value="">Select Industry</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
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
                type="text"
                placeholder="e.g., 500"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-900 text-sm text-gray-900 placeholder:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Unit*
              </label>
              <select
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-900 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                required
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
                Budget Range
              </label>
              <input
                type="text"
                placeholder="e.g., ₹20,000 - ₹50,000"
                value={formData.budgetRange}
                onChange={(e) =>
                  setFormData({ ...formData, budgetRange: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-900 text-sm text-gray-900 placeholder:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Required by Date
              </label>
              <input
                type="text"
                placeholder="dd-mm-yyyy"
                value={formData.requiredByDate}
                onChange={(e) =>
                  setFormData({ ...formData, requiredByDate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-900 text-sm text-gray-900 placeholder:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
          </div>

          {/* Detailed Requirements */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
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
              rows={4}
              className="w-full px-3 py-2 border border-gray-900 text-sm text-gray-900 placeholder:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 resize-none"
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
              value={formData.preferredLocation}
              onChange={(e) =>
                setFormData({ ...formData, preferredLocation: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-900 text-sm text-gray-900 placeholder:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>

          {/* RFQ Duration */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              RFQ Duration*
            </label>
            <select
              value={formData.rfqDuration}
              onChange={(e) =>
                setFormData({ ...formData, rfqDuration: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-900 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              required
            >
              <option value="">Select Duration</option>
              {durations.map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
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
