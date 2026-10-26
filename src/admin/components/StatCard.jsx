import React from 'react';
import { ArrowUpRight, ArrowDownRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function StatCard({ 
  title, 
  value, 
  unit = '',
  comparison, 
  isPositive = true, 
  periodLabel = "vs previous period",
  statusType = "normal", // "normal", "warning", "danger"
  icon: Icon, 
  iconBg = "bg-[#5B3826]/10", 
  iconColor = "text-[#5B3826]",
  onClick
}) {
  const getBadgeStyle = () => {
    if (statusType === 'danger' || (!isPositive && statusType !== 'warning')) {
      return 'bg-rose-50 text-rose-700 border border-rose-200/60';
    }
    if (statusType === 'warning') {
      return 'bg-amber-50 text-amber-800 border border-amber-200/60';
    }
    return 'bg-emerald-50 text-emerald-700 border border-emerald-200/60';
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 border border-[#E9DDCD] shadow-xs hover:shadow-md hover:border-[#5B3826]/40 transition-all duration-300 flex flex-col justify-between ${
        onClick ? 'cursor-pointer group' : ''
      }`}
    >
      {/* Top Row: Title + Icon */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="text-[11px] font-bold text-[#77736D] uppercase tracking-wider block truncate">
            {title}
          </span>
          <div className="flex items-baseline gap-1.5 mt-2 flex-wrap">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#292724] tracking-tight font-sans leading-none">
              {value}
            </span>
            {unit && (
              <span className="text-xs font-semibold text-[#77736D] font-sans">
                {unit}
              </span>
            )}
          </div>
        </div>

        <div className={`w-11 h-11 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Bottom Row: Comparison Badge + Period Text */}
      <div className="mt-4 pt-3 border-t border-[#F8F6F2] flex items-center justify-between gap-2 text-xs flex-wrap">
        {comparison && (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold ${getBadgeStyle()}`}>
            {statusType === 'danger' ? (
              <AlertCircle className="w-3 h-3 text-rose-600" />
            ) : isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 text-rose-600" />
            )}
            <span>{comparison}</span>
          </span>
        )}

        <span className="text-[11px] text-[#77736D] font-medium ml-auto">
          {periodLabel}
        </span>
      </div>
    </div>
  );
}
