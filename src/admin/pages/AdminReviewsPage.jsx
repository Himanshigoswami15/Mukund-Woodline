import React, { useState } from 'react';
import { Star, CheckCircle2, XCircle, Trash2, Filter } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function AdminReviewsPage() {
  const { adminReviews, updateReviewStatus, deleteReview } = useAdmin();
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = adminReviews.filter(r => 
    filterStatus === 'all' ? true : r.status === filterStatus
  );

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9DDCD]">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#292724]">
            Customer Ratings & Reviews Moderation ({adminReviews.length})
          </h2>
          <p className="text-xs text-[#77736D] mt-0.5">
            Approve genuine homeowner reviews, verify buyer badges, and filter spam.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#E9DDCD] text-xs">
          {["all", "Approved", "Pending"].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                filterStatus === st 
                  ? 'bg-[#5B3826] text-white' 
                  : 'text-[#77736D] hover:text-[#292724]'
              }`}
            >
              {st === "all" ? "All Reviews" : st}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Cards */}
      <div className="space-y-4">
        {filtered.map((rev) => (
          <div key={rev.id} className="bg-white rounded-3xl p-6 border border-[#E9DDCD] shadow-xs flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-[#292724]">{rev.customerName}</span>
                {rev.verifiedPurchase && (
                  <span className="px-2 py-0.5 bg-[#4E7A58]/10 text-[#4E7A58] text-[10px] font-bold rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Homeowner
                  </span>
                )}
                <span className="text-[11px] text-[#77736D]">• {rev.date}</span>
              </div>

              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3.5 h-3.5 ${
                      i < rev.rating ? 'fill-[#C78426] text-[#C78426]' : 'text-gray-300'
                    }`} 
                  />
                ))}
                <span className="text-xs font-bold text-[#5B3826] ml-2 font-serif">
                  Product: {rev.productName}
                </span>
              </div>

              <p className="text-xs text-[#77736D] leading-relaxed pt-1">
                "{rev.comment}"
              </p>
            </div>

            <div className="flex sm:flex-col items-end gap-2 shrink-0">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                rev.status === "Approved" ? "bg-[#4E7A58]/10 text-[#4E7A58]" : "bg-[#C78426]/10 text-[#C78426]"
              }`}>
                {rev.status}
              </span>

              <div className="flex items-center gap-1 pt-2">
                {rev.status !== "Approved" && (
                  <button
                    onClick={() => updateReviewStatus(rev.id, "Approved")}
                    className="px-2.5 py-1 bg-[#4E7A58] text-white rounded-lg text-xs font-semibold hover:bg-[#3D6146]"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => deleteReview(rev.id)}
                  className="p-1.5 text-[#B8433E] hover:bg-[#B8433E]/10 rounded-lg transition-colors"
                  title="Delete review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
