"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import BuyerSidebarContent from "./BuyerSidebarContent";

interface BuyerSidebarProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export default function BuyerSidebar({
  isOpen: externalIsOpen,
  onToggle,
}: BuyerSidebarProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleToggle = () => {
    const newState = !isOpen;
    if (onToggle) {
      onToggle(newState);
    } else {
      setInternalIsOpen(newState);
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div className="w-[220px] h-full bg-white shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)] overflow-y-auto flex-shrink-0">
        {/* Header */}
        <div className="h-[40px] flex items-center justify-center border-b border-[#8b8b8b]">
          <h2 className="font-medium text-sm text-[#1e3a8a] leading-normal">
            Buyer Menu
          </h2>
        </div>

        {/* Sidebar Content */}
        <BuyerSidebarContent />
      </div>
    </>
  );
}
