import React, { useState } from 'react';
import { Percent, Plus, Tag, Trash2, Check, X, Calendar } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function AdminDiscountsPage() {
  const { adminCoupons, addCoupon, toggleCoupon, deleteCoupon } = useAdmin();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage',
    value: 10,
    minOrder: 5000,
    usageLimit: 200,
    expiryDate: '31 Dec 2026'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.code.trim()) return;

    addCoupon({
      code: formData.code.toUpperCase().trim(),
      discountType: formData.discountType,
      value: Number(formData.value) || 10,
      minOrder: Number(formData.minOrder) || 0,
      usageLimit: Number(formData.usageLimit) || 100,
      expiryDate: formData.expiryDate
    });

    setIsModalOpen(false);
    setFormData({
      code: '',
      discountType: 'percentage',
      value: 10,
      minOrder: 5000,
      usageLimit: 200,
      expiryDate: '31 Dec 2026'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9DDCD]">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#292724]">
            Discounts & Promotional Coupons ({adminCoupons.length})
          </h2>
          <p className="text-xs text-[#77736D] mt-0.5">
            Configure welcome vouchers, festive percentages, and minimum basket requirements.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#5B3826] hover:bg-[#4A2E1F] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Coupon Code</span>
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminCoupons.map((cpn) => (
          <div key={cpn.id} className="bg-white rounded-3xl p-6 border border-[#E9DDCD] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#E9DDCD] text-[#5B3826] flex items-center justify-center">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono font-bold text-base text-[#5B3826] tracking-wider block">
                      {cpn.code}
                    </span>
                    <span className="text-[11px] text-[#77736D]">
                      {cpn.discountType === "percentage" ? `${cpn.value}% Off Entire Cart` : `Flat ₹${cpn.value} Off`}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleCoupon(cpn.id)}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                    cpn.status === "Active" ? "bg-[#4E7A58] text-white" : "bg-[#77736D] text-white"
                  }`}
                >
                  {cpn.status}
                </button>
              </div>

              <div className="space-y-2 text-xs text-[#77736D] pt-3 border-t border-[#F8F6F2]">
                <div className="flex justify-between">
                  <span>Minimum Order Value:</span>
                  <strong className="text-[#292724]">₹{cpn.minOrder?.toLocaleString('en-IN') || 0}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Usage Progress:</span>
                  <strong className="text-[#292724]">{cpn.usedCount} / {cpn.usageLimit} redemptions</strong>
                </div>
                <div className="flex justify-between">
                  <span>Valid Until:</span>
                  <span className="font-medium text-[#292724]">{cpn.expiryDate}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#F8F6F2] flex items-center justify-between text-xs">
              <span className="text-[10px] text-[#77736D]">ID: {cpn.id}</span>
              <button
                onClick={() => deleteCoupon(cpn.id)}
                className="text-[#B8433E] hover:underline font-semibold"
              >
                Delete Coupon
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Create Coupon */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div onClick={() => setIsModalOpen(false)} className="fixed inset-0" />

          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 z-10 border border-[#E9DDCD] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9DDCD]">
              <h3 className="font-serif text-lg font-bold text-[#292724]">Create Promotional Coupon</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-[#77736D] hover:text-[#292724]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs text-[#292724]">
              <div>
                <label className="block font-semibold mb-1">Coupon Promo Code *</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g. DIWALI20"
                  className="w-full px-3 py-2 border rounded-xl font-mono uppercase font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Discount Type</label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Discount Value *</label>
                  <input
                    type="number"
                    required
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Minimum Order (₹)</label>
                  <input
                    type="number"
                    value={formData.minOrder}
                    onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Usage Limit</label>
                  <input
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Expiry Date</label>
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  placeholder="e.g. 31 Dec 2026"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-[#E9DDCD] flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#5B3826] text-white rounded-xl font-semibold">
                  Publish Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
