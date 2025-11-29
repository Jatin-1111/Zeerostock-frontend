"use client";

import { Eye, Download } from "lucide-react";

export default function TransactionHistoryTable() {
  const transactions = [
    {
      date: "2024-01-10",
      type: "Payment",
      description: "Industrial Steel Pipes",
      amount: "15,000",
      status: "Completed",
      statusColor: "bg-green-500",
    },
    {
      date: "2024-01-10",
      type: "Refund",
      description: "Industrial Steel Pipes",
      amount: "15,000",
      status: "Completed",
      statusColor: "bg-green-500",
    },
    {
      date: "2024-01-10",
      type: "Payout",
      description: "Industrial Steel Pipes",
      amount: "15,000",
      status: "Processing",
      statusColor: "bg-yellow-500",
    },
    {
      date: "2024-01-10",
      type: "Payment",
      description: "Industrial Steel Pipes",
      amount: "15,000",
      status: "Completed",
      statusColor: "bg-green-500",
    },
  ];

  return (
    <div className="bg-white border-2 border-gray-900">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-900">
              <th className="text-left p-4 text-sm font-bold text-gray-900">
                Date
              </th>
              <th className="text-left p-4 text-sm font-bold text-gray-900">
                Type
              </th>
              <th className="text-left p-4 text-sm font-bold text-gray-900">
                Description
              </th>
              <th className="text-left p-4 text-sm font-bold text-gray-900">
                Amount
              </th>
              <th className="text-left p-4 text-sm font-bold text-gray-900">
                Status
              </th>
              <th className="text-left p-4 text-sm font-bold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-b-2 border-gray-900">
                <td className="p-4 text-sm text-gray-900">
                  {transaction.date}
                </td>
                <td className="p-4 text-sm font-bold text-gray-900">
                  {transaction.type}
                </td>
                <td className="p-4 text-sm text-gray-900">
                  {transaction.description}
                </td>
                <td className="p-4 text-sm font-bold text-gray-900">
                  {transaction.amount}
                </td>
                <td className="p-4">
                  <span
                    className={`${transaction.statusColor} text-white text-xs font-medium px-3 py-1 inline-block`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 border-2 border-gray-900 hover:bg-gray-100 transition-colors">
                      <Eye className="w-4 h-4 text-gray-900" />
                    </button>
                    <button className="p-2 border-2 border-gray-900 hover:bg-gray-100 transition-colors">
                      <Download className="w-4 h-4 text-gray-900" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
