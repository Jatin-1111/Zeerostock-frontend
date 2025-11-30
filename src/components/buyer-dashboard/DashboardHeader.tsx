"use client";

import Link from "next/link";
import { FileText, Plus } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="bg-white px-8 py-6">
      <div className="max-w-full mx-auto">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Welcome back, Mihir
            </h1>
            <p className="text-gray-600">Heres your procurement overview</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/buyer/rfq"
              className="px-6 py-2.5 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Post New RFQ
            </Link>
            <Link
              href="/buyer/quotes"
              className="px-6 py-2.5 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              My Quotes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
