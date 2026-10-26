import React, { useState } from 'react';

export default function ChartRevenue({ dateRange = '30d' }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Dynamic datasets based on selected date filter
  const getChartData = () => {
    if (dateRange === 'today') {
      return [
        { label: "08 AM", value: 4200 },
        { label: "10 AM", value: 16500 },
        { label: "12 PM", value: 28900 },
        { label: "02 PM", value: 45000 },
        { label: "04 PM", value: 62000 },
        { label: "06 PM", value: 78500 },
        { label: "08 PM", value: 104000 }
      ];
    }
    if (dateRange === '7d') {
      return [
        { label: "17 Oct", value: 68000 },
        { label: "18 Oct", value: 94000 },
        { label: "19 Oct", value: 82000 },
        { label: "20 Oct", value: 115000 },
        { label: "21 Oct", value: 142000 },
        { label: "22 Oct", value: 128000 },
        { label: "23 Oct", value: 172000 }
      ];
    }
    // Default 30 Days
    return [
      { label: "Week 1", value: 340000 },
      { label: "Week 2", value: 490000 },
      { label: "Week 3", value: 620000 },
      { label: "Week 4", value: 810000 },
      { label: "Current", value: 945000 }
    ];
  };

  const data = getChartData();
  const maxValue = Math.max(...data.map(d => d.value)) * 1.15;
  const minValue = 0;

  // Chart geometry
  const width = 600;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;

  const getX = (index) => paddingX + (index / (data.length - 1)) * (width - paddingX * 2);
  const getY = (value) => height - paddingY - ((value - minValue) / (maxValue - minValue)) * (height - paddingY * 2);

  // Generate SVG path points
  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ');

  // Generate smooth cubic Bézier curve
  const generateSmoothPath = () => {
    if (data.length < 2) return '';
    let d = `M ${getX(0)} ${getY(data[0].value)}`;
    for (let i = 0; i < data.length - 1; i++) {
      const x0 = getX(i);
      const y0 = getY(data[i].value);
      const x1 = getX(i + 1);
      const y1 = getY(data[i + 1].value);
      const mx = (x0 + x1) / 2;
      d += ` C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
    }
    return d;
  };

  const linePath = generateSmoothPath();
  const areaPath = `${linePath} L ${getX(data.length - 1)} ${height - paddingY} L ${getX(0)} ${height - paddingY} Z`;

  return (
    <div className="relative w-full overflow-hidden select-none">
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-auto overflow-visible"
      >
        <defs>
          <linearGradient id="walnutGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5B3826" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#5B3826" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
          const y = height - paddingY - pct * (height - paddingY * 2);
          const gridVal = Math.round(minValue + pct * (maxValue - minValue));
          return (
            <g key={i}>
              <line 
                x1={paddingX} 
                y1={y} 
                x2={width - paddingX} 
                y2={y} 
                stroke="#E9DDCD" 
                strokeDasharray="4 4" 
                strokeWidth="1" 
              />
              <text 
                x={paddingX - 8} 
                y={y + 3} 
                textAnchor="end" 
                fontSize="10" 
                fill="#77736D" 
                fontFamily="sans-serif"
              >
                ₹{gridVal >= 100000 ? `${(gridVal / 100000).toFixed(1)}L` : `${Math.round(gridVal / 1000)}k`}
              </text>
            </g>
          );
        })}

        {/* Gradient Area Fill */}
        <path d={areaPath} fill="url(#walnutGradient)" />

        {/* Main Trend Line */}
        <path 
          d={linePath} 
          fill="none" 
          stroke="#5B3826" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* Data points & hover triggers */}
        {data.map((d, i) => {
          const cx = getX(i);
          const cy = getY(d.value);
          const isHovered = hoveredPoint === i;

          return (
            <g key={i}>
              {/* Vertical Guide when hovered */}
              {isHovered && (
                <line
                  x1={cx}
                  y1={cy}
                  x2={cx}
                  y2={height - paddingY}
                  stroke="#5B3826"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              )}

              {/* Data Circle */}
              <circle
                cx={cx}
                cy={cy}
                r={isHovered ? 6 : 4}
                fill={isHovered ? "#5B3826" : "#FFFFFF"}
                stroke="#5B3826"
                strokeWidth={isHovered ? 3 : 2}
                className="transition-all duration-200"
              />

              {/* Invisible larger hover area */}
              <circle
                cx={cx}
                cy={cy}
                r={16}
                fill="transparent"
                onMouseEnter={() => setHoveredPoint(i)}
                onMouseLeave={() => setHoveredPoint(null)}
                className="cursor-pointer"
              />

              {/* X Axis Label */}
              <text
                x={cx}
                y={height - 8}
                textAnchor="middle"
                fontSize="10"
                fill="#77736D"
                fontFamily="sans-serif"
                fontWeight="500"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Hover Tooltip */}
      {hoveredPoint !== null && (
        <div 
          className="absolute pointer-events-none bg-[#292724] text-white text-xs px-3 py-1.5 rounded-lg shadow-lg -translate-x-1/2 -translate-y-full transition-all duration-150"
          style={{
            left: `${(getX(hoveredPoint) / width) * 100}%`,
            top: `${(getY(data[hoveredPoint].value) / height) * 100 - 8}%`
          }}
        >
          <div className="font-semibold">{data[hoveredPoint].label}</div>
          <div className="text-[#E9DDCD] font-bold">
            ₹{data[hoveredPoint].value.toLocaleString('en-IN')}
          </div>
        </div>
      )}
    </div>
  );
}
