import React from "react";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
}) => {
  return (
    <div className="rounded-[11px] bg-white p-[17px] shadow-[0px_0px_4.5px_0px_rgba(0,0,0,0.25)]">
      <div className="mb-[23px] flex items-center gap-[8px]">
        <div className="h-[34px] w-[1px] bg-[#2AAE7A]"></div>
        <h2 className="text-[21px] font-medium text-[#0d1b2a]">{title}</h2>
      </div>
      {children}
    </div>
  );
};
