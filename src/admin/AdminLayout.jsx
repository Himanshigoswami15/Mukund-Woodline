import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAdmin } from './context/AdminContext';
import AdminSidebar from './components/AdminSidebar';
import AdminTopNav from './components/AdminTopNav';
import QuickActionModal from './components/QuickActionModal';
import ProductFormModal from './components/ProductFormModal';

export default function AdminLayout() {
  const { adminUser } = useAdmin();
  const location = useLocation();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // Protected route check
  if (!adminUser?.isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#292724] font-sans flex flex-col selection:bg-[#5B3826] selection:text-white">
      {/* 1. Left Collapsible Sidebar */}
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* 2. Main Content Wrapper */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
      }`}>
        {/* Top Navbar */}
        <AdminTopNav
          onMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onOpenQuickAction={() => setIsQuickActionOpen(true)}
        />

        {/* Dynamic Nested Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Quick Action Modal */}
      <QuickActionModal
        isOpen={isQuickActionOpen}
        onClose={() => setIsQuickActionOpen(false)}
        onOpenAddProduct={() => {
          setIsQuickActionOpen(false);
          setIsAddProductOpen(true);
        }}
      />

      {/* Global Add Product Modal from TopNav/QuickAction */}
      <ProductFormModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
      />
    </div>
  );
}
