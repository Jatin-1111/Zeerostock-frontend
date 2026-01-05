"use client";

import { useState, useEffect } from "react";
import { Globe, ChevronDown, Save } from "lucide-react";
import {
  getSettings,
  updateLanguagePreferences,
} from "@/services/settings.service";
import type { LanguagePreferences } from "@/types/buyer.types";

export default function LanguageSettings() {
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

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await getSettings();

      if (response.success && response.data) {
        setFormData(response.data.language);
      }
    } catch (err: any) {
      console.error("Failed to load settings:", err);
      setError(err.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await updateLanguagePreferences(formData);

      if (response.success) {
        setSuccess("Language preferences updated successfully");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        throw new Error(response.message || "Update failed");
      }
    } catch (err: any) {
      console.error("Failed to update language settings:", err);
      setError(err.message || "Failed to update language preferences");
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
    <div className="flex flex-col gap-[22.5px]">
      {/* Header Section */}
      <div>
        <h1 className="text-[26.25px] font-semibold text-[#0d1b2a] mb-[6px] leading-[1.2]">
          Language & Region
        </h1>
        <p className="text-[12.75px] text-[#0d1b2a] font-normal">
          Configure your language preferences and regional settings
        </p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-[#f0fdf4] border border-[#86efac] text-[#166534] px-[12px] py-[9px] rounded-[6px]">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-[#fef2f2] border border-[#fecaca] text-[#991b1b] px-[12px] py-[9px] rounded-[6px]">
          {error}
        </div>
      )}

      {/* Language & Region Settings Card */}
      <div className="bg-white rounded-[15px] shadow-[0px_1.5px_4.5px_0px_rgba(0,0,0,0.25)] p-[18px] relative">
        {/* Section Header */}
        <div className="flex items-center gap-[15px] mb-[30px]">
          <Globe className="w-[19.5px] h-[19.5px] text-[#0d1b2a]" />
          <h2 className="text-[18px] font-semibold text-[#0d1b2a]">
            Language & Region Setting
          </h2>
        </div>

        {/* Divider Line */}
        <div className="absolute left-0 top-[67.5px] w-full h-[1px] bg-[#e5e7eb]" />

        {/* Form Content */}
        <div className="mt-[22.5px]">
          {/* Language Settings Section */}
          <div className="mb-[37.5px]">
            <h3 className="text-[15px] font-semibold text-[#0d1b2a] mb-[18.75px]">
              Language Setting
            </h3>

            {/* Two Column Grid */}
            <div className="grid grid-cols-2 gap-[36.75px]">
              {/* Interface Language */}
              <div>
                <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[10.5px]">
                  Interface Language
                </label>
                <input
                  type="text"
                  value={formData.language}
                  onChange={(e) =>
                    setFormData({ ...formData, language: e.target.value })
                  }
                  className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none"
                />
              </div>

              {/* Region */}
              <div>
                <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[10.5px]">
                  Region
                </label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) =>
                    setFormData({ ...formData, region: e.target.value })
                  }
                  className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Format Preferences Section */}
          <div>
            <h3 className="text-[15px] font-semibold text-[#0d1b2a] mb-[18.75px]">
              Format Perferences
            </h3>

            {/* Two Column Grid */}
            <div className="grid grid-cols-2 gap-[36.75px] mb-[31.5px]">
              {/* Date Format */}
              <div>
                <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[10.5px]">
                  Date Format
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.dateFormat}
                    onChange={(e) =>
                      setFormData({ ...formData, dateFormat: e.target.value })
                    }
                    className="w-full h-[42px] pl-[12px] pr-[36px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none"
                  />
                  <ChevronDown className="absolute right-[12px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#0d1b2a] pointer-events-none" />
                </div>
              </div>

              {/* Time Format */}
              <div>
                <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[10.5px]">
                  Time Format
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.timeFormat}
                    onChange={(e) =>
                      setFormData({ ...formData, timeFormat: e.target.value })
                    }
                    className="w-full h-[42px] pl-[12px] pr-[36px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none"
                  />
                  <ChevronDown className="absolute right-[12px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#0d1b2a] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Currency - Single Column (Width calc approximated to ~50% minus gap) */}
            <div className="w-[calc(50%-18.375px)]">
              <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[10.5px]">
                Currency
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.currency}
                  onChange={(e) =>
                    setFormData({ ...formData, currency: e.target.value })
                  }
                  className="w-full h-[42px] pl-[12px] pr-[36px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none"
                />
                <ChevronDown className="absolute right-[12px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#0d1b2a] pointer-events-none" />
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
          className="flex items-center gap-[7.5px] py-[11.25px] px-[82.5px] bg-[#1e3a8a] text-white rounded-[9px] text-[15px] font-semibold hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 transition-opacity"
        >
          <Save className="w-[21px] h-[21px] text-white" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
