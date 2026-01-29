import { MessageCircle, Phone, Mail } from "lucide-react";

export default function NeedHelp() {
  const helpOptions = [
    { Icon: MessageCircle, label: "Live Chat Support" },
    { Icon: Phone, label: "Call: 000-800-0000" },
    { Icon: Mail, label: "Email Support" },
  ];

  return (
    <div className="bg-white rounded-[15px] p-4 sm:p-5 md:p-[23px] lg:p-[15px] mb-4 sm:mb-5 lg:mb-3 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
      {/* Title */}
      <h3 className="font-medium text-[#0d1b2a] text-base sm:text-lg md:text-[18px] lg:text-[12px] leading-normal mb-4 sm:mb-6 lg:mb-4">
        Need Help?
      </h3>

      {/* Help Options */}
      <div className="space-y-2 sm:space-y-3 lg:space-y-2 mb-4 sm:mb-6 lg:mb-4">
        {helpOptions.map((option, index) => {
          const Icon = option.Icon;
          return (
            <button
              key={index}
              className="w-full flex items-center gap-2 lg:gap-1 p-2 sm:p-[8px] lg:p-[5px] pl-1 sm:pl-[4px] lg:pl-[3px] rounded-[11px] hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 sm:p-[8px] lg:p-[5px]">
                <Icon className="w-4 h-4 sm:w-[17px] sm:h-[17px] lg:w-[11px] lg:h-[11px] text-[#9c9c9c]" />
              </div>
              <span className="font-medium text-[#9c9c9c] text-sm sm:text-[15px] lg:text-[10px] leading-[17px]">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Track Your Order Section */}
      <div className="bg-white rounded-[15px] pt-4 sm:pt-[23px] lg:pt-[15px]">
        <h4 className="font-medium text-[#0d1b2a] text-base sm:text-lg md:text-[18px] lg:text-[12px] leading-normal text-center mb-4 sm:mb-[23px] lg:mb-[15px]">
          Track Your Order
        </h4>
        <button className="w-full bg-[#1e3a8a] text-white font-semibold text-sm sm:text-[15px] lg:text-[10px] leading-[17px] py-3 sm:py-[14px] lg:py-[9px] rounded-[11px] hover:bg-[#1e3a8a]/90 transition-colors">
          Order Tracking
        </button>
      </div>
    </div>
  );
}
