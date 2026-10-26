import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  MapPin, 
  ChevronDown, 
  Phone, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES, PRODUCTS } from '../../data/products';
import BrandLogo from './BrandLogo';

export default function Header() {
  const { 
    cartCount, 
    wishlistCount, 
    user, 
    setIsAuthModalOpen, 
    pincode, 
    pincodeCity, 
    checkPincode,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useShop();

  const navigate = useNavigate();
  const location = useLocation();

  // Search autocomplete state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState(null);
  const [isPincodeDropdownOpen, setIsPincodeDropdownOpen] = useState(false);
  const [tempPincode, setTempPincode] = useState(pincode);

  const searchRef = useRef(null);
  const megaMenuRef = useRef(null);

  // Close dropdowns on route change
  useEffect(() => {
    setActiveMegaCategory(null);
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Click outside listener for search & mega menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target)) {
        setActiveMegaCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtered products for search
  const searchResults = searchQuery.trim() === "" ? [] : PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.room.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handlePincodeSubmit = (e) => {
    e.preventDefault();
    if (checkPincode(tempPincode)) {
      setIsPincodeDropdownOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2] border-b border-[#E6DFD5] shadow-xs">
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#3B2213] text-[#FAF7F2] text-xs py-2 px-4 transition-all">
        <div className="w-full px-2 sm:px-6 lg:px-10 xl:px-12 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-[#B4845C] text-white">
              FESTIVE SALE
            </span>
            <span className="font-normal text-[#FAF7F2]/90 tracking-wide text-xs">
              Transform Your Home with Mukund Woodline — Flat 10% Off with code <strong className="text-[#E6DFD5] tracking-wider font-semibold underline underline-offset-2">WOODLINE10</strong>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-[#FAF7F2]/80 text-[12px]">
            <div className="relative">
              <button 
                onClick={() => setIsPincodeDropdownOpen(!isPincodeDropdownOpen)}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer py-1"
                aria-label="Delivery location selector"
              >
                <MapPin className="w-3.5 h-3.5 text-[#B4845C]" />
                <span>Deliver to: <strong className="text-white font-medium">{pincode}</strong></span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {/* Pincode Modal Dropdown */}
              {isPincodeDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-72 bg-white text-[#1E1E1E] rounded-lg shadow-xl border border-[#E6DFD5] p-3.5 z-50 animate-fade-in">
                  <div className="text-xs font-semibold text-[#3B2213] mb-1">Check Delivery & Installation</div>
                  <p className="text-[11px] text-[#5C5855] mb-2.5">Enter your postal PIN code to see exact delivery timelines</p>
                  <form onSubmit={handlePincodeSubmit} className="flex gap-2">
                    <input 
                      type="text" 
                      value={tempPincode}
                      onChange={(e) => setTempPincode(e.target.value)}
                      placeholder="e.g. 560038"
                      maxLength={6}
                      className="flex-1 px-2.5 py-1.5 text-xs border border-[#D3C5B4] rounded focus:outline-none focus:border-[#3B2213]"
                    />
                    <button 
                      type="submit"
                      className="px-3 py-1.5 bg-[#3B2213] text-white text-xs font-medium rounded hover:bg-[#54321D] transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                  <div className="mt-2 text-[11px] text-[#556B2F] font-medium flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#556B2F]" />
                    <span>{pincodeCity}</span>
                  </div>
                </div>
              )}
            </div>

            <span className="text-[#FAF7F2]/30">|</span>

            <a href="tel:+918002660123" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#B4845C]" />
              <span>Furniture Concierge: 1800-266-0123</span>
            </a>

            <span className="text-[#FAF7F2]/30">|</span>

            <Link to="/about" className="hover:text-white transition-colors">Why Mukund Woodline?</Link>
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile hamburger menu */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-[#3B2213] hover:bg-[#E6DFD5]/50 rounded-lg transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo & Wordmark */}
          <BrandLogo size="md" />

          {/* Large Search Bar */}
          <div ref={searchRef} className="relative flex-1 max-w-xl mx-4 hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search sofas, beds, wardrobes, dining tables..."
                className="w-full pl-11 pr-24 py-2.5 text-sm bg-white border border-[#D3C5B4] rounded-full text-[#1E1E1E] placeholder-[#5C5855]/70 focus:outline-none focus:ring-2 focus:ring-[#8C5835]/30 focus:border-[#3B2213] shadow-inner transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C5835]" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#3B2213] hover:bg-[#54321D] text-white text-xs font-medium rounded-full transition-colors flex items-center gap-1 shadow-xs"
              >
                <span>Search</span>
              </button>
            </form>

            {/* Live Autocomplete Dropdown */}
            {isSearchOpen && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-[#E6DFD5] overflow-hidden z-50 animate-fade-in">
                <div className="p-3 bg-[#FAF7F2] border-b border-[#E6DFD5] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#5C5855] uppercase tracking-wider">
                    Product Suggestions ({searchResults.length})
                  </span>
                  <span className="text-xs text-[#8C5835]">Press Enter to see all results</span>
                </div>

                {searchResults.length > 0 ? (
                  <div className="divide-y divide-[#F3EFEA]">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        to={`/product/${item.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3 p-3 hover:bg-[#FAF7F2] transition-colors group"
                      >
                        <img 
                          src={item.images[0]} 
                          alt={item.name} 
                          className="w-12 h-12 rounded object-cover border border-[#E6DFD5]"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-[#1E1E1E] truncate group-hover:text-[#8C5835]">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-[#5C5855] truncate">{item.material} • {item.finish}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-bold text-[#3B2213]">₹{item.price.toLocaleString('en-IN')}</span>
                            <span className="text-[10px] text-[#5C5855] line-through">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                            <span className="text-[10px] font-semibold text-[#C85A32]">{item.discount}% Off</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#8C5835] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                    <div className="p-2.5 text-center bg-[#FAF7F2]">
                      <button 
                        onClick={handleSearchSubmit}
                        className="text-xs font-semibold text-[#8C5835] hover:underline"
                      >
                        View all results for "{searchQuery}" →
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-[#5C5855]">
                    No furniture matched "<strong>{searchQuery}</strong>". Try searching for "sofa", "bed", "dining", or "study desk".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Icons: Account, Wishlist, Cart */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Account / Profile Button */}
            <button
              onClick={() => {
                if (user?.isLoggedIn) {
                  navigate('/account');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="flex items-center gap-2 p-2 hover:bg-[#E6DFD5]/40 rounded-lg text-[#3B2213] transition-colors"
              title={user?.isLoggedIn ? `Logged in as ${user.name}` : "Sign In / Register"}
            >
              <div className="w-8 h-8 rounded-full bg-[#E6DFD5] flex items-center justify-center text-[#3B2213]">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-[#8C5835] font-medium">Account</span>
                <span className="text-xs font-semibold text-[#3B2213] max-w-[90px] truncate">
                  {user?.isLoggedIn ? user.name.split(' ')[0] : "Sign In"}
                </span>
              </div>
            </button>

            {/* Wishlist Button */}
            <Link
              to="/wishlist"
              className="relative p-2 hover:bg-[#E6DFD5]/40 rounded-lg text-[#3B2213] transition-colors"
              title="View Wishlist"
            >
              <div className="w-8 h-8 rounded-full bg-[#E6DFD5] flex items-center justify-center text-[#3B2213]">
                <Heart className="w-4 h-4" />
              </div>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C85A32] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Button */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 p-2 hover:bg-[#E6DFD5]/40 rounded-lg text-[#3B2213] transition-colors group"
              title="Shopping Cart"
            >
              <div className="w-8 h-8 rounded-full bg-[#3B2213] flex items-center justify-center text-white group-hover:bg-[#54321D] transition-colors shadow-xs">
                <ShoppingBag className="w-4 h-4 text-[#FAF7F2]" />
              </div>
              {cartCount > 0 && (
                <span className="absolute top-1 left-7 w-4.5 h-4.5 bg-[#C85A32] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-[11px] text-[#5C5855]">Cart</span>
                <span className="text-xs font-semibold text-[#3B2213]">
                  {cartCount > 0 ? `${cartCount} Item${cartCount > 1 ? 's' : ''}` : "Empty"}
                </span>
              </div>
            </Link>

          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sofas, beds, wardrobes, dining..."
              className="w-full pl-9 pr-16 py-2 text-xs bg-white border border-[#D3C5B4] rounded-full text-[#1E1E1E] focus:outline-none focus:border-[#3B2213]"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8C5835]" />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#3B2213] text-white text-[11px] font-medium rounded-full"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <nav ref={megaMenuRef} className="hidden lg:block border-t border-[#E6DFD5] bg-[#FAF7F2]/95 backdrop-blur-xs relative">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
          <ul className="flex items-center justify-between text-[12.5px] font-medium tracking-[0.03em] text-[#3B2213]">
            {CATEGORIES.map((cat) => (
              <li 
                key={cat.id}
                onMouseEnter={() => setActiveMegaCategory(cat.id)}
                className="py-3"
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className={`flex items-center gap-1 hover:text-[#8C5835] transition-colors py-1 ${
                    activeMegaCategory === cat.id ? "text-[#8C5835] border-b-2 border-[#8C5835]" : ""
                  }`}
                >
                  <span>{cat.name}</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </Link>
              </li>
            ))}
            
            {/* Direct quick links */}
            <li className="py-3">
              <Link 
                to="/shop?tag=new-arrival" 
                className="text-[#8C5835] hover:text-[#3B2213] transition-colors"
              >
                <span>New Arrivals</span>
              </Link>
            </li>
            <li className="py-3">
              <Link 
                to="/shop?discount=25" 
                className="text-[#C85A32] font-bold hover:underline transition-colors"
              >
                Festive Offers
              </Link>
            </li>
          </ul>
        </div>

        {/* Mega Menu Dropdown */}
        {activeMegaCategory && (
          <div 
            onMouseLeave={() => setActiveMegaCategory(null)}
            className="absolute left-0 right-0 top-full bg-white border-b border-[#E6DFD5] shadow-2xl py-6 z-50 animate-fade-in"
          >
            {(() => {
              const category = CATEGORIES.find(c => c.id === activeMegaCategory);
              if (!category) return null;

              return (
                <div className="w-full px-6 sm:px-10 lg:px-16 grid grid-cols-4 gap-8">
                  {/* Column 1 & 2: Subcategories */}
                  <div className="col-span-2 grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#3B2213] uppercase tracking-wider pb-2 border-b border-[#E6DFD5]">
                        Popular Collections
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {category.subcategories.slice(0, 4).map((sub, idx) => (
                          <li key={idx}>
                            <Link
                              to={`/category/${category.slug}?sub=${encodeURIComponent(sub.name)}`}
                              className="text-xs text-[#5C5855] hover:text-[#8C5835] hover:translate-x-1 inline-block transition-transform"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#3B2213] uppercase tracking-wider pb-2 border-b border-[#E6DFD5]">
                        Explore by Material
                      </h4>
                      <ul className="mt-3 space-y-2 text-xs text-[#5C5855]">
                        <li>
                          <Link to={`/category/${category.slug}?material=sheesham`} className="hover:text-[#8C5835] inline-block hover:translate-x-1 transition-transform">
                            Solid Sheesham Wood (Heirloom)
                          </Link>
                        </li>
                        <li>
                          <Link to={`/category/${category.slug}?material=teak`} className="hover:text-[#8C5835] inline-block hover:translate-x-1 transition-transform">
                            Pure Seasoned Teak Wood
                          </Link>
                        </li>
                        <li>
                          <Link to={`/category/${category.slug}?material=rattan`} className="hover:text-[#8C5835] inline-block hover:translate-x-1 transition-transform">
                            Hand-Woven Rattan Cane Inlay
                          </Link>
                        </li>
                        <li>
                          <Link to={`/category/${category.slug}?material=marble`} className="hover:text-[#8C5835] inline-block hover:translate-x-1 transition-transform">
                            Indian Marble & Brass Details
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Column 3: Category Spotlight */}
                  <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E6DFD5] flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#C85A32] uppercase tracking-widest">
                        Handcrafted Quality
                      </span>
                      <h4 className="font-serif text-base font-bold text-[#3B2213] mt-1">
                        {category.name} Range
                      </h4>
                      <p className="text-xs text-[#5C5855] mt-1.5 leading-relaxed">
                        {category.tagline}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E6DFD5] flex items-center justify-between">
                      <span className="text-xs text-[#3B2213] font-medium">{category.itemCount}+ designs</span>
                      <Link 
                        to={`/category/${category.slug}`}
                        className="text-xs font-semibold text-[#8C5835] hover:text-[#3B2213] flex items-center gap-1 group"
                      >
                        <span>View All</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Column 4: Category Visual Banner */}
                  <div className="relative rounded-xl overflow-hidden shadow-sm group">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 min-h-[160px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                      <span className="text-[11px] font-medium text-[#FAF7F2]/90">Starting at ₹13,999</span>
                      <h5 className="font-serif text-sm font-bold text-white mt-0.5">Custom Finish Available</h5>
                      <Link
                        to={`/category/${category.slug}`}
                        className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#FAF7F2] hover:text-[#E6DFD5]"
                      >
                        <span>Explore Collection</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })()}
          </div>
        )}
      </nav>

      {/* 4. Mobile Slide-Over Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden animate-fade-in">
          {/* Backdrop */}
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-sm bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 bg-[#3B2213] text-white flex items-center justify-between">
              <BrandLogo size="sm" variant="dark" />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-full text-white/80 hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pincode & User row in mobile drawer */}
            <div className="p-3 bg-[#F3EFEA] border-b border-[#E6DFD5] flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-[#5C5855]">
                <MapPin className="w-3.5 h-3.5 text-[#8C5835]" />
                <span>Pincode: <strong>{pincode}</strong></span>
              </div>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (user?.isLoggedIn) navigate('/account');
                  else setIsAuthModalOpen(true);
                }}
                className="text-[#8C5835] font-semibold underline"
              >
                {user?.isLoggedIn ? "My Profile" : "Sign In"}
              </button>
            </div>

            {/* Categories Accordion */}
            <div className="p-4 flex-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C5835] mb-2">
                Shop By Category
              </div>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <div key={cat.id} className="border-b border-[#E6DFD5]/70 py-2">
                    <Link
                      to={`/category/${cat.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between text-sm font-medium text-[#3B2213] hover:text-[#8C5835]"
                    >
                      <span>{cat.name}</span>
                      <ArrowRight className="w-4 h-4 text-[#8C5835]/70" />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Quick Links */}
              <div className="mt-6 pt-4 border-t border-[#E6DFD5] space-y-2 text-xs font-medium text-[#5C5855]">
                <Link to="/shop?tag=bestseller" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-[#3B2213]">
                  Bestselling Furniture
                </Link>
                <Link to="/shop?tag=new-arrival" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-[#3B2213]">
                  New Season Arrivals
                </Link>
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-[#3B2213]">
                  Solid Wood Craftsmanship Story
                </Link>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-[#3B2213]">
                  Customer Concierge & Support
                </Link>
              </div>
            </div>

            {/* Helpline Footer */}
            <div className="p-4 bg-[#F3EFEA] border-t border-[#E6DFD5] text-center">
              <p className="text-[11px] text-[#5C5855]">Need help choosing furniture?</p>
              <a href="tel:+918002660123" className="text-xs font-bold text-[#3B2213] block mt-1">
                📞 1800-266-0123 (Toll Free)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
