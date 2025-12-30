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
  total_spent: number;
  pending_amount: number;
  spent_this_month: number;
}

interface BuyerPaymentMethodsStatsProps {
  summary: PaymentSummary | null;
}

export default function BuyerPaymentMethodsStats({
  summary,
}: BuyerPaymentMethodsStatsProps) {
  if (!summary) {
    return (
      <div
        style={{
          transform: "scale(0.75)",
          transformOrigin: "top left",
          width: "133.33%",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "30px",
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                background: "white",
                borderRadius: "20px",
                boxShadow: "0px 0px 4px 0px rgba(24,181,34,0.25)",
                height: "135px",
                position: "relative",
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            >
              <div style={{ padding: "17px" }}>
                <div
                  style={{
                    height: "20px",
                    background: "#E5E7EB",
                    borderRadius: "4px",
                    width: "40%",
                    marginBottom: "20px",
                  }}
                ></div>
                <div
                  style={{
                    height: "32px",
                    background: "#E5E7EB",
                    borderRadius: "4px",
                    width: "60%",
                    marginBottom: "10px",
                  }}
                ></div>
                <div
                  style={{
                    height: "14px",
                    background: "#E5E7EB",
                    borderRadius: "4px",
                    width: "50%",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: EmptyWalletIcon,
      label: "Total Spent",
      value: `₹${(summary.total_spent || 0).toLocaleString("en-IN")}`,
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
      value: `₹${(summary.spent_this_month || 0).toLocaleString("en-IN")}`,
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
    <div
      style={{
        transform: "scale(0.75)",
        transformOrigin: "top left",
        width: "133.33%",
        marginBottom: "24px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "30px",
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              background: "white",
              borderRadius: "20px",
              boxShadow: "0px 0px 4px 0px rgba(24,181,34,0.25)",
              height: "135px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Label */}
            <div
              style={{
                position: "absolute",
                left: "17px",
                top: "27px",
                transform: "translateY(-50%)",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "20px",
                color: "#9C9C9C",
                lineHeight: "normal",
              }}
            >
              {stat.label}
            </div>

            {/* Value */}
            <div
              style={{
                position: "absolute",
                left: "17px",
                top: "69px",
                transform: "translateY(-50%)",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "32px",
                color: "#0D1B2A",
                lineHeight: "normal",
              }}
            >
              {stat.value}
            </div>

            {/* Subtitle */}
            <div
              style={{
                position: "absolute",
                left: "17px",
                top: "102.5px",
                transform: "translateY(-50%)",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                color: stat.subtitleColor,
                lineHeight: "normal",
              }}
            >
              {stat.subtitle}
            </div>

            {/* Icon */}
            <div
              style={{
                position: "absolute",
                right: "20px",
                top: "20px",
                background: stat.iconBgColor,
                borderRadius: "100px",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "44px",
                height: "44px",
              }}
            >
              <stat.icon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
