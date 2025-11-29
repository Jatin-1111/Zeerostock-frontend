"use client";

import { CreditCard, Building2, Edit, Trash2, Plus } from "lucide-react";

export default function SavedPaymentMethods() {
  const paymentMethods = [
    {
      type: "card",
      icon: CreditCard,
      name: "Visa",
      number: "•••• 4242",
      details: "Expires: 12/2025 • John Smith",
    },
    {
      type: "card",
      icon: CreditCard,
      name: "Mastercard",
      number: "•••• 8888",
      details: "Expires: 07/2026 • ABC Manufacturing",
    },
    {
      type: "bank",
      icon: Building2,
      name: "Chase Bank",
      number: "•••• 6781",
      details: "Business Checking • ABC Manufacturing Corp",
    },
  ];

  return (
    <div className="bg-white border-2 border-gray-900 mb-6">
      <div className="flex items-center justify-between p-6 border-b-2 border-gray-900">
        <h3 className="text-lg font-bold text-gray-900">
          Saved Payment Methods
        </h3>
        <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors">
          <Plus className="w-4 h-4" />
          Add Payment Method
        </button>
      </div>

      <div className="p-6 space-y-4">
        {paymentMethods.map((method, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border-2 border-gray-900"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 border-2 border-gray-900 flex items-center justify-center">
                <method.icon className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">
                  {method.name} {method.number}
                </p>
                <p className="text-xs text-gray-600">{method.details}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 border-2 border-gray-900 hover:bg-gray-100 transition-colors">
                <Edit className="w-4 h-4 text-gray-900" />
              </button>
              <button className="p-2 border-2 border-gray-900 hover:bg-gray-100 transition-colors">
                <Trash2 className="w-4 h-4 text-gray-900" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
