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
    <div className="bg-white rounded-[15px] p-[23px] mb-5 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
      {/* Header with Status Badge */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-['Poppins'] font-medium text-[#0d1b2a] text-[18px] leading-normal">
          Order Status
        </h2>
        <div className="bg-[#FFCC33] flex items-center gap-[8px] px-[19px] py-[5px] rounded-[100px]">
          <Timer className="w-[17px] h-[17px] text-black" />
          <span className="font-['Poppins'] font-normal text-[15px] leading-[21px] text-black tracking-[0.5px]">
            {currentStatus}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative min-h-[400px]">
        {/* Vertical Line - Dynamic height based on number of steps */}
        {steps && steps.length > 1 && (
          <div
            className="absolute left-[20px] top-[20px] w-[2px] bg-[#e0e0e0]"
            style={{ height: `${(steps.length - 1) * 82 + 41}px` }}
          ></div>
        )}

        {/* Status Steps */}
        <div className="space-y-[41px]">
          {steps && steps.length > 0 ? (
            steps.map((step, index) => {
              const Icon = getIcon(index);

              return (
                <div key={index} className="flex items-start gap-[19px]">
                  {/* Status Icon */}
                  <div
                    className={`w-[41px] h-[41px] rounded-full flex items-center justify-center shrink-0 relative z-10 ${getIconBgColor(
                      step.status
                    )}`}
                  >
                    <Icon
                      className="w-[26px] h-[26px] text-white"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Status Content */}
                  <div className="flex-1 flex items-start justify-between pt-[6px]">
                    <div className="flex flex-col gap-[4px] max-w-[247px]">
                      <h3
                        className={`font-['Poppins'] font-medium text-[15px] leading-normal ${getTextColor(
                          step.status
                        )}`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`font-['Poppins'] font-medium text-[14px] leading-normal ${getDescriptionColor(
                          step.status
                        )}`}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Timestamp */}
                    <span
                      className={`font-['Poppins'] font-medium text-[14px] leading-normal whitespace-nowrap ml-4 ${getDescriptionColor(
                        step.status
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
