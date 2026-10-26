import React from 'react';
import { Link } from 'react-router-dom';

/**
 * BrandLogo: Displays the official Mukund Woodline embossed emblem and typography
 * based on the official brand identity.
 */
export default function BrandLogo({
  variant = 'light', // 'light' for light backgrounds, 'dark' for dark backgrounds
  size = 'md',       // 'sm', 'md', 'lg', 'xl'
  showTagline = true,
  showEmblemOnly = false,
  taglineText = 'STRENGTH IN EVERY GRAIN',
  asLink = true,
  className = ''
}) {
  const sizeMap = {
    xs: { img: 'w-7 h-7', title: 'text-sm', subtitle: 'text-[8px] tracking-[0.16em]' },
    sm: { img: 'w-8 h-8', title: 'text-base', subtitle: 'text-[8.5px] tracking-[0.18em]' },
    md: { img: 'w-10 h-10', title: 'text-xl sm:text-2xl', subtitle: 'text-[9.5px] tracking-[0.22em]' },
    lg: { img: 'w-12 h-12', title: 'text-2xl sm:text-3xl', subtitle: 'text-[10.5px] tracking-[0.24em]' },
    xl: { img: 'w-16 h-16', title: 'text-3xl sm:text-4xl', subtitle: 'text-[11.5px] tracking-[0.26em]' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const titleColor = variant === 'dark' ? 'text-white' : 'text-[#3B2213]';
  const subtitleColor = variant === 'dark' ? 'text-[#E9DDCD]' : 'text-[#8C5835]';

  const emblemNode = (
    <div className={`relative shrink-0 rounded-full overflow-hidden p-0.5 bg-gradient-to-br from-[#8C5835] via-[#D4AF37]/40 to-[#23140A] shadow-md shadow-black/10 group-hover:scale-105 transition-transform duration-300 ${currentSize.img}`}>
      <img
        src="/logo-circle.png"
        alt="Mukund Woodline Emblem"
        className="w-full h-full object-cover rounded-full"
        loading="eager"
      />
    </div>
  );

  const textNode = !showEmblemOnly && (
    <div className="flex flex-col min-w-0">
      <span className={`font-brand font-medium tracking-[0.02em] leading-none transition-colors ${titleColor} ${currentSize.title}`}>
        Mukund Woodline
      </span>
      {showTagline && (
        <span className={`uppercase font-medium mt-1 tracking-[0.24em] text-[9px] truncate ${subtitleColor}`}>
          {taglineText}
        </span>
      )}
    </div>
  );

  const content = (
    <div className={`flex items-center gap-2.5 group ${className}`}>
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
