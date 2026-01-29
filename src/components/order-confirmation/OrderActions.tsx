import { Download, Printer, Mail, Share2, HelpCircle } from "lucide-react";

export default function OrderActions() {
  const actions = [
    { Icon: Download, label: "Download Invoice", highlighted: true },
    { Icon: Printer, label: "Print Order" },
    { Icon: Mail, label: "Email Confirmation" },
    { Icon: HelpCircle, label: "Contact Support" },
    { Icon: Share2, label: "Share Order" },
  ];

  return (
    <div className="bg-white rounded-[15px] p-4 sm:p-5 md:p-[23px] lg:p-[15px] mb-4 sm:mb-5 lg:mb-3 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
      {/* Title */}
      <h3 className="font-medium text-[#0d1b2a] text-base sm:text-lg md:text-[18px] lg:text-[12px] leading-normal mb-4 sm:mb-6 lg:mb-4">
        Order Actions
      </h3>

      {/* Action Buttons */}
      <div className="space-y-2 sm:space-y-3 lg:space-y-2">
        {actions.map((action, index) => {
          const Icon = action.Icon;
          const isHighlighted = action.highlighted;

          return (
            <button
              key={index}
              className={`w-full flex items-center gap-2 lg:gap-1 p-2 sm:p-[8px] lg:p-[5px] pl-1 sm:pl-[4px] lg:pl-[3px] rounded-[11px] border transition-colors ${
                isHighlighted
                  ? "border-[#1e3a8a] hover:bg-[#1e3a8a]/5"
                  : "border-[#9c9c9c] hover:bg-gray-50"
              }`}
            >
              <div className="p-2 sm:p-[8px] lg:p-[5px]">
                <Icon
                  className={`w-4 h-4 sm:w-[17px] sm:h-[17px] lg:w-[11px] lg:h-[11px] ${
                    isHighlighted ? "text-[#1e3a8a]" : "text-[#9c9c9c]"
                  }`}
                />
              </div>
              <span
                className={`font-medium text-sm sm:text-[15px] lg:text-[10px] leading-[17px] ${
                  isHighlighted ? "text-[#1e3a8a]" : "text-[#9c9c9c]"
                }`}
              >
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
