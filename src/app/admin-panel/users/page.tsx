"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Activity,
  UserPlus,
  UserX,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Lock,
  Unlock,
  Trash2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { AdminLayout, StatsCard, PageHeader } from "@/components/admin-panel";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  company: string;
  roles: string[];
  activeRole: string;
  isActive: boolean;
  isVerified: boolean;
  lastLogin: string | null;
  createdAt: string;
}

interface Stats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  inactiveUsers: number;
  buyersCount: number;
  suppliersCount: number;
}

export default function UserManagementPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const perPage = 10;

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, activeFilter, searchTerm]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch stats");

      const result = await response.json();
      setStats(result.data);
    } catch (err: any) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: perPage.toString(),
        ...(searchTerm && { search: searchTerm }),
        ...(activeFilter !== "all" && { role: activeFilter }),
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users?${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch users");

      const result = await response.json();
      setUsers(result.data.users);
      setTotalPages(result.data.pagination.totalPages);
    } catch (err: any) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action: string, userId: string) => {
    try {
      const token = localStorage.getItem("admin_token");
      const endpoint =
        action === "delete"
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`
          : `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}/${action}`;

      const response = await fetch(endpoint, {
        method: action === "delete" ? "DELETE" : "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`Failed to ${action} user`);

      const result = await response.json();
      setSuccess(result.message);
      fetchUsers();
      fetchStats();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || `Failed to ${action} user`);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const statsCards = stats
    ? [
        {
          title: "Total Users",
          value: stats.totalUsers.toLocaleString(),
          change: `${stats.buyersCount} Buyers / ${stats.suppliersCount} Suppliers`,
          icon: Users,
        },
        {
          title: "Active Users",
          value: stats.activeUsers.toLocaleString(),
          subtitle: "Last 30 days",
          icon: Activity,
        },
        {
          title: "New Users",
          value: stats.newUsers.toLocaleString(),
          subtitle: "Last 30 days",
          icon: UserPlus,
        },
        {
          title: "Inactive Users",
          value: stats.inactiveUsers.toLocaleString(),
          subtitle: "Blocked/Inactive",
          icon: UserX,
        },
      ]
    : [];

  const filterButtons = [
    { label: "All", value: "all" },
    { label: "Buyer", value: "buyer" },
    { label: "Supplier", value: "supplier" },
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "buyer":
        return "bg-blue-100 text-blue-700";
      case "supplier":
        return "bg-purple-100 text-purple-700";
      case "admin":
        return "bg-gray-800 text-white";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusBadgeColor = (isActive: boolean, isVerified: boolean) => {
    if (!isActive) return "bg-red-100 text-red-700";
    if (!isVerified) return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  const getStatusText = (isActive: boolean, isVerified: boolean) => {
    if (!isActive) return "Inactive";
    if (!isVerified) return "Pending";
    return "Active";
  };

  const formatLastLogin = (lastLogin: string | null) => {
    if (!lastLogin) return "Never";
    const date = new Date(lastLogin);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMins = Math.floor(diffMs / (1000 * 60));
        return `${diffMins} min ago`;
      }
      return `${diffHours}h ago`;
    }
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "2-digit",
    });
  };

  return (
    <AdminLayout>
      <div className="p-8">
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

        {/* Alert Messages */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span className="text-[13px]">{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span className="text-[13px]">{success}</span>
          </div>
        )}

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
                key={filter.value}
                onClick={() => handleFilterChange(filter.value)}
                className={`px-4 py-1.5 text-[12px] font-medium transition-colors ${
                  activeFilter === filter.value
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or ID..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 text-[13px] text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64 bg-white border border-gray-200">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12 bg-white border border-gray-200">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50 text-gray-400" />
            <p className="text-gray-500 text-[13px]">No users found</p>
          </div>
        ) : (
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
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-[12px] text-black">
                      {user.id}
                    </td>
                    <td className="px-4 py-3 text-[12px] text-black">
                      {user.name}
                    </td>
                    <td className="px-4 py-3 text-[12px] text-black">
                      {user.email}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-medium ${getRoleBadgeColor(
                          user.activeRole
                        )}`}
                      >
                        {user.activeRole.charAt(0).toUpperCase() +
                          user.activeRole.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-medium ${getStatusBadgeColor(
                          user.isActive,
                          user.isVerified
                        )}`}
                      >
                        {getStatusText(user.isActive, user.isVerified)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-black">
                      {formatLastLogin(user.lastLogin)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            router.push(`/admin-panel/users/${user.id}`)
                          }
                          className="hover:bg-gray-100 p-1.5 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        {user.isActive ? (
                          <button
                            onClick={() => handleAction("deactivate", user.id)}
                            className="hover:bg-gray-100 p-1.5 rounded transition-colors"
                            title="Deactivate User"
                          >
                            <Lock className="w-4 h-4 text-red-600" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAction("activate", user.id)}
                            className="hover:bg-gray-100 p-1.5 rounded transition-colors"
                            title="Activate User"
                          >
                            <Unlock className="w-4 h-4 text-green-600" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (
                              confirm(
                                `Are you sure you want to delete ${user.name}?`
                              )
                            ) {
                              handleAction("delete", user.id);
                            }
                          }}
                          className="hover:bg-gray-100 p-1.5 rounded transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && users.length > 0 && (
          <div className="flex justify-between items-center">
            <p className="text-[12px] text-gray-600">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                if (pageNum > totalPages) return null;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 border flex items-center justify-center text-[12px] font-medium transition-colors ${
                      currentPage === pageNum
                        ? "bg-black text-white border-black"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
