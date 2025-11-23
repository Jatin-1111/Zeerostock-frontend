import { MessageCircle, Phone, Mail } from "lucide-react";

export default function NeedHelp() {
  const helpOptions = [
    { Icon: MessageCircle, label: "Live Chat Support" },
    { Icon: Phone, label: "Call: 000-000-0000" },
    { Icon: Mail, label: "Email Support" },
  ];

  return (
    <div className="border-2 border-gray-900 rounded p-6 mb-6">
      <h3 className="font-bold text-gray-900 mb-4">Need Help?</h3>

      <div className="space-y-3">
        {helpOptions.map((option, index) => {
          const Icon = option.Icon;
          return (
            <button
              key={index}
              className="w-full py-2.5 border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Icon className="w-4 h-4" />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
