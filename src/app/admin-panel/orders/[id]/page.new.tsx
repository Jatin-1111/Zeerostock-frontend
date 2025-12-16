"use client";

import { ArrowLeft, CheckCircle, Circle } from "lucide-react";
import { AdminLayout, StatusBadge, Timeline } from "@/components/admin-panel";
import { useRouter } from "next/navigation";

export default function OrderDetailPage() {
  const router = useRouter();

  const trackingSteps = [
    {
      title: "Order Placed",
      description: "Order confirmed",
      timestamp: "Oct 21, 2024",
      completed: true,
    },
    {
      title: "Processing",
      description: "Order being prepared",
      timestamp: "Oct 24, 2024",
      completed: true,
    },
    {
      title: "Dispatched",
      description: "Order shipped",
      timestamp: "Oct 25, 2024",
      completed: true,
    },
    {
      title: "In Transit",
      description: "On the way",
      timestamp: "Today",
      completed: true,
      current: true,
    },
    {
      title: "Out for Delivery",
      description: "Final delivery",
      timestamp: "Expected",
      completed: false,
    },
    {
      title: "Delivered",
      description: "Order received",
      timestamp: "Expected",
      completed: false,
    },
  ];

  return (
    <AdminLayout>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-black mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Orders
      </button>

      <div className="mb-6">
        <h2 className="text-[24px] font-bold text-black mb-1">
          Order Details - #ORD-0012
        </h2>
        <p className="text-[13px] text-gray-500">
          Track and manage complete order lifecycle
        </p>
      </div>

      <div className="grid grid-cols-[300px,1fr] gap-6">
        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-[16px] font-bold text-black mb-6">
            Order Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-[11px] text-gray-500 block mb-1">
                Order ID
              </label>
              <p className="text-[13px] text-black">#ORD-0012</p>
            </div>
            <div>
              <label className="text-[11px] text-gray-500 block mb-1">
                Date Created
              </label>
              <p className="text-[13px] text-black">Nov 15, 2024</p>
            </div>
            <div>
              <label className="text-[11px] text-gray-500 block mb-1">
                Buyer
              </label>
              <p className="text-[13px] text-black">MegaCorp Industries</p>
            </div>
            <div>
              <label className="text-[11px] text-gray-500 block mb-1">
                Supplier
              </label>
              <p className="text-[13px] text-black">SteelCo Ltd.</p>
            </div>
            <div>
              <label className="text-[11px] text-gray-500 block mb-1">
                Amount
              </label>
              <p className="text-[13px] text-black">$42,750</p>
            </div>
            <div>
              <label className="text-[11px] text-gray-500 block mb-1">
                Status
              </label>
              <StatusBadge status="In Transit" variant="info" />
            </div>
          </div>
          <div className="space-y-2 mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-[12px] font-bold text-black mb-3">
              QUICK ACTIONS
            </h4>
            <button className="w-full px-4 py-2 text-[12px] font-medium text-black border border-gray-300 hover:bg-gray-50">
              Contact Supplier
            </button>
            <button className="w-full px-4 py-2 text-[12px] font-medium text-black border border-gray-300 hover:bg-gray-50">
              View Invoice
            </button>
            <button className="w-full px-4 py-2 text-[12px] font-medium text-black border border-gray-300 hover:bg-gray-50">
              Manage Dispute
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-[16px] font-bold text-black mb-4">
              Tracking Map
            </h3>
            <div className="bg-gray-100 h-64 flex items-center justify-center">
              <p className="text-gray-500">Map View Placeholder</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-[16px] font-bold text-black mb-4">
              Order Timeline
            </h3>
            <Timeline items={trackingSteps} variant="vertical" />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
