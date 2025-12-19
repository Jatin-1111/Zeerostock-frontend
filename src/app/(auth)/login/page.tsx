"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [userType, setUserType] = useState<"buyer" | "supplier">("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier || !password) {
      return;
    }

    setLoading(true);
    const success = await login({
      identifier,
      password,
      requestedRole: userType,
    });
    setLoading(false);

    if (success) {
      // Redirect based on user type preference
      if (userType === "buyer") {
        router.push("/buyer/dashboard");
      } else {
        router.push("/supplier/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white border-2 border-gray-200 rounded-lg p-8 placeholder:text-gray-400">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Login as:
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setUserType("buyer")}
              className={`py-8 border-2 rounded-lg transition-colors ${
                userType === "buyer"
                  ? "border-gray-900 bg-white"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  Buyer
                </div>
                <div className="text-xs text-gray-600">
                  Purchasing surplus
                  <br />
                  inventory
                </div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setUserType("supplier")}
              className={`py-8 border-2 rounded-lg transition-colors ${
                userType === "supplier"
                  ? "border-gray-900 bg-white"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  Supplier
                </div>
                <div className="text-xs text-gray-600">
                  Selling surplus
                  <br />
                  stock
                </div>
              </div>
            </button>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email (or) Ph. number
            </label>
            <input
              type="text"
              placeholder="email@domain.com / ph. no."
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              disabled={loading}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:bg-gray-100 placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full px-3 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:bg-gray-100 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {showPassword ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="text-center space-y-2">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline block"
            >
              Forgot your password?
            </Link>
            <p className="text-sm text-gray-600">don&apos;t have a account?</p>
            <Link
              href="/signup"
              className="text-sm text-blue-600 hover:underline font-medium block"
            >
              Create New Account
            </Link>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            Trusted by 10,000+ businesses
          </p>
        </form>
      </div>
    </div>
  );
}
