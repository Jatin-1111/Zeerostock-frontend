"use client";

import { useState, useEffect } from "react";
import { Shield, Loader2 } from "lucide-react";
import StepOneIdentityBank from "@/components/supplier-verification/StepOneIdentityBank";
import StepTwoBusinessOperations from "@/components/supplier-verification/StepTwoBusinessOperations";
import StepThreeDocuments from "@/components/supplier-verification/StepThreeDocuments";
import VerificationBenefitsSidebar from "@/components/supplier-verification/VerificationBenefitsSidebar";
import { supplierVerificationService } from "@/services/supplierVerification.service";
import { useRouter } from "next/navigation";

// Import the status page component
import VerificationStatusView from "@/components/supplier-verification/VerificationStatusView";

export default function SupplierVerificationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Identity & Bank
    identityVerification: {
      ownerName: "",
      idCard: "",
      proofOfAddress: "",
      aadharCard: "",
    },
    bankAccount: {
      bankName: "",
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
    },
    // Step 2: Business & Operations
    businessDetails: {
      legalBusinessName: "",
      businessRegistrationNumber: "",
      businessType: "",
      taxId: "",
      ein: "",
      yearEstablished: "",
    },
    operationalInfo: {
      primaryAddress: "",
      warehouseLocation: "",
      businessPhone: "",
      businessEmail: "",
    },
    // Step 3: Documents
    documents: {
      governmentId: null,
      proofOfAddress: null,
      businessLicense: null,
      certificateOfIncorporation: null,
      taxRegistration: null,
      iso9001: null,
      industryLicenses: null,
      auditReports: null,
    },
  });

  // Check verification status on mount
  useEffect(() => {
    checkVerificationStatus();
  }, []);

  const checkVerificationStatus = async () => {
    try {
      const response = await supplierVerificationService.getStatus();
      if (response.success && response.data) {
        setVerificationStatus(response.data);

        // If there's a draft, load it
        if (response.data.hasDraft && response.data.draft) {
          setFormData(response.data.draft.step_data as typeof formData);
          setCurrentStep(response.data.draft.current_step);
        }
      }
    } catch (error) {
      console.error("Failed to fetch verification status:", error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-save draft on form data change
  useEffect(() => {
    if (!loading && verificationStatus?.status === "not_started") {
      const timer = setTimeout(() => {
        saveDraft();
      }, 2000); // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(timer);
    }
  }, [formData, currentStep]);

  const saveDraft = async () => {
    try {
      await supplierVerificationService.saveDraft(formData, currentStep);
    } catch (error) {
      console.error("Failed to save draft:", error);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Prepare data for submission
      const submissionData = {
        ownerFullName: formData.identityVerification.ownerName,
        governmentIdType: formData.identityVerification.idCard,
        governmentIdNumber: formData.identityVerification.aadharCard,
        governmentIdDocumentUrl: formData.documents.governmentId,
        proofOfAddressDocumentUrl: formData.documents.proofOfAddress,
        bankName: formData.bankAccount.bankName,
        accountHolderName: formData.bankAccount.accountHolderName,
        accountNumber: formData.bankAccount.accountNumber,
        routingNumber: formData.bankAccount.ifscCode,
        swiftCode: "",
        legalBusinessName: formData.businessDetails.legalBusinessName,
        businessRegistrationNumber:
          formData.businessDetails.businessRegistrationNumber,
        businessType: formData.businessDetails.businessType,
        businessTaxId: formData.businessDetails.taxId,
        establishmentYear:
          parseInt(formData.businessDetails.yearEstablished) ||
          new Date().getFullYear(),
        primaryBusinessAddress: formData.operationalInfo.primaryAddress,
        warehouseLocations: [formData.operationalInfo.warehouseLocation],
        businessPhone: formData.operationalInfo.businessPhone,
        businessEmail: formData.operationalInfo.businessEmail,
        businessLicenseUrl: formData.documents.businessLicense,
        certificateOfIncorporationUrl:
          formData.documents.certificateOfIncorporation,
        taxRegistrationCertificateUrl: formData.documents.taxRegistration,
        businessCertificateUrl: "",
        isoCertificateUrl: formData.documents.iso9001,
        qualityAssuranceLicenseUrl: formData.documents.industryLicenses,
        auditReportsUrl: formData.documents.auditReports,
      };

      const response = await supplierVerificationService.submitVerification(
        submissionData
      );

      if (response.success) {
        // Refresh status to show submitted state
        await checkVerificationStatus();
      } else {
        alert(response.message || "Failed to submit verification");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      alert(error.message || "Failed to submit verification");
    } finally {
      setSubmitting(false);
    }
  };

  const updateFormData = (section: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], ...data },
    }));
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-900" />
      </div>
    );
  }

  // If verification is submitted (any status except not_started), show status page
  if (verificationStatus && verificationStatus.status !== "not_started") {
    return <VerificationStatusView status={verificationStatus} />;
  }

  // Show verification form
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-gray-900" />
            <h1 className="text-3xl font-bold text-gray-900">
              Supplier Verification
            </h1>
          </div>
          <p className="text-sm text-gray-600">
            Complete verification to unlock premium features and build buyer
            trust
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {/* Step 1 */}
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold ${
                  currentStep >= 1
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-400 border-gray-300"
                }`}
              >
                1
              </div>
              <div className="ml-3 text-left">
                <div
                  className={`text-sm font-semibold ${
                    currentStep >= 1 ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  Identity & Bank
                </div>
              </div>
            </div>

            {/* Connector */}
            <div
              className={`w-24 h-0.5 ${
                currentStep >= 2 ? "bg-gray-900" : "bg-gray-300"
              }`}
            ></div>

            {/* Step 2 */}
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold ${
                  currentStep >= 2
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-400 border-gray-300"
                }`}
              >
                2
              </div>
              <div className="ml-3 text-left">
                <div
                  className={`text-sm font-semibold ${
                    currentStep >= 2 ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  Business &
                  <br />
                  Operations Info
                </div>
              </div>
            </div>

            {/* Connector */}
            <div
              className={`w-24 h-0.5 ${
                currentStep >= 3 ? "bg-gray-900" : "bg-gray-300"
              }`}
            ></div>

            {/* Step 3 */}
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold ${
                  currentStep >= 3
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-400 border-gray-300"
                }`}
              >
                3
              </div>
              <div className="ml-3 text-left">
                <div
                  className={`text-sm font-semibold ${
                    currentStep >= 3 ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  Documents
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Left Column - Form Content */}
          <div className="flex-1">
            {currentStep === 1 && (
              <StepOneIdentityBank
                data={formData}
                updateData={updateFormData}
              />
            )}
            {currentStep === 2 && (
              <StepTwoBusinessOperations
                data={formData}
                updateData={updateFormData}
              />
            )}
            {currentStep === 3 && (
              <StepThreeDocuments data={formData} updateData={updateFormData} />
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1 || submitting}
                className={`px-6 py-2 border-2 border-gray-900 font-medium ${
                  currentStep === 1 || submitting
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                ← Previous Step
              </button>
              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  disabled={submitting}
                  className="px-6 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Save & Continue →
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      /* Preview logic */
                    }}
                    disabled={submitting}
                    className="px-6 py-2 border-2 border-gray-900 text-gray-900 font-medium hover:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed"
                  >
                    Preview
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="px-6 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit for Verification →"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Benefits Sidebar (Hidden on Step 3) */}
          {currentStep !== 3 && (
            <div className="w-80">
              <VerificationBenefitsSidebar />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
