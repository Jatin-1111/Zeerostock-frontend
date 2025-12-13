import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#eefbf6]">
      {/* Main Footer Content */}
      <div className="w-full bg-[#0d1e23] py-16 px-4 sm:px-8 md:px-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Logo and Tagline */}
            <div className="flex flex-col gap-4 items-center lg:items-start">
              <Link href="/home" className="shrink-0">
                <img
                  src={
                    "https://www.figma.com/api/mcp/asset/81fa2263-b943-4cba-b6b4-86e7e69d9a8e"
                  }
                  alt="Zeerostock"
                  className="w-[150px] h-[47px]"
                />
              </Link>
              <p className="text-[14px] leading-normal text-[#d0d0d0] text-center lg:text-left font-['Poppins']">
                Turning idle inventory into opportunity.
              </p>
            </div>

            {/* Company Links */}
            <div className="flex flex-col gap-[18px]">
              <h3 className="text-[20px] leading-normal font-medium text-white font-['Poppins']">
                Company
              </h3>
              <div className="flex flex-col gap-2 text-[14px] leading-6 text-[#d0d0d0] font-['Poppins']">
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/careers"
                  className="hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </div>
            </div>

            {/* Policy Links */}
            <div className="flex flex-col gap-[18px]">
              <h3 className="text-[20px] leading-normal font-medium text-white font-['Poppins']">
                Policy
              </h3>
              <div className="flex flex-col gap-2 text-[14px] leading-6 text-[#d0d0d0] font-['Poppins']">
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
                  Privacy Policy
                </Link>
              </div>
            </div>

            {/* Quick Links & Support Combined */}
            <div className="flex flex-col gap-[18px]">
              <h3 className="text-[20px] leading-normal font-medium text-white font-['Poppins']">
                Quick Links
              </h3>
              <div className="flex flex-col gap-2 text-[14px] leading-6 text-[#d0d0d0] font-['Poppins']">
                <Link
                  href="/buyer"
                  className="hover:text-white transition-colors"
                >
                  Buyer
                </Link>
                <Link
                  href="/supplier"
                  className="hover:text-white transition-colors"
                >
                  Seller
                </Link>
                <Link
                  href="/help-support"
                  className="hover:text-white transition-colors"
                >
                  Help Desk
                </Link>
                <Link
                  href="/partner-agent"
                  className="hover:text-white transition-colors"
                >
                  Become an Agent
                </Link>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="flex flex-col gap-6">
              <h3 className="text-[20px] leading-normal font-medium text-white font-['Poppins']">
                Join Our Network
              </h3>
              <div className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-[50px] bg-gray-800 border border-[#8f8f8f] rounded-xl px-4 text-[15px] leading-[22px] text-[#d0d0d0] placeholder:text-dimgray focus:outline-none focus:border-[#2aae7a] font-['Poppins']"
                />
                <button className="w-full h-[50px] bg-[#2aae7a] text-[#0d1e23] text-[18px] leading-[22px] font-medium rounded-xl hover:bg-[#2aae7a]/90 transition-colors font-['Poppins']">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center justify-center lg:justify-end gap-2.5 mt-12">
            <a
              href="#"
              className="w-10 h-10 bg-[#2aae7a] rounded-full flex items-center justify-center hover:bg-[#2aae7a]/80 transition-colors"
              aria-label="Facebook"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-[#2aae7a] rounded-full flex items-center justify-center hover:bg-[#2aae7a]/80 transition-colors"
              aria-label="Twitter/X"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-[#2aae7a] rounded-full flex items-center justify-center hover:bg-[#2aae7a]/80 transition-colors"
              aria-label="LinkedIn"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-[#2aae7a] rounded-full flex items-center justify-center hover:bg-[#2aae7a]/80 transition-colors"
              aria-label="Instagram"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>

          {/* Divider Line */}
          <div className="w-full h-px bg-gray-600 my-6" />

          {/* Copyright */}
          <p className="text-[15px] leading-6 text-[#d0d0d0] text-center font-['Poppins']">
            © 2025 Zeerostock Ventures. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Bottom Disclaimer - Now with proper light background visibility */}
      <div className="max-w-[900px] mx-auto px-4 py-6">
        <p className="text-[15px] leading-6 text-[#0d1e23] text-center font-['Poppins']">
          Zeerostock is a registered trademark. Our platform facilitates B2B
          transactions with industry-leading security and compliance standards.
          For enterprise solutions and partnership, contact our business
          development team.
        </p>
      </div>
    </footer>
  );
}
