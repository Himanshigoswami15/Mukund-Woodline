import React, { useState } from 'react';
import { Settings, Save, Check, Building2, Phone, Mail, ShieldCheck, MapPin } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function AdminSettingsPage() {
  const { settings, setSettings } = useAdmin();
  const [formData, setFormData] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-4xl">
      
      {/* Header */}
      <div className="pb-4 border-b border-[#E9DDCD]">
        <h2 className="font-serif text-2xl font-bold text-[#292724]">
          Store & System Configuration
        </h2>
        <p className="text-xs text-[#77736D] mt-0.5">
          Manage business tax credentials, support hotlines, delivery fee rules, and store maintenance.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-[#4E7A58]/10 border border-[#4E7A58]/30 rounded-2xl text-xs text-[#4E7A58] font-bold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Website configuration updated and saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 text-xs text-[#292724]">
        
        {/* Business Credentials */}
        <div className="bg-white rounded-3xl p-6 border border-[#E9DDCD] shadow-xs space-y-4">
          <h3 className="font-serif text-base font-bold text-[#5B3826] border-b border-[#F8F6F2] pb-2">
            1. Brand & Legal Entity Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Store / Business Name</label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">GST Identification Number (GSTIN)</label>
              <input
                type="text"
                value={formData.gstNumber}
                onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl font-mono uppercase"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold mb-1">Brand Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold mb-1">Jodhpur Timber Workshop & Headquarters Address</label>
              <input
                type="text"
                value={formData.workshopAddress}
                onChange={(e) => setFormData({ ...formData, workshopAddress: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Customer Support Hotlines */}
        <div className="bg-white rounded-3xl p-6 border border-[#E9DDCD] shadow-xs space-y-4">
          <h3 className="font-serif text-base font-bold text-[#5B3826] border-b border-[#F8F6F2] pb-2">
            2. Customer Concierge & Contact Channels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1">Toll-Free Phone</label>
              <input
                type="text"
                value={formData.supportPhone}
                onChange={(e) => setFormData({ ...formData, supportPhone: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Official WhatsApp</label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Concierge Email</label>
              <input
                type="email"
                value={formData.supportEmail}
                onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Shipping & Delivery Rules */}
        <div className="bg-white rounded-3xl p-6 border border-[#E9DDCD] shadow-xs space-y-4">
          <h3 className="font-serif text-base font-bold text-[#5B3826] border-b border-[#F8F6F2] pb-2">
            3. Shipping, Assembly & Thresholds
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Free Delivery Threshold (INR ₹)</label>
              <input
                type="number"
                value={formData.freeShippingThreshold}
                onChange={(e) => setFormData({ ...formData, freeShippingThreshold: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-xl"
              />
              <span className="text-[10px] text-[#77736D] mt-0.5 block">Orders above this qualify for free white-glove setup.</span>
            </div>

            <div>
              <label className="block font-semibold mb-1">Standard Shipping Fee for smaller orders (INR ₹)</label>
              <input
                type="number"
                value={formData.standardShippingFee}
                onChange={(e) => setFormData({ ...formData, standardShippingFee: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#5B3826] hover:bg-[#4A2E1F] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
}
