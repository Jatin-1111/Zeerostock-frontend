"use client";

import { CheckCircle } from "lucide-react";

export default function BusinessInformation() {
  return (
    <div className="bg-white border-2 border-gray-900 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-gray-900 rounded-full flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-gray-900">1</span>
          </div>
          <h2 className="text-lg font-bold text-gray-900">
            Business Information
          </h2>
        </div>
        <span className="bg-green-500 text-white text-xs font-medium px-3 py-1">
          Verified
        </span>
      </div>

      <div className="space-y-4">
        {/* Legal Business Name */}
        <div className="flex items-center justify-between p-4 border-2 border-gray-900">
          <div className="flex-1">
            <p className="text-xs text-gray-600 mb-1">Legal Business Name</p>
            <p className="text-sm font-bold text-gray-900">
              Sorohx Manufacturing LLC
            </p>
          </div>
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
        </div>

        {/* Business Registration Number */}
        <div className="flex items-center justify-between p-4 border-2 border-gray-900">
          <div className="flex-1">
            <p className="text-xs text-gray-600 mb-1">
              Business Registration Number
            </p>
            <p className="text-sm font-bold text-gray-900">BRN-123456789</p>
          </div>
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
        </div>

        {/* Tax ID (EIN) */}
        <div className="flex items-center justify-between p-4 border-2 border-gray-900">
          <div className="flex-1">
            <p className="text-xs text-gray-600 mb-1">Tax ID (EIN)</p>
            <p className="text-sm font-bold text-gray-900">XX-XXXXXXX83</p>
          </div>
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
        </div>

        {/* Business Type */}
        <div className="flex items-center justify-between p-4 border-2 border-gray-900">
          <div className="flex-1">
            <p className="text-xs text-gray-600 mb-1">Business Type</p>
            <p className="text-sm font-bold text-gray-900">
              Limited Liability Company
            </p>
          </div>
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
        </div>

        {/* Year Established */}
        <div className="flex items-center justify-between p-4 border-2 border-gray-900">
          <div className="flex-1">
            <p className="text-xs text-gray-600 mb-1">Year Established</p>
            <p className="text-sm font-bold text-gray-900">2015</p>
          </div>
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
        </div>
      </div>
    </div>
  );
}
