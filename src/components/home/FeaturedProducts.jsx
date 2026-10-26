import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import { PRODUCTS } from '../../data/products';

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Featured' },
    { id: 'living-room', label: 'Living Room' },
    { id: 'bedroom', label: 'Bedroom' },
    { id: 'dining-room', label: 'Dining' },
    { id: 'study-office', label: 'Study & Work' }
  ];

  const filteredProducts = activeTab === 'all' 
    ? PRODUCTS.slice(0, 8) 
    : PRODUCTS.filter(p => p.room === activeTab || p.category === activeTab);

  return (
    <section className="py-12 lg:py-16 bg-[#F8F5F0]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E6DFD5]">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#8C5835]">
              Mastercraft Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal sm:font-medium text-[#1E1E1E] mt-1 tracking-tight">
              Featured Wooden Furniture
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 mt-4 md:mt-0 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#3B2213] text-white shadow-xs'
                    : 'bg-white text-[#5C5855] hover:text-[#1E1E1E] border border-[#E6DFD5]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Products Per Row Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#3B2213] hover:bg-[#54321D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md hover:shadow-lg"
          >
            <span>View Full Furniture Catalog ({PRODUCTS.length * 3}+ Designs)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
