"use client";

import { TrendingUp, Globe, Zap, Shield } from "lucide-react";

export default function WhyChooseSection() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Maximize Revenue Recovery",
      description:
        "Convert surplus inventory into cash flow with our networks of verified buyers.",
    },
    {
      icon: Globe,
      title: "Global Market Access",
      description:
        "Reach buyers worldwide and expand your market beyond geographical limitations.",
    },
    {
      icon: Zap,
      title: "Fast Sales Cycles",
      description:
        "AI-powered matching connects you with interested buyers in minutes, not months.",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description:
        "Get paid safely with escrow protection and verified buyer credentials.",
    },
  ];

  return (
    <div className="bg-white p-14">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
        Why Leading Suppliers Choose Zeerostock
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Transform your surplus inventory challenges into revenue opportunities
        with our proven platform.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white p-6 text-center transition-shadow"
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <benefit.icon className="w-6 h-6 text-black" />
              </div>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
            <p className="text-sm text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
