import { Check, ArrowRight } from "lucide-react";

interface NextStep {
  icon: string;
  title: string;
  description: string;
  completed?: boolean;
}

interface WhatsNextProps {
  steps: NextStep[];
}

export default function WhatsNext({ steps }: WhatsNextProps) {
  return (
    <div className="bg-white rounded-[15px] p-4 sm:p-5 md:p-[23px] lg:p-[15px] mb-4 sm:mb-5 lg:mb-3 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
      <h3 className="font-medium text-[#0d1b2a] text-base sm:text-lg md:text-[18px] lg:text-[12px] leading-normal mb-6 sm:mb-[34px] lg:mb-[23px]">
        What&apos;s Next?
      </h3>

      <div className="space-y-5 sm:space-y-[29px] lg:space-y-[19px] mb-8 sm:mb-[41px] lg:mb-[27px]">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-start gap-2 sm:gap-[14px] lg:gap-[9px]"
          >
            {/* Icon */}
            <div className="w-7 h-7 sm:w-[33px] sm:h-[33px] lg:w-[22px] lg:h-[22px] flex items-center justify-center flex-shrink-0">
              {step.completed ? (
                <div className="w-4 h-4 sm:w-[18px] sm:h-[18px] lg:w-[12px] lg:h-[12px] flex items-center justify-center">
                  <Check
                    className="w-4 h-4 sm:w-[18px] sm:h-[18px] lg:w-[12px] lg:h-[12px] text-[#2aae7a]"
                    strokeWidth={2}
                  />
                </div>
              ) : (
                <div className="w-5 h-5 sm:w-[27px] sm:h-[27px] lg:w-[18px] lg:h-[18px] rounded-full border-4 sm:border-[6px] lg:border-[4px] border-gray-300"></div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1 sm:pt-[4px] lg:pt-[3px]">
              <h4 className="font-medium text-[#0d1b2a] text-sm sm:text-[15px] lg:text-[10px] leading-[21px] tracking-[0.4px] mb-1 sm:mb-[4px] lg:mb-[3px]">
                {step.title}
              </h4>
              <p className="font-medium text-[#9c9c9c] text-xs sm:text-[14px] lg:text-[9px] leading-normal max-w-full sm:max-w-[232px] lg:max-w-[155px]">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full max-w-full sm:max-w-[269px] lg:max-w-[179px] mx-auto block bg-[#1e3a8a] text-white h-10 sm:h-[45px] lg:h-[30px] rounded-[11px] hover:bg-[#1e3a8a]/90 transition-colors flex items-center justify-center gap-2 sm:gap-[15px] lg:gap-[10px]">
        <span className="font-semibold text-sm sm:text-[15px] lg:text-[10px] leading-[17px]">
          Go to Dashboard
        </span>
        <ArrowRight
          className="w-4 h-4 sm:w-[18px] sm:h-[18px] lg:w-[12px] lg:h-[12px]"
          strokeWidth={2}
        />
      </button>
    </div>
  );
}
