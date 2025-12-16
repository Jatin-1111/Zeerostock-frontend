"use client";

import { useState } from "react";
import {
  ArrowLeft,
  FileText,
  Eye,
  Download,
  CheckCircle,
  Circle,
} from "lucide-react";
import { AdminLayout } from "@/components/admin-panel";
import { useRouter } from "next/navigation";

export default function SupplierDetailPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const router = useRouter();

  const documents = [
    { name: "KYC_GST_2022.pdf", size: "2.3 MB" },
    { name: "PAN_CARD_IMG.jpg", size: "856 KB" },
    { name: "Audit_FY2022B.pdf", size: "4.1 MB" },
    { name: "Incorp_CERT.pdf", size: "1.2 MB" },
  ];

  const timeline = [
    {
      status: "User Created Account [India]",
      description: "New supplier Alpha Timber joined the platform",
      time: "23 Jun 2023, 12:45 AM",
      action: "Review",
      completed: true,
    },
    {
      status: "Supplier Uploaded Escrow Funds",
      description: "10 verified, Escrow - FREETEX1-S/BXPQ1230[0XBU1220N5SN5]",
      time: "24 Jun 2023, 02:15 PM",
      action: "Alert",
      completed: true,
    },
    {
      status: "Dispute Raised",
      description: "Supplier raised complaint for escrow release",
      time: "27 Jun 2023, 08:40 AM",
      action: "Upcoming",
      completed: false,
    },
  ];

  const renderOverview = () => (
    <div className="grid grid-cols-2 gap-6">
      {/* Business Details */}
      <div>
        <h3 className="text-[14px] font-bold text-black mb-4">
          Business Details
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-[11px] text-gray-500 block mb-1">
              GSTIN / Trade Name
            </label>
            <p className="text-[13px] text-black">Alpha Timber Pvt Ltd</p>
          </div>
          <div>
            <label className="text-[11px] text-gray-500 block mb-1">
              Registered Address
            </label>
            <p className="text-[13px] text-black">Road 4 Hoshir</p>
          </div>
          <div>
            <label className="text-[11px] text-gray-500 block mb-1">
              Contact/Owner/Direct
            </label>
            <p className="text-[13px] text-black">unknown(unknown/111)</p>
          </div>
          <div>
            <label className="text-[11px] text-gray-500 block mb-1">
              GST/SPECIAL#
            </label>
            <p className="text-[13px] text-black">22ABVABCPOLY</p>
          </div>
        </div>
        <p className="text-[11px] text-gray-500 mt-4 leading-relaxed">
          N - 48, Yamuna College of Design, 2nd Floor, Yamuna[Vad.][merge] No
          Company
        </p>
      </div>

      {/* Trust Score */}
      <div>
        <h3 className="text-[14px] font-bold text-black mb-4">Trust Score</h3>
        <div className="flex flex-col items-center py-6">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#000000"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56 * 0.65} ${
                  2 * Math.PI * 56 * 0.35
                }`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[28px] font-bold text-black">65%</span>
              <span className="text-[10px] text-gray-500">Needs it</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-500 text-center mt-4 max-w-xs">
            This is a risk score. Verify payment docs & tax data records, check
            identity documentation.
          </p>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div>
      <h3 className="text-[14px] font-bold text-black mb-4">
        Attached Documents
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="border border-gray-200 p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gray-100 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-black truncate">{doc.name}</p>
              <p className="text-[10px] text-gray-500">{doc.size}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                <Eye className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                <Download className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                <CheckCircle className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHistory = () => (
    <div>
      <h3 className="text-[14px] font-bold text-black mb-6">
        Escrow Event Timeline
      </h3>
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-6">
          {timeline.map((event, index) => (
            <div key={index} className="relative flex gap-4">
              {/* Timeline Node */}
              <div className="relative z-10 flex-shrink-0">
                {event.completed ? (
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-gray-600" />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                    <Circle className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Event Content */}
              <div className="flex-1 pt-1">
                <div className="bg-white border border-gray-200 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-[13px] font-semibold text-black">
                      {event.status}
                    </h4>
                    <button className="text-[11px] text-black hover:underline">
                      {event.action}
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-600 mb-2">
                    {event.description}
                  </p>
                  <p className="text-[10px] text-gray-400">{event.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-black mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Verification
      </button>

      <div className="mb-6">
        <h2 className="text-[24px] font-bold text-black mb-1">
          Supplier Verification Details
        </h2>
        <p className="text-[13px] text-gray-500">
          Review supplier documents and verification status
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab("Overview")}
              className={`px-4 py-2 text-[13px] font-medium transition-colors ${
                activeTab === "Overview"
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("Documents")}
              className={`px-4 py-2 text-[13px] font-medium transition-colors ${
                activeTab === "Documents"
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Documents
            </button>
            <button
              onClick={() => setActiveTab("History")}
              className={`px-4 py-2 text-[13px] font-medium transition-colors ${
                activeTab === "History"
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              History
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 mt-6">
          {activeTab === "Overview" && renderOverview()}
          {activeTab === "Documents" && renderDocuments()}
          {activeTab === "History" && renderHistory()}
        </div>
      </div>
    </AdminLayout>
  );
}
