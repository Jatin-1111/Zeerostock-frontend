"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

const imgUpscaleRe2 =
  "https://www.figma.com/api/mcp/asset/81fa2263-b943-4cba-b6b4-86e7e69d9a8e";

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
      toast.success("Logged out successfully!");
      router.push("/");
    } catch {
      toast.error("Failed to logout");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[93px]">
      <div className="absolute inset-0 bg-linear-to-b from-[#43C786] to-[#0A2540] backdrop-blur-[8.8px]" />
      <div className="relative h-full max-w-[1440px] mx-auto px-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <img
            src={imgUpscaleRe2}
            alt="Zeerostock"
            className="w-[150px] h-[47px]"
          />
        </Link>
        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className="text-white text-[20px] font-medium hover:text-white/90 transition-colors font-['Poppins']"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-white text-[20px] font-medium hover:text-white/90 transition-colors font-['Poppins']"
          >
            About Us
          </Link>
          <Link
            href="/help-support"
            className="text-white text-[20px] font-medium hover:text-white/90 transition-colors font-['Poppins']"
          >
            Contact Us
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Change language"
          >
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path
                d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                strokeWidth="2"
              />
            </svg>
            <span className="text-white text-[14px] font-medium">EN</span>
          </button>

          {/* WhatsApp Icon */}
          <Link
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[44px] h-[44px] bg-[#25D366] rounded-full flex items-center justify-center hover:bg-[#25D366]/90 transition-colors"
            aria-label="Contact us on WhatsApp"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </Link>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-[44px] h-[44px] bg-[#0a2540] rounded-full flex items-center justify-center hover:bg-[#0a2540]/90 transition-colors"
              aria-label="User profile"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-gray-900 rounded-lg shadow-lg z-20">
                {isAuthenticated && user ? (
                  // Logged In User Menu
                  <div className="py-2">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <Link
                        href="/buyer/dashboard"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                        Dashboard
                      </Link>
                      <Link
                        href="/buyer/settings"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Settings
                      </Link>
                    </div>

                    <hr className="my-1 border-gray-200" />

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                ) : (
                  // Logged Out User Menu
                  <div className="py-2">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">
                        Welcome to Zeerostock
                      </p>
                      <p className="text-xs text-gray-600">
                        Sign in to access your account
                      </p>
                    </div>

                    <div className="p-3 space-y-2">
                      <Link
                        href="/login"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block w-full px-4 py-2 text-sm font-medium text-white bg-[#1a5f52] hover:bg-[#164b42] rounded-lg transition-colors text-center"
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block w-full px-4 py-2 text-sm font-medium text-[#1a5f52] bg-white border-2 border-[#1a5f52] hover:bg-gray-50 rounded-lg transition-colors text-center"
                      >
                        Sign Up
                      </Link>
                    </div>

                    <hr className="my-1 border-gray-200" />

                    <div className="px-4 py-2">
                      <p className="text-xs text-gray-500 text-center">
                        New to Zeerostock?{" "}
                        <Link
                          href="/about"
                          className="text-[#1a5f52] hover:underline font-medium"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Learn more
                        </Link>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
