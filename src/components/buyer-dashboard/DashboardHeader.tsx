"use client";

import Link from "next/link";
import { Plus, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardHeaderProps {
  userName?: string;
}

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
  const [displayName, setDisplayName] = useState("there");

  useEffect(() => {
    console.log("DashboardHeader received userName:", userName);

    if (userName && userName.trim()) {
      setDisplayName(userName);
    } else {
      // Try to get from localStorage as fallback
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          const name =
            user.firstName || user.first_name || user.name || "there";
          console.log("Using localStorage name:", name);
          setDisplayName(name);
        } catch (e) {
          console.error("Failed to parse user data");
        }
      }
    }
  }, [userName]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
      <div className="flex flex-col">
        <h1 className="text-[16px] sm:text-[18px] md:text-[20px] font-semibold text-[#0d1b2a] leading-normal">
          Welcome Back, {displayName}
        </h1>
        <p className="text-[12px] sm:text-[13px] md:text-[13.5px] font-medium text-[#9c9c9c] leading-normal mt-0.5 sm:mt-0.75">
          Here's your procurement overview
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
        <Link
          href="/buyer/rfq/post"
          className="h-[32px] sm:h-[34px] px-[20px] sm:px-[25px] bg-[#1e3a8a] text-white rounded-[8px] font-semibold text-[10px] sm:text-[11px] hover:bg-[#1e3a8a]/90 transition-colors flex items-center gap-[6px]"
        >
          <Plus className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          Post New RFQ
        </Link>
        <Link
          href="/buyer/quotes"
          className="h-[32px] sm:h-[34px] px-[28px] sm:px-[34px] bg-white border border-[#9c9c9c] text-[#9c9c9c] rounded-[8px] font-semibold text-[10px] sm:text-[11px] hover:bg-gray-50 transition-colors flex items-center gap-[6px] relative"
        >
          <MessageSquare className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          My Quotes
        </Link>
      </div>
    </div>
  );
}
