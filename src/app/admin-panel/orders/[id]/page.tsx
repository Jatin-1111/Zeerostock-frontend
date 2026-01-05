"use client";

import { ArrowLeft, CheckCircle, Circle } from "lucide-react";
import { AdminLayout } from "@/components/admin-panel";
import { StatusBadge } from "@/components/admin-panel";
import { useRouter } from "next/navigation";

export default function OrderDetailPage() {
  const router = useRouter();

  const trackingSteps = [
    { title: "Order Placed", date: "Oct 21", completed: true },
    { title: "Processing", date: "Oct 24", completed: true },
    { title: "Dispatched", date: "Oct 25", completed: true },
    { title: "In Transit", date: "Today", completed: true },
    { title: "Out for Delivery", completed: false },
    { title: "Delivered", completed: false },
  ];

  return (
    <AdminLayout>
      <div className="p-8">
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
            <div className="bg-white border border-gray-200 p-6 mb-6">
              <h3 className="text-[16px] font-bold text-black mb-6">
                Logistics Details
              </h3>
              <div className="grid grid-cols-[200px,200px,1fr] gap-6">
                <div>
                  <label className="text-[11px] text-gray-500 block mb-1">
                    Company
                  </label>
                  <p className="text-[13px] font-medium text-black">
                    DHL Express
                  </p>
                </div>
                <div>
                  <label className="text-[11px] text-gray-500 block mb-1">
                    Driver Details
                  </label>
                  <p className="text-[13px] text-black">Dilip Kumar</p>
                  <p className="text-[11px] text-gray-500">+91-886-988-092</p>
                </div>
                <div className="row-span-2">
                  <label className="text-[11px] text-gray-500 block mb-2">
                    Current Location
                  </label>
                  <div className="w-full h-32 bg-gray-200 border border-gray-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-400 transform -translate-y-1/2 rotate-12" />
                      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-400 transform -translate-x-1/2 -rotate-12" />
                      <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2 -rotate-6" />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg" />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-gray-500 block mb-1">
                    Tracker ID
                  </label>
                  <p className="text-[13px] text-black">TRK-99210301S-47</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-6">
              <h3 className="text-[16px] font-bold text-black mb-6">
                Tracking Timeline
              </h3>
              <div className="flex items-start justify-between relative">
                {trackingSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div className="relative z-10 mb-3">
                      {step.completed ? (
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <Circle className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-[12px] font-medium text-black mb-1">
                        {step.title}
                      </p>
                      {step.date && (
                        <p className="text-[10px] text-gray-500">{step.date}</p>
                      )}
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div
                        className={`absolute top-6 h-0.5 ${
                          step.completed && trackingSteps[index + 1].completed
                            ? "bg-black"
                            : "bg-gray-300"
                        }`}
                        style={{
                          left: `${
                            (100 / trackingSteps.length) * (index + 0.5)
                          }%`,
                          width: `${100 / trackingSteps.length}%`,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
