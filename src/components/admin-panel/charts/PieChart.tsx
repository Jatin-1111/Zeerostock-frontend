interface PieChartProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
  size?: number;
  showLegend?: boolean;
}

export default function PieChart({
  data,
  size = 200,
  showLegend = true,
}: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const slices = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = data
      .slice(0, index)
      .reduce((sum, d) => sum + (d.value / total) * 360, -90);
    const endAngle = startAngle + angle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const radius = size / 2;
    const x1 = radius + radius * Math.cos(startRad);
    const y1 = radius + radius * Math.sin(startRad);
    const x2 = radius + radius * Math.cos(endRad);
    const y2 = radius + radius * Math.sin(endRad);
    const largeArc = angle > 180 ? 1 : 0;

    return {
      ...item,
      percentage,
      path: `M ${radius} ${radius} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`,
    };
  });

  return (
    <div className="flex items-center gap-8">
      <svg width={size} height={size}>
        {slices.map((slice, index) => (
          <path key={index} d={slice.path} fill={slice.color} />
        ))}
      </svg>
      {showLegend && (
        <div className="space-y-2">
          {slices.map((slice, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: slice.color }}
              />
              <span className="text-[12px] text-gray-900">{slice.label}</span>
              <span className="text-[12px] text-gray-500">
                {slice.percentage.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
