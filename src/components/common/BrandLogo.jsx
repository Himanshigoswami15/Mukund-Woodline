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
  // Select appropriate graphic based on variant and layout mode
  const emblemImg = variant === 'dark' 
    ? '/logo-emblem-dark.png' 
    : '/logo-emblem-transparent.png';

  const badgeImg = variant === 'dark'
    ? '/logo-badge-dark.png'
    : '/logo-badge-transparent.png';

  const sizeMap = {
    xs: { emblem: 'w-8 h-8', title: 'text-base', subtitle: 'text-[8.5px] tracking-[0.18em]' },
    sm: { emblem: 'w-10 h-10', title: 'text-lg sm:text-xl', subtitle: 'text-[9px] tracking-[0.20em]' },
    md: { emblem: 'w-12 h-12', title: 'text-xl sm:text-2xl', subtitle: 'text-[10px] tracking-[0.24em]' },
    lg: { emblem: 'w-16 h-16', title: 'text-2xl sm:text-3xl', subtitle: 'text-[11px] tracking-[0.26em]' },
    xl: { emblem: 'w-20 h-20', title: 'text-3xl sm:text-4xl', subtitle: 'text-[12px] tracking-[0.28em]' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const titleColor = variant === 'dark' ? 'text-white' : 'text-[#3B2213]';
  const titleWoodlineColor = variant === 'dark' 
    ? 'text-[#E5B26E] group-hover:text-[#F3CA8A]' 
    : 'text-[#C67D3B] group-hover:text-[#A85E22]';

  const subtitleColor = variant === 'dark' ? 'text-[#E9DDCD]/90' : 'text-[#8C5835]';

  // Highlighted metallic emblem presentation with luxury gold/copper border
  const emblemNode = (
    <div className={`relative shrink-0 flex items-center justify-center rounded-xl p-1 bg-gradient-to-br from-[#3B2213] via-[#23140A] to-[#120A05] border border-[#D4AF37]/70 shadow-md shadow-[#3B2213]/25 group-hover:border-[#D4AF37] group-hover:shadow-[0_4px_16px_rgba(212,175,55,0.3)] transition-all duration-300 ${currentSize.emblem}`}>
      <img
        src="/logo-emblem.jpg"
        alt="Mukund Woodline Emblem"
        className="w-full h-full object-contain rounded-lg"
        loading="eager"
      />
    </div>
  );

  const textNode = !showEmblemOnly && (
    <div className="flex flex-col min-w-0">
      <span className={`font-brand font-bold tracking-[0.02em] leading-none transition-colors ${titleColor} ${currentSize.title}`}>
        Mukund <span className={`${titleWoodlineColor} transition-colors duration-200`}>Woodline</span>
      </span>
      {showTagline && (
        <span className={`uppercase font-semibold mt-1 tracking-[0.24em] truncate flex items-center gap-1.5 ${subtitleColor} ${currentSize.subtitle}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
          {taglineText}
        </span>
      )}
    </div>
  );

  const content = (
    <div className={`flex items-center gap-3 group ${className}`}>
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
