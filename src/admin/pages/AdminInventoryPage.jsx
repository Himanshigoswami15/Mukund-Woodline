import React, { useState } from 'react';
import { Warehouse, AlertTriangle, Plus, Minus, Search, Check, RefreshCw } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function AdminInventoryPage() {
  const { adminProducts, updateProduct } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLowStockOnly, setFilterLowStockOnly] = useState(false);

  const filtered = adminProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.sku?.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterLowStockOnly) {
      return matchesSearch && p.stock <= (p.lowStockThreshold || 5);
    }
    return matchesSearch;
  });

  const handleStockAdjust = (id, currentStock, delta) => {
    const nextStock = Math.max(0, currentStock + delta);
    updateProduct(id, { stock: nextStock });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9DDCD]">
        <div>
          <h2 className="text-2xl font-extrabold text-[#292724] tracking-tight font-sans">
            Warehouse & Jodhpur Workshop Inventory Control
          </h2>
          <p className="text-xs text-[#77736D] mt-0.5">
            Monitor finished solid wood stock levels and trigger kiln-seasoned batch replenishment.
          </p>
        </div>

        <button
          onClick={() => setFilterLowStockOnly(!filterLowStockOnly)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterLowStockOnly 
              ? 'bg-[#B8433E] text-white shadow-xs' 
              : 'bg-white border border-[#E9DDCD] text-[#77736D] hover:text-[#292724]'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Show Low Stock Only ({adminProducts.filter(p => p.stock <= 5).length})</span>
        </button>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E9DDCD] shadow-xs flex items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name or SKU..."
            className="w-full pl-9 pr-3 py-2 bg-[#F8F6F2] border border-[#E9DDCD] rounded-xl text-[#292724] focus:outline-none focus:border-[#5B3826]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77736D]" />
        </div>
        <span className="text-[#77736D]">
          Displaying <strong>{filtered.length}</strong> items in inventory
        </span>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl border border-[#E9DDCD] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#292724]">
            <thead>
              <tr className="bg-[#F8F6F2] border-b border-[#E9DDCD] text-[#77736D] text-[11px] uppercase tracking-wider">
                <th className="py-4 pl-6 pr-3 font-semibold">Furniture Piece</th>
                <th className="py-4 px-3 font-semibold">SKU Code</th>
                <th className="py-4 px-3 font-semibold">Timber Material</th>
                <th className="py-4 px-3 font-semibold">Unit Price</th>
                <th className="py-4 px-3 font-semibold">Current Stock</th>
                <th className="py-4 px-3 font-semibold">Inventory Status</th>
                <th className="py-4 pr-6 font-semibold text-right">Quick Stock Adjustment</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F8F6F2]">
              {filtered.map((p) => {
                const isLow = p.stock <= 5;
                const isOut = p.stock === 0;

                return (
                  <tr key={p.id} className="hover:bg-[#F8F6F2]/60 transition-colors">
                    <td className="py-3.5 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover border border-[#E9DDCD]" />
                        <div>
                          <span className="font-bold text-[#292724] block">{p.name}</span>
                          <span className="text-[11px] text-[#77736D]">{p.categoryName}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 font-mono font-semibold text-[#5B3826]">
                      {p.sku}
                    </td>

                    <td className="py-3.5 px-3 text-[#77736D]">
                      {p.material}
                    </td>

                    <td className="py-3.5 px-3 font-bold text-[#292724]">
                      ₹{p.price.toLocaleString('en-IN')}
                    </td>

                    <td className="py-3.5 px-3">
                      <span className={`text-sm font-bold ${isOut ? 'text-[#B8433E]' : isLow ? 'text-[#C78426]' : 'text-[#292724]'}`}>
                        {p.stock} units
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isOut ? 'bg-[#B8433E]/10 text-[#B8433E]' :
                        isLow ? 'bg-[#C78426]/10 text-[#C78426]' :
                        'bg-[#4E7A58]/10 text-[#4E7A58]'
                      }`}>
                        {isOut ? "Out of Stock" : isLow ? "Low Stock (Reorder)" : "Sufficient"}
                      </span>
                    </td>

                    <td className="py-3.5 pr-6 text-right">
                      <div className="inline-flex items-center border border-[#E9DDCD] rounded-xl overflow-hidden bg-[#F8F6F2]">
                        <button
                          onClick={() => handleStockAdjust(p.id, p.stock, -1)}
                          className="px-2.5 py-1 text-xs font-bold hover:bg-[#E9DDCD] text-[#77736D] transition-colors"
                          title="Decrease 1"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 py-1 font-bold text-xs">{p.stock}</span>
                        <button
                          onClick={() => handleStockAdjust(p.id, p.stock, 5)}
                          className="px-2.5 py-1 text-xs font-bold hover:bg-[#E9DDCD] text-[#5B3826] transition-colors flex items-center gap-0.5"
                          title="Add batch of 5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span className="text-[10px]">5</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
