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
  const [activeItem, setActiveItem] = useState("browse-categories");

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
        className="lg:hidden fixed top-3 left-3 z-50 p-1.5 border border-white rounded-lg"
      >
        <svg
          className="w-[18px] h-[18px]"
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
        className={`fixed lg:sticky top-0 left-0 h-screen lg:h-[calc(100vh-55px)] w-[245px] bg-white shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 overflow-y-auto lg:top-[55px]`}
      >
        {/* Header */}
        <div className="h-[45px] flex items-center justify-center border-b border-[#8b8b8b] relative">
          <h2 className="font-medium text-[15px] text-[#1e3a8a] leading-normal">
            Explore Zeerostock
          </h2>
          <button
            className="absolute right-[16px] w-[16px] h-[16px]"
            onClick={handleToggle}
          >
            <ArrowLeft className="w-[16px] h-[16px] text-[#1e3a8a]" />
          </button>
        </div>

        <div className="px-[3px] pb-[21px]">
          {/* EXPLORE PRODUCTS Section */}
          <div className="mt-[28px] mb-6">
            <h3 className="font-medium text-[14px] text-black leading-normal px-3 mb-[22px]">
              Explore Products
            </h3>
            <nav className="space-y-[4px]">
              {/* Browse Categories */}
              <div className="relative h-[40px]">
                {activeItem === "browse-categories" && (
                  <div className="absolute left-0 top-0 w-[3px] h-[40px] bg-[#2aae7a] rounded-tr-1 rounded-br-sm" />
                )}
                <Link
                  href="/marketplace"
                  onClick={() => setActiveItem("browse-categories")}
                  className={`flex items-center gap-[11px] rounded-[7px] py-[11px] pl-[17px] pr-[40px] h-[37.5px] ml-[3px] relative ${
                    activeItem === "browse-categories"
                      ? "bg-[#eeffef]"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="w-[14px] h-[14px] flex-shrink-0">
                    <Box
                      className={`w-[14px] h-[14px] ${
                        activeItem === "browse-categories"
                          ? "text-[#2aae7a]"
                          : "text-[#8b8b8b]"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-medium text-[13px] leading-normal ${
                      activeItem === "browse-categories"
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  >
                    Browse Categories
                  </span>
                  <div
                    className={`absolute right-[7px] rounded-[60px] px-[3px] py-0 ${
                      activeItem === "browse-categories"
                        ? "bg-[#2aae7a]"
                        : "bg-[#8b8b8b]"
                    }`}
                  >
                    <span
                      className={`font-medium text-[8px] leading-normal ${
                        activeItem === "browse-categories"
                          ? "text-[#eeffef]"
                          : "text-white"
                      }`}
                    >
                      45 Active
                    </span>
                  </div>
                </Link>
              </div>

              {/* Trending Items */}
              <div className="relative h-[40px]">
                {activeItem === "trending-items" && (
                  <div className="absolute left-0 top-0 w-[3px] h-[40px] bg-[#2aae7a] rounded-tr-[3px] rounded-br-[3px]" />
                )}
                <Link
                  href="/marketplace?filter=trending"
                  onClick={() => setActiveItem("trending-items")}
                  className={`flex items-center gap-[11px] rounded-[7px] py-[11px] pl-[17px] pr-[15px] ml-[3px] ${
                    activeItem === "trending-items"
                      ? "bg-[#eeffef]"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="w-[14px] h-[14px] flex-shrink-0">
                    <TrendingUp
                      className={`w-[14px] h-[14px] ${
                        activeItem === "trending-items"
                          ? "text-[#2aae7a]"
                          : "text-[#8b8b8b]"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-medium text-[13px] leading-normal ${
                      activeItem === "trending-items"
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  >
                    Trending Items
                  </span>
                </Link>
              </div>

              {/* Featured Deals */}
              <div className="relative h-[40px]">
                {activeItem === "featured-deals" && (
                  <div className="absolute left-0 top-0 w-[3px] h-[40px] bg-[#2aae7a] rounded-tr-[3px] rounded-br-[3px]" />
                )}
                <Link
                  href="/marketplace?filter=featured"
                  onClick={() => setActiveItem("featured-deals")}
                  className={`flex items-center gap-[11px] rounded-[7px] py-[11px] pl-[17px] pr-[15px] ml-[3px] ${
                    activeItem === "featured-deals"
                      ? "bg-[#eeffef]"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="w-[14px] h-[14px] flex-shrink-0">
                    <Star
                      className={`w-[14px] h-[14px] ${
                        activeItem === "featured-deals"
                          ? "text-[#2aae7a]"
                          : "text-[#8b8b8b]"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-medium text-[13px] leading-normal ${
                      activeItem === "featured-deals"
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  >
                    Featured Deals
                  </span>
                </Link>
              </div>
            </nav>
          </div>

          {/* GET STARTED Section */}
          <div className="mb-[24px]">
            <h3 className="font-medium text-[14px] text-black leading-normal px-[15px] mb-[22px]">
              Get Started
            </h3>
            <nav className="space-y-[4px]">
              {/* For Buyers */}
              <div className="relative h-[40px]">
                {activeItem === "for-buyers" && (
                  <div className="absolute left-0 top-0 w-[3px] h-[40px] bg-[#2aae7a] rounded-tr-[3px] rounded-br-[3px]" />
                )}
                <Link
                  href="/for-buyer"
                  onClick={() => setActiveItem("for-buyers")}
                  className={`flex items-center gap-[11px] rounded-[7px] py-[11px] pl-[17px] pr-[15px] ml-[3px] ${
                    activeItem === "for-buyers"
                      ? "bg-[#eeffef]"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="w-[14px] h-[14px] flex-shrink-0">
                    <ShoppingCart
                      className={`w-[14px] h-[14px] ${
                        activeItem === "for-buyers"
                          ? "text-[#2aae7a]"
                          : "text-[#8b8b8b]"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-medium text-[13px] leading-normal ${
                      activeItem === "for-buyers"
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  >
                    For Buyers
                  </span>
                </Link>
              </div>

              {/* For Suppliers */}
              <div className="relative h-[40px]">
                {activeItem === "for-suppliers" && (
                  <div className="absolute left-0 top-0 w-[3px] h-[40px] bg-[#2aae7a] rounded-tr-[3px] rounded-br-[3px]" />
                )}
                <Link
                  href="/for-supplier"
                  onClick={() => setActiveItem("for-suppliers")}
                  className={`flex items-center gap-[11px] rounded-[7px] py-[11px] pl-[17px] pr-[15px] ml-[3px] ${
                    activeItem === "for-suppliers"
                      ? "bg-[#eeffef]"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="w-[13.5px] h-[14px] flex-shrink-0">
                    <Building2
                      className={`w-[13.5px] h-[14px] ${
                        activeItem === "for-suppliers"
                          ? "text-[#2aae7a]"
                          : "text-[#8b8b8b]"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-medium text-[13px] leading-normal ${
                      activeItem === "for-suppliers"
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  >
                    For Suppliers
                  </span>
                </Link>
              </div>

              {/* How It Works */}
              <div className="relative h-[40px]">
                {activeItem === "how-it-works" && (
                  <div className="absolute left-0 top-0 w-[3px] h-[40px] bg-[#2aae7a] rounded-tr-sm rounded-br-sm" />
                )}
                <Link
                  href="/about"
                  onClick={() => setActiveItem("how-it-works")}
                  className={`flex items-center gap-[11px] rounded-[7px] py-[11px] pl-[17px] pr-4 ml-[3px] ${
                    activeItem === "how-it-works"
                      ? "bg-[#eeffef]"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="w-[14px] h-[14px] shrink-0 overflow-clip">
                    <HelpCircle
                      className={`w-[14px] h-[14px] ${
                        activeItem === "how-it-works"
                          ? "text-[#2aae7a]"
                          : "text-[#8b8b8b]"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-medium text-[13px] leading-normal ${
                      activeItem === "how-it-works"
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  >
                    How It Works
                  </span>
                </Link>
              </div>
            </nav>
          </div>

          {/* RESOURCES Section */}
          <div className="mb-[24px]">
            <h3 className="font-medium text-[14px] text-black leading-normal px-[15px] mb-[22px]">
              Resources
            </h3>
            <nav className="space-y-[4px]">
              {/* Pricing */}
              <div className="relative h-[40px]">
                {activeItem === "pricing" && (
                  <div className="absolute left-0 top-0 w-[3px] h-[40px] bg-[#2aae7a] rounded-tr-[3px] rounded-br-[3px]" />
                )}
                <Link
                  href="/pricing"
                  onClick={() => setActiveItem("pricing")}
                  className={`flex items-center gap-[11px] rounded-[7px] py-[11px] pl-[17px] pr-[15px] ml-[3px] ${
                    activeItem === "pricing"
                      ? "bg-[#eeffef]"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="w-[14px] h-[14px] flex-shrink-0 overflow-clip">
                    <DollarSign
                      className={`w-[14px] h-[14px] ${
                        activeItem === "pricing"
                          ? "text-[#2aae7a]"
                          : "text-[#8b8b8b]"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-medium text-[13px] leading-normal ${
                      activeItem === "pricing"
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  >
                    Pricing
                  </span>
                </Link>
              </div>

              {/* Contact Us */}
              <div className="relative h-[40px]">
                {activeItem === "contact-us" && (
                  <div className="absolute left-0 top-0 w-[3px] h-[40px] bg-[#2aae7a] rounded-tr-[3px] rounded-br-[3px]" />
                )}
                <Link
                  href="/helpdesk"
                  onClick={() => setActiveItem("contact-us")}
                  className={`flex items-center gap-[11px] rounded-[7px] py-[11px] pl-[17px] pr-[15px] ml-[3px] ${
                    activeItem === "contact-us"
                      ? "bg-[#eeffef]"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="w-[14px] h-[14px] flex-shrink-0">
                    <MessageCircle
                      className={`w-[14px] h-[14px] ${
                        activeItem === "contact-us"
                          ? "text-[#2aae7a]"
                          : "text-[#8b8b8b]"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-medium text-[13px] leading-normal ${
                      activeItem === "contact-us"
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  >
                    Contact Us
                  </span>
                </Link>
              </div>

              {/* Settings */}
              <div className="relative h-[40px]">
                {activeItem === "settings" && (
                  <div className="absolute left-0 top-0 w-[3px] h-[40px] bg-[#2aae7a] rounded-tr-[3px] rounded-br-[3px]" />
                )}
                <Link
                  href="/buyer/settings"
                  onClick={() => setActiveItem("settings")}
                  className={`flex items-center gap-[11px] rounded-[7px] py-[11px] pl-[17px] pr-[15px] ml-[3px] ${
                    activeItem === "settings"
                      ? "bg-[#eeffef]"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="w-[14px] h-[14px] flex-shrink-0">
                    <Settings
                      className={`w-[14px] h-[14px] ${
                        activeItem === "settings"
                          ? "text-[#2aae7a]"
                          : "text-[#8b8b8b]"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-medium text-[13px] leading-normal ${
                      activeItem === "settings"
                        ? "text-[#2aae7a]"
                        : "text-[#8b8b8b]"
                    }`}
                  >
                    Settings
                  </span>
                </Link>
              </div>
            </nav>
          </div>

          {/* Help & Support Card */}
          <div className="mx-auto w-[191px] bg-[#f0f0f0] rounded-[11px] overflow-clip h-[78px] relative">
            <Link
              href="/helpdesk"
              className="flex items-end gap-[8px] absolute left-[17px] top-[17px] hover:opacity-80"
            >
              <div className="w-[14px] h-[14px] flex-shrink-0">
                <AlertCircle className="w-[14px] h-[14px] text-black" />
              </div>
              <span className="font-medium text-[13px] text-black leading-normal">
                Help & Support
              </span>
            </Link>
            <Link
              href="/helpdesk?tab=feedback"
              className="flex items-center gap-[8px] absolute left-[17px] top-[47px] hover:opacity-80"
            >
              <div className="w-[13.5px] h-[13.5px] flex-shrink-0">
                <Mail className="w-[13.5px] h-[13.5px] text-black" />
              </div>
              <span className="font-medium text-[13px] text-black leading-normal">
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
          onClick={handleToggle}
        />
      )}
    </>
  );
}
