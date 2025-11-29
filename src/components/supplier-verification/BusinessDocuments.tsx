"use client";

import { CheckCircle, Upload } from "lucide-react";

export default function BusinessDocuments() {
  return (
    <div className="bg-white border-2 border-gray-900 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-gray-900 rounded-full flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-gray-900">3</span>
          </div>
          <h2 className="text-lg font-bold text-gray-900">
            Business Documents
          </h2>
        </div>
        <span className="bg-yellow-500 text-white text-xs font-medium px-3 py-1">
          Pending
        </span>
      </div>

      <div className="space-y-4">
        {/* Business License */}
        <div className="border-2 border-gray-900 p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 mb-1">
                Business License
              </p>
              <p className="text-xs text-orange-600">Uploaded: 2024-01-10</p>
            </div>
            <span className="bg-green-500 text-white text-xs font-medium px-3 py-1">
              Verified
            </span>
          </div>
        </div>

        {/* Certificate of Incorporation */}
        <div className="border-2 border-gray-900 p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 mb-1">
                Certificate of Incorporation
              </p>
              <p className="text-xs text-orange-600">Uploaded: 2024-01-10</p>
            </div>
            <span className="bg-green-500 text-white text-xs font-medium px-3 py-1">
              Verified
            </span>
          </div>
        </div>

        {/* Tax Registration Certificate */}
        <div className="border-2 border-gray-900 p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 mb-1">
                Tax Registration Certificate
              </p>
              <p className="text-xs text-orange-600">Uploaded: 2024-01-15</p>
            </div>
            <span className="bg-yellow-500 text-white text-xs font-medium px-3 py-1">
              Pending
            </span>
          </div>
        </div>

        {/* Industry Certifications */}
        <div className="border-2 border-gray-900 p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 mb-1">
                Industry Certifications
              </p>
              <p className="text-xs text-gray-900">Limited Liability Company</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-gray-200 text-gray-900 text-xs font-medium px-3 py-1">
                Optional
              </span>
              <button className="bg-gray-900 text-white text-xs font-medium px-3 py-1 flex items-center gap-1 hover:bg-gray-800 transition-colors">
                <Upload className="w-3 h-3" />
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
