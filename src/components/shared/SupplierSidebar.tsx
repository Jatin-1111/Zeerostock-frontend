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

interface SupplierSidebarProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export default function SupplierSidebar({
  isOpen: externalIsOpen,
  onToggle,
}: SupplierSidebarProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const pathname = usePathname();

  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleToggle = () => {
    const newState = !isOpen;
    if (onToggle) {
      onToggle(newState);
    } else {
      setInternalIsOpen(newState);
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Sidebar */}
      <div className="w-[220px] h-full bg-white shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] overflow-y-auto flex-shrink-0">
        {/* Header */}
        <div className="h-[40px] flex items-center justify-center border-b border-[#8b8b8b]">
          <h2 className="font-medium text-[13px] text-[#1e3a8a] leading-normal">
            Supplier Menu
          </h2>
        </div>

        <div className="px-1 pb-5">
          {/* INVENTORY MANAGEMENT Section */}
          <div className="mt-[25px] mb-6">
            <h3 className="font-medium text-[12px] text-black leading-normal px-[11px] mb-[20px]">
              Inventory Management
            </h3>
            <nav className="space-y-[4px]">
              <Link
                href="/supplier/listings"
                className={`flex items-center gap-[10px] rounded-[6px] py-[10px] pl-[15px] pr-4 relative ${
                  isActive("/supplier/listings")
                    ? "bg-[#eeffef] ml-1"
                    : "hover:bg-gray-100"
                }`}
              >
                {isActive("/supplier/listings") && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#2aae7a] rounded-tr-sm rounded-br-sm" />
                )}
                <div className="w-[13px] h-[13px] shrink-0">
                  <Package
                    className={`w-[13px] h-[13px] ${
                      isActive("/supplier/listings")
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium text-[11.2px] leading-normal ${
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
                className={`flex items-center gap-[10px] rounded-[6px] py-[10px] pl-[15px] pr-4 relative ${
                  isActive("/supplier/listings/new")
                    ? "bg-[#eeffef] ml-1"
                    : "hover:bg-gray-100"
                }`}
              >
                {isActive("/supplier/listings/new") && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#2aae7a] rounded-tr-sm rounded-br-sm" />
                )}
                <div className="w-[13px] h-[13px] shrink-0">
                  <Zap
                    className={`w-[13px] h-[13px] ${
                      isActive("/supplier/listings/new")
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium text-[11.2px] leading-normal ${
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
                className={`flex items-center gap-[10px] rounded-[6px] py-[10px] pl-[15px] pr-4 relative ${
                  isActive("/supplier/analytics")
                    ? "bg-[#eeffef] ml-1"
                    : "hover:bg-gray-100"
                }`}
              >
                {isActive("/supplier/analytics") && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#2aae7a] rounded-tr-sm rounded-br-sm" />
                )}
                <div className="w-[13px] h-[13px] shrink-0">
                  <BarChart3
                    className={`w-[13px] h-[13px] ${
                      isActive("/supplier/analytics")
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium text-[11.2px] leading-normal ${
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
          <div className="mb-6">
            <h3 className="font-medium text-[12px] text-black leading-normal px-[11px] mb-[20px]">
              Sales &amp; Orders
            </h3>
            <nav className="space-y-[4px]">
              <Link
                href="/supplier/orders"
                className={`flex items-center gap-[10px] rounded-[6px] py-[10px] pl-[15px] pr-4 relative ${
                  isActive("/supplier/orders")
                    ? "bg-[#eeffef] ml-1"
                    : "hover:bg-gray-100"
                }`}
              >
                {isActive("/supplier/orders") && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#2aae7a] rounded-tr-sm rounded-br-sm" />
                )}
                <div className="w-[13px] h-[13px] shrink-0">
                  <ShoppingCart
                    className={`w-[13px] h-[13px] ${
                      isActive("/supplier/orders")
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium text-[11.2px] leading-normal ${
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
                className={`flex items-center gap-[10px] rounded-[6px] py-[10px] pl-[15px] pr-4 relative ${
                  isActive("/supplier/dashboard")
                    ? "bg-[#eeffef] ml-1"
                    : "hover:bg-gray-100"
                }`}
              >
                {isActive("/supplier/dashboard") && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#2aae7a] rounded-tr-sm rounded-br-sm" />
                )}
                <div className="w-[13px] h-[13px] shrink-0">
                  <LayoutDashboard
                    className={`w-[13px] h-[13px] ${
                      isActive("/supplier/dashboard")
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium text-[11.2px] leading-normal ${
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
                className={`flex items-center gap-[10px] rounded-[6px] py-[10px] pl-[15px] pr-4 relative ${
                  isActive("/supplier/payments")
                    ? "bg-[#eeffef] ml-1"
                    : "hover:bg-gray-100"
                }`}
              >
                {isActive("/supplier/payments") && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#2aae7a] rounded-tr-sm rounded-br-sm" />
                )}
                <div className="w-[13px] h-[13px] shrink-0">
                  <CreditCard
                    className={`w-[13px] h-[13px] ${
                      isActive("/supplier/payments")
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium text-[11.2px] leading-normal ${
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
                className={`flex items-center gap-[10px] rounded-[6px] py-[10px] pl-[15px] pr-4 relative ${
                  isActive("/supplier/market-analytics")
                    ? "bg-[#eeffef] ml-1"
                    : "hover:bg-gray-100"
                }`}
              >
                {isActive("/supplier/market-analytics") && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#2aae7a] rounded-tr-sm rounded-br-sm" />
                )}
                <div className="w-[13px] h-[13px] shrink-0">
                  <Eye
                    className={`w-[13px] h-[13px] ${
                      isActive("/supplier/market-analytics")
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium text-[11.2px] leading-normal ${
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
          <div className="mb-6">
            <h3 className="font-medium text-[12px] text-black leading-normal px-[11px] mb-[20px]">
              Account
            </h3>
            <nav className="space-y-[4px]">
              <Link
                href="/supplier/profile"
                className={`flex items-center gap-[10px] rounded-[6px] py-[10px] pl-[15px] pr-4 relative ${
                  isActive("/supplier/profile")
                    ? "bg-[#eeffef] ml-1"
                    : "hover:bg-gray-100"
                }`}
              >
                {isActive("/supplier/profile") && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#2aae7a] rounded-tr-sm rounded-br-sm" />
                )}
                <div className="w-[13px] h-[13px] shrink-0">
                  <User
                    className={`w-[13px] h-[13px] ${
                      isActive("/supplier/profile")
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium text-[11.2px] leading-normal ${
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
                className={`flex items-center gap-[10px] rounded-[6px] py-[10px] pl-[15px] pr-4 relative ${
                  isActive("/supplier/settings")
                    ? "bg-[#eeffef] ml-1"
                    : "hover:bg-gray-100"
                }`}
              >
                {isActive("/supplier/settings") && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#2aae7a] rounded-tr-sm rounded-br-sm" />
                )}
                <div className="w-[13px] h-[13px] shrink-0">
                  <Settings
                    className={`w-[13px] h-[13px] ${
                      isActive("/supplier/settings")
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium text-[11.2px] leading-normal ${
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
                className="flex items-center gap-[10px] rounded-[6px] py-[10px] pl-[15px] pr-4 hover:bg-red-50"
              >
                <div className="w-[13px] h-[13px] shrink-0">
                  <LogOut className="w-[13px] h-[13px] text-[#ff0001]" />
                </div>
                <span className="font-medium text-[11.2px] text-[#ff0001] leading-normal">
                  Sign Out
                </span>
              </Link>
            </nav>
          </div>
          {/* Help & Support Card */}
          <div className="mx-auto w-[180px] bg-[#f0f0f0] rounded-[10px] overflow-clip h-[75px] relative">
            <Link
              href="/helpdesk"
              className="flex items-end gap-[8px] absolute left-[15px] top-[15px] hover:opacity-80"
            >
              <div className="w-[13px] h-[13px] shrink-0">
                <AlertCircle className="w-[13px] h-[13px] text-black" />
              </div>
              <span className="font-medium text-[11.2px] text-black leading-normal">
                Help &amp; Support
              </span>
            </Link>
            <Link
              href="/helpdesk?tab=feedback"
              className="flex items-center gap-[8px] absolute left-[15px] top-[45px] hover:opacity-80"
            >
              <div className="w-[12px] h-[12px] shrink-0">
                <Mail className="w-[12px] h-[12px] text-black" />
              </div>
              <span className="font-medium text-[11.2px] text-black leading-normal">
                Send Feedback
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
