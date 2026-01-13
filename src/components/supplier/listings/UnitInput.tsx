"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UnitInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  unitName: string;
  unitValue: string;
  unitOptions: string[];
  onUnitSelect: (name: string, value: string) => void;
  required?: boolean;
  isOpen: boolean;
  onToggle: () => void;
  unitWidth?: string;
}

export const UnitInput: React.FC<UnitInputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder = "Value",
  unitName,
  unitValue,
  unitOptions,
  onUnitSelect,
  required = false,
  isOpen,
  onToggle,
  unitWidth = "70px",
}) => {
  return (
    <div className="custom-dropdown relative">
      <label className="mb-[6px] block text-xs font-medium text-[#0d1b2a]">
        {label}
        {required && "*"}
      </label>
      <div className="flex gap-[2.67px]">
        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-[28px] w-full rounded-[4px] border border-[#e5e5e5] px-[8px] text-xs text-black placeholder:text-[#9c9c9c] focus:border-[#2AAE7A] focus:outline-none focus:ring-1 focus:ring-[#2AAE7A]"
        />
        <button
          type="button"
          onClick={onToggle}
          className="flex h-[28px] items-center justify-between rounded-[4px] border border-[#e5e5e5] px-[5.33px] text-xs text-black hover:border-[#2AAE7A] focus:outline-none"
          style={{ width: unitWidth }}
        >
          <span>{unitValue}</span>
          <ChevronDown className="h-[9.33px] w-[9.33px] text-[#9c9c9c]" />
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6.67 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6.67 }}
            className="absolute right-0 z-50 mt-[2.67px] overflow-y-auto rounded-[4px] border border-[#e5e5e5] bg-white shadow-lg"
            style={{ width: unitWidth }}
          >
            {unitOptions.map((unit) => (
              <button
                key={unit}
                type="button"
                onClick={() => onUnitSelect(unitName, unit)}
                className="w-full px-[8px] py-[5.33px] text-left text-xs text-black hover:bg-[#f0fdf4]"
              >
                {unit}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
