import { MessageCircle, Phone, Mail } from "lucide-react";

export default function NeedHelp() {
  const helpOptions = [
    { Icon: MessageCircle, label: "Live Chat Support" },
    { Icon: Phone, label: "Call: 000-800-0000" },
    { Icon: Mail, label: "Email Support" },
  ];

  return (
    <div className="bg-white rounded-[15px] p-[23px] mb-5 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
      {/* Title */}
      <h3 className="font-medium text-[#0d1b2a] text-xl leading-normal mb-6">
        Need Help?
      </h3>

      {/* Help Options */}
      <div className="space-y-3 mb-6">
        {helpOptions.map((option, index) => {
          const Icon = option.Icon;
          return (
            <button
              key={index}
              className="w-full flex items-center gap-2 p-[8px] pl-[4px] rounded-[11px] hover:bg-gray-50 transition-colors"
            >
              <div className="p-[8px]">
                <Icon className="w-[17px] h-[17px] text-[#9c9c9c]" />
              </div>
              <span className="font-medium text-[#9c9c9c] text-base leading-normal">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Track Your Order Section */}
      <div className="bg-white rounded-[15px] pt-[23px]">
        <h4 className="font-medium text-[#0d1b2a] text-xl leading-normal text-center mb-[23px]">
          Track Your Order
        </h4>
        <button className="w-full bg-[#1e3a8a] text-white font-semibold text-base leading-normal py-[14px] rounded-[11px] hover:bg-[#1e3a8a]/90 transition-colors">
          Order Tracking
        </button>
      </div>
    </div>
  );
}
