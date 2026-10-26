import React, { useState } from 'react';
import { Users, Search, Mail, Phone, MapPin, ShoppingBag, IndianRupee, ShieldCheck } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function AdminCustomersPage() {
  const { adminCustomers } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = adminCustomers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9DDCD]">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#292724]">
            Customer Directory ({adminCustomers.length} Registered Accounts)
          </h2>
          <p className="text-xs text-[#77736D] mt-0.5">
            Profiles of homeowners, interior designers, and architects furnishing residential spaces.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, city, email..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-[#E9DDCD] rounded-xl text-xs text-[#292724] focus:outline-none focus:border-[#5B3826]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77736D]" />
        </div>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c) => (
          <div key={c.id} className="bg-white rounded-3xl p-6 border border-[#E9DDCD] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#5B3826] text-[#E9DDCD] flex items-center justify-center font-serif text-xl font-bold">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#292724]">{c.name}</h3>
                    <span className="text-[10px] text-[#77736D] font-mono">{c.id}</span>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  c.status === "VIP" ? "bg-[#C78426]/10 text-[#C78426]" : "bg-[#4E7A58]/10 text-[#4E7A58]"
                }`}>
                  {c.status}
                </span>
              </div>

              <div className="space-y-2 text-xs text-[#77736D] pt-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#5B3826]" />
                  <span className="text-[#292724] truncate">{c.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#5B3826]" />
                  <span>{c.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#5B3826]" />
                  <span>{c.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F8F6F2] grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#77736D] block">Orders Placed</span>
                <span className="font-serif font-bold text-base text-[#292724]">{c.ordersCount} Orders</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-[#77736D] block">Lifetime Value</span>
                <span className="font-serif font-bold text-base text-[#5B3826]">
                  ₹{c.totalSpent.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
