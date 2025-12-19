"use client";

import { VerificationFormData } from "@/types/verification";

interface StepOneProps {
  data: VerificationFormData;
  updateData: (section: string, data: Record<string, string>) => void;
}

export default function StepOneIdentityBank({
  data,
  updateData,
}: StepOneProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Identity Verification Section - Left */}
      <div className="border-2 border-gray-900 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-1">
          Identity Verification
        </h2>
        <p className="text-xs text-gray-500 mb-6">
          Verify company ownership details
        </p>

        <div className="space-y-4">
          {/* Owner/Director Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Owner/Director Name
            </label>
            <input
              type="text"
              placeholder="Sarah Johnson"
              value={data.identityVerification.ownerName}
              onChange={(e) =>
                updateData("identityVerification", {
                  ownerName: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900 text-black placeholder:text-gray-400"
            />
          </div>

          {/* Government ID */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Government ID
            </label>
            <select
              value={data.identityVerification.idCard}
              onChange={(e) =>
                updateData("identityVerification", { idCard: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900 bg-white text-black"
            >
              <option value="">Aadhar Card</option>
              <option value="pan">PAN Card</option>
              <option value="passport">Passport</option>
              <option value="driving">Driving License</option>
            </select>
          </div>

          {/* Proof of Address */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Proof of Address
            </label>
            <select
              value={data.identityVerification.proofOfAddress}
              onChange={(e) =>
                updateData("identityVerification", {
                  proofOfAddress: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900 bg-white text-black"
            >
              <option value="">Aadhar Card</option>
              <option value="utility">Utility Bill</option>
              <option value="bank">Bank Statement</option>
              <option value="lease">Lease Agreement</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bank Account Section - Right */}
      <div className="border-2 border-gray-900 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-1">Bank Account</h2>
        <p className="text-xs text-gray-500 mb-6">
          For secure payments and billing
        </p>

        <div className="space-y-4">
          {/* Bank Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Bank Name
            </label>
            <select
              value={data.bankAccount.bankName}
              onChange={(e) =>
                updateData("bankAccount", { bankName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900 bg-white text-black"
            >
              <option value="">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="sbi">State Bank of India</option>
              <option value="axis">Axis Bank</option>
            </select>
          </div>

          {/* Account Holder Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Account Holder Name
            </label>
            <input
              type="text"
              placeholder="Michael Scott"
              value={data.bankAccount.accountHolderName}
              onChange={(e) =>
                updateData("bankAccount", { accountHolderName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900 text-black placeholder:text-gray-400"
            />
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Account Number
            </label>
            <input
              type="text"
              placeholder="0895 1434 3414 1143"
              value={data.bankAccount.accountNumber}
              onChange={(e) =>
                updateData("bankAccount", { accountNumber: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900 text-black placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


