"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import AccountSettings from "@/components/settings/AccountSettings";
import LanguageSettings from "@/components/settings/LanguageSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import PrivacySettings from "@/components/settings/PrivacySettings";
import SecuritySettings from "@/components/settings/SecuritySettings";

type Tab = "account" | "language" | "notifications" | "privacy" | "security";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("account");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-[#F6F6F6] min-h-screen">
      <div className="max-w-8xl mx-auto h-full">
        {/* Mobile Header with Hamburger */}
        <div className="lg:hidden sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6 text-[#0d1b2a]" />
            ) : (
              <Menu className="w-6 h-6 text-[#0d1b2a]" />
            )}
          </button>
          <h1 className="text-lg font-semibold text-[#0d1b2a]">Settings</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6 min-h-screen relative">
          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black/50 z-30"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`
              lg:relative fixed inset-y-0 left-0 z-40 lg:z-0
              transform lg:transform-none transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
          >
            <SettingsSidebar
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab as Tab);
                setIsSidebarOpen(false);
              }}
              classname="py-4 sm:py-6 md:py-8 lg:py-9 px-3 sm:px-4 md:pl-1.5 md:pr-2.5 min-h-screen"
            />
          </div>

          {/* Content Area */}
          <div className="flex-1 py-4 sm:py-6 md:py-8 lg:py-9 px-3 sm:px-4 md:px-0 flex justify-center">
            <div className="w-full max-w-4xl">
              {activeTab === "account" && <AccountSettings />}
              {activeTab === "language" && <LanguageSettings />}
              {activeTab === "notifications" && <NotificationSettings />}
              {activeTab === "privacy" && <PrivacySettings />}
              {activeTab === "security" && <SecuritySettings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
