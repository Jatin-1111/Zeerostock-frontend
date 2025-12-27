"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  supplierService,
  SupplierProfileData,
} from "@/services/supplier.service";

export default function SupplierProfile() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<SupplierProfileData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await supplierService.getProfile();

      if (response.success && response.data) {
        setProfileData(response.data);
      } else {
        throw new Error("Failed to load profile data");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load profile data";
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Role check
  if (user?.activeRole !== "supplier") {
    return (
      <div className="min-h-screen bg-[#eefbf6] flex items-center justify-center px-6 py-8">
        <p className="text-[#0d1b2a] text-xl">
          Access denied. Supplier access only.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#eefbf6] flex items-center justify-center px-6 py-8">
        <p className="text-[#0d1b2a] text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#eefbf6] flex items-center justify-center px-6 py-8">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    );
  }

  if (!profileData) {
    return null;
  }

  const { company_info, business_metrics } = profileData;

  return (
    <div className="min-h-screen bg-[#eefbf6] px-6 py-6">
      {/* Page Title */}
      <h1 className="text-[#0d1b2a] text-[27px] font-semibold font-['Poppins'] mb-6">
        Company Information
      </h1>

      {/* Company Information Card */}
      <div className="bg-white rounded-[15px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] p-[30px] mb-6">
        <div className="grid grid-cols-2 gap-x-[68px] gap-y-[49px]">
          {/* Company Name */}
          <div>
            <label className="text-[#0d1b2a] text-[17px] font-medium font-['Poppins'] block mb-[17px]">
              Company Name
            </label>
            <div className="border border-[#bebebe] rounded-[8px] px-3 py-[12px]">
              <p className="text-[#0d1b2a] text-[12px] font-['Poppins']">
                {company_info.company_name}
              </p>
            </div>
          </div>

          {/* Website */}
          <div>
            <label className="text-[#0d1b2a] text-[17px] font-medium font-['Poppins'] block mb-[17px]">
              Website
            </label>
            <div className="border border-[#bebebe] rounded-[8px] px-3 py-[12px]">
              <p className="text-[#0d1b2a] text-[12px] font-['Poppins']">
                {company_info.website}
              </p>
            </div>
          </div>

          {/* Business Type */}
          <div>
            <label className="text-[#0d1b2a] text-[17px] font-medium font-['Poppins'] block mb-[17px]">
              Business Type
            </label>
            <div className="border border-[#bebebe] rounded-[8px] px-3 py-[12px] flex items-center justify-between">
              <p className="text-[#0d1b2a] text-[12px] font-['Poppins']">
                {company_info.business_type}
              </p>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="#9c9c9c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Company Description */}
          <div>
            <label className="text-[#0d1b2a] text-[17px] font-medium font-['Poppins'] block mb-[17px]">
              Company Description
            </label>
            <div className="border border-[#bebebe] rounded-[8px] px-3 py-[11px] h-[140px]">
              <p className="text-[#0d1b2a] text-[12px] font-['Poppins'] leading-[18px]">
                {company_info.description}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-[#0d1b2a] text-[17px] font-medium font-['Poppins'] block mb-[17px]">
              Phone
            </label>
            <div className="border border-[#bebebe] rounded-[8px] px-3 py-[12px]">
              <p className="text-[#0d1b2a] text-[12px] font-['Poppins']">
                {company_info.phone}
              </p>
            </div>
          </div>

          {/* Primary Category */}
          <div className="col-span-2">
            <label className="text-[#0d1b2a] text-[17px] font-medium font-['Poppins'] block mb-[17px]">
              Primary Category
            </label>
            <div className="flex items-center gap-[8px]">
              {company_info.primary_categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-[#2aae7a] border border-[#9c9c9c] rounded-[11px] h-[34px] px-3 flex items-center justify-center min-w-[98px]"
                >
                  <p className="text-white text-[12px] font-medium font-['Poppins']">
                    {category}
                  </p>
                </div>
              ))}
              <button className="border border-[#9c9c9c] rounded-[11px] h-[34px] w-[75px] flex items-center justify-center gap-[8px]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5V19M5 12H19"
                    stroke="#9c9c9c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[#9c9c9c] text-[12px] font-medium font-['Poppins']">
                  ADD
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Business Metrics Section */}
      <h2 className="text-[#0d1b2a] text-[27px] font-medium font-['Poppins'] mb-[54px]">
        Business Metrics
      </h2>

      <div className="grid grid-cols-4 gap-[46px]">
        {/* Surplus Rating */}
        <div className="bg-[#eeffef] border border-[#2aae7a] rounded-[15px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.25)] py-[15px] px-0 flex flex-col items-center gap-[4px]">
          <p className="text-[#0d1b2a] text-[27px] font-semibold font-['Poppins'] text-center">
            {business_metrics.rating}
          </p>
          <p className="text-[#9c9c9c] text-[14px] font-medium font-['Poppins'] text-center">
            Surplus Rating
          </p>
        </div>

        {/* Response Rate */}
        <div className="bg-[#eeffef] border border-[#2aae7a] rounded-[15px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.25)] py-[15px] px-0 flex flex-col items-center gap-[4px]">
          <p className="text-[#0d1b2a] text-[27px] font-semibold font-['Poppins'] text-center">
            {business_metrics.response_rate}%
          </p>
          <p className="text-[#9c9c9c] text-[14px] font-medium font-['Poppins'] text-center">
            Response Rate
          </p>
        </div>

        {/* Total Reviews */}
        <div className="bg-[#eeffef] border border-[#2aae7a] rounded-[15px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.25)] py-[15px] px-0 flex flex-col items-center gap-[4px]">
          <p className="text-[#0d1b2a] text-[27px] font-semibold font-['Poppins'] text-center">
            {business_metrics.total_reviews}
          </p>
          <p className="text-[#9c9c9c] text-[14px] font-medium font-['Poppins'] text-center">
            Total Reviews
          </p>
        </div>

        {/* Member Since */}
        <div className="bg-[#eeffef] border border-[#2aae7a] rounded-[15px] shadow-[0px_0px_10px_0px_rgba(24,181,34,0.25)] py-[15px] px-0 flex flex-col items-center gap-[4px]">
          <p className="text-[#0d1b2a] text-[27px] font-semibold font-['Poppins'] text-center">
            {business_metrics.member_since}
          </p>
          <p className="text-[#9c9c9c] text-[14px] font-medium font-['Poppins'] text-center">
            Member Since
          </p>
        </div>
      </div>
    </div>
  );
}
