"use client";

import { BadgeCheck, Eye, Shield, TrendingUp } from "lucide-react";

export default function VerificationBenefitsSidebar() {
  return (
    <div className="border-2 border-gray-900 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Verification Benefits
      </h3>

      <div className="space-y-6">
        {/* Trusted Badge */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
            <BadgeCheck className="w-5 h-5 text-gray-900" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">Trusted Badge</h4>
            <p className="text-xs text-gray-600">
              Get a verified badge on all listings
            </p>
          </div>
        </div>

        {/* Higher Visibility */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
            <Eye className="w-5 h-5 text-gray-900" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">Higher Visibility</h4>
            <p className="text-xs text-gray-600">
              Featured placement in buyer searches
            </p>
          </div>
        </div>

        {/* Increased Trust */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-gray-900" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">Increased Trust</h4>
            <p className="text-xs text-gray-600">
              Buyers prefer verified suppliers by 3x
            </p>
          </div>
        </div>

        {/* Higher Limits */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-gray-900" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">Higher Limits</h4>
            <p className="text-xs text-gray-600">
              Unlock higher transaction limits
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
