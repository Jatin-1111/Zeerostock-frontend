"use client";

import { BarChart3 } from "lucide-react";

export default function VolumeChart() {
  const bars = [
    { lightHeight: "30%", darkHeight: "35%" },
    { lightHeight: "50%", darkHeight: "55%" },
    { lightHeight: "70%", darkHeight: "75%" },
    { lightHeight: "80%", darkHeight: "85%" },
    { lightHeight: "75%", darkHeight: "80%" },
  ];

  return (
    <div className="bg-white border-2 border-gray-900 p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-gray-900" />
        <h3 className="text-lg font-bold text-gray-900">
          Volume Trends (Last 6 Months)
        </h3>
      </div>

      <div className="flex items-end justify-start gap-6 h-64 px-4 border-l-2 border-b-2 border-gray-900">
        {bars.map((bar, index) => (
          <div key={index} className="flex items-end gap-2 h-full">
            <div className="flex flex-col justify-end h-full w-12">
              <div
                className="w-full bg-gray-300"
                style={{ height: bar.lightHeight }}
              ></div>
            </div>
            <div className="flex flex-col justify-end h-full w-12">
              <div
                className="w-full bg-gray-600"
                style={{ height: bar.darkHeight }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
