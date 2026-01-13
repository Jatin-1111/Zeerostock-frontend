"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAdminAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin-panel/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ adminId, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Check if password change is required
      if (data.requiresPasswordChange) {
        // Store temp token and redirect to password change page
        localStorage.setItem("admin_temp_token", data.data.tempToken);
        localStorage.setItem("admin_id", data.data.adminId);
        router.push("/admin-panel/change-password");
        return;
      }

      // Use auth context to login
      login(data.data.accessToken, data.data.refreshToken, data.data.user);

      // Redirect to dashboard
      router.push("/admin-panel/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Login Form */}
      <div className="flex flex-1 items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-[383px]">
          {/* Logo and Tagline */}
          <div className="mb-12">
            <h1 className="mb-1 text-3xl font-bold text-black">
              Zeerostock
            </h1>
            <p className="text-base text-[#6B7280]">
              • Control • Compliance • Growth
            </p>
          </div>

          {/* Login Form */}
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold text-black">
              Admin Log in
            </h2>
            <p className="text-base text-[#6B7280]">
              Enter your Admin ID and password to continue
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
              <div className="flex-1">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Admin ID Field */}
            <div>
              <label
                htmlFor="adminId"
                className="mb-2 block text-lg font-medium text-black"
              >
                Admin ID
              </label>
              <input
                type="text"
                id="adminId"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value.toUpperCase())}
                placeholder="Enter your Admin ID (e.g., A3X7K9)"
                className="w-full border border-black px-4 py-3 font-mono text-base text-black uppercase placeholder:text-[#9CA3AF] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
                maxLength={6}
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                6-character alphanumeric ID provided by your administrator
              </p>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-lg font-medium text-black"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-black px-4 py-3 pr-12 text-base text-black placeholder:text-[#9CA3AF] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] transition-colors hover:text-black"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Contact Admin Note */}
            <div className="text-left">
              <p className="text-base text-[#6B7280]">
                Don't have credentials?{" "}
                <span className="font-medium text-black">
                  Contact your system administrator
                </span>
              </p>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black py-3.5 text-lg font-medium text-white transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Authorization Notice */}
          <div className="mt-12 flex items-center gap-2 text-[#9CA3AF]">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-base">For authorized personnel only</span>
          </div>
        </div>
      </div>

      {/* Right Side - Decorative Background */}
      <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-[#0D3B2F] via-[#0A2F25] to-[#051F1A]">
        {/* Diagonal Lines Decoration */}
        <div className="absolute inset-0">
          {/* Line 1 */}
          <div className="absolute left-[50%] top-[15%] h-[2px] w-[600px] -translate-x-1/2 rotate-[35deg] bg-gradient-to-r from-transparent via-[#3FCEA8] to-transparent opacity-40" />
          {/* Line 2 */}
          <div className="absolute left-[55%] top-[30%] h-[2px] w-[700px] -translate-x-1/2 rotate-[35deg] bg-gradient-to-r from-transparent via-[#3FCEA8] to-transparent opacity-30" />
          {/* Line 3 */}
          <div className="absolute left-[45%] top-[45%] h-[2px] w-[500px] -translate-x-1/2 rotate-[35deg] bg-gradient-to-r from-transparent via-[#3FCEA8] to-transparent opacity-35" />
          {/* Line 4 */}
          <div className="absolute left-[50%] top-[60%] h-[2px] w-[800px] -translate-x-1/2 rotate-[35deg] bg-gradient-to-r from-transparent via-[#3FCEA8] to-transparent opacity-25" />
          {/* Line 5 */}
          <div className="absolute left-[55%] top-[75%] h-[2px] w-[600px] -translate-x-1/2 rotate-[35deg] bg-gradient-to-r from-transparent via-[#3FCEA8] to-transparent opacity-30" />
          {/* Line 6 */}
          <div className="absolute left-[40%] top-[85%] h-[2px] w-[550px] -translate-x-1/2 rotate-[35deg] bg-gradient-to-r from-transparent via-[#3FCEA8] to-transparent opacity-35" />
        </div>
      </div>
    </div>
  );
}
