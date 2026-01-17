import { InfoCard } from "./VerificationBenefitsSidebar";
import VerificationCard from "./VerificationCard";

interface IdentityCardProps {
  verification: {
    owner_full_name?: string;
    government_id_document_url?: string;
    proof_of_address_document_url?: string;
  };
  status: string;
}

export default function IdentityCard({
  verification,
  status,
}: IdentityCardProps) {
  const isVerified = status === "approved" || status === "verified";

  return (
    <VerificationCard title="Identity Verification" status={status}>
      <div className="grid grid-cols-2 gap-x-[33px] gap-y-[10px]">
        <InfoCard
          label="Owner/Director Name"
          value={verification.owner_full_name || "N/A"}
          verified={isVerified && !!verification.owner_full_name}
        />
        <InfoCard
          label="Government ID"
          value={
            verification.government_id_document_url
              ? "Uploaded - Verified"
              : "Not Uploaded"
          }
          verified={isVerified && !!verification.government_id_document_url}
        />
        <InfoCard
          label="Proof of Address"
          value={
            verification.proof_of_address_document_url
              ? "Uploaded - Verified"
              : "Not Uploaded"
          }
          verified={isVerified && !!verification.proof_of_address_document_url}
        />
      </div>
    </VerificationCard>
  );
}
