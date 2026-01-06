"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  label: string;
  name: string;
  value: string;
  options: DropdownOption[];
  onSelect: (name: string, value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  isOpen: boolean;
  onToggle: () => void;
  disabled?: boolean;
  className?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  name,
  value,
  options,
  onSelect,
  placeholder = "Select option",
  required = false,
  error,
  isOpen,
  onToggle,
  disabled = false,
  className = "",
}) => {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`custom-dropdown relative ${className}`}>
      <label className="mb-[9px] block text-[12px] font-medium text-[#0d1b2a]">
        {label}
        {required && "*"}
      </label>
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        className="h-[42px] w-full rounded-[6px] border border-[#e5e5e5] px-[12px] text-left text-[11px] text-black focus:border-[#2AAE7A] focus:outline-none focus:ring-1 focus:ring-[#2AAE7A] flex items-center justify-between disabled:bg-gray-50"
      >
        <span className={!value ? "text-[#9c9c9c]" : ""}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="h-[14px] w-[14px] text-[#9c9c9c]" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-[4px] max-h-[150px] w-full overflow-y-auto rounded-[6px] border border-[#e5e5e5] bg-white shadow-lg"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onSelect(name, option.value)}
                className="w-full px-[12px] py-[8px] text-left text-[11px] text-black hover:bg-[#f0fdf4]"
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {error && <p className="mt-[4px] text-[10px] text-red-500">{error}</p>}
    </div>
  );
};
