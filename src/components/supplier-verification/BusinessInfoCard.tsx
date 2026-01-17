import { InfoCard } from "./VerificationBenefitsSidebar";
import VerificationCard from "./VerificationCard";

interface BusinessInfoCardProps {
  verification: {
    legal_business_name?: string;
    business_registration_number?: string;
    business_tax_id?: string;
    business_type?: string;
    establishment_year?: string;
  };
  status: string;
}

export default function BusinessInfoCard({
  verification,
  status,
}: BusinessInfoCardProps) {
  // Debug logging
  console.log("BusinessInfoCard - verification object:", verification);
  console.log("BusinessInfoCard - keys:", Object.keys(verification || {}));
  console.log(
    "BusinessInfoCard - legal_business_name:",
    verification.legal_business_name
  );
  console.log(
    "BusinessInfoCard - business_registration_number:",
    verification.business_registration_number
  );

  const isVerified = status === "approved" || status === "verified";

  return (
    <VerificationCard title="Business Information" status={status}>
      <div className="grid grid-cols-2 gap-x-[33px] gap-y-[10px]">
        <InfoCard
          label="Legal Business Name"
          value={verification.legal_business_name || "N/A"}
          verified={isVerified && !!verification.legal_business_name}
        />
        <InfoCard
          label="Business Registration Number"
          value={verification.business_registration_number || "N/A"}
          verified={isVerified && !!verification.business_registration_number}
        />
        <InfoCard
          label="Tax ID (EIN)"
          value={verification.business_tax_id || "N/A"}
          verified={isVerified && !!verification.business_tax_id}
        />
        <InfoCard
          label="Business Type"
          value={verification.business_type || "N/A"}
          verified={isVerified && !!verification.business_type}
        />
        <InfoCard
          label="Year Established"
          value={verification.establishment_year || "N/A"}
          verified={isVerified && !!verification.establishment_year}
        />
      </div>
    </VerificationCard>
  );
}
