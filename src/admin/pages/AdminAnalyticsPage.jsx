import React from 'react';
import { BarChart3, TrendingUp, IndianRupee, MapPin, CreditCard, ShieldCheck } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import ChartRevenue from '../components/ChartRevenue';

export default function AdminAnalyticsPage() {
  const { totalRevenue, adminOrders } = useAdmin();

  const regions = [
    { city: "Bengaluru, Karnataka", share: 34, revenue: "₹3,21,000" },
    { city: "Delhi NCR (Gurugram & Noida)", share: 28, revenue: "₹2,64,000" },
    { city: "Mumbai & Pune, Maharashtra", share: 22, revenue: "₹2,07,000" },
    { city: "Hyderabad, Telangana", share: 11, revenue: "₹1,03,000" },
    { city: "Other Tier-2 Hubs", share: 5, revenue: "₹50,280" }
  ];

  const paymentBreakdown = [
    { method: "UPI (Google Pay, PhonePe)", pct: 48, count: 68 },
    { method: "Credit & Debit Cards (EMI)", pct: 32, count: 45 },
    { method: "Net Banking", pct: 14, count: 20 },
    { method: "Cash / Card on Delivery", pct: 6, count: 9 }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="pb-4 border-b border-[#E9DDCD]">
        <h2 className="text-2xl font-extrabold text-[#292724] tracking-tight font-sans">
          Reports & Financial Intelligence
        </h2>
        <p className="text-xs text-[#77736D] mt-0.5">
          Detailed metrics on sales, regional penetration, payment channels, and average basket sizes.
        </p>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#E9DDCD] shadow-xs">
          <span className="text-xs text-[#77736D] uppercase font-bold tracking-wider block">Average Order Value (AOV)</span>
          <div className="text-3xl font-extrabold text-[#5B3826] mt-1.5 font-sans tracking-tight">₹36,450</div>
          <span className="text-[11px] text-[#4E7A58] font-semibold mt-1 block">+12.4% vs last quarter</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E9DDCD] shadow-xs">
          <span className="text-xs text-[#77736D] uppercase font-bold tracking-wider block">Cart-to-Order Conversion Rate</span>
          <div className="text-3xl font-extrabold text-[#5B3826] mt-1.5 font-sans tracking-tight">3.82%</div>
          <span className="text-[11px] text-[#4E7A58] font-semibold mt-1 block">Industry benchmark: 2.1%</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E9DDCD] shadow-xs">
          <span className="text-xs text-[#77736D] uppercase font-bold tracking-wider block">Customer Return Rate</span>
          <div className="text-3xl font-extrabold text-[#4E7A58] mt-1.5 font-sans tracking-tight">0.6%</div>
          <span className="text-[11px] text-[#77736D] mt-1 block">Solid seasoned wood has zero warpage claims</span>
        </div>
      </div>

      {/* Revenue Trend Graph */}
      <div className="bg-white p-6 rounded-3xl border border-[#E9DDCD] shadow-xs">
        <div className="pb-4 border-b border-[#F8F6F2] mb-4">
          <h3 className="font-serif text-base font-bold text-[#292724]">30-Day Revenue Trend Curve</h3>
          <p className="text-[11px] text-[#77736D]">Aggregated gross revenue across all sales channels in INR</p>
        </div>
        <ChartRevenue dateRange="30d" />
      </div>

      {/* Regional Share & Payment Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Regional Deliveries */}
        <div className="bg-white p-6 rounded-3xl border border-[#E9DDCD] shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#F8F6F2]">
            <h3 className="font-serif text-base font-bold text-[#292724] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#5B3826]" />
              <span>Regional Order Volume Breakdown</span>
            </h3>
            <p className="text-[11px] text-[#77736D]">Top Indian metropolitan areas by furniture order volume</p>
          </div>

          <div className="space-y-3 text-xs">
            {regions.map((reg, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-[#292724]">{reg.city}</span>
                  <span className="text-[#5B3826]">{reg.revenue} ({reg.share}%)</span>
                </div>
                <div className="w-full bg-[#F8F6F2] h-2 rounded-full overflow-hidden border border-[#E9DDCD]/50">
                  <div className="bg-[#5B3826] h-full rounded-full" style={{ width: `${reg.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-6 rounded-3xl border border-[#E9DDCD] shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#F8F6F2]">
            <h3 className="font-serif text-base font-bold text-[#292724] flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#5B3826]" />
              <span>Customer Payment Methods</span>
            </h3>
            <p className="text-[11px] text-[#77736D]">Breakdown of payment modes selected at checkout</p>
          </div>

          <div className="space-y-3 text-xs">
            {paymentBreakdown.map((pm, idx) => (
              <div key={idx} className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#E9DDCD] flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#292724] block">{pm.method}</span>
                  <span className="text-[11px] text-[#77736D]">{pm.count} total transactions</span>
                </div>
                <span className="font-bold text-sm text-[#5B3826]">{pm.pct}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
