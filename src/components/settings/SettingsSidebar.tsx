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
      className={`w-full lg:w-[208px] bg-white lg:rounded-lg lg:shadow-sm ${classname}`}
    >
      {/* Header */}
      <div className="px-4 sm:px-5 md:px-[14px] mb-6 sm:mb-7 md:mb-[30px] pt-14 lg:pt-0">
        <h2 className="text-lg sm:text-xl md:text-[17px] font-semibold text-[#0d1b2a] mb-1.5 sm:mb-2 md:mb-[4px]">
          Settings
        </h2>
        <p className="text-sm sm:text-base md:text-[10px] font-medium text-[#9c9c9c] leading-normal">
          Manage your account and preferences
        </p>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-[11px] px-2 sm:px-3 md:px-[14px] pb-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 sm:gap-3.5 md:gap-[11px] pl-4 sm:pl-5 md:pl-[17px] pr-4 sm:pr-6 md:pr-[34px] py-3 sm:py-3.5 md:py-[11px] rounded-lg text-left transition-all duration-200 relative ${
              activeTab === item.id
                ? "bg-[#eeffef] shadow-sm"
                : "bg-transparent hover:bg-gray-50 active:bg-gray-100"
            }`}
          >
            {/* Left Border Indicator for Active Tab */}
            {activeTab === item.id && (
              <div className="absolute left-0 top-0 w-1 h-full bg-[#2aae7a] rounded-r-md" />
            )}

            {/* Icon */}
            <item.icon
              className={`w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-[13.5px] md:h-[13.5px] flex-shrink-0 ${
                activeTab === item.id ? "text-[#2aae7a]" : "text-[#8b8b8b]"
              }`}
            />

            {/* Label */}
            <span
              className={`text-sm sm:text-base md:text-[10.5px] ${
                activeTab === item.id
                  ? "text-[#2aae7a] font-semibold"
                  : "text-[#6b7280] font-medium"
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
