import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Award, 
  Clock, 
  Send,
  Heart
} from 'lucide-react';
import { CATEGORIES } from '../../data/products';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#23140A] text-[#FAF7F2] border-t border-[#3B2213] relative overflow-hidden">
      {/* 1. Value Proposition Pillars Bar */}
      <div className="border-b border-white/10 py-8 bg-[#3B2213]/40">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-[#FAF7F2]/10 border border-[#B4845C]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#B4845C]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">100% Solid Wood</h4>
              <p className="text-[11px] text-[#E6DFD5]/70">Pure Seasoned Sheesham & Teak</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-[#FAF7F2]/10 border border-[#B4845C]/30 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-[#B4845C]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">10-Year Warranty</h4>
              <p className="text-[11px] text-[#E6DFD5]/70">Direct manufacturer structural backing</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-[#FAF7F2]/10 border border-[#B4845C]/30 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-[#B4845C]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">Free White-Glove</h4>
              <p className="text-[11px] text-[#E6DFD5]/70">Room placement & carpenter assembly</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-[#FAF7F2]/10 border border-[#B4845C]/30 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5 text-[#B4845C]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">7-Day Easy Returns</h4>
              <p className="text-[11px] text-[#E6DFD5]/70">Zero-risk home shopping guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" variant="dark" taglineText="STRENGTH IN EVERY GRAIN" />

            <p className="text-xs text-[#E9DDCD]/90 italic font-serif leading-relaxed border-l-2 border-[#D4AF37]/50 pl-3">
              “Wood that lives with you. Quality that lasts for generations.”
            </p>

            <p className="text-xs text-[#E6DFD5]/80 leading-relaxed pr-6">
              Mukund Woodline is an authentic Indian solid wood furniture atelier. We design heirloom-grade solid Sheesham, Teak, and Mango wood furniture engineered to bring architectural warmth into contemporary living spaces.
            </p>

            {/* Official 3 Badges */}
            <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/10 text-center">
              <div className="p-2 rounded bg-white/5 border border-white/10">
                <span className="block text-[10px] font-bold text-[#E9DDCD] tracking-wider uppercase">Premium Quality</span>
                <span className="text-[9px] text-[#E6DFD5]/70">Solid Wood</span>
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/10">
                <span className="block text-[10px] font-bold text-[#E9DDCD] tracking-wider uppercase">Sustainable</span>
                <span className="text-[9px] text-[#E6DFD5]/70">& Responsible</span>
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/10">
                <span className="block text-[10px] font-bold text-[#E9DDCD] tracking-wider uppercase">Built On</span>
                <span className="text-[9px] text-[#E6DFD5]/70">Generations of Trust</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 text-xs text-[#E6DFD5]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B4845C] shrink-0 mt-0.5" />
                <span>Woodline Works, Industrial Furniture Corridor, Jodhpur & Design Studio Indiranagar, Bengaluru - 560038</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B4845C] shrink-0" />
                <span>Customer Care: +91 800-266-0123 / +91 98201 44521</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B4845C] shrink-0" />
                <span>concierge@mukulwoodline.com</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-3">
              <a href="#instagram" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#B4845C] hover:text-[#3B2213] flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#facebook" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#B4845C] hover:text-[#3B2213] flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#youtube" aria-label="YouTube" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#B4845C] hover:text-[#3B2213] flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white mb-4 pb-1 border-b border-white/10">
              Shop Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E6DFD5]/70">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.slug}`} className="hover:text-white hover:underline transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/shop?tag=bestseller" className="hover:text-white transition-colors">
                  Bestselling Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support & Help */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white mb-4 pb-1 border-b border-white/10">
              Customer Concierge
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E6DFD5]/70">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Our Advisors</Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-white transition-colors">Track Order Status</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">Solid Wood Care Guide</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Shipping & White-Glove Policy</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">10-Year Warranty Terms</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Returns & Refund Guarantee</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Frequently Asked Questions</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Club */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-white mb-4 pb-1 border-b border-white/10">
              Join Woodlline Club
            </h4>
            <p className="text-xs text-[#E6DFD5]/70 mb-3 leading-relaxed">
              Receive interior design lookbooks, early festive preview access, and a ₹1,000 welcome voucher for your new home.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#556B2F]/30 border border-[#556B2F] rounded-lg text-xs text-[#FAF7F2]">
                ✨ Welcome to Mukund Woodline Club! Use code <strong>WOODLINE10</strong> at checkout for 10% off.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-3 py-2 text-xs bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-[#B4845C]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-[#B4845C] hover:bg-[#8C5835] text-white rounded transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-[#E6DFD5]/50 block">We respect your privacy. No spam ever.</span>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-white/10 text-xs">
              <span className="text-[11px] text-[#E6DFD5]/70 block mb-1.5">Secure Payments & Certifications</span>
              <div className="flex flex-wrap gap-2 text-[10px] text-[#B4845C]">
                <span className="px-2 py-0.5 bg-white/5 rounded border border-white/10">UPI / QR</span>
                <span className="px-2 py-0.5 bg-white/5 rounded border border-white/10">Visa / Mastercard</span>
                <span className="px-2 py-0.5 bg-white/5 rounded border border-white/10">RuPay</span>
                <span className="px-2 py-0.5 bg-white/5 rounded border border-white/10">0% No Cost EMI</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Bottom Copyright Bar */}
      <div className="border-t border-white/10 py-5 bg-black/40 text-center text-xs text-[#E6DFD5]/60">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Mukund Woodline Private Limited. All Rights Reserved. Indian Heritage Furniture Crafts.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link to="/admin" className="text-[#B4845C] hover:text-white font-semibold transition-colors flex items-center gap-1">
              <span>Admin Portal 🔐</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
