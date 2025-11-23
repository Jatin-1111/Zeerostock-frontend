"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full bg-white z-50">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="px-4 py-2 border-2 border-gray-900 rounded">
            <span className="font-bold text-gray-900 text-lg">Zeerostock</span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search industries, surplus, equipment..."
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-600"
            />
            <svg
              className="w-5 h-5 text-gray-600 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-40">
          <div className="flex items-center gap-4">
            <Link
              href="/home"
              className="px-4 py-2 border-2 border-gray-900 rounded font-medium text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 border-2 border-gray-900 rounded font-medium text-gray-900 hover:bg-gray-50 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/buyer"
              className="px-4 py-2 border-2 border-gray-900 rounded font-medium text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Buyers
            </Link>
            <Link
              href="/suppliers"
              className="px-4 py-2 border-2 border-gray-900 rounded font-medium text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Suppliers
            </Link>
            <Link
              href="/roi"
              className="px-4 py-2 border-2 border-gray-900 rounded font-medium text-gray-900 hover:bg-gray-50 transition-colors"
            >
              ROI
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <button className="px-3 py-2 border-2 border-gray-900 rounded bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors flex items-center gap-1">
              <span className="text-sm">A</span>
              <span className="text-xs">अ</span>
            </button>

            {/* WhatsApp */}
            <Link
              href="https://wa.me/"
              target="_blank"
              className="p-2 border-2 border-gray-900 rounded hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 border-2 border-gray-900 rounded hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-900"
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
            </div>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsUserMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-gray-900 rounded shadow-lg z-20">
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <Link
                      href="/buyer/settings"
                      className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <hr className="my-1 border-gray-200" />
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Sign Out
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>
      </div>

      <div className="bg-gray-400 h-1" />
    </header>
  );
}
