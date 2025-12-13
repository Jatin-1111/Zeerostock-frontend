"use client";

import Link from "next/link";

const imgUpscaleRe2 =
  "https://www.figma.com/api/mcp/asset/81fa2263-b943-4cba-b6b4-86e7e69d9a8e";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[93px]">
      <div className="absolute inset-0 bg-linear-to-b from-[#43C786] to-[#0A2540] backdrop-blur-[8.8px]" />
      <div className="relative h-full max-w-[1440px] mx-auto px-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <img src={imgUpscaleRe2} alt="Zeerostock" className="w-[150px] h-[47px]" />
        </Link>
        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className="text-white text-[20px] font-medium hover:text-white/90 transition-colors font-['Poppins']"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-white text-[20px] font-medium hover:text-white/90 transition-colors font-['Poppins']"
          >
            About Us
          </Link>
          <Link
            href="/help-support"
            className="text-white text-[20px] font-medium hover:text-white/90 transition-colors font-['Poppins']"
          >
            Contact Us
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Change language"
          >
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path
                d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                strokeWidth="2"
              />
            </svg>
            <span className="text-white text-[14px] font-medium">EN</span>
          </button>

          {/* WhatsApp Icon */}
          <Link
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[44px] h-[44px] bg-[#25D366] rounded-full flex items-center justify-center hover:bg-[#25D366]/90 transition-colors"
            aria-label="Contact us on WhatsApp"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </Link>

          {/* User Profile Icon */}
          <button
            className="w-[44px] h-[44px] bg-[#0a2540] rounded-full flex items-center justify-center hover:bg-[#0a2540]/90 transition-colors"
            aria-label="User profile"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
