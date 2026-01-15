"use client";

import { useState } from "react";

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    company: "",
    category: "",
    profileUrl: "",
    experience: "",
    portfolio: "",
    license: "",
    website: "",
    testimonials: "",
    zeerostock: "",
    additional: "",
    agreeTerms: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className="bg-white py-16 border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-[36px] font-bold text-gray-900 mb-3">
            Apply to Become an Agent
          </h2>
          <p className="text-[15px] text-gray-600">
            Fill out the form below with all of your profile info to reach an
            agent later stage
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <h3 className="text-[18px] font-semibold text-gray-900">
                Personal Information
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] text-gray-700 mb-1">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-gray-900 text-black placeholder:text-black"
                />
              </div>
              <div>
                <label className="block text-[13px] text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-gray-900 text-black placeholder:text-black"
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-[18px] font-semibold text-gray-900">
                Contact Details
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="user.example@company.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-gray-900 text-black placeholder:text-black"
                />
              </div>
              <div>
                <label className="block text-[13px] text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-gray-900 text-black placeholder:text-black"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <h3 className="text-[18px] font-semibold text-gray-900">
                Location
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="United States"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-gray-900 text-black placeholder:text-black"
                />
              </div>
              <div>
                <label className="block text-[13px] text-gray-700 mb-1">
                  State / City
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="California"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-gray-900 text-black placeholder:text-black"
                />
              </div>
            </div>
          </div>

          {/* Professional Background */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-[18px] font-semibold text-gray-900">
                Professional Background
              </h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] text-gray-700 mb-1">
                    Current Company (Optional)
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-gray-900 text-black placeholder:text-black"
                  />
                </div>
                <div>
                  <label className="block text-[13px] text-gray-700 mb-1">
                    LinkedIn Profile (Optional)
                  </label>
                  <input
                    type="url"
                    name="profileUrl"
                    value={formData.profileUrl}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-gray-900 text-black placeholder:text-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] text-gray-700 mb-1">
                  Years of Sales/Brokerage experience*
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Briefly describe your background"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-gray-900 text-black placeholder:text-black"
                />
              </div>

              <div>
                <label className="block text-[13px] text-gray-700 mb-1">
                  Industry/Focus area*
                </label>
                <input
                  type="text"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="e.g., Manufacturing, Pharmaceuticals, Energy"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-gray-900 text-black placeholder:text-black"
                />
              </div>
            </div>
          </div>

          {/* License & Details */}
          <div className="border border-gray-300 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-[18px] font-semibold text-gray-900">
                License & Details
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[13px] text-gray-700 mb-1">
                  Do you have a brokerage license or similar?
                </label>
                <input
                  type="text"
                  name="license"
                  value={formData.license}
                  onChange={handleChange}
                  placeholder="Yes/No (If yes, provide details)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-gray-900 text-black placeholder:text-black"
                />
              </div>

              <div>
                <label className="block text-[13px] text-gray-700 mb-1">
                  Website URL (If any)
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://www.yoursite.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-gray-900 text-black placeholder:text-black"
                />
              </div>

              <div>
                <label className="block text-[13px] text-gray-700 mb-1">
                  Have you done any similar work before?
                </label>
                <textarea
                  name="testimonials"
                  value={formData.testimonials}
                  onChange={handleChange}
                  placeholder="Describe any relevant experience or provide testimonials"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none text-black placeholder:text-black"
                />
              </div>

              <div>
                <label className="block text-[13px] text-gray-700 mb-1">
                  How did you hear about us?
                </label>
                <input
                  type="text"
                  name="zeerostock"
                  value={formData.zeerostock}
                  onChange={handleChange}
                  placeholder="e.g., LinkedIn, Google, Referral"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-gray-900 text-black placeholder:text-black"
                />
              </div>

              <div>
                <label className="block text-[13px] text-gray-700 mb-1">
                  Why do you wish to become a Zeerostock Agent?
                </label>
                <textarea
                  name="additional"
                  value={formData.additional}
                  onChange={handleChange}
                  placeholder="Tell us about your motivations and goals (optional)"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none text-black placeholder:text-black"
                />
              </div>
            </div>
          </div>

          {/* Terms & Submit */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 border-gray-300 rounded text-black"
              />
              <label className="text-[13px] text-gray-700">
                I agree to the agent terms and conditions, and understand that
                all submitted information and materials will be subject to the
                agent agreement that will be provided upon approval.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gray-900 text-white text-[15px] font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
