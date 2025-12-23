"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  Mail,
  RefreshCw,
  Lock,
  Power,
  Trash2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { AdminLayout } from "@/components/admin-panel";

interface Admin {
  id: string;
  adminId: string;
  name: string;
  email: string;
  roles: string[];
  isFirstLogin: boolean;
  credentialsExpireAt: string | null;
  timeUntilExpiry: string | null;
  accountLocked: boolean;
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
}

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/admins`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch admins");

      const data = await response.json();
      setAdmins(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.adminId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Admin Management
          </h1>
          <p className="text-gray-600">Manage admin users and their access</p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-800">{success}</p>
            <button
              onClick={() => setSuccess("")}
              className="ml-auto text-green-600 hover:text-green-800"
            >
              ×
            </button>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
            <button
              onClick={() => setError("")}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        )}

        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search admins by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg hover:bg-gray-900 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Admin
          </button>
        </div>

        {/* Admins Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading admins...</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Admin ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAdmins.map((admin) => (
                  <AdminRow
                    key={admin.id}
                    admin={admin}
                    onUpdate={fetchAdmins}
                    setSuccess={setSuccess}
                    setError={setError}
                  />
                ))}
              </tbody>
            </table>

            {filteredAdmins.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No admins found</p>
              </div>
            )}
          </div>
        )}

        {/* Create Admin Modal */}
        {showCreateModal && (
          <CreateAdminModal
            onClose={() => setShowCreateModal(false)}
            onSuccess={(message) => {
              setSuccess(message);
              fetchAdmins();
            }}
            onError={setError}
          />
        )}
      </div>
    </AdminLayout>
  );
}

// Admin Row Component
function AdminRow({
  admin,
  onUpdate,
  setSuccess,
  setError,
}: {
  admin: Admin;
  onUpdate: () => void;
  setSuccess: (msg: string) => void;
  setError: (msg: string) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAction = async (action: string, id: string) => {
    setLoading(true);
    setShowMenu(false);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/admins/${id}/${action}`,
        {
          method: action === "delete" ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error(`Failed to ${action} admin`);

      const data = await response.json();
      setSuccess(data.message);
      onUpdate();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = () => {
    if (!admin.isActive) {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded">
          Inactive
        </span>
      );
    }
    if (admin.accountLocked) {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded">
          Locked
        </span>
      );
    }
    if (admin.isFirstLogin) {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded">
          Pending Setup
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
        Active
      </span>
    );
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <span className="font-mono text-sm font-medium">{admin.adminId}</span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">{admin.name}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{admin.email}</td>
      <td className="px-6 py-4">
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded capitalize">
          {admin.roles[0] === "super_admin" ? "Super Admin" : "Admin"}
        </span>
      </td>
      <td className="px-6 py-4">{getStatusBadge()}</td>
      <td className="px-6 py-4 text-sm text-gray-600">
        {admin.lastLogin
          ? new Date(admin.lastLogin).toLocaleDateString()
          : "Never"}
      </td>
      <td className="px-6 py-4 text-right">
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={loading}
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                {admin.isFirstLogin && (
                  <button
                    onClick={() => handleAction("resend-credentials", admin.id)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Resend Credentials
                  </button>
                )}
                <button
                  onClick={() => handleAction("reset-password", admin.id)}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Reset Password
                </button>
                <button
                  onClick={() =>
                    handleAction(
                      admin.isActive ? "deactivate" : "activate",
                      admin.id
                    )
                  }
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Power className="w-4 h-4" />
                  {admin.isActive ? "Deactivate" : "Activate"}
                </button>
                {admin.roles[0] !== "super_admin" && (
                  <button
                    onClick={() => {
                      if (
                        confirm(`Delete ${admin.name}? This cannot be undone.`)
                      ) {
                        handleAction("delete", admin.id);
                      }
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Admin
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

// Create Admin Modal
function CreateAdminModal({
  onClose,
  onSuccess,
  onError,
}: {
  onClose: () => void;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "admin",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/admins`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create admin");
      }

      const data = await response.json();
      onSuccess(data.message);
      onClose();
    } catch (err: any) {
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-black mb-4">Create New Admin</h2>
        <p className="text-sm text-gray-600 mb-6">
          Admin will receive credentials via email
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors disabled:bg-gray-400"
            >
              {loading ? "Creating..." : "Create Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
