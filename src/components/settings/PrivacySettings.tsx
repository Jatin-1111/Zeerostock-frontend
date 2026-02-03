"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  getUserSettings,
  updateUserPrivacySettings,
} from "@/services/user-settings.service";
import type { PrivacySettings } from "@/types/buyer.types";
import { Bell, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function PrivacySettingsComponent() {
  const { user } = useAuth();
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    dataSharing: true,
    analytics: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const activeRole = user?.activeRole || "buyer";

  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      console.log("[PrivacySettings] Loading with activeRole:", activeRole);
      const response = await getUserSettings(activeRole);

      if (response.success && response.data && response.data.privacy) {
        setPrivacy(response.data.privacy);
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
      const message =
        err instanceof Error ? err.message : "Failed to load settings";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [activeRole]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const togglePrivacy = async (key: keyof PrivacySettings) => {
    const newValue = !privacy[key];
    const updatedPrivacy = { ...privacy, [key]: newValue };

    // Optimistic update
    setPrivacy(updatedPrivacy);
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await updateUserPrivacySettings(
        { [key]: newValue },
        activeRole,
      );

      if (response.success) {
        setSuccess("Privacy settings updated");
        setTimeout(() => setSuccess(null), 3000);
        toast.success("Privacy settings updated");
      } else {
        throw new Error(response.message || "Update failed");
      }
    } catch (err) {
      console.error("Failed to update privacy settings:", err);
      const message =
        err instanceof Error ? err.message : "Failed to update settings";
      setError(message);
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
        "Are you sure you want to delete your account? This action cannot be undone.",
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
      className={`relative w-[28.69px] h-[17.44px] rounded-full transition-colors duration-300 flex-shrink-0 ${
        checked ? "bg-[#2aae7a]" : "bg-[rgba(120,120,128,0.16)]"
      }`}
    >
      <div
        className={`absolute w-[15.19px] h-[15.19px] bg-white rounded-full top-1/2 -translate-y-1/2 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_2.25px_6px_0px_rgba(0,0,0,0.15),0px_2.25px_0.75px_0px_rgba(0,0,0,0.06)] transition-all duration-300 ${
          checked ? "right-[1.13px]" : "left-[1.13px]"
        }`}
      />
    </button>
  );

  return (
    <div className="flex flex-col gap-[16.88px] w-full">
      {/* Title Section */}
      <div className="flex flex-col gap-[5.63px]">
        <h1 className="text-[19.69px] font-semibold text-[#0d1b2a] leading-normal">
          Privacy
        </h1>
        <p className="text-[11.25px] font-medium text-[#9c9c9c] leading-normal">
          Control your privacy and data setting
        </p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-[#dcfce7] border border-[#86efac] text-[#166534] px-[11.25px] py-[9px] rounded-[6.75px] text-[9.56px]">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-[#fee2e2] border border-[#fca5a5] text-[#991b1b] px-[11.25px] py-[9px] rounded-[6.75px] text-[9.56px]">
          {error}
        </div>
      )}

      {/* Privacy Control Card */}
      <div className="bg-white rounded-[11.25px] shadow-[0px_1.5px_4.5px_0px_rgba(0,0,0,0.25)] w-full min-h-[307.13px] relative">
        {/* Card Header */}
        <div className="flex items-center gap-[11.25px] pt-[16.88px] px-[16.88px] pb-[11.25px]">
          <Bell size={14.63} strokeWidth={2} color="#0d1b2a" />
          <h2 className="text-[13.5px] font-semibold text-[#0d1b2a] leading-normal">
            Privacy Control
          </h2>
        </div>

        {/* Top Divider Line */}
        <div className="w-full h-[0.75px] bg-[#e5e7eb] mt-[11.25px]" />

        {/* Data Sharing Toggle Row */}
        <div className="flex items-center justify-between px-[19.69px] py-[19.69px] min-h-[27.56px]">
          <div className="flex flex-col gap-[5.06px]">
            <p className="text-[9.56px] font-medium text-[#0d1b2a] leading-normal">
              Data sharing
            </p>
            <p className="text-[8.44px] font-normal text-[#747474] leading-normal">
              Share anonymized data for platform improvement
            </p>
          </div>
          <ToggleSwitch
            checked={privacy.dataSharing}
            onClick={() => togglePrivacy("dataSharing")}
          />
        </div>

        {/* Analytics Tracking Toggle Row */}
        <div className="flex items-center justify-between px-[19.69px] py-[19.69px] min-h-[27.56px]">
          <div className="flex flex-col gap-[5.06px]">
            <p className="text-[9.56px] font-medium text-[#0d1b2a] leading-normal">
              Analytics Tracking
            </p>
            <p className="text-[8.44px] font-normal text-[#747474] leading-normal">
              Allow analytics tracking for better expreience
            </p>
          </div>
          <ToggleSwitch
            checked={privacy.analytics}
            onClick={() => togglePrivacy("analytics")}
          />
        </div>

        {/* Middle Divider Line */}
        <div className="w-[calc(100%-39.38px)] h-[0.75px] bg-[#e5e7eb] ml-[19.69px]" />

        {/* Data Export & Deletion Section */}
        <div className="px-[19.69px] py-[19.69px] flex flex-col gap-[5.06px]">
          <p className="text-[9.56px] font-medium text-[#0d1b2a] leading-normal">
            Data Export & Deletion
          </p>
          <p className="text-[8.44px] font-normal text-[#747474] leading-normal">
            Export your data or permanently delete your account
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-[14.06px] px-[19.69px] pb-[19.69px]">
          {/* Export My Data Button */}
          <button
            onClick={handleExportData}
            className="flex-1 flex items-center justify-center gap-[5.63px] py-[8.44px] bg-white border border-[#007bff] rounded-[6.75px] h-[30.94px] hover:bg-gray-50 transition-colors"
          >
            <Download size={16.31} strokeWidth={2} color="#007bff" />
            <span className="text-[11.25px] font-medium text-[#007bff] leading-[12.38px]">
              Export My Data
            </span>
          </button>

          {/* Delete Account Button */}
          <button
            onClick={handleDeleteAccount}
            className="flex-1 flex items-center justify-center gap-[5.63px] py-[8.44px] bg-[#e53935] rounded-[6.75px] h-[30.94px] hover:bg-[#d32f2f] transition-colors"
          >
            <Trash2 size={14.63} strokeWidth={2} color="white" />
            <span className="text-[11.25px] font-medium text-white leading-[12.38px]">
              Delete Account
            </span>
          </button>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end mt-[11.25px]">
        <button
          onClick={() => {
            setSuccess("All changes saved successfully");
            setTimeout(() => setSuccess(null), 3000);
          }}
          className="flex items-center justify-center gap-[5.63px] px-[61.88px] py-[8.44px] bg-[#1e3a8a] rounded-[6.75px] h-[36.56px] hover:opacity-90 transition-opacity"
        >
          <Download size={15.75} strokeWidth={2} color="white" />
          <span className="text-[11.25px] font-semibold text-white leading-[12.38px]">
            Save Changes
          </span>
        </button>
      </div>
    </div>
  );
}
