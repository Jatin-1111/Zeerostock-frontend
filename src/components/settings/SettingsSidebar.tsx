"use client";

import { Bell, Eye, Globe, ShieldCheck, User } from "lucide-react";

interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  classname: string;
}

export default function SettingsSidebar({
  activeTab,
  onTabChange,
  classname,
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
    <div
      className={`w-full lg:w-[208px] bg-white relative ${classname}`}
    >
      {/* Header */}
      <div className="px-[14px] mb-[30px]">
        <h2 className="text-[17px] font-semibold text-[#0d1b2a] mb-[4px]">
          Settings
        </h2>
        <p className="text-[10px] font-medium text-[#9c9c9c] leading-normal">
          Manage your account and preferences
        </p>
      </div>

      {/* Menu Items */}
      <div className="space-y-[11px] px-[14px]">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-[11px] pl-[17px] pr-[34px] py-[11px] rounded-[7px] text-left transition-colors relative ${
              activeTab === item.id
                ? "bg-[#eeffef]"
                : "bg-transparent hover:bg-gray-50"
            }`}
          >
            {/* Left Border Indicator for Active Tab */}
            {activeTab === item.id && (
              <div className="absolute -left-2 top-0 w-[3px] h-full bg-[#2aae7a] rounded-r-[3px]" />
            )}

            {/* Icon - Now changes color when active */}
            <item.icon
              size={13.5}
              className={
                activeTab === item.id ? "text-[#2aae7a]" : "text-[#8b8b8b]"
              }
            />

            {/* Label */}
            <span
              className={`text-[10.5px] ${
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
