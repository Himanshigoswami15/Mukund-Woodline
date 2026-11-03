import React from 'react';
import { Link } from 'react-router-dom';

/**
 * BrandLogo: Official MW tree monogram (with dark background & gold border)
 * + "MUKUND WOODLINE" wordmark image beside it (same font, enhanced colors).
 */
export default function BrandLogo({
  size = 'md',       // 'xs', 'sm', 'md', 'lg', 'xl'
  variant = 'light', // 'light' | 'dark'
  asLink = true,
  className = ''
}) {
  const sizeMap = {
    xs: { monogram: 36, wordmark: 26, gap: 6, radius: 8,  border: 1.5 },
    sm: { monogram: 44, wordmark: 32, gap: 8, radius: 10, border: 1.5 },
    md: { monogram: 56, wordmark: 40, gap: 10, radius: 12, border: 2 },
    lg: { monogram: 72, wordmark: 52, gap: 14, radius: 14, border: 2 },
    xl: { monogram: 92, wordmark: 66, gap: 18, radius: 16, border: 2.5 },
  };

  const s = sizeMap[size] || sizeMap.md;
  const isDark = variant === 'dark';

  const content = (
    <div
      className={`inline-flex items-center group select-none ${className}`}
      style={{ gap: s.gap }}
    >
      {/* MW tree monogram with dark background & gold border */}
      <div
        className="shrink-0 overflow-hidden transition-all duration-300 group-hover:scale-[1.03]"
        style={{
          width: s.monogram,
          height: s.monogram,
          borderRadius: s.radius,
          border: `${s.border}px solid #D4AF3799`,
          boxShadow: isDark
            ? '0 2px 12px rgba(212,175,55,0.25), 0 1px 4px rgba(0,0,0,0.4)'
            : '0 2px 10px rgba(35,20,10,0.25), 0 1px 4px rgba(0,0,0,0.15)',
        }}
      >
        <img
          src="/logo-monogram.png"
          alt="MW Monogram"
          draggable={false}
          loading="eager"
          className="w-full h-full object-cover"
        />
      </div>

      {/* MUKUND WOODLINE wordmark image */}
      <img
        src="/logo-wordmark.png"
        alt="Mukund Woodline — Strength in Every Grain"
        draggable={false}
        loading="eager"
        className="object-contain shrink-0"
        style={{
          height: s.wordmark,
          width: 'auto',
          filter: isDark ? 'brightness(1.5) contrast(1.15)' : 'none',
        }}
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
