"use client";

import { useState } from "react";
import { Bug, CheckCircle, Send } from "lucide-react";
import { authService } from "@/services/auth.service";

interface BugFormData {
  title: string;
  category: string;
  severity: string;
  description: string;
  steps_to_reproduce: string;
}

const categories = [
  "User Interface",
  "Search & Filtering",
  "Payments",
  "Messaging",
  "Notifications",
  "Mobile App",
  "Others",
];

const severityLevels = [
  { value: "low", label: "Low - Minor inconvenience" },
  { value: "medium", label: "Medium - Affects functionality" },
  { value: "high", label: "High - Blocks key features" },
  { value: "critical", label: "Critical - System unusable" },
];

export default function ReportBugTab() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [bugForm, setBugForm] = useState<BugFormData>({
    title: "",
    category: "",
    severity: "",
    description: "",
    steps_to_reproduce: "",
  });

  const handleBugSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const token = authService.getAccessToken();

      if (!token) {
        setSubmitError("Please log in to submit a bug report.");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/bugs/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bugForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setSubmitError(
            "Your session has expired. Please log out and log back in."
          );
        } else {
          setSubmitError(
            data.message || "Failed to submit bug report. Please try again."
          );
        }
        return;
      }

      setSubmitSuccess(true);
      setBugForm({
        title: "",
        category: "",
        severity: "",
        description: "",
        steps_to_reproduce: "",
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Bug submission error:", error);
      setSubmitError("Failed to submit bug report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-[23px] font-semibold text-[#0d1b2a] mb-6 ">
        Report a Bug
      </h2>

      {submitSuccess && (
        <div className="max-w-4xl mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-sm text-green-800 ">
            Bug report submitted successfully! We&apos;ll look into it.
          </p>
        </div>
      )}

      {submitError && (
        <div className="max-w-4xl mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800 ">{submitError}</p>
        </div>
      )}

      <form onSubmit={handleBugSubmit} className="max-w-[885px]">
        <div className="bg-[#fbfbfb] rounded-[15px] shadow-[0px_0px_4.5px_0px_rgba(24,181,34,0.25)] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Bug Title */}
            <div>
              <label className="block text-[17px] font-medium text-[#0d1b2a] mb-2 ">
                Bug Title
              </label>
              <input
                type="text"
                placeholder="Enter short descriptive title for the bug"
                value={bugForm.title}
                onChange={(e) =>
                  setBugForm({ ...bugForm, title: e.target.value })
                }
                required
                className="w-full px-4 py-3 border border-[#bebebe] rounded-[10px] text-base text-[#0d1b2a] placeholder:text-[#9c9c9c] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] "
              />
            </div>

            {/* Severity */}
            <div>
              <label className="block text-[17px] font-medium text-[#0d1b2a] mb-2 ">
                Severity
              </label>
              <select
                value={bugForm.severity}
                onChange={(e) =>
                  setBugForm({ ...bugForm, severity: e.target.value })
                }
                required
                className="w-full px-4 py-3 border border-[#bebebe] rounded-[10px] text-base text-[#9c9c9c] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] "
              >
                <option value="">Select severity</option>
                {severityLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-[17px] font-medium text-[#0d1b2a] mb-2 ">
              Category
            </label>
            <select
              value={bugForm.category}
              onChange={(e) =>
                setBugForm({ ...bugForm, category: e.target.value })
              }
              required
              className="w-full px-4 py-3 border border-[#bebebe] rounded-[10px] text-base text-[#9c9c9c] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] "
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Detailed Requirements */}
          <div className="mb-4">
            <label className="block text-[17px] font-medium text-[#0d1b2a] mb-2 ">
              Detailed Requirements
            </label>
            <textarea
              rows={5}
              placeholder="Provide a detailed description of the bug..."
              value={bugForm.description}
              onChange={(e) =>
                setBugForm({ ...bugForm, description: e.target.value })
              }
              required
              className="w-full px-4 py-3 border border-[#bebebe] rounded-[10px] text-base text-[#0d1b2a] placeholder:text-[#9c9c9c] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] resize-none "
            />
          </div>

          {/* Steps to Reproduce */}
          <div className="mb-6">
            <label className="block text-[17px] font-medium text-[#0d1b2a] mb-2 ">
              Steps to Reproduce
            </label>
            <textarea
              rows={5}
              placeholder="List the steps to reproduce the bug..."
              value={bugForm.steps_to_reproduce}
              onChange={(e) =>
                setBugForm({
                  ...bugForm,
                  steps_to_reproduce: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-[#bebebe] rounded-[10px] text-base text-[#0d1b2a] placeholder:text-[#9c9c9c] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] resize-none "
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-baseline">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-[240px] h-[45px] bg-[#1e3a8a] text-white text-[15px] font-semibold rounded-[11px] hover:bg-[#1e3a8a]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 "
            >
              {isSubmitting ? "Submitting..." : "Submit Bug Report"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
