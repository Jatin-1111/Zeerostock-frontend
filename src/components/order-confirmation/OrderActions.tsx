import { Download, Printer, Mail, Share2 } from "lucide-react";

export default function OrderActions() {
  const actions = [
    { Icon: Download, label: "Download Invoice" },
    { Icon: Printer, label: "Print Order" },
    { Icon: Mail, label: "Email Confirmation" },
    { Icon: Share2, label: "Share Order" },
  ];

  return (
    <div className="border-2 border-gray-900 rounded p-6 mb-6">
      <h3 className="font-bold text-gray-900 mb-4">Order Actions</h3>

      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.Icon;
          return (
            <button
              key={index}
              className="w-full py-2.5 border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Icon className="w-4 h-4" />
              <span>{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
