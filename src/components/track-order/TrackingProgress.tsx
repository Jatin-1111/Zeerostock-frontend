"use client";

import { Check, MapPin } from "lucide-react";

interface TrackingStep {
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  completed: boolean;
}

interface TrackingProgressProps {
  steps: TrackingStep[];
}

export default function TrackingProgress({ steps }: TrackingProgressProps) {
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        Tracking Progress
      </h3>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-900 transition-all duration-500"
            style={{ width: "60%" }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4">
            {/* Icon */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.completed
                    ? "bg-gray-900 text-white"
                    : "bg-white border-2 border-gray-900 text-gray-900"
                }`}
              >
                {step.completed ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <div className="w-3 h-3 bg-gray-900 rounded-full" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div className="w-0.5 h-full bg-gray-300 mt-2" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-6">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-gray-900">{step.title}</h4>
                <span className="text-sm text-gray-600">
                  {step.date} {step.time}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{step.description}</p>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{step.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
