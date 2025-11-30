"use client";

import {
  CheckCircle,
  MessageCircle,
  XCircle,
  Download,
  MapPin,
  Star,
} from "lucide-react";

export default function MyQuotesPage() {
  const quotes = [
    {
      id: 1,
      title: "Electronics Components",
      supplier: "TechSource Industries",
      rating: 4.8,
      location: "Shenzen, China",
      quotePrice: "₹50,000",
      originalPrice: "₹50,000",
      savings: "Save 20%",
      delivery: "5-7 days",
      validUntil: "2024-01-",
      rfqId: "RFQ-001",
      status: "pending",
    },
    {
      id: 2,
      title: "Electronics Components",
      supplier: "TechSource Industries",
      rating: 4.8,
      location: "Shenzen, China",
      quotePrice: "₹50,000",
      originalPrice: "₹50,000",
      savings: "Save 20%",
      delivery: "5-7 days",
      validUntil: "2024-01-",
      rfqId: "RFQ-001",
      status: "pending",
    },
    {
      id: 3,
      title: "Electronics Components",
      supplier: "TechSource Industries",
      rating: 4.8,
      location: "Shenzen, China",
      quotePrice: "₹50,000",
      originalPrice: "₹50,000",
      savings: "Save 20%",
      delivery: "5-7 days",
      validUntil: "2024-01-",
      rfqId: "RFQ-001",
      status: "pending",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Quotes</h1>

        <div className="space-y-6">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-white border-2 border-gray-900 rounded p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-xl font-bold text-gray-900">
                      {quote.title}
                    </h2>
                    <span className="text-sm text-gray-900">
                      {quote.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm text-gray-600">
                      Supplier: {quote.supplier}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gray-900 fill-gray-900" />
                      <span className="text-sm font-medium text-gray-900">
                        {quote.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">
                        {quote.location}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-6">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Quote Price</p>
                      <p className="text-lg font-bold text-gray-900">
                        {quote.quotePrice}
                      </p>
                      <p className="text-xs text-gray-400 line-through">
                        {quote.originalPrice}
                      </p>
                      <p className="text-xs text-red-600 font-medium">
                        {quote.savings}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 mb-1">Delivery</p>
                      <p className="text-sm font-medium text-gray-900">
                        {quote.delivery}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 mb-1">Valid Until</p>
                      <p className="text-sm font-medium text-gray-900">
                        {quote.validUntil}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 mb-1">RFQ ID</p>
                      <p className="text-sm font-medium text-gray-900">
                        {quote.rfqId}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-6 py-2 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Accept Quote
                </button>
                <button className="px-6 py-2 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Help Desk
                </button>
                <button className="px-6 py-2 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Decline
                </button>
                <button className="px-6 py-2 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
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
