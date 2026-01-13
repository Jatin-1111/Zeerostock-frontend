"use client";

import { useState } from "react";
import Link from "next/link";

export default function TermsConditionsPage() {
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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 py-12">
        <div className="mx-auto px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Terms & Conditions
          </h1>
          <p className="text-lg text-gray-600">
            Understand the rules, policies, and legal terms governing the use of
            Zeerostock.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-8 py-12">
        <div className="flex gap-12 mx-auto">
          {/* Left Content */}
          <div className="flex-1 space-y-12">
            {/* 1. Introduction */}
            <section id="introduction">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                Welcome to Zeerostock. These Terms and Conditions ("Terms")
                govern your use of the Zeerostock website, mobile applications,
                and services (collectively, the "Platform"). By accessing or
                using our Platform, you agree to be bound by these Terms and our
                Privacy Policy. If you do not agree to these Terms, you may not
                use the Platform.
              </p>
              <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-4 flex gap-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-gray-700"
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
                <p className="text-sm text-gray-700">
                  This document constitutes a legally binding agreement between
                  you and Zeerostock, Inc. Please read it carefully.
                </p>
              </div>
              <p className="text-base text-gray-700 leading-relaxed">
                The Platform is a business-to-business (B2B) marketplace that
                connects buyers ("Buyers") and sellers ("Suppliers") of goods
                and services. Zeerostock provides the venue and tools for these
                transactions but is not a party to any agreement between Buyers
                and Suppliers.
              </p>
            </section>

            {/* 2. User Accounts & Eligibility */}
            <section id="user-accounts">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. User Accounts & Eligibility
              </h2>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                To access certain features of the Platform, you must register
                for an account. You must be at least 18 years old and represent
                a legitimate business entity to create an account. You agree to
                provide accurate, current, and complete information during the
                registration process and to update such information to keep it
                accurate, current, and complete.
              </p>
              <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 flex gap-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-gray-700"
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
                <p className="text-sm text-gray-700">
                  You are responsible for safeguarding your password and for all
                  activities that occur under your account. You agree to notify
                  Zeerostock immediately of any unauthorized use of your
                  account.
                </p>
              </div>
            </section>

            {/* 3. Marketplace Policies */}
            <section id="marketplace">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Marketplace Policies
              </h2>
              <p className="text-base text-gray-700 leading-relaxed mb-3">
                All users must comply with all applicable laws, regulations, and
                third-party rights. Prohibited activities include, but are not
                limited to:
              </p>
              <ul className="space-y-2 text-base text-gray-700">
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>
                    Listing illegal, counterfeit, or hazardous materials.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>Engaging in fraudulent or deceptive practices.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>Infringing on intellectual property rights.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>
                    Manipulating prices or interfering with other users'
                    listings.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>
                    Posting false, inaccurate, misleading, defamatory, or
                    libelous content.
                  </span>
                </li>
              </ul>
            </section>

            {/* 4. Payment & Fees */}
            <section id="payment-fees">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Payment & Fees
              </h2>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                Zeerostock may charge fees for certain services, such as listing
                items or completing transactions. All applicable fees will be
                disclosed to you prior to your use of the service. You agree to
                pay all fees and applicable taxes associated with your use of
                the Platform. Payments are processed through a secure
                third-party payment processor.
              </p>
              <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 flex gap-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-gray-700"
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
                <p className="text-sm text-gray-700">
                  By accessing this platform and making transactions, you agree
                  to these terms and the fee structures outlined in your seller
                  or buyer agreement.
                </p>
              </div>
            </section>

            {/* Need Clarification Box */}
            <div className="border border-gray-300 rounded-lg p-6 mt-12 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Need Clarification?
                  </h3>
                  <p className="text-base text-gray-600">
                    Our team is available to help you understand our policies
                  </p>
                </div>
                <button className="px-6 py-3 bg-gray-900 text-white text-base font-semibold rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap ml-6">
                  Contact Legal Support
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Page Contents */}
          <div className="w-[300px] shrink-0">
            <div className="sticky top-8 border border-gray-300 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-300">
                Page Contents
              </h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="w-full text-left px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded transition-colors"
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
