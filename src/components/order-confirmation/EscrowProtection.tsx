import { ShieldCheck } from "lucide-react";

interface EscrowProtectionProps {
  amount: string;
  releaseDate: string;
}

export default function EscrowProtection({
  amount,
  releaseDate,
}: EscrowProtectionProps) {
  return (
    <div className="bg-[#eeffef] border border-[#2aae7a] rounded-[15px] p-4 sm:p-5 md:p-[23px] lg:p-[15px] mb-4 sm:mb-5 lg:mb-3 relative shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
      {/* Icon and Title */}
      <div className="flex items-center gap-2 sm:gap-[14px] lg:gap-[9px] mb-4 sm:mb-5 lg:mb-3">
        <ShieldCheck
          className="w-5 h-5 sm:w-[25px] sm:h-[25px] lg:w-[17px] lg:h-[17px] text-[#2aae7a]"
          strokeWidth={1.5}
        />
        <h3 className="font-medium text-[#0d1b2a] text-base sm:text-lg md:text-[18px] lg:text-[12px] leading-normal">
          Escrow Protection
        </h3>
      </div>

      {/* Main Description */}
      <p className="font-medium text-[#9c9c9c] text-sm sm:text-[15px] lg:text-[10px] leading-normal mb-6 sm:mb-8 lg:mb-5">
        Your payment of ${amount} is securely held in escrow until {releaseDate}
        . Funds will be released to suppliers automatically after the escrow
        period, or when you confirm receipt and satisfaction.
      </p>

      {/* View More Details Button */}
      <button className="w-full sm:w-[165px] lg:w-[110px] mx-auto block bg-[#1e3a8a] text-white font-medium text-xs sm:text-[14px] lg:text-[9px] leading-[17px] py-2 sm:py-[11px] lg:py-[7px] rounded-[15px] hover:bg-[#1e3a8a]/90 transition-colors">
        View More Details
      </button>

      {/* Footer Note */}
      <p className="font-medium text-[#9c9c9c] text-[10px] sm:text-[12px] lg:text-[8px] leading-normal text-center mt-4 sm:mt-5 lg:mt-3">
        You can release funds early or extend the escrow period if needed
      </p>
    </div>
  );
}
