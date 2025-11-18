"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-300">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div className="px-4 py-2 border-2 border-gray-800 text-base font-medium text-gray-900">
          Zeerostock
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <Link
            href="#"
            className="px-6 py-2 border border-gray-800 text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Home
          </Link>
          <Link
            href="#"
            className="px-6 py-2 border border-gray-800 text-gray-900 hover:bg-gray-50 transition-colors"
          >
            About Us
          </Link>
          <Link
            href="#"
            className="px-6 py-2 border border-gray-800 text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            className="p-2 hover:bg-gray-100 transition-colors"
            aria-label="Change language"
          >
            <svg
              className="w-5 h-5 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
          </button>
          <button
            className="p-2 hover:bg-gray-100 transition-colors"
            aria-label="User profile"
          >
            <svg
              className="w-5 h-5 text-gray-900"
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
      </div>
    </header>
  );
}
