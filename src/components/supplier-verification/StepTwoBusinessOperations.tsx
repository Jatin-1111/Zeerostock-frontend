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
    <div className="grid grid-cols-2 gap-6">
      {/* Business Details Section - Left */}
      <div className="border-2 border-gray-900 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-6">
          Business details
        </h2>

        <div className="space-y-4">
          {/* Legal Business Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
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
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900 text-black placeholder:text-gray-400"
            />
          </div>

          {/* Business Registration Number */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
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
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900 text-black placeholder:text-gray-400"
            />
          </div>

          {/* Business Type */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Business Type
            </label>
            <select
              value={data.businessDetails.businessType}
              onChange={(e) =>
                updateData("businessDetails", { businessType: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900 bg-white text-black"
            >
              <option value="">Limited Liability Company</option>
              <option value="sole_proprietorship">Sole Proprietorship</option>
              <option value="partnership">Partnership</option>
              <option value="llc">Limited Liability Company</option>
              <option value="corporation">Corporation</option>
              <option value="private_limited">Private Limited</option>
            </select>
          </div>

          {/* Tax ID (EIN) and Est. Year in two columns */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Tax ID (EIN)
              </label>
              <input
                type="text"
                placeholder="XX-XXXXXXXX59"
                value={data.businessDetails.taxId}
                onChange={(e) =>
                  updateData("businessDetails", { taxId: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900 text-black placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Est. Year
              </label>
              <input
                type="text"
                placeholder="2020"
                value={data.businessDetails.yearEstablished}
                onChange={(e) =>
                  updateData("businessDetails", {
                    yearEstablished: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900 text-black placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Operational Information Section - Right */}
      <div className="border-2 border-gray-900 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-6">
          Operational Information
        </h2>

        <div className="space-y-4">
          {/* Primary Business Address */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
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
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900 text-black placeholder:text-gray-400"
            />
          </div>

          {/* Warehouse Location */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Warehouse Location
            </label>
            <input
              type="text"
              placeholder="Add location (e.g. Dallas Hub)"
              value={data.operationalInfo.warehouseLocation}
              onChange={(e) =>
                updateData("operationalInfo", {
                  warehouseLocation: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900 text-black placeholder:text-gray-400"
            />
            {/* <button className="text-sm text-gray-600 mt-1">+ Add</button> */}
          </div>

          {/* Business Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
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
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900 text-black placeholder:text-gray-400"
            />
          </div>

          {/* Business Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
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
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900 text-black placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
