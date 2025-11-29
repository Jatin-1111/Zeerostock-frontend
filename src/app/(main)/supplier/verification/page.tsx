"use client";

import VerificationProgress from "@/components/supplier-verification/VerificationProgress";
import BusinessInformation from "@/components/supplier-verification/BusinessInformation";
import IdentityVerification from "@/components/supplier-verification/IdentityVerification";
import BusinessDocuments from "@/components/supplier-verification/BusinessDocuments";
import BankAccountVerification from "@/components/supplier-verification/BankAccountVerification";
import OperationalInformation from "@/components/supplier-verification/OperationalInformation";
import AdditionalVerifications from "@/components/supplier-verification/AdditionalVerifications";
import VerificationBenefitsList from "@/components/supplier-verification/VerificationBenefitsList";
import VerificationImpact from "@/components/supplier-verification/VerificationImpact";
import NeedHelp from "@/components/supplier-verification/NeedHelp";
import { ShieldCheck } from "lucide-react";

export default function SupplierVerificationPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-8 h-8 text-gray-900" />
            <h1 className="text-3xl font-bold text-gray-900">
              Supplier Verification
            </h1>
          </div>
          <p className="text-gray-600">
            Complete verification to unlock premium features and build buyer
            trust
          </p>
        </div>

        <VerificationProgress />
        {/* Main Layout: Left Content + Right Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Verification Sections */}
          <div className="flex-1">
            <BusinessInformation />
            <IdentityVerification />
            <BusinessDocuments />
            <BankAccountVerification />
            <OperationalInformation />
            <AdditionalVerifications />
          </div>

          {/* Right Column - Benefits Sidebar */}
          <div className="lg:w-80">
            <VerificationBenefitsList />
            <VerificationImpact />
            <NeedHelp />
          </div>
        </div>
      </div>
    </div>
  );
}
