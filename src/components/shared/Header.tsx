"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import EnhancedSearchInput from "@/components/search/EnhancedSearchInput";

const imgUpscaleRe2 =
  "https://www.figma.com/api/mcp/asset/81fa2263-b943-4cba-b6b4-86e7e69d9a8e";
const imgLanguage =
  "https://www.figma.com/api/mcp/asset/2d3fcf4e-dbc3-41f8-b342-5a5c46cd2b41";
const imgLogosWhatsappIcon =
  "https://www.figma.com/api/mcp/asset/a5fa290d-c3c0-47cb-91f9-f53412b2b3ab";

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === "/home") return pathname === "/home" || pathname === "/";
    return pathname.startsWith(path);
  };

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
    <header className="sticky top-0 w-full z-50 shadow-[0px_5px_8px_0px_rgba(0,0,0,0.25)] bg-gradient-to-r from-[#1a5f52] via-[#2d7a6b] to-[#1a5f52]">
      <div className="container mx-auto h-[70px] flex items-center justify-between px-20 gap-8">
        {/* Logo - Left Side */}
        <Link href="/" className="shrink-0">
          <img
            src={imgUpscaleRe2}
            alt="Zeerostock"
            className="w-[150px] h-[47px]"
          />
        </Link>

        {/* Right Side - Nav, Search, Icons */}
        <div className="flex items-center gap-8">
          {/* Navigation Links */}
          <nav className="flex items-center gap-[60px]">
            <Link
              href="/home"
              className={`font-semibold text-[20px] leading-normal whitespace-nowrap transition-colors ${
                isActive("/home")
                  ? "text-[#58ea50]"
                  : "text-white hover:text-[#58ea50]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`font-semibold text-[20px] leading-normal whitespace-nowrap transition-colors ${
                isActive("/about")
                  ? "text-[#58ea50]"
                  : "text-white hover:text-[#58ea50]"
              }`}
            >
              About Us
            </Link>
            {/* Show Buyer link only if not logged in as supplier */}
            {(!isAuthenticated || user?.activeRole !== "supplier") && (
              <Link
                href="/buyer"
                className={`font-semibold text-[20px] leading-normal whitespace-nowrap transition-colors ${
                  isActive("/buyer")
                    ? "text-[#58ea50]"
                    : "text-white hover:text-[#58ea50]"
                }`}
              >
                Buyer
              </Link>
            )}
            {/* Show Supplier link only if not logged in as buyer */}
            {(!isAuthenticated || user?.activeRole !== "buyer") && (
              <Link
                href="/supplier"
                className={`font-semibold text-[20px] leading-normal whitespace-nowrap transition-colors ${
                  isActive("/supplier")
                    ? "text-[#58ea50]"
                    : "text-white hover:text-[#58ea50]"
                }`}
              >
                Suppliers
              </Link>
            )}
            <Link
              href="/roi"
              className={`font-semibold text-[20px] leading-normal whitespace-nowrap transition-colors ${
                isActive("/roi")
                  ? "text-[#58ea50]"
                  : "text-white hover:text-[#58ea50]"
              }`}
            >
              ROI
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="w-[250px]">
            <EnhancedSearchInput
              placeholder="Search Industrial Equipment, etc"
              className="rounded-[60px] text-[11px] font-semibold py-2"
              showPopularSearches={false}
            />
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-[18px] shrink-0">
            {/* Language Selector */}
            <button className="flex items-center hover:opacity-80 transition-opacity">
              <img src={imgLanguage} alt="" className="w-5 h-5" />
              <span className="font-normal text-[18px] text-white leading-5 tracking-[0.1px] ml-1.5">
                EN
              </span>
            </button>

            {/* WhatsApp */}
            <Link
              href="https://wa.me/"
              target="_blank"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src={imgLogosWhatsappIcon}
                alt="WhatsApp"
                className="w-[30px] h-[30px]"
              />
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="bg-[#0a2540] rounded-full flex items-center justify-center p-2.5 hover:bg-[#0d2f52] transition-colors"
              >
                <svg
                  className="w-5 h-5 text-white"
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
                          href={`/${user.activeRole}/dashboard`}
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
                          href={`/${user.activeRole}/settings`}
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
      </div>
    </header>
  );
}
