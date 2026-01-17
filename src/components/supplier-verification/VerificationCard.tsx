import { BadgeCheck, BadgeAlert, CheckCircle2, Clock } from "lucide-react";
import { ReactNode } from "react";

interface VerificationCardProps {
  title: string;
  status: string;
  children: ReactNode;
}

export default function VerificationCard({
  title,
  status,
  children,
}: VerificationCardProps) {
  const isVerified = status === "approved" || status === "verified";

  return (
    <div className="bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] rounded-[10px] p-[20px]">
      <div className="flex items-center justify-between mb-[15px]">
        <div className="flex items-center gap-[13px]">
          {isVerified ? (
            <BadgeCheck className="w-[19px] h-[19px] text-[#00B14F]" />
          ) : (
            <BadgeAlert className="w-[19px] h-[19px] text-[#fc3]" />
          )}
          <h3 className="font-semibold text-[12px] text-[#0d1b2a]">{title}</h3>
        </div>
        <div
          className={`px-[10px] py-[3px] rounded-[10px] shadow-[0px_0px_3px_0px_rgba(24,181,34,0.25)] flex items-center gap-[5px] ${
            isVerified ? "bg-[#eeffef]" : "bg-[#fff3cf]"
          }`}
        >
          {isVerified ? (
            <CheckCircle2 className="w-[11px] h-[11px] text-[#2aae7a]" />
          ) : (
            <Clock className="w-[11px] h-[11px] text-[#fc3]" />
          )}
          <span
            className={`font-medium text-[12px] ${
              isVerified ? "text-[#2aae7a]" : "text-[#fc3]"
            }`}
          >
            {isVerified ? "Verified" : "Pending"}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-200 mb-[15px]"></div>

      {children}
    </div>
  );
}
