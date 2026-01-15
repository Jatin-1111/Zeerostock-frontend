"use client";

import { useState, useEffect, useCallback } from "react";
import { Globe, ChevronDown, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  getUserSettings,
  updateUserLanguagePreferences,
} from "@/services/user-settings.service";
import type { LanguagePreferences } from "@/types/buyer.types";
import { toast } from "sonner";

export default function LanguageSettings() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<LanguagePreferences>({
    language: "English",
    region: "United States",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12-hour",
    currency: "USD",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const activeRole = user?.activeRole || "buyer";

  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("[LanguageSettings] Loading with activeRole:", activeRole);

      // Use role-based settings loader
      const response = await getUserSettings(activeRole);

      if (response.success && response.data) {
        setFormData(response.data.language);
      } else {
        throw new Error(response.message || "Failed to load settings");
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
      const message =
        err instanceof Error ? err.message : "Failed to load settings";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [activeRole]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Use role-based update
      const response = await updateUserLanguagePreferences(
        formData,
        activeRole
      );

      if (response?.success) {
        setSuccess("Language preferences updated successfully");
        toast.success("Language preferences updated successfully");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        throw new Error(response?.message || "Update failed");
      }
    } catch (err) {
      console.error("Failed to update language settings:", err);
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Failed to update language preferences";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[16.88px]">
      {/* Header Section */}
      <div>
        <h1 className="text-[19.69px] font-semibold text-[#0d1b2a] mb-[4.5px] leading-[1.2]">
          Language & Region
        </h1>
        <p className="text-[9.56px] text-[#0d1b2a] font-normal">
          Configure your language preferences and regional settings
        </p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-[#f0fdf4] border border-[#86efac] text-[#166534] px-[9px] py-[6.75px] rounded-[4.5px]">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-[#fef2f2] border border-[#fecaca] text-[#991b1b] px-[9px] py-[6.75px] rounded-[4.5px]">
          {error}
        </div>
      )}

      {/* Language & Region Settings Card */}
      <div className="bg-white rounded-[11.25px] shadow-[0px_1.13px_3.38px_0px_rgba(0,0,0,0.25)] p-[13.5px] relative">
        {/* Section Header */}
        <div className="flex items-center gap-[11.25px] mb-[22.5px]">
          <Globe className="w-[14.63px] h-[14.63px] text-[#0d1b2a]" />
          <h2 className="text-[13.5px] font-semibold text-[#0d1b2a]">
            Language & Region Setting
          </h2>
        </div>

        {/* Divider Line */}
        <div className="absolute left-0 top-[50.63px] w-full h-[0.75px] bg-[#e5e7eb]" />

        {/* Form Content */}
        <div className="mt-[16.88px]">
          {/* Language Settings Section */}
          <div className="mb-[28.13px]">
            <h3 className="text-[11.25px] font-semibold text-[#0d1b2a] mb-[14.06px]">
              Language Setting
            </h3>

            {/* Two Column Grid */}
            <div className="grid grid-cols-2 gap-[27.56px]">
              {/* Interface Language */}
              <div>
                <label className="block text-[9.56px] font-medium text-[#0d1b2a] mb-[7.88px]">
                  Interface Language
                </label>
                <input
                  type="text"
                  value={formData.language}
                  onChange={(e) =>
                    setFormData({ ...formData, language: e.target.value })
                  }
                  className="w-full h-[31.5px] px-[9px] border border-[#bebebe] rounded-[5.63px] text-[9px] text-[#0d1b2a] outline-none"
                />
              </div>

              {/* Region */}
              <div>
                <label className="block text-[9.56px] font-medium text-[#0d1b2a] mb-[7.88px]">
                  Region
                </label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) =>
                    setFormData({ ...formData, region: e.target.value })
                  }
                  className="w-full h-[31.5px] px-[9px] border border-[#bebebe] rounded-[5.63px] text-[9px] text-[#0d1b2a] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Format Preferences Section */}
          <div>
            <h3 className="text-[11.25px] font-semibold text-[#0d1b2a] mb-[14.06px]">
              Format Perferences
            </h3>

            {/* Two Column Grid */}
            <div className="grid grid-cols-2 gap-[27.56px] mb-[23.63px]">
              {/* Date Format */}
              <div>
                <label className="block text-[9.56px] font-medium text-[#0d1b2a] mb-[7.88px]">
                  Date Format
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.dateFormat}
                    onChange={(e) =>
                      setFormData({ ...formData, dateFormat: e.target.value })
                    }
                    className="w-full h-[31.5px] pl-[9px] pr-[27px] border border-[#bebebe] rounded-[5.63px] text-[9px] text-[#0d1b2a] outline-none"
                  />
                  <ChevronDown className="absolute right-[9px] top-1/2 -translate-y-1/2 w-[13.5px] h-[13.5px] text-[#0d1b2a] pointer-events-none" />
                </div>
              </div>

              {/* Time Format */}
              <div>
                <label className="block text-[9.56px] font-medium text-[#0d1b2a] mb-[7.88px]">
                  Time Format
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.timeFormat}
                    onChange={(e) =>
                      setFormData({ ...formData, timeFormat: e.target.value })
                    }
                    className="w-full h-[31.5px] pl-[9px] pr-[27px] border border-[#bebebe] rounded-[5.63px] text-[9px] text-[#0d1b2a] outline-none"
                  />
                  <ChevronDown className="absolute right-[9px] top-1/2 -translate-y-1/2 w-[13.5px] h-[13.5px] text-[#0d1b2a] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Currency - Single Column (Width calc approximated to ~50% minus gap) */}
            <div className="w-[calc(50%-13.78px)]">
              <label className="block text-[9.56px] font-medium text-[#0d1b2a] mb-[7.88px]">
                Currency
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.currency}
                  onChange={(e) =>
                    setFormData({ ...formData, currency: e.target.value })
                  }
                  className="w-full h-[31.5px] pl-[9px] pr-[27px] border border-[#bebebe] rounded-[5.63px] text-[9px] text-[#0d1b2a] outline-none"
                />
                <ChevronDown className="absolute right-[9px] top-1/2 -translate-y-1/2 w-[13.5px] h-[13.5px] text-[#0d1b2a] pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-[5.63px] py-[8.44px] px-[61.88px] bg-[#1e3a8a] text-white rounded-[6.75px] text-[11.25px] font-semibold hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 transition-opacity"
        >
          <Save className="w-[21px] h-[21px] text-white" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
