import React from 'react';
import { useAdmin } from '../context/AdminContext';

export default function ChartOrderStatus() {
  const { adminOrders } = useAdmin();

  // Aggregate orders by status
  const statusCounts = adminOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const total = adminOrders.length || 1;

  const statusConfigs = [
    { key: "Confirmed", label: "Confirmed", color: "#5B3826", bg: "bg-[#5B3826]" },
    { key: "In Production", label: "In Production", color: "#C78426", bg: "bg-[#C78426]" },
    { key: "Dispatched", label: "Dispatched", color: "#4E7A58", bg: "bg-[#4E7A58]" },
    { key: "Delivered", label: "Delivered", color: "#2E5C38", bg: "bg-[#2E5C38]" },
    { key: "Pending", label: "Pending", color: "#B8433E", bg: "bg-[#B8433E]" }
  ];

  // Calculate SVG circular stroke segments
  const size = 180;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2">
      {/* Donut SVG */}
      <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Base background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#F8F6F2"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {statusConfigs.map((cfg) => {
            const count = statusCounts[cfg.key] || 0;
            const percentage = count / total;
            const strokeDasharray = `${percentage * circumference} ${circumference}`;
            const strokeDashoffset = -cumulativeOffset * circumference;
            cumulativeOffset += percentage;

            if (count === 0) return null;

            return (
              <circle
                key={cfg.key}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={cfg.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                fill="none"
                className="transition-all duration-500 hover:opacity-85"
              />
            );
          })}
        </svg>

        {/* Center count info */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="font-serif text-2xl font-bold text-[#292724] leading-none">
            {total}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-[#77736D] mt-0.5">
            Total Orders
          </span>
        </div>
      </div>

      {/* Legend & Breakdown */}
      <div className="flex-1 w-full space-y-2.5 text-xs">
        {statusConfigs.map((cfg) => {
          const count = statusCounts[cfg.key] || 0;
          const percentage = Math.round((count / total) * 100);

          return (
            <div key={cfg.key} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${cfg.bg}`} />
                <span className="text-[#292724] font-medium">{cfg.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#77736D] font-mono text-[11px]">{count} orders</span>
                <span className="font-bold text-[#292724] min-w-[36px] text-right">{percentage}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
