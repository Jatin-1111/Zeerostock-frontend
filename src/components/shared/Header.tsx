"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const imgUpscaleRe2 =
  "https://www.figma.com/api/mcp/asset/81fa2263-b943-4cba-b6b4-86e7e69d9a8e";
const imgSearchIcon =
  "https://www.figma.com/api/mcp/asset/19d1abc7-b877-483a-a8bd-f78aa1a95c29";
const imgUserIcon =
  "https://www.figma.com/api/mcp/asset/06b18555-08fb-44d8-b78c-4c07fd9914c3";
const imgLanguage =
  "https://www.figma.com/api/mcp/asset/2d3fcf4e-dbc3-41f8-b342-5a5c46cd2b41";
const imgLogosWhatsappIcon =
  "https://www.figma.com/api/mcp/asset/a5fa290d-c3c0-47cb-91f9-f53412b2b3ab";

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/home") return pathname === "/home" || pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 w-full z-50 shadow-[0px_5px_8px_0px_rgba(0,0,0,0.25)] bg-gradient-to-r from-[#1a5f52] via-[#2d7a6b] to-[#1a5f52]">
      <div className="container mx-auto h-[70px] flex items-center justify-between px-20 gap-8">
        {/* Logo - Left Side */}
        <Link href="/" className="shrink-0">
          <img
            src={imgUpscaleRe2}
            alt="Zeerostock"
            className="w-[150px] h-[47px]"
          />
        </Link>

        {/* Right Side - Nav, Search, Icons */}
        <div className="flex items-center gap-8">
          {/* Navigation Links */}
          <nav className="flex items-center gap-[60px]">
            <Link
              href="/home"
              className={`font-semibold text-[20px] leading-normal whitespace-nowrap transition-colors ${
                isActive("/home")
                  ? "text-[#58ea50]"
                  : "text-white hover:text-[#58ea50]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`font-semibold text-[20px] leading-normal whitespace-nowrap transition-colors ${
                isActive("/about")
                  ? "text-[#58ea50]"
                  : "text-white hover:text-[#58ea50]"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/buyer"
              className={`font-semibold text-[20px] leading-normal whitespace-nowrap transition-colors ${
                isActive("/buyer")
                  ? "text-[#58ea50]"
                  : "text-white hover:text-[#58ea50]"
              }`}
            >
              Buyer
            </Link>
            <Link
              href="/supplier"
              className={`font-semibold text-[20px] leading-normal whitespace-nowrap transition-colors ${
                isActive("/supplier")
                  ? "text-[#58ea50]"
                  : "text-white hover:text-[#58ea50]"
              }`}
            >
              Suppliers
            </Link>
            <Link
              href="/roi"
              className={`font-semibold text-[20px] leading-normal whitespace-nowrap transition-colors ${
                isActive("/roi")
                  ? "text-[#58ea50]"
                  : "text-white hover:text-[#58ea50]"
              }`}
            >
              ROI
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="bg-white rounded-[60px] flex items-center shrink-0">
            <div className="flex items-center pl-4 pr-2">
              <img src={imgSearchIcon} alt="" className="w-[15px] h-[15px]" />
            </div>
            <input
              type="text"
              placeholder="Search Industrial Equipment, etc"
              className="font-semibold text-[11px] text-[#bababa] leading-normal py-2 pr-4 bg-transparent border-none outline-none placeholder:text-[#bababa] w-[200px]"
            />
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-[18px] shrink-0">
            {/* Language Selector */}
            <button className="flex items-center hover:opacity-80 transition-opacity">
              <img src={imgLanguage} alt="" className="w-5 h-5" />
              <span className="font-normal text-[18px] text-white leading-5 tracking-[0.1px] ml-1.5">
                EN
              </span>
            </button>

            {/* WhatsApp */}
            <Link
              href="https://wa.me/"
              target="_blank"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src={imgLogosWhatsappIcon}
                alt="WhatsApp"
                className="w-[30px] h-[30px]"
              />
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="bg-[#0a2540] rounded-full flex items-center justify-center p-2.5 hover:bg-[#0d2f52] transition-colors"
              >
                <img src={imgUserIcon} alt="User" className="w-6 h-6" />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-gray-900 rounded shadow-lg z-20">
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      <Link
                        href="/buyer/settings"
                        className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <hr className="my-1 border-gray-200" />
                      <Link
                        href="/login"
                        className="block px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Sign Out
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
