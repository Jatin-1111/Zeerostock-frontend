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
          <CheckCircle2 className="w-[20px] h-[20px] text-[#2aae7a]" />
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
    <div className="flex items-start gap-4">
      <div className="shrink-0 mt-1">{icon}</div>
      <div>
        <h4 className="font-semibold text-[17px] text-[#0d1b2a] mb-[5px]">
          {title}
        </h4>
        <p className="font-medium text-[11px] text-[#9c9c9c] leading-normal">
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
      className={`${bgColor} rounded-[15px] h-[80px] flex flex-col items-center justify-center`}
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
    <div className="w-[345px] space-y-[23px]">
      {/* Verification Benefits Card */}
      <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] rounded-[15px] p-[23px]">
        <h3 className="font-semibold text-[18px] text-[#0d1b2a] mb-8">
          Verification Benefits
        </h3>

        <div className="space-y-[23px]">
          <BenefitItem
            icon={<Shield className="w-5 h-5 text-[#2aae7a]" />}
            title="Trusted Badge"
            description="Display verified supplier badge on all listings"
          />
          <BenefitItem
            icon={
              <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
                <path
                  d="M14 10v8M10 14l4 4 4-4"
                  stroke="#2AAE7A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            title="Higher Visibility"
            description="Verified suppliers appear higher in search results"
          />
          <BenefitItem
            icon={
              <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
                <path
                  d="M14 18c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zM6 14h4M18 14h4M14 6v4M14 18v4"
                  stroke="#2AAE7A"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
            title="Increased Trust"
            description="Buyers prefer verified suppliers by 3.5x"
          />
          <BenefitItem
            icon={
              <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
                <rect
                  x="6"
                  y="8"
                  width="16"
                  height="12"
                  rx="2"
                  stroke="#2AAE7A"
                  strokeWidth="2"
                />
                <path
                  d="M10 12h8M10 16h4"
                  stroke="#2AAE7A"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
            title="Higher Limits"
            description="Access to larger transaction limits"
          />
        </div>
      </div>

      {/* Verification Impact Card */}
      <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] rounded-[15px] p-[30px]">
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
      <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] rounded-[15px] p-[30px]">
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
