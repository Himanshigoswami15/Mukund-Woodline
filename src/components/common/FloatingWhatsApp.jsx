import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    const query = message.trim() || "Hello Mukund Woodline team, I would like to inquire about solid wood furniture customization.";
    const url = `https://wa.me/919820144521?text=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Concierge Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-[#E6DFD5] overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-[#2E5C38] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-semibold">Mukund Woodline Concierge</h4>
                <p className="text-[10px] text-white/80">Online • Typically replies in 5 mins</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Bubble */}
          <div className="p-4 bg-[#FAF7F2] space-y-2 text-xs">
            <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-xs border border-[#E6DFD5] text-[#1E1E1E] leading-relaxed">
              Namaste! 🙏 Need help with room dimensions, wood finishes (Warm Walnut vs Honey Teak), or custom furniture orders?
            </div>
            <span className="text-[10px] text-[#5C5855] block text-right">Mukund Advisory Team</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#E6DFD5] flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 px-3 py-1.5 text-xs border border-[#D3C5B4] rounded-lg focus:outline-none focus:border-[#2E5C38]"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#2E5C38] hover:bg-[#23452B] text-white rounded-lg text-xs font-medium flex items-center justify-center transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 bg-[#2E5C38] hover:bg-[#23452B] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer"
        aria-label="WhatsApp Furniture Advisor"
      >
        <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">
          Design Concierge
        </span>
      </button>
    </div>
  );
}
