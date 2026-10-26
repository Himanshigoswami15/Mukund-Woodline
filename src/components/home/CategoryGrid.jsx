import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const POPULAR_CATEGORIES = [
  {
    name: "Sofas & Recliners",
    slug: "living-room",
    sub: "sofas-recliners",
    count: "42+ Designs",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=80",
    tagline: "Hand-tufted velvets & solid teak frames"
  },
  {
    name: "Beds & Headboards",
    slug: "bedroom",
    sub: "beds-headboards",
    count: "38+ Designs",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=700&q=80",
    tagline: "Hydraulic storage & solid Sheesham king beds"
  },
  {
    name: "Wardrobes",
    slug: "storage-wardrobes",
    sub: "wardrobes",
    count: "26+ Designs",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=700&q=80",
    tagline: "Cane-inlay shutters & multi-door armoires"
  },
  {
    name: "Dining Tables & Chairs",
    slug: "dining-room",
    sub: "dining-tables",
    count: "31+ Designs",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=700&q=80",
    tagline: "6-seater solid wood tables with bench seating"
  },
  {
    name: "Coffee Tables",
    slug: "living-room",
    sub: "coffee-tables",
    count: "24+ Designs",
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=700&q=80",
    tagline: "Fluted tambour curves & Indian marble tops"
  },
  {
    name: "TV Units",
    slug: "living-room",
    sub: "tv-units",
    count: "19+ Designs",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80",
    tagline: "Acoustic mesh doors & smart wire management"
  },
  {
    name: "Study Tables",
    slug: "study-office",
    sub: "study-tables",
    count: "22+ Designs",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=700&q=80",
    tagline: "Executive work desks with storage hutches"
  },
  {
    name: "Shoe Racks",
    slug: "storage-wardrobes",
    sub: "shoe-racks",
    count: "15+ Designs",
    image: "https://images.unsplash.com/photo-1595514535415-dae862057929?auto=format&fit=crop&w=700&q=80",
    tagline: "Louvered ventilation shutters with cushion seating"
  },
  {
    name: "Bookshelves",
    slug: "storage-wardrobes",
    sub: "bookshelves",
    count: "18+ Designs",
    image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=700&q=80",
    tagline: "Architectural 5-tier open display shelving"
  },
  {
    name: "Home Decor",
    slug: "home-decor",
    sub: "mirrors",
    count: "48+ Designs",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=80",
    tagline: "Handcrafted pooja mandirs & arched brass mirrors"
  }
];

export default function CategoryGrid() {
  return (
    <section className="py-12 lg:py-16 bg-[#FAF7F2]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E6DFD5]">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#8C5835]">
              Curated Living
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal sm:font-medium text-[#1E1E1E] mt-1 tracking-tight">
              Shop by Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5C5855] max-w-md mt-2 md:mt-0 font-normal leading-relaxed">
            Every piece is precision handcrafted from seasoned hardwood, thoughtfully balanced for modern Indian homes.
          </p>
        </div>

        {/* 10 Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {POPULAR_CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              to={`/category/${cat.slug}?sub=${encodeURIComponent(cat.name)}`}
              className="group flex flex-col bg-white rounded-2xl border border-[#E6DFD5] overflow-hidden hover:shadow-xl hover:border-[#8C5835]/50 transition-all duration-300"
            >
              {/* Category Image */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#F3EFEA]">
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-2 left-2 text-[10px] font-medium tracking-wide text-white px-2 py-0.5 rounded bg-black/40 backdrop-blur-xs">
                  {cat.count}
                </span>
              </div>

              {/* Text & Link */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif text-base font-medium text-[#1E1E1E] group-hover:text-[#8C5835] transition-colors leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-[#5C5855] mt-1 line-clamp-1 font-normal">
                    {cat.tagline}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#F3EFEA] flex items-center justify-between text-[11px] font-medium tracking-wider uppercase text-[#8C5835] group-hover:text-[#3B2213]">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
