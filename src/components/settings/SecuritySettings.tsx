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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Security</h1>
        <p className="text-gray-500">Manage your account security settings</p>
      </div>

      {/* Security Settings */}
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
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <h2 className="text-lg font-bold text-gray-900">Security Settings</h2>
        </div>

        <div className="space-y-6">
          {/* Authentication */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-4">
              Authentication
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">
                    Two-Factor Authentication
                  </div>
                  <div className="text-sm text-gray-500">
                    Add an extra layer of security to your account
                  </div>
                </div>
                <button
                  onClick={() => toggleSecurity("twoFactor")}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    security.twoFactor ? "bg-gray-900" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      security.twoFactor ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm text-gray-900 mb-2">
                  Session Timeout
                </label>
                <input
                  type="text"
                  value={security.sessionTimeout}
                  onChange={(e) =>
                    setSecurityData({
                      ...security,
                      sessionTimeout: e.target.value,
                    })
                  }
                  className="w-48 px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Security Alerts */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-4">
              Security Alerts
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Login Alerts</div>
                  <div className="text-sm text-gray-500">
                    Get notified of new login attempts
                  </div>
                </div>
                <button
                  onClick={() => toggleSecurity("loginAlerts")}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    security.loginAlerts ? "bg-gray-900" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      security.loginAlerts ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-4">Password</h3>
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Change Password
            </button>
          </div>

          {/* Recent Activity */}
          <div className="mt-6 p-4 bg-gray-50 border-2 border-gray-900 rounded flex items-start gap-2">
            <svg
              className="w-5 h-5 text-gray-900 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-sm text-gray-900">
              <strong>Your account is secure.</strong> Last login was today at
              1:30 PM from Atlanta, GA.
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
