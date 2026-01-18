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
      { rootMargin: "-10% 0px -70% 0px" }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-linear-to-b from-[#D0FFED] to-[#FFFFFF] border-b border-gray-200 py-[30px]">
        <div className="max-w-[960px] mx-auto px-[13px]">
          <h1 className="text-[40px] font-semibold text-[#0d1b2a] mb-[7px] leading-[51px]">
            Terms & Conditions
          </h1>
          <p className="text-[13px] font-medium text-[#9c9c9c] leading-normal">
            Understand the rules, policies, and legal terms governing the use of
            Zeerostock.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[960px] mx-auto px-[13px] py-[21px]">
        <div className="flex gap-[21px] relative">
          {/* Left Content Area */}
          <div className="flex-1 space-y-[40px] pb-[100px]">
            {/* 1. Introduction */}
            <section id="introduction" className="scroll-mt-6">
              <h2 className="text-[19px] font-semibold text-[#0d1b2a] mb-[7px]">
                1. Introduction
              </h2>
              <p className="text-[10px] font-medium text-[#666666] leading-relaxed mb-[7px]">
                Welcome to Zeerostock. These Terms and Conditions ("Terms")
                govern your use of the Zeerostock website, mobile applications,
                and services (collectively, the "Platform"). By accessing or
                using our Platform, you agree to be bound by these Terms and our
                Privacy Policy.
              </p>
              <div className="bg-[#EEFFEF] border border-gray-200 p-[7px] rounded-lg mb-[7px] flex gap-[5px] max-w-[450px]">
                <div className="flex-shrink-0 mt-[1px]">
                  <svg
                    className="w-[12px] h-[12px] text-[#2AAE7A]"
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
                <p className="text-[9px] font-medium text-[#2AAE7A]">
                  This document constitutes a legally binding agreement between
                  you and Zeerostock, Inc.
                </p>
              </div>
            </section>

            {/* 2. User Accounts */}
            <section id="user-accounts" className="scroll-mt-6">
              <h2 className="text-[19px] font-semibold text-[#0d1b2a] mb-[7px]">
                2. User Accounts & Eligibility
              </h2>
              <p className="text-[10px] font-medium text-[#666666] leading-relaxed mb-[7px]">
                To access certain features of the Platform, you must register
                for an account. You must be at least 18 years old and represent
                a legitimate business entity to create an account.
              </p>
              <div className="bg-[#FFF3CF] border border-gray-200 rounded-lg p-[7px] flex gap-[5px] max-w-[450px]">
                <div className="flex-shrink-0 mt-[1px]">
                  <svg
                    className="w-[12px] h-[12px] text-[#FFCC33]"
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
                <p className="text-[9px] font-medium text-[#FFCC33]">
                  You are responsible for safeguarding your password. Notify
                  Zeerostock immediately of any unauthorized use.
                </p>
              </div>
            </section>

            {/* 3. Marketplace Policies */}
            <section id="marketplace" className="scroll-mt-6">
              <h2 className="text-[19px] font-semibold text-[#0d1b2a] mb-[7px]">
                3. Marketplace Policies
              </h2>
              <p className="text-[10px] font-medium text-[#666666] leading-relaxed mb-[5px]">
                Prohibited activities include, but are not limited to:
              </p>
              <ul className="space-y-[4px] text-[10px] font-medium text-[#666666]">
                <li className="flex gap-[5px]">
                  <span className="font-bold">•</span> Listing illegal or
                  counterfeit materials.
                </li>
                <li className="flex gap-[5px]">
                  <span className="font-bold">•</span> Engaging in fraudulent
                  practices.
                </li>
                <li className="flex gap-[5px]">
                  <span className="font-bold">•</span> Infringing on
                  intellectual property rights.
                </li>
              </ul>
            </section>

            {/* 4. Buying Rules */}
            <section id="buying-rules" className="scroll-mt-6">
              <h2 className="text-[19px] font-semibold text-[#0d1b2a] mb-[7px]">
                4. Buying Rules
              </h2>
              <p className="text-[10px] font-medium text-[#666666] leading-relaxed mb-[7px]">
                When purchasing goods on Zeerostock, you agree that:
              </p>
              <ul className="space-y-[4px] text-[10px] font-medium text-[#666666]">
                <li className="flex gap-[5px]">
                  <span className="font-bold">•</span> You have read the full
                  item listing before committing to buy.
                </li>
                <li className="flex gap-[5px]">
                  <span className="font-bold">•</span> You enter into a legally
                  binding contract to purchase an item when you commit to buy.
                </li>
                <li className="flex gap-[5px]">
                  <span className="font-bold">•</span> You do not submit any
                  false transaction claims.
                </li>
              </ul>
            </section>

            {/* 5. Selling Rules */}
            <section id="selling-rules" className="scroll-mt-6">
              <h2 className="text-[19px] font-semibold text-[#0d1b2a] mb-[7px]">
                5. Selling Rules
              </h2>
              <p className="text-[10px] font-medium text-[#666666] leading-relaxed">
                Suppliers must accurately describe their items. All listings
                must only contain text, graphics, and pictures that describe the
                item for sale. You may not list any item on our site that could
                cause Zeerostock to violate any applicable law, statute,
                ordinance, or regulation.
              </p>
            </section>

            {/* 6. Payment & Fees */}
            <section id="payment-fees" className="scroll-mt-6">
              <h2 className="text-[19px] font-semibold text-[#0d1b2a] mb-[7px]">
                6. Payment & Fees
              </h2>
              <p className="text-[10px] font-medium text-[#666666] leading-relaxed mb-[7px]">
                Zeerostock charges fees for certain services, such as listing
                items or completing transactions. You are responsible for paying
                all fees and applicable taxes associated with your use of the
                Platform.
              </p>
              <div className="bg-[#EEFFEF] border border-gray-200 p-[7px] rounded-lg flex gap-[5px] max-w-[450px]">
                <div className="flex-shrink-0 mt-[1px]">
                  <svg
                    className="w-[12px] h-[12px] text-[#2AAE7A]"
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
                <p className="text-[9px] font-medium text-[#2AAE7A]">
                  All payments are processed securely. Zeerostock does not store
                  your full credit card information.
                </p>
              </div>
            </section>

            {/* 7. Shipping & Logistics */}
            <section id="shipping" className="scroll-mt-6">
              <h2 className="text-[19px] font-semibold text-[#0d1b2a] mb-[7px]">
                7. Shipping & Logistics
              </h2>
              <p className="text-[10px] font-medium text-[#666666] leading-relaxed">
                Unless otherwise agreed upon, shipping costs are the
                responsibility of the Buyer. Sellers are responsible for
                packaging goods securely and providing tracking information
                within 24 hours of shipment. Risk of loss passes to the Buyer
                upon delivery to the carrier.
              </p>
            </section>

            {/* 8. Intellectual Property */}
            <section id="intellectual" className="scroll-mt-6">
              <h2 className="text-[19px] font-semibold text-[#0d1b2a] mb-[7px]">
                8. Intellectual Property
              </h2>
              <p className="text-[10px] font-medium text-[#666666] leading-relaxed">
                The Zeerostock name, logo, and all related names, logos, product
                and service names, designs, and slogans are trademarks of
                Zeerostock or its affiliates. You must not use such marks
                without the prior written permission of Zeerostock. All other
                content is copyright of their respective owners.
              </p>
            </section>

            {/* 9. Liabilities */}
            <section id="liabilities" className="scroll-mt-6">
              <h2 className="text-[19px] font-semibold text-[#0d1b2a] mb-[7px]">
                9. Liabilities & Limitations
              </h2>
              <p className="text-[10px] font-medium text-[#666666] leading-relaxed">
                To the fullest extent provided by law, in no event will
                Zeerostock, its affiliates, or their licensors be liable for
                damages of any kind, under any legal theory, arising out of or
                in connection with your use, or inability to use, the Platform.
              </p>
            </section>

            {/* 10. Termination */}
            <section id="termination" className="scroll-mt-6">
              <h2 className="text-[19px] font-semibold text-[#0d1b2a] mb-[7px]">
                10. Termination of Service
              </h2>
              <p className="text-[10px] font-medium text-[#666666] leading-relaxed">
                We may terminate or suspend your account and bar access to the
                Service immediately, without prior notice or liability, under
                our sole discretion, for any reason whatsoever and without
                limitation, including but not limited to a breach of the Terms.
              </p>
            </section>

            {/* 11. Governing Law */}
            <section id="governing-law" className="scroll-mt-6">
              <h2 className="text-[19px] font-semibold text-[#0d1b2a] mb-[7px]">
                11. Governing Law
              </h2>
              <p className="text-[10px] font-medium text-[#666666] leading-relaxed">
                These Terms shall be governed and construed in accordance with
                the laws of the jurisdiction in which Zeerostock is established,
                without regard to its conflict of law provisions.
              </p>
            </section>

            {/* 12. Contact */}
            <section id="contact" className="scroll-mt-6">
              <h2 className="text-[19px] font-semibold text-[#0d1b2a] mb-[7px]">
                12. Contact Information
              </h2>
              <p className="text-[10px] font-medium text-[#666666] leading-relaxed mb-[7px]">
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <div className="bg-[#EEFFEF] border border-gray-200 p-[11px] rounded-lg">
                <p className="text-[10px] font-semibold text-[#0d1b2a]">
                  Zeerostock Support Team
                </p>
                <p className="text-[10px] font-medium text-[#666666]">
                  contact@zeerostock.com
                </p>
                <p className="text-[10px] font-medium text-[#666666] mt-[2px]">
                  +91 89568 35375
                </p>
              </div>
            </section>

            {/* Need Clarification Box */}
            <div className="border border-gray-200 rounded-lg p-[11px] mt-[40px] bg-[#EEFFEF]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[13px] font-semibold text-[#0d1b2a] mb-[2px]">
                    Need Clarification?
                  </h3>
                  <p className="text-[9px] font-medium text-[#9c9c9c]">
                    Our team is available to help you understand our policies
                  </p>
                </div>
                <button className="px-[11px] py-[5px] bg-[#1E3A8A] text-white text-[10px] font-semibold rounded-lg hover:bg-[#1a3379] transition-colors whitespace-nowrap ml-[11px] cursor-pointer">
                  Contact Legal Support
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Sticky Navigation */}
          <div className="w-[150px] shrink-0 hidden md:block">
            <div className="sticky top-[20px] bg-white border border-gray-200 rounded-lg p-[11px] shadow-sm">
              <h3 className="text-[12px] font-semibold text-[#0d1b2a] mb-[7px] pb-[5px] border-b border-gray-200">
                Page Contents
              </h3>
              <nav className="space-y-[2px]">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-[8px] py-[6px] text-[10px] font-medium rounded-md transition-all duration-200 cursor-pointer ${
                      activeSection === section.id
                        ? "bg-[#EEFFEF] text-[#2AAE7A] font-semibold shadow-sm"
                        : "text-[#666666] hover:bg-gray-50 hover:text-[#0d1b2a]"
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
