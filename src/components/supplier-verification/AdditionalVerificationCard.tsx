import { DocumentRowNew } from "./VerificationBenefitsSidebar";

interface AdditionalVerificationCardProps {
  verification: {
    iso_certificate_url?: string;
    quality_assurance_license_url?: string;
    audit_reports_url?: string;
  };
}

export default function AdditionalVerificationCard({
  verification,
}: AdditionalVerificationCardProps) {
  return (
    <div className="bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] rounded-[10px] p-[20px]">
      <div className="flex items-center mb-[15px]">
        <h3 className="font-semibold text-[12px] text-[#0d1b2a]">
          Additional Verification (Optional)
        </h3>
      </div>

      <div className="border-t border-gray-200 mb-[15px]"></div>

      <div className="space-y-[10px]">
        <DocumentRowNew
          label="ISO 9001 Certification"
          date="Adds credibility to quality management"
          status={verification.iso_certificate_url ? "verified" : "upload"}
        />
        <DocumentRowNew
          label="Industry - Specific Licenses"
          date="Relevant to your products categories"
          status={
            verification.quality_assurance_license_url ? "verified" : "upload"
          }
        />
        <DocumentRowNew
          label="Third-Party Audit Reports"
          date="Strengthen buyer confidence"
          status={verification.audit_reports_url ? "verified" : "upload"}
        />
      </div>
    </div>
  );
}
