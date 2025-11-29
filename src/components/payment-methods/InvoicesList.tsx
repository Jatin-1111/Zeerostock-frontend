"use client";

import { FileText, Download } from "lucide-react";

export default function InvoicesList() {
  const invoices = [
    {
      title: "Order #ORD-501 - Industrial Steel Pipes",
      invoice: "Invoice #TXN-001 • 2024-01-20",
      amount: "$15,000",
      status: "Completed",
      statusColor: "bg-green-500",
    },
    {
      title: "Order #ORD-501 - Industrial Steel Pipes",
      invoice: "Invoice #TXN-001 • 2024-01-20",
      amount: "$15,000",
      status: "Processing",
      statusColor: "bg-yellow-500",
    },
  ];

  return (
    <div className="bg-white border-2 border-gray-900">
      <div className="flex items-center justify-between p-6 border-b-2 border-gray-900">
        <h3 className="text-lg font-bold text-gray-900">Invoices</h3>
        <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors">
          <Download className="w-4 h-4" />
          Download All
        </button>
      </div>

      <div className="p-6 space-y-4">
        {invoices.map((invoice, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border-2 border-gray-900"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 bg-gray-100 border-2 border-gray-900 flex items-center justify-center">
                <FileText className="w-6 h-6 text-gray-900" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">
                  {invoice.title}
                </p>
                <p className="text-xs text-gray-600">{invoice.invoice}</p>
              </div>
              <div className="text-right mr-4">
                <p className="text-lg font-bold text-gray-900">
                  {invoice.amount}
                </p>
                <span
                  className={`${invoice.statusColor} text-white text-xs font-medium px-3 py-1 inline-block mt-1`}
                >
                  {invoice.status}
                </span>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
