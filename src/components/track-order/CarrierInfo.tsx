"use client";

import { Download, Phone, Mail, ExternalLink } from "lucide-react";

interface CarrierInfoProps {
  carrier: string;
  service: string;
  trackingNumber: string;
  estimatedDelivery: string;
}

export default function CarrierInfo({
  carrier,
  service,
  trackingNumber,
  estimatedDelivery,
}: CarrierInfoProps) {
  return (
    <div className="bg-white border-2 border-gray-900 rounded p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Carrier Information
      </h3>

      <div className="space-y-4 mb-6">
        <div>
          <p className="text-sm text-gray-600 mb-1">Carrier</p>
          <p className="font-bold text-gray-900">{carrier}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Service</p>
          <p className="font-bold text-gray-900">{service}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
          <p className="font-bold text-gray-900">{trackingNumber}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
          <p className="font-bold text-gray-900">{estimatedDelivery}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button className="w-full px-4 py-2.5 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Download Invoice
        </button>
        <button className="w-full px-4 py-2.5 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" />
          Call Tracking
        </button>
        <button className="w-full px-4 py-2.5 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <ExternalLink className="w-4 h-4" />
          View Order Details
        </button>
      </div>

      {/* Need Help */}
      <div className="mt-6 pt-6 border-t-2 border-gray-900">
        <h4 className="font-bold text-gray-900 mb-3">Need help?</h4>
        <div className="space-y-2">
          <button className="w-full px-4 py-2 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors text-left flex items-center justify-between">
            <span>Ask Our Support</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <button className="w-full px-4 py-2 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors text-left flex items-center justify-between">
            <span>Call 1800-123-4567</span>
            <Phone className="w-5 h-5" />
          </button>
          <button className="w-full px-4 py-2 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors text-left flex items-center justify-between">
            <span>Email Support</span>
            <Mail className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Delivery Instructions */}
      <div className="mt-6 pt-6 border-t-2 border-gray-900">
        <h4 className="font-bold text-gray-900 mb-3">Delivery Instructions</h4>
        <div className="bg-blue-50 border-2 border-blue-200 rounded p-4">
          <p className="text-sm text-blue-900">
            Please leave the package at the front door if no one is available to
            receive it. Contact the driver if there are any issues.
          </p>
        </div>
        <button className="w-full mt-3 px-4 py-2 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
          Go to Dashboard →
        </button>
      </div>
    </div>
  );
}
