"use client";

import { useState } from "react";
import { Search, Eye } from "lucide-react";
import { AdminLayout, PageHeader } from "@/components/admin-panel";
import { useRouter } from "next/navigation";

export default function SupplierVerificationPage() {
  const router = useRouter();

  const suppliers = [
    {
      id: "ZEE-SUPP",
      company: "SteelCorp Ind",
      form: "Aniyu Sharma (Contact)",
      category: "ferrite",
      trustScore: "72/100",
      status: "Shortliste",
      statusColor: "text-blue-600",
    },
    {
      id: "YFE-SUPP-",
      company: "SteelCorp Ind",
      form: "Aniyu Sharma (Contact)",
      category: "Metal",
      trustScore: "72/100",
      status: "Pending",
      statusColor: "text-gray-600",
    },
    {
      id: "YFE-SUPP-",
      company: "SteelCorp Ind",
      form: "Aniyu Sharma (Contact)",
      category: "Automobile",
      trustScore: "52/100",
      status: "Waiting",
      statusColor: "text-orange-600",
    },
    {
      id: "ZEE-SUPP-",
      company: "Mega Polymers",
      form: "Aniyu Sharma (Contact)",
      category: "Chemicals",
      trustScore: "23/100",
      status: "Submitted",
      statusColor: "text-green-600",
    },
    {
      id: "ZEE-SUPP-",
      company: "SteelCorp Ind",
      form: "Aniyu Sharma (Contact)",
      category: "Un-Generic",
      trustScore: "72/100",
      status: "Pending",
      statusColor: "text-gray-600",
    },
  ];

  const handleViewDetails = (supplierId: string) => {
    router.push(`/admin-panel/verification/${supplierId}`);
  };

  return (
    <AdminLayout>
      {/* Header */}
      <PageHeader
        title="Supplier Verification"
        description="Manage and review supplier verification request and documents"
        actions={
          <button className="bg-black text-white px-4 py-2 text-[13px] font-medium hover:bg-gray-900 transition-colors flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search
          </button>
        }
      />

      {/* Table */}
      <div className="bg-white border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-black">
                Supplier ID
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-black">
                COMPANY
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-black">
                Submitted Form
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-black">
                Category
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-black">
                TRUST SCORE
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-black">
                Recent STATUS
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-black">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {suppliers.map((supplier, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-[12px] text-black">
                  {supplier.id}
                </td>
                <td className="px-4 py-4 text-[12px] text-black">
                  {supplier.company}
                </td>
                <td className="px-4 py-4 text-[12px] text-black">
                  {supplier.form}
                </td>
                <td className="px-4 py-4 text-[12px] text-black">
                  {supplier.category}
                </td>
                <td className="px-4 py-4 text-[12px] text-black">
                  {supplier.trustScore}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`text-[12px] font-medium ${supplier.statusColor}`}
                  >
                    {supplier.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => handleViewDetails(supplier.id)}
                    className="hover:bg-gray-100 p-1 rounded transition-colors"
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
