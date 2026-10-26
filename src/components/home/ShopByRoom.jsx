import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROOMS } from '../../data/products';

export default function ShopByRoom() {
  return (
    <section className="py-12 lg:py-16 bg-[#F8F5F0]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E6DFD5]">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#8C5835]">
              Space & Styling
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal sm:font-medium text-[#1E1E1E] mt-1 tracking-tight">
              Shop by Room
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5C5855] max-w-md mt-2 md:mt-0 font-normal leading-relaxed">
            Envision your sanctuary. Discover cohesive solid wood furniture collections crafted for every corner of your home.
          </p>
        </div>

        {/* 5 Rooms Showcase: 2 Large + 3 Medium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          
          {/* Room 1: Living Room (Spans 3 cols on lg) */}
          <Link
            to={`/room/${ROOMS[0].slug}`}
            className="lg:col-span-3 group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 h-[380px] flex flex-col justify-end p-6 sm:p-8"
          >
            <img 
              src={ROOMS[0].image} 
              alt={ROOMS[0].name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            
            <div className="relative z-10 text-white">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#B4845C]">
                {ROOMS[0].subtitle}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-white">
                {ROOMS[0].name}
              </h3>
              <p className="text-xs sm:text-sm text-[#E6DFD5]/90 mt-2 line-clamp-2 max-w-md">
                {ROOMS[0].description}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#B4845C] transition-colors">
                <span>Explore Room Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Room 2: Bedroom (Spans 3 cols on lg) */}
          <Link
            to={`/room/${ROOMS[1].slug}`}
            className="lg:col-span-3 group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 h-[380px] flex flex-col justify-end p-6 sm:p-8"
          >
            <img 
              src={ROOMS[1].image} 
              alt={ROOMS[1].name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            
            <div className="relative z-10 text-white">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#B4845C]">
                {ROOMS[1].subtitle}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-white">
                {ROOMS[1].name}
              </h3>
              <p className="text-xs sm:text-sm text-[#E6DFD5]/90 mt-2 line-clamp-2 max-w-md">
                {ROOMS[1].description}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#B4845C] transition-colors">
                <span>Explore Room Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Rooms 3, 4, 5 (Spans 2 cols each on lg) */}
          {ROOMS.slice(2).map((room) => (
            <Link
              key={room.id}
              to={`/room/${room.slug}`}
              className="lg:col-span-2 group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 h-[280px] flex flex-col justify-end p-6"
            >
              <img 
                src={room.image} 
                alt={room.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              <div className="relative z-10 text-white">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#B4845C]">
                  {room.subtitle}
                </span>
                <h4 className="font-serif text-xl font-bold mt-0.5 text-white">
                  {room.name}
                </h4>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-[#B4845C] transition-colors">
                  <span>View Sets</span>
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
