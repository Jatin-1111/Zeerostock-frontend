"use client";

import { Shield, Lock, Eye } from "lucide-react";

export default function BuyerSecurityProtection() {
  const features = [
    {
      icon: Shield,
      title: "Secure Payments",
      description:
        "All transactions are encrypted and processed through secure payment gateways",
    },
    {
      icon: Lock,
      title: "Data Protection",
      description:
        "Your payment information is never stored on our servers and is handled by certified payment processors",
    },
    {
      icon: Eye,
      title: "Fraud Detection",
      description:
        "Advanced fraud detection systems monitor all transactions for suspicious activity",
    },
  ];

  return (
    <div className="bg-white rounded-[8px] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)] relative">
      <div className="px-[15px] pt-[15px] pb-[8px]">
        <h3 className="text-[11px] font-semibold text-[#0d1b2a] leading-[10px]">
          Security & Protection
        </h3>
      </div>
      <div className="px-[21px] pb-[21px] pt-[13px]">
        <div className="grid grid-cols-3 gap-[17px]">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-[34px] h-[34px] bg-[#eeffef] rounded-[8px] flex items-center justify-center mb-[8px]">
                <feature.icon
                  className="w-[17px] h-[17px] text-[#2aae7a]"
                  strokeWidth={2}
                />
              </div>
              <h4 className="text-[8px] font-semibold text-[#0d1b2a] mb-[5px]">
                {feature.title}
              </h4>
              <p className="text-[7px] text-[#9c9c9c] leading-[10px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
