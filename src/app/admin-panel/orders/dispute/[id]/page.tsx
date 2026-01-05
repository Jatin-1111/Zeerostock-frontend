"use client";

import { useState } from "react";
import { ArrowLeft, Image as ImageIcon, User } from "lucide-react";
import { AdminLayout, StatusBadge, Timeline } from "@/components/admin-panel";
import { useRouter } from "next/navigation";

export default function DisputeResolutionPage() {
  const router = useRouter();

  const paymentTimeline = [
    {
      title: "Order Created",
      date: "Order # 24",
      completed: true,
    },
    {
      title: "Payment Secured in Escrow",
      date: "Funds Verified",
      completed: true,
    },
    {
      title: "Shipment Dispatched",
      date: "In transit or pending",
      completed: true,
    },
    {
      title: "Dispute Raised",
      date: "Shipment halted",
      completed: true,
    },
    {
      title: "Resolution",
      date: "",
      completed: false,
    },
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Disputes
        </button>

        <div className="mb-6">
          <h2 className="text-[24px] font-bold text-black mb-1">
            Dispute Resolution - #DSP-0421
          </h2>
          <p className="text-[13px] text-gray-500">
            Manage and resolve transaction disputes
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-[350px,1fr] gap-6">
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-[14px] font-bold text-black mb-3">
                  Reason for Dispute: Damaged Goods
                </h3>
                <p className="text-[12px] text-gray-600 leading-relaxed">
                  Buyer claims: the shipment arrived with significant water
                  damage to 30% of the order, Product condition documented,
                  buyer requests partial refund & reshipment.
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[13px] font-bold text-black mb-1">
                      RAISE (CLAIMANT)
                    </h4>
                    <p className="text-[12px] text-black">TechCorp Inc</p>
                    <p className="text-[11px] text-gray-500">
                      techcorp_hus@mail.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[13px] font-bold text-black mb-1">
                      SUPPLIER (DEFENDANT)
                    </h4>
                    <p className="text-[12px] text-black">RiceInc EP</p>
                    <p className="text-[11px] text-gray-500">Ric/rc.mail</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-[14px] font-bold text-black mb-4">
                  Evidence Submitted
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="aspect-square border border-gray-300 bg-gray-50 flex items-center justify-center"
                    >
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-6">
              <h3 className="text-[14px] font-bold text-black mb-6">
                Payment Timeline
              </h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                <div className="space-y-6">
                  {paymentTimeline.map((step, index) => (
                    <div key={index} className="relative flex gap-4">
                      <div className="relative z-10 flex-shrink-0">
                        {step.completed ? (
                          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-gray-200 border-2 border-gray-300 rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 pb-2">
                        <h4 className="text-[13px] font-semibold text-black mb-1">
                          {step.title}
                        </h4>
                        {step.date && (
                          <p className="text-[11px] text-gray-500">
                            {step.date}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button className="px-6 py-2 bg-white border border-gray-300 text-[13px] font-medium text-black hover:bg-gray-50">
              Re-Send
            </button>
            <button className="px-6 py-2 bg-black text-white text-[13px] font-medium hover:bg-gray-900">
              Close Issue
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
