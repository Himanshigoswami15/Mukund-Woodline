import React from 'react';
import { Link } from 'react-router-dom';

/**
 * BrandLogo: Displays the official Mukund Woodline 3D engraved brand badge
 * exactly as it is in the official logo picture (tree emblem, sculpted MW,
 * embossed MUKUND WOODLINE typography, and tagline).
 */
export default function BrandLogo({
  size = 'md',       // 'xs', 'sm', 'md', 'lg', 'xl'
  asLink = true,
  className = ''
}) {
  const sizeMap = {
    xs: 'h-11 w-auto',
    sm: 'h-14 w-auto',
    md: 'h-18 sm:h-20 w-auto',
    lg: 'h-24 sm:h-28 w-auto',
    xl: 'h-32 sm:h-36 w-auto'
  };

  const currentHeight = sizeMap[size] || sizeMap.md;

  const content = (
    <div className={`relative inline-flex items-center justify-center group ${className}`}>
      <img
        src="/logo-badge.jpg"
        alt="Mukund Woodline - Strength in Every Grain"
        className={`${currentHeight} object-contain rounded-xl border border-[#D4AF37]/60 shadow-md shadow-[#23140A]/20 group-hover:border-[#D4AF37] group-hover:shadow-[0_4px_20px_rgba(212,175,55,0.35)] group-hover:scale-[1.02] transition-all duration-300`}
        loading="eager"
      />
    </div>
  );

  if (asLink) {
    return (
      <Link to="/" className="inline-block shrink-0" aria-label="Mukund Woodline Home">
        {content}
      </Link>
    );
  }

  return content;
}
