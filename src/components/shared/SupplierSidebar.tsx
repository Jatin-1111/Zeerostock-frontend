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
  Zap,
  ShoppingCart,
  CreditCard,
  Eye,
  ShieldCheck,
  LogOut,
  AlertCircle,
  Mail,
  ChevronLeft,
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
        className={`fixed lg:sticky top-0 left-0 h-screen lg:h-[calc(100vh-73px)] w-[263px] bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:top-[73px] overflow-y-auto`}
      >
        {/* Header */}
        <div className="h-[60px] border-b border-[#8B8B8B] flex items-center justify-center relative">
          <h1
            style={{ fontFamily: "Poppins, sans-serif" }}
            className="font-medium text-[20px] text-[#1E3A8A] leading-normal"
          >
            Supplier Menu
          </h1>
          <button className="absolute right-[15px] top-1/2 -translate-y-1/2">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <nav className="px-1 pt-5 pb-[135px]">
          {/* INVENTORY MANAGEMENT Section */}
          <div className="mb-[23px]">
            <h3
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="font-medium text-[19px] text-black leading-normal mb-[8px] px-[20px]"
            >
              Inventory Management
            </h3>
            <div className="space-y-0">
              <Link
                href="/supplier/listings"
                className={`flex items-center gap-[15px] px-[19px] py-[15px] rounded-[9px] relative ${
                  isActive("/supplier/listings")
                    ? "bg-[#EEFFEF] ml-[4px]"
                    : "ml-[4px] hover:bg-gray-50"
                }`}
              >
                {isActive("/supplier/listings") && (
                  <div className="absolute left-[-4px] top-0 w-[4px] h-full bg-[#2AAE7A] rounded-br-[4px] rounded-tr-[4px]" />
                )}
                <Package
                  className={`w-[19px] h-[19px] ${
                    isActive("/supplier/listings")
                      ? "text-[#2AAE7A]"
                      : "text-[#8B8B8B]"
                  }`}
                />
                <span
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className={`font-medium text-[17px] leading-normal ${
                    isActive("/supplier/listings")
                      ? "text-[#2AAE7A]"
                      : "text-[#8B8B8B]"
                  }`}
                >
                  My Listings
                </span>
              </Link>
              <Link
                href="/supplier/listings/new"
                className="flex items-center gap-[15px] px-[19px] py-[15px] rounded-[9px] ml-[4px] hover:bg-gray-50"
              >
                <Zap className="w-[19px] h-[19px] text-[#8B8B8B]" />
                <span
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className="font-medium text-[17px] text-[#8B8B8B] leading-normal"
                >
                  Quick List
                </span>
              </Link>
              <Link
                href="/supplier/analytics"
                className="flex items-center gap-[15px] px-[19px] py-[15px] rounded-[9px] ml-[4px] hover:bg-gray-50"
              >
                <BarChart3 className="w-[19px] h-[19px] text-[#8B8B8B]" />
                <span
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className="font-medium text-[17px] text-[#8B8B8B] leading-normal"
                >
                  Performance
                </span>
              </Link>
            </div>
          </div>

          {/* SALES & ORDERS Section */}
          <div className="mb-[23px]">
            <h3
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="font-medium text-[19px] text-black leading-normal mb-[8px] px-[20px]"
            >
              Sales &amp; Orders
            </h3>
            <div className="space-y-0">
              <Link
                href="/supplier/orders"
                className="flex items-center gap-[15px] px-[19px] py-[15px] rounded-[9px] ml-[4px] hover:bg-gray-50"
              >
                <ShoppingCart className="w-[19px] h-[19px] text-[#8B8B8B]" />
                <span
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className="font-medium text-[17px] text-[#8B8B8B] leading-normal"
                >
                  Order Management
                </span>
              </Link>
              <Link
                href="/supplier/dashboard"
                className="flex items-center gap-[15px] px-[19px] py-[15px] rounded-[9px] ml-[4px] hover:bg-gray-50"
              >
                <LayoutDashboard className="w-[19px] h-[19px] text-[#8B8B8B]" />
                <span
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className="font-medium text-[17px] text-[#8B8B8B] leading-normal"
                >
                  Dashboard
                </span>
              </Link>
              <Link
                href="/supplier/payments"
                className="flex items-center gap-[15px] px-[19px] py-[15px] rounded-[9px] ml-[4px] hover:bg-gray-50"
              >
                <CreditCard className="w-[19px] h-[19px] text-[#8B8B8B]" />
                <span
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className="font-medium text-[17px] text-[#8B8B8B] leading-normal"
                >
                  Payments
                </span>
              </Link>
              <Link
                href="/supplier/market-analytics"
                className="flex items-center gap-[15px] px-[19px] py-[15px] rounded-[9px] ml-[4px] hover:bg-gray-50"
              >
                <Eye className="w-[19px] h-[19px] text-[#8B8B8B]" />
                <span
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className="font-medium text-[17px] text-[#8B8B8B] leading-normal"
                >
                  Market Analytics
                </span>
              </Link>
            </div>
          </div>

          {/* ACCOUNT Section */}
          <div className="mb-[23px]">
            <h3
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="font-medium text-[19px] text-black leading-normal mb-[8px] px-[20px]"
            >
              Account
            </h3>
            <div className="space-y-0">
              <Link
                href="/supplier/profile"
                className="flex items-center gap-[15px] px-[19px] py-[15px] rounded-[9px] ml-[4px] hover:bg-gray-50"
              >
                <User className="w-[19px] h-[19px] text-[#8B8B8B]" />
                <span
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className="font-medium text-[17px] text-[#8B8B8B] leading-normal"
                >
                  Profile
                </span>
              </Link>
              <Link
                href="/supplier/settings"
                className="flex items-center gap-[15px] px-[19px] py-[15px] rounded-[9px] ml-[4px] hover:bg-gray-50"
              >
                <Settings className="w-[19px] h-[19px] text-[#8B8B8B]" />
                <span
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className="font-medium text-[17px] text-[#8B8B8B] leading-normal"
                >
                  Settings
                </span>
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-[15px] px-[19px] py-[15px] rounded-[9px] ml-[4px] hover:bg-red-50"
              >
                <LogOut className="w-[19px] h-[19px] text-[#FF0001]" />
                <span
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className="font-medium text-[17px] text-[#FF0001] leading-normal"
                >
                  Sign Out
                </span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Footer Section */}
        <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 w-[255px] bg-[#F0F0F0] rounded-[15px] overflow-hidden">
          <Link
            href="/supplier/contact"
            className="flex items-center gap-[11px] px-[23px] py-[15px] hover:bg-gray-200 transition-colors"
          >
            <AlertCircle className="w-[19px] h-[19px] text-black" />
            <span
              style={{ fontFamily: "Inter, sans-serif" }}
              className="font-medium text-[17px] text-black leading-normal"
            >
              Help &amp; Support
            </span>
          </Link>
          <Link
            href="/feedback"
            className="flex items-center gap-[11px] px-[23px] py-[13px] hover:bg-gray-200 transition-colors"
          >
            <Mail className="w-[18px] h-[18px] text-black" />
            <span
              style={{ fontFamily: "Inter, sans-serif" }}
              className="font-medium text-[17px] text-black leading-normal"
            >
              Sent Feedback
            </span>
          </Link>
        </div>
      </aside>
    </>
  );
}
