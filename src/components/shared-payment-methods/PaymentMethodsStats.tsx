"use client";

// Custom SVG Icons
const EmptyWalletIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
      stroke="#3B82F6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
      stroke="#3B82F6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TimerIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.75 13.25C20.75 18.08 16.83 22 12 22C7.17 22 3.25 18.08 3.25 13.25C3.25 8.42 7.17 4.5 12 4.5C16.83 4.5 20.75 8.42 20.75 13.25Z"
      stroke="#EAB308"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 8V13"
      stroke="#EAB308"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 2H15"
      stroke="#EAB308"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DiagramIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.37 22H16.63C19.17 22 20.48 20.63 20.5 18.14L20.75 9.14C20.77 6.65 19.48 5.25 16.94 5.25H7.06C4.52 5.25 3.23 6.65 3.25 9.14L3.5 18.14C3.52 20.63 4.83 22 7.37 22Z"
      stroke="#2AAE7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 5.5V4.11C8 2.95 8.95 2 10.11 2H13.89C15.05 2 16 2.95 16 4.11V5.5"
      stroke="#2AAE7A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 14H16"
      stroke="#2AAE7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 18H13"
      stroke="#2AAE7A"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ReceiptIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z"
      stroke="#9C9C9C"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z"
      stroke="#9C9C9C"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 13.01H12"
      stroke="#9C9C9C"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 9.01H12"
      stroke="#9C9C9C"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.99561 13H6.00459"
      stroke="#9C9C9C"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.99561 9H6.00459"
      stroke="#9C9C9C"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface PaymentSummary {
  total_transactions: number;
  // Supplier fields
  total_received?: number;
  received_this_month?: number;
  // Buyer fields
  total_spent?: number;
  spent_this_month?: number;
  pending_amount: number;
}

interface PaymentMethodsStatsProps {
  summary: PaymentSummary | null;
}

export default function PaymentMethodsStats({
  summary,
}: PaymentMethodsStatsProps) {
  if (!summary) {
    return (
      <div className="mb-2 sm:mb-3">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-[17px]">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="relative h-[70px] sm:h-[76px] md:h-20 lg:h-[76px] animate-pulse rounded-[11px] bg-white shadow-[0px_0px_3px_0px_rgba(24,181,34,0.25)]"
            >
              <div className="p-2 sm:p-[10px]">
                <div className="mb-2 sm:mb-[11px] h-2 sm:h-[11px] w-[40%] rounded-[2px] bg-[#E5E7EB]"></div>
                <div className="mb-1.5 sm:mb-[6px] h-4 sm:h-[18px] w-[60%] rounded-[2px] bg-[#E5E7EB]"></div>
                <div className="h-2 sm:h-[8px] w-[50%] rounded-[2px] bg-[#E5E7EB]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Determine if this is buyer or supplier based on available fields
  const isBuyer = summary.total_spent !== undefined;
  const totalAmount = isBuyer ? summary.total_spent : summary.total_received;
  const monthAmount = isBuyer
    ? summary.spent_this_month
    : summary.received_this_month;

  const stats = [
    {
      icon: EmptyWalletIcon,
      label: isBuyer ? "Total Spent" : "Total Received",
      value: `₹${(totalAmount || 0).toLocaleString("en-IN")}`,
      subtitle: "All time",
      subtitleColor: "#9C9C9C",
      iconBgColor: "#DBEAFE",
    },
    {
      icon: TimerIcon,
      label: "Pending",
      value: `₹${(summary.pending_amount || 0).toLocaleString("en-IN")}`,
      subtitle: "Processing",
      subtitleColor: "#EAB308",
      iconBgColor: "#FEF9C3",
    },
    {
      icon: DiagramIcon,
      label: "This Month",
      value: `₹${(monthAmount || 0).toLocaleString("en-IN")}`,
      subtitle: "+12% from last month",
      subtitleColor: "#2AAE7A",
      iconBgColor: "#EEFFEF",
    },
    {
      icon: ReceiptIcon,
      label: "Transactions",
      value: (summary.total_transactions || 0).toString(),
      subtitle: "Last 30 days",
      subtitleColor: "#9C9C9C",
      iconBgColor: "#F5F5F5",
    },
  ];

  return (
    <div className="mb-2 sm:mb-3">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-[17px]">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative h-[70px] sm:h-[76px] md:h-20 lg:h-[76px] overflow-hidden rounded-[11px] bg-white shadow-[0px_0px_3px_0px_rgba(24,181,34,0.25)]"
          >
            {/* Label */}
            <div className="absolute left-2 sm:left-[10px] top-3 sm:top-[15px] -translate-y-1/2 text-[10px] sm:text-[11px] md:text-xs font-medium leading-normal text-[#9C9C9C]">
              {stat.label}
            </div>

            {/* Value */}
            <div className="absolute left-2 sm:left-[10px] top-[30px] sm:top-[39px] -translate-y-1/2 text-base sm:text-[18px] md:text-xl lg:text-[18px] font-semibold leading-normal text-[#0D1B2A]">
              {stat.value}
            </div>

            {/* Subtitle */}
            <div
              className="absolute left-2 sm:left-[10px] top-[52px] sm:top-[58px] -translate-y-1/2 text-[7px] sm:text-[8px] md:text-[9px] lg:text-[8px] font-medium leading-normal"
              style={{ color: stat.subtitleColor }}
            >
              {stat.subtitle}
            </div>

            {/* Icon */}
            <div
              className="absolute right-2 sm:right-[11px] top-2 sm:top-[11px] flex h-5 w-5 sm:h-[25px] sm:w-[25px] md:h-7 md:w-7 lg:h-[25px] lg:w-[25px] items-center justify-center rounded-[100px] p-1 sm:p-[6px]"
              style={{ background: stat.iconBgColor }}
            >
              <stat.icon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
