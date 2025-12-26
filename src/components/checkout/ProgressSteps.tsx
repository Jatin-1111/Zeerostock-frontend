interface ProgressStepsProps {
  currentStep: number;
}

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const steps = [
    { number: 1, label: "Shipping", icon: "truck" },
    { number: 2, label: "Payment", icon: "card" },
    { number: 3, label: "Review", icon: "receipt" },
  ];

  return (
    <div className="flex items-center justify-center mb-9">
      {steps.map((step, index) => {
        const isActive = currentStep >= step.number;
        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`rounded-[15px] flex items-center justify-center ${
                  isActive ? "bg-[#2AAE7A]" : "bg-white"
                }`}
                style={{
                  width: "60px",
                  height: "60px",
                  boxShadow: "0px 0px 4.5px 0px rgba(0,0,0,0.25)",
                }}
              >
                <svg
                  style={{
                    width: "38px",
                    height: "38px",
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={isActive ? "white" : "#9c9c9c"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {step.icon === "truck" && (
                    <>
                      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                      <path d="M15 18H9" />
                      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                      <circle cx="17" cy="18" r="2" />
                      <circle cx="7" cy="18" r="2" />
                    </>
                  )}
                  {step.icon === "card" && (
                    <>
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </>
                  )}
                  {step.icon === "receipt" && (
                    <>
                      <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                      <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
                      <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
                    </>
                  )}
                </svg>
              </div>
              <span
                className="mt-2 text-[15px] font-medium"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "#0d1b2a",
                }}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                style={{
                  width: "211px",
                  height: "1px",
                  backgroundColor: "#bebebe",
                  marginLeft: "15px",
                  marginRight: "15px",
                  marginTop: "-30px",
                }}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
