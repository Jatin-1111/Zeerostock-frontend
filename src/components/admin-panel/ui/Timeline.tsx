import { LucideIcon } from "lucide-react";

export interface TimelineItem {
  title: string;
  description: string;
  timestamp: string;
  icon?: LucideIcon;
  completed?: boolean;
  current?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
  variant?: "vertical" | "horizontal";
}

export default function Timeline({
  items,
  variant = "vertical",
}: TimelineProps) {
  if (variant === "horizontal") {
    return (
      <div className="flex items-center justify-between relative">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex-1">
              <div className="flex flex-col items-center relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-[14px] font-medium z-10 ${
                    item.completed
                      ? "bg-black"
                      : item.current
                      ? "bg-gray-400"
                      : "bg-gray-200"
                  }`}
                >
                  {Icon ? (
                    <Icon className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                {index < items.length - 1 && (
                  <div
                    className={`absolute top-5 left-[50%] w-full h-0.5 ${
                      items[index + 1].completed ? "bg-black" : "bg-gray-200"
                    }`}
                  />
                )}
                <p className="text-[12px] font-medium text-gray-900 mt-2 text-center">
                  {item.title}
                </p>
                <p className="text-[10px] text-gray-500 mt-1 text-center">
                  {item.timestamp}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="flex gap-4">
            <div className="relative shrink-0">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  item.completed
                    ? "bg-black text-white"
                    : item.current
                    ? "bg-gray-400 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {Icon ? (
                  <Icon className="w-6 h-6" />
                ) : (
                  <span className="text-[14px] font-medium">{index + 1}</span>
                )}
              </div>
              {index < items.length - 1 && (
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gray-200" />
              )}
            </div>
            <div className="flex-1 pt-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-semibold text-black mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <p className="text-xs text-gray-500">{item.timestamp}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
