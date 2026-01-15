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
    <div className="rounded-[7.33px] bg-white p-[11.33px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)]">
      <div className="mb-[15.33px] flex items-center gap-[5.33px]">
        <div className="h-[22.67px] w-[0.67px] bg-[#2AAE7A]"></div>
        <h2 className="text-[14px] font-medium text-[#0d1b2a]">{title}</h2>
      </div>
      {children}
    </div>
  );
};
