"use client";

import { useState } from "react";
import {
  Users,
  Activity,
  UserPlus,
  UserX,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AdminLayout, StatsCard, PageHeader } from "@/components/admin-panel";
import { useRouter } from "next/navigation";

export default function UserManagementPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const statsCards = [
    {
      title: "Total Users",
      value: "24,683",
      change: "12% vs Last Month",
      icon: Users,
    },
    {
      title: "Active Users",
      value: "4,322",
      subtitle: "Engaged/Active",
      icon: Activity,
    },
    {
      title: "New Users",
      value: "18,104",
      subtitle: "7 M",
      icon: UserPlus,
    },
    {
      title: "Inactive Users",
      value: "276",
      subtitle: "At-risk/churn",
      icon: UserX,
    },
  ];

  const filterButtons = ["All", "Buyer", "Supplier", "Video"];

  const userData = [
    {
      userId: "M012-33313",
      name: "Mike Davis",
      email: "mike.davis@mail.com",
      role: "Buyer",
      roleColor: "bg-blue-100 text-blue-700",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
      lastLogin: "2 Oct, 24 6:30 PM",
    },
    {
      userId: "M012-33313",
      name: "Mike Davis",
      email: "mike.davis@mail.com",
      role: "Supplier",
      roleColor: "bg-purple-100 text-purple-700",
      status: "Inactive",
      statusColor: "bg-gray-100 text-gray-700",
      lastLogin: "3 Oct, 24 6:30 PM",
    },
    {
      userId: "M012-33313",
      name: "Mike Davis",
      email: "mike.davis@mail.com",
      role: "Buyer",
      roleColor: "bg-blue-100 text-blue-700",
      status: "Blocked",
      statusColor: "bg-red-100 text-red-700",
      lastLogin: "5 weeks ago",
    },
    {
      userId: "M012-33313",
      name: "Mike Davis",
      email: "mike.davis@mail.com",
      role: "Buyer",
      roleColor: "bg-blue-100 text-blue-700",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
      lastLogin: "2 Oct, 24 6:30 PM",
    },
    {
      userId: "M012-33313",
      name: "Mike Davis",
      email: "mike.davis@mail.com",
      role: "Supplier",
      roleColor: "bg-purple-100 text-purple-700",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
      lastLogin: "2 Oct, 24 6:30 PM",
    },
    {
      userId: "U012-33312",
      name: "Mike Davis",
      email: "mike.davis@mail.com",
      role: "Buyer",
      roleColor: "bg-blue-100 text-blue-700",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-700",
      lastLogin: "5 weeks ago",
    },
    {
      userId: "U012-33312",
      name: "Mike Davis",
      email: "mike.davis@mail.com",
      role: "Buyer",
      roleColor: "bg-blue-100 text-blue-700",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
      lastLogin: "2 Oct, 24 6:30 PM",
    },
    {
      userId: "U013-33312",
      name: "Mike Davis",
      email: "mike.davis@mail.com",
      role: "Supplier",
      roleColor: "bg-purple-100 text-purple-700",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
      lastLogin: "2 Oct, 24 6:30 PM",
    },
    {
      userId: "U013-33312",
      name: "Mike Davis",
      email: "mike.davis@mail.com",
      role: "Buyer",
      roleColor: "bg-blue-100 text-blue-700",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
      lastLogin: "2 Oct, 24 6:30 PM",
    },
    {
      userId: "U013-33312",
      name: "Mike Davis",
      email: "mike.davis@mail.com",
      role: "Buyer",
      roleColor: "bg-blue-100 text-blue-700",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
      lastLogin: "2 Oct, 24 6:30 PM",
    },
  ];

  const handleViewProfile = (userId: string) => {
    router.push(`/admin-panel/users/${userId}`);
  };

  return (
    <AdminLayout>
      {/* Header */}
      <PageHeader
        title="User Management"
        description="Manage all user and access activity"
        actions={
          <button className="bg-black text-white px-4 py-2 text-[13px] font-medium hover:bg-gray-900 transition-colors">
            Export
          </button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {statsCards.map((card, index) => (
          <StatsCard key={index} {...card} />
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white border border-gray-200 mb-4">
        {/* Filter Buttons */}
        <div className="flex items-center gap-2 p-4 border-b border-gray-200">
          {filterButtons.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 text-[12px] font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="U or ID or at date..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 text-[13px] text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 mb-4">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-[11px] font-bold text-black">
                USER ID
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-bold text-black">
                NAME
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-bold text-black">
                EMAIL
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-bold text-black">
                ROLE
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-bold text-black">
                STATUS
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-bold text-black">
                Last Login
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-bold text-black">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {userData.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-[12px] text-black">
                  {user.userId}
                </td>
                <td className="px-4 py-3 text-[12px] text-black">
                  {user.name}
                </td>
                <td className="px-4 py-3 text-[12px] text-black">
                  {user.email}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-medium ${user.roleColor}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-medium ${user.statusColor}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[12px] text-black">
                  {user.lastLogin}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewProfile(user.userId)}
                      className="hover:bg-gray-100 p-1.5 rounded transition-colors"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleViewProfile(user.userId)}
                      className="text-[11px] text-black hover:underline"
                    >
                      View Profile
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <p className="text-[12px] text-gray-600">
          Showing 1 to 10 of 1600 results
        </p>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button
            className={`w-8 h-8 border flex items-center justify-center text-[12px] font-medium transition-colors ${
              currentPage === 1
                ? "bg-black text-white border-black"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
          <button
            className={`w-8 h-8 border flex items-center justify-center text-[12px] font-medium transition-colors ${
              currentPage === 2
                ? "bg-black text-white border-black"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setCurrentPage(2)}
          >
            2
          </button>
          <button
            className={`w-8 h-8 border flex items-center justify-center text-[12px] font-medium transition-colors ${
              currentPage === 3
                ? "bg-black text-white border-black"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setCurrentPage(3)}
          >
            3
          </button>
          <button className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
