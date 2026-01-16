"use client";

import { VerificationFormData } from "@/types/verification";

interface StepTwoProps {
  data: VerificationFormData;
  updateData: (section: string, data: Record<string, string>) => void;
}

export default function StepTwoBusinessOperations({
  data,
  updateData,
}: StepTwoProps) {
  return (
    <div className="flex gap-3 w-full">
      {/* Business Details Section - Left */}
      <div className="bg-white rounded-[13px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-[#e5e5e5] px-3 py-2 flex-shrink-0">
          <h2 className="text-xs font-semibold text-black">
            Business details
          </h2>
        </div>

        <div className="px-3 py-4 space-y-4 flex-1 overflow-y-auto">
          {/* Legal Business Name */}
          <div>
            <label className="block text-[9px] font-medium text-black mb-1.5">
              Legal Business Name
            </label>
            <input
              type="text"
              placeholder="Sarah's Manufacturing LLC"
              value={data.businessDetails.legalBusinessName}
              onChange={(e) =>
                updateData("businessDetails", {
                  legalBusinessName: e.target.value,
                })
              }
              className="w-full h-[33px] px-2.5 text-[11px] border border-[#bebebe] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#bebebe] text-black placeholder:text-[#9c9c9c]"
            />
          </div>

          {/* Business Registration Number */}
          <div>
            <label className="block text-[9px] font-medium text-black mb-1.5">
              Business Registration Number
            </label>
            <input
              type="text"
              placeholder="BRN-112144-243462"
              value={data.businessDetails.businessRegistrationNumber}
              onChange={(e) =>
                updateData("businessDetails", {
                  businessRegistrationNumber: e.target.value,
                })
              }
              className="w-full h-[33px] px-2.5 text-[11px] border border-[#bebebe] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#bebebe] text-black placeholder:text-[#9c9c9c]"
            />
          </div>

          {/* Business Type */}
          <div>
            <label className="block text-[9px] font-medium text-black mb-1.5">
              Business Type
            </label>
            <div className="relative">
              <select
                value={data.businessDetails.businessType}
                onChange={(e) =>
                  updateData("businessDetails", {
                    businessType: e.target.value,
                  })
                }
                className="w-full h-[33px] px-2.5 pr-8 text-xs border border-[#bebebe] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#bebebe] bg-white text-black appearance-none"
              >
                <option value="">Limited Liability Company</option>
                <option value="sole_proprietorship">Sole Proprietorship</option>
                <option value="partnership">Partnership</option>
                <option value="llc">Limited Liability Company</option>
                <option value="corporation">Corporation</option>
                <option value="private_limited">Private Limited</option>
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="10" height="5" viewBox="0 0 10 5" fill="none">
                  <path d="M5 5L0 0H10L5 5Z" fill="#9c9c9c" />
                </svg>
              </div>
            </div>
          </div>

          {/* Tax ID (EIN) and Est. Year in two columns */}
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 min-w-[100px]">
              <label className="block text-[9px] font-medium text-black mb-1.5">
                Tax ID (EIN)
              </label>
              <input
                type="text"
                placeholder="XX-XXXXXXXX59"
                value={data.businessDetails.taxId}
                onChange={(e) =>
                  updateData("businessDetails", { taxId: e.target.value })
                }
                className="w-full h-[33px] px-2.5 text-[11px] border border-[#bebebe] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#bebebe] text-black placeholder:text-[#9c9c9c]"
              />
            </div>
            <div className="w-[100px] min-w-[80px]">
              <label className="block text-[9px] font-medium text-black mb-1.5">
                Est. Year
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="2020"
                  value={data.businessDetails.yearEstablished}
                  onChange={(e) =>
                    updateData("businessDetails", {
                      yearEstablished: e.target.value,
                    })
                  }
                  className="w-full h-[33px] px-2.5 pr-8 text-[11px] border border-[#bebebe] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#bebebe] text-black placeholder:text-[#9c9c9c]"
                />
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="10" height="5" viewBox="0 0 10 5" fill="none">
                    <path d="M5 5L0 0H10L5 5Z" fill="#9c9c9c" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Information Section - Right */}
      <div className="bg-white rounded-[13px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-[#e5e5e5] px-3 py-2 flex-shrink-0">
          <h2 className="text-[11px] font-semibold text-black">
            Operational Information
          </h2>
        </div>

        <div className="px-3 py-4 space-y-4 flex-1 overflow-y-auto">
          {/* Primary Business Address */}
          <div>
            <label className="block text-[9px] font-medium text-black mb-1.5">
              Primary Business Address
            </label>
            <textarea
              placeholder="1233 Market St, Industrial Pkwy, Houston, TX 777002"
              value={data.operationalInfo.primaryAddress}
              onChange={(e) =>
                updateData("operationalInfo", {
                  primaryAddress: e.target.value,
                })
              }
              rows={2}
              className="w-full h-[53px] px-2.5 py-2 text-xs border border-[#bebebe] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#bebebe] text-black placeholder:text-[#9c9c9c] resize-none"
            />
          </div>

          {/* Warehouse Location */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[9px] font-medium text-black">
                Warehouse Location
              </label>
              <button className="text-xs font-medium text-black">
                + Add
              </button>
            </div>
            <input
              type="text"
              placeholder="Add location (e.g. Dallas Hub)"
              value={data.operationalInfo.warehouseLocation}
              onChange={(e) =>
                updateData("operationalInfo", {
                  warehouseLocation: e.target.value,
                })
              }
              className="w-full h-[33px] px-2.5 text-[11px] border border-[#bebebe] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#bebebe] text-[#898989] placeholder:text-[#898989]"
            />
          </div>

          {/* Business Phone */}
          <div>
            <label className="block text-[9px] font-medium text-black mb-1.5">
              Business Phone
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 123-24156"
              value={data.operationalInfo.businessPhone}
              onChange={(e) =>
                updateData("operationalInfo", {
                  businessPhone: e.target.value,
                })
              }
              className="w-full h-[33px] px-2.5 text-[11px] border border-[#bebebe] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#bebebe] text-black placeholder:text-[#9c9c9c]"
            />
          </div>

          {/* Business Email */}
          <div>
            <label className="block text-[9px] font-medium text-black mb-1.5">
              Business Email
            </label>
            <input
              type="email"
              placeholder="contact@sarahsmfg.com"
              value={data.operationalInfo.businessEmail}
              onChange={(e) =>
                updateData("operationalInfo", {
                  businessEmail: e.target.value,
                })
              }
              className="w-full h-[33px] px-2.5 text-[11px] border border-[#bebebe] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#bebebe] text-black placeholder:text-[#9c9c9c]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
