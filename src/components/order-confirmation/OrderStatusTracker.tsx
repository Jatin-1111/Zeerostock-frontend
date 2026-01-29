import { Check, Lock, Timer, Truck, Home } from "lucide-react";

interface StatusStep {
  title: string;
  description: string;
  timestamp: string;
  status: "completed" | "current" | "pending";
}

interface OrderStatusTrackerProps {
  steps: StatusStep[];
  currentStatus?: string;
}

export default function OrderStatusTracker({
  steps,
  currentStatus = "Processing",
}: OrderStatusTrackerProps) {
  // Icon mapping for each step
  const getIcon = (index: number) => {
    const icons = [Check, Lock, Timer, Truck, Home];
    return icons[index] || Check;
  };

  // Get icon background color based on status
  const getIconBgColor = (status: string) => {
    if (status === "completed") return "bg-[#2AAE7A]";
    if (status === "current") return "bg-[#FFCC33]";
    return "bg-[#F4F4F4]";
  };

  // Get text color based on status
  const getTextColor = (status: string) => {
    if (status === "pending") return "text-[#cdcdcd]";
    return "text-[#0d1b2a]";
  };

  const getDescriptionColor = (status: string) => {
    if (status === "pending") return "text-[#cdcdcd]";
    return "text-[#9c9c9c]";
  };

  return (
    <div className="bg-white rounded-[15px] p-4 sm:p-5 md:p-[23px] lg:p-[15px] mb-4 sm:mb-5 lg:mb-3 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
      {/* Header with Status Badge */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 lg:mb-5">
        <h2 className="font-medium text-[#0d1b2a] text-base sm:text-lg md:text-[18px] lg:text-[12px] leading-normal">
          Order Status
        </h2>
        <div className="bg-[#FFCC33] flex items-center gap-2 sm:gap-[8px] lg:gap-[5px] px-3 sm:px-[19px] lg:px-[13px] py-1 sm:py-[5px] lg:py-[3px] rounded-[100px]">
          <Timer className="w-4 h-4 sm:w-[17px] sm:h-[17px] lg:w-[11px] lg:h-[11px] text-black" />
          <span className="font-normal text-sm sm:text-[15px] lg:text-[10px] leading-[21px] text-black tracking-[0.5px]">
            {currentStatus}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-[267px]">
        {/* Vertical Line - Dynamic height based on number of steps */}
        {steps && steps.length > 1 && (
          <>
            {/* Mobile/Tablet line */}
            <div
              className="absolute left-3 top-3 w-[2px] bg-[#e0e0e0] sm:hidden"
              style={{ height: `calc(100% - 3.5rem)` }}
            ></div>
            {/* Small screens line */}
            <div
              className="hidden sm:block lg:hidden absolute left-[20px] top-[20px] w-[2px] bg-[#e0e0e0]"
              style={{ height: `${(steps.length - 1) * 82 + 41}px` }}
            ></div>
            {/* Desktop line (scaled down by 33.33%) */}
            <div
              className="hidden lg:block absolute left-[13px] top-[13px] w-[2px] bg-[#e0e0e0]"
              style={{ height: `${(steps.length - 1) * 55 + 27}px` }}
            ></div>
          </>
        )}

        {/* Status Steps */}
        <div className="space-y-6 sm:space-y-[41px] lg:space-y-[27px]">
          {steps && steps.length > 0 ? (
            steps.map((step, index) => {
              const Icon = getIcon(index);

              return (
                <div
                  key={index}
                  className="flex items-start gap-3 sm:gap-[19px] lg:gap-[13px]"
                >
                  {/* Status Icon */}
                  <div
                    className={`w-8 h-8 sm:w-[41px] sm:h-[41px] lg:w-[27px] lg:h-[27px] rounded-full flex items-center justify-center shrink-0 relative z-10 ${getIconBgColor(
                      step.status,
                    )}`}
                  >
                    <Icon
                      className="w-5 h-5 sm:w-[26px] sm:h-[26px] lg:w-[17px] lg:h-[17px] text-white"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Status Content */}
                  <div className="flex-1 flex flex-col sm:flex-row items-start justify-between pt-1 sm:pt-[6px] lg:pt-[4px]">
                    <div className="flex flex-col gap-1 sm:gap-[4px] lg:gap-[3px] max-w-full sm:max-w-[247px] lg:max-w-[165px]">
                      <h3
                        className={`font-medium text-sm sm:text-[15px] lg:text-[10px] leading-normal ${getTextColor(
                          step.status,
                        )}`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`font-medium text-xs sm:text-[14px] lg:text-[9px] leading-normal ${getDescriptionColor(
                          step.status,
                        )}`}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Timestamp */}
                    <span
                      className={`font-medium text-xs sm:text-[14px] lg:text-[9px] leading-normal whitespace-nowrap ml-2 sm:ml-4 lg:ml-3 mt-1 sm:mt-0 ${getDescriptionColor(
                        step.status,
                      )}`}
                    >
                      {step.timestamp}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-gray-500">No status steps available</div>
          )}
        </div>
      </div>
    </div>
  );
}
