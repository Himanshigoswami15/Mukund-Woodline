import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Edit, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function AdminBannersPage() {
  const { adminBanners, setAdminBanners } = useAdmin();

  const toggleStatus = (id) => {
    setAdminBanners(prev => prev.map(b => b.id === id ? {
      ...b,
      status: b.status === "Active" ? "Paused" : "Active"
    } : b));
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9DDCD]">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#292724]">
            Homepage Banners & Seasonal Visual Merchandising
          </h2>
          <p className="text-xs text-[#77736D] mt-0.5">
            Manage full-width lifestyle banners, festive campaign overlays, and click-through metrics.
          </p>
        </div>
      </div>

      {/* Banners List */}
      <div className="space-y-6">
        {adminBanners.map((banner, idx) => (
          <div
            key={banner.id}
            className="bg-white rounded-3xl border border-[#E9DDCD] overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Banner Image Preview (5 cols) */}
            <div className="lg:col-span-5 relative h-56 lg:h-auto overflow-hidden bg-[#5B3826]">
              <img
                src={banner.image}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-black/60 backdrop-blur-xs text-white rounded-md text-[10px] font-bold">
                Position #{idx + 1}
              </div>
            </div>

            {/* Banner Copy & Settings (7 cols) */}
            <div className="lg:col-span-7 p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#5B3826]">
                      {banner.tag}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#292724] mt-0.5">
                      {banner.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => toggleStatus(banner.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                      banner.status === "Active"
                        ? "bg-[#4E7A58] text-white"
                        : "bg-[#77736D] text-white"
                    }`}
                  >
                    {banner.status}
                  </button>
                </div>

                <p className="text-xs text-[#77736D] mt-2 leading-relaxed">
                  {banner.subtitle}
                </p>

                {/* Metrics */}
                <div className="mt-4 pt-3 border-t border-[#F8F6F2] grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] text-[#77736D] block">Impressions</span>
                    <span className="font-bold text-[#292724]">{banner.impressions?.toLocaleString('en-IN') || 4500}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#77736D] block">Store Clicks</span>
                    <span className="font-bold text-[#5B3826]">{banner.clicks?.toLocaleString('en-IN') || 620}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#77736D] block">Target Link</span>
                    <span className="font-mono text-[11px] text-[#77736D]">{banner.link}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F8F6F2] flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#4E7A58] font-semibold">{banner.badge}</span>
                <span className="text-[11px] text-[#77736D]">CTA: "{banner.cta}"</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
