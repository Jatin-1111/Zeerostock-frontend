"use client";

import {
  MessageCircle,
  Phone,
  Mail,
  Video,
  Menu,
  ChevronDown,
  Book,
  PlayCircle,
  Bug,
  MessageSquare,
  Send,
  Star,
} from "lucide-react";
import { useState } from "react";

export default function HelpDesk() {
  const [activeTab, setActiveTab] = useState("faq");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [rating, setRating] = useState(0);

  const tabs = [
    { id: "faq", label: "FAQ" },
    { id: "guides", label: "Guides" },
    { id: "report", label: "Report Bug" },
    { id: "feedback", label: "Feedback" },
  ];

  const filterButtons = [
    { id: "all", label: "All Topics", icon: null },
    { id: "account", label: "Account", icon: null },
    { id: "billing", label: "Billing", icon: null },
    { id: "payments", label: "Payments", icon: null },
    { id: "security", label: "Security", icon: null },
  ];

  const faqs = Array(10).fill({
    question: "How do I verify my business account?",
    answer:
      "To verify your business account, you'll need to provide proof of business registration documents, tax ID card proof of address. Verification typically takes 1-3 business days.",
  });

  const categories = [
    "Select category",
    "User Interface",
    "Search & Filtering",
    "Payments",
    "Messaging",
    "Notifications",
    "Mobile App",
    "Others",
  ];

  const severityLevels = [
    { value: "low", label: "Low - Minor inconvenience" },
    { value: "medium", label: "Medium - Affects functionality" },
    { value: "high", label: "High - Blocks key features" },
    { value: "critical", label: "Critical - System unusable" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 px-8 py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Help & Support
        </h1>
        <p className="text-sm text-gray-600">
          Get the help you need to succeed on Zeerostock
        </p>
      </div>

      {/* Contact Cards */}
      <div className="px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Live Chat Support */}
          <div className="border border-gray-300 p-6 flex flex-col items-center">
            <div className="w-12 h-12 border-2 border-gray-900 rounded-full flex items-center justify-center mb-3">
              <MessageCircle className="w-6 h-6 text-gray-900" />
            </div>
            <p className="text-sm font-medium text-gray-900 mb-3">
              Live Chat Support
            </p>
            <button className="w-full py-2 bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors">
              Start Chat
            </button>
          </div>

          {/* Schedule Call */}
          <div className="border border-gray-300 p-6 flex flex-col items-center">
            <div className="w-12 h-12 border-2 border-gray-900 rounded-full flex items-center justify-center mb-3">
              <Phone className="w-6 h-6 text-gray-900" />
            </div>
            <p className="text-sm font-medium text-gray-900 mb-3">
              Schedule Call
            </p>
            <button className="w-full py-2 bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors">
              Book Call
            </button>
          </div>

          {/* Email Support */}
          <div className="border border-gray-300 p-6 flex flex-col items-center">
            <div className="w-12 h-12 border-2 border-gray-900 rounded-full flex items-center justify-center mb-3">
              <Mail className="w-6 h-6 text-gray-900" />
            </div>
            <p className="text-sm font-medium text-gray-900 mb-3">
              Email Support
            </p>
            <button className="w-full py-2 bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors">
              Send Email
            </button>
          </div>

          {/* Video Tutorials */}
          <div className="border border-gray-300 p-6 flex flex-col items-center">
            <div className="w-12 h-12 border-2 border-gray-900 rounded-full flex items-center justify-center mb-3">
              <Video className="w-6 h-6 text-gray-900" />
            </div>
            <p className="text-sm font-medium text-gray-900 mb-3">
              Video Tutorials
            </p>
            <button className="w-full py-2 bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors">
              Watch Videos
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-300 mb-8">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-gray-900 text-gray-900 bg-gray-100"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <div>
            {/* Filter Buttons */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-900 mb-3">
                Frequently Asked Questions
              </p>
              <p className="text-xs text-gray-600 mb-4">
                Browse common questions about using Zeerostock
              </p>
              <div className="flex flex-wrap gap-2">
                {filterButtons.map((filter) => (
                  <button
                    key={filter.id}
                    className={`px-4 py-2 text-sm font-medium border transition-colors ${
                      filter.id === "all"
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-900 border-gray-300 hover:border-gray-900"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-300">
                  <button
                    onClick={() =>
                      setOpenFaqIndex(openFaqIndex === index ? null : index)
                    }
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-900">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-600 transition-transform ${
                        openFaqIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-6 pb-4 pt-2 border-t border-gray-300">
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guides Tab */}
        {activeTab === "guides" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Getting Started Guide */}
              <div className="border border-gray-300 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Book className="w-8 h-8 text-gray-900" />
                  <h3 className="text-base font-semibold text-gray-900">
                    Getting Started Guide
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Complete setup guide
                </p>
                <p className="text-xs text-gray-500 mb-6">
                  Learn how to set up your account, complete verification, and
                  start listing products on our platform.
                </p>
                <button className="w-full py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  <Book className="w-4 h-4" />
                  Read Guide
                </button>
              </div>

              {/* Video Tutorials */}
              <div className="border border-gray-300 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <PlayCircle className="w-8 h-8 text-gray-900" />
                  <h3 className="text-base font-semibold text-gray-900">
                    Video Tutorials
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Step-by-step videos
                </p>
                <p className="text-xs text-gray-500 mb-6">
                  Watch detailed video tutorials covering all platform features
                  and best practices.
                </p>
                <button className="w-full py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  <PlayCircle className="w-4 h-4" />
                  Watch Videos
                </button>
              </div>

              {/* Getting Started Guide (Repeated) */}
              <div className="border border-gray-300 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Book className="w-8 h-8 text-gray-900" />
                  <h3 className="text-base font-semibold text-gray-900">
                    Getting Started Guide
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Complete setup guide
                </p>
                <p className="text-xs text-gray-500 mb-6">
                  Learn how to set up your account, complete verification, and
                  start listing products on our platform.
                </p>
                <button className="w-full py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  <Book className="w-4 h-4" />
                  Read Guide
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Report Bug Tab */}
        {activeTab === "report" && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bug className="w-5 h-5 text-gray-900" />
              <h2 className="text-lg font-semibold text-gray-900">
                Report a Bug
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Help us improve by reporting any issue you encounter
            </p>

            <div className="max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Bug Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Bug Title
                  </label>
                  <input
                    type="text"
                    placeholder="Brief description of the issue"
                    className="w-full px-4 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-black placeholder:text-black text-black placeholder:text-black"
                  />
                </div>

                {/* Severity */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Severity
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-black">
                    <option>Select severity</option>
                    {severityLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Severity Descriptions */}
              <div className="mb-6">
                <p className="text-xs font-medium text-gray-700 mb-2">
                  Changed before text input box
                </p>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>
                    <span className="font-medium">Low</span> - Minor
                    inconvenience
                  </p>
                  <p>
                    <span className="font-medium">Medium</span> - Affects
                    functionality
                  </p>
                  <p>
                    <span className="font-medium">High</span> - Blocks key
                    features
                  </p>
                  <p>
                    <span className="font-medium">Critical</span> - System
                    unusable
                  </p>
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                >
                  {categories.map((category, index) => (
                    <option
                      key={index}
                      value={category}
                      className={
                        category === "Mobile App" ? "text-blue-600" : ""
                      }
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Detailed Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Detailed Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe what happened, when it happened, and any error messages..."
                  className="w-full px-4 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 resize-none text-black placeholder:text-black text-black placeholder:text-black"
                />
              </div>

              {/* Steps to Reproduce */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Steps to Reproduce
                </label>
                <textarea
                  rows={4}
                  placeholder="1st 2p, 2, Click on..., 3. Enter..., 4.See error"
                  className="w-full px-4 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 resize-none text-black placeholder:text-black text-black placeholder:text-black"
                />
              </div>

              {/* Submit Button */}
              <button className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                <Send className="w-4 h-4" />
                Submit Bug Report
              </button>
            </div>
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === "feedback" && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-gray-900" />
              <h2 className="text-lg font-semibold text-gray-900">
                Share Your Feedback
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Help us improve your experience on Zeerostock
            </p>

            <div className="max-w-2xl">
              {/* Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  How would you rate your overall experience?
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-colors"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Comments (Optional)
                </label>
                <textarea
                  rows={6}
                  placeholder="Tell us what you love about Zeerostock, or what we could improve..."
                  className="w-full px-4 py-3 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 resize-none text-black placeholder:text-black text-black placeholder:text-black"
                />
              </div>

              {/* Submit Button */}
              <button className="w-full py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Submit Feedback
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

