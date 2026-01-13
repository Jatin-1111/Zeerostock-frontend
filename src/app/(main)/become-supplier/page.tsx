"use client";

import { useState, useEffect } from "react";
import { Shield, Loader2 } from "lucide-react";
import StepOneIdentityBank from "@/components/supplier-verification/StepOneIdentityBank";
import StepTwoBusinessOperations from "@/components/supplier-verification/StepTwoBusinessOperations";
import StepThreeDocuments from "@/components/supplier-verification/StepThreeDocuments";
import { VerificationBenefitsSidebar } from "@/components/supplier-verification/VerificationBenefitsSidebar";
import { supplierVerificationService } from "@/services/supplierVerification.service";
import { useRouter } from "next/navigation";

// Import the status page component
import VerificationStatusView from "@/components/supplier-verification/VerificationStatusView";

export default function SupplierVerificationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
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

  // Function to map verification data back to form for editing
  const loadVerificationDataForEdit = () => {
    if (!verificationStatus?.verification) return;

    const v = verificationStatus.verification;

    setFormData({
      identityVerification: {
        ownerName: v.owner_full_name || "",
        idCard: v.government_id_type || "",
        proofOfAddress: v.proof_of_address_document_url || "",
        aadharCard: v.government_id_number || "",
      },
      bankAccount: {
        bankName: v.bank_name || "",
        accountHolderName: v.account_holder_name || "",
        accountNumber: v.account_number || "",
        ifscCode: v.routing_number || "",
      },
      businessDetails: {
        legalBusinessName: v.legal_business_name || "",
        businessRegistrationNumber: v.business_registration_number || "",
        businessType: v.business_type || "",
        taxId: v.business_tax_id || "",
        ein: "",
        yearEstablished: v.establishment_year?.toString() || "",
      },
      operationalInfo: {
        primaryAddress: v.primary_business_address || "",
        warehouseLocation: v.warehouse_locations?.[0] || "",
        businessPhone: v.business_phone || "",
        businessEmail: v.business_email || "",
      },
      documents: {
        governmentId: v.government_id_document_url || null,
        proofOfAddress: v.proof_of_address_document_url || null,
        businessLicense: v.business_license_url || null,
        certificateOfIncorporation: v.certificate_of_incorporation_url || null,
        taxRegistration: v.tax_registration_certificate_url || null,
        iso9001: v.iso_certificate_url || null,
        industryLicenses: v.quality_assurance_license_url || null,
        auditReports: v.audit_reports_url || null,
      },
    });

    setIsEditing(true);
    setCurrentStep(1);
  };

  // Auto-save draft on form data change
  useEffect(() => {
    if (
      !loading &&
      (verificationStatus?.status === "not_started" || isEditing)
    ) {
      const timer = setTimeout(() => {
        saveDraft();
      }, 2000); // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(timer);
    }
  }, [formData, currentStep, loading, verificationStatus, isEditing]);

  const saveDraft = async () => {
    try {
      await supplierVerificationService.saveDraft(formData, currentStep);
    } catch (error) {
      console.error("Failed to save draft:", error);
    }
  };

  const validateStep1 = () => {
    const { identityVerification, bankAccount } = formData;
    if (!identityVerification.ownerName.trim()) {
      alert("Please enter Owner/Director Name");
      return false;
    }
    if (!identityVerification.idCard) {
      alert("Please select Government ID type");
      return false;
    }
    if (!identityVerification.proofOfAddress) {
      alert("Please select Proof of Address type");
      return false;
    }
    if (!bankAccount.bankName) {
      alert("Please select Bank Name");
      return false;
    }
    if (!bankAccount.accountHolderName.trim()) {
      alert("Please enter Account Holder Name");
      return false;
    }
    if (!bankAccount.accountNumber.trim()) {
      alert("Please enter Account Number");
      return false;
    }
    if (!bankAccount.ifscCode.trim()) {
      alert("Please enter IFSC Code");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const { businessDetails, operationalInfo } = formData;
    if (!businessDetails.legalBusinessName.trim()) {
      alert("Please enter Legal Business Name");
      return false;
    }
    if (!businessDetails.businessRegistrationNumber.trim()) {
      alert("Please enter Business Registration Number");
      return false;
    }
    if (!businessDetails.businessType) {
      alert("Please select Business Type");
      return false;
    }
    if (!businessDetails.taxId.trim()) {
      alert("Please enter Tax ID (EIN)");
      return false;
    }
    if (!businessDetails.yearEstablished.trim()) {
      alert("Please enter Establishment Year");
      return false;
    }
    if (!operationalInfo.primaryAddress.trim()) {
      alert("Please enter Primary Business Address");
      return false;
    }
    if (!operationalInfo.businessPhone.trim()) {
      alert("Please enter Business Phone");
      return false;
    }
    if (!operationalInfo.businessEmail.trim()) {
      alert("Please enter Business Email");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    const { documents } = formData;
    const mandatoryDocs = [
      { key: "governmentId", label: "Government ID" },
      {
        key: "certificateOfIncorporation",
        label: "Certificate of Incorporation",
      },
      { key: "taxRegistration", label: "Tax Registration" },
      { key: "proofOfAddress", label: "Proof of Address" },
      { key: "businessLicense", label: "Business License" },
    ];

    for (const doc of mandatoryDocs) {
      if (!documents[doc.key as keyof typeof documents]) {
        alert(`Please upload ${doc.label}`);
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) {
      return;
    }
    if (currentStep === 2 && !validateStep2()) {
      return;
    }
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
    if (!validateStep3()) {
      return;
    }
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
        setIsEditing(false);
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
  if (
    verificationStatus &&
    verificationStatus.status !== "not_started" &&
    !isEditing
  ) {
    return (
      <VerificationStatusView
        status={verificationStatus}
        onEditReapply={loadVerificationDataForEdit}
      />
    );
  }

  // Show verification form
  return (
    <div className="min-h-screen bg-[#eefbf6]">
      <div className="max-w-[960px] mx-auto px-4 py-10">
        {/* Header - White rounded box with shadow and green accent */}
        <div className="bg-white rounded-[13px] shadow-[0px_0px_3px_0px_rgba(24,181,34,0.25)] h-[77px] mb-4 flex items-center px-7 relative">
          <div className="bg-[#eeffef] rounded-[7px] shadow-[0px_0px_7px_0px_rgba(24,181,34,0.25)] p-2.5 flex items-center justify-center">
            <Shield className="w-[30px] h-[30px] text-[#2aae7a]" />
          </div>
          <div className="ml-6">
            <h1 className="text-xl font-semibold text-[#0d1b2a] leading-tight">
              {isEditing
                ? "Edit & Reapply for Verification"
                : "Supplier Verification"}
            </h1>
            <p className="text-base font-medium text-[#9c9c9c] mt-0.5">
              {isEditing
                ? "Update your information and resubmit for verification"
                : "Complete verification to unlock premium features and build buyer trust"}
            </p>
          </div>
        </div>

        {/* Progress Stepper */}
        <div className="mb-5 flex items-center justify-center">
          <div className="flex items-center gap-0">
            {/* Step 1 */}
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <span
                  className={`text-xs font-semibold mb-1 ${
                    currentStep >= 1 ? "text-[#2aae7a]" : "text-[#dfdfdf]"
                  }`}
                >
                  Step 1
                </span>
                <div
                  className={`w-[30px] h-[30px] rounded-full flex items-center justify-center font-semibold text-sm ${
                    currentStep >= 1
                      ? "bg-[#2aae7a] text-white"
                      : "bg-[#dfdfdf] text-[#8d8d8d]"
                  }`}
                >
                  1
                </div>
              </div>
              <div className="ml-3 text-left max-w-[100px]">
                <div
                  className={`text-sm font-semibold leading-tight ${
                    currentStep >= 1 ? "text-[#2aae7a]" : "text-[#bebebe]"
                  }`}
                >
                  Identity & Bank
                </div>
              </div>
            </div>

            {/* Connector */}
            <div
              className={`w-[73px] h-[2px] mx-2 ${
                currentStep >= 2 ? "bg-[#2aae7a]" : "bg-[#dfdfdf]"
              }`}
            ></div>

            {/* Step 2 */}
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <span
                  className={`text-xs font-semibold mb-1 ${
                    currentStep >= 2 ? "text-[#2aae7a]" : "text-[#dfdfdf]"
                  }`}
                >
                  Step 2
                </span>
                <div
                  className={`w-[30px] h-[30px] rounded-full flex items-center justify-center font-semibold text-sm ${
                    currentStep >= 2
                      ? "bg-[#2aae7a] text-white"
                      : "bg-[#dfdfdf] text-[#8d8d8d]"
                  }`}
                >
                  2
                </div>
              </div>
              <div className="ml-3 text-left max-w-[90px]">
                <div
                  className={`text-sm font-semibold leading-tight ${
                    currentStep >= 2 ? "text-[#2aae7a]" : "text-[#bebebe]"
                  }`}
                >
                  Business & Operation info
                </div>
              </div>
            </div>

            {/* Connector */}
            <div
              className={`w-[73px] h-[2px] mx-2 ${
                currentStep >= 3 ? "bg-[#2aae7a]" : "bg-[#dfdfdf]"
              }`}
            ></div>

            {/* Step 3 */}
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <span
                  className={`text-xs font-semibold mb-1 ${
                    currentStep >= 3 ? "text-[#2aae7a]" : "text-[#dfdfdf]"
                  }`}
                >
                  Step 3
                </span>
                <div
                  className={`w-[30px] h-[30px] rounded-full flex items-center justify-center font-semibold text-sm ${
                    currentStep >= 3
                      ? "bg-[#2aae7a] text-white"
                      : "bg-[#dfdfdf] text-[#8d8d8d]"
                  }`}
                >
                  3
                </div>
              </div>
              <div className="ml-3 text-left max-w-[78px]">
                <div
                  className={`text-sm font-semibold leading-tight ${
                    currentStep >= 3 ? "text-[#2aae7a]" : "text-[#bebebe]"
                  }`}
                >
                  Documents
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-4">
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
            <div className="flex justify-between mt-5">
              <div className="flex gap-2">
                {isEditing && (
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setCurrentStep(1);
                    }}
                    disabled={submitting}
                    className="px-4 py-1.5 border-2 border-red-600 text-red-600 text-sm font-medium hover:bg-red-50 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed rounded"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1 || submitting}
                  className={`px-4 py-1.5 text-sm font-medium rounded ${
                    currentStep === 1 || submitting
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-900 cursor-pointer"
                  }`}
                >
                  ← Previous Step
                </button>
              </div>
              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  disabled={submitting}
                  className="px-5 py-2 bg-[#1e3a8a] text-white text-sm font-medium hover:bg-[#1e3a8a]/90 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-[7px] flex items-center gap-1.5"
                >
                  <span>Save & Continue</span>
                  <svg
                    className="w-[15px] h-[15px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      /* Preview logic */
                    }}
                    disabled={submitting}
                    className="px-4 py-1.5 border-1 border-[#9C9C9C] text-gray-900 text-sm font-medium hover:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed rounded"
                  >
                    Preview
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="px-5 py-2 bg-[#2AAE7A] text-white text-sm font-medium hover:bg-[#1e3a8a]/90 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-[7px] flex items-center gap-1.5"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        {isEditing ? "Resubmitting..." : "Submitting..."}
                      </>
                    ) : (
                      <>
                        <span>
                          {isEditing
                            ? "Resubmit for Verification"
                            : "Submit for Verification"}
                        </span>
                        <svg
                          className="w-[15px] h-[15px]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Benefits Sidebar (Hidden on Step 3) */}
          {currentStep !== 3 && (
            <div className="w-[269px]">
              <VerificationBenefitsSidebar />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
