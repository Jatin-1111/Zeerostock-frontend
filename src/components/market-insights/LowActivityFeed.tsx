"use client";

import { Activity } from "lucide-react";

export default function LowActivityFeed() {
  const activities = [
    {
      title: "New listing: Electronics components",
      time: "2 mins ago",
      price: "85k",
    },
    {
      title: "Deal closed: Automotive Parts",
      time: "2 mins ago",
      price: "85k",
    },
    {
      title: "RFQ posted: Machinery Equipment",
      time: "2 mins ago",
      price: "85k",
    },
    {
      title: "Auction started: Textile Materials",
      time: "2 mins ago",
      price: "85k",
    },
    {
      title: "Deal closed: Industrial Equipment",
      time: "2 mins ago",
      price: "85k",
    },
  ];

  return (
    <div className="bg-white border-2 border-gray-900 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-gray-900" />
        <h3 className="text-lg font-bold text-gray-900">Live Activity Feed</h3>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-gray-300"
          >
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">
                {activity.title}
              </p>
              <p className="text-xs text-gray-600">{activity.time}</p>
            </div>
            <span className="text-sm font-bold text-gray-900">
              {activity.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
