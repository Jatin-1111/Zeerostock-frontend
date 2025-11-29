"use client";

import { Upload } from "lucide-react";

export default function SupplierInventory() {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-medium text-gray-900">My Inventory</h1>
        </div>

        {/* Form Container */}
        <div className="border border-gray-300 p-8">
          <div className="grid grid-cols-1 gap-6">
            {/* Row 1: Product Title and Listing Type */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Product Title*
                </label>
                <input
                  type="text"
                  placeholder="Ex: Industrial Steel Pipes - Grade A36"
                  className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                />
                <p className="text-xs text-gray-400 mt-1">Make dropdown</p>
              </div>
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Listing Type*
                </label>
                <input
                  type="text"
                  placeholder="Please listing type"
                  className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                />
                <p className="text-xs text-gray-400 mt-1">Make dropdown</p>
              </div>
            </div>

            {/* Row 2: Category, Condition, and Location */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Category*
                </label>
                <input
                  type="text"
                  placeholder="Select category"
                  className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                />
                <p className="text-xs text-gray-400 mt-1">Make dropdown</p>
              </div>
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Condition*
                </label>
                <input
                  type="text"
                  placeholder="Select condition"
                  className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                />
                <p className="text-xs text-gray-400 mt-1">Make dropdown</p>
              </div>
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Location*
                </label>
                <input
                  type="text"
                  placeholder="Ex: Mumbai, Maharashtra"
                  className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                />
              </div>
            </div>

            {/* Row 3: Quantity, Units, and Price */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Quantity*
                </label>
                <input
                  type="text"
                  placeholder="Enter qty"
                  className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                />
                <p className="text-xs text-gray-400 mt-1">Make int</p>
              </div>
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Units*
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                />
                <p className="text-xs text-gray-400 mt-1">Make int</p>
              </div>
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Price*
                </label>
                <input
                  type="text"
                  placeholder="Enter price per unit"
                  className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Setting the buying price will be hidden from the buyer. Type
                  in ₹ Symbol.
                </p>
              </div>
            </div>

            {/* Row 4: Product Description and Product Images */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Product Description*
                </label>
                <textarea
                  rows={8}
                  placeholder="Detailed description of the product, specifications, material, quality etc"
                  className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Product Images*
                </label>
                <div className="border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center h-[calc(100%-2rem)]">
                  <Upload className="w-12 h-12 text-gray-300 mb-3" />
                  <p className="text-sm text-gray-600 mb-1">
                    Drag & drop images here, or click to select!
                  </p>
                  <button
                    type="button"
                    className="mt-3 px-4 py-2 bg-white border border-gray-900 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    Choose Files
                  </button>
                </div>
              </div>
            </div>

            {/* Row 5: Listing Duration */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-normal text-gray-900 mb-2">
                  Listing Duration*
                </label>
                <input
                  type="text"
                  placeholder="Select duration"
                  className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Make dropdown if possible something, or it blank
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="button"
                className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <span className="text-lg">+</span>
                List Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
