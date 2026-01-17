import { Clock } from "lucide-react";

interface VerificationProgressBarProps {
  progress: number;
  completedSteps: number;
  status: string;
}

export default function VerificationProgressBar({
  progress,
  completedSteps,
  status,
}: VerificationProgressBarProps) {
  return (
    <div className="mb-[15px] bg-white shadow-[0px_2px_3px_0px_rgba(24,181,34,0.25)] rounded-[10px] px-[21px] py-[15px] relative">
      <h2 className="font-semibold text-base text-[#0d1b2a] mb-[11px] leading-normal">
        Verification Progress
      </h2>
      <p className="font-medium text-[13px] text-[#9c9c9c] mb-[23px] leading-normal">
        {progress}% Complete - {completedSteps} of 5 sections verified
      </p>

      {/* Progress Bar */}
      <div className="relative w-full h-[7px] bg-[#eee] rounded-[4px] mb-[13px]">
        <div
          className="absolute top-0 left-0 h-full bg-[#2aae7a] rounded-[4px]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Percentage Badge */}
      <div className="absolute right-[18px] top-[36px]">
        <span className="font-semibold text-xl text-[#0d1b2a]">
          {progress}%
        </span>
      </div>

      {/* Status Badge */}
      <div
        className={`absolute right-[28px] top-[15px] px-[11px] pr-[13px] py-[3px] rounded-[67px] flex items-center gap-[5px] ${
          status === "approved" || status === "verified"
            ? "bg-[#eeffef]"
            : status === "under_review"
            ? "bg-[#dff3ff]"
            : "bg-[#fc3]"
        }`}
      >
        <Clock className="w-[11px] h-[11px] text-black" />
        <span className="font-medium text-[11px] text-black">
          {status === "approved" || status === "verified"
            ? "Verified"
            : status === "under_review"
            ? "Under Review"
            : "In Progress"}
        </span>
      </div>
    </div>
  );
}
