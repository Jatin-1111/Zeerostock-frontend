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
      <label className="mb-[6px] block text-xs font-medium text-[#0d1b2a]">
        {label}
        {required && "*"}
      </label>
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        className="h-[28px] w-full rounded-[4px] border border-[#e5e5e5] px-[8px] text-left text-xs text-black focus:border-[#2AAE7A] focus:outline-none focus:ring-1 focus:ring-[#2AAE7A] flex items-center justify-between disabled:bg-gray-50"
      >
        <span className={!value ? "text-[#9c9c9c]" : ""}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="h-[9.33px] w-[9.33px] text-[#9c9c9c]" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6.67 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6.67 }}
            className="absolute z-50 mt-[2.67px] max-h-[100px] w-full overflow-y-auto rounded-[4px] border border-[#e5e5e5] bg-white shadow-lg"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onSelect(name, option.value)}
                className="w-full px-[8px] py-[5.33px] text-left text-xs text-black hover:bg-[#f0fdf4]"
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {error && (
        <p className="mt-[2.67px] text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};
