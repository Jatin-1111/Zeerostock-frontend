import { Truck, CreditCard, Receipt } from "lucide-react";

interface ProgressStepsProps {
  currentStep: number;
}

const iconMap = {
  truck: Truck,
  card: CreditCard,
  receipt: Receipt,
};

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const steps = [
    { number: 1, label: "Shipping", icon: "truck" as const },
    { number: 2, label: "Payment", icon: "card" as const },
    { number: 3, label: "Review", icon: "receipt" as const },
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const isActive = currentStep >= step.number;
        const Icon = iconMap[step.icon];

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm transition-colors ${
                  isActive ? "bg-[#2AAE7A]" : "bg-white"
                }`}
              >
                <Icon
                  className="w-5 h-5"
                  color={isActive ? "white" : "#9c9c9c"}
                  strokeWidth={2}
                />
              </div>
              <span className="text-xs font-medium text-[#0d1b2a]">
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-24 h-[1px] bg-gray-300 mx-4 -mt-6"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
