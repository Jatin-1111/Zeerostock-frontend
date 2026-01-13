export default function WhyChooseSection() {
  const reasons = [
    {
      icon: (
        <svg className="w-[30px] h-[30px]" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Verified Suppliers",
      description: "All suppliers are verified and rated",
    },
    {
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
            stroke="#6366f1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Secure Payments",
      description: "Protected transactions with escrow",
    },
    {
      icon: (
        <svg className="w-[30px] h-[30px]" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#ec4899" strokeWidth="2" />
          <path
            d="M12 3C7.5 3 4 7.5 4 12C4 16.5 7.5 21 12 21"
            stroke="#ec4899"
            strokeWidth="2"
          />
          <path
            d="M12 3C16.5 3 20 7.5 20 12C20 16.5 16.5 21 12 21"
            stroke="#ec4899"
            strokeWidth="2"
          />
          <line
            x1="12"
            y1="3"
            x2="12"
            y2="21"
            stroke="#ec4899"
            strokeWidth="2"
          />
          <line
            x1="3"
            y1="12"
            x2="21"
            y2="12"
            stroke="#ec4899"
            strokeWidth="2"
          />
        </svg>
      ),
      title: "Global Shipping",
      description: "Worldwide delivery options",
    },
    {
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <path
            d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C23 17.9391 22.5786 16.9217 21.8284 16.1716C21.0783 15.4214 20.0609 15 19 15H18M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7ZM19 7C19 8.65685 17.6569 10 16 10C14.3431 10 13 8.65685 13 7C13 5.34315 14.3431 4 16 4C17.6569 4 19 5.34315 19 7Z"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Help & Support",
      description: "Expert help when you need it",
    },
  ];

  return (
    <div className="max-w-[900px] mx-auto py-9 px-3">
      <div className="flex justify-center gap-12">
        {reasons.map((reason, index) => (
          <div key={index} className="flex flex-col items-center w-42 gap-3">
            <div className="mb-1.5">{reason.icon}</div>
            <div className="flex flex-col gap-1.5 text-center">
              <h3 className="font-medium text-base text-[#1a1a1a] m-0">
                {reason.title}
              </h3>
              <p className="text-xs text-gray-600 m-0">
                {reason.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
