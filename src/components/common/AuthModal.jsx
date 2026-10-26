import React, { useState } from 'react';
import { X, User, Lock, Mail, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, setUser, addToast } = useShop();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'signin') {
      setUser({
        name: name || "Vikram Malhotra",
        email: email || "vikram.m@example.com",
        phone: phone || "+91 98201 44521",
        isLoggedIn: true
      });
      addToast("Welcome back to Mukul Woodlline!");
    } else {
      setUser({
        name: name || "Pooja Sharma",
        email: email || "pooja.sharma@example.com",
        phone: phone || "+91 98112 34567",
        isLoggedIn: true
      });
      addToast("Account created successfully! Welcome to Woodlline Club.");
    }
    setIsAuthModalOpen(false);
  };

  const handleDemoLogin = () => {
    setUser({
      name: "Vikram Malhotra",
      email: "vikram.m@example.com",
      phone: "+91 98201 44521",
      isLoggedIn: true
    });
    addToast("Signed in as Demo Homeowner Vikram Malhotra");
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        onClick={() => setIsAuthModalOpen(false)}
        className="fixed inset-0"
      />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden z-10 border border-[#E6DFD5]">
        {/* Header banner */}
        <div className="bg-[#3B2213] text-white p-6 relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-br from-[#D4AF37] to-[#8C5835] shadow-md mb-2 overflow-hidden">
            <img 
              src="/logo-circle.png" 
              alt="Mukund Woodline Emblem" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h3 className="font-serif text-xl font-bold">
            {authMode === 'signin' ? 'Welcome Back' : 'Create an Account'}
          </h3>
          <p className="text-xs text-[#E6DFD5]/80 mt-1">
            Access your orders, saved delivery addresses, and curated wishlists.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-[#E6DFD5] text-xs font-semibold">
          <button
            onClick={() => setAuthMode('signin')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              authMode === 'signin'
                ? 'border-[#3B2213] text-[#3B2213] bg-[#FAF7F2]'
                : 'border-transparent text-[#5C5855] hover:text-[#1E1E1E]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              authMode === 'signup'
                ? 'border-[#3B2213] text-[#3B2213] bg-[#FAF7F2]'
                : 'border-transparent text-[#5C5855] hover:text-[#1E1E1E]'
            }`}
          >
            Register New Account
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Malhotra"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#D3C5B4] rounded-lg focus:outline-none focus:border-[#3B2213]"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C5835]" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="e.g. vikram@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-[#D3C5B4] rounded-lg focus:outline-none focus:border-[#3B2213]"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C5835]" />
            </div>
          </div>

          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">Mobile Number (for delivery updates)</label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+91 98201 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#D3C5B4] rounded-lg focus:outline-none focus:border-[#3B2213]"
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C5835]" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-[#D3C5B4] rounded-lg focus:outline-none focus:border-[#3B2213]"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C5835]" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#3B2213] hover:bg-[#54321D] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <span>{authMode === 'signin' ? 'Sign In to Account' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Quick Demo Login Option */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2 bg-[#FAF7F2] hover:bg-[#E6DFD5] border border-[#D3C5B4] text-[#3B2213] rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#556B2F]" />
              <span>One-Click Demo Homeowner Login</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
