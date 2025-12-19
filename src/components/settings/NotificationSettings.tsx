"use client";

import { useState, useEffect } from "react";
import {
  getSettings,
  updateNotificationPreferences,
} from "@/services/settings.service";
import type { NotificationPreferences } from "@/types/buyer.types";

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState<NotificationPreferences>({
    email: true,
    sms: false,
    push: true,
    marketing: true,
    digest: false,
    alerts: true,
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
        setNotifications(response.data.notifications);
      }
    } catch (err: any) {
      console.error("Failed to load settings:", err);
      setError(err.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const toggleNotification = async (key: keyof typeof notifications) => {
    const newValue = !notifications[key];
    const updatedNotifications = { ...notifications, [key]: newValue };

    // Optimistic update
    setNotifications(updatedNotifications);
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await updateNotificationPreferences({ [key]: newValue });

      if (response.success) {
        setSuccess("Notification preferences updated");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        throw new Error(response.message || "Update failed");
      }
    } catch (err: any) {
      console.error("Failed to update notification settings:", err);
      setError(err.message || "Failed to update settings");
      // Revert on error
      setNotifications({ ...notifications, [key]: !newValue });
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
        <p className="text-gray-500">Manage your notification preferences</p>
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

      {/* Notification Preferences */}
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
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <h2 className="text-lg font-bold text-gray-900">
            Notification Preferences
          </h2>
        </div>

        <div className="space-y-6">
          {/* Communication Channels */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-4">
              Communication Channels
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">
                    Email Notifications
                  </div>
                  <div className="text-sm text-gray-500">
                    Receive important updates via email
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification("email")}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.email ? "bg-gray-900" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notifications.email ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">
                    SMS Notifications{" "}
                    <span className="text-blue-600 text-sm">add whatsapp</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Get urgent alerts via text message
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification("sms")}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.sms ? "bg-gray-900" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notifications.sms ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">
                    Push Notifications
                  </div>
                  <div className="text-sm text-gray-500">
                    Browser and mobile app notifications
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification("push")}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.push ? "bg-gray-900" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notifications.push ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Content Preference */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-4">
              Content Preference
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">
                    Marketing Emails
                  </div>
                  <div className="text-sm text-gray-500">
                    Receive updates and promotional content
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification("marketing")}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.marketing ? "bg-gray-900" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notifications.marketing ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Weekly Digest</div>
                  <div className="text-sm text-gray-500">
                    Summary of marketplace activity
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification("digest")}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.digest ? "bg-gray-900" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notifications.digest ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Price Alerts</div>
                  <div className="text-sm text-gray-500">
                    Notifications when prices change
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification("alerts")}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.alerts ? "bg-gray-900" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notifications.alerts ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>
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
