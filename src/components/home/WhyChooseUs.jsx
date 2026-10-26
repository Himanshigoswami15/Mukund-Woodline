import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Truck, 
  RotateCcw, 
  CreditCard, 
  Headphones,
  CheckCircle2,
  TreeDeciduous
} from 'lucide-react';
import { TRUST_POINTS } from '../../data/products';

export default function WhyChooseUs() {
  const iconMap = {
    ShieldCheck: TreeDeciduous,
    Award: Award,
    Truck: Truck,
    RotateCcw: RotateCcw,
    CreditCard: CreditCard,
    Headphones: Headphones
  };

  return (
    <section className="py-12 lg:py-16 bg-[#FAF7F2] border-t border-[#E6DFD5]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#8C5835]">
            The Mukund Woodline Promise
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal sm:font-medium text-[#1E1E1E] mt-1.5 tracking-tight">
            Why Choose Mukund Woodline?
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5855] mt-2.5 leading-relaxed font-normal">
            We believe true luxury is built on uncompromised timber seasoning, traditional mortise-and-tenon joints, and a shopping experience that honours your home.
          </p>
        </div>

        {/* 6 Trust Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRUST_POINTS.map((point, idx) => {
            const Icon = iconMap[point.icon] || ShieldCheck;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#E6DFD5] hover:border-[#8C5835]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E6DFD5] flex items-center justify-center text-[#8C5835] mb-4 shadow-xs">
                    <Icon className="w-6 h-6 text-[#8C5835]" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#1E1E1E]">
                    {point.title}
                  </h3>
                  <p className="text-xs text-[#5C5855] mt-2 leading-relaxed font-normal">
                    {point.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F3EFEA] flex items-center gap-1.5 text-[11px] font-medium text-[#556B2F]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Mukund Guarantee</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Workshop Transparency Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-[#3B2213] text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-xl font-bold text-[#FAF7F2]">
              Have a Custom Room Layout or Bespoke Sheesham Finish?
            </h4>
            <p className="text-xs text-[#E6DFD5]/80 max-w-xl">
              Our seasoned carpentry artisans and CAD interior designers will customize dimensions, finishes, and hardware for your floor plan.
            </p>
          </div>
          <a
            href="tel:+918002660123"
            className="px-6 py-3 bg-[#B4845C] hover:bg-[#8C5835] text-white rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors shadow-md"
          >
            Speak With Master Artisan
          </a>
        </div>

      </div>
    </section>
  );
}
