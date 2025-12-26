"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Lock,
  CheckCircle,
} from "lucide-react";
import { AdminLayout } from "@/components/admin-panel";

export default function ChangePasswordPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Password validation states
  const [validation, setValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
  });

  // Validate password strength
  const validatePassword = (password: string) => {
    setValidation({
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    });
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    validatePassword(value);
  };

  const isPasswordValid =
    validation.minLength &&
    validation.hasUppercase &&
    validation.hasLowercase &&
    validation.hasNumber &&
    validation.hasSpecial;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    // Validate password strength
    if (!isPasswordValid) {
      setError("Please meet all password requirements");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("admin_token");

      if (!token) {
        throw new Error("Session expired. Please log in again.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/admin/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Password change failed");
      }

      // Update token if provided
      if (data.data?.accessToken) {
        localStorage.setItem("admin_token", data.data.accessToken);
      }
      if (data.data?.refreshToken) {
        localStorage.setItem("admin_refresh_token", data.data.refreshToken);
      }

      setSuccess("Password changed successfully!");

      // Clear form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setValidation({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecial: false,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to change password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Change Password
          </h1>
          <p className="text-gray-600">
            Update your admin password for security
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 max-w-2xl bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
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

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-sm text-red-800">{error}</p>
            <button
              onClick={() => setError("")}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        )}

        {/* Password Change Form */}
        <div className="max-w-2xl">
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-black">
                  Security Settings
                </h2>
                <p className="text-sm text-gray-600">
                  Update your password to keep your account secure
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Password Field */}
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter your current password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password Field */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-black mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    placeholder="Enter your new password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-medium text-gray-700">
                    Password must contain:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      {validation.minLength ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                      )}
                      <span
                        className={`text-xs ${
                          validation.minLength
                            ? "text-green-700"
                            : "text-gray-600"
                        }`}
                      >
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {validation.hasUppercase ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                      )}
                      <span
                        className={`text-xs ${
                          validation.hasUppercase
                            ? "text-green-700"
                            : "text-gray-600"
                        }`}
                      >
                        One uppercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {validation.hasLowercase ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                      )}
                      <span
                        className={`text-xs ${
                          validation.hasLowercase
                            ? "text-green-700"
                            : "text-gray-600"
                        }`}
                      >
                        One lowercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {validation.hasNumber ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                      )}
                      <span
                        className={`text-xs ${
                          validation.hasNumber
                            ? "text-green-700"
                            : "text-gray-600"
                        }`}
                      >
                        One number
                      </span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      {validation.hasSpecial ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                      )}
                      <span
                        className={`text-xs ${
                          validation.hasSpecial
                            ? "text-green-700"
                            : "text-gray-600"
                        }`}
                      >
                        One special character (!@#$%^&*...)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your new password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="mt-2 text-xs text-red-600">
                    Passwords do not match
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={loading || !isPasswordValid}
                  className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {loading ? "Changing Password..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
