"use client";

import { CheckCircle } from "lucide-react";

export default function OperationalInformation() {
  return (
    <div className="bg-white border-2 border-gray-900 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-gray-900 rounded-full flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-gray-900">5</span>
          </div>
          <h2 className="text-lg font-bold text-gray-900">
            Operational Information
          </h2>
        </div>
        <span className="bg-green-500 text-white text-xs font-medium px-3 py-1">
          Verified
        </span>
      </div>

      <div className="space-y-4">
        {/* Primary Business Address */}
        <div className="flex items-center justify-between p-4 border-2 border-gray-900">
          <div className="flex-1">
            <p className="text-xs text-orange-600 mb-1">
              Primary Business Address
            </p>
            <p className="text-sm font-bold text-gray-900">
              1234 Industrial Pkwy, Houston, TX 77002
            </p>
          </div>
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
        </div>

        {/* Warehouse Locations */}
        <div className="flex items-center justify-between p-4 border-2 border-gray-900">
          <div className="flex-1">
            <p className="text-xs text-orange-600 mb-1">Warehouse Locations</p>
            <p className="text-sm font-bold text-gray-900">
              2 verified locations
            </p>
          </div>
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
        </div>

        {/* Business Phone */}
        <div className="flex items-center justify-between p-4 border-2 border-gray-900">
          <div className="flex-1">
            <p className="text-xs text-orange-600 mb-1">Business Phone</p>
            <p className="text-sm font-bold text-gray-900">+1 (555) 123-4567</p>
          </div>
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
        </div>

        {/* Business Email */}
        <div className="flex items-center justify-between p-4 border-2 border-gray-900">
          <div className="flex-1">
            <p className="text-xs text-orange-600 mb-1">Business Email</p>
            <p className="text-sm font-bold text-gray-900">
              contact@sorahamfg.com
            </p>
          </div>
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
        </div>
      </div>
    </div>
  );
}
