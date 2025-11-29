"use client";

import { MessageCircle, FileText } from "lucide-react";

export default function NeedHelp() {
  return (
    <div className="bg-white border-2 border-gray-900 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help?</h3>
      <p className="text-xs text-gray-600 mb-4">
        Our verification team is here to assist you through the process
      </p>

      <div className="space-y-2">
        <button className="w-full py-2.5 bg-gray-900 text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
          <MessageCircle className="w-4 h-4" />
          Contact Support
        </button>
        <button className="w-full py-2.5 bg-white border-2 border-gray-900 text-gray-900 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
          <FileText className="w-4 h-4" />
          View Guidelines
        </button>
      </div>
    </div>
  );
}
