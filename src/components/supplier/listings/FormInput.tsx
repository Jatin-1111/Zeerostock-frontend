import React from "react";

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  type?: "text" | "number" | "date";
  required?: boolean;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  error,
  multiline = false,
  rows = 4,
}) => {
  const inputClasses =
    "h-[42px] w-full rounded-[6px] border border-[#e5e5e5] px-[12px] text-[11px] text-black placeholder:text-[#9c9c9c] focus:border-[#2AAE7A] focus:outline-none focus:ring-1 focus:ring-[#2AAE7A]";

  const textareaClasses =
    "w-full resize-none rounded-[6px] border border-[#e5e5e5] px-[12px] py-[12px] text-[11px] text-black placeholder:text-[#9c9c9c] focus:border-[#2AAE7A] focus:outline-none focus:ring-1 focus:ring-[#2AAE7A]";

  return (
    <div>
      <label className="mb-[9px] block text-[12px] font-medium text-[#0d1b2a]">
        {label}
        {required && "*"}
      </label>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={textareaClasses}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          step={type === "number" ? "0.01" : undefined}
          className={inputClasses}
        />
      )}
      {error && <p className="mt-[4px] text-[10px] text-red-500">{error}</p>}
    </div>
  );
};
