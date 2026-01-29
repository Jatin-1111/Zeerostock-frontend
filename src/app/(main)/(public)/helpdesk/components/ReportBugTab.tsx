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
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setSubmitError(
            "Your session has expired. Please log out and log back in.",
          );
        } else {
          setSubmitError(
            data.message || "Failed to submit bug report. Please try again.",
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
    <div className="px-2 sm:px-3 md:px-4 lg:px-5">
      <h2 className="text-base sm:text-lg md:text-[15px] font-semibold text-[#0d1b2a] mb-4 sm:mb-5 md:mb-[16px] ">
        Report a Bug
      </h2>

      {submitSuccess && (
        <div className="w-full mb-2 sm:mb-3 md:mb-[11px] p-2 sm:p-2.5 md:p-[11px] bg-green-50 border border-green-200 rounded-[7px] flex items-center gap-1 sm:gap-1.5 md:gap-[5px]">
          <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-[13px] md:h-[13px] text-green-600 flex-shrink-0" />
          <p className="text-[7px] sm:text-[8px] md:text-[9px] text-green-800 ">
            Bug report submitted successfully! We&apos;ll look into it.
          </p>
        </div>
      )}

      {submitError && (
        <div className="w-full mb-2 sm:mb-3 md:mb-[11px] p-2 sm:p-2.5 md:p-[11px] bg-red-50 border border-red-200 rounded-[7px]">
          <p className="text-[7px] sm:text-[8px] md:text-[9px] text-red-800 ">
            {submitError}
          </p>
        </div>
      )}

      <form
        onSubmit={handleBugSubmit}
        className="w-full sm:w-full md:max-w-[590px] lg:w-[590px]"
      >
        <div className="bg-[#fbfbfb] rounded-[10px] shadow-[0px_0px_4.5px_0px_rgba(24,181,34,0.25)] p-3 sm:p-4 md:p-[16px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-[11px] mb-2 sm:mb-3 md:mb-[11px]">
            {/* Bug Title */}
            <div>
              <label className="block text-xs sm:text-sm md:text-[11px] font-medium text-[#0d1b2a] mb-1 sm:mb-1.5 md:mb-[5px] ">
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
                className="w-full px-2 sm:px-3 md:px-[11px] py-1.5 sm:py-2 md:py-[8px] border border-[#bebebe] rounded-[7px] text-xs sm:text-sm md:text-[11px] text-[#0d1b2a] placeholder:text-[#9c9c9c] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] "
              />
            </div>

            {/* Severity */}
            <div ref={severityRef} className="relative">
              <label className="block text-xs sm:text-sm md:text-[11px] font-medium text-[#0d1b2a] mb-1 sm:mb-1.5 md:mb-[5px] ">
                Severity
              </label>
              <button
                type="button"
                onClick={() => setSeverityOpen(!severityOpen)}
                className="w-full px-2 sm:px-3 md:px-[11px] py-1.5 sm:py-2 md:py-[8px] border border-[#bebebe] rounded-[7px] text-xs sm:text-sm md:text-[11px] text-left focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] bg-white flex items-center justify-between"
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
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-[13px] md:h-[13px] text-[#9c9c9c] transition-transform duration-300 ${
                    severityOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`absolute z-10 w-full mt-1 bg-white border border-[#bebebe] rounded-[7px] shadow-lg overflow-hidden transition-all duration-300 ${
                  severityOpen
                    ? "max-h-[200px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="py-0.5 sm:py-1 md:py-[3px]">
                  {severityLevels.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => {
                        setBugForm({ ...bugForm, severity: level.value });
                        setSeverityOpen(false);
                      }}
                      className="w-full px-2 sm:px-3 md:px-[11px] py-1 sm:py-1.5 md:py-[7px] text-left text-xs sm:text-sm md:text-[11px] text-[#0d1b2a] hover:bg-[#eeffef] transition-colors"
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Category */}
          <div ref={categoryRef} className="mb-2 sm:mb-3 md:mb-[11px] relative">
            <label className="block text-xs sm:text-sm md:text-[11px] font-medium text-[#0d1b2a] mb-1 sm:mb-1.5 md:mb-[5px] ">
              Category
            </label>
            <button
              type="button"
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="w-full px-2 sm:px-3 md:px-[11px] py-1.5 sm:py-2 md:py-[8px] border border-[#bebebe] rounded-[7px] text-xs sm:text-sm md:text-[11px] text-left focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] bg-white flex items-center justify-between"
            >
              <span
                className={
                  bugForm.category ? "text-[#0d1b2a]" : "text-[#9c9c9c]"
                }
              >
                {bugForm.category || "Select Category"}
              </span>
              <ChevronDown
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-[13px] md:h-[13px] text-[#9c9c9c] transition-transform duration-300 ${
                  categoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`absolute z-10 w-full mt-1 bg-white border border-[#bebebe] rounded-[7px] shadow-lg overflow-hidden transition-all duration-300 ${
                categoryOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="py-0.5 sm:py-1 md:py-[3px] max-h-[167px] overflow-y-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setBugForm({ ...bugForm, category: cat });
                      setCategoryOpen(false);
                    }}
                    className="w-full px-2 sm:px-3 md:px-[11px] py-1 sm:py-1.5 md:py-[7px] text-left text-xs sm:text-sm md:text-[11px] text-[#0d1b2a] hover:bg-[#eeffef] transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Requirements */}
          <div className="mb-2 sm:mb-3 md:mb-[11px]">
            <label className="block text-xs sm:text-sm md:text-[11px] font-medium text-[#0d1b2a] mb-1 sm:mb-1.5 md:mb-[5px] ">
              Detailed Requirements
            </label>
            <textarea
              rows={4}
              placeholder="Provide a detailed description of the bug..."
              value={bugForm.description}
              onChange={(e) =>
                setBugForm({ ...bugForm, description: e.target.value })
              }
              required
              className="w-full px-2 sm:px-3 md:px-[11px] py-1.5 sm:py-2 md:py-[8px] border border-[#bebebe] rounded-[7px] text-xs sm:text-sm md:text-[11px] text-[#0d1b2a] placeholder:text-[#9c9c9c] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] resize-none "
            />
          </div>

          {/* Steps to Reproduce */}
          <div className="mb-4 sm:mb-5 md:mb-[16px]">
            <label className="block text-xs sm:text-sm md:text-[11px] font-medium text-[#0d1b2a] mb-1 sm:mb-1.5 md:mb-[5px] ">
              Steps to Reproduce
            </label>
            <textarea
              rows={4}
              placeholder="List the steps to reproduce the bug..."
              value={bugForm.steps_to_reproduce}
              onChange={(e) =>
                setBugForm({
                  ...bugForm,
                  steps_to_reproduce: e.target.value,
                })
              }
              className="w-full px-2 sm:px-3 md:px-[11px] py-1.5 sm:py-2 md:py-[8px] border border-[#bebebe] rounded-[7px] text-xs sm:text-sm md:text-[11px] text-[#0d1b2a] placeholder:text-[#9c9c9c] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] resize-none "
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-start">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-32 sm:w-40 md:w-[160px] h-8 sm:h-9 md:h-[30px] bg-[#1e3a8a] text-white text-[7px] sm:text-[8px] md:text-[10px] font-semibold rounded-[7px] hover:bg-[#1e3a8a]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 sm:gap-1.5 md:gap-[5px] "
            >
              {isSubmitting ? "Submitting..." : "Submit Bug Report"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
