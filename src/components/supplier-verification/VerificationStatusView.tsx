"use client";

import { VerificationBenefitsSidebar } from "./VerificationBenefitsSidebar";
import VerificationHeader from "./VerificationHeader";
import VerificationProgressBar from "./VerificationProgressBar";
import VerificationBanner from "./VerificationBanner";
import BusinessInfoCard from "./BusinessInfoCard";
import IdentityCard from "./IdentityCard";
import BusinessDocumentsCard from "./BusinessDocumentsCard";
import BankAccountCard from "./BankAccountCard";
import OperationalInfoCard from "./OperationalInfoCard";
import AdditionalVerificationCard from "./AdditionalVerificationCard";

interface VerificationData {
  legal_business_name?: string;
  business_type?: string;
  business_registration_number?: string;
  business_tax_id?: string;
  establishment_year?: string;
  owner_full_name?: string;
  government_id_type?: string;
  government_id_number?: string;
  government_id_document_url?: string;
  primary_business_address?: string;
  business_phone?: string;
  business_email?: string;
  bank_name?: string;
  account_holder_name?: string;
  account_number?: string;
  business_license_url?: string;
  certificate_of_incorporation_url?: string;
  tax_registration_certificate_url?: string;
  iso_certificate_url?: string;
  business_certificate_url?: string;
  quality_assurance_license_url?: string;
  audit_reports_url?: string;
  proof_of_address_document_url?: string;
  warehouse_locations?: string[];
  submitted_at?: string;
  created_at?: string;
}

interface VerificationStatusViewProps {
  status: {
    status: string;
    verification: VerificationData | null;
    role: Record<string, unknown> | null;
    hasDraft: boolean;
    draft?: Record<string, unknown>;
  };
  onEditReapply?: () => void;
}

