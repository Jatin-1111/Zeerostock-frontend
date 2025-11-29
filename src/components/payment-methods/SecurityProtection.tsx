"use client";

import { Lock, Shield, CheckCircle, Eye } from "lucide-react";

export default function SecurityProtection() {
  const securityFeatures = [
    {
      icon: Lock,
      title: "256-bit SSL Encryption",
      description: "Bank-level security",
      color: "text-green-600",
    },
    {
      icon: Shield,
      title: "Escrow Protection",
      description: "Funds held securely",
      color: "text-green-600",
    },
    {
      icon: CheckCircle,
      title: "PCI DSS Compliant",
      description: "Industry standard",
      color: "text-green-600",
    },
    {
      icon: Eye,
      title: "Fraud Detection",
      description: "24/7 monitoring",
      color: "text-green-600",
    },
  ];

  return (
    <div className="bg-white border-2 border-gray-900">
      <div className="p-6 border-b-2 border-gray-900">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-gray-900" />
          <h3 className="text-lg font-bold text-gray-900">
            Security & Protection
          </h3>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-3 p-4 bg-blue-50 border-2 border-blue-600 mb-6">
          <Lock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-900">
            All payment information is encrypted and stored securely. Zeerostock
            uses industry-standard PCI DSS compliance to protect your financial
            data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 border-2 border-green-600 flex items-center justify-center shrink-0">
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">
                  {feature.title}
                </p>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
