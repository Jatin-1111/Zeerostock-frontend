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
  Zap,
  ShoppingCart,
  CreditCard,
  Eye,
  LogOut,
  AlertCircle,
  Mail,
  ArrowLeft,
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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-300 rounded"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-screen lg:h-[calc(100vh-73px)] w-[300px] flex-shrink-0 bg-white shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 lg:top-[73px] flex flex-col overflow-hidden`}
      >
        {/* Header */}
        <div className="h-[60px] flex items-center justify-center border-b border-[#8b8b8b] relative flex-shrink-0">
          <h2 className="font-medium text-[20px] text-[#1e3a8a] leading-normal">
            Supplier Menu
          </h2>
          <button
            className="absolute right-[21px] w-[21px] h-[21px]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ArrowLeft className="w-[21px] h-[21px] text-[#1e3a8a]" />
          </button>
        </div>

        <div className="px-1 pb-7 flex-1 overflow-y-auto">
          {/* INVENTORY MANAGEMENT Section */}
          <div className="mt-[37px] mb-8">
            <h3 className="font-medium text-[19px] text-black leading-normal px-5 mb-[29px]">
              Inventory Management
            </h3>
            <nav className="space-y-[5px]">
              <Link
                href="/supplier/listings"
                className={`flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-5 relative ${
                  isActive("/supplier/listings")
                    ? "bg-[#eeffef] ml-1"
                    : "hover:bg-gray-100"
                }`}
              >
                {isActive("/supplier/listings") && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#2aae7a] rounded-tr-sm rounded-br-sm" />
                )}
                <div className="w-[19px] h-[19px] shrink-0">
                  <Package
                    className={`w-[19px] h-[19px] ${
                      isActive("/supplier/listings")
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium text-[17px] leading-normal ${
                    isActive("/supplier/listings")
                      ? "text-[#2aae7a]"
                      : "text-[#8b8b8b]"
                  }`}
                >
                  My Listings
                </span>
              </Link>
              <Link
                href="/supplier/listings/new"
                className={`flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-5 relative ${
                  isActive("/supplier/listings/new")
                    ? "bg-[#eeffef] ml-1"
                    : "hover:bg-gray-100"
                }`}
              >
                {isActive("/supplier/listings/new") && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#2aae7a] rounded-tr-sm rounded-br-sm" />
                )}
                <div className="w-[19px] h-[19px] shrink-0">
                  <Zap
                    className={`w-[19px] h-[19px] ${
                      isActive("/supplier/listings/new")
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium text-[17px] leading-normal ${
                    isActive("/supplier/listings/new")
                      ? "text-[#2aae7a]"
                      : "text-[#8b8b8b]"
                  }`}
                >
                  Quick List
                </span>
              </Link>
              <Link
                href="/supplier/analytics"
                className={`flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-5 relative ${
                  isActive("/supplier/analytics")
                    ? "bg-[#eeffef] ml-1"
                    : "hover:bg-gray-100"
                }`}
              >
                {isActive("/supplier/analytics") && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#2aae7a] rounded-tr-sm rounded-br-sm" />
                )}
                <div className="w-[19px] h-[19px] shrink-0">
                  <BarChart3
                    className={`w-[19px] h-[19px] ${
                      isActive("/supplier/analytics")
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium text-[17px] leading-normal ${
                    isActive("/supplier/analytics")
                      ? "text-[#2aae7a]"
                      : "text-[#8b8b8b]"
                  }`}
                >
                  Performance
                </span>
              </Link>
            </nav>
          </div>

          {/* SALES & ORDERS Section */}
          <div className="mb-8">
            <h3 className="font-medium text-[19px] text-black leading-normal px-5 mb-[29px]">
              Sales &amp; Orders
            </h3>
            <nav className="space-y-[5px]">
              <Link
                href="/supplier/orders"
                className={`flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-5 relative ${
                  isActive("/supplier/orders")
                    ? "bg-[#eeffef] ml-1"
                    : "hover:bg-gray-100"
                }`}
              >
                {isActive("/supplier/orders") && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#2aae7a] rounded-tr-sm rounded-br-sm" />
                )}
                <div className="w-[19px] h-[19px] shrink-0">
                  <ShoppingCart
                    className={`w-[19px] h-[19px] ${
                      isActive("/supplier/orders")
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium text-[17px] leading-normal ${
                    isActive("/supplier/orders")
                      ? "text-[#2aae7a]"
                      : "text-[#8b8b8b]"
                  }`}
                >
                  Order Management
                </span>
              </Link>
              <Link
                href="/supplier/dashboard"
                className={`flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-5 relative ${
                  isActive("/supplier/dashboard")
                    ? "bg-[#eeffef] ml-1"
                    : "hover:bg-gray-100"
                }`}
              >
                {isActive("/supplier/dashboard") && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#2aae7a] rounded-tr-sm rounded-br-sm" />
                )}
                <div className="w-[19px] h-[19px] shrink-0">
                  <LayoutDashboard
                    className={`w-[19px] h-[19px] ${
                      isActive("/supplier/dashboard")
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium text-[17px] leading-normal ${
                    isActive("/supplier/dashboard")
                      ? "text-[#2aae7a]"
                      : "text-[#8b8b8b]"
                  }`}
                >
                  Dashboard
                </span>
              </Link>
              <Link
                href="/supplier/payments"
                className={`flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-5 relative ${
                  isActive("/supplier/payments")
                    ? "bg-[#eeffef] ml-1"
                    : "hover:bg-gray-100"
                }`}
              >
                {isActive("/supplier/payments") && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#2aae7a] rounded-tr-sm rounded-br-sm" />
                )}
                <div className="w-[19px] h-[19px] shrink-0">
                  <CreditCard
                    className={`w-[19px] h-[19px] ${
                      isActive("/supplier/payments")
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium text-[17px] leading-normal ${
                    isActive("/supplier/payments")
                      ? "text-[#2aae7a]"
                      : "text-[#8b8b8b]"
                  }`}
                >
                  Payments
                </span>
              </Link>
              <Link
                href="/supplier/market-analytics"
                className={`flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-5 relative ${
                  isActive("/supplier/market-analytics")
                    ? "bg-[#eeffef] ml-1"
                    : "hover:bg-gray-100"
                }`}
              >
                {isActive("/supplier/market-analytics") && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#2aae7a] rounded-tr-sm rounded-br-sm" />
                )}
                <div className="w-[19px] h-[19px] shrink-0">
                  <Eye
                    className={`w-[19px] h-[19px] ${
                      isActive("/supplier/market-analytics")
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium text-[17px] leading-normal ${
                    isActive("/supplier/market-analytics")
                      ? "text-[#2aae7a]"
                      : "text-[#8b8b8b]"
                  }`}
                >
                  Market Analytics
                </span>
              </Link>
            </nav>
          </div>

          {/* ACCOUNT Section */}
          <div className="mb-8">
            <h3 className="font-medium text-[19px] text-black leading-normal px-5 mb-[29px]">
              Account
            </h3>
            <nav className="space-y-[5px]">
              <Link
                href="/supplier/profile"
                className={`flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-5 relative ${
                  isActive("/supplier/profile")
                    ? "bg-[#eeffef] ml-1"
                    : "hover:bg-gray-100"
                }`}
              >
                {isActive("/supplier/profile") && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#2aae7a] rounded-tr-sm rounded-br-sm" />
                )}
                <div className="w-[19px] h-[19px] shrink-0">
                  <User
                    className={`w-[19px] h-[19px] ${
                      isActive("/supplier/profile")
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium text-[17px] leading-normal ${
                    isActive("/supplier/profile")
                      ? "text-[#2aae7a]"
                      : "text-[#8b8b8b]"
                  }`}
                >
                  Profile
                </span>
              </Link>
              <Link
                href="/supplier/settings"
                className={`flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-5 relative ${
                  isActive("/supplier/settings")
                    ? "bg-[#eeffef] ml-1"
                    : "hover:bg-gray-100"
                }`}
              >
                {isActive("/supplier/settings") && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#2aae7a] rounded-tr-sm rounded-br-sm" />
                )}
                <div className="w-[19px] h-[19px] shrink-0">
                  <Settings
                    className={`w-[19px] h-[19px] ${
                      isActive("/supplier/settings")
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium text-[17px] leading-normal ${
                    isActive("/supplier/settings")
                      ? "text-[#2aae7a]"
                      : "text-[#8b8b8b]"
                  }`}
                >
                  Settings
                </span>
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-5 hover:bg-red-50"
              >
                <div className="w-[19px] h-[19px] shrink-0">
                  <LogOut className="w-[19px] h-[19px] text-[#ff0001]" />
                </div>
                <span className="font-medium text-[17px] text-[#ff0001] leading-normal">
                  Sign Out
                </span>
              </Link>
            </nav>
          </div>
          {/* Help & Support Card */}
          <div className="mx-auto w-[255px] bg-[#f0f0f0] rounded-[15px] overflow-clip h-[104px] relative">
            <Link
              href="/supplier/contact"
              className="flex items-end gap-[11px] absolute left-[23px] top-[23px] hover:opacity-80"
            >
              <div className="w-[19px] h-[19px] shrink-0">
                <AlertCircle className="w-[19px] h-[19px] text-black" />
              </div>
              <span className="font-medium text-[17px] text-black leading-normal">
                Help &amp; Support
              </span>
            </Link>
            <Link
              href="/feedback"
              className="flex items-center gap-[11px] absolute left-[23px] top-[62px] hover:opacity-80"
            >
              <div className="w-[18px] h-[18px] shrink-0">
                <Mail className="w-[18px] h-[18px] text-black" />
              </div>
              <span className="font-medium text-[17px] text-black leading-normal">
                Send Feedback
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/80 bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
