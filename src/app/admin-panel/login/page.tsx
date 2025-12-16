"use client";

import { useState } from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle admin login
    console.log("Admin login:", { email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-[383px]">
          {/* Logo and Tagline */}
          <div className="mb-12">
            <h1 className="text-[32px] font-bold text-black mb-1">
              Zeerostock
            </h1>
            <p className="text-[14px] text-[#6B7280]">
              • Control • Compliance • Growth
            </p>
          </div>

          {/* Login Form */}
          <div className="mb-8">
            <h2 className="text-[36px] font-bold text-black mb-2">
              Admin Log in
            </h2>
            <p className="text-[14px] text-[#6B7280]">
              Welcome back. Please enter your details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-[16px] font-medium text-black mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-black text-[14px] text-black placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-[16px] font-medium text-black mb-2"
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
                  className="w-full px-4 py-3 border border-black text-[14px] text-black placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-black transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-left">
              <Link
                href="/admin-panel/forgot-password"
                className="text-[14px] text-[#6B7280] hover:text-black transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-black text-white text-[16px] font-medium py-3.5 hover:bg-gray-900 transition-colors"
            >
              Sign in
            </button>
          </form>

          {/* Authorization Notice */}
          <div className="mt-12 flex items-center gap-2 text-[#9CA3AF]">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[14px]">For authorized personnel only</span>
          </div>
        </div>
      </div>

      {/* Right Side - Decorative Background */}
      <div className="flex-1 relative bg-gradient-to-br from-[#0D3B2F] via-[#0A2F25] to-[#051F1A] overflow-hidden">
        {/* Diagonal Lines Decoration */}
        <div className="absolute inset-0">
          {/* Line 1 */}
          <div
            className="absolute w-[600px] h-[2px] bg-gradient-to-r from-transparent via-[#3FCEA8] to-transparent opacity-40"
            style={{
              top: "15%",
              left: "50%",
              transform: "translateX(-50%) rotate(35deg)",
            }}
          />
          {/* Line 2 */}
          <div
            className="absolute w-[700px] h-[2px] bg-gradient-to-r from-transparent via-[#3FCEA8] to-transparent opacity-30"
            style={{
              top: "30%",
              left: "55%",
              transform: "translateX(-50%) rotate(35deg)",
            }}
          />
          {/* Line 3 */}
          <div
            className="absolute w-[500px] h-[2px] bg-gradient-to-r from-transparent via-[#3FCEA8] to-transparent opacity-35"
            style={{
              top: "45%",
              left: "45%",
              transform: "translateX(-50%) rotate(35deg)",
            }}
          />
          {/* Line 4 */}
          <div
            className="absolute w-[800px] h-[2px] bg-gradient-to-r from-transparent via-[#3FCEA8] to-transparent opacity-25"
            style={{
              top: "60%",
              left: "50%",
              transform: "translateX(-50%) rotate(35deg)",
            }}
          />
          {/* Line 5 */}
          <div
            className="absolute w-[600px] h-[2px] bg-gradient-to-r from-transparent via-[#3FCEA8] to-transparent opacity-30"
            style={{
              top: "75%",
              left: "55%",
              transform: "translateX(-50%) rotate(35deg)",
            }}
          />
          {/* Line 6 */}
          <div
            className="absolute w-[550px] h-[2px] bg-gradient-to-r from-transparent via-[#3FCEA8] to-transparent opacity-35"
            style={{
              top: "85%",
              left: "40%",
              transform: "translateX(-50%) rotate(35deg)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
