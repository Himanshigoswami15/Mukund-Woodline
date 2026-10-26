import React from 'react';
import { X, RotateCcw, Filter, Check } from 'lucide-react';

export default function ProductFilters({ 
  filters, 
  setFilters, 
  totalResults, 
  onCloseMobile 
}) {
  const priceRanges = [
    { label: "Under ₹20,000", min: 0, max: 20000 },
    { label: "₹20,000 - ₹35,000", min: 20000, max: 35000 },
    { label: "₹35,000 - ₹50,000", min: 35000, max: 50000 },
    { label: "Above ₹50,000", min: 50000, max: 1000000 }
  ];

  const materials = [
    "Solid Sheesham Wood",
    "Solid Teak Wood",
    "Mango Wood & Cane",
    "Natural Latex",
    "Marble & Brass"
  ];

  const finishes = [
    "Warm Walnut",
    "Honey Teak",
    "Provincial Teak",
    "Natural Teak",
    "Charcoal Velvet"
  ];

  const handlePriceSelect = (range) => {
    if (filters.priceRange?.label === range.label) {
      setFilters(prev => ({ ...prev, priceRange: null }));
    } else {
      setFilters(prev => ({ ...prev, priceRange: range }));
    }
  };

  const handleMaterialToggle = (mat) => {
    setFilters(prev => {
      const current = prev.materials || [];
      if (current.includes(mat)) {
        return { ...prev, materials: current.filter(m => m !== mat) };
      } else {
        return { ...prev, materials: [...current, mat] };
      }
    });
  };

  const handleFinishToggle = (fin) => {
    setFilters(prev => {
      const current = prev.finishes || [];
      if (current.includes(fin)) {
        return { ...prev, finishes: current.filter(f => f !== fin) };
      } else {
        return { ...prev, finishes: [...current, fin] };
      }
    });
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: null,
      materials: [],
      finishes: [],
      minRating: 0,
      inStockOnly: false
    });
  };

  const hasActiveFilters = 
    Boolean(filters.priceRange) || 
    (filters.materials?.length > 0) || 
    (filters.finishes?.length > 0) || 
    (filters.minRating > 0) || 
    filters.inStockOnly;

  return (
    <div className="bg-white rounded-xl border border-[#E6DFD5] p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E6DFD5]">
        <div className="flex items-center gap-2 text-sm font-bold text-[#3B2213]">
          <Filter className="w-4 h-4 text-[#8C5835]" />
          <span>Filters ({totalResults})</span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#C85A32] hover:underline"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}

        {onCloseMobile && (
          <button 
            onClick={onCloseMobile}
            className="lg:hidden p-1 text-[#5C5855] hover:text-[#1E1E1E]"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 1. Price Range */}
      <div className="py-4 border-b border-[#F3EFEA]">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#3B2213] mb-2.5">
          Price Range
        </h4>
        <div className="space-y-1.5">
          {priceRanges.map((range, idx) => {
            const isSelected = filters.priceRange?.label === range.label;
            return (
              <label 
                key={idx}
                onClick={() => handlePriceSelect(range)}
                className="flex items-center gap-2 text-xs text-[#5C5855] hover:text-[#1E1E1E] cursor-pointer py-1"
              >
                <input 
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}}
                  className="rounded border-[#D3C5B4] text-[#3B2213] focus:ring-[#3B2213]"
                />
                <span className={isSelected ? "font-bold text-[#3B2213]" : ""}>{range.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Primary Wood & Material */}
      <div className="py-4 border-b border-[#F3EFEA]">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#3B2213] mb-2.5">
          Wood & Material
        </h4>
        <div className="space-y-1.5">
          {materials.map((mat, idx) => {
            const isSelected = filters.materials?.includes(mat);
            return (
              <label 
                key={idx}
                onClick={() => handleMaterialToggle(mat)}
                className="flex items-center gap-2 text-xs text-[#5C5855] hover:text-[#1E1E1E] cursor-pointer py-1"
              >
                <input 
                  type="checkbox"
                  checked={Boolean(isSelected)}
                  onChange={() => {}}
                  className="rounded border-[#D3C5B4] text-[#3B2213] focus:ring-[#3B2213]"
                />
                <span className={isSelected ? "font-bold text-[#3B2213]" : ""}>{mat}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Wood Finish */}
      <div className="py-4 border-b border-[#F3EFEA]">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#3B2213] mb-2.5">
          Lustre & Finish
        </h4>
        <div className="space-y-1.5">
          {finishes.map((fin, idx) => {
            const isSelected = filters.finishes?.includes(fin);
            return (
              <label 
                key={idx}
                onClick={() => handleFinishToggle(fin)}
                className="flex items-center gap-2 text-xs text-[#5C5855] hover:text-[#1E1E1E] cursor-pointer py-1"
              >
                <input 
                  type="checkbox"
                  checked={Boolean(isSelected)}
                  onChange={() => {}}
                  className="rounded border-[#D3C5B4] text-[#3B2213] focus:ring-[#3B2213]"
                />
                <span className={isSelected ? "font-bold text-[#3B2213]" : ""}>{fin}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 4. Customer Rating */}
      <div className="py-4 border-b border-[#F3EFEA]">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#3B2213] mb-2.5">
          Customer Rating
        </h4>
        <div className="space-y-1.5">
          {[4.8, 4.5, 4.0].map((rating) => {
            const isSelected = filters.minRating === rating;
            return (
              <label 
                key={rating}
                onClick={() => setFilters(prev => ({ ...prev, minRating: isSelected ? 0 : rating }))}
                className="flex items-center gap-2 text-xs text-[#5C5855] hover:text-[#1E1E1E] cursor-pointer py-1"
              >
                <input 
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}}
                  className="rounded border-[#D3C5B4] text-[#3B2213] focus:ring-[#3B2213]"
                />
                <span className={isSelected ? "font-bold text-[#3B2213]" : ""}>{rating}★ & Above</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 5. In Stock Only */}
      <div className="pt-4">
        <label className="flex items-center gap-2 text-xs text-[#1E1E1E] font-medium cursor-pointer">
          <input 
            type="checkbox"
            checked={Boolean(filters.inStockOnly)}
            onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
            className="rounded border-[#D3C5B4] text-[#3B2213] focus:ring-[#3B2213]"
          />
          <span>In Stock for Immediate Dispatch</span>
        </label>
      </div>

      {/* Mobile Apply Button */}
      {onCloseMobile && (
        <div className="mt-6 pt-4 border-t border-[#E6DFD5] lg:hidden">
          <button
            onClick={onCloseMobile}
            className="w-full py-2.5 bg-[#3B2213] text-white text-xs font-semibold rounded-lg"
          >
            Show {totalResults} Results
          </button>
        </div>
      )}
    </div>
  );
}
