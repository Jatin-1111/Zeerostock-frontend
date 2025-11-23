interface NextStep {
  icon: string;
  title: string;
  description: string;
}

interface WhatsNextProps {
  steps: NextStep[];
}

export default function WhatsNext({ steps }: WhatsNextProps) {
  return (
    <div className="border-2 border-gray-900 rounded p-6 mb-6">
      <h3 className="font-bold text-gray-900 mb-6">What&apos;s Next?</h3>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center shrink-0 text-sm font-bold">
              {step.icon}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 flex items-center justify-center gap-2">
        <span>Go to Dashboard</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    </div>
  );
}
