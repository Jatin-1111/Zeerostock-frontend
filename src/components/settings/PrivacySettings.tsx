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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "90px 0",
        }}
      >
        <div
          style={{
            color: "#9c9c9c",
            fontSize: "15px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Loading settings...
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "22.5px",
        width: "100%",
      }}
    >
      {/* Title Section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "7.5px" }}>
        <h1
          style={{
            fontSize: "26.25px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            color: "#0d1b2a",
            margin: 0,
            lineHeight: "normal",
          }}
        >
          Privacy
        </h1>
        <p
          style={{
            fontSize: "15px",
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            color: "#9c9c9c",
            margin: 0,
            lineHeight: "normal",
          }}
        >
          Control your privacy and data setting
        </p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div
          style={{
            backgroundColor: "#dcfce7",
            border: "1px solid #86efac",
            color: "#166534",
            padding: "12px 15px",
            borderRadius: "9px",
            fontSize: "12.75px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {success}
        </div>
      )}
      {error && (
        <div
          style={{
            backgroundColor: "#fee2e2",
            border: "1px solid #fca5a5",
            color: "#991b1b",
            padding: "12px 15px",
            borderRadius: "9px",
            fontSize: "12.75px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {error}
        </div>
      )}

      {/* Privacy Control Card */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "15px",
          boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.25)",
          padding: "0",
          width: "100%",
          minHeight: "409.5px",
          position: "relative",
        }}
      >
        {/* Card Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            padding: "22.5px 22.5px 15px 22.5px",
          }}
        >
          <Bell size={19.5} strokeWidth={2} color="#0d1b2a" />
          <h2
            style={{
              fontSize: "18px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              color: "#0d1b2a",
              margin: 0,
              lineHeight: "normal",
            }}
          >
            Privacy Control
          </h2>
        </div>

        {/* Top Divider Line */}
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#e5e7eb",
            marginTop: "15px",
          }}
        />

        {/* Data Sharing Toggle Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "26.25px 26.25px",
            minHeight: "36.75px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "6.75px" }}
          >
            <p
              style={{
                fontSize: "12.75px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                color: "#0d1b2a",
                margin: 0,
                lineHeight: "normal",
              }}
            >
              Data sharing
            </p>
            <p
              style={{
                fontSize: "11.25px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                color: "#747474",
                margin: 0,
                lineHeight: "normal",
              }}
            >
              Share anonymized data for platform improvement
            </p>
          </div>
          <button
            onClick={() => togglePrivacy("dataSharing")}
            style={{
              position: "relative",
              width: "38.25px",
              height: "23.25px",
              backgroundColor: privacy.dataSharing
                ? "#2aae7a"
                : "rgba(120, 120, 128, 0.16)",
              borderRadius: "100px",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "20.25px",
                height: "20.25px",
                backgroundColor: "white",
                borderRadius: "100px",
                top: "50%",
                transform: "translateY(-50%)",
                [privacy.dataSharing ? "right" : "left"]: "1.5px",
                boxShadow:
                  "0px 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 3px 8px 0px rgba(0, 0, 0, 0.15), 0px 3px 1px 0px rgba(0, 0, 0, 0.06)",
                transition: "left 0.3s, right 0.3s",
              }}
            />
          </button>
        </div>

        {/* Analytics Tracking Toggle Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "26.25px 26.25px",
            minHeight: "36.75px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "6.75px" }}
          >
            <p
              style={{
                fontSize: "12.75px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                color: "#0d1b2a",
                margin: 0,
                lineHeight: "normal",
              }}
            >
              Analytics Tracking
            </p>
            <p
              style={{
                fontSize: "11.25px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                color: "#747474",
                margin: 0,
                lineHeight: "normal",
              }}
            >
              Allow analytics tracking for better expreience
            </p>
          </div>
          <button
            onClick={() => togglePrivacy("analytics")}
            style={{
              position: "relative",
              width: "38.25px",
              height: "23.25px",
              backgroundColor: privacy.analytics
                ? "#2aae7a"
                : "rgba(120, 120, 128, 0.16)",
              borderRadius: "100px",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "20.25px",
                height: "20.25px",
                backgroundColor: "white",
                borderRadius: "100px",
                top: "50%",
                transform: "translateY(-50%)",
                [privacy.analytics ? "right" : "left"]: "1.5px",
                boxShadow:
                  "0px 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 3px 8px 0px rgba(0, 0, 0, 0.15), 0px 3px 1px 0px rgba(0, 0, 0, 0.06)",
                transition: "left 0.3s, right 0.3s",
              }}
            />
          </button>
        </div>

        {/* Middle Divider Line */}
        <div
          style={{
            width: "calc(100% - 52.5px)",
            height: "1px",
            backgroundColor: "#e5e7eb",
            marginLeft: "26.25px",
          }}
        />

        {/* Data Export & Deletion Section */}
        <div
          style={{
            padding: "26.25px 26.25px",
            display: "flex",
            flexDirection: "column",
            gap: "6.75px",
          }}
        >
          <p
            style={{
              fontSize: "12.75px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              color: "#0d1b2a",
              margin: 0,
              lineHeight: "normal",
            }}
          >
            Data Export & Deletion
          </p>
          <p
            style={{
              fontSize: "11.25px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              color: "#747474",
              margin: 0,
              lineHeight: "normal",
            }}
          >
            Export your data or permanently delete your account
          </p>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: "18.75px",
            padding: "0 26.25px 26.25px 26.25px",
          }}
        >
          {/* Export My Data Button */}
          <button
            onClick={handleExportData}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7.5px",
              padding: "11.25px 82.5px",
              backgroundColor: "white",
              border: "1px solid #007bff",
              borderRadius: "9px",
              cursor: "pointer",
              height: "41.25px",
              flexShrink: 0,
            }}
          >
            <Download size={21.75} strokeWidth={2} color="#007bff" />
            <span
              style={{
                fontSize: "15px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                color: "#007bff",
                lineHeight: "16.5px",
              }}
            >
              Export My Data
            </span>
          </button>

          {/* Delete Account Button */}
          <button
            onClick={handleDeleteAccount}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7.5px",
              padding: "11.25px 82.5px",
              backgroundColor: "#e53935",
              border: "none",
              borderRadius: "9px",
              cursor: "pointer",
              height: "41.25px",
              flexShrink: 0,
            }}
          >
            <Trash2 size={19.5} strokeWidth={2} color="white" />
            <span
              style={{
                fontSize: "15px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                color: "white",
                lineHeight: "16.5px",
              }}
            >
              Delete Account
            </span>
          </button>
        </div>
      </div>

      {/* Save Changes Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "15px",
        }}
      >
        <button
          onClick={() => {
            // Settings are saved automatically on toggle, but this provides explicit save option
            setSuccess("All changes saved successfully");
            setTimeout(() => setSuccess(null), 3000);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "7.5px",
            padding: "11.25px 82.5px",
            backgroundColor: "#1e3a8a",
            border: "none",
            borderRadius: "9px",
            cursor: "pointer",
            height: "48.75px",
          }}
        >
          <Download
            size={21}
            strokeWidth={2}
            color="white"
            style={{ transform: "rotate(180deg)" }}
          />
          <span
            style={{
              fontSize: "15px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              color: "white",
              lineHeight: "16.5px",
            }}
          >
            Save Changes
          </span>
        </button>
      </div>
    </div>
  );
}
