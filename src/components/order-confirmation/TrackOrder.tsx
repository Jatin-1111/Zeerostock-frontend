import { ExternalLink } from "lucide-react";

export default function TrackOrder() {
  return (
    <div className="border-2 border-gray-900 rounded p-6 mb-6">
      <h3 className="font-bold text-gray-900 mb-4">Track Your Order</h3>

      <button className="w-full py-2.5 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 flex items-center justify-center gap-2">
        <span>Order Tracking</span>
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );
}
