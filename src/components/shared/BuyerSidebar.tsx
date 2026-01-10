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
      {/* Mobile menu button */}
      <button
        onClick={handleToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-300 rounded"
      >
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 left-0 min-h-screen w-[220px] bg-white shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)] transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 overflow-y-auto lg:top-[73px]`}
      >
        {/* Header */}
        <div className="h-[40px] flex items-center justify-center border-b border-[#8b8b8b] relative">
          <h2 className="font-medium text-[13px] text-[#1e3a8a] leading-normal">
            Buyer Menu
          </h2>
          <button
            className="absolute right-[14px] w-[14px] h-[14px]"
            onClick={handleToggle}
          >
            <ArrowLeft className="w-[14px] h-[14px] text-[#1e3a8a]" />
          </button>
        </div>

        {/* Sidebar Content */}
        <BuyerSidebarContent />
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/80 bg-opacity-50 z-30"
          onClick={handleToggle}
        />
      )}
    </>
  );
}
