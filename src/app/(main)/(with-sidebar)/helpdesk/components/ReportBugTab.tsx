"use client";

import { useState, useRef, useEffect } from "react";
import { Bug, CheckCircle, Send, ChevronDown } from "lucide-react";
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
  const [severityOpen, setSeverityOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const severityRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  const [bugForm, setBugForm] = useState<BugFormData>({
    title: "",
    category: "",
    severity: "",
    description: "",
    steps_to_reproduce: "",
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        severityRef.current &&
        !severityRef.current.contains(event.target as Node)
      ) {
        setSeverityOpen(false);
      }
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            <div ref={severityRef} className="relative">
              <label className="block text-[17px] font-medium text-[#0d1b2a] mb-2 ">
                Severity
              </label>
              <button
                type="button"
                onClick={() => setSeverityOpen(!severityOpen)}
                className="w-full px-4 py-3 border border-[#bebebe] rounded-[10px] text-base text-left focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] bg-white flex items-center justify-between"
              >
                <span
                  className={
                    bugForm.severity ? "text-[#0d1b2a]" : "text-[#9c9c9c]"
                  }
                >
                  {bugForm.severity
                    ? severityLevels.find((l) => l.value === bugForm.severity)
                        ?.label
                    : "Select severity"}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#9c9c9c] transition-transform duration-300 ${
                    severityOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`absolute z-10 w-full mt-1 bg-white border border-[#bebebe] rounded-[10px] shadow-lg overflow-hidden transition-all duration-300 ${
                  severityOpen
                    ? "max-h-[300px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="py-1">
                  {severityLevels.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => {
                        setBugForm({ ...bugForm, severity: level.value });
                        setSeverityOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-base text-[#0d1b2a] hover:bg-[#eeffef] transition-colors"
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Category */}
          <div ref={categoryRef} className="mb-4 relative">
            <label className="block text-[17px] font-medium text-[#0d1b2a] mb-2 ">
              Category
            </label>
            <button
              type="button"
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="w-full px-4 py-3 border border-[#bebebe] rounded-[10px] text-base text-left focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] bg-white flex items-center justify-between"
            >
              <span
                className={
                  bugForm.category ? "text-[#0d1b2a]" : "text-[#9c9c9c]"
                }
              >
                {bugForm.category || "Select Category"}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[#9c9c9c] transition-transform duration-300 ${
                  categoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`absolute z-10 w-full mt-1 bg-white border border-[#bebebe] rounded-[10px] shadow-lg overflow-hidden transition-all duration-300 ${
                categoryOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="py-1 max-h-[250px] overflow-y-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setBugForm({ ...bugForm, category: cat });
                      setCategoryOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-base text-[#0d1b2a] hover:bg-[#eeffef] transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
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
