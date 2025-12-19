"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HelpSupportPage() {
  const [activeTab, setActiveTab] = useState<"faqs" | "guide" | "videos">(
    "faqs"
  );

  const supportCards = [
    {
      icon: "💬",
      title: "Live Chat Support",
      subtitle: "Chat with our team",
      description: "Get instant answers to your questions",
    },
    {
      icon: "📞",
      title: "Schedule Call",
      subtitle: "Book a call",
      description: "Talk to our support team",
    },
    {
      icon: "✉️",
      title: "Email Support",
      subtitle: "Send us an email",
      description: "We'll respond within 24 hours",
    },
    {
      icon: "📹",
      title: "Video Tutorials",
      subtitle: "Watch and learn",
      description: "Step-by-step video guides",
    },
  ];

  const faqs = [
    {
      question: "Looking for technical help or platform support?",
      answer:
        "Our technical support team is available to assist with any platform issues, feature questions, or technical difficulties you may encounter.",
    },
    {
      question: "Need help with your account or transactions?",
      answer:
        "Contact our customer service team for assistance with account management, transaction support, and general inquiries.",
    },
  ];

  const videos = [
    {
      title: "Getting Started with Zeerostock",
      duration: "5:23",
      thumbnail: "video-1",
    },
    {
      title: "How to Login or RFQ (Buyer Guide)",
      duration: "7:45",
      thumbnail: "video-2",
    },
    {
      title: "Listing on the Orderbook",
      duration: "6:12",
      thumbnail: "video-3",
    },
    {
      title: "Responding to Quotes (Supplier Guide)",
      duration: "8:30",
      thumbnail: "video-4",
    },
    {
      title: "Navigating Orders & Shipments",
      duration: "9:15",
      thumbnail: "video-5",
    },
    {
      title: "How to Verify Your Supplier Account",
      duration: "4:50",
      thumbnail: "video-6",
    },
  ];

  return (
    <div className="min-h-screen bg-[#eefbf6]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-20 py-8">
          <h1 className="text-[48px] font-bold text-gray-900 mb-2 font-['Poppins']">
            Help & Support
          </h1>
          <p className="text-[18px] text-gray-600 font-['Poppins']">
            We&apos;re here to help with anything you need
          </p>
        </div>
      </div>

      {/* Support Cards */}
      <div className="bg-white py-12">
        <div className="max-w-[1440px] mx-auto px-20">
          <div className="grid grid-cols-4 gap-6">
            {supportCards.map((card, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-900 rounded-xl p-6 flex flex-col items-center text-center"
              >
                <div className="text-[48px] mb-4">{card.icon}</div>
                <h3 className="text-[20px] font-semibold text-gray-900 mb-1 font-['Poppins']">
                  {card.title}
                </h3>
                <p className="text-[14px] text-gray-600 mb-2 font-['Poppins']">
                  {card.subtitle}
                </p>
                <p className="text-[14px] text-gray-500 mb-4 font-['Poppins']">
                  {card.description}
                </p>
                <button className="w-full h-[40px] bg-gray-900 text-white text-[14px] font-medium rounded-lg hover:bg-gray-800 transition-colors font-['Poppins']">
                  Start Chat
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-y border-gray-200 py-6">
        <div className="max-w-[1440px] mx-auto px-20">
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => setActiveTab("faqs")}
              className={`px-6 py-2 text-[14px] font-medium rounded-lg transition-colors font-['Poppins'] ${
                activeTab === "faqs"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              FAQs
            </button>
            <button
              onClick={() => setActiveTab("guide")}
              className={`px-6 py-2 text-[14px] font-medium rounded-lg transition-colors font-['Poppins'] ${
                activeTab === "guide"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Getting Started
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`px-6 py-2 text-[14px] font-medium rounded-lg transition-colors font-['Poppins'] ${
                activeTab === "videos"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Video Tutorials
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-[#eefbf6] py-12">
        <div className="max-w-[1440px] mx-auto px-20">
          {/* FAQs Tab */}
          {activeTab === "faqs" && (
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h2 className="text-[32px] font-bold text-gray-900 mb-2 font-['Poppins']">
                  Frequently Asked Questions
                </h2>
                <p className="text-[14px] text-gray-600 mb-6 font-['Poppins']">
                  Find answers to common questions about using Zeerostock
                </p>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="bg-white border-2 border-gray-900 rounded-lg p-6"
                    >
                      <h3 className="text-[16px] font-semibold text-gray-900 mb-2 font-['Poppins']">
                        {faq.question}
                      </h3>
                      <p className="text-[14px] text-gray-600 mb-4 font-['Poppins']">
                        {faq.answer}
                      </p>
                      <button className="w-full h-[40px] bg-gray-900 text-white text-[14px] font-medium rounded-lg hover:bg-gray-800 transition-colors font-['Poppins']">
                        Read More
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[16px] text-gray-600 font-['Poppins']">
                    Select a category to view questions
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Getting Started Guide Tab */}
          {activeTab === "guide" && (
            <div className="max-w-[900px] mx-auto">
              <div className="bg-white border-2 border-gray-900 rounded-lg p-8">
                <h2 className="text-[32px] font-bold text-gray-900 mb-8 text-center font-['Poppins']">
                  Getting Started Guide
                </h2>
                <p className="text-[16px] text-gray-600 text-center mb-8 font-['Poppins']">
                  From a new buyer to an expert - start with tracking faster
                  here
                </p>

                <div className="text-center py-8 mb-8">
                  <div className="text-[64px] mb-4">🚀</div>
                  <p className="text-[16px] text-gray-600 font-['Poppins']">
                    From a new buyer to expert - start with tracking faster here
                  </p>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-[20px] font-bold text-gray-900 mb-3 font-['Poppins']">
                      1. What is Zeerostock?
                    </h3>
                    <p className="text-[14px] text-gray-700 leading-relaxed font-['Poppins']">
                      Zeerostock is a marketplace designed to help B2B buyers
                      and suppliers of surplus inventory. Whether you&apos;re
                      looking to acquire items quickly, monetize slow-moving
                      stock, or diversify into brokerage transactions, we
                      optimize the supply chain.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-bold text-gray-900 mb-3 font-['Poppins']">
                      2. Create Your Account
                    </h3>
                    <ul className="space-y-2 text-[14px] text-gray-700 font-['Poppins']">
                      <li className="flex gap-2">
                        <span className="font-bold">• Visit System:</span> Go to
                        zeerostock.com and register or sign up using your Google
                        account or social account.
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold">
                          • Provide Business Details:
                        </span>{" "}
                        Fill out the company info, contact info, and business
                        verification.
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold">• Go to Email:</span> Check
                        your email and confirm the email address.
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold">
                          • Complete Onboarding Setup:
                        </span>{" "}
                        Tell us a little more about your industry, preferences,
                        and goals.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-bold text-gray-900 mb-3 font-['Poppins']">
                      3. How to Browse Inventory
                    </h3>
                    <p className="text-[14px] text-gray-700 leading-relaxed mb-2 font-['Poppins']">
                      Find the items you need using powerful search and filter
                      tools:
                    </p>
                    <ul className="space-y-2 text-[14px] text-gray-700 font-['Poppins']">
                      <li>
                        <span className="font-bold">• Search Bar:</span> Use
                        keywords—product names, categories, or manufacturers.
                      </li>
                      <li>
                        <span className="font-bold">• Category Navigator:</span>{" "}
                        Browse our catalog organized by categories.
                      </li>
                      <li>
                        <span className="font-bold">• Advanced Filtering:</span>{" "}
                        Sort by price, condition, location, etc.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-bold text-gray-900 mb-3 font-['Poppins']">
                      4. Posting RFQs (for Buyers)
                    </h3>
                    <p className="text-[14px] text-gray-700 leading-relaxed font-['Poppins']">
                      Can&apos;t find what you&apos;re looking for? Post a
                      "Request for Quote (RFQ)" and our suppliers will respond
                      with offers.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-bold text-gray-900 mb-3 font-['Poppins']">
                      5. Listing Surplus Inventory (for Suppliers)
                    </h3>
                    <p className="text-[14px] text-gray-700 leading-relaxed font-['Poppins']">
                      Have products to sell? List them on Zeerostock using our
                      intuitive listing tools.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-bold text-gray-900 mb-3 font-['Poppins']">
                      6. Payments & Orders
                    </h3>
                    <p className="text-[14px] text-gray-700 leading-relaxed font-['Poppins']">
                      We provide an easy order and secure payment flow. Check
                      out securely with our trusted payment providers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Video Tutorials Tab */}
          {activeTab === "videos" && (
            <div className="max-w-[900px] mx-auto">
              <div className="bg-white border-2 border-gray-900 rounded-lg p-8">
                <h2 className="text-[32px] font-bold text-gray-900 mb-2 font-['Poppins']">
                  Video Tutorials Library
                </h2>
                <p className="text-[14px] text-gray-600 mb-6 font-['Poppins']">
                  Step-by-step video guides to help you get the most from
                  Zeerostock
                </p>
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for videos..."
                      className="w-full h-[48px] px-4 pr-10 border-2 border-gray-900 rounded-lg text-[14px] font-['Poppins'] focus:outline-none focus:ring-2 focus:ring-gray-900 text-black placeholder:text-black"
                    />
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {videos.map((video, index) => (
                    <div
                      key={index}
                      className="border-2 border-gray-900 rounded-lg overflow-hidden bg-white"
                    >
                      <div className="relative h-[180px] bg-gray-200 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-gray-900 border-b-[10px] border-b-transparent ml-1"></div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-[16px] font-semibold text-gray-900 mb-2 font-['Poppins']">
                          {video.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-[14px] text-gray-600 font-['Poppins']">
                            Duration: {video.duration}
                          </span>
                          <button className="px-4 py-2 bg-gray-900 text-white text-[14px] font-medium rounded-lg hover:bg-gray-800 transition-colors font-['Poppins']">
                            Watch Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
