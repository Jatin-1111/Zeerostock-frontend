"use client";

import { MapPin } from "lucide-react";

interface ShipmentEvent {
  date: string;
  time: string;
  event: string;
  location: string;
}

interface ShipmentEventsProps {
  events: ShipmentEvent[];
}

export default function ShipmentEvents({ events }: ShipmentEventsProps) {
  return (
    <div className="bg-white border-2 border-gray-900 rounded p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
        Detailed Shipment Events
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b-2 border-gray-900">
            <tr>
              <th className="text-left py-3 px-4 font-bold text-gray-900">
                Date/Time
              </th>
              <th className="text-left py-3 px-4 font-bold text-gray-900">
                Event
              </th>
              <th className="text-left py-3 px-4 font-bold text-gray-900">
                Location
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.map((event, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-900">
                  <div>{event.date}</div>
                  <div className="text-gray-600">{event.time}</div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">
                  {event.event}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
