import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/products';

// Default image fallback if a newly added category lacks an image
const FALLBACK_CATEGORY_IMAGE = "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=700&q=80";

export default function CategoryGrid() {
  const { categories } = useShop();

  // Filter only active categories (defaults to CATEGORIES if state not yet ready)
  const sourceCategories = (categories && categories.length > 0) ? categories : CATEGORIES;
  const displayCategories = sourceCategories.filter(c => c.status !== 'Hidden');

  return (
    <section className="py-12 lg:py-16 bg-[#FAF7F2]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E6DFD5]">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#8C5835]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Living</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal sm:font-medium text-[#1E1E1E] mt-1 tracking-tight">
              Shop by Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5C5855] max-w-md mt-2 md:mt-0 font-normal leading-relaxed">
            Every piece is precision handcrafted from seasoned hardwood, thoughtfully balanced for modern Indian homes.
          </p>
        </div>

        {/* Dynamic Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {displayCategories.map((cat, idx) => {
            const catSlug = cat.slug || cat.id || `category-${idx}`;
            const catImage = cat.image || FALLBACK_CATEGORY_IMAGE;
            const itemCount = cat.count || (cat.itemCount !== undefined ? `${cat.itemCount}+ Products` : "Handcrafted");
            const catTagline = cat.tagline || (cat.subcategories && cat.subcategories.length > 0 
              ? cat.subcategories.slice(0, 3).map(s => typeof s === 'string' ? s : s.name).join(', ')
              : 'Handcrafted solid wood furniture');

            return (
              <Link
                key={cat.id || catSlug || idx}
                to={`/category/${catSlug}`}
                className="group flex flex-col bg-white rounded-2xl border border-[#E6DFD5] overflow-hidden hover:shadow-xl hover:border-[#8C5835]/50 transition-all duration-300"
              >
                {/* Category Image */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#F3EFEA]">
                  <img 
                    src={catImage} 
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.target.src = FALLBACK_CATEGORY_IMAGE;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-medium tracking-wide text-white px-2 py-0.5 rounded bg-black/40 backdrop-blur-xs">
                    {itemCount}
                  </span>
                </div>

                {/* Text & Link */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif text-base font-medium text-[#1E1E1E] group-hover:text-[#8C5835] transition-colors leading-tight">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-[#5C5855] mt-1 line-clamp-1 font-normal">
                      {catTagline}
                    </p>

                    {/* Subcategory Pills */}
                    {cat.subcategories && cat.subcategories.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {cat.subcategories.slice(0, 3).map((sub, sIdx) => {
                          const subName = typeof sub === 'string' ? sub : sub.name;
                          return (
                            <span 
                              key={sIdx} 
                              className="text-[9.5px] font-medium text-[#8C5835] bg-[#FAF7F2] px-1.5 py-0.5 rounded border border-[#E6DFD5]/80"
                            >
                              {subName}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#F3EFEA] flex items-center justify-between text-[11px] font-medium tracking-wider uppercase text-[#8C5835] group-hover:text-[#3B2213]">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
