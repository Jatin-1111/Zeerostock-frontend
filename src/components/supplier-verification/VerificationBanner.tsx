interface VerificationBannerProps {
  status: string;
  message: string;
}

export default function VerificationBanner({
  status,
  message,
}: VerificationBannerProps) {
  return (
    <div className="mb-[15px] relative">
      <div
        className={`absolute left-0 top-[1px] bottom-[1px] w-[5px] rounded-br-[3px] rounded-tr-[3px] ${
          status === "approved" || status === "verified"
            ? "bg-[#2aae7a]"
            : status === "rejected"
            ? "bg-[#f05050]"
            : status === "under_review"
            ? "bg-[#507df0]"
            : "bg-[#efd700]"
        }`}
      ></div>
      <div
        className={`shadow-[0px_1px_3px_0px_rgba(229,206,0,0.25)] rounded-tl-[6px] rounded-tr-[10px] rounded-bl-[6px] rounded-br-[10px] px-[33px] py-[15px] flex items-center ${
          status === "approved" || status === "verified"
            ? "bg-[#eeffef]"
            : status === "rejected"
            ? "bg-[#ffe5e5]"
            : status === "under_review"
            ? "bg-[#dff3ff]"
            : "bg-[#fff3cf]"
        }`}
      >
        <svg
          className="w-[13px] h-[13px] mr-[20px] shrink-0"
          viewBox="0 0 27 27"
          fill="none"
        >
          <circle
            cx="13.5"
            cy="13.5"
            r="13"
            stroke={
              status === "approved" || status === "verified"
                ? "#2AAE7A"
                : status === "rejected"
                ? "#F05050"
                : status === "under_review"
                ? "#507DF0"
                : "#FFCC33"
            }
            strokeWidth="1"
          />
          <path
            d="M13.5 8v6M13.5 18h.01"
            stroke={
              status === "approved" || status === "verified"
                ? "#2AAE7A"
                : status === "rejected"
                ? "#F05050"
                : status === "under_review"
                ? "#507DF0"
                : "#FFCC33"
            }
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <p
          className={`font-medium text-[11px] leading-normal ${
            status === "approved" || status === "verified"
              ? "text-[#2aae7a]"
              : status === "rejected"
              ? "text-[#f05050]"
              : status === "under_review"
              ? "text-[#507df0]"
              : "text-[#fc3]"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
}
