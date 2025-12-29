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
    <div className="bg-white rounded-[15px] p-[23px] mb-5 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
      {/* Title */}
      <h3 className="font-medium text-[#0d1b2a] text-[18px] leading-normal mb-6">
        Order Actions
      </h3>

      {/* Action Buttons */}
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.Icon;
          const isHighlighted = action.highlighted;

          return (
            <button
              key={index}
              className={`w-full flex items-center gap-2 p-[8px] pl-[4px] rounded-[11px] border transition-colors ${
                isHighlighted
                  ? "border-[#1e3a8a] hover:bg-[#1e3a8a]/5"
                  : "border-[#9c9c9c] hover:bg-gray-50"
              }`}
            >
              <div className="p-[8px]">
                <Icon
                  className={`w-[17px] h-[17px] ${
                    isHighlighted ? "text-[#1e3a8a]" : "text-[#9c9c9c]"
                  }`}
                />
              </div>
              <span
                className={`font-medium text-[15px] leading-[17px] ${
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
