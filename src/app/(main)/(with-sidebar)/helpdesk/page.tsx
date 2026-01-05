"use client";

import { useState } from "react";
import { MessageCircle, Phone, Mail, Video } from "lucide-react";
import FAQTab from "./components/FAQTab";
import GuidesTab from "./components/GuidesTab";
import ReportBugTab from "./components/ReportBugTab";
import FeedbackTab from "./components/FeedbackTab";

export default function HelpDesk() {
  const [activeTab, setActiveTab] = useState("faq");

  const tabs = [
    { id: "faq", label: "FAQ" },
    { id: "guides", label: "Guides" },
    { id: "report", label: "Report Bug" },
    { id: "feedback", label: "Feedback" },
  ];

  const supportCards = [
    {
      id: 1,
      icon: MessageCircle,
      title: "Live Chat Support",
      description: "Get instant help from our support teams",
      buttonText: "Start Chat",
      href: "#",
    },
    {
      id: 2,
      icon: Phone,
      title: "Schedule Call", // Reverted to original
      description: "Book a call with our expert", // Reverted to original
      buttonText: "Book Call",
      href: "tel:+918956835375", // Updated contact detail here only
    },
    {
      id: 3,
      icon: Mail,
      title: "Email Support", // Reverted to original
      description: "Send us detailed questions", // Reverted to original
      buttonText: "Send Email",
      href: "mailto:contact@zeerostock.com", // Updated contact detail here only
    },
    {
      id: 4,
      icon: Video,
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      buttonText: "Watch Videos",
      href: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-15 py-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-[30px] font-semibold text-[#0d1b2a]">
            Help & Support
          </h1>
          <p className="text-lg font-medium text-[#9c9c9c]">
            Get the help you need to succeed on Zeerostock
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="px-15 pb-9">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {supportCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                className="flex min-h-[215px] flex-col items-center rounded-[15px] border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center">
                  <IconComponent
                    className="h-9 w-9 text-[#18b522]"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="mb-2 text-center text-base font-semibold text-[#0d1b2a]">
                  {card.title}
                </p>
                <p className="mb-6 text-center text-sm font-medium leading-relaxed text-[#9c9c9c]">
                  {card.description}
                </p>

                {/* Logic to handle links vs buttons */}
                {card.href !== "#" ? (
                  <a
                    href={card.href}
                    className="mt-auto flex w-[150px] items-center justify-center rounded-[15px] bg-[#1e3a8a] px-2 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1e3a8a]/90"
                  >
                    {card.buttonText}
                  </a>
                ) : (
                  <button className="mt-auto w-[150px] rounded-[15px] bg-[#1e3a8a] px-2 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1e3a8a]/90">
                    {card.buttonText}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-15">
        <div className="border-b border-gray-300">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-15 py-9">
        {activeTab === "faq" && <FAQTab />}
        {activeTab === "guides" && <GuidesTab />}
        {activeTab === "report" && <ReportBugTab />}
        {activeTab === "feedback" && <FeedbackTab />}
      </div>
    </div>
  );
}
