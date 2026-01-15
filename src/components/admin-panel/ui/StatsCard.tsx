import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  change?: string;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  change,
}: StatsCardProps) {
  return (
    <div className="bg-white border border-gray-200 p-4 relative">
      <div className="flex justify-between items-start mb-3">
        <span className="text-[12px] font-medium text-black">{title}</span>
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
      <div className="text-[24px] font-bold text-black mb-1">{value}</div>
      {change && (
        <div className="text-[12px] text-green-600 mb-2">{change}</div>
      )}
      {subtitle && (
        <div className="text-[10px] text-gray-500 whitespace-pre-line">
          {subtitle}
        </div>
      )}
    </div>
  );
}
