"use client";

import { Upload } from "lucide-react";

export default function AdditionalVerifications() {
  return (
    <div className="bg-white border-2 border-gray-900 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-gray-900 rounded-full flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-gray-900">⊙</span>
          </div>
          <h2 className="text-lg font-bold text-gray-900">
            Additional Verifications (Optional)
          </h2>
        </div>
        <span className="bg-green-500 text-white text-xs font-medium px-3 py-1">
          Verified
        </span>
      </div>

      <div className="space-y-4">
        {/* ISO 9001 Certification */}
        <div className="p-4 border-2 border-gray-900">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 mb-1">
                ISO 9001 Certification
              </p>
              <p className="text-xs text-gray-600">
                Adds credibility to quality management
              </p>
            </div>
            <button className="ml-4 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium flex items-center gap-1.5 hover:bg-gray-800 transition-colors shrink-0">
              <Upload className="w-3.5 h-3.5" />
              Upload
            </button>
          </div>
        </div>

        {/* Industry-Specific Licenses */}
        <div className="p-4 border-2 border-gray-900">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 mb-1">
                Industry-Specific Licenses
              </p>
              <p className="text-xs text-gray-600">
                Relevant to your product categories
              </p>
            </div>
            <button className="ml-4 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium flex items-center gap-1.5 hover:bg-gray-800 transition-colors shrink-0">
              <Upload className="w-3.5 h-3.5" />
              Upload
            </button>
          </div>
        </div>

        {/* Third-Party Audit Reports */}
        <div className="p-4 border-2 border-gray-900">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 mb-1">
                Third-Party Audit Reports
              </p>
              <p className="text-xs text-gray-600">
                Strengthen buyer confidence
              </p>
            </div>
            <button className="ml-4 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium flex items-center gap-1.5 hover:bg-gray-800 transition-colors shrink-0">
              <Upload className="w-3.5 h-3.5" />
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
