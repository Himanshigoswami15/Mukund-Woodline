import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import PromotionalBanner from '../components/home/PromotionalBanner';
import ProductCarousel from '../components/home/ProductCarousel';
import ShopByRoom from '../components/home/ShopByRoom';
import WhyChooseUs from '../components/home/WhyChooseUs';
import InspirationSection from '../components/home/InspirationSection';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 1. Homepage Hero Section */}
      <HeroSection />

      {/* 2. Shop by Category (10 Categories) */}
      <CategoryGrid />

      {/* 3. Featured Products Responsive Grid */}
      <FeaturedProducts />

      {/* 4. Promotional Banner 1 (Sheesham Collection) */}
      <PromotionalBanner bannerIndex={0} />

      {/* 5. Bestsellers & New Arrivals Product Carousel */}
      <ProductCarousel />

      {/* 6. Shop by Room (Living, Bedroom, Dining, Office, Foyer) */}
      <ShopByRoom />

      {/* 7. Promotional Banner 2 (Everyday Comfort & Bedroom Upgrade) */}
      <PromotionalBanner bannerIndex={1} />

      {/* 8. Why Choose Mukul Woodlline (Trust Pillars & Guarantees) */}
      <WhyChooseUs />

      {/* 9. Ideas for Beautiful Living (Editorial Journal) */}
      <InspirationSection />
    </main>
  );
}
