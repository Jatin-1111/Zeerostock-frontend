"use client";

import { useState, useEffect } from "react";
import {
  getSettings,
  updatePrivacySettings,
} from "@/services/settings.service";
import type { PrivacySettings } from "@/types/buyer.types";

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy</h1>
        <p className="text-gray-500">Control your privacy and data settings</p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Privacy Controls */}
      <div className="border-2 border-gray-900 rounded p-6">
        <div className="flex items-center gap-2 mb-6">
          <svg
            className="w-5 h-5 text-gray-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <h2 className="text-lg font-bold text-gray-900">Privacy Controls</h2>
        </div>

        <div className="space-y-6">
          {/* Data & Analytics */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-4">
              Data & Analytics
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Data Sharing</div>
                  <div className="text-sm text-gray-500">
                    Share anonymized data for platform improvement
                  </div>
                </div>
                <button
                  onClick={() => togglePrivacy("dataSharing")}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    privacy.dataSharing ? "bg-gray-900" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      privacy.dataSharing ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">
                    Analytics Tracking
                  </div>
                  <div className="text-sm text-gray-500">
                    Allow usage analytics for better experience
                  </div>
                </div>
                <button
                  onClick={() => togglePrivacy("analytics")}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    privacy.analytics ? "bg-gray-900" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      privacy.analytics ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Data Export & Deletion */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-4">
              Data Export & Deletion
            </h3>
            <div className="flex gap-3">
              <button className="px-6 py-2.5 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Export My Data
              </button>
              <button className="px-6 py-2.5 bg-red-6w00 border-2 border-gray-900 text-white rounded font-medium hover:bg-red-700 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 flex items-center gap-2">
          <svg
            className="w-4 h-4 text-gray-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
          Save Changes
        </button>
      </div>
    </div>
  );
}
