"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageSquareDot, BookText, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  getUserSettings,
  updateUserNotificationPreferences,
} from "@/services/user-settings.service";

// Local type definition for notification settings structure
interface NotificationSettings {
  emailNotifications: {
    orderUpdates: boolean;
    promotions: boolean;
    accountActivity: boolean;
    newMessages: boolean;
  };
  pushNotifications: {
    orderUpdates: boolean;
    promotions: boolean;
    accountActivity: boolean;
    newMessages: boolean;
  };
}

export default function NotificationSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: {
      orderUpdates: true,
      promotions: false,
      accountActivity: true,
      newMessages: true,
    },
    pushNotifications: {
      orderUpdates: true,
      promotions: false,
      accountActivity: false,
      newMessages: true,
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const activeRole = user?.activeRole || "buyer";

  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      console.log(
        "[NotificationSettings] Loading with activeRole:",
        activeRole
      );
      const response = await getUserSettings(activeRole);

      if (response.success && response.data) {
        // Transform backend NotificationPreferences to component NotificationSettings format
        const backendPrefs = response.data.notifications;
        if (backendPrefs) {
          const componentSettings: NotificationSettings = {
            emailNotifications: {
              orderUpdates: backendPrefs.email,
              promotions: backendPrefs.marketing,
              accountActivity: backendPrefs.alerts,
              newMessages: backendPrefs.email, // Using email as a proxy
            },
            pushNotifications: {
              orderUpdates: backendPrefs.push,
              promotions: backendPrefs.marketing,
              accountActivity: backendPrefs.alerts,
              newMessages: backendPrefs.push, // Using push as a proxy
            },
          };
          setSettings(componentSettings);
        }
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

  const handleToggle = (
    type: "emailNotifications" | "pushNotifications",
    key: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: !prev[type][key as keyof typeof prev.emailNotifications],
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Transform component NotificationSettings to backend NotificationPreferences format
      const backendPrefs = {
        email:
          settings.emailNotifications.orderUpdates ||
          settings.emailNotifications.newMessages,
        sms: false, // Not used in the component
        push:
          settings.pushNotifications.orderUpdates ||
          settings.pushNotifications.newMessages,
        marketing:
          settings.emailNotifications.promotions ||
          settings.pushNotifications.promotions,
        digest: false, // Not used in the component
        alerts:
          settings.emailNotifications.accountActivity ||
          settings.pushNotifications.accountActivity,
      };

      const response = await updateUserNotificationPreferences(
        backendPrefs,
        activeRole
      );

      if (response.success) {
        setSuccess("Notification preferences updated successfully");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        throw new Error(response.message || "Update failed");
      }
    } catch (err) {
      console.error("Failed to update notification settings:", err);
      const message =
        err instanceof Error
          ? err.message
          : "Failed to update notification preferences";
      setError(message);
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

  // Helper component for the Toggle Switch
  const ToggleSwitch = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: () => void;
  }) => (
    <div
      onClick={onChange}
      className={`w-[36px] h-[19.5px] rounded-full relative cursor-pointer transition-colors duration-200 ease-in-out ${
        checked ? "bg-[#1e3a8a]" : "bg-[#e5e7eb]"
      }`}
    >
      <div
        className={`w-[15px] h-[15px] bg-white rounded-full absolute top-[2.25px] shadow-sm transition-transform duration-200 ease-in-out ${
          checked ? "translate-x-[18.75px]" : "translate-x-[2.25px]"
        }`}
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-[22.5px]">
      {/* Header Section */}
      <div>
        <h1 className="text-[26.25px] font-semibold text-[#0d1b2a] mb-[6px] leading-[1.2]">
          Notification Settings
        </h1>
        <p className="text-[12.75px] text-[#0d1b2a] font-normal">
          Manage how you receive notifications and updates
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

      {/* Email Notifications Card */}
      <div className="bg-white rounded-[15px] shadow-[0px_1.5px_4.5px_0px_rgba(0,0,0,0.25)] p-[18px] relative">
        {/* Section Header */}
        <div className="flex items-center gap-[15px] mb-[30px]">
          <MessageSquareDot className="w-[19.5px] h-[19.5px] text-[#0d1b2a]" />
          <h2 className="text-[18px] font-semibold text-[#0d1b2a]">
            Email Notifications
          </h2>
        </div>

        {/* Divider Line */}
        <div className="absolute left-0 top-[67.5px] w-full h-[1px] bg-[#e5e7eb]" />

        {/* List Items */}
        <div className="flex flex-col gap-[22.5px] mt-[22.5px]">
          {/* Order Updates */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12.75px] font-medium text-[#0d1b2a] mb-[3px]">
                Order Updates
              </p>
              <p className="text-[10.5px] text-[#64748b]">
                Receive emails about your order status and delivery
              </p>
            </div>
            <ToggleSwitch
              checked={settings.emailNotifications.orderUpdates}
              onChange={() =>
                handleToggle("emailNotifications", "orderUpdates")
              }
            />
          </div>

          {/* New Messages */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12.75px] font-medium text-[#0d1b2a] mb-[3px]">
                New Messages
              </p>
              <p className="text-[10.5px] text-[#64748b]">
                Get notified when you receive a new message
              </p>
            </div>
            <ToggleSwitch
              checked={settings.emailNotifications.newMessages}
              onChange={() => handleToggle("emailNotifications", "newMessages")}
            />
          </div>

          {/* Account Activity */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12.75px] font-medium text-[#0d1b2a] mb-[3px]">
                Account Activity
              </p>
              <p className="text-[10.5px] text-[#64748b]">
                Alerts for security and account changes
              </p>
            </div>
            <ToggleSwitch
              checked={settings.emailNotifications.accountActivity}
              onChange={() =>
                handleToggle("emailNotifications", "accountActivity")
              }
            />
          </div>

          {/* Promotions */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12.75px] font-medium text-[#0d1b2a] mb-[3px]">
                Promotions & Offers
              </p>
              <p className="text-[10.5px] text-[#64748b]">
                Receive updates about sales and special offers
              </p>
            </div>
            <ToggleSwitch
              checked={settings.emailNotifications.promotions}
              onChange={() => handleToggle("emailNotifications", "promotions")}
            />
          </div>
        </div>
      </div>

      {/* Push Notifications Card */}
      <div className="bg-white rounded-[15px] shadow-[0px_1.5px_4.5px_0px_rgba(0,0,0,0.25)] p-[18px] relative">
        {/* Section Header */}
        <div className="flex items-center gap-[15px] mb-[30px]">
          <BookText className="w-[19.5px] h-[19.5px] text-[#0d1b2a]" />
          <h2 className="text-[18px] font-semibold text-[#0d1b2a]">
            Push Notifications
          </h2>
        </div>

        {/* Divider Line */}
        <div className="absolute left-0 top-[67.5px] w-full h-[1px] bg-[#e5e7eb]" />

        {/* List Items */}
        <div className="flex flex-col gap-[22.5px] mt-[22.5px]">
          {/* Order Updates */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12.75px] font-medium text-[#0d1b2a] mb-[3px]">
                Order Updates
              </p>
              <p className="text-[10.5px] text-[#64748b]">
                Get instant notifications about your orders
              </p>
            </div>
            <ToggleSwitch
              checked={settings.pushNotifications.orderUpdates}
              onChange={() => handleToggle("pushNotifications", "orderUpdates")}
            />
          </div>

          {/* New Messages */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12.75px] font-medium text-[#0d1b2a] mb-[3px]">
                New Messages
              </p>
              <p className="text-[10.5px] text-[#64748b]">
                Instant alerts for new messages
              </p>
            </div>
            <ToggleSwitch
              checked={settings.pushNotifications.newMessages}
              onChange={() => handleToggle("pushNotifications", "newMessages")}
            />
          </div>

          {/* Account Activity */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12.75px] font-medium text-[#0d1b2a] mb-[3px]">
                Account Activity
              </p>
              <p className="text-[10.5px] text-[#64748b]">
                Security alerts and important account updates
              </p>
            </div>
            <ToggleSwitch
              checked={settings.pushNotifications.accountActivity}
              onChange={() =>
                handleToggle("pushNotifications", "accountActivity")
              }
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
