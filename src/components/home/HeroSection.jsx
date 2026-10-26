import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2]">
      {/* Hero Banner Container */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-4 pb-10 sm:pb-14 lg:pt-6 lg:pb-16">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E6DFD5] bg-[#3B2213]">
          
          {/* Background lifestyle image with luxury gradient overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85" 
              alt="Mukund Woodline Modern Indian Living Room" 
              className="w-full h-full object-cover object-center scale-102 filter brightness-[0.78]"
            />
            {/* Multi-stage luxury gradient for crisp editorial typography legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#23140A]/95 via-[#3B2213]/75 to-transparent sm:w-3/4" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#23140A]/85 via-transparent to-transparent sm:hidden" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-2xl text-white">
            
            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.85rem] font-normal sm:font-medium tracking-tight text-white leading-[1.12]">
              Furniture That Makes Your House Feel Like Home.
            </h1>

            {/* Supporting Text */}
            <p className="mt-5 text-sm sm:text-base lg:text-lg text-[#E6DFD5]/90 font-light leading-relaxed max-w-xl">
              Discover thoughtfully designed furniture that brings comfort, craftsmanship, and timeless style into every corner of your home.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link 
                to="/shop"
                className="px-7 py-3.5 bg-[#FAF7F2] hover:bg-white text-[#3B2213] text-xs font-semibold tracking-wider uppercase rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>Explore Furniture</span>
                <ArrowRight className="w-4 h-4 text-[#3B2213] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link 
                to="/shop?tag=bestseller"
                className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-[#FAF7F2] border border-white/25 text-xs font-medium tracking-wider uppercase rounded-xl backdrop-blur-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Discover Our Collection</span>
              </Link>
            </div>

            {/* Craftsmanship Guarantees bar */}
            <div className="mt-12 pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block text-base sm:text-lg font-normal text-white font-serif tracking-wide">100% Solid</span>
                <span className="text-[10.5px] uppercase tracking-wider text-[#CBB093] font-medium">Sheesham & Teak Wood</span>
              </div>
              <div>
                <span className="block text-base sm:text-lg font-normal text-white font-serif tracking-wide">10-Year</span>
                <span className="text-[10.5px] uppercase tracking-wider text-[#CBB093] font-medium">Structural Warranty</span>
              </div>
              <div>
                <span className="block text-base sm:text-lg font-normal text-white font-serif tracking-wide">Free White-Glove</span>
                <span className="text-[10.5px] uppercase tracking-wider text-[#CBB093] font-medium">Delivery & Assembly</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
