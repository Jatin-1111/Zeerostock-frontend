interface LineChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      color: string;
    }[];
  };
  height?: number;
  showLegend?: boolean;
}

export default function LineChart({
  data,
  height = 250,
  showLegend = true,
}: LineChartProps) {
  const maxValue = Math.max(
    ...data.datasets.flatMap((dataset) => dataset.data)
  );
  const minValue = Math.min(
    ...data.datasets.flatMap((dataset) => dataset.data)
  );
  const range = maxValue - minValue;

  const getY = (value: number) => {
    return height - ((value - minValue) / range) * (height - 40);
  };

  const getX = (index: number) => {
    return (index / (data.labels.length - 1)) * 100;
  };

  return (
    <div>
      {showLegend && (
        <div className="flex gap-4 mb-4">
          {data.datasets.map((dataset, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: dataset.color }}
              />
              <span className="text-[12px] text-gray-600">{dataset.label}</span>
            </div>
          ))}
        </div>
      )}
      <svg width="100%" height={height} className="overflow-visible">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y * 2}
            x2="100%"
            y2={y * 2}
            stroke="#f0f0f0"
            strokeWidth="1"
          />
        ))}

        {/* Data lines */}
        {data.datasets.map((dataset, datasetIndex) => {
          const points = dataset.data
            .map((value, index) => `${getX(index)}%,${getY(value)}`)
            .join(" ");

          return (
            <g key={datasetIndex}>
              <polyline
                points={points}
                fill="none"
                stroke={dataset.color}
                strokeWidth="2"
              />
              {/* Data points */}
              {dataset.data.map((value, index) => (
                <circle
                  key={index}
                  cx={`${getX(index)}%`}
                  cy={getY(value)}
                  r="4"
                  fill={dataset.color}
                />
              ))}
            </g>
          );
        })}

        {/* X-axis labels */}
        {data.labels.map((label, index) => (
          <text
            key={index}
            x={`${getX(index)}%`}
            y={height + 15}
            textAnchor="middle"
            className="text-[10px] fill-gray-500"
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}
