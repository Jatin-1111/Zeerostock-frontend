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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded"
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
        className={`fixed lg:sticky top-0 left-0 h-screen lg:h-[calc(100vh-73px)] w-64 bg-white border-r-2 border-gray-900 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:top-[73px] overflow-y-auto`}
      >
        <div className="p-6 border-b-2 border-gray-900">
          <h1 className="text-xl font-bold text-gray-900">Supplier Menu</h1>
        </div>

        <nav className="p-4 pb-24">
          {/* INVENTORY MANAGEMENT Section */}
          <div className="mb-6">
            <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase">
              INVENTORY MANAGEMENT
            </p>
            <div className="space-y-1">
              <Link
                href="/supplier/my-listings"
                className={`flex items-center justify-between px-4 py-3 rounded ${
                  isActive("/supplier/my-listings")
                    ? "bg-gray-900 text-white"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5" />
                  <span className="font-medium">My Listings</span>
                </div>
                <span className="text-xs bg-gray-200 text-gray-900 px-2 py-1 rounded">
                  45 Active
                </span>
              </Link>
              <Link
                href="/supplier/quick-list"
                className={`flex items-center gap-3 px-4 py-3 rounded ${
                  isActive("/supplier/quick-list")
                    ? "bg-gray-900 text-white"
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span className="font-medium">Quick List</span>
              </Link>
              <Link
                href="/supplier/performance"
                className={`flex items-center gap-3 px-4 py-3 rounded ${
                  isActive("/supplier/performance")
                    ? "bg-gray-900 text-white"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span className="font-medium">Performance</span>
              </Link>
            </div>
          </div>

          {/* SALES & ORDERS Section */}
          <div className="mb-6">
            <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase">
              SALES & ORDERS
            </p>
            <div className="space-y-1">
              <Link
                href="/supplier/order-management"
                className={`flex items-center gap-3 px-4 py-3 rounded ${
                  isActive("/supplier/order-management")
                    ? "bg-gray-900 text-white"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="font-medium">Order Management</span>
              </Link>
              <Link
                href="/supplier/dashboard"
                className={`flex items-center gap-3 px-4 py-3 rounded ${
                  isActive("/supplier/dashboard")
                    ? "bg-gray-900 text-white"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link
                href="/supplier/payments"
                className={`flex items-center gap-3 px-4 py-3 rounded ${
                  isActive("/supplier/payments")
                    ? "bg-gray-900 text-white"
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
          <div className="mb-6">
            <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase">
              ACCOUNT
            </p>
            <div className="space-y-1">
              <Link
                href="/supplier/profile"
                className={`flex items-center gap-3 px-4 py-3 rounded ${
                  isActive("/supplier/profile")
                    ? "bg-gray-900 text-white"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </Link>
              <Link
                href="/supplier/verification"
                className={`flex items-center gap-3 px-4 py-3 rounded ${
                  isActive("/supplier/verification")
                    ? "bg-gray-900 text-white"
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="font-medium">Verification</span>
              </Link>
              <Link
                href="/supplier/settings"
                className={`flex items-center gap-3 px-4 py-3 rounded ${
                  isActive("/supplier/settings")
                    ? "bg-gray-900 text-white"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </Link>
              <button className="flex items-center gap-3 px-4 py-3 rounded text-red-600 hover:bg-red-50 w-full text-left transition-colors">
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
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Footer Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-gray-900 bg-white">
          <Link
            href="/supplier/help"
            className="flex items-center gap-3 px-4 py-3 rounded text-gray-900 hover:bg-gray-100 mb-2"
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
            <span className="font-medium">Help & Support</span>
          </Link>
          <Link
            href="/supplier/feedback"
            className="flex items-center gap-3 px-4 py-3 rounded text-gray-900 hover:bg-gray-100"
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
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <span className="font-medium">Send Feedback</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
