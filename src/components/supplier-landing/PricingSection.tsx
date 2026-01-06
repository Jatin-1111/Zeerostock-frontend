"use client";

import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingSection() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      subtitle: "List for free",
      features: [
        "Up to 10 listings",
        "Basic analytics",
        "Email support",
        "Standard listing visibility",
      ],
      cta: "Start Free",
      highlighted: false,
    },
    {
      name: "Professional",
      price: "₹19,999 / Year",
      subtitle: "Suitable for businesses",
      badge: "Most Popular",
      features: [
        "Unlimited listings",
        "AI-powered promotion",
        "Advanced analytics",
        "Priority support",
        "Escrow protection",
      ],
      cta: "Start Selling",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      subtitle: "Volume pricing available",
      features: [
        "White-label solutions",
        "Dedicated account manager",
        "API integration",
        "24/7 phone support",
        "Custom reporting",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <div className="bg-white p-14">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
        Success-Based Pricing
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Only pay when you make successful sales
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white border-2 border-gray-900 p-6 relative"
          >
            {/* Most Popular Badge */}
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gray-900 text-white text-xs font-medium px-3 py-1">
                  {plan.badge}
                </span>
              </div>
            )}

            {/* Plan Name */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {plan.name}
              </h3>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {plan.price}
              </div>
              <p className="text-sm text-gray-600">{plan.subtitle}</p>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-gray-900 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-900">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Link
              href={
                plan.name === "Basic"
                  ? "/signup"
                  : plan.name === "Enterprise"
                  ? "/helpdesk"
                  : "/become-supplier"
              }
              className="w-full py-2 bg-white border-2 border-gray-900 text-gray-900 font-medium hover:bg-gray-50 transition-colors inline-block text-center"
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
