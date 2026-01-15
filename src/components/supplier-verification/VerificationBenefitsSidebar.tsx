"use client";

import {
  Shield,
  CheckCircle2,
  Clock,
  Phone,
  FileText,
  Upload,
} from "lucide-react";
import Link from "next/link";

// --- Helper Components ---

export function InfoCard({
  label,
  value,
  verified,
}: {
  label: string;
  value: string;
  verified?: boolean;
}) {
  return (
    <div className="bg-[#f6f6f6] rounded-[8px] px-[11px] py-[9px] relative">
      <p className="font-medium text-[9px] text-[#9c9c9c] mb-[8px]">{label}</p>
      <p className="font-medium text-[11px] text-[#0d1b2a]">{value}</p>
      {verified && (
        <div className="absolute right-[11px] top-1/2 -translate-y-1/2">
          <CheckCircle2 className="w-5 h-5 text-secondary" />
        </div>
      )}
    </div>
  );
}

export function DocumentRowNew({
  label,
  date,
  status,
  optional,
  onUpload,
}: {
  label: string;
  date: string;
  status: string;
  optional?: boolean;
  onUpload?: () => void;
}) {
  return (
    <div className="bg-[#f6f6f6] rounded-[8px] px-5 py-[13px] flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <p className="font-medium text-[14px] text-[#0d1b2a]">{label}</p>
          {optional && (
            <span className="font-medium text-[14px] text-[#9c9c9c]">
              (Optional)
            </span>
          )}
        </div>
        <p className="font-medium text-[12px] text-[#9c9c9c] mt-[9px]">
          {date}
        </p>
      </div>

      {status === "verified" || status === "approved" ? (
        <div className="bg-[#eeffef] px-[10px] py-[5px] rounded-[15px] shadow-[0px_0px_4px_0px_rgba(24,181,34,0.25)] flex items-center gap-[5px]">
          <CheckCircle2 className="w-[18px] h-[18px] text-[#2aae7a]" />
          <span className="font-medium text-[14px] text-[#2aae7a]">
            Verified
          </span>
        </div>
      ) : status === "pending" || status === "under_review" ? (
        <div className="bg-[#fff3cf] px-[10px] py-[5px] rounded-[15px] shadow-[0px_0px_4px_0px_rgba(24,181,34,0.25)] flex items-center gap-[5px]">
          <Clock className="w-[18px] h-[18px] text-[#fc3]" />
          <span className="font-medium text-[14px] text-[#fc3]">Pending</span>
        </div>
      ) : (
        <button
          onClick={onUpload}
          className="bg-[#1e3a8a] hover:bg-[#152e6b] text-white font-semibold text-[16px] px-5 py-[10px] rounded-[8px] flex items-center gap-[8px]"
        >
          <Upload className="w-5 h-5" />
          Upload
        </button>
      )}
    </div>
  );
}

function BenefitItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-0 h-16">
      <div className="shrink-0 w-5 h-5 mt-5">{icon}</div>
      <div className="ml-8">
        <h4 className="font-semibold text-[15px] text-black mb-1.5 leading-tight">
          {title}
        </h4>
        <p className="font-medium text-[9px] text-[#9c9c9c] leading-[14px] max-w-[206px]">
          {description}
        </p>
      </div>
    </div>
  );
}

function ImpactCard({
  bgColor,
  textColor,
  value,
  label,
}: {
  bgColor: string;
  textColor: string;
  value: string;
  label: string;
}) {
  return (
    <div
      className={`${bgColor} rounded-2xl h-20 flex flex-col items-center justify-center`}
    >
      <p className={`font-semibold text-[26px] ${textColor} mb-[5px]`}>
        {value}
      </p>
      <p className={`font-semibold text-[13px] ${textColor}`}>{label}</p>
    </div>
  );
}

// --- Sidebar Component ---

