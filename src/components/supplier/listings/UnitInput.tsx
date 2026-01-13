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
      <div className="flex gap-1">
        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-7 w-full rounded border border-border-light px-2 text-xs text-black placeholder:text-muted focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
        />
        <button
          type="button"
          onClick={onToggle}
          className="flex h-7 items-center justify-between rounded border border-border-light px-1.5 text-xs text-black hover:border-secondary focus:outline-none"
          style={{ width: unitWidth }}
        >
          <span>{unitValue}</span>
          <ChevronDown className="h-2.5 w-2.5 text-muted" />
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
