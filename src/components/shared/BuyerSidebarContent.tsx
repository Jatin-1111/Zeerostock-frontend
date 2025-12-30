"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation"; // 👈 Add usePathname
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
  const pathname = usePathname(); // 👈 Get current path
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    }
  };

  return (
    <div className="px-1 pb-7">
      {/* SOURCING Section */}
      <div className="mt-[37px] mb-8">
        <h3 className="font-['Poppins',sans-serif] font-medium text-[19px] text-black leading-normal px-5 mb-[29px]">
          Sourcing
        </h3>
        <nav className="space-y-[5px]">
          {/* Dashboard - Active with Dropdown */}
          <div className="relative">
            {/* Green left border for active state */}
            <div className="absolute left-0 top-0 w-1 h-[53px] bg-[#2aae7a] rounded-tr-sm rounded-br-sm" />

            <button
              onClick={() => setDashboardOpen(!dashboardOpen)}
              className="w-full flex items-center gap-[15px] bg-[#eeffef] rounded-tr-[15px] py-[15px] pl-[23px] pr-5 h-[50px] ml-1 relative"
            >
              <div className="w-[18px] h-[18px] shrink-0">
                <FileDown className="w-[18px] h-[18px] text-[#2aae7a]" />
              </div>
              <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-[#2aae7a] leading-normal flex-1 text-left">
                Dashboard
              </span>
              <div className="w-[18px] h-[18px] shrink-0">
                <ChevronDown
                  className={`w-[18px] h-[18px] text-[#2aae7a] transition-transform ${
                    dashboardOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* Dropdown menu */}
            {dashboardOpen && (
              <div className="bg-[#eeffef] border-t border-[#8b8b8b] border-opacity-50 rounded-bl-[15px] rounded-br-[15px] ml-1 overflow-clip">
                <Link
                  href="/buyer/rfq/my-rfqs"
                  className="flex items-center py-[15px] pl-[53px] hover:opacity-80"
                >
                  <span
                    className={`font-['Poppins',sans-serif] font-medium text-[14px] leading-normal ${
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
                  className="flex items-center py-[15px] pl-[53px] hover:opacity-80"
                >
                  <span
                    className={`font-['Poppins',sans-serif] font-medium text-[14px] leading-normal ${
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
                  className="flex items-center py-[15px] pl-[53px] hover:opacity-80"
                >
                  <span
                    className={`font-['Poppins',sans-serif] font-medium text-[14px] leading-normal ${
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
            className="flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-5 hover:bg-gray-100"
          >
            <div className="w-[19px] h-[19px] shrink-0">
              <Box className="w-[19px] h-[19px] text-[#8b8b8b]" />
            </div>
            <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-[#8b8b8b] leading-normal">
              Browse Categories
            </span>
          </Link>

          {/* Market Analytics */}
          <Link
            href="/buyer/dashboard"
            className="flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-5 hover:bg-gray-100"
          >
            <div className="w-[19px] h-[19px] shrink-0">
              <Eye className="w-[19px] h-[19px] text-[#8b8b8b]" />
            </div>
            <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-[#8b8b8b] leading-normal">
              Market Analytics
            </span>
          </Link>

          {/* Saved Items */}
          <Link
            href="/buyer/wishlist"
            className="flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-5 hover:bg-gray-100"
          >
            <div className="w-[19px] h-[19px] shrink-0">
              <Heart className="w-[19px] h-[19px] text-[#8b8b8b]" />
            </div>
            <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-[#8b8b8b] leading-normal">
              Saved Items
            </span>
          </Link>
        </nav>
      </div>

      {/* ORDER & ACTIVITY Section */}
      <div className="mb-8">
        <h3 className="font-['Poppins',sans-serif] font-medium text-[19px] text-black leading-normal px-5 mb-[29px]">
          Order & Activity
        </h3>
        <nav className="space-y-[5px]">
          {/* Order History */}
          <Link
            href="/buyer/orders"
            className="flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-5 hover:bg-gray-100"
          >
            <div className="w-[19px] h-[19px] shrink-0">
              <Clock className="w-[19px] h-[19px] text-[#8b8b8b]" />
            </div>
            <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-[#8b8b8b] leading-normal">
              Order History
            </span>
          </Link>

          {/* Track Shipments */}
          <Link
            href="/buyer/track-order"
            className="flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-5 hover:bg-gray-100"
          >
            <div className="w-[19px] h-[19px] shrink-0">
              <Truck className="w-[19px] h-[19px] text-[#8b8b8b]" />
            </div>
            <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-[#8b8b8b] leading-normal">
              Track Shipments
            </span>
          </Link>
        </nav>
      </div>

      {/* ACCOUNT Section */}
      <div className="mb-8">
        <h3 className="font-['Poppins',sans-serif] font-medium text-[19px] text-black leading-normal px-5 mb-[29px]">
          Account
        </h3>
        <nav className="space-y-[5px]">
          {/* Profile */}
          <Link
            href="/buyer/dashboard"
            className="flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-5 hover:bg-gray-100"
          >
            <div className="w-[19px] h-[19px] shrink-0">
              <User className="w-[19px] h-[19px] text-[#8b8b8b]" />
            </div>
            <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-[#8b8b8b] leading-normal">
              Profile
            </span>
          </Link>

          {/* Payment Methods */}
          <Link
            href="/buyer/payments"
            className="flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-5 hover:bg-gray-100"
          >
            <div className="w-[19px] h-[19px] shrink-0">
              <CreditCard className="w-[19px] h-[19px] text-[#8b8b8b]" />
            </div>
            <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-[#8b8b8b] leading-normal">
              Payment Methods
            </span>
          </Link>

          {/* Become Supplier */}
          <Link
            href="/become-supplier"
            className="flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-5 hover:bg-gray-100"
          >
            <div className="w-[19px] h-[19px] shrink-0">
              <Store className="w-[19px] h-[19px] text-[#8b8b8b]" />
            </div>
            <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-[#8b8b8b] leading-normal">
              Become Supplier
            </span>
          </Link>

          {/* Settings */}
          <Link
            href="/buyer/settings"
            className="flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-5 hover:bg-gray-100"
          >
            <div className="w-[19px] h-[19px] shrink-0">
              <Settings className="w-[19px] h-[19px] text-[#8b8b8b]" />
            </div>
            <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-[#8b8b8b] leading-normal">
              Settings
            </span>
          </Link>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-5 hover:bg-red-50"
          >
            <div className="w-[19px] h-[19px] shrink-0">
              <LogOut className="w-[19px] h-[19px] text-[#ff0001]" />
            </div>
            <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-[#ff0001] leading-normal">
              Sign Out
            </span>
          </button>
        </nav>
      </div>

      {/* Help & Support Card */}
      <div className="mx-auto w-[255px] bg-[#f0f0f0] rounded-[15px] overflow-clip h-[104px] relative">
        <Link
          href="/help-support"
          className="flex items-end gap-[11px] absolute left-[23px] top-[23px] hover:opacity-80"
        >
          <div className="w-[19px] h-[19px] shrink-0">
            <AlertCircle className="w-[19px] h-[19px] text-black" />
          </div>
          <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-black leading-normal">
            Help & Support
          </span>
        </Link>
        <Link
          href="/help-support"
          className="flex items-center gap-[11px] absolute left-[23px] top-[62px] hover:opacity-80"
        >
          <div className="w-[18px] h-[18px] shrink-0">
            <Mail className="w-[18px] h-[18px] text-black" />
          </div>
          <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-black leading-normal">
            Sent Feedback
          </span>
        </Link>
      </div>
    </div>
  );
}
