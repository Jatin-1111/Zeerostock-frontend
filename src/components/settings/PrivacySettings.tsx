"use client";

import { useState, useEffect } from "react";
import {
  getSettings,
  updatePrivacySettings,
} from "@/services/settings.service";
import type { PrivacySettings } from "@/types/buyer.types";
import { Bell, Download, Trash2 } from "lucide-react";

export default function PrivacySettingsComponent() {
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    dataSharing: true,
    analytics: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await getSettings();

      if (response.success && response.data) {
        setPrivacy(response.data.privacy);
      }
    } catch (err: any) {
      console.error("Failed to load settings:", err);
      setError(err.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const togglePrivacy = async (key: keyof PrivacySettings) => {
    const newValue = !privacy[key];
    const updatedPrivacy = { ...privacy, [key]: newValue };

    // Optimistic update
    setPrivacy(updatedPrivacy);
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await updatePrivacySettings({ [key]: newValue });

      if (response.success) {
        setSuccess("Privacy settings updated");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        throw new Error(response.message || "Update failed");
      }
    } catch (err: any) {
      console.error("Failed to update privacy settings:", err);
      setError(err.message || "Failed to update settings");
      // Revert on error
      setPrivacy({ ...privacy, [key]: !newValue });
    } finally {
      setSaving(false);
    }
  };

  const handleExportData = () => {
    // TODO: Implement data export functionality
    console.log("Export data clicked");
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion with confirmation
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      console.log("Delete account confirmed");
      // API call would go here
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-[90px]">
        <div className="text-[#9c9c9c] text-[15px]">Loading settings...</div>
      </div>
    );
  }

  // Helper component for Toggle Switch (reused pattern)
  const ToggleSwitch = ({
    checked,
    onClick,
  }: {
    checked: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`relative w-[38.25px] h-[23.25px] rounded-full transition-colors duration-300 flex-shrink-0 ${
        checked ? "bg-[#2aae7a]" : "bg-[rgba(120,120,128,0.16)]"
      }`}
    >
      <div
        className={`absolute w-[20.25px] h-[20.25px] bg-white rounded-full top-1/2 -translate-y-1/2 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_3px_8px_0px_rgba(0,0,0,0.15),0px_3px_1px_0px_rgba(0,0,0,0.06)] transition-all duration-300 ${
          checked ? "right-[1.5px]" : "left-[1.5px]"
        }`}
      />
    </button>
  );

  return (
    <div className="flex flex-col gap-[22.5px] w-full">
      {/* Title Section */}
      <div className="flex flex-col gap-[7.5px]">
        <h1 className="text-[26.25px] font-semibold text-[#0d1b2a] leading-normal">
          Privacy
        </h1>
        <p className="text-[15px] font-medium text-[#9c9c9c] leading-normal">
          Control your privacy and data setting
        </p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-[#dcfce7] border border-[#86efac] text-[#166534] px-[15px] py-[12px] rounded-[9px] text-[12.75px]">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-[#fee2e2] border border-[#fca5a5] text-[#991b1b] px-[15px] py-[12px] rounded-[9px] text-[12.75px]">
          {error}
        </div>
      )}

      {/* Privacy Control Card */}
      <div className="bg-white rounded-[15px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.25)] w-full min-h-[409.5px] relative">
        {/* Card Header */}
        <div className="flex items-center gap-[15px] pt-[22.5px] px-[22.5px] pb-[15px]">
          <Bell size={19.5} strokeWidth={2} color="#0d1b2a" />
          <h2 className="text-[18px] font-semibold text-[#0d1b2a] leading-normal">
            Privacy Control
          </h2>
        </div>

        {/* Top Divider Line */}
        <div className="w-full h-[1px] bg-[#e5e7eb] mt-[15px]" />

        {/* Data Sharing Toggle Row */}
        <div className="flex items-center justify-between px-[26.25px] py-[26.25px] min-h-[36.75px]">
          <div className="flex flex-col gap-[6.75px]">
            <p className="text-[12.75px] font-medium text-[#0d1b2a] leading-normal">
              Data sharing
            </p>
            <p className="text-[11.25px] font-normal text-[#747474] leading-normal">
              Share anonymized data for platform improvement
            </p>
          </div>
          <ToggleSwitch
            checked={privacy.dataSharing}
            onClick={() => togglePrivacy("dataSharing")}
          />
        </div>

        {/* Analytics Tracking Toggle Row */}
        <div className="flex items-center justify-between px-[26.25px] py-[26.25px] min-h-[36.75px]">
          <div className="flex flex-col gap-[6.75px]">
            <p className="text-[12.75px] font-medium text-[#0d1b2a] leading-normal">
              Analytics Tracking
            </p>
            <p className="text-[11.25px] font-normal text-[#747474] leading-normal">
              Allow analytics tracking for better expreience
            </p>
          </div>
          <ToggleSwitch
            checked={privacy.analytics}
            onClick={() => togglePrivacy("analytics")}
          />
        </div>

        {/* Middle Divider Line */}
        <div className="w-[calc(100%-52.5px)] h-[1px] bg-[#e5e7eb] ml-[26.25px]" />

        {/* Data Export & Deletion Section */}
        <div className="px-[26.25px] py-[26.25px] flex flex-col gap-[6.75px]">
          <p className="text-[12.75px] font-medium text-[#0d1b2a] leading-normal">
            Data Export & Deletion
          </p>
          <p className="text-[11.25px] font-normal text-[#747474] leading-normal">
            Export your data or permanently delete your account
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-[18.75px] px-[26.25px] pb-[26.25px]">
          {/* Export My Data Button */}
          <button
            onClick={handleExportData}
            className="flex items-center justify-center gap-[7.5px] px-[82.5px] py-[11.25px] bg-white border border-[#007bff] rounded-[9px] h-[41.25px] flex-shrink-0 hover:bg-gray-50 transition-colors"
          >
            <Download size={21.75} strokeWidth={2} color="#007bff" />
            <span className="text-[15px] font-medium text-[#007bff] leading-[16.5px]">
              Export My Data
            </span>
          </button>

          {/* Delete Account Button */}
          <button
            onClick={handleDeleteAccount}
            className="flex items-center justify-center gap-[7.5px] px-[82.5px] py-[11.25px] bg-[#e53935] rounded-[9px] h-[41.25px] flex-shrink-0 hover:bg-[#d32f2f] transition-colors"
          >
            <Trash2 size={19.5} strokeWidth={2} color="white" />
            <span className="text-[15px] font-medium text-white leading-[16.5px]">
              Delete Account
            </span>
          </button>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end mt-[15px]">
        <button
          onClick={() => {
            setSuccess("All changes saved successfully");
            setTimeout(() => setSuccess(null), 3000);
          }}
          className="flex items-center justify-center gap-[7.5px] px-[82.5px] py-[11.25px] bg-[#1e3a8a] rounded-[9px] h-[48.75px] hover:opacity-90 transition-opacity"
        >
          <Download
            size={21}
            strokeWidth={2}
            color="white"
            className="rotate-180"
          />
          <span className="text-[15px] font-semibold text-white leading-[16.5px]">
            Save Changes
          </span>
        </button>
      </div>
    </div>
  );
}
