"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const tempToken = localStorage.getItem("admin_temp_token");

      if (!tempToken) {
        throw new Error("Session expired. Please log in again.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/admin/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tempToken}`,
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

      // Clear temp token
      localStorage.removeItem("admin_temp_token");
      localStorage.removeItem("admin_id");

      // Store new auth data
      localStorage.setItem("admin_token", data.data.accessToken);
      localStorage.setItem("admin_refresh_token", data.data.refreshToken);
      localStorage.setItem("admin_user", JSON.stringify(data.data.user));

      // Redirect to dashboard
      router.push("/admin-panel/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Password Change Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-[450px]">
          {/* Logo and Tagline */}
          <div className="mb-12">
            <h1 className="text-[32px] font-bold text-black mb-1">
              Zeerostock
            </h1>
            <p className="text-[14px] text-[#6B7280]">
              • Control • Compliance • Growth
            </p>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-[36px] font-bold text-black mb-2">
              Change Password
            </h2>
            <p className="text-[14px] text-[#6B7280]">
              For security, you must change your password before continuing
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password Field */}
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-[16px] font-medium text-black mb-2"
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your temporary password"
                  className="w-full px-4 py-3 border border-black text-[14px] text-black placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-black transition-colors"
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
                className="block text-[16px] font-medium text-black mb-2"
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
                  className="w-full px-4 py-3 border border-black text-[14px] text-black placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-black transition-colors"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-[16px] font-medium text-black mb-2"
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
                  className="w-full px-4 py-3 border border-black text-[14px] text-black placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-black transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-medium text-black mb-3">
                Password Requirements:
              </p>
              <div className="space-y-2">
                <PasswordRequirement
                  met={validation.minLength}
                  text="At least 8 characters"
                />
                <PasswordRequirement
                  met={validation.hasUppercase}
                  text="One uppercase letter (A-Z)"
                />
                <PasswordRequirement
                  met={validation.hasLowercase}
                  text="One lowercase letter (a-z)"
                />
                <PasswordRequirement
                  met={validation.hasNumber}
                  text="One number (0-9)"
                />
                <PasswordRequirement
                  met={validation.hasSpecial}
                  text="One special character (!@#$%^&*)"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !isPasswordValid}
              className="w-full bg-black text-white text-[16px] font-medium py-3.5 hover:bg-gray-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Changing Password..." : "Change Password"}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 flex items-center gap-2 text-[#9CA3AF]">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[14px]">
              Your password is encrypted and secure
            </span>
          </div>
        </div>
      </div>

      {/* Right Side - Decorative Background */}
      <div className="flex-1 relative bg-gradient-to-br from-[#0D3B2F] via-[#0A2F25] to-[#051F1A] overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute w-[600px] h-[2px] bg-gradient-to-r from-transparent via-[#3FCEA8] to-transparent opacity-40"
            style={{
              top: "15%",
              left: "50%",
              transform: "translateX(-50%) rotate(35deg)",
            }}
          />
          <div
            className="absolute w-[700px] h-[2px] bg-gradient-to-r from-transparent via-[#3FCEA8] to-transparent opacity-30"
            style={{
              top: "30%",
              left: "55%",
              transform: "translateX(-50%) rotate(35deg)",
            }}
          />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-12">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold text-white mb-6">
              Secure Your Account
            </h2>
            <p className="text-lg text-[#B8E5D8] leading-relaxed">
              Create a strong password to protect your admin account and
              maintain the security of the platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Password Requirement Component
function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {met ? (
        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
      ) : (
        <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0" />
      )}
      <span
        className={`text-sm ${
          met ? "text-green-700 font-medium" : "text-gray-600"
        }`}
      >
        {text}
      </span>
    </div>
  );
}
