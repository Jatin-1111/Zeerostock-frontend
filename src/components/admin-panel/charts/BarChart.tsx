interface BarChartProps {
  data: {
    label: string;
    value: number;
    maxValue?: number;
  }[];
  orientation?: "horizontal" | "vertical";
  color?: string;
  height?: number;
  showValues?: boolean;
}

export default function BarChart({
  data,
  orientation = "vertical",
  color = "#000000",
  height = 200,
  showValues = false,
}: BarChartProps) {
  const maxValue =
    data[0]?.maxValue || Math.max(...data.map((item) => item.value));

  if (orientation === "horizontal") {
    return (
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-900">{item.label}</span>
              {showValues && (
                <span className="text-sm text-gray-500">{item.value}</span>
              )}
            </div>
            <div className="w-full bg-gray-200 h-6">
              <div
                className="h-6 transition-all duration-300"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-end justify-between gap-2" style={{ height }}>
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div className="w-full flex flex-col justify-end" style={{ height }}>
            <div
              className="w-full transition-all duration-300"
              style={{
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor: color,
              }}
            />
          </div>
          <span className="text-xs text-gray-500 mt-2 text-center">
            {item.label}
          </span>
          {showValues && (
            <span className="text-xs text-gray-900 mt-1">{item.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}
