import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TreeDeciduous, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Hammer, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      
      {/* Breadcrumbs */}
      <div className="bg-[#F3EFEA] border-b border-[#E6DFD5] py-2.5">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center gap-1.5 text-xs text-[#5C5855]">
          <Link to="/" className="hover:text-[#3B2213]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C5835]" />
          <span className="font-semibold text-[#3B2213]">About Mukund Woodline</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#8C5835]">
            Crafting Comfort. Defining Homes.
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal sm:font-medium text-[#1E1E1E] mt-2 tracking-tight">
            The Mukund Woodline Story
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#5C5855] leading-relaxed font-normal">
            Founded with an enduring reverence for Indian carpentry traditions, Mukund Woodline exists to bring authentic solid timber into modern family spaces — built to withstand decades of celebrations, conversations, and living.
          </p>
        </div>
      </section>

      {/* Philosophy & Craftsmanship Section */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#E6DFD5] aspect-4/3">
            <img 
              src="https://images.unsplash.com/photo-1540518614846-7ede433c4ef5?auto=format&fit=crop&w=1200&q=80" 
              alt="Mukund Woodline Woodwork Workshop" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#8C5835]">
              Mastercraft Standards
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal sm:font-medium text-[#1E1E1E] tracking-tight">
              Why Kiln-Seasoned Sheesham & Teak Wood Matters
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5855] leading-relaxed font-normal">
              India has diverse climates — from coastal monsoon humidity to arid northern winters. Commercial particle board and MDF crumble and swell under these forces.
            </p>
            <p className="text-xs sm:text-sm text-[#5C5855] leading-relaxed font-normal">
              At Mukund Woodline, every log of Sheesham (Dalbergia Sissoo) and Teak undergoes 28 days of precision vacuum-kiln seasoning, reducing internal moisture to an optimal 8-12%. We reinforce each joint with traditional mortise-and-tenon woodwork, followed by an organic anti-borer and anti-termite infusion.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-[#E6DFD5]">
                <ShieldCheck className="w-5 h-5 text-[#8C5835] mb-1.5" />
                <h4 className="font-serif font-bold text-sm text-[#1E1E1E]">10-Year Warranty</h4>
                <p className="text-[11px] text-[#5C5855] mt-0.5">Direct structural integrity guarantee on all solid wood pieces.</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-[#E6DFD5]">
                <TreeDeciduous className="w-5 h-5 text-[#556B2F] mb-1.5" />
                <h4 className="font-serif font-bold text-sm text-[#1E1E1E]">Ethically Sourced</h4>
                <p className="text-[11px] text-[#5C5855] mt-0.5">Government-certified sustainable agro-forestry plantations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Values */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 mt-16 pt-12 border-t border-[#E6DFD5]">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h3 className="font-serif text-2xl font-bold text-[#1E1E1E]">
            Our Four Pillars of Excellence
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E6DFD5] text-center space-y-2">
            <span className="text-2xl font-serif font-bold text-[#8C5835]">01</span>
            <h4 className="font-serif font-bold text-sm text-[#1E1E1E]">Zero Particle Board</h4>
            <p className="text-xs text-[#5C5855]">We never cut corners with cheap compressed paper dust or toxic formaldehyde adhesives.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E6DFD5] text-center space-y-2">
            <span className="text-2xl font-serif font-bold text-[#8C5835]">02</span>
            <h4 className="font-serif font-bold text-sm text-[#1E1E1E]">White-Glove Delivery</h4>
            <p className="text-xs text-[#5C5855]">Room-of-choice placement, unboxing, precision carpenter assembly, and debris clearing.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E6DFD5] text-center space-y-2">
            <span className="text-2xl font-serif font-bold text-[#8C5835]">03</span>
            <h4 className="font-serif font-bold text-sm text-[#1E1E1E]">Design Customization</h4>
            <p className="text-xs text-[#5C5855]">Choice of Warm Walnut, Honey Teak, Provincial or Natural finishes tailored to your room palette.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E6DFD5] text-center space-y-2">
            <span className="text-2xl font-serif font-bold text-[#8C5835]">04</span>
            <h4 className="font-serif font-bold text-sm text-[#1E1E1E]">Fair Pricing</h4>
            <p className="text-xs text-[#5C5855]">Direct workshop-to-doorstep model eliminates retail showroom markups of 40-50%.</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#3B2213] hover:bg-[#54321D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
          >
            <span>Explore Handcrafted Furniture</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
