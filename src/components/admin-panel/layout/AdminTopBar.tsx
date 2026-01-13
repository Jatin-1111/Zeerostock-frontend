"use client";

import { Bell, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import Link from "next/link";

export default function AdminTopBar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { admin, logout } = useAdminAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    logout();
  };

  const getInitials = () => {
    if (!admin || !admin.name) return "AD";
    const nameParts = admin.name.split(" ");
    const first = nameParts[0]?.[0]?.toUpperCase() || "A";
    const last = nameParts[1]?.[0]?.toUpperCase() || "D";
    return `${first}${last}`;
  };

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-end items-center gap-4">
      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <Bell className="w-5 h-5 text-gray-600" />
      </button>

      <div className="relative" ref={userMenuRef}>
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className={`rounded-full flex items-center justify-center transition-all ${
            admin
              ? "bg-white hover:bg-gray-100 w-10 h-10 border-2 border-gray-300"
              : "bg-black hover:bg-gray-800 w-8 h-8"
          }`}
          aria-label="User menu"
          aria-expanded={isUserMenuOpen}
        >
          {admin ? (
            <span className="text-black font-bold text-sm">
              {getInitials()}
            </span>
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </button>

        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-gray-900 rounded-lg shadow-lg z-20">
            {admin ? (
              <div className="py-2">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">
                    {admin.name || "Admin User"}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {admin.email}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-black text-white rounded">
                    {admin.role || "Admin"}
                  </span>
                </div>

                <div className="py-1">
                  <Link
                    href="/admin-panel/dashboard"
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
                    href="/admin-panel/settings"
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
              <div className="py-2">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">
                    Admin Panel
                  </p>
                  <p className="text-xs text-gray-600">
                    Please log in to continue
                  </p>
                </div>

                <div className="p-3">
                  <Link
                    href="/admin-panel/login"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="block w-full px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors text-center"
                  >
                    Login
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
