import React from "react";

interface CertificationCheckboxProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export const CertificationCheckbox: React.FC<CertificationCheckboxProps> = ({
  label,
  value,
  checked,
  onChange,
}) => {
  return (
    <label className="flex cursor-pointer items-center gap-[7.33px]">
      <div className="relative flex h-[10.67px] w-[10.67px] items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onChange(value)}
          className="peer h-[10.67px] w-[10.67px] cursor-pointer appearance-none rounded-full border border-[#e5e5e5] checked:border-[#2AAE7A] checked:bg-[#2AAE7A]"
        />
        <svg
          className="pointer-events-none absolute h-[6.67px] w-[6.67px] text-white opacity-0 peer-checked:opacity-100"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M2 6l3 3 5-5" />
        </svg>
      </div>
      <span className="text-[7.33px] text-black">{label}</span>
    </label>
  );
};
