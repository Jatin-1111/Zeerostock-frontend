"use client";

import Link from "next/link";
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
            <img
              src={"/Zeerostock Logo-1.svg"}
              alt="Zeerostock"
              className="w-[120px] sm:w-[130px] md:w-[142.5px]"
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
                href="/buyer/dashboard"
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
                href="/supplier/dashboard"
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
                        href="/buyer/dashboard"
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
                        href="/supplier/dashboard"
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
            className="hidden lg:flex w-[33px] h-[33px] bg-[#25D366] rounded-full items-center justify-center hover:bg-[#25D366]/90 transition-colors"
            aria-label="Contact us on WhatsApp"
          >
            {/* Replaced complex SVG with Lucide MessageCircle */}
            <MessageCircle className="w-[18px] h-[18px] text-white fill-current" />
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
