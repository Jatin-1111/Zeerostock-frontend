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
    marketing: false,
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 0",
        }}
      >
        <div style={{ color: "#9c9c9c" }}>Loading settings...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "31.5px",
        width: "100%",
      }}
    >
      {/* Title Section */}
      <div>
        <h1
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "26.25px",
            color: "#0d1b2a",
            margin: 0,
            marginBottom: "6px",
          }}
        >
          Notification
        </h1>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12.75px",
            color: "#9c9c9c",
            margin: 0,
          }}
        >
          Manage your notification preferences
        </p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "1px solid #86efac",
            color: "#166534",
            padding: "12px 16px",
            borderRadius: "8px",
          }}
        >
          {success}
        </div>
      )}
      {error && (
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #fca5a5",
            color: "#991b1b",
            padding: "12px 16px",
            borderRadius: "8px",
          }}
        >
          {error}
        </div>
      )}

      {/* Communication Channels Card */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "15px",
          boxShadow: "0px 1.5px 4.5px 0px rgba(0,0,0,0.25)",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {/* Card Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            padding: "15px 18.75px",
          }}
        >
          <img
            src="https://www.figma.com/api/mcp/asset/ce32da10-d37d-4b34-adf2-72a583dec5d3"
            alt="notification"
            style={{ width: "19.5px", height: "19.5px" }}
          />
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "18px",
              color: "#0d1b2a",
              margin: 0,
            }}
          >
            Communication Channels
          </h2>
        </div>

        {/* Divider Line */}
        <div
          style={{
            height: "0.75px",
            backgroundColor: "#e5e7eb",
            width: "100%",
          }}
        ></div>

        {/* Toggle Items */}
        <div style={{ padding: "26.25px" }}>
          {/* Email Notification */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "55.5px",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "12.75px",
                  color: "#0d1b2a",
                  marginBottom: "6px",
                }}
              >
                Email Notification
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11.25px",
                  color: "#747474",
                }}
              >
                Receive important updated via email
              </div>
            </div>
            <button
              onClick={() => toggleNotification("email")}
              style={{
                position: "relative",
                width: "38.25px",
                height: "23.25px",
                backgroundColor: notifications.email
                  ? "#2aae7a"
                  : "rgba(120,120,128,0.16)",
                border: "none",
                borderRadius: "100px",
                cursor: "pointer",
                transition: "background-color 0.2s",
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
                  boxShadow:
                    "0px 0px 0px 0.75px rgba(0,0,0,0.04), 0px 2.25px 6px 0px rgba(0,0,0,0.15), 0px 2.25px 0.75px 0px rgba(0,0,0,0.06)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: notifications.email ? "1.5px" : "auto",
                  left: notifications.email ? "auto" : "1.5px",
                  transition: "left 0.2s, right 0.2s",
                }}
              ></div>
            </button>
          </div>

          {/* SMS Notification */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "55.5px",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "12.75px",
                  color: "#0d1b2a",
                  marginBottom: "6px",
                }}
              >
                SMS Notification
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11.25px",
                  color: "#747474",
                }}
              >
                Get urgent alerts via text message
              </div>
            </div>
            <button
              onClick={() => toggleNotification("sms")}
              style={{
                position: "relative",
                width: "38.25px",
                height: "23.25px",
                backgroundColor: notifications.sms
                  ? "#2aae7a"
                  : "rgba(120,120,128,0.16)",
                border: "none",
                borderRadius: "100px",
                cursor: "pointer",
                transition: "background-color 0.2s",
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
                  boxShadow:
                    "0px 0px 0px 0.75px rgba(0,0,0,0.04), 0px 2.25px 6px 0px rgba(0,0,0,0.15), 0px 2.25px 0.75px 0px rgba(0,0,0,0.06)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: notifications.sms ? "1.5px" : "auto",
                  left: notifications.sms ? "auto" : "1.5px",
                  transition: "left 0.2s, right 0.2s",
                }}
              ></div>
            </button>
          </div>

          {/* Push Notification */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "12.75px",
                  color: "#0d1b2a",
                  marginBottom: "6px",
                }}
              >
                Push Notification
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11.25px",
                  color: "#747474",
                }}
              >
                Browser and mobile app alerts
              </div>
            </div>
            <button
              onClick={() => toggleNotification("push")}
              style={{
                position: "relative",
                width: "38.25px",
                height: "23.25px",
                backgroundColor: notifications.push
                  ? "#2aae7a"
                  : "rgba(120,120,128,0.16)",
                border: "none",
                borderRadius: "100px",
                cursor: "pointer",
                transition: "background-color 0.2s",
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
                  boxShadow:
                    "0px 0px 0px 0.75px rgba(0,0,0,0.04), 0px 2.25px 6px 0px rgba(0,0,0,0.15), 0px 2.25px 0.75px 0px rgba(0,0,0,0.06)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: notifications.push ? "1.5px" : "auto",
                  left: notifications.push ? "auto" : "1.5px",
                  transition: "left 0.2s, right 0.2s",
                }}
              ></div>
            </button>
          </div>
        </div>
      </div>

      {/* Content Preferences Card */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "15px",
          boxShadow: "0px 1.5px 4.5px 0px rgba(0,0,0,0.25)",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {/* Card Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            padding: "15px 18.75px",
          }}
        >
          <img
            src="https://www.figma.com/api/mcp/asset/29b789fe-36e7-4422-b505-85b11b8adc69"
            alt="book"
            style={{ width: "19.5px", height: "19.5px" }}
          />
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "18px",
              color: "#0d1b2a",
              margin: 0,
            }}
          >
            Content Preferences
          </h2>
        </div>

        {/* Divider Line */}
        <div
          style={{
            height: "0.75px",
            backgroundColor: "#e5e7eb",
            width: "100%",
          }}
        ></div>

        {/* Toggle Items */}
        <div style={{ padding: "26.25px" }}>
          {/* Marketing Emails */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "55.5px",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "12.75px",
                  color: "#0d1b2a",
                  marginBottom: "6px",
                }}
              >
                Marketing Emails
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11.25px",
                  color: "#747474",
                }}
              >
                New features, tips and special offers
              </div>
            </div>
            <button
              onClick={() => toggleNotification("marketing")}
              style={{
                position: "relative",
                width: "38.25px",
                height: "23.25px",
                backgroundColor: notifications.marketing
                  ? "#2aae7a"
                  : "rgba(120,120,128,0.16)",
                border: "none",
                borderRadius: "100px",
                cursor: "pointer",
                transition: "background-color 0.2s",
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
                  boxShadow:
                    "0px 0px 0px 0.75px rgba(0,0,0,0.04), 0px 2.25px 6px 0px rgba(0,0,0,0.15), 0px 2.25px 0.75px 0px rgba(0,0,0,0.06)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: notifications.marketing ? "1.5px" : "auto",
                  left: notifications.marketing ? "auto" : "1.5px",
                  transition: "left 0.2s, right 0.2s",
                }}
              ></div>
            </button>
          </div>

          {/* Weekly Digest */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "55.5px",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "12.75px",
                  color: "#0d1b2a",
                  marginBottom: "6px",
                }}
              >
                Weekly Digest
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11.25px",
                  color: "#747474",
                }}
              >
                A summary of your account activity
              </div>
            </div>
            <button
              onClick={() => toggleNotification("digest")}
              style={{
                position: "relative",
                width: "38.25px",
                height: "23.25px",
                backgroundColor: notifications.digest
                  ? "#2aae7a"
                  : "rgba(120,120,128,0.16)",
                border: "none",
                borderRadius: "100px",
                cursor: "pointer",
                transition: "background-color 0.2s",
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
                  boxShadow:
                    "0px 0px 0px 0.75px rgba(0,0,0,0.04), 0px 2.25px 6px 0px rgba(0,0,0,0.15), 0px 2.25px 0.75px 0px rgba(0,0,0,0.06)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: notifications.digest ? "1.5px" : "auto",
                  left: notifications.digest ? "auto" : "1.5px",
                  transition: "left 0.2s, right 0.2s",
                }}
              ></div>
            </button>
          </div>

          {/* Price Alerts */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "12.75px",
                  color: "#0d1b2a",
                  marginBottom: "6px",
                }}
              >
                Price Alerts
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11.25px",
                  color: "#747474",
                }}
              >
                Notification on price changes for tracked items
              </div>
            </div>
            <button
              onClick={() => toggleNotification("alerts")}
              style={{
                position: "relative",
                width: "38.25px",
                height: "23.25px",
                backgroundColor: notifications.alerts
                  ? "#2aae7a"
                  : "rgba(120,120,128,0.16)",
                border: "none",
                borderRadius: "100px",
                cursor: "pointer",
                transition: "background-color 0.2s",
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
                  boxShadow:
                    "0px 0px 0px 0.75px rgba(0,0,0,0.04), 0px 2.25px 6px 0px rgba(0,0,0,0.15), 0px 2.25px 0.75px 0px rgba(0,0,0,0.06)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: notifications.alerts ? "1.5px" : "auto",
                  left: notifications.alerts ? "auto" : "1.5px",
                  transition: "left 0.2s, right 0.2s",
                }}
              ></div>
            </button>
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "7.5px",
            backgroundColor: "#1e3a8a",
            color: "white",
            border: "none",
            borderRadius: "9px",
            padding: "11.25px 82.5px",
            cursor: "pointer",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "15px",
          }}
        >
          <img
            src="https://www.figma.com/api/mcp/asset/570d3bda-1cc1-4b5a-8cfc-08ef70922430"
            alt="save"
            style={{ width: "21px", height: "21px" }}
          />
          Save Changes
        </button>
      </div>
    </div>
  );
}
