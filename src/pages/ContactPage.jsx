import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  ChevronDown, 
  MessageCircle,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { FAQS } from '../data/products';
import { useShop } from '../context/ShopContext';

export default function ContactPage() {
  const { addToast } = useShop();
  const [openFaq, setOpenFaq] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Furniture Customization Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    addToast("Inquiry sent! A Mukund Woodline advisor will call you within 2 hours.");
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      
      {/* Breadcrumbs */}
      <div className="bg-[#F3EFEA] border-b border-[#E6DFD5] py-2.5">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center gap-1.5 text-xs text-[#5C5855]">
          <Link to="/" className="hover:text-[#3B2213]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C5835]" />
          <span className="font-semibold text-[#3B2213]">Customer Concierge & Support</span>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#8C5835]">
            We Are Here To Assist You
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal sm:font-medium text-[#1E1E1E] mt-2 tracking-tight">
            Contact Mukund Woodline
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5855] mt-2 leading-relaxed">
            Need advice on living room dimensions, custom wood finishes, delivery dates, or after-sales service? Our dedicated furniture concierge is at your service.
          </p>
        </div>

        {/* Contact Cards & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-white rounded-2xl border border-[#E6DFD5] p-6 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] text-[#8C5835] flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#1E1E1E]">Phone Support</h4>
                <p className="text-xs text-[#5C5855] mt-1">Direct Furniture Advisory Hotline:</p>
                <a href="tel:+918002660123" className="font-bold text-sm text-[#3B2213] block mt-0.5">
                  1800-266-0123 (Toll-Free)
                </a>
                <p className="text-[11px] text-[#5C5855] mt-0.5">Mon - Sat: 9:30 AM to 8:00 PM IST</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E6DFD5] p-6 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] text-[#2E5C38] flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#1E1E1E]">WhatsApp Design Concierge</h4>
                <p className="text-xs text-[#5C5855] mt-1">Send room photos for finish advice:</p>
                <a href="https://wa.me/919820144521" target="_blank" rel="noreferrer" className="font-bold text-sm text-[#2E5C38] block mt-0.5 hover:underline">
                  +91 98201 44521
                </a>
                <p className="text-[11px] text-[#5C5855] mt-0.5">Instant response within 10 minutes</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E6DFD5] p-6 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] text-[#8C5835] flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#1E1E1E]">Email Inquiries</h4>
                <p className="text-xs text-[#5C5855] mt-1">Custom quotes & warranty assistance:</p>
                <a href="mailto:concierge@mukulwoodline.com" className="font-bold text-xs text-[#3B2213] block mt-0.5 hover:underline">
                  concierge@mukulwoodline.com
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E6DFD5] p-6 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] text-[#8C5835] flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#1E1E1E]">Atelier Workshop & Design Studio</h4>
                <p className="text-xs text-[#5C5855] mt-1 leading-relaxed">
                  Mukund Woodline Works, RIICO Industrial Timber Area, Jodhpur 342001 & Studio Indiranagar, Bengaluru 560038
                </p>
              </div>
            </div>

          </div>

          {/* Right Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-[#E6DFD5] p-8 shadow-xs">
              <h3 className="font-serif text-xl font-bold text-[#1E1E1E] mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs text-[#5C5855] mb-6">
                Fill in your details and an experienced furniture advisor will connect with you.
              </p>

              {isSubmitted ? (
                <div className="p-8 text-center bg-[#FAF7F2] rounded-2xl border border-[#556B2F]/30 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#556B2F] mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-[#1E1E1E]">Inquiry Successfully Received</h4>
                  <p className="text-xs text-[#5C5855] max-w-sm mx-auto">
                    Thank you, {form.name || "valued customer"}. We have assigned your request to our senior furniture consultant.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-4 py-2 bg-[#3B2213] text-white text-xs font-semibold rounded-lg"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#1E1E1E] mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ananya Sen"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-3 py-2 border border-[#D3C5B4] rounded-lg focus:outline-none focus:border-[#3B2213]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#1E1E1E] mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98200 00000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-[#D3C5B4] rounded-lg focus:outline-none focus:border-[#3B2213]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#1E1E1E] mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="ananya@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3 py-2 border border-[#D3C5B4] rounded-lg focus:outline-none focus:border-[#3B2213]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#1E1E1E] mb-1">Subject</label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-3 py-2 border border-[#D3C5B4] rounded-lg focus:outline-none focus:border-[#3B2213] bg-white"
                      >
                        <option>Furniture Customization Inquiry</option>
                        <option>Delivery & Installation Query</option>
                        <option>10-Year Warranty Claim</option>
                        <option>Interior Designer Collaboration</option>
                        <option>Bulk / Commercial Order</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1E1E1E] mb-1">Your Message or Custom Dimensions</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please share details about your room space, preferred Sheesham/Teak finish, or questions..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-3 py-2 border border-[#D3C5B4] rounded-lg focus:outline-none focus:border-[#3B2213]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#3B2213] hover:bg-[#54321D] text-white font-bold uppercase tracking-wider rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* FAQs Accordion */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C5835]">
              Common Queries
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#1E1E1E] mt-1">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-[#E6DFD5] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-[#1E1E1E] hover:text-[#8C5835] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-[#8C5835] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-[#5C5855] leading-relaxed border-t border-[#F3EFEA] animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
