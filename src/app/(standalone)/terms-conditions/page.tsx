"use client";

import { useState, useEffect } from "react";

export default function TermsConditionsPage() {
  const [activeSection, setActiveSection] = useState<string>("introduction");

  const sections = [
    { id: "introduction", label: "Introduction" },
    { id: "user-accounts", label: "User Accounts & Eligibility" },
    { id: "marketplace", label: "Marketplace Policies" },
    { id: "buying-rules", label: "Buying Rules" },
    { id: "selling-rules", label: "Selling Rules" },
    { id: "payment-fees", label: "Payment & Fees" },
    { id: "shipping", label: "Shipping & Logistics" },
    { id: "intellectual", label: "Intellectual Property" },
    { id: "liabilities", label: "Liabilities & Limitations" },
    { id: "termination", label: "Termination of Service" },
    { id: "governing-law", label: "Governing Law" },
    { id: "contact", label: "Contact Information" },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      // "block: start" puts it at the top, "scroll-mt" in CSS handles the offset
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // The Observer: Watches which section is on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      // rootMargin adjusts the "trigger zone" to the top 30% of the screen
      { rootMargin: "-10% 0px -70% 0px" },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="min-h-screen bg-[#eefbf6]">
      {/* Hero Section with Gradient */}
      <div
        className="h-[100px] sm:h-[115px] md:h-[130px] overflow-hidden"
        style={{
          background:
            "linear-gradient(179.81deg, rgb(208, 255, 237) 0.93%, rgb(255, 255, 255) 99.09%)",
        }}
      >
        <div className="max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-6 sm:pt-9 md:pt-12">
          <h1 className="text-[20px] sm:text-[25px] md:text-[30px] font-semibold leading-normal mb-1 sm:mb-1.5 md:mb-2 text-[#0d1b2a]">
            Terms & Conditions
          </h1>
          <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#9c9c9c]">
            Understand the rules, policies, and legal terms governing the use of
            Zeerostock.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 mt-4 sm:mt-6 md:mt-8 pb-6 sm:pb-8 md:pb-10">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 relative">
          {/* Left Content Area */}
          <div className="flex-1 space-y-4 sm:space-y-5 md:space-y-6">
            {/* 1. Introduction */}
            <section
              id="introduction"
              className="scroll-mt-6 space-y-1.5 sm:space-y-2"
            >
              <h2 className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-[#1e3a8a]">
                1. Introduction
              </h2>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
                Welcome to Zeerostock. These Terms and Conditions ("Terms")
                govern your use of the Zeerostock website, mobile applications,
                and services (collectively, the "Platform"). By accessing or
                using our Platform, you agree to be bound by these Terms and our
                Privacy Policy.
              </p>
              <div className="bg-[#EEFFEF] border border-[#2aae7a] rounded-[5px] p-2 sm:p-2.5 flex gap-2 sm:gap-2.5">
                <div className="flex-shrink-0 mt-[1px]">
                  <svg
                    className="w-3 h-3 text-[#2AAE7A]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#2AAE7A]">
                  This document constitutes a legally binding agreement between
                  you and Zeerostock, Inc.
                </p>
              </div>
            </section>

            {/* 2. User Accounts */}
            <section
              id="user-accounts"
              className="scroll-mt-6 space-y-1.5 sm:space-y-2"
            >
              <h2 className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-[#1e3a8a]">
                2. User Accounts & Eligibility
              </h2>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
                To access certain features of the Platform, you must register
                for an account. You must be at least 18 years old and represent
                a legitimate business entity to create an account.
              </p>
              <div className="bg-[#FFF3CF] border border-[#FFCC33] rounded-[5px] p-2 sm:p-2.5 flex gap-2 sm:gap-2.5">
                <div className="flex-shrink-0 mt-[1px]">
                  <svg
                    className="w-3 h-3 text-[#FFCC33]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#FFCC33]">
                  You are responsible for safeguarding your password. Notify
                  Zeerostock immediately of any unauthorized use.
                </p>
              </div>
            </section>

            {/* 3. Marketplace Policies */}
            <section
              id="marketplace"
              className="scroll-mt-6 space-y-1.5 sm:space-y-2"
            >
              <h2 className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-[#1e3a8a]">
                3. Marketplace Policies
              </h2>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
                Prohibited activities include, but are not limited to:
              </p>
              <ul className="space-y-1 text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c]">
                <li className="flex gap-2">
                  <span className="font-bold">•</span> Listing illegal or
                  counterfeit materials.
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span> Engaging in fraudulent
                  practices.
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span> Infringing on
                  intellectual property rights.
                </li>
              </ul>
            </section>

            {/* 4. Buying Rules */}
            <section
              id="buying-rules"
              className="scroll-mt-6 space-y-1.5 sm:space-y-2"
            >
              <h2 className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-[#1e3a8a]">
                4. Buying Rules
              </h2>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
                When purchasing goods on Zeerostock, you agree that:
              </p>
              <ul className="space-y-1 text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c]">
                <li className="flex gap-2">
                  <span className="font-bold">•</span> You have read the full
                  item listing before committing to buy.
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span> You enter into a legally
                  binding contract to purchase an item when you commit to buy.
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span> You do not submit any
                  false transaction claims.
                </li>
              </ul>
            </section>

            {/* 5. Selling Rules */}
            <section
              id="selling-rules"
              className="scroll-mt-6 space-y-1.5 sm:space-y-2"
            >
              <h2 className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-[#1e3a8a]">
                5. Selling Rules
              </h2>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
                Suppliers must accurately describe their items. All listings
                must only contain text, graphics, and pictures that describe the
                item for sale. You may not list any item on our site that could
                cause Zeerostock to violate any applicable law, statute,
                ordinance, or regulation.
              </p>
            </section>

            {/* 6. Payment & Fees */}
            <section
              id="payment-fees"
              className="scroll-mt-6 space-y-1.5 sm:space-y-2"
            >
              <h2 className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-[#1e3a8a]">
                6. Payment & Fees
              </h2>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
                Zeerostock charges fees for certain services, such as listing
                items or completing transactions. You are responsible for paying
                all fees and applicable taxes associated with your use of the
                Platform.
              </p>
              <div className="bg-[#EEFFEF] border border-[#2aae7a] p-2 sm:p-2.5 rounded-[5px] flex gap-2 sm:gap-2.5">
                <div className="flex-shrink-0 mt-[1px]">
                  <svg
                    className="w-3 h-3 text-[#2AAE7A]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#2AAE7A]">
                  All payments are processed securely. Zeerostock does not store
                  your full credit card information.
                </p>
              </div>
            </section>

            {/* 7. Shipping & Logistics */}
            <section
              id="shipping"
              className="scroll-mt-6 space-y-1.5 sm:space-y-2"
            >
              <h2 className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-[#1e3a8a]">
                7. Shipping & Logistics
              </h2>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
                Unless otherwise agreed upon, shipping costs are the
                responsibility of the Buyer. Sellers are responsible for
                packaging goods securely and providing tracking information
                within 24 hours of shipment. Risk of loss passes to the Buyer
                upon delivery to the carrier.
              </p>
            </section>

            {/* 8. Intellectual Property */}
            <section
              id="intellectual"
              className="scroll-mt-6 space-y-1.5 sm:space-y-2"
            >
              <h2 className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-[#1e3a8a]">
                8. Intellectual Property
              </h2>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
                The Zeerostock name, logo, and all related names, logos, product
                and service names, designs, and slogans are trademarks of
                Zeerostock or its affiliates. You must not use such marks
                without the prior written permission of Zeerostock. All other
                content is copyright of their respective owners.
              </p>
            </section>

            {/* 9. Liabilities */}
            <section
              id="liabilities"
              className="scroll-mt-6 space-y-1.5 sm:space-y-2"
            >
              <h2 className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-[#1e3a8a]">
                9. Liabilities & Limitations
              </h2>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
                To the fullest extent provided by law, in no event will
                Zeerostock, its affiliates, or their licensors be liable for
                damages of any kind, under any legal theory, arising out of or
                in connection with your use, or inability to use, the Platform.
              </p>
            </section>

            {/* 10. Termination */}
            <section
              id="termination"
              className="scroll-mt-6 space-y-1.5 sm:space-y-2"
            >
              <h2 className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-[#1e3a8a]">
                10. Termination of Service
              </h2>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
                We may terminate or suspend your account and bar access to the
                Service immediately, without prior notice or liability, under
                our sole discretion, for any reason whatsoever and without
                limitation, including but not limited to a breach of the Terms.
              </p>
            </section>

            {/* 11. Governing Law */}
            <section
              id="governing-law"
              className="scroll-mt-6 space-y-1.5 sm:space-y-2"
            >
              <h2 className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-[#1e3a8a]">
                11. Governing Law
              </h2>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
                These Terms shall be governed and construed in accordance with
                the laws of the jurisdiction in which Zeerostock is established,
                without regard to its conflict of law provisions.
              </p>
            </section>

            {/* 12. Contact */}
            <section
              id="contact"
              className="scroll-mt-6 space-y-1.5 sm:space-y-2"
            >
              <h2 className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-[#1e3a8a]">
                12. Contact Information
              </h2>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c] leading-[12px] sm:leading-[13px] md:leading-[14px]">
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <div className="bg-white rounded-[10px] p-2.5 sm:p-3 space-y-1">
                <p className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-[#0d1b2a]">
                  Zeerostock Support Team
                </p>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c]">
                  contact@zeerostock.com
                </p>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#7c7c7c]">
                  +91 89568 35375
                </p>
              </div>
            </section>

            {/* CTA Box */}
            <div className="bg-[#2aae7a] rounded-[15px] p-4 sm:p-5 md:p-6 text-center">
              <h3 className="text-[16px] sm:text-[19px] md:text-[22.5px] font-semibold text-white mb-2 sm:mb-2.5">
                Need Clarification?
              </h3>
              <p className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-[#374151] mb-4 sm:mb-5 md:mb-6">
                Our team is available to help you understand our policies
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-11 justify-center">
                <button className="bg-[#1e3a8a] text-white px-8 sm:px-11 md:px-14 py-1.5 sm:py-2 rounded-md text-[9px] sm:text-[10px] md:text-[11px] font-medium hover:bg-[#1a3379] transition-colors cursor-pointer">
                  Contact Legal Support
                </button>
                <button className="bg-white text-[#2aae7a] px-8 sm:px-11 md:px-14 py-1.5 sm:py-2 rounded-md text-[9px] sm:text-[10px] md:text-[11px] font-medium hover:bg-gray-50 transition-colors cursor-pointer">
                  View Guide
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Sticky Navigation */}
          <div className="w-full lg:w-[159px] shrink-0 hidden lg:block">
            <div className="bg-white rounded-[10px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)] p-2.5 sticky top-[20px]">
              <h3 className="text-[11px] font-semibold text-black pb-1.5 mb-2 border-b border-[#e5e7eb]">
                Page Contents
              </h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-2.5 py-1.5 text-[10px] font-medium rounded-[5px] transition-colors cursor-pointer ${
                      activeSection === section.id
                        ? "bg-[#EEFFEF] text-[#2AAE7A]"
                        : "text-black hover:bg-gray-50"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
