import { InfoCard } from "./VerificationBenefitsSidebar";
import VerificationCard from "./VerificationCard";

interface OperationalInfoCardProps {
  verification: {
    primary_business_address?: string;
    warehouse_locations?: string[];
    business_phone?: string;
    business_email?: string;
  };
  status: string;
}

export default function OperationalInfoCard({
  verification,
  status,
}: OperationalInfoCardProps) {
  const isVerified = status === "approved" || status === "verified";

  return (
    <VerificationCard title="Operational Information" status={status}>
      <div className="grid grid-cols-2 gap-x-[33px] gap-y-[10px]">
        <div className="col-span-1">
          <InfoCard
            label="Primary Business Address"
            value={verification.primary_business_address || "N/A"}
            verified={isVerified && !!verification.primary_business_address}
          />
        </div>
        <InfoCard
          label="Warehouse Location"
          value={
            verification.warehouse_locations &&
            verification.warehouse_locations.length > 0
              ? `${verification.warehouse_locations.length} verified Locations`
              : "Not specified"
          }
          verified={
            isVerified &&
            !!verification.warehouse_locations &&
            verification.warehouse_locations.length > 0
          }
        />
        <InfoCard
          label="Business Phone"
          value={verification.business_phone || "N/A"}
          verified={isVerified && !!verification.business_phone}
        />
        <InfoCard
          label="Business Email"
          value={verification.business_email || "N/A"}
          verified={isVerified && !!verification.business_email}
        />
      </div>
    </VerificationCard>
  );
}
