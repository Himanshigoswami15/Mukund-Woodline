import React from 'react';
import { Link } from 'react-router-dom';

/**
 * BrandLogo: Displays the official Mukund Woodline embossed emblem and typography
 * based on the official brand identity.
 */
export default function BrandLogo({
  variant = 'light', // 'light' for light backgrounds, 'dark' for dark backgrounds
  size = 'md',       // 'sm', 'md', 'lg', 'xl'
  layout = 'vertical', // 'vertical' (text downside) or 'horizontal'
  align = 'center',   // 'center' or 'start'
  showTagline = true,
  showEmblemOnly = false,
  taglineText = 'STRENGTH IN EVERY GRAIN',
  asLink = true,
  className = ''
}) {
  const sizeMap = {
    xs: { emblem: 'w-7 h-7', title: 'text-xs', subtitle: 'text-[7px] tracking-[0.18em]' },
    sm: { emblem: 'w-9 h-9', title: 'text-xs sm:text-sm', subtitle: 'text-[7.5px] tracking-[0.20em]' },
    md: { emblem: 'w-11 h-11 sm:w-12 sm:h-12', title: 'text-sm sm:text-base', subtitle: 'text-[8px] sm:text-[8.5px] tracking-[0.22em]' },
    lg: { emblem: 'w-14 h-14 sm:w-16 sm:h-16', title: 'text-lg sm:text-xl', subtitle: 'text-[9px] sm:text-[9.5px] tracking-[0.24em]' },
    xl: { emblem: 'w-20 h-20', title: 'text-2xl sm:text-3xl', subtitle: 'text-[11px] tracking-[0.26em]' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const titleColor = variant === 'dark' ? 'text-white' : 'text-[#3B2213]';
  const titleWoodlineColor = variant === 'dark' 
    ? 'text-[#E5B26E] group-hover:text-[#F3CA8A]' 
    : 'text-[#C67D3B] group-hover:text-[#A85E22]';

  const subtitleColor = variant === 'dark' ? 'text-[#E9DDCD]/90' : 'text-[#8C5835]';

  // Highlighted metallic emblem presentation with luxury gold/copper border
  const emblemNode = (
    <div className={`relative shrink-0 flex items-center justify-center rounded-xl p-1 bg-gradient-to-br from-[#3B2213] via-[#23140A] to-[#120A05] border border-[#D4AF37]/70 shadow-md shadow-[#3B2213]/25 group-hover:border-[#D4AF37] group-hover:shadow-[0_4px_16px_rgba(212,175,55,0.35)] transition-all duration-300 ${currentSize.emblem}`}>
      <img
        src="/logo-emblem.jpg"
        alt="Mukund Woodline Emblem"
        className="w-full h-full object-contain rounded-lg"
        loading="eager"
      />
    </div>
  );

  const isVertical = layout === 'vertical';
  const isStart = align === 'start';

  const textNode = !showEmblemOnly && (
    <div className={`flex flex-col min-w-0 ${isVertical ? (isStart ? 'items-start text-left mt-2' : 'items-center text-center mt-1.5') : 'items-start text-left'}`}>
      <span className={`font-brand font-bold uppercase tracking-[0.06em] leading-tight transition-colors ${titleColor} ${currentSize.title}`}>
        Mukund <span className={`${titleWoodlineColor} transition-colors duration-200`}>Woodline</span>
      </span>
      {showTagline && (
        <span className={`uppercase font-semibold mt-0.5 tracking-[0.20em] truncate flex items-center ${isStart ? 'justify-start' : 'justify-center'} gap-1 ${subtitleColor} ${currentSize.subtitle}`}>
          <span className="w-1 h-1 rounded-full bg-[#D4AF37] shrink-0" />
          {taglineText}
          {!isStart && <span className="w-1 h-1 rounded-full bg-[#D4AF37] shrink-0" />}
        </span>
      )}
    </div>
  );

  const content = (
    <div className={`flex ${isVertical ? `flex-col ${isStart ? 'items-start' : 'items-center justify-center'}` : 'items-center gap-3'} group ${className}`}>
      {emblemNode}
      {textNode}
    </div>
  );

  if (asLink) {
    return (
      <Link to="/" className="inline-block" aria-label="Mukund Woodline Home">
        {content}
      </Link>
    );
  }

  return content;
}
