"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  User,
  Settings,
  Menu,
  X,
  ShoppingBag,
} from "lucide-react";

export default function SupplierSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-gray-900 text-white rounded"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen lg:h-[calc(100vh-73px)] w-64 bg-white border-r border-gray-200 z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:top-[73px] overflow-y-auto`}
      >
        <div className="p-6">
          <h1 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">
            Supplier Dashboard
          </h1>
        </div>

        <nav className="px-6 pb-24">
          {/* INVENTORY MANAGEMENT Section */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
              INVENTORY MANAGEMENT
            </h3>
            <div className="space-y-1">
              <Link
                href="/supplier/listings"
                className={`flex items-center justify-between px-3 py-2 rounded text-sm ${
                  isActive("/supplier/listings")
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5" />
                  <span className="font-medium">My Listings</span>
                </div>
              </Link>
              <Link
                href="/supplier/listings/new"
                className={`flex items-center gap-3 px-3 py-2 rounded text-sm ${
                  isActive("/supplier/listings/new")
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="font-medium">Add Product</span>
              </Link>
              <Link
                href="/supplier/analytics"
                className={`flex items-center gap-3 px-3 py-2 rounded text-sm ${
                  isActive("/supplier/analytics")
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span className="font-medium">Analytics</span>
              </Link>
            </div>
          </div>

          {/* SALES & ORDERS Section */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
              SALES & ORDERS
            </h3>
            <div className="space-y-1">
              <Link
                href="/supplier/orders"
                className={`flex items-center gap-3 px-3 py-2 rounded text-sm ${
                  isActive("/supplier/orders")
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="font-medium">Orders</span>
              </Link>
              <Link
                href="/supplier/dashboard"
                className={`flex items-center gap-3 px-3 py-2 rounded text-sm ${
                  isActive("/supplier/dashboard")
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link
                href="/supplier/payments"
                className={`flex items-center gap-3 px-3 py-2 rounded text-sm ${
                  isActive("/supplier/payments")
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <span className="font-medium">Payments</span>
              </Link>
            </div>
          </div>

          {/* ACCOUNT Section */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
              ACCOUNT
            </h3>
            <div className="space-y-1">
              <Link
                href="/supplier/profile"
                className={`flex items-center gap-3 px-3 py-2 rounded text-sm ${
                  isActive("/supplier/profile")
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </Link>
              <Link
                href="/supplier/settings"
                className={`flex items-center gap-3 px-3 py-2 rounded text-sm ${
                  isActive("/supplier/settings")
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded text-sm font-medium"
              >
                <svg
                  className="w-5 h-5"
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
                Sign Out
              </Link>
            </div>
          </div>
        </nav>

        {/* Footer Section */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-gray-200 bg-white space-y-2">
          <Link
            href="/support"
            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Help & Support
          </Link>
          <Link
            href="/feedback"
            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            Send Feedback
          </Link>
        </div>
      </aside>
    </>
  );
}
