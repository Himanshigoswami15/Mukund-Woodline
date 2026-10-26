import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PROMOTIONAL_BANNERS } from '../../data/products';

export default function PromotionalBanner({ bannerIndex = 0 }) {
  const banner = PROMOTIONAL_BANNERS[bannerIndex] || PROMOTIONAL_BANNERS[0];

  return (
    <section className="py-8 lg:py-12 bg-[#FAF7F2]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className={`relative rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r ${banner.bgColor} text-white`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 z-10">
              <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#CBB093] block mb-3">
                {banner.tag}
              </span>

              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium tracking-tight text-white leading-tight">
                {banner.title}
              </h3>

              <p className="mt-4 text-sm sm:text-base text-[#E6DFD5]/90 font-light leading-relaxed max-w-lg">
                {banner.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to={banner.link}
                  className="px-6 py-3.5 bg-white text-[#3B2213] hover:bg-[#FAF7F2] rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 group"
                >
                  <span>{banner.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <span className="text-xs text-[#E6DFD5]/80 font-normal">
                  {banner.badge}
                </span>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-full min-h-[340px] overflow-hidden">
              <img 
                src={banner.image} 
                alt={banner.title} 
                className="w-full h-full object-cover scale-102 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#23140A]/80 via-transparent to-transparent pointer-events-none" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
