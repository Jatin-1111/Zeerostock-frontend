"use client";

import { useState } from "react";
import { ArrowLeft, FileText, Eye, Download, CheckCircle } from "lucide-react";
import { AdminLayout, StatusBadge } from "@/components/admin-panel";
import { useRouter } from "next/navigation";

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("User Profile");
  const router = useRouter();

  const kycDocuments = [
    { name: "KYC_GST_2022.pdf", size: "2.3 MB" },
    { name: "PAN_CARD_IMG.jpg", size: "856 KB" },
    { name: "Audit_FY2022B.pdf", size: "4.1 MB" },
    { name: "Incorp_CERT.pdf", size: "1.2 MB" },
  ];

  const transactions = [
    {
      orderId: "#CRD-23310",
      date: "Nov 21,2025",
      amount: "$100.00",
      status: "Completed",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      orderId: "#CRD-??222",
      date: "First 31,2025",
      amount: "$100.00",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-700",
    },
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Users
        </button>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("User Profile")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "User Profile"
                ? "bg-black text-white"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            User Profile
          </button>
          <button
            onClick={() => setActiveTab("User Order")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "User Order"
                ? "bg-black text-white"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            User Order
          </button>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-[300px,1fr] gap-6">
          {/* Left Column - User Profile Card */}
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-black mb-6">User Profile</h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  User ID
                </label>
                <p className="text-sm text-black">IF-88W-27164</p>
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  Date Joined
                </label>
                <p className="text-sm text-black">Oct 24, 2025</p>
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  First Login
                </label>
                <p className="text-sm text-black">7 hours ago</p>
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  Location
                </label>
                <p className="text-sm text-black">New York, USA</p>
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  Verification
                </label>
                <p className="text-sm text-black">Verified</p>
              </div>
            </div>

            <div className="space-y-2 mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-bold text-black mb-3">
                QUICK ACTIONS
              </h4>
              <button className="w-full px-4 py-2 text-sm font-medium text-black border border-gray-300 hover:bg-gray-50 transition-colors">
                Blocked Account
              </button>
              <button className="w-full px-4 py-2 text-sm font-medium text-black border border-gray-300 hover:bg-gray-50 transition-colors">
                Verify KYC
              </button>
              <button className="w-full px-4 py-2 text-sm font-medium text-black border border-gray-300 hover:bg-gray-50 transition-colors">
                Change Role
              </button>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6">
            {/* User Details */}
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="text-base font-bold text-black mb-4">
                User Details
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="text-xs text-gray-500 block mb-1">
                      Name
                    </label>
                    <p className="text-sm text-black">Mike Davis</p>
                  </div>
                  <div className="mb-4">
                    <label className="text-xs text-gray-500 block mb-1">
                      Email
                    </label>
                    <p className="text-sm text-black">mikedavis@mail.com</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Phone
                    </label>
                    <p className="text-sm text-black">+91 (021) 435 2123</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Roles
                    </label>
                    <p className="text-sm text-black">User Role</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Details */}
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="text-base font-bold text-black mb-4">
                Company Details
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Company Name
                    </label>
                    <p className="text-sm text-black">Mike Davis</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Business Type
                    </label>
                    <p className="text-sm text-black">N/A</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Company Email
                    </label>
                    <p className="text-sm text-black">mikedavis@email.com</p>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Company Phone
                  </label>
                  <p className="text-sm text-black">+881-246-082-3320</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Company Address
                  </label>
                  <p className="text-sm text-black">
                    325, Sunset Street, Suite 620
                    <br />
                    Los Conchita, CA 932323
                  </p>
                </div>
              </div>
            </div>

            {/* Company Bonds */}
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="text-base font-bold text-black mb-4">
                Company Bonds
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Company Name
                  </label>
                  <p className="text-sm text-black">Mathews type</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Wellness
                  </label>
                  <p className="text-sm text-black">N/A</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Will / INED
                  </label>
                  <p className="text-sm text-black">N/A</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Registered Address
                  </label>
                  <p className="text-sm text-black">N/A</p>
                </div>
              </div>
            </div>

            {/* KYC Recovery ID */}
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="text-base font-bold text-black mb-4">
                KYC Recovery ID
              </h3>
              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  LIC / SECURITY ID
                </label>
                <p className="text-sm text-black">N/A</p>
              </div>
            </div>

            {/* KYC Documents */}
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="text-base font-bold text-black mb-4">
                KYC Documents
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {kycDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 p-3 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-black truncate">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.size}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Eye className="w-3 h-3 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Download className="w-3 h-3 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <CheckCircle className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transactions */}
            <div className="bg-white border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-base font-bold text-black">Transactions</h3>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-black">
                      Order ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-black">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-black">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-black">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-black">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map((transaction, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-black">
                        {transaction.orderId}
                      </td>
                      <td className="px-4 py-3 text-sm text-black">
                        {transaction.date}
                      </td>
                      <td className="px-4 py-3 text-sm text-black">
                        {transaction.amount}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${transaction.statusColor}`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="hover:bg-gray-100 p-1.5 rounded transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" />
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
    </AdminLayout>
  );
}
