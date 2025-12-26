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
        <div style={{ color: "#6b7280" }}>Loading settings...</div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "22.5px" }}>
      {/* Header Section */}
      <div>
        <h1
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "26.25px",
            fontWeight: 600,
            color: "#0d1b2a",
            marginBottom: "6px",
            lineHeight: "1.2",
          }}
        >
          Language & Region
        </h1>
        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "12.75px",
            color: "#0d1b2a",
            fontWeight: 400,
          }}
        >
          Configure your language preferences and regional settings
        </p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "1px solid #86efac",
            color: "#166534",
            padding: "9px 12px",
            borderRadius: "6px",
          }}
        >
          {success}
        </div>
      )}
      {error && (
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#991b1b",
            padding: "9px 12px",
            borderRadius: "6px",
          }}
        >
          {error}
        </div>
      )}

      {/* Language & Region Settings Card */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "15px",
          boxShadow: "0px 1.5px 4.5px 0px rgba(0,0,0,0.25)",
          padding: "18px",
          position: "relative",
        }}
      >
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          <Globe
            style={{ width: "19.5px", height: "19.5px", color: "#0d1b2a" }}
          />
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "18px",
              fontWeight: 600,
              color: "#0d1b2a",
            }}
          >
            Language & Region Setting
          </h2>
        </div>

        {/* Divider Line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "67.5px",
            width: "100%",
            height: "1px",
            backgroundColor: "#e5e7eb",
          }}
        />

        {/* Form Content */}
        <div style={{ marginTop: "22.5px" }}>
          {/* Language Settings Section */}
          <div style={{ marginBottom: "37.5px" }}>
            <h3
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "15px",
                fontWeight: 600,
                color: "#0d1b2a",
                marginBottom: "18.75px",
              }}
            >
              Language Setting
            </h3>

            {/* Two Column Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "36.75px",
              }}
            >
              {/* Interface Language */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "12.75px",
                    fontWeight: 500,
                    color: "#0d1b2a",
                    marginBottom: "10.5px",
                  }}
                >
                  Interface Language
                </label>
                <input
                  type="text"
                  value={formData.language}
                  onChange={(e) =>
                    setFormData({ ...formData, language: e.target.value })
                  }
                  style={{
                    width: "100%",
                    height: "42px",
                    padding: "0 12px",
                    border: "1px solid #bebebe",
                    borderRadius: "7.5px",
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "12px",
                    color: "#0d1b2a",
                    outline: "none",
                  }}
                />
              </div>

              {/* Region */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "12.75px",
                    fontWeight: 500,
                    color: "#0d1b2a",
                    marginBottom: "10.5px",
                  }}
                >
                  Region
                </label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) =>
                    setFormData({ ...formData, region: e.target.value })
                  }
                  style={{
                    width: "100%",
                    height: "42px",
                    padding: "0 12px",
                    border: "1px solid #bebebe",
                    borderRadius: "7.5px",
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "12px",
                    color: "#0d1b2a",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Format Preferences Section */}
          <div>
            <h3
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "15px",
                fontWeight: 600,
                color: "#0d1b2a",
                marginBottom: "18.75px",
              }}
            >
              Format Perferences
            </h3>

            {/* Two Column Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "36.75px",
                marginBottom: "31.5px",
              }}
            >
              {/* Date Format */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "12.75px",
                    fontWeight: 500,
                    color: "#0d1b2a",
                    marginBottom: "10.5px",
                  }}
                >
                  Date Format
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    value={formData.dateFormat}
                    onChange={(e) =>
                      setFormData({ ...formData, dateFormat: e.target.value })
                    }
                    style={{
                      width: "100%",
                      height: "42px",
                      padding: "0 36px 0 12px",
                      border: "1px solid #bebebe",
                      borderRadius: "7.5px",
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "12px",
                      color: "#0d1b2a",
                      outline: "none",
                    }}
                  />
                  <ChevronDown
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "18px",
                      height: "18px",
                      color: "#0d1b2a",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>

              {/* Time Format */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "12.75px",
                    fontWeight: 500,
                    color: "#0d1b2a",
                    marginBottom: "10.5px",
                  }}
                >
                  Time Format
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    value={formData.timeFormat}
                    onChange={(e) =>
                      setFormData({ ...formData, timeFormat: e.target.value })
                    }
                    style={{
                      width: "100%",
                      height: "42px",
                      padding: "0 36px 0 12px",
                      border: "1px solid #bebebe",
                      borderRadius: "7.5px",
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "12px",
                      color: "#0d1b2a",
                      outline: "none",
                    }}
                  />
                  <ChevronDown
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "18px",
                      height: "18px",
                      color: "#0d1b2a",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Currency - Single Column */}
            <div style={{ maxWidth: "calc(50% - 18.375px)" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12.75px",
                  fontWeight: 500,
                  color: "#0d1b2a",
                  marginBottom: "10.5px",
                }}
              >
                Currency
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={formData.currency}
                  onChange={(e) =>
                    setFormData({ ...formData, currency: e.target.value })
                  }
                  style={{
                    width: "100%",
                    height: "42px",
                    padding: "0 36px 0 12px",
                    border: "1px solid #bebebe",
                    borderRadius: "7.5px",
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "12px",
                    color: "#0d1b2a",
                    outline: "none",
                  }}
                />
                <ChevronDown
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "18px",
                    height: "18px",
                    color: "#0d1b2a",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7.5px",
            padding: "11.25px 82.5px",
            backgroundColor: "#1e3a8a",
            color: "white",
            border: "none",
            borderRadius: "9px",
            fontFamily: "Poppins, sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            cursor: saving ? "not-allowed" : "pointer",
            opacity: saving ? 0.6 : 1,
          }}
        >
          <Save style={{ width: "21px", height: "21px", color: "white" }} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
