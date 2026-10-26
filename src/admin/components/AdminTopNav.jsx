import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Menu, 
  Plus, 
  Calendar, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle, 
  Package, 
  ShoppingBag, 
  LogOut, 
  User, 
  ExternalLink,
  X
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function AdminTopNav({ onMenuToggle, onOpenQuickAction }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminUser, notifications, setNotifications, logout } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Compute breadcrumbs and title
  const getPageInfo = () => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/') return { title: "Dashboard Overview", section: "Main" };
    if (path.includes('/products')) return { title: "Product Management", section: "Catalog" };
    if (path.includes('/categories')) return { title: "Categories & Taxonomy", section: "Catalog" };
    if (path.includes('/orders')) return { title: "Orders & Fulfillment", section: "Sales" };
    if (path.includes('/customers')) return { title: "Customer Directory", section: "Accounts" };
    if (path.includes('/inventory')) return { title: "Inventory & Stock Control", section: "Warehouse" };
    if (path.includes('/discounts')) return { title: "Discounts & Promotional Coupons", section: "Marketing" };
    if (path.includes('/banners')) return { title: "Homepage Banners & Layouts", section: "Content" };
    if (path.includes('/reviews')) return { title: "Customer Ratings & Reviews", section: "Moderation" };
    if (path.includes('/analytics')) return { title: "Business Reports & Analytics", section: "Intelligence" };
    if (path.includes('/settings')) return { title: "Website & Store Settings", section: "System" };
    if (path.includes('/users')) return { title: "Admin Staff & Role Permissions", section: "Security" };
    return { title: "Admin Portal", section: "Mukul Woodlline" };
  };

  const { title, section } = getPageInfo();

  // Current formatted Indian date
  const currentDate = new Date().toLocaleDateString('en-GB', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/admin/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#E9DDCD] shadow-2xs px-4 sm:px-6 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Mobile hamburger & Page Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl text-[#5B3826] hover:bg-[#F8F6F2] border border-[#E9DDCD]"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#77736D]">
              <span>Admin</span>
              <span>/</span>
              <span className="text-[#5B3826] font-semibold">{section}</span>
            </div>
            <h1 className="font-serif text-lg sm:text-xl font-bold text-[#292724] tracking-tight leading-tight">
              {title}
            </h1>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search SKU, order ID, customer, product..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#F8F6F2] border border-[#E9DDCD] rounded-xl text-[#292724] placeholder-[#77736D] focus:outline-none focus:ring-2 focus:ring-[#5B3826]/20 focus:border-[#5B3826] transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77736D]" />
          </form>
        </div>

        {/* Right: Date, Quick Action, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Current Date Pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F6F2] border border-[#E9DDCD] text-xs text-[#77736D] font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#5B3826]" />
            <span>{currentDate}</span>
          </div>

          {/* Quick Action Button */}
          <button
            onClick={onOpenQuickAction}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#5B3826] hover:bg-[#4A2E1F] text-white rounded-xl text-xs font-semibold shadow-xs transition-all duration-200 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Quick Action</span>
          </button>

          {/* Notifications Dropdown */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-xl text-[#292724] hover:bg-[#F8F6F2] border border-[#E9DDCD] transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-[#5B3826]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#B8433E] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Menu */}
            {isNotificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#E9DDCD] overflow-hidden z-50 animate-fade-in">
                <div className="p-4 bg-[#F8F6F2] border-b border-[#E9DDCD] flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#292724]">Store Notifications</h4>
                    <span className="text-[10px] text-[#77736D]">{unreadCount} unread system alerts</span>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-[11px] font-semibold text-[#5B3826] hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="divide-y divide-[#F8F6F2] max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div 
                      key={n.id} 
                      className={`p-3.5 flex items-start gap-3 hover:bg-[#F8F6F2] transition-colors ${
                        !n.read ? 'bg-[#FAF7F2]' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        n.type === 'warning' ? 'bg-[#C78426]/10 text-[#C78426]' :
                        n.type === 'success' ? 'bg-[#4E7A58]/10 text-[#4E7A58]' :
                        'bg-[#5B3826]/10 text-[#5B3826]'
                      }`}>
                        {n.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                         n.type === 'success' ? <ShoppingBag className="w-4 h-4" /> :
                         <Package className="w-4 h-4" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="text-xs font-bold text-[#292724] truncate">{n.title}</p>
                          <span className="text-[10px] text-[#77736D] whitespace-nowrap">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-[#77736D] mt-0.5 leading-snug">{n.message}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 text-center bg-[#F8F6F2] border-t border-[#E9DDCD]">
                  <Link
                    to="/admin/orders"
                    onClick={() => setIsNotificationsOpen(false)}
                    className="text-xs font-semibold text-[#5B3826] hover:underline"
                  >
                    View All Activity Logs →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#F8F6F2] border border-[#E9DDCD] transition-colors"
            >
              <img
                src={adminUser?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"}
                alt=""
                className="w-7 h-7 rounded-lg object-cover"
              />
              <div className="hidden md:block text-left pr-1">
                <span className="text-xs font-bold text-[#292724] block leading-tight">
                  {adminUser?.name || "Mukul Sharma"}
                </span>
                <span className="text-[10px] text-[#77736D] block leading-none">
                  {adminUser?.role || "Super Admin"}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#77736D]" />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E9DDCD] overflow-hidden z-50 animate-fade-in p-2 text-xs">
                <div className="p-3 bg-[#F8F6F2] rounded-xl mb-2">
                  <p className="font-bold text-[#292724]">{adminUser?.name}</p>
                  <p className="text-[11px] text-[#77736D] truncate">{adminUser?.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-[#5B3826] text-white rounded text-[10px] font-semibold">
                    {adminUser?.role}
                  </span>
                </div>

                <Link
                  to="/admin/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#292724] hover:bg-[#F8F6F2] transition-colors"
                >
                  <User className="w-4 h-4 text-[#5B3826]" />
                  <span>Profile Settings</span>
                </Link>

                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#292724] hover:bg-[#F8F6F2] transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#5B3826]" />
                  <span>Open Public Website</span>
                </a>

                <div className="my-1 border-t border-[#E9DDCD]" />

                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                    navigate('/admin/login');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#B8433E] hover:bg-[#B8433E]/10 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out of Portal</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
