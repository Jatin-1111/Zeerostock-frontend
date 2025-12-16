interface ProgressBarProps {
  percentage: number;
  color?: string;
  height?: string;
}

export default function ProgressBar({
  percentage,
  color = "bg-gray-900",
  height = "h-2",
}: ProgressBarProps) {
  return (
    <div className={`w-full bg-gray-200 ${height} overflow-hidden`}>
      <div
        className={`${color} ${height} transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
