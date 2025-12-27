"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Box,
  TrendingUp,
  MessageCircle,
  ShoppingCart,
  Settings,
  Building2,
  HelpCircle,
  DollarSign,
  ArrowLeft,
  Star,
  AlertCircle,
  Mail,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export default function Sidebar({
  isOpen: externalIsOpen,
  onToggle,
}: SidebarProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

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

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={handleToggle}
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
        className={`fixed lg:sticky top-0 left-0 h-screen lg:h-[calc(100vh-73px)] w-[300px] bg-white shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 overflow-y-auto lg:top-[73px]`}
      >
        {/* Header */}
        <div className="h-[60px] flex items-center justify-center border-b border-[#8b8b8b] relative">
          <h2 className="font-['Poppins',sans-serif] font-medium text-[20px] text-[#1e3a8a] leading-normal">
            Explore Zeerostock
          </h2>
          <button
            className="absolute right-[21px] w-[21px] h-[21px]"
            onClick={handleToggle}
          >
            <ArrowLeft className="w-[21px] h-[21px] text-[#1e3a8a]" />
          </button>
        </div>

        <div className="px-[4px] pb-[28px]">
          {/* EXPLORE PRODUCTS Section */}
          <div className="mt-[37px] mb-[32px]">
            <h3 className="font-['Poppins',sans-serif] font-medium text-[19px] text-black leading-normal px-[20px] mb-[29px]">
              Explore Products
            </h3>
            <nav className="space-y-[5px]">
              {/* Browse Categories - Active */}
              <div className="relative h-[53px]">
                <div className="absolute left-0 top-0 w-[4px] h-[53px] bg-[#2aae7a] rounded-tr-[4px] rounded-br-[4px]" />
                <Link
                  href="#"
                  className="flex items-center gap-[15px] bg-[#eeffef] rounded-[9px] py-[15px] pl-[23px] pr-[53px] h-[50px] ml-[4px] relative"
                >
                  <div className="w-[19px] h-[19px] flex-shrink-0">
                    <Box className="w-[19px] h-[19px] text-[#2aae7a]" />
                  </div>
                  <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-[#2aae7a] leading-normal">
                    Browse Categories
                  </span>
                  <div className="absolute right-[9px] top-[15px] bg-[#2aae7a] rounded-[60px] px-[4px] py-0">
                    <span className="font-['Poppins',sans-serif] font-medium text-[8px] text-[#eeffef] leading-normal">
                      45 Active
                    </span>
                  </div>
                </Link>
              </div>

              {/* Trending Items */}
              <Link
                href="#"
                className="flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-[20px] hover:bg-gray-100"
              >
                <div className="w-[19px] h-[19px] flex-shrink-0">
                  <TrendingUp className="w-[19px] h-[19px] text-[#8b8b8b]" />
                </div>
                <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-[#8b8b8b] leading-normal">
                  Trending Items
                </span>
              </Link>

              {/* Featured Deals */}
              <Link
                href="#"
                className="flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-[20px] hover:bg-gray-100"
              >
                <div className="w-[19px] h-[19px] flex-shrink-0">
                  <Star className="w-[19px] h-[19px] text-[#8b8b8b]" />
                </div>
                <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-[#8b8b8b] leading-normal">
                  Featured Deals
                </span>
              </Link>
            </nav>
          </div>

          {/* GET STARTED Section */}
          <div className="mb-[32px]">
            <h3 className="font-['Poppins',sans-serif] font-medium text-[19px] text-black leading-normal px-[20px] mb-[29px]">
              Get Started
            </h3>
            <nav className="space-y-[5px]">
              {/* For Buyers */}
              <Link
                href="/for-buyer"
                className="flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-[20px] hover:bg-gray-100"
              >
                <div className="w-[19px] h-[19px] flex-shrink-0">
                  <ShoppingCart className="w-[19px] h-[19px] text-[#8b8b8b]" />
                </div>
                <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-[#8b8b8b] leading-normal">
                  For Buyers
                </span>
              </Link>

              {/* For Suppliers */}
              <Link
                href="/for-supplier"
                className="flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-[20px] hover:bg-gray-100"
              >
                <div className="w-[18px] h-[19px] flex-shrink-0">
                  <Building2 className="w-[18px] h-[19px] text-[#8b8b8b]" />
                </div>
                <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-[#8b8b8b] leading-normal">
                  For Suppliers
                </span>
              </Link>

              {/* How It Works */}
              <Link
                href="#"
                className="flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[22px] pr-[20px] hover:bg-gray-100"
              >
                <div className="w-[19px] h-[19px] flex-shrink-0 overflow-clip">
                  <HelpCircle className="w-[19px] h-[19px] text-[#8b8b8b]" />
                </div>
                <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-[#8b8b8b] leading-normal">
                  How It Works
                </span>
              </Link>
            </nav>
          </div>

          {/* RESOURCES Section */}
          <div className="mb-[32px]">
            <h3 className="font-['Poppins',sans-serif] font-medium text-[19px] text-black leading-normal px-[20px] mb-[29px]">
              Resources
            </h3>
            <nav className="space-y-[5px]">
              {/* Pricing */}
              <Link
                href="#"
                className="flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-[20px] hover:bg-gray-100"
              >
                <div className="w-[19px] h-[19px] flex-shrink-0 overflow-clip">
                  <DollarSign className="w-[19px] h-[19px] text-[#8b8b8b]" />
                </div>
                <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-[#8b8b8b] leading-normal">
                  Pricing
                </span>
              </Link>

              {/* Contact Us */}
              <Link
                href="#"
                className="flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-[20px] hover:bg-gray-100"
              >
                <div className="w-[19px] h-[19px] flex-shrink-0">
                  <MessageCircle className="w-[19px] h-[19px] text-[#8b8b8b]" />
                </div>
                <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-[#8b8b8b] leading-normal">
                  Contact Us
                </span>
              </Link>

              {/* Settings */}
              <Link
                href="#"
                className="flex items-center gap-[15px] rounded-[9px] py-[15px] pl-[23px] pr-[20px] hover:bg-gray-100"
              >
                <div className="w-[19px] h-[19px] flex-shrink-0">
                  <Settings className="w-[19px] h-[19px] text-[#8b8b8b]" />
                </div>
                <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-[#8b8b8b] leading-normal">
                  Settings
                </span>
              </Link>
            </nav>
          </div>

          {/* Help & Support Card */}
          <div className="mx-auto w-[255px] bg-[#f0f0f0] rounded-[15px] overflow-clip h-[104px] relative">
            <Link
              href="/helpdesk"
              className="flex items-end gap-[11px] absolute left-[23px] top-[23px] hover:opacity-80"
            >
              <div className="w-[19px] h-[19px] flex-shrink-0">
                <AlertCircle className="w-[19px] h-[19px] text-black" />
              </div>
              <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-black leading-normal">
                Help & Support
              </span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-[11px] absolute left-[23px] top-[62px] hover:opacity-80"
            >
              <div className="w-[18px] h-[18px] flex-shrink-0">
                <Mail className="w-[18px] h-[18px] text-black" />
              </div>
              <span className="font-['Poppins',sans-serif] font-medium text-[17px] text-black leading-normal">
                Sent Feedback
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/80 bg-opacity-50 z-30"
          onClick={handleToggle}
        />
      )}
    </>
  );
}
