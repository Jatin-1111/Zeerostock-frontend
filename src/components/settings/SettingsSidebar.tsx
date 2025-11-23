"use client";

import {
  User,
  Globe,
  Bell,
  Eye,
  Shield,
  Settings as SettingsIcon,
} from "lucide-react";

interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SettingsSidebar({
  activeTab,
  onTabChange,
}: SettingsSidebarProps) {
  const menuItems = [
    { id: "account", label: "Account Settings", Icon: User },
    { id: "language", label: "Language & Region", Icon: Globe },
    { id: "notifications", label: "Notifications", Icon: Bell },
    { id: "privacy", label: "Privacy", Icon: Eye },
    { id: "security", label: "Security", Icon: Shield },
  ];

  return (
    <div className="w-full lg:w-64 space-y-2">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <SettingsIcon className="w-5 h-5 text-gray-900" />
          <h2 className="text-xl font-bold text-gray-900">Settings</h2>
        </div>
        <p className="text-sm text-gray-500">
          Manage your account and preferences
        </p>
      </div>

      {menuItems.map((item) => {
        const Icon = item.Icon;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded border-2 text-left transition-colors ${
              activeTab === item.id
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-900 border-gray-900 hover:bg-gray-50"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
