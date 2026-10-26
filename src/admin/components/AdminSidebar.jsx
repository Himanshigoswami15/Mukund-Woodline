import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  ShoppingBag, 
  Users, 
  Warehouse, 
  Percent, 
  Image as ImageIcon, 
  Star, 
  BarChart3, 
  Settings, 
  ShieldAlert, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function AdminSidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  const { adminUser, logout, pendingOrdersCount, lowStockCount } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard, exact: true },
    { name: "Products", path: "/admin/products", icon: Package },
    { name: "Categories", path: "/admin/categories", icon: FolderTree },
    { 
      name: "Orders", 
      path: "/admin/orders", 
      icon: ShoppingBag, 
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : null,
      badgeColor: "bg-[#C78426]"
    },
    { name: "Customers", path: "/admin/customers", icon: Users },
    { 
      name: "Inventory", 
      path: "/admin/inventory", 
      icon: Warehouse,
      badge: lowStockCount > 0 ? lowStockCount : null,
      badgeColor: "bg-[#B8433E]"
    },
    { name: "Discounts & Coupons", path: "/admin/discounts", icon: Percent },
    { name: "Homepage & Banners", path: "/admin/banners", icon: ImageIcon },
    { name: "Reviews", path: "/admin/reviews", icon: Star },
    { name: "Reports & Analytics", path: "/admin/analytics", icon: BarChart3 },
    { name: "Website Settings", path: "/admin/settings", icon: Settings },
    { name: "Admin Users & Roles", path: "/admin/users", icon: ShieldAlert }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#5B3826] text-[#F8F6F2] border-r border-[#4A2E1F] select-none">
      
      {/* 1. Header with Logo & Brand */}
      <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-br from-[#D4AF37] to-[#8C5835] shadow-md shrink-0 overflow-hidden">
            <img 
              src="/logo-circle.png" 
              alt="Mukund Woodline Emblem" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-base font-bold tracking-tight text-white leading-tight truncate">
                Mukund Woodline
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#E9DDCD]/80 font-medium truncate">
                Admin Management
              </span>
            </div>
          )}
        </div>

        {/* Desktop collapse toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-[#E9DDCD] items-center justify-center transition-colors shrink-0"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* 2. Navigation Items List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-white/10">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group relative
                ${isActive 
                  ? 'bg-[#E9DDCD] text-[#5B3826] font-bold shadow-md' 
                  : 'text-[#F8F6F2]/80 hover:bg-white/10 hover:text-white'
                }
              `}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />
              
              {!isCollapsed && (
                <span className="flex-1 truncate">{item.name}</span>
              )}

              {item.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white shrink-0 ${item.badgeColor} ${isCollapsed ? 'absolute -top-1 -right-1 shadow-sm' : ''}`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* 3. Footer Links: Live Store & Logout */}
      <div className="p-3 border-t border-white/10 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-[#E9DDCD]/90 hover:bg-white/10 hover:text-white transition-colors"
          title={isCollapsed ? "View Live Store" : undefined}
        >
          <ExternalLink className="w-4 h-4 shrink-0 text-[#E9DDCD]" />
          {!isCollapsed && <span className="truncate">View Public Store ↗</span>}
        </a>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-[#E9DDCD]/80 hover:bg-[#B8433E]/20 hover:text-white transition-colors text-left"
          title={isCollapsed ? "Sign Out" : undefined}
        >
          <LogOut className="w-4 h-4 shrink-0 text-[#B8433E]" />
          {!isCollapsed && <span className="truncate">Sign Out</span>}
        </button>

        {/* Admin User Mini Card */}
        {!isCollapsed && adminUser?.isAuthenticated && (
          <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-3 px-2">
            <img 
              src={adminUser.avatar} 
              alt={adminUser.name} 
              className="w-8 h-8 rounded-full object-cover border border-[#E9DDCD]/30"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{adminUser.name}</p>
              <span className="text-[10px] text-[#E9DDCD]/70 truncate block">{adminUser.role}</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed) */}
      <aside className={`hidden lg:block fixed left-0 top-0 bottom-0 z-30 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Slide in) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
