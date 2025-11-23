import { Package, CreditCard, Eye } from "lucide-react";

interface ProgressStepsProps {
  currentStep: number;
}

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const steps = [
    { number: 1, label: "Shipping", Icon: Package },
    { number: 2, label: "Payment", Icon: CreditCard },
    { number: 3, label: "Review", Icon: Eye },
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const Icon = step.Icon;
        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                  currentStep >= step.number
                    ? "bg-gray-900 border-gray-900 text-white"
                    : "bg-white border-gray-900 text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  currentStep >= step.number ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-32 h-0.5 bg-gray-300 mx-4 -mt-5"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
