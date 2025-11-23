interface StatusStep {
  title: string;
  description: string;
  timestamp: string;
  status: "completed" | "current" | "pending";
}

interface OrderStatusTrackerProps {
  steps: StatusStep[];
}

export default function OrderStatusTracker({ steps }: OrderStatusTrackerProps) {
  return (
    <div className="border-2 border-gray-900 rounded p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Order Status</h2>
        <span className="text-sm text-blue-600 font-medium">Processing</span>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4">
            {/* Status Icon */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.status === "completed"
                    ? "bg-green-600"
                    : step.status === "current"
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              >
                {step.status === "completed" ? (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : step.status === "current" ? (
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                ) : (
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className="w-0.5 h-12 bg-gray-300 my-1"></div>
              )}
            </div>

            {/* Status Content */}
            <div className="flex-1 pb-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                <span className="text-sm text-gray-500">{step.timestamp}</span>
              </div>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
