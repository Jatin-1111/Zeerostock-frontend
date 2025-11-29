"use client";

import { Star, Check, MessageCircle, ThumbsUp, Download } from "lucide-react";

export default function SupplierRFQ() {
  const rfqs = [
    {
      title: "Electronics Components",
      supplier: "TechSource Industries",
      rating: 4.8,
      location: "Mumbai, China",
      quotePrice: "₹50,000",
      originalPrice: "₹100,000",
      delivery: "5-7 days",
      validUntil: "2024-01-",
      rfqId: "RFQ-001",
      status: "pending",
    },
    {
      title: "Electronics Components",
      supplier: "TechSource Industries",
      rating: 4.8,
      location: "Mumbai, China",
      quotePrice: "₹50,000",
      originalPrice: "₹100,000",
      delivery: "5-7 days",
      validUntil: "2024-01-",
      rfqId: "RFQ-001",
      status: "pending",
    },
    {
      title: "Electronics Components",
      supplier: "TechSource Industries",
      rating: 4.8,
      location: "Mumbai, China",
      quotePrice: "₹50,000",
      originalPrice: "₹100,000",
      delivery: "5-7 days",
      validUntil: "2024-01-",
      rfqId: "RFQ-001",
      status: "pending",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-medium text-gray-900">
            RFQ Opportunities
          </h1>
        </div>

        {/* RFQ Cards */}
        <div className="space-y-4">
          {rfqs.map((rfq, index) => (
            <div key={index} className="border border-gray-300 p-6">
              {/* Header Row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-base font-medium text-gray-900 mb-1">
                    {rfq.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>
                      Supplier:{" "}
                      <span className="text-red-600">{rfq.supplier}</span>
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-gray-900 fill-gray-900" />
                      <span className="text-gray-900">{rfq.rating}</span>
                    </div>
                    <span>{rfq.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium border border-yellow-300">
                    {rfq.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    show all types of status
                  </p>
                </div>
              </div>

              {/* Details Row */}
              <div className="grid grid-cols-4 gap-6 mb-6">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Quote Price</p>
                  <p className="text-base font-semibold text-gray-900">
                    {rfq.quotePrice}
                  </p>
                  <p className="text-xs text-gray-400 line-through">
                    {rfq.originalPrice}
                  </p>
                  <p className="text-xs text-green-600 font-medium">Save 25%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Delivery</p>
                  <p className="text-base font-semibold text-gray-900">
                    {rfq.delivery}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Valid Until</p>
                  <p className="text-base font-semibold text-gray-900">
                    {rfq.validUntil}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">RFQ ID</p>
                  <p className="text-base font-semibold text-gray-900">
                    {rfq.rfqId}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Accept Quote
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-900 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Help Desk
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-900 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  Decline
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-900 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
