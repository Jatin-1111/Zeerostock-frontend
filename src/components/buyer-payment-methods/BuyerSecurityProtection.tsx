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
    <div className="bg-white rounded-[15px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] relative">
      <div className="px-[26.25px] pt-[26.25px] pb-[15px]">
        <h3 className="text-[19.5px] font-semibold text-[#0d1b2a] leading-[18px]">
          Security & Protection
        </h3>
      </div>
      <div className="px-[37.5px] pb-[37.5px] pt-[22.5px]">
        <div className="grid grid-cols-3 gap-[30px]">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-[60px] h-[60px] bg-[#eeffef] rounded-[15px] flex items-center justify-center mb-[15px]">
                <feature.icon className="w-[30px] h-[30px] text-[#2aae7a]" />
              </div>
              <h4 className="text-[15px] font-semibold text-[#0d1b2a] mb-[7.5px]">
                {feature.title}
              </h4>
              <p className="text-[12px] text-[#9c9c9c] leading-[16.8px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
