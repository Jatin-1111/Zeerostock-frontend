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
          Account Settings
        </h1>
        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "12.75px",
            color: "#0d1b2a",
            fontWeight: 400,
          }}
        >
          Manage your personal information and account details
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

      {/* Personal Information Section */}
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
          <User
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
            Personal Information
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

        {/* Form Fields */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22.5px",
            marginTop: "22.5px",
          }}
        >
          {/* First Row: First Name and Last Name */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "22.5px",
            }}
          >
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
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
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
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
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

          {/* Second Row: Email and Phone */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "22.5px",
            }}
          >
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
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
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
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
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
      </div>

      {/* Address Information Section */}
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
          <MapPin
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
            Address Information
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

        {/* Form Fields */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22.5px",
            marginTop: "22.5px",
          }}
        >
          {/* Street Address */}
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
              Street Address
            </label>
            <input
              type="text"
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
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

          {/* City, State, ZIP */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 0.84fr",
              gap: "22.5px",
            }}
          >
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
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
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
                State
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
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
                ZIP Code
              </label>
              <input
                type="text"
                value={formData.zip}
                onChange={(e) =>
                  setFormData({ ...formData, zip: e.target.value })
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

          {/* Bio / Company Description */}
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
              Bio / Company Description
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              style={{
                width: "100%",
                height: "150.75px",
                padding: "12px",
                border: "1px solid #bebebe",
                borderRadius: "7.5px",
                fontFamily: "Roboto, sans-serif",
                fontSize: "12px",
                color: "#0d1b2a",
                outline: "none",
                resize: "none",
              }}
            />
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
