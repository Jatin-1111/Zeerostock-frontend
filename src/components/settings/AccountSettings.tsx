"use client";

import { useState, useEffect } from "react";
import { User, MapPin, Save } from "lucide-react";
import { getSettings, updateAccountInfo } from "@/services/settings.service";
import type { AccountInfo } from "@/types/buyer.types";

export default function AccountSettings() {
  const [formData, setFormData] = useState<AccountInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    gstNumber: "",
    bio: "",
    street: "",
    city: "",
    state: "",
    zip: "",
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
        setFormData(response.data.account);
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
      const response = await updateAccountInfo(formData);

      if (response.success) {
        setSuccess("Account information updated successfully");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        throw new Error(response.message || "Update failed");
      }
    } catch (err: any) {
      console.error("Failed to update account:", err);
      setError(err.message || "Failed to update account information");
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
          Account Settings
        </h1>
        <p className="text-[12.75px] text-[#0d1b2a] font-normal">
          Manage your personal information and account details
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

      {/* Personal Information Section */}
      <div className="bg-white rounded-[15px] shadow-[0px_1.5px_4.5px_0px_rgba(0,0,0,0.25)] p-[18px] relative">
        {/* Section Header */}
        <div className="flex items-center gap-[15px] mb-[30px]">
          <User className="w-[19.5px] h-[19.5px] text-[#0d1b2a]" />
          <h2 className="text-[18px] font-semibold text-[#0d1b2a]">
            Personal Information
          </h2>
        </div>

        {/* Divider Line */}
        <div className="absolute left-0 top-[67.5px] w-full h-[1px] bg-[#e5e7eb]" />

        {/* Form Fields */}
        <div className="flex flex-col gap-[22.5px] mt-[22.5px]">
          {/* First Row: First Name and Last Name */}
          <div className="grid grid-cols-2 gap-[22.5px]">
            <div>
              <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[10.5px]">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none"
              />
            </div>
            <div>
              <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[10.5px]">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none"
              />
            </div>
          </div>

          {/* Second Row: Email and Phone */}
          <div className="grid grid-cols-2 gap-[22.5px]">
            <div>
              <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[10.5px]">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none"
              />
            </div>
            <div>
              <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[10.5px]">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Address Information Section */}
      <div className="bg-white rounded-[15px] shadow-[0px_1.5px_4.5px_0px_rgba(0,0,0,0.25)] p-[18px] relative">
        {/* Section Header */}
        <div className="flex items-center gap-[15px] mb-[30px]">
          <MapPin className="w-[19.5px] h-[19.5px] text-[#0d1b2a]" />
          <h2 className="text-[18px] font-semibold text-[#0d1b2a]">
            Address Information
          </h2>
        </div>

        {/* Divider Line */}
        <div className="absolute left-0 top-[67.5px] w-full h-[1px] bg-[#e5e7eb]" />

        {/* Form Fields */}
        <div className="flex flex-col gap-[22.5px] mt-[22.5px]">
          {/* Street Address */}
          <div>
            <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[10.5px]">
              Street Address
            </label>
            <input
              type="text"
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
              className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none"
            />
          </div>

          {/* City, State, ZIP */}
          <div className="grid grid-cols-[1fr_1fr_0.84fr] gap-[22.5px]">
            <div>
              <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[10.5px]">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none"
              />
            </div>
            <div>
              <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[10.5px]">
                State
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none"
              />
            </div>
            <div>
              <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[10.5px]">
                ZIP Code
              </label>
              <input
                type="text"
                value={formData.zip}
                onChange={(e) =>
                  setFormData({ ...formData, zip: e.target.value })
                }
                className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none"
              />
            </div>
          </div>

          {/* Bio / Company Description */}
          <div>
            <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[10.5px]">
              Bio / Company Description
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="w-full h-[150.75px] p-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none resize-none"
            />
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
