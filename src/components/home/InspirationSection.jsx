import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, X } from 'lucide-react';
import { INSPIRATION_ARTICLES } from '../../data/products';

export default function InspirationSection() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <section className="py-12 lg:py-16 bg-[#FAF7F2]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E6DFD5]">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#8C5835]">
              Editorial Journal
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal sm:font-medium text-[#1E1E1E] mt-1 tracking-tight">
              Ideas for Beautiful Living
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5C5855] max-w-md mt-2 md:mt-0 font-normal leading-relaxed">
            Design advice, solid wood care wisdom, and home styling tips from Mukund Woodline's master interior craftsmen.
          </p>
        </div>

        {/* 3 Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INSPIRATION_ARTICLES.map((article) => (
            <div 
              key={article.id}
              className="group bg-white rounded-2xl border border-[#E6DFD5] overflow-hidden hover:shadow-xl hover:border-[#8C5835]/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image */}
              <div className="relative aspect-16/10 overflow-hidden bg-[#F3EFEA]">
                <img 
                  src={article.image} 
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold uppercase tracking-wider rounded">
                  {article.category}
                </span>
              </div>

              {/* Text */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-[#5C5855] mb-2">
                    <Clock className="w-3 h-3 text-[#8C5835]" />
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#1E1E1E] group-hover:text-[#8C5835] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#5C5855] mt-2.5 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#F3EFEA]">
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C5835] hover:text-[#3B2213] group/btn cursor-pointer"
                  >
                    <span>Read Article & Styling Tips</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Article Reading Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
            <div 
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0"
            />
            
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 z-10 border border-[#E6DFD5]">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF7F2] text-[#3B2213] hover:bg-[#3B2213] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C5835]">
                {selectedArticle.category} • {selectedArticle.readTime}
              </span>

              <h3 className="font-serif text-2xl font-bold text-[#1E1E1E] mt-1.5">
                {selectedArticle.title}
              </h3>

              <div className="my-5 rounded-xl overflow-hidden aspect-16/9">
                <img 
                  src={selectedArticle.image} 
                  alt="" 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-sm text-xs sm:text-sm text-[#5C5855] leading-relaxed space-y-4">
                <p className="font-medium text-[#1E1E1E]">
                  {selectedArticle.summary}
                </p>
                <p>
                  {selectedArticle.content}
                </p>
                <p>
                  Proper maintenance preserves the beauty of natural timber. For solid Sheesham and Teak wood, wipe down weekly using a soft microfiber cloth lightly dusted with natural beeswax or organic linseed oil. Avoid positioning solid wood directly under prolonged harsh midday sunlight or immediately next to high-output air conditioning vents.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E6DFD5] flex items-center justify-between">
                <span className="text-xs text-[#5C5855]">Published by Mukund Woodline Atelier</span>
                <Link
                  to="/shop"
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 bg-[#3B2213] text-white rounded-lg text-xs font-semibold hover:bg-[#54321D]"
                >
                  Shop Featured Collection
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
