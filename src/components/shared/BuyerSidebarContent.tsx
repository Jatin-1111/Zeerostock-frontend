"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getLogoutRedirectUrl } from "@/utils/route.utils";
import {
  FileDown,
  Box,
  Eye,
  Heart,
  Clock,
  Truck,
  User,
  CreditCard,
  Store,
  Settings,
  LogOut,
  AlertCircle,
  Mail,
  ChevronDown,
} from "lucide-react";

export default function BuyerSidebarContent() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await logout();
      const redirectUrl = getLogoutRedirectUrl(pathname);
      router.push(redirectUrl);
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/");
    }
  };

  return (
    <div className="px-1 pb-5">
      {/* SOURCING Section */}
      <div className="mt-[25px] mb-6">
        <h3 className="font-medium text-[12px] text-black leading-normal px-[11px] mb-[20px]">
          Sourcing
        </h3>
        <nav className="space-y-[4px]">
          {/* Dashboard - Active with Dropdown */}
          <div className="relative">
            {/* Green left border for active state */}
            <div className="absolute left-0 top-0 w-1 h-[36px] bg-[#2aae7a] rounded-tr-sm rounded-br-sm" />

            <button
              onClick={() => setDashboardOpen(!dashboardOpen)}
              className="w-full flex items-center gap-[10px] bg-[#eeffef] rounded-tr-[11px] py-[10px] pl-[15px] pr-4 h-[33px] ml-1 relative"
            >
              <div className="w-[12px] h-[12px] shrink-0">
                <FileDown className="w-[12px] h-[12px] text-[#2aae7a]" />
              </div>
              <span className="font-medium text-[11.2px] text-[#2aae7a] leading-normal flex-1 text-left">
                Dashboard
              </span>
              <div className="w-[12px] h-[12px] shrink-0">
                <ChevronDown
                  className={`w-[12px] h-[12px] text-[#2aae7a] transition-transform ${
                    dashboardOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* Dropdown menu */}
            {dashboardOpen && (
              <div className="bg-[#eeffef] border-t border-[#8b8b8b] border-opacity-50 rounded-bl-[11px] rounded-br-[11px] ml-1 overflow-clip">
                <Link
                  href="/buyer/rfq/my-rfqs"
                  className="flex items-center py-[10px] pl-[36px] hover:opacity-80"
                >
                  <span
                    className={`font-medium text-[10px] leading-normal ${
                      pathname === "/buyer/rfq/my-rfqs"
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  >
                    My RFQs
                  </span>
                </Link>
                <Link
                  href="/buyer/rfq/post"
                  className="flex items-center py-[10px] pl-[36px] hover:opacity-80"
                >
                  <span
                    className={`font-medium text-[10px] leading-normal ${
                      pathname === "/buyer/rfq/post"
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  >
                    Post RFQ
                  </span>
                </Link>
                <Link
                  href="/buyer/quotes"
                  className="flex items-center py-[11px] pl-[40px] hover:opacity-80"
                >
                  <span
                    className={`font-medium text-[10.5px] leading-normal ${
                      pathname === "/buyer/quotes"
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  >
                    My Quotes
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Browse Categories */}
          <Link
            href="/marketplace"
            className="flex items-center gap-[10px] rounded-[6px] py-[10px] pl-[15px] pr-4 hover:bg-gray-100"
          >
            <div className="w-[13px] h-[13px] shrink-0">
              <Box className="w-[13px] h-[13px] text-[#8b8b8b]" />
            </div>
            <span className="font-medium text-[11.2px] text-[#8b8b8b] leading-normal">
              Browse Categories
            </span>
          </Link>

          {/* Market Analytics */}
          <Link
            href="/buyer/dashboard"
            className="flex items-center gap-[10px] rounded-[6px] py-[10px] pl-[15px] pr-4 hover:bg-gray-100"
          >
            <div className="w-[13px] h-[13px] shrink-0">
              <Eye className="w-[13px] h-[13px] text-[#8b8b8b]" />
            </div>
            <span className="font-medium text-[11.2px] text-[#8b8b8b] leading-normal">
              Market Analytics
            </span>
          </Link>

          {/* Saved Items */}
          <Link
            href="/buyer/wishlist"
            className="flex items-center gap-[10px] rounded-[6px] py-[10px] pl-[15px] pr-4 hover:bg-gray-100"
          >
            <div className="w-[13px] h-[13px] shrink-0">
              <Heart className="w-[13px] h-[13px] text-[#8b8b8b]" />
            </div>
            <span className="font-medium text-[11.2px] text-[#8b8b8b] leading-normal">
              Saved Items
            </span>
          </Link>
        </nav>
      </div>

      {/* ORDER & ACTIVITY Section */}
      <div className="mb-6">
        <h3 className="font-medium text-[12px] text-black leading-normal px-[11px] mb-[20px]">
          Order & Activity
        </h3>
        <nav className="space-y-[4px]">
          {/* Order History */}
          <Link
            href="/buyer/orders"
            className="flex items-center gap-[10px] rounded-[6px] py-[10px] pl-[15px] pr-4 hover:bg-gray-100"
          >
            <div className="w-[13px] h-[13px] shrink-0">
              <Clock className="w-[13px] h-[13px] text-[#8b8b8b]" />
            </div>
            <span className="font-medium text-[11.2px] text-[#8b8b8b] leading-normal">
              Order History
            </span>
          </Link>

          {/* Track Shipments */}
          <Link
            href="/buyer/track-order"
            className="flex items-center gap-[10px] rounded-[6px] py-[10px] pl-[15px] pr-[4px] hover:bg-gray-100"
          >
            <div className="w-[13px] h-[13px] shrink-0">
              <Truck className="w-[13px] h-[13px] text-[#8b8b8b]" />
            </div>
            <span className="font-medium text-[11.2px] text-[#8b8b8b] leading-normal">
              Track Shipments
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
          {/* Profile */}
          <Link
            href="/buyer/dashboard"
            className="flex items-center gap-[10px] rounded-[6px] py-[10px] pl-[15px] pr-4 hover:bg-gray-100"
          >
            <div className="w-[13px] h-[13px] shrink-0">
              <User className="w-[13px] h-[13px] text-[#8b8b8b]" />
            </div>
            <span className="font-medium text-[11.2px] text-[#8b8b8b] leading-normal">
              Profile
            </span>
          </Link>

          {/* Payment Methods */}
          <Link
            href="/buyer/payments"
            className="flex items-center gap-[10px] rounded-[6px] py-[10px] pl-[15px] pr-4 hover:bg-gray-100"
          >
            <div className="w-[13px] h-[13px] shrink-0">
              <CreditCard className="w-[13px] h-[13px] text-[#8b8b8b]" />
            </div>
            <span className="font-medium text-[11.2px] text-[#8b8b8b] leading-normal">
              Payment Methods
            </span>
          </Link>

          {/* Become Supplier */}
          <Link
            href="/become-supplier"
            className="flex items-center gap-[10px] rounded-[6px] py-[10px] pl-[15px] pr-4 hover:bg-gray-100"
          >
            <div className="w-[13px] h-[13px] shrink-0">
              <Store className="w-[13px] h-[13px] text-[#8b8b8b]" />
            </div>
            <span className="font-medium text-[11.2px] text-[#8b8b8b] leading-normal">
              Become Supplier
            </span>
          </Link>

          {/* Settings */}
          <Link
            href="/buyer/settings"
            className="flex items-center gap-[10px] rounded-[6px] py-[10px] pl-[15px] pr-4 hover:bg-gray-100"
          >
            <div className="w-[13px] h-[13px] shrink-0">
              <Settings className="w-[13px] h-[13px] text-[#8b8b8b]" />
            </div>
            <span className="font-medium text-[11.2px] text-[#8b8b8b] leading-normal">
              Settings
            </span>
          </Link>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-[10px] rounded-[6px] py-[10px] pl-[15px] pr-4 hover:bg-red-50"
          >
            <div className="w-[13px] h-[13px] shrink-0">
              <LogOut className="w-[13px] h-[13px] text-[#ff0001]" />
            </div>
            <span className="font-medium text-[11.2px] text-[#ff0001] leading-normal">
              Sign Out
            </span>
          </button>
        </nav>
      </div>

      {/* Help & Support Card */}
      <div className="mx-auto w-[170px] bg-[#f0f0f0] rounded-[10px] overflow-clip h-[69px] relative">
        <Link
          href="/helpdesk"
          className="flex items-end gap-[7px] absolute left-[15px] top-[15px] hover:opacity-80"
        >
          <div className="w-[12px] h-[12px] shrink-0">
            <AlertCircle className="w-[12px] h-[12px] text-black" />
          </div>
          <span className="font-medium text-[12px] text-black leading-normal">
            Help & Support
          </span>
        </Link>
        <Link
          href="/helpdesk?tab=feedback"
          className="flex items-center gap-[7px] absolute left-[15px] top-[42px] hover:opacity-80"
        >
          <div className="w-[12px] h-[12px] shrink-0">
            <Mail className="w-[12px] h-[12px] text-black" />
          </div>
          <span className="font-medium text-[12px] text-black leading-normal">
            Send Feedback
          </span>
        </Link>
      </div>
    </div>
  );
}
