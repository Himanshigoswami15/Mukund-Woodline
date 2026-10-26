import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { AdminProvider } from './admin/context/AdminContext';

// Customer Storefront Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ToastContainer from './components/common/ToastContainer';
import QuickViewModal from './components/common/QuickViewModal';
import AuthModal from './components/common/AuthModal';
import FloatingWhatsApp from './components/common/FloatingWhatsApp';

import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import WishlistPage from './pages/WishlistPage';
import AccountPage from './pages/AccountPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Admin Portal Components & Pages
import AdminLayout from './admin/AdminLayout';
import AdminLoginPage from './admin/pages/AdminLoginPage';
import AdminDashboardPage from './admin/pages/AdminDashboardPage';
import AdminProductsPage from './admin/pages/AdminProductsPage';
import AdminCategoriesPage from './admin/pages/AdminCategoriesPage';
import AdminOrdersPage from './admin/pages/AdminOrdersPage';
import AdminCustomersPage from './admin/pages/AdminCustomersPage';
import AdminInventoryPage from './admin/pages/AdminInventoryPage';
import AdminDiscountsPage from './admin/pages/AdminDiscountsPage';
import AdminBannersPage from './admin/pages/AdminBannersPage';
import AdminReviewsPage from './admin/pages/AdminReviewsPage';
import AdminAnalyticsPage from './admin/pages/AdminAnalyticsPage';
import AdminSettingsPage from './admin/pages/AdminSettingsPage';
import AdminUsersPage from './admin/pages/AdminUsersPage';

// Scroll to top helper on navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Layout for Public Customer Storefront
function StoreLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E1E1E] selection:bg-[#B4845C] selection:text-white font-sans">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <QuickViewModal />
      <AuthModal />
      <ToastContainer />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <ShopProvider>
          <ScrollToTop />
          <Routes>
            {/* 1. Customer-Facing Storefront Routes */}
            <Route path="/" element={<StoreLayout />}>
              <Route index element={<HomePage />} />
              <Route path="shop" element={<ProductListingPage />} />
              <Route path="category/:slug" element={<ProductListingPage />} />
              <Route path="room/:slug" element={<ProductListingPage />} />
              <Route path="product/:id" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="order-success" element={<OrderSuccessPage />} />
              <Route path="order-success/:orderId" element={<OrderSuccessPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="account" element={<AccountPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>

            {/* 2. Admin Dedicated Login Route (No Header/Footer) */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* 3. Admin Protected Portal Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="categories" element={<AdminCategoriesPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
              <Route path="customers" element={<AdminCustomersPage />} />
              <Route path="inventory" element={<AdminInventoryPage />} />
              <Route path="discounts" element={<AdminDiscountsPage />} />
              <Route path="banners" element={<AdminBannersPage />} />
              <Route path="reviews" element={<AdminReviewsPage />} />
              <Route path="analytics" element={<AdminAnalyticsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
              <Route path="users" element={<AdminUsersPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<StoreLayout />}>
              <Route path="*" element={<HomePage />} />
            </Route>
          </Routes>
        </ShopProvider>
      </AdminProvider>
    </BrowserRouter>
  );
}
