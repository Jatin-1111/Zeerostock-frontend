"use client";

import { useState } from "react";

export default function SecuritySettings() {
  const [security, setSecurityData] = useState({
    twoFactor: true,
    loginAlerts: true,
    sessionTimeout: "30 minutes",
  });

  const toggleSecurity = (key: keyof typeof security) => {
    if (typeof security[key] === "boolean") {
      setSecurityData({
        ...security,
        [key]: !security[key],
      });
    }
  };

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
          Security
        </h1>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12.75px",
            color: "#9c9c9c",
            margin: 0,
          }}
        >
          Manage your account security settings
        </p>
      </div>

      {/* Security Settings Card */}
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
            src="https://www.figma.com/api/mcp/asset/5998ba4e-a569-4ffa-a29e-f49aca5a73cd"
            alt="shield"
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
            Security Settings
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

        {/* Content */}
        <div style={{ padding: "26.25px" }}>
          {/* Authentication Section */}
          <div style={{ marginBottom: "37.5px" }}>
            <h3
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                color: "#0d1b2a",
                margin: 0,
                marginBottom: "26.25px",
              }}
            >
              Authentication
            </h3>

            {/* Two-Factor Authentication Toggle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "26.25px",
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
                  Two-Factor Authentication
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11.25px",
                    color: "#747474",
                  }}
                >
                  Add an extra layer of security to your account
                </div>
              </div>
              <button
                onClick={() => toggleSecurity("twoFactor")}
                style={{
                  position: "relative",
                  width: "38.25px",
                  height: "23.25px",
                  backgroundColor: security.twoFactor
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
                    right: security.twoFactor ? "1.5px" : "auto",
                    left: security.twoFactor ? "auto" : "1.5px",
                    transition: "left 0.2s, right 0.2s",
                  }}
                ></div>
              </button>
            </div>

            {/* Session Timeout Input */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "12.75px",
                  color: "#0d1b2a",
                  marginBottom: "10.5px",
                }}
              >
                Session Timeout
              </label>
              <div
                style={{
                  position: "relative",
                  width: "243px",
                }}
              >
                <input
                  type="text"
                  value={security.sessionTimeout}
                  onChange={(e) =>
                    setSecurityData({
                      ...security,
                      sessionTimeout: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    height: "39px",
                    padding: "0 12px",
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "12px",
                    color: "#9c9c9c",
                    border: "1px solid #bebebe",
                    borderRadius: "7.5px",
                    outline: "none",
                  }}
                />
                <img
                  src="https://www.figma.com/api/mcp/asset/209a67ac-d878-4ef9-8688-bbde07012f77"
                  alt="dropdown"
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "7.5px",
                    height: "4.5px",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Security Alerts Section */}
          <div style={{ marginBottom: "37.5px" }}>
            <h3
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                color: "#0d1b2a",
                margin: 0,
                marginBottom: "26.25px",
              }}
            >
              Security Alerts
            </h3>

            {/* Login Alerts Toggle */}
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
                  Login Alerts
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11.25px",
                    color: "#747474",
                  }}
                >
                  Get notified on new login attempts
                </div>
              </div>
              <button
                onClick={() => toggleSecurity("loginAlerts")}
                style={{
                  position: "relative",
                  width: "38.25px",
                  height: "23.25px",
                  backgroundColor: security.loginAlerts
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
                    right: security.loginAlerts ? "1.5px" : "auto",
                    left: security.loginAlerts ? "auto" : "1.5px",
                    transition: "left 0.2s, right 0.2s",
                  }}
                ></div>
              </button>
            </div>
          </div>

          {/* Password Section */}
          <div>
            <h3
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                color: "#0d1b2a",
                margin: 0,
                marginBottom: "26.25px",
              }}
            >
              Password
            </h3>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "7.5px",
                backgroundColor: "#2aae7a",
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
                src="https://www.figma.com/api/mcp/asset/28c4a649-a606-4f22-b391-8742da819e35"
                alt="lock"
                style={{ width: "20.25px", height: "20.25px" }}
              />
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Account Secure Notice */}
      <div
        style={{
          backgroundColor: "#c0daff",
          borderRadius: "15px",
          padding: "15px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          width: "100%",
        }}
      >
        <img
          src="https://www.figma.com/api/mcp/asset/192fd9ec-a8a2-42a2-871b-d81089b689b9"
          alt="info"
          style={{ width: "16.5px", height: "16.5px", flexShrink: 0 }}
        />
        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "13.5px",
            lineHeight: "22.5px",
            color: "#085396",
            margin: 0,
          }}
        >
          Your Account is secure. Last login was today at 2:30 PM from Atlanta,
          GA.
        </p>
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
            src="https://www.figma.com/api/mcp/asset/0711be77-92a1-4062-83c5-86cfc41310bb"
            alt="save"
            style={{ width: "21px", height: "21px" }}
          />
          Save Changes
        </button>
      </div>
    </div>
  );
}
