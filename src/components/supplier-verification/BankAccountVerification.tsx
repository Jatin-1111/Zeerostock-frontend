"use client";

import { CheckCircle } from "lucide-react";

export default function BankAccountVerification() {
  return (
    <div className="bg-white border-2 border-gray-900 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-gray-900 rounded-full flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-gray-900">4</span>
          </div>
          <h2 className="text-lg font-bold text-gray-900">
            Bank Account Verification
          </h2>
        </div>
        <span className="bg-green-500 text-white text-xs font-medium px-3 py-1">
          Verified
        </span>
      </div>

      <div className="space-y-4">
        {/* Bank Name */}
        <div className="flex items-center justify-between p-4 border-2 border-gray-900">
          <div className="flex-1">
            <p className="text-xs text-orange-600 mb-1">Bank Name</p>
            <p className="text-sm font-bold text-gray-900">
              First National Bank
            </p>
          </div>
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
        </div>

        {/* Account Number */}
        <div className="flex items-center justify-between p-4 border-2 border-gray-900">
          <div className="flex-1">
            <p className="text-xs text-gray-600 mb-1">Account Number</p>
            <p className="text-sm font-bold text-gray-900">****7894</p>
          </div>
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
        </div>

        {/* Account Holder */}
        <div className="flex items-center justify-between p-4 border-2 border-gray-900">
          <div className="flex-1">
            <p className="text-xs text-gray-600 mb-1">Account Holder</p>
            <p className="text-sm font-bold text-gray-900">
              Sorohx Manufacturing LLC
            </p>
          </div>
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
        </div>
      </div>
    </div>
  );
}
