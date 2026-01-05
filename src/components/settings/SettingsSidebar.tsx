"use client";

import { Bell, Eye, Globe, ShieldCheck, User } from "lucide-react";

interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SettingsSidebar({
  activeTab,
  onTabChange,
}: SettingsSidebarProps) {
  const menuItems = [
    {
      id: "account",
      label: "Account Setting",
      icon: User,
    },
    {
      id: "language",
      label: "Language & Region",
      icon: Globe,
    },
    {
      id: "notifications",
      label: "Notification",
      icon: Bell,
    },
    {
      id: "privacy",
      label: "Privacy",
      icon: Eye,
    },
    {
      id: "security",
      label: "Security",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="w-full lg:w-[277.5px] bg-white min-h-screen relative">
      {/* Header */}
      <div className="px-[18.75px] mb-[40.5px]">
        <h2 className="text-[22.5px] font-semibold text-[#0d1b2a] mb-[5.25px]">
          Settings
        </h2>
        <p className="text-[13.5px] font-medium text-[#9c9c9c] leading-normal">
          Manage your account and preferences
        </p>
      </div>

      {/* Menu Items */}
      <div className="space-y-[14.25px] px-[18.75px]">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-[15px] pl-[22.5px] pr-[45px] py-[15px] rounded-[9px] text-left transition-colors relative ${
              activeTab === item.id
                ? "bg-[#eeffef]"
                : "bg-transparent hover:bg-gray-50"
            }`}
          >
            {/* Left Border Indicator for Active Tab */}
            {activeTab === item.id && (
              <div className="absolute -left-2.5 top-0 w-[3.75px] h-full bg-[#2aae7a] rounded-r-[3.75px]" />
            )}

            {/* Icon - Now changes color when active */}
            <item.icon
              size={18}
              className={
                activeTab === item.id ? "text-[#2aae7a]" : "text-[#8b8b8b]"
              }
            />

            {/* Label */}
            <span
              className={`text-[14px] ${
                activeTab === item.id
                  ? "text-[#2aae7a] font-semibold"
                  : "text-[#8b8b8b] font-medium"
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
