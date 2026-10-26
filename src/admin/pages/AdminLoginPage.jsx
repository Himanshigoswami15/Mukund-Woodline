import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, adminUser } = useAdmin();

  const redirectTarget = location.state?.from?.pathname || '/admin';

  const [email, setEmail] = useState('admin@mukundwoodline.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // If already logged in, redirect to admin area
  useEffect(() => {
    if (adminUser?.isAuthenticated) {
      navigate(redirectTarget, { replace: true });
    }
  }, [adminUser, navigate, redirectTarget]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setIsLoading(false);
      if (res.success) {
        navigate(redirectTarget, { replace: true });
      } else {
        setErrorMessage(res.message || "Invalid administrator credentials.");
      }
    }, 500);
  };

  const handleDemoSignIn = () => {
    setEmail('admin@mukundwoodline.com');
    setPassword('admin123');
    setIsLoading(true);
    setTimeout(() => {
      login('admin@mukundwoodline.com', 'admin123');
      setIsLoading(false);
      navigate(redirectTarget, { replace: true });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] flex items-stretch text-[#292724]">
      
      {/* Left Column: Split-screen Luxury Furniture Background (Hidden on small screens) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#5B3826] overflow-hidden select-none">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85"
          alt="Mukund Woodline Interior"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.65]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3B2213]/95 via-[#5B3826]/60 to-transparent" />

        <div className="relative z-10 p-12 lg:p-16 flex flex-col justify-between text-[#F8F6F2]">
          {/* Brand header */}
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-br from-[#D4AF37] to-[#8C5835] shadow-xl overflow-hidden shrink-0">
              <img 
                src="/logo-circle.png" 
                alt="Mukund Woodline Emblem" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <span className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-white block">
                Mukund Woodline
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#E9DDCD] font-semibold">
                STRENGTH IN EVERY GRAIN • ADMIN PORTAL
              </span>
            </div>
          </div>

          {/* Editorial quote */}
          <div className="space-y-4 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#E9DDCD]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E9DDCD]" />
              <span>Enterprise Furniture Management Suite</span>
            </div>

            <h2 className="font-serif text-3xl xl:text-4xl font-bold text-white leading-tight">
              Centralized Control for Products, Orders, and Timber Inventory.
            </h2>

            <p className="text-xs sm:text-sm text-[#E9DDCD]/85 leading-relaxed">
              Designed for workshop leads, merchandising teams, and store administrators to oversee daily white-glove fulfillment across all Indian pincodes.
            </p>

            <div className="pt-4 border-t border-white/15 grid grid-cols-3 gap-4 text-xs">
              <div>
                <span className="font-serif text-lg font-bold text-white block">100% Solid</span>
                <span className="text-[11px] text-[#E9DDCD]/70">Sheesham & Teak Wood</span>
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white block">19,000+</span>
                <span className="text-[11px] text-[#E9DDCD]/70">Pincodes Supported</span>
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white block">256-Bit</span>
                <span className="text-[11px] text-[#E9DDCD]/70">Encrypted Dashboard</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="text-[11px] text-[#E9DDCD]/60">
            © {new Date().getFullYear()} Mukund Woodline Private Limited. Internal Enterprise Access Only.
          </div>
        </div>
      </div>

      {/* Right Column: Admin Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-6 sm:px-12 lg:px-16 xl:px-24 bg-white max-w-2xl mx-auto w-full">
        <div className="max-w-md w-full mx-auto space-y-8">
          
          {/* Logo & Headline */}
          <div>
            <div className="flex items-center gap-3 mb-6 lg:hidden">
              <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-br from-[#D4AF37] to-[#8C5835] shadow-md overflow-hidden shrink-0">
                <img 
                  src="/logo-circle.png" 
                  alt="Mukund Woodline Emblem" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-[#5B3826] block leading-none">
                  Mukund Woodline
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#77736D]">
                  Admin Management
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5B3826] uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Restricted Administration</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#292724]">
              Sign in to Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-[#77736D] mt-1.5 leading-relaxed">
              Enter your authorized staff credentials to manage the furniture store, catalog, and logistics.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 bg-[#B8433E]/10 border border-[#B8433E]/30 rounded-xl text-xs text-[#B8433E] font-medium animate-fade-in">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div>
              <label className="block font-semibold text-[#292724] mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mukundwoodline.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F8F6F2] border border-[#E9DDCD] rounded-xl text-[#292724] focus:outline-none focus:ring-2 focus:ring-[#5B3826]/20 focus:border-[#5B3826] transition-all"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77736D]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-semibold text-[#292724]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert("Password reset instructions have been forwarded to the Super Administrator.")}
                  className="text-[11px] font-semibold text-[#5B3826] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-[#F8F6F2] border border-[#E9DDCD] rounded-xl text-[#292724] focus:outline-none focus:ring-2 focus:ring-[#5B3826]/20 focus:border-[#5B3826] transition-all"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77736D]" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#77736D] hover:text-[#292724]"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#E9DDCD] text-[#5B3826] focus:ring-[#5B3826]"
                />
                <span className="text-[#77736D]">Keep me signed in on this workstation</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-5 bg-[#5B3826] hover:bg-[#4A2E1F] disabled:bg-[#77736D] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              {isLoading ? (
                <span>Authenticating Administrator...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="pt-2">
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-[#E9DDCD]" />
              <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-[#77736D] tracking-wider">
                Instant Demo Access
              </span>
              <div className="flex-grow border-t border-[#E9DDCD]" />
            </div>

            <button
              type="button"
              onClick={handleDemoSignIn}
              className="w-full mt-2 py-2.5 px-4 bg-[#F8F6F2] hover:bg-[#E9DDCD] border border-[#E9DDCD] text-[#5B3826] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#4E7A58]" />
              <span>One-Click Super Admin Sign In</span>
            </button>
          </div>

          {/* Back to Live Store Link */}
          <div className="text-center pt-4 border-t border-[#E9DDCD]">
            <Link
              to="/"
              className="text-xs font-semibold text-[#77736D] hover:text-[#5B3826] transition-colors"
            >
              ← Return to Mukund Woodline Customer Website
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
