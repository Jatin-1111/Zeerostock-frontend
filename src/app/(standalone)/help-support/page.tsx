"use client";

import { useState } from "react";

export default function HelpSupportPage() {
  const [activeTab, setActiveTab] = useState<"faqs" | "guide" | "videos">(
    "faqs"
  );

  const handleEmailSupport = () => {
    window.location.href =
      "mailto:contact@zeerostock.com?subject=Support Request&body=Hi Zeerostock Team,%0D%0A%0D%0AI need help with:%0D%0A";
  };

  const handleScheduleCall = () => {
    window.location.href = "tel:+918956835375";
  };

  const supportCards = [
    {
      icon: "💬",
      title: "Live Chat Support",
      subtitle: "Chat with our team",
      description: "Get instant answers to your questions",
      action: () => alert("Live chat coming soon! 🚀"),
    },
    {
      icon: "📞",
      title: "Schedule Call",
      subtitle: "Book a call",
      description: "Talk to our support team",
      action: handleScheduleCall,
    },
    {
      icon: "✉️",
      title: "Email Support",
      subtitle: "Send us an email",
      description: "We'll respond within 24 hours",
      action: handleEmailSupport,
    },
    {
      icon: "📹",
      title: "Video Tutorials",
      subtitle: "Watch and learn",
      description: "Step-by-step video guides",
      action: () => setActiveTab("videos"),
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Help & Support
          </h1>
          <p className="text-xl text-gray-600">
            We're here to help with anything you need
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
                className="bg-white border-2 border-gray-900 rounded-xl p-6 flex flex-col items-center text-center h-[275px]"
              >
                <div className="text-3xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1 h-[28px] flex items-center">
                  {card.title}
                </h3>
                <p className="text-base text-gray-600 mb-2 h-[20px]">
                  {card.subtitle}
                </p>
                <p className="text-sm text-gray-500 mb-4 h-[20px]">
                  {card.description}
                </p>
                <button
                  onClick={card.action}
                  className="w-full h-[40px] bg-gray-900 text-white text-base font-medium rounded-lg hover:bg-gray-800 transition-colors mt-auto"
                >
                  {card.title === "Schedule Call"
                    ? "Call Now"
                    : card.title === "Email Support"
                    ? "Send Email"
                    : "Start Chat"}
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
              className={`px-6 py-2 text-base font-medium rounded-lg transition-colors ${
                activeTab === "faqs"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              FAQs
            </button>
            <button
              onClick={() => setActiveTab("guide")}
              className={`px-6 py-2 text-base font-medium rounded-lg transition-colors ${
                activeTab === "guide"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Getting Started
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`px-6 py-2 text-base font-medium rounded-lg transition-colors ${
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
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Frequently Asked Questions
                </h2>
                <p className="text-base text-gray-600 mb-6">
                  Find answers to common questions about using Zeerostock
                </p>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="bg-white border-2 border-gray-900 rounded-lg p-6"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-base text-gray-600 mb-4">
                        {faq.answer}
                      </p>
                      <button className="w-full h-[40px] bg-gray-900 text-white text-base font-medium rounded-lg hover:bg-gray-800 transition-colors">
                        Read More
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg text-gray-600">
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
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Getting Started Guide
                </h2>
                <p className="text-lg text-gray-600 text-center mb-8">
                  From a new buyer to an expert - start with tracking faster
                  here
                </p>

                <div className="text-center py-8 mb-8">
                  <div className="text-[64px] mb-4">🚀</div>
                  <p className="text-lg text-gray-600">
                    From a new buyer to expert - start with tracking faster here
                  </p>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      1. What is Zeerostock?
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Zeerostock is a marketplace designed to help B2B buyers
                      and suppliers of surplus inventory. Whether you're looking
                      to acquire items quickly, monetize slow-moving stock, or
                      diversify into brokerage transactions, we optimize the
                      supply chain.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      2. Create Your Account
                    </h3>
                    <ul className="space-y-2 text-base text-gray-700">
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
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      3. How to Browse Inventory
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed mb-2">
                      Find the items you need using powerful search and filter
                      tools:
                    </p>
                    <ul className="space-y-2 text-base text-gray-700">
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
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      4. Posting RFQs (for Buyers)
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Can't find what you're looking for? Post a "Request for
                      Quote (RFQ)" and our suppliers will respond with offers.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      5. Listing Surplus Inventory (for Suppliers)
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Have products to sell? List them on Zeerostock using our
                      intuitive listing tools.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      6. Payments & Orders
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
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
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Video Tutorials Library
                </h2>
                <p className="text-base text-gray-600 mb-6">
                  Step-by-step video guides to help you get the most from
                  Zeerostock
                </p>
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for videos..."
                      className="w-full h-[48px] px-4 pr-10 border-2 border-gray-900 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-gray-900 text-black placeholder:text-black"
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {video.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-base text-gray-600">
                            Duration: {video.duration}
                          </span>
                          <button className="px-4 py-2 bg-gray-900 text-white text-base font-medium rounded-lg hover:bg-gray-800 transition-colors">
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
