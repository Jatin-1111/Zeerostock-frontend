"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="w-full bg-[#eefbf6]">
      {/* Main Footer Content */}
      <div className="w-full bg-[#0d1e23] py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 lg:px-15">
        <div className="max-w-[412px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1080px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-7 lg:gap-9">
            {/* Logo and Tagline */}
            <div className="flex flex-col gap-3 items-start">
              <Link href="/home" className="shrink-0">
                <img
                  src={"/Zeerostock Logo-1.svg"}
                  alt="Zeerostock"
                  className="h-[87px] sm:h-[60px] md:h-[85px] lg:h-[105px]"
                />
              </Link>
              <p className="text-[10.5px] sm:text-[10.5px] leading-normal text-[#d0d0d0] text-center sm:text-left hidden sm:block">
                Turning idle inventory into opportunity.
              </p>
            </div>

            {/* Company Links */}
            <div className="flex flex-col gap-[13.5px] sm:gap-[18px]">
              <h3 className="text-[16px] sm:text-[15px] leading-normal font-medium text-white">
                Company
              </h3>
              <div className="flex flex-col gap-1.5 sm:gap-[5px] text-[13px] sm:text-[10.5px] leading-6 sm:leading-[24px] text-[#d0d0d0]">
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
                {/* <Link
                  href="/careers"
                  className="hover:text-white transition-colors"
                >
                  Careers
                </Link> */}
              </div>
            </div>

            {/* Policy Links */}
            <div className="flex flex-col gap-[13.5px] sm:gap-[18px]">
              <h3 className="text-[16px] sm:text-[15px] leading-normal font-medium text-white">
                Policy
              </h3>
              <div className="flex flex-col gap-1.5 sm:gap-[5px] text-[13px] sm:text-[10.5px] leading-6 sm:leading-[24px] text-[#d0d0d0]">
                <Link
                  href="/terms-conditions"
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Policy
                </Link>
              </div>
            </div>

            {/* Quick Links & Support Combined */}
            <div className="flex flex-col gap-[13.5px] sm:gap-[18px]">
              <h3 className="text-[16px] sm:text-[15px] leading-normal font-medium text-white">
                Ouick Links
              </h3>
              <div className="flex flex-col gap-1.5 sm:gap-[5px] text-[13px] sm:text-[10.5px] leading-6 sm:leading-[24px] text-[#d0d0d0]">
                <Link
                  href="/for-buyer"
                  className="hover:text-white transition-colors"
                >
                  Buyer
                </Link>
                <Link
                  href="/for-supplier"
                  className="hover:text-white transition-colors"
                >
                  Seller
                </Link>
                <Link
                  href="/helpdesk"
                  className="hover:text-white transition-colors"
                >
                  Help Desk
                </Link>
                <Link
                  href="/blogs"
                  className="hover:text-white transition-colors"
                >
                  Blogs
                </Link>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="flex flex-col gap-[18px]">
              <h3 className="text-[20px] sm:text-[15px] leading-normal font-medium text-white">
                Join Our Network
              </h3>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[52px] sm:h-[37.5px] bg-[#1f2937] border-[0.5px] sm:border border-[#8f8f8f] rounded-xl px-3 sm:px-3 text-[15px] sm:text-[11.25px] leading-[22px] text-[#696969] placeholder:text-[#696969] focus:outline-none focus:border-[#2aae7a]"
                />
                <button
                  onClick={() => {
                    if (email) {
                      alert(
                        "Thank you for subscribing! We will keep you updated."
                      );
                      setEmail("");
                    }
                  }}
                  className="w-full h-[52px] sm:h-[37.5px] bg-[#2aae7a] text-white text-[13.5px] sm:text-[13.5px] leading-[22px] font-medium rounded-xl hover:bg-[#2aae7a]/90 transition-colors flex items-center justify-center"
                >
                  <svg
                    className="w-[30px] h-[30px] sm:hidden"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                  <span className="hidden sm:inline">Subscribe</span>
                </button>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center justify-center sm:justify-center lg:justify-end gap-2 mt-6 sm:mt-7 md:mt-9">
            <a
              href="#"
              className="w-[40px] sm:w-[30px] h-[40px] sm:h-[30px] bg-[#2aae7a] rounded-full flex items-center justify-center hover:bg-[#2aae7a]/80 transition-colors"
              aria-label="Facebook"
            >
              <svg
                className="w-[20px] sm:w-[15px] h-[20px] sm:h-[15px] text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://x.com/zeerostock?s=21"
              className="w-[40px] sm:w-[30px] h-[40px] sm:h-[30px] bg-[#2aae7a] rounded-full flex items-center justify-center hover:bg-[#2aae7a]/80 transition-colors"
              aria-label="Twitter/X"
            >
              <svg
                className="w-[20px] sm:w-[15px] h-[20px] sm:h-[15px] text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/zeerostock-ventures/"
              className="w-[40px] sm:w-[30px] h-[40px] sm:h-[30px] bg-[#2aae7a] rounded-full flex items-center justify-center hover:bg-[#2aae7a]/80 transition-colors"
              aria-label="LinkedIn"
            >
              <svg
                className="w-[20px] sm:w-[15px] h-[20px] sm:h-[15px] text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/zeerostock_ventures?igsh=MTZsMGh4ZjJ6cjVpeQ%3D%3D&utm_source=qr"
              className="w-[40px] sm:w-[30px] h-[40px] sm:h-[30px] bg-[#2aae7a] rounded-full flex items-center justify-center hover:bg-[#2aae7a]/80 transition-colors"
              aria-label="Instagram"
            >
              <svg
                className="w-[20px] sm:w-[15px] h-[20px] sm:h-[15px] text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>

          {/* Divider Line */}
          <div className="w-full h-px bg-gray-600 my-[18px]" />

          {/* Copyright */}
          <p className="text-[14px] sm:text-[11.25px] leading-6 sm:leading-[24px] text-[#d0d0d0] text-center">
            © 2025 Zeerostock Ventures. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Bottom Disclaimer - Now with proper light background visibility */}
      <div className="max-w-[380px] sm:max-w-[500px] md:max-w-[675px] mx-auto px-4 sm:px-3 py-[18px]">
        <p className="text-[10px] sm:text-[11.25px] leading-[20px] sm:leading-6 text-[#0d1b2a] text-center">
          Zeerostock is a registered trademark. Our platform facilitates B2B
          transactions with industry-leading security and compliance standards.
          For enterprise solutions and partnership, contact our business
          development team.
        </p>
      </div>
    </footer>
  );
}
