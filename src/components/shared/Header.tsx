"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { getLogoutRedirectUrl } from "@/utils/route.utils";
import {
  Globe,
  User,
  Menu,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Settings,
  LogOut,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EnhancedSearchInput from "@/components/search/EnhancedSearchInput";

interface HeaderProps {
  onSidebarToggle?: () => void;
}

export default function Header({ onSidebarToggle }: HeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === "/home") return pathname === "/home" || pathname === "/";
    return pathname.startsWith(path);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
      const redirectUrl = getLogoutRedirectUrl(pathname);
      router.push(redirectUrl);
    } catch {
      toast.error("Failed to logout");
    }
  };

  return (
    <header className="sticky top-0 w-full z-50 shadow-[0px_5px_8px_0px_rgba(0,0,0,0.25)] bg-linear-to-b from-[#43C786] to-[#0A2540]">
      {/* Changed px scaling to handle medium screens better.
        Container prevents content from touching edges.
      */}
      <div className="container mx-auto h-[60px] flex items-center justify-between px-4 sm:px-6 lg:px-[150px]">
        {/* Left Side: Sidebar Toggle + Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Sidebar Menu Button */}
          <button
            onClick={onSidebarToggle}
            className="p-2 hover:bg-white/10 rounded transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-[20px] h-[20px] text-white" />
          </button>

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="https://zeerostock-assets.s3.ap-south-1.amazonaws.com/Assets/Zeerostock Logo-1.svg"
              alt="Zeerostock"
              width={143}
              height={40}
              className="w-[120px] sm:w-[130px] md:w-[142.5px]"
              unoptimized
              priority
            />
          </Link>
        </div>

        {/* Center Group: Navigation + Search 
          CHANGED: 'hidden md:flex' -> 'hidden lg:flex' 
          This hides the big nav on medium screens (tablets) to prevent overflow.
        */}
        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex items-center gap-[45px]">
            <Link
              href="/home"
              className={`font-semibold text-[15px] leading-normal whitespace-nowrap transition-colors ${
                isActive("/home")
                  ? "text-[#58ea50]"
                  : "text-white hover:text-[#58ea50]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`font-semibold text-[15px] leading-normal whitespace-nowrap transition-colors ${
                isActive("/about")
                  ? "text-[#58ea50]"
                  : "text-white hover:text-[#58ea50]"
              }`}
            >
              About Us
            </Link>

            {(!isAuthenticated || user?.activeRole !== "supplier") && (
              <Link
                href={isAuthenticated ? "/buyer/dashboard" : "/for-buyer"}
                className={`font-semibold text-[15px] leading-normal whitespace-nowrap transition-colors ${
                  isActive("/buyer")
                    ? "text-[#58ea50]"
                    : "text-white hover:text-[#58ea50]"
                }`}
              >
                Buyer
              </Link>
            )}

            {(!isAuthenticated || user?.activeRole !== "buyer") && (
              <Link
                href={isAuthenticated ? "/supplier/dashboard" : "/for-supplier"}
                className={`font-semibold text-[15px] leading-normal whitespace-nowrap transition-colors ${
                  isActive("/supplier")
                    ? "text-[#58ea50]"
                    : "text-white hover:text-[#58ea50]"
                }`}
              >
                Suppliers
              </Link>
            )}
            <Link
              href="/roi"
              className={`font-semibold text-[15px] leading-normal whitespace-nowrap transition-colors ${
                isActive("/roi")
                  ? "text-[#58ea50]"
                  : "text-white hover:text-[#58ea50]"
              }`}
            >
              ROI
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="w-[220px]">
            <EnhancedSearchInput
              placeholder="Search Industrial Equipment, etc"
              className="rounded-full text-[13px] font-semibold py-1"
              showPopularSearches={false}
            />
          </div>
        </div>

        {/* Right Side: Mobile Menu + Language + User */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Mobile Menu Dropdown Button 
             CHANGED: 'md:hidden' -> 'lg:hidden'
             Shows this button on medium screens now.
          */}
          <div className="relative lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-white/10 rounded transition-colors"
              aria-label="Toggle mobile menu"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <ChevronUp className="w-[20px] h-[20px] text-white" />
                ) : (
                  <ChevronDown className="w-[20px] h-[20px] text-white" />
                )}
              </motion.div>
            </button>

            {/* Mobile Dropdown Menu Content */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-[200px] bg-white border-2 border-gray-200 rounded-lg shadow-lg z-50"
                >
                  <div className="py-2">
                    <Link
                      href="/home"
                      className={`block px-4 py-2.5 text-sm font-semibold transition-colors ${
                        isActive("/home")
                          ? "text-[#58ea50] bg-gray-50"
                          : "text-gray-900 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      href="/about"
                      className={`block px-4 py-2.5 text-sm font-semibold transition-colors ${
                        isActive("/about")
                          ? "text-[#58ea50] bg-gray-50"
                          : "text-gray-900 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      About Us
                    </Link>
                    {(!isAuthenticated || user?.activeRole !== "supplier") && (
                      <Link
                        href={
                          isAuthenticated ? "/buyer/dashboard" : "/for-buyers"
                        }
                        className={`block px-4 py-2.5 text-sm font-semibold transition-colors ${
                          isActive("/buyer")
                            ? "text-[#58ea50] bg-gray-50"
                            : "text-gray-900 hover:bg-gray-50"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Buyer
                      </Link>
                    )}
                    {(!isAuthenticated || user?.activeRole !== "buyer") && (
                      <Link
                        href={
                          isAuthenticated
                            ? "/supplier/dashboard"
                            : "/for-supplier"
                        }
                        className={`block px-4 py-2.5 text-sm font-semibold transition-colors ${
                          isActive("/supplier")
                            ? "text-[#58ea50] bg-gray-50"
                            : "text-gray-900 hover:bg-gray-50"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Suppliers
                      </Link>
                    )}
                    <Link
                      href="/roi"
                      className={`block px-4 py-2.5 text-sm font-semibold transition-colors ${
                        isActive("/roi")
                          ? "text-[#58ea50] bg-gray-50"
                          : "text-gray-900 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      ROI
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Language Selector (Desktop Only -> Hidden on Medium) */}
          <button
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Change language"
          >
            <Globe className="w-[16px] h-[16px] text-white" />
            <span className="text-white text-[10.5px] font-medium">EN</span>
          </button>

          {/* WhatsApp (Desktop Only -> Hidden on Medium) */}
          <Link
            href="https://wa.me/918956835375"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex w-[27px] md:w-[29px] h-[27px] md:h-[29px] bg-[#25D366] rounded-full items-center justify-center hover:bg-[#25D366]/90 transition-colors"
            aria-label="Contact us on WhatsApp"
          >
            <svg
              className="w-[14px] md:w-4 h-[14px] md:h-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </Link>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="bg-[#0a2540] rounded-full flex items-center justify-center p-1.5 sm:p-2 hover:bg-[#0d2f52] transition-colors"
            >
              <User className="w-[16px] h-[16px] text-white" />
            </button>

            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-1.5 w-[168px] bg-white border-2 border-gray-200 rounded-lg shadow-lg z-50"
                >
                  {isAuthenticated && user ? (
                    // Logged In User Menu
                    <div className="py-1.5">
                      <div className="px-3 py-2 border-b border-gray-200">
                        <p className="text-[10.5px] font-semibold text-gray-900">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-[9px] text-gray-600 truncate">
                          {user.email}
                        </p>
                      </div>

                      <div className="py-1">
                        <Link
                          href={`/${user.activeRole}/dashboard`}
                          className="flex items-center gap-2 px-3 py-2 text-[10.5px] text-gray-900 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <LayoutDashboard className="w-[14px] h-[14px]" />
                          Dashboard
                        </Link>
                        <Link
                          href={`/${user.activeRole}/settings`}
                          className="flex items-center gap-2 px-3 py-2 text-[10.5px] text-gray-900 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="w-[14px] h-[14px]" />
                          Settings
                        </Link>
                      </div>

                      <hr className="my-1 border-gray-200" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-[10.5px] text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-[14px] h-[14px]" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    // Logged Out User Menu
                    <div className="py-1.5">
                      <div className="px-3 py-2 border-b border-gray-200">
                        <p className="text-[10.5px] font-semibold text-gray-900">
                          Welcome to Zeerostock
                        </p>
                        <p className="text-[9px] text-gray-600">
                          Sign in to access your account
                        </p>
                      </div>

                      <div className="p-2 space-y-1.5">
                        <Link
                          href="/login"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block w-full px-3 py-1.5 text-[10.5px] font-medium text-white bg-[#1a5f52] hover:bg-[#164b42] rounded-lg transition-colors text-center"
                        >
                          Login
                        </Link>
                        <Link
                          href="/signup"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block w-full px-3 py-1.5 text-[10.5px] font-medium text-[#1a5f52] bg-white border-2 border-[#1a5f52] hover:bg-gray-50 rounded-lg transition-colors text-center"
                        >
                          Sign Up
                        </Link>
                      </div>

                      <hr className="my-1 border-gray-200" />

                      <div className="px-3 py-1.5">
                        <p className="text-[9px] text-gray-500 text-center">
                          New to Zeerostock?{" "}
                          <Link
                            href="/about"
                            className="text-[#1a5f52] hover:underline font-medium"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Learn more
                          </Link>
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
