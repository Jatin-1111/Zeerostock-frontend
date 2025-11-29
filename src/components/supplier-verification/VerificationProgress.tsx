"use client";

import { AlertCircle } from "lucide-react";

export default function VerificationProgress() {
  return (
    <div className="bg-white border-2 border-gray-900 mb-6">
      {/* Progress Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-lg font-bold text-gray-900">
              Verification Progress
            </h2>
            <span className="bg-yellow-100 border border-yellow-600 text-yellow-800 text-xs font-medium px-2 py-0.5">
              In Progress
            </span>
          </div>
          <p className="text-xs text-gray-600">
            80% Complete • 4 of 6 sections verified
          </p>
        </div>
        <span className="text-3xl font-bold text-gray-900">80%</span>
      </div>

      {/* Progress Bar */}
      <div className="px-6 pb-6">
        <div className="w-full bg-gray-200 h-3 border-2 border-gray-900">
          <div className="bg-gray-900 h-full" style={{ width: "80%" }}></div>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-600">Overall Progress</span>
        </div>
      </div>

      {/* Warning Message */}
      <div className="bg-yellow-50 border-t-2 border-yellow-600 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-900">
            You have pending verification items. Complete all sections to become
            a verified supplier and unlock premium benefits.
          </p>
        </div>
      </div>
    </div>
  );
}
