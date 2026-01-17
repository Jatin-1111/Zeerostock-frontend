import { InfoCard } from "./VerificationBenefitsSidebar";
import VerificationCard from "./VerificationCard";

interface BankAccountCardProps {
  verification: {
    bank_name?: string;
    account_number?: string;
    account_holder_name?: string;
  };
  maskAccountNumber: (accountNumber: string) => string;
  status: string;
}

export default function BankAccountCard({
  verification,
  maskAccountNumber,
  status,
}: BankAccountCardProps) {
  const isVerified = status === "approved" || status === "verified";

  return (
    <VerificationCard title="Bank Account Verification" status={status}>
      <div className="grid grid-cols-2 gap-x-[33px] gap-y-[10px]">
        <InfoCard
          label="Bank Name"
          value={verification.bank_name || "N/A"}
          verified={isVerified && !!verification.bank_name}
        />
        <InfoCard
          label="Account Number"
          value={
            verification.account_number
              ? maskAccountNumber(verification.account_number)
              : "N/A"
          }
          verified={isVerified && !!verification.account_number}
        />
        <InfoCard
          label="Account Holder"
          value={verification.account_holder_name || "N/A"}
          verified={isVerified && !!verification.account_holder_name}
        />
      </div>
    </VerificationCard>
  );
}
