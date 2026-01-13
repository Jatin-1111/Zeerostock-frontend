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
    <div className="bg-white rounded-[15px] p-[23px] mb-5 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
      <h3 className="font-medium text-[#0d1b2a] text-xl leading-normal mb-[34px]">
        What&apos;s Next?
      </h3>

      <div className="space-y-[29px] mb-[41px]">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-[14px]">
            {/* Icon */}
            <div className="w-[33px] h-[33px] flex items-center justify-center flex-shrink-0">
              {step.completed ? (
                <div className="w-[18px] h-[18px] flex items-center justify-center">
                  <Check
                    className="w-[18px] h-[18px] text-[#2aae7a]"
                    strokeWidth={2}
                  />
                </div>
              ) : (
                <div className="w-[27px] h-[27px] rounded-full border-[6px] border-gray-300"></div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-[4px]">
              <h4 className="font-medium text-[#0d1b2a] text-base leading-normal tracking-[0.4px] mb-[4px]">
                {step.title}
              </h4>
              <p className="font-medium text-[#9c9c9c] text-base leading-normal max-w-[232px]">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full max-w-[269px] mx-auto block bg-[#1e3a8a] text-white h-[45px] rounded-[11px] hover:bg-[#1e3a8a]/90 transition-colors flex items-center justify-center gap-[15px]">
        <span className="font-semibold text-base leading-normal">
          Go to Dashboard
        </span>
        <ArrowRight className="w-[18px] h-[18px]" strokeWidth={2} />
      </button>
    </div>
  );
}
