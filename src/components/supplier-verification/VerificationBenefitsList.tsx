"use client";

import { Shield, Eye, Award, CreditCard } from "lucide-react";

export default function VerificationBenefitsList() {
  const benefits = [
    {
      icon: Shield,
      title: "Trusted Badge",
      description: "Display verified supplier badge on all listings",
    },
    {
      icon: Eye,
      title: "Higher Visibility",
      description: "Verified suppliers appear higher in search results",
    },
    {
      icon: Award,
      title: "Increased Trust",
      description: "Win more inquiries from suppliers by 3.5x",
    },
    {
      icon: CreditCard,
      title: "Higher Limits",
      description: "Access to larger transaction limits",
    },
  ];

  return (
    <div className="bg-white border-2 border-gray-900 p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Verification Benefits
      </h3>

      <div className="space-y-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-3">
            <benefit.icon className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-gray-900">{benefit.title}</p>
              <p className="text-xs text-gray-600">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
