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
    <div className="flex items-center justify-between mb-4">
      <div className="flex flex-col">
        <h1 className="text-[20px] font-semibold text-[#0d1b2a] leading-normal">
          Welcome Back, {displayName}
        </h1>
        <p className="text-[13.5px] font-medium text-[#9c9c9c] leading-normal mt-0.75">
          Here's your procurement overview
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/buyer/rfq/post"
          className="h-[34px] px-[25px] bg-[#1e3a8a] text-white rounded-[8px] font-semibold text-[11px] hover:bg-[#1e3a8a]/90 transition-colors flex items-center gap-[6px]"
        >
          <Plus className="w-4 h-4" />
          Post New RFQ
        </Link>
        <Link
          href="/buyer/quotes"
          className="h-[34px] px-[34px] bg-white border border-[#9c9c9c] text-[#9c9c9c] rounded-[8px] font-semibold text-[11px] hover:bg-gray-50 transition-colors flex items-center gap-[6px] relative"
        >
          <MessageSquare className="w-4 h-4" />
          My Quotes
        </Link>
      </div>
    </div>
  );
}
