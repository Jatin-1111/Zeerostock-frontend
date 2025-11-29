"use client";

import { Download, MoreVertical } from "lucide-react";

export default function SupplierQuotes() {
  const quotes = [
    {
      id: "Q-001",
      rfq: "RFQ-2024-001",
      buyer: "SteelCorp Ind",
      item: "Industrial Steel Pipe",
      quotedPrice: 15000,
      status: "shipped",
      submitted: "2024-01-10",
      validUntil: "2024-01-10",
    },
    {
      id: "Q-002",
      rfq: "RFQ-2024-002",
      buyer: "SteelCorp Ind",
      item: "Industrial Steel Pipe",
      quotedPrice: 15000,
      status: "shipped",
      submitted: "2024-01-10",
      validUntil: "2024-01-10",
    },
    {
      id: "Q-003",
      rfq: "RFQ-2024-003",
      buyer: "SteelCorp Ind",
      item: "Industrial Steel Pipe",
      quotedPrice: 15000,
      status: "shipped",
      submitted: "2024-01-10",
      validUntil: "2024-01-10",
    },
    {
      id: "Q-004",
      rfq: "RFQ-2024-004",
      buyer: "SteelCorp Ind",
      item: "Industrial Steel Pipe",
      quotedPrice: 15000,
      status: "shipped",
      submitted: "2024-01-10",
      validUntil: "2024-01-10",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      shipped: "bg-green-100 text-green-800 border-green-300",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      accepted: "bg-blue-100 text-blue-800 border-blue-300",
      rejected: "bg-red-100 text-red-800 border-red-300",
    };
    return (
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Quotes</h1>
            <p className="text-sm text-gray-600">
              Track and manage your submitted quotes
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Add more columns if required by functional or
            </p>
          </div>
          <button className="px-6 py-3 bg-gray-900 text-white text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors">
            <Download className="w-4 h-4" />
            Export Quotes
          </button>
        </div>

        {/* Table */}
        <div className="border-2 border-gray-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Quote ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    RFQ
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Buyer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Quoted Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Valid Until
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y-2 divide-gray-900">
                {quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {quote.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      {quote.rfq}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {quote.buyer}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {quote.item}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      ₹{quote.quotedPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-medium border ${getStatusBadge(
                          quote.status
                        )}`}
                      >
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {quote.submitted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {quote.validUntil}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="p-2 hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