export function VerificationBenefitsSidebar() {
  return (
    <div className="w-[269px]">
      {/* Verification Benefits Card */}
      <div className="bg-[#f9fffd] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] rounded-[13px] h-[297px] overflow-hidden">
        <div className="px-5 pt-4 pb-3">
          <h3 className="font-semibold text-[16px] text-black">
            Verification Benefits
          </h3>
        </div>

        <div className="px-5 space-y-0">
          <BenefitItem
            icon={
              <svg
                className="w-[19px] h-[19px]"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M14 2L4 7v7c0 6.3 4.3 12.2 10 14 5.7-1.8 10-7.7 10-14V7l-10-5z"
                  stroke="#2AAE7A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M10 14l2.5 2.5L18 11"
                  stroke="#2AAE7A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            title="Trusted Badge"
            description="Display verified supplier badge on all listings"
          />
          <BenefitItem
            icon={
              <svg
                className="w-[19px] h-[19px]"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M14 9c-3.5 0-6.5 2.3-7.5 5.5C7.5 17.7 10.5 20 14 20s6.5-2.3 7.5-5.5c-1-3.2-4-5.5-7.5-5.5z"
                  stroke="#2AAE7A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <circle
                  cx="14"
                  cy="14.5"
                  r="2.5"
                  stroke="#2AAE7A"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            }
            title="Higher Visibility"
            description="Verified suppliers appear higher in search results"
          />
          <BenefitItem
            icon={
              <svg
                className="w-[19px] h-[19px]"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M7 15c0-3.9 3.1-7 7-7s7 3.1 7 7c0 2-1.6 5.5-6 9-1.3 1-2.7 1-4 0-4.4-3.5-6-7-6-9z"
                  stroke="#2AAE7A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <circle
                  cx="14"
                  cy="14"
                  r="2"
                  stroke="#2AAE7A"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            }
            title="Increased Trust"
            description="Buyers prefer verified suppliers by 3.5x"
          />
          <BenefitItem
            icon={
              <svg
                className="w-[19px] h-[19px]"
                viewBox="0 0 28 28"
                fill="none"
              >
                <rect
                  x="6"
                  y="9"
                  width="16"
                  height="12"
                  rx="2"
                  stroke="#2AAE7A"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M10 9V7c0-2.2 1.8-4 4-4s4 1.8 4 4v2"
                  stroke="#2AAE7A"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M14 14v3"
                  stroke="#2AAE7A"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M11 15l1.5 1.5L16 13"
                  stroke="#2AAE7A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            title="Higher Limits"
            description="Access to larger transaction limits"
          />
        </div>
      </div>

      {/* Verification Impact Card */}
      <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] rounded-[15px] p-[30px] mt-[23px]">
        <h3 className="font-semibold text-[18px] text-[#0d1b2a] mb-[55px]">
          Verification Impact
        </h3>

        <div className="space-y-[15px]">
          <ImpactCard
            bgColor="bg-[#eeffef]"
            textColor="text-[#2aae7a]"
            value="3.5x"
            label="Higher Response Rate"
          />
          <ImpactCard
            bgColor="bg-[#dff3ff]"
            textColor="text-[#507df0]"
            value="2.8x"
            label="Most Listing Views"
          />
          <ImpactCard
            bgColor="bg-[#ffe5e5]"
            textColor="text-[#f05050]"
            value="65%"
            label="Higher Conversion"
          />
        </div>
      </div>

      {/* Need Help Card */}
      <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] rounded-[15px] p-[30px] mt-[23px]">
        <h3 className="font-semibold text-[18px] text-[#0d1b2a] mb-5">
          Need Help?
        </h3>
        <p className="font-medium text-[18px] text-[#9c9c9c] leading-normal mb-[60px]">
          Our verification team is here to assist you through the process
        </p>

        <Link href={"/helpdesk"}>
          <button className="w-full bg-[#1e3a8a] hover:bg-[#152e6b] text-white font-semibold text-[16px] py-[17px] rounded-[8px] flex items-center justify-center gap-[8px] mb-[10px]">
            <Phone className="w-5 h-5" />
            Contact Support
          </button>
        </Link>
        <Link href="/help-support">
          <button className="w-full bg-white border border-[#9c9c9c] text-[#9c9c9c] font-semibold text-[12px] py-[13px] rounded-[8px] flex items-center justify-center gap-[8px]">
            <FileText className="w-4 h-4" />
            View Guidelines
          </button>
        </Link>
      </div>
    </div>
  );
}
