import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, TrendingUp, Award, ThumbsUp } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import { PRODUCTS } from '../../data/products';

export default function ProductCarousel() {
  const [activeTab, setActiveTab] = useState('bestseller');
  const scrollRef = useRef(null);

  const tabs = [
    { id: 'bestseller', label: 'Bestselling Furniture', icon: Award },
    { id: 'new-arrival', label: 'New Arrivals', icon: Clock },
    { id: 'trending', label: 'Trending This Season', icon: TrendingUp },
    { id: 'recommended', label: 'Recommended For You', icon: ThumbsUp }
  ];

  // Filter products based on tab
  const getProducts = () => {
    switch (activeTab) {
      case 'bestseller':
        return PRODUCTS.filter(p => p.badge === 'Bestseller' || p.rating >= 4.8);
      case 'new-arrival':
        return PRODUCTS.filter(p => p.badge === 'New Arrival' || p.discount >= 30);
      case 'trending':
        return PRODUCTS.filter(p => p.badge === 'Trending' || p.reviewCount > 70);
      case 'recommended':
      default:
        return PRODUCTS.slice(0, 6);
    }
  };

  const displayProducts = getProducts();

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-[#FAF7F2]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E6DFD5] gap-4">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#8C5835]">
              Handcrafted Highlights
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal sm:font-medium text-[#1E1E1E] mt-1 tracking-tight">
              Popular Collections & New Arrivals
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              onClick={() => handleScroll('left')}
              className="w-10 h-10 rounded-full border border-[#D3C5B4] bg-white text-[#3B2213] hover:bg-[#3B2213] hover:text-white flex items-center justify-center transition-colors shadow-xs"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-10 h-10 rounded-full border border-[#D3C5B4] bg-white text-[#3B2213] hover:bg-[#3B2213] hover:text-white flex items-center justify-center transition-colors shadow-xs"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#3B2213] text-white shadow-md'
                    : 'bg-white text-[#5C5855] hover:text-[#1E1E1E] border border-[#E6DFD5]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#B4845C]' : 'text-[#8C5835]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Horizontal Smooth Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-thin scrollbar-thumb-[#CBB093] -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {displayProducts.map((product) => (
            <div 
              key={product.id} 
              className="w-[280px] sm:w-[320px] shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
