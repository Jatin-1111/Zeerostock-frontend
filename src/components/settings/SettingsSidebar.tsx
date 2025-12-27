"use client";

import { Menu } from "lucide-react";

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
      icon: "https://www.figma.com/api/mcp/asset/158d8819-bccf-4967-b321-3d15902880bd",
    },
    {
      id: "language",
      label: "Language & Region",
      icon: "https://www.figma.com/api/mcp/asset/c90bb87a-5177-44af-9453-8f53e3c9ff3e",
    },
    {
      id: "notifications",
      label: "Notification",
      icon: "https://www.figma.com/api/mcp/asset/21dbaed2-5abd-4f6e-9969-cdf0803d4855",
    },
    {
      id: "privacy",
      label: "Privacy",
      icon: "https://www.figma.com/api/mcp/asset/d85815de-fc16-46ba-adb7-314c2fc3fd9d",
    },
    {
      id: "security",
      label: "Security",
      icon: "https://www.figma.com/api/mcp/asset/eadf01af-b90c-467a-a4e6-207f11b7a0b0",
    },
  ];

  return (
    <div className="w-full lg:w-[277.5px] bg-white min-h-screen relative">
      {/* Header */}
      <div className="px-[18.75px] mb-[40.5px]">
        <h2 className="text-[22.5px] font-semibold text-[#0d1b2a] font-[family-name:'Poppins'] mb-[5.25px]">
          Settings
        </h2>
        <p className="text-[13.5px] font-medium text-[#9c9c9c] font-[family-name:'Poppins'] leading-normal">
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
              <div className="absolute left-[-18.75px] top-0 w-[3.75px] h-full bg-[#2aae7a] rounded-r-[3.75px]" />
            )}

            {/* Icon */}
            <img
              src={item.icon}
              alt={item.label}
              className="w-[18.75px] h-[18.75px] shrink-0"
            />

            {/* Label */}
            <span
              className={`text-[16.5px] font-[family-name:'Poppins'] ${
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
