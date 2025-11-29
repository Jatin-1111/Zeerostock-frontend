"use client";

import {
  Globe,
  Phone,
  Star,
  Calendar,
  MessageSquare,
  Plus,
  X,
} from "lucide-react";
import { useState } from "react";

export default function CompanyInformation() {
  const [categories, setCategories] = useState([
    "Materials",
    "Electronics",
    "Healthcare",
  ]);

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Company Information
          </h1>
          <p className="text-sm text-gray-600">
            Manage your company profile and business details
          </p>
        </div>

        {/* Form */}
        <div className="max-w-4xl">
          <div className="space-y-6 mb-8">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Company Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                defaultValue="Sarah's Manufacturing Ltd"
                className="w-full px-4 py-3 border-2 border-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 text-black"
              />
            </div>

            {/* Company Description */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Company Description <span className="text-red-600">*</span>
              </label>
              <textarea
                rows={6}
                defaultValue="Leading manufacturer of industrial components with 20+ years of experience in delivering high-quality products to global markets. We specialize in precision engineering and maintain strict quality control standards."
                className="w-full px-4 py-3 border-2 border-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none text-black"
              />
            </div>

            {/* Business Type */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Business Type <span className="text-red-600">*</span>
              </label>
              <select className="w-full px-4 py-3 border-2 border-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 text-black">
                <option>Manufacturer</option>
                <option>Manufacturer / OEM</option>
                <option>Distributor / Stockist</option>
                <option>Trader / Dealer</option>
                <option>Wholesaler</option>
                <option>Retailer</option>
                <option>Exporter</option>
                <option>Importer</option>
                <option>Fabricator</option>
                <option>Service Provider / Contractor</option>
                <option>Maintenance or Repair Company</option>
                <option>Industrial Consultant / Agent</option>
                <option>Warehouse or Logistic Partner</option>
                <option>Recycling or Waste Company</option>
                <option>MSME / Small Enterprise</option>
              </select>
            </div>

            {/* Primary Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Primary Categories <span className="text-red-600">*</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-gray-100 border-2 border-gray-900 flex items-center gap-2"
                  >
                    <span className="text-sm font-medium text-gray-900">
                      {category}
                    </span>
                    <button
                      onClick={() =>
                        setCategories(categories.filter((_, i) => i !== index))
                      }
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button className="px-4 py-2 bg-white border-2 border-gray-900 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Website
              </label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                <input
                  type="url"
                  defaultValue="https://sarahsmanufacturing.com"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 text-black"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Phone <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                <input
                  type="tel"
                  defaultValue="+91 (555) 123-4567"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 text-black"
                />
              </div>
            </div>
          </div>

          {/* Business Metrics */}
          <div className="bg-white border-2 border-gray-900 p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Business Metrics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Supplier Rating */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  <p className="text-3xl font-bold text-gray-900">4.8</p>
                </div>
                <p className="text-sm text-gray-600">Supplier Rating</p>
              </div>

              {/* Response Rate */}
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600 mb-2">98%</p>
                <p className="text-sm text-gray-600">Response Rate</p>
              </div>

              {/* Total Reviews */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MessageSquare className="w-6 h-6 text-gray-600" />
                  <p className="text-3xl font-bold text-gray-900">156</p>
                </div>
                <p className="text-sm text-gray-600">Total Reviews</p>
              </div>

              {/* Member Since */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calendar className="w-6 h-6 text-gray-600" />
                  <p className="text-3xl font-bold text-gray-900">2019</p>
                </div>
                <p className="text-sm text-gray-600">Member Since</p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <button className="px-12 py-3 bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors">
              Save Changes
            </button>
            <button className="px-12 py-3 bg-white border-2 border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
