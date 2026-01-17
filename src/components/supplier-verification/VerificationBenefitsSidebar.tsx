"use client";

import {
  Shield,
  CheckCircle2,
  Clock,
  Phone,
  FileText,
  Upload,
  ShieldCheck,
  Eye,
  MapPin,
  Lock,
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
    <div className="bg-[#f6f6f6] rounded-[5px] px-[7px] py-[6px] relative">
      <p className="font-medium text-[7px] text-[#9c9c9c] mb-[5px]">{label}</p>
      <p className="font-medium text-[9px] text-[#0d1b2a]">{value}</p>
      {verified && (
        <div className="absolute right-[7px] top-1/2 -translate-y-1/2">
          <CheckCircle2 className="w-[13px] h-[13px] text-[#2aae7a]" />
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
    <div className="bg-[#f6f6f6] rounded-[5px] px-[13px] py-[9px] flex items-center justify-between">
      <div>
        <div className="flex items-center gap-[5px]">
          <p className="font-medium text-[11px] text-[#0d1b2a]">{label}</p>
          {optional && (
            <span className="font-medium text-[11px] text-[#9c9c9c]">
              (Optional)
            </span>
          )}
        </div>
        <p className="font-medium text-[9px] text-[#9c9c9c] mt-[6px]">{date}</p>
      </div>

      {status === "verified" || status === "approved" ? (
        <div className="bg-[#eeffef] px-[10px] py-[3px] rounded-[10px] shadow-[0px_0px_3px_0px_rgba(24,181,34,0.25)] flex items-center gap-[5px]">
          <CheckCircle2 className="w-[11px] h-[11px] text-[#2aae7a]" />
          <span className="font-medium text-[12px] text-[#2aae7a]">
            Verified
          </span>
        </div>
      ) : status === "pending" || status === "under_review" ? (
        <div className="bg-[#fff3cf] px-[10px] py-[3px] rounded-[10px] shadow-[0px_0px_3px_0px_rgba(24,181,34,0.25)] flex items-center gap-[5px]">
          <Clock className="w-[11px] h-[11px] text-[#fc3]" />
          <span className="font-medium text-[12px] text-[#fc3]">Pending</span>
        </div>
      ) : (
        <button
          onClick={onUpload}
          className="bg-[#1e3a8a] hover:bg-[#152e6b] text-white font-semibold text-[12px] px-[13px] py-[7px] rounded-[5px] flex items-center gap-[5px]"
        >
          <Upload className="w-[13px] h-[13px]" />
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
    <div className="flex items-start gap-0 min-h-[41px]">
      <div className="shrink-0 w-[13px] h-[13px] mt-[14px]">{icon}</div>
      <div className="ml-[21px] flex-1">
        <h4 className="font-semibold text-[11px] text-black mb-1 leading-tight">
          {title}
        </h4>
        <p className="font-medium text-[9px] text-[#9c9c9c] leading-tight">
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
      className={`${bgColor} rounded-[10px] h-[53px] flex flex-col items-center justify-center`}
    >
      <p className={`font-semibold text-[17px] ${textColor} mb-[3px]`}>
        {value}
      </p>
      <p className={`font-semibold text-[9px] ${textColor}`}>{label}</p>
    </div>
  );
}

// --- Sidebar Component ---

export function VerificationBenefitsSidebar() {
  return (
    <div style={{ width: "calc((100vw - 119px) * 0.25)" }}>
      {/* Verification Benefits Card */}
      <div className="bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] rounded-[9px] min-h-[205px] overflow-hidden">
        <div className="px-[13px] pt-[11px] pb-[8px]">
          <h3 className="font-semibold text-[11px] text-black">
            Verification Benefits
          </h3>
        </div>

        <div className="px-[13px] space-y-0">
          <BenefitItem
            icon={<ShieldCheck className="w-[13px] h-[13px] text-[#2AAE7A]" />}
            title="Trusted Badge"
            description="Display verified supplier badge on all listings"
          />
          <BenefitItem
            icon={<Eye className="w-[13px] h-[13px] text-[#2AAE7A]" />}
            title="Higher Visibility"
            description="Verified suppliers appear higher in search results"
          />
          <BenefitItem
            icon={<MapPin className="w-[13px] h-[13px] text-[#2AAE7A]" />}
            title="Increased Trust"
            description="Buyers prefer verified suppliers by 3.5x"
          />
          <BenefitItem
            icon={<Lock className="w-[13px] h-[13px] text-[#2AAE7A]" />}
            title="Higher Limits"
            description="Access to larger transaction limits"
          />
        </div>
      </div>

      {/* Verification Impact Card */}
      <div className="bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] rounded-[10px] p-[20px] mt-[15px]">
        <h3 className="font-semibold text-[12px] text-[#0d1b2a] mb-[20px]">
          Verification Impact
        </h3>

        <div className="space-y-[10px]">
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
      <div className="bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] rounded-[10px] p-[20px] mt-[15px]">
        <h3 className="font-semibold text-[12px] text-[#0d1b2a] mb-[13px]">
          Need Help?
        </h3>
        <p className="font-medium text-[12px] text-[#9c9c9c] leading-normal mb-[40px]">
          Our verification team is here to assist you through the process
        </p>

        <Link href={"/helpdesk"}>
          <button className="w-full bg-[#1e3a8a] hover:bg-[#152e6b] text-white font-semibold text-[11px] py-[11px] rounded-[5px] flex items-center justify-center gap-[5px] mb-[7px]">
            <Phone className="w-[13px] h-[13px]" />
            Contact Support
          </button>
        </Link>
        <Link href="/help-support">
          <button className="w-full bg-white border border-[#9c9c9c] text-[#9c9c9c] font-semibold text-[8px] py-[9px] rounded-[5px] flex items-center justify-center gap-[5px]">
            <FileText className="w-[11px] h-[11px]" />
            View Guidelines
          </button>
        </Link>
      </div>
    </div>
  );
}
