"use client";

import { useState } from "react";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import AccountSettings from "@/components/settings/AccountSettings";
import LanguageSettings from "@/components/settings/LanguageSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import PrivacySettings from "@/components/settings/PrivacySettings";
import SecuritySettings from "@/components/settings/SecuritySettings";

type Tab = "account" | "language" | "notifications" | "privacy" | "security";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("account");

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-8xl mx-auto py-9 pl-1.5 pr-4.5">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <SettingsSidebar
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab as Tab)}
          />

          {/* Content Area */}
          <div className="flex-1">
            {activeTab === "account" && <AccountSettings />}
            {activeTab === "language" && <LanguageSettings />}
            {activeTab === "notifications" && <NotificationSettings />}
            {activeTab === "privacy" && <PrivacySettings />}
            {activeTab === "security" && <SecuritySettings />}
          </div>
        </div>
      </div>
    </div>
  );
}