// Helper function to mask account number
const maskAccountNumber = (accountNumber: string) => {
  if (!accountNumber) return "";
  const last4 = accountNumber.slice(-4);
  return `****${last4}`;
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function VerificationStatusView({
  status,
  onEditReapply,
}: VerificationStatusViewProps) {
  const { verification, role } = status;

  // Debug logging
  console.log("=== VerificationStatusView Render ===");
  console.log("Status:", status.status);
  console.log("Has verification:", !!verification);
  if (verification) {
    console.log("Verification data sample:", {
      legal_business_name: verification.legal_business_name,
      business_registration_number: verification.business_registration_number,
      business_type: verification.business_type,
      bank_name: verification.bank_name,
      owner_full_name: verification.owner_full_name,
      primary_business_address: verification.primary_business_address,
    });
  }

  // Calculate progress dynamically based on actual data completeness
  const calculateProgress = () => {
    if (!verification) return { progress: 0, completedSteps: 0 };

    // Only count steps as completed if status is approved or verified
    const isVerified =
      status.status === "approved" || status.status === "verified";

    if (isVerified) {
      return { progress: 100, completedSteps: 5 };
    }

    // For pending/under_review status, show 0% progress and 0 verified steps
    // Nothing is verified until admin approves
    return { progress: 0, completedSteps: 0 };
  };

  const { progress, completedSteps } = calculateProgress();

  // Get status configuration
  const getStatusConfig = () => {
    switch (status.status) {
      case "verified":
        return {
          color: "green",
          bgClass: "bg-green-50 border-green-300",
          textClass: "text-green-800",
          iconClass: "text-green-600",
          badgeClass: "bg-green-100 text-green-800 border-green-300",
          label: "Approved",
          message:
            "Congratulations! Your supplier verification has been approved. You can now access all supplier features.",
        };
      case "rejected":
        return {
          color: "red",
          bgClass: "bg-red-50 border-red-300",
          textClass: "text-red-800",
          iconClass: "text-red-600",
          badgeClass: "bg-red-100 text-red-800 border-red-300",
          label: "Rejected",
          message: `Your verification was rejected. ${
            role?.rejection_reason
              ? `Reason: ${role.rejection_reason}`
              : "Please contact support for more information."
          }`,
        };
      case "under_review":
        return {
          color: "blue",
          bgClass: "bg-blue-50 border-blue-300",
          textClass: "text-blue-800",
          iconClass: "text-blue-600",
          badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
          label: "Under Review",
          message:
            "Your verification submission is being reviewed by our team. This usually takes 2-3 business days. You will be notified once the review is complete.",
        };
      default:
        return {
          color: "yellow",
          bgClass: "bg-yellow-50 border-yellow-300",
          textClass: "text-yellow-800",
          iconClass: "text-yellow-600",
          badgeClass: "bg-yellow-100 text-yellow-800 border-yellow-300",
          label: "Pending",
          message:
            "Your verification is pending review. Our team will review your submission shortly.",
        };
    }
  };

  const statusConfig = getStatusConfig();

  // Get documents list dynamically with all possible document types
  const getDocuments = () => {
    const docs = [];

    // Required documents
    if (verification?.business_license_url) {
      docs.push({
        label: "Business License",
        url: verification.business_license_url,
        required: true,
        status: status.status,
        uploadedDate: (verification.submitted_at ||
          verification.created_at) as string,
      });
    }
    if (verification?.certificate_of_incorporation_url) {
      docs.push({
        label: "Certificate of Incorporation",
        url: verification.certificate_of_incorporation_url,
        required: true,
        status: status.status,
        uploadedDate: (verification.submitted_at ||
          verification.created_at) as string,
      });
    }
    if (verification?.tax_registration_certificate_url) {
      docs.push({
        label: "Tax Registration Certificate",
        url: verification.tax_registration_certificate_url,
        required: true,
        status: status.status,
        uploadedDate: (verification.submitted_at ||
          verification.created_at) as string,
      });
    }
    if (verification?.government_id_document_url) {
      docs.push({
        label: "Government ID Document",
        url: verification.government_id_document_url,
        required: true,
        status: status.status,
        uploadedDate: (verification.submitted_at ||
          verification.created_at) as string,
      });
    }

    // Optional documents
    if (verification?.iso_certificate_url) {
      docs.push({
        label: "ISO Certificate",
        url: verification.iso_certificate_url,
        required: false,
        status: status.status,
        uploadedDate: (verification.submitted_at ||
          verification.created_at) as string,
      });
    }
    if (verification?.business_certificate_url) {
      docs.push({
        label: "Business Certificate",
        url: verification.business_certificate_url,
        required: false,
        status: status.status,
        uploadedDate: (verification.submitted_at ||
          verification.created_at) as string,
      });
    }
    if (verification?.quality_assurance_license_url) {
      docs.push({
        label: "Quality Assurance License",
        url: verification.quality_assurance_license_url,
        required: false,
        status: status.status,
        uploadedDate: (verification.submitted_at ||
          verification.created_at) as string,
      });
    }
    if (verification?.audit_reports_url) {
      docs.push({
        label: "Audit Reports",
        url: verification.audit_reports_url,
        required: false,
        status: status.status,
        uploadedDate: (verification.submitted_at ||
          verification.created_at) as string,
      });
    }
    if (verification?.proof_of_address_document_url) {
      docs.push({
        label: "Proof of Address",
        url: verification.proof_of_address_document_url,
        required: false,
        status: status.status,
        uploadedDate: (verification.submitted_at ||
          verification.created_at) as string,
      });
    }

    return docs;
  };

  const documents = getDocuments();

  return (
    <div className="min-h-screen bg-[#eefbf6] px-[53px] py-4">
      <VerificationHeader />

      <VerificationProgressBar
        progress={progress}
        completedSteps={completedSteps}
        status={status.status}
      />

      <VerificationBanner
        status={status.status}
        message={statusConfig.message}
      />

      {/* Edit & Reapply Button for Rejected Status */}
      {status.status === "rejected" && onEditReapply && (
        <div className="mb-[15px]">
          <button
            onClick={onEditReapply}
            className="w-full bg-gray-900 text-white font-semibold text-[11px] px-[21px] py-[11px] rounded-[7px] hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <svg
              className="w-[13px] h-[13px]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit & Reapply for Verification
          </button>
        </div>
      )}

      <div className="flex gap-[13px]">
        {/* Left Column - Verification Cards */}
        <div
          className="space-y-[15px]"
          style={{ width: "calc((100vw - 119px) * 0.75)" }}
        >
          {verification && (
            <>
              <BusinessInfoCard
                verification={verification}
                status={status.status}
              />

              <IdentityCard
                verification={verification}
                status={status.status}
              />

              {documents.length > 0 && (
                <BusinessDocumentsCard
                  documents={documents}
                  status={status.status}
                  formatDate={formatDate}
                />
              )}

              <BankAccountCard
                verification={verification}
                maskAccountNumber={maskAccountNumber}
                status={status.status}
              />

              <OperationalInfoCard
                verification={verification}
                status={status.status}
              />

              {status.status !== "approved" && status.status !== "verified" && (
                <AdditionalVerificationCard verification={verification} />
              )}
            </>
          )}
        </div>

        {/* Right Column - Benefits Sidebar */}
        <VerificationBenefitsSidebar />
      </div>
    </div>
  );
}
