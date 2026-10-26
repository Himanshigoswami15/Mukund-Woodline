import React, { useState } from 'react';

export default function ChartOrders({ dateRange = '30d' }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const getOrdersData = () => {
    if (dateRange === 'today') {
      return [
        { label: "08 AM", orders: 2 },
        { label: "10 AM", orders: 5 },
        { label: "12 PM", orders: 8 },
        { label: "02 PM", orders: 6 },
        { label: "04 PM", orders: 9 },
        { label: "06 PM", orders: 12 },
        { label: "08 PM", orders: 7 }
      ];
    }
    if (dateRange === '7d') {
      return [
        { label: "Sat", orders: 14 },
        { label: "Sun", orders: 22 },
        { label: "Mon", orders: 11 },
        { label: "Tue", orders: 16 },
        { label: "Wed", orders: 19 },
        { label: "Thu", orders: 15 },
        { label: "Fri", orders: 24 }
      ];
    }
    return [
      { label: "Oct 01-07", orders: 68 },
      { label: "Oct 08-14", orders: 92 },
      { label: "Oct 15-21", orders: 114 },
      { label: "Oct 22-28", orders: 138 }
    ];
  };

  const data = getOrdersData();
  const maxOrders = Math.max(...data.map(d => d.orders)) * 1.25;

  const width = 500;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;

  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;
  const barWidth = Math.min(36, (chartWidth / data.length) * 0.55);

  return (
    <div className="relative w-full overflow-hidden select-none">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        {/* Horizontal grid lines */}
        {[0, 0.5, 1].map((pct, i) => {
          const y = height - paddingY - pct * chartHeight;
          const val = Math.round(pct * maxOrders);
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
                {val}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const slotWidth = chartWidth / data.length;
          const x = paddingX + i * slotWidth + (slotWidth - barWidth) / 2;
          const barHeight = (d.orders / maxOrders) * chartHeight;
          const y = height - paddingY - barHeight;
          const isHovered = hoveredIdx === i;

          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={6}
                fill={isHovered ? "#5B3826" : "#B4845C"}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              />

              {/* Top value indicator when hovered */}
              {isHovered && (
                <text
                  x={x + barWidth / 2}
                  y={y - 6}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="bold"
                  fill="#5B3826"
                >
                  {d.orders}
                </text>
              )}

              {/* X label */}
              <text
                x={x + barWidth / 2}
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
    </div>
  );
}
