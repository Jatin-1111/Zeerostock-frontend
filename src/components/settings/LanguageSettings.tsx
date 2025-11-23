"use client";

import { useState } from "react";

export default function LanguageSettings() {
  const [formData, setFormData] = useState({
    language: "English",
    region: "United States",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12-hour (AM/PM)",
    currency: "USD -US Dollar",
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Language & Region
        </h1>
        <p className="text-gray-500">
          Configure your language preferences and regional settings
        </p>
      </div>

      {/* Language & Region Settings */}
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
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-lg font-bold text-gray-900">
            Language & Region Settings
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Column - Language Settings */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900">
              Language Settings
            </h3>

            <div>
              <label className="block text-sm text-gray-900 mb-2">
                Interface Language
              </label>
              <input
                type="text"
                value={formData.language}
                onChange={(e) =>
                  setFormData({ ...formData, language: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-900 mb-2">Region</label>
              <input
                type="text"
                value={formData.region}
                onChange={(e) =>
                  setFormData({ ...formData, region: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
          </div>

          {/* Right Column - Format Preferences */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900">
              Format Preferences
            </h3>

            <div>
              <label className="block text-sm text-gray-900 mb-2">
                Date Format
              </label>
              <input
                type="text"
                value={formData.dateFormat}
                onChange={(e) =>
                  setFormData({ ...formData, dateFormat: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-900 mb-2">
                Time Format
              </label>
              <input
                type="text"
                value={formData.timeFormat}
                onChange={(e) =>
                  setFormData({ ...formData, timeFormat: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-900 mb-2">
                Currency
              </label>
              <input
                type="text"
                value={formData.currency}
                onChange={(e) =>
                  setFormData({ ...formData, currency: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
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
