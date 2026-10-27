import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  SlidersHorizontal, 
  Grid3X3, 
  LayoutGrid, 
  X,
  Search,
  Sparkles
} from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import { PRODUCTS, CATEGORIES, ROOMS } from '../data/products';
import { useShop } from '../context/ShopContext';

export default function ProductListingPage() {
  const { categories, products } = useShop();
  const sourceCategories = (categories && categories.length > 0) ? categories : CATEGORIES;
  const sourceProducts = (products && products.length > 0) ? products : PRODUCTS;

  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get('search');
  const subParam = searchParams.get('sub');
  const tagParam = searchParams.get('tag');

  // Filter state
  const [filters, setFilters] = useState({
    priceRange: null,
    materials: [],
    finishes: [],
    minRating: 0,
    inStockOnly: false
  });

  // Sorting state
  const [sortBy, setSortBy] = useState('popularity'); // 'popularity', 'price-asc', 'price-desc', 'rating', 'newest'
  
  // Mobile filter drawer state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // View mode
  const [viewMode, setViewMode] = useState('grid'); // 'grid' (4 cols) or 'large' (3 cols)

  // Items to show (for Load More)
  const [visibleCount, setVisibleCount] = useState(8);

  // Identify category or room from dynamic categories
  const matchedCategory = sourceCategories.find(c => 
    c.slug === slug || 
    c.id === slug ||
    (c.name && c.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === slug)
  );
  const matchedRoom = ROOMS.find(r => r.slug === slug);

  // Title and subtitle
  let pageTitle = "All Solid Wood Furniture";
  let pageDescription = "Explore our heirloom-grade handcrafted solid Sheesham, Teak, and Mango wood furniture collections.";

  if (matchedCategory) {
    pageTitle = matchedCategory.name;
    pageDescription = matchedCategory.tagline || `Explore our heirloom-grade handcrafted solid wood ${matchedCategory.name} collection.`;
  } else if (matchedRoom) {
    pageTitle = `${matchedRoom.name} Furniture`;
    pageDescription = matchedRoom.description;
  } else if (searchParam) {
    pageTitle = `Search Results for "${searchParam}"`;
    pageDescription = `Showing available solid wood pieces matching your inquiry.`;
  } else if (tagParam === 'bestseller') {
    pageTitle = "Bestselling Wooden Furniture";
    pageDescription = "Our highest rated and most celebrated solid wood designs across India.";
  } else if (tagParam === 'new-arrival') {
    pageTitle = "New Season Arrivals";
    pageDescription = "Freshly handcrafted designs blending timeless heritage with modern aesthetics.";
  }

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...sourceProducts];

    // Category / Room / Search filter
    if (matchedCategory) {
      const catId = (matchedCategory.id || '').toLowerCase();
      const catSlug = (matchedCategory.slug || '').toLowerCase();
      const catName = (matchedCategory.name || '').toLowerCase();
      const catClean = catName.replace(/[^a-z0-9]/g, '');

      result = result.filter(p => {
        const pCat = (p.category || '').toLowerCase();
        const pCatName = (p.categoryName || '').toLowerCase();
        const pName = (p.name || '').toLowerCase();
        const pRoom = (p.room || '').toLowerCase();

        // Exact category ID or slug
        if (pCat === catId || pCat === catSlug) return true;

        // Subcategory match
        if (matchedCategory.subcategories && matchedCategory.subcategories.length > 0) {
          const matchSub = matchedCategory.subcategories.some(sub => {
            const sName = (typeof sub === 'string' ? sub : sub.name || '').toLowerCase();
            return sName && (pCatName.includes(sName) || pName.includes(sName));
          });
          if (matchSub) return true;
        }

        // Fuzzy match on dining / dinning or name keywords
        if (pCatName.includes(catName) || (catName.length > 3 && pCatName.includes(catName.substring(0, 4)))) return true;
        if (catClean.includes('din') && (pName.includes('din') || pCatName.includes('din'))) return true;
        if (pRoom === catId || pRoom === catSlug) return true;

        return false;
      });
    } else if (matchedRoom) {
      result = result.filter(p => p.room === matchedRoom.id);
    } else if (searchParam) {
      const q = searchParam.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.room.toLowerCase().includes(q)
      );
    }

    // Subcategory param
    if (subParam) {
      result = result.filter(p => 
        p.categoryName.toLowerCase().includes(subParam.toLowerCase()) ||
        p.name.toLowerCase().includes(subParam.toLowerCase())
      );
    }

    // Tag param
    if (tagParam === 'bestseller') {
      result = result.filter(p => p.badge === 'Bestseller' || p.rating >= 4.8);
    } else if (tagParam === 'new-arrival') {
      result = result.filter(p => p.badge === 'New Arrival' || p.discount >= 30);
    }

    // Price Range filter
    if (filters.priceRange) {
      result = result.filter(p => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max);
    }

    // Materials filter
    if (filters.materials.length > 0) {
      result = result.filter(p => filters.materials.some(m => p.material.toLowerCase().includes(m.toLowerCase())));
    }

    // Finishes filter
    if (filters.finishes.length > 0) {
      result = result.filter(p => filters.finishes.some(f => p.finish.toLowerCase().includes(f.toLowerCase())));
    }

    // Rating filter
    if (filters.minRating > 0) {
      result = result.filter(p => p.rating >= filters.minRating);
    }

    // In Stock filter
    if (filters.inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.badge === 'New Arrival' ? 1 : 0) - (a.badge === 'New Arrival' ? 1 : 0));
        break;
      case 'popularity':
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [slug, searchParam, subParam, tagParam, filters, sortBy, matchedCategory, matchedRoom]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      
      {/* 1. Breadcrumbs */}
      <div className="bg-[#F3EFEA] border-b border-[#E6DFD5] py-2.5">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center gap-1.5 text-xs text-[#5C5855]">
          <Link to="/" className="hover:text-[#3B2213]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C5835]" />
          <Link to="/shop" className="hover:text-[#3B2213]">Shop</Link>
          {matchedCategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-[#8C5835]" />
              <span className="font-semibold text-[#3B2213]">{matchedCategory.name}</span>
            </>
          )}
          {matchedRoom && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-[#8C5835]" />
              <span className="font-semibold text-[#3B2213]">{matchedRoom.name}</span>
            </>
          )}
          {searchParam && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-[#8C5835]" />
              <span className="font-semibold text-[#3B2213]">Search: {searchParam}</span>
            </>
          )}
        </div>
      </div>

      {/* 2. Collection Banner & Intro */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-8 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E6DFD5]">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#1E1E1E]">
                {pageTitle}
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E6DFD5] text-[#3B2213] font-semibold">
                {filteredProducts.length} Items
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#5C5855] mt-1.5 max-w-2xl leading-relaxed">
              {pageDescription}
            </p>
          </div>

          {/* Quick Subcategory tags if applicable */}
          {matchedCategory && (
            <div className="flex flex-wrap gap-1.5">
              {matchedCategory.subcategories.slice(0, 4).map((sub, i) => (
                <Link
                  key={i}
                  to={`/category/${matchedCategory.slug}?sub=${encodeURIComponent(sub.name)}`}
                  className={`px-3 py-1 rounded-full text-xs transition-colors border ${
                    subParam === sub.name 
                      ? 'bg-[#3B2213] text-white border-[#3B2213]' 
                      : 'bg-white text-[#5C5855] hover:text-[#3B2213] border-[#E6DFD5]'
                  }`}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* 3. Toolbar: Mobile Filter Button, Sorting, View Mode */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-[#E6DFD5] shadow-xs">
          
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-1.5 bg-[#FAF7F2] border border-[#D3C5B4] text-[#3B2213] text-xs font-semibold rounded-lg"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C5835]" />
            <span>Filter Results</span>
          </button>

          {/* Product count indicator for desktop */}
          <div className="hidden lg:block text-xs text-[#5C5855]">
            Showing <strong>1 - {Math.min(visibleCount, filteredProducts.length)}</strong> of <strong>{filteredProducts.length}</strong> handcrafted designs
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs text-[#5C5855] whitespace-nowrap">Sort By:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold text-[#1E1E1E] bg-[#FAF7F2] border border-[#D3C5B4] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#3B2213] cursor-pointer"
              >
                <option value="popularity">Popularity (Most Reviewed)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

            {/* View Grid Switcher */}
            <div className="hidden sm:flex items-center border border-[#D3C5B4] rounded-lg overflow-hidden bg-[#FAF7F2]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-[#3B2213] text-white' : 'text-[#5C5855] hover:text-[#1E1E1E]'}`}
                title="4 Columns Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('large')}
                className={`p-1.5 transition-colors ${viewMode === 'large' ? 'bg-[#3B2213] text-white' : 'text-[#5C5855] hover:text-[#1E1E1E]'}`}
                title="3 Columns Grid"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Main Catalog Section: Sidebar + Product Grid */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <ProductFilters 
                filters={filters} 
                setFilters={setFilters} 
                totalResults={filteredProducts.length} 
              />
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {displayedProducts.length > 0 ? (
              <>
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1 sm:grid-cols-2'
                }`}>
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {visibleCount < filteredProducts.length && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 6)}
                      className="px-8 py-3 bg-white hover:bg-[#3B2213] text-[#3B2213] hover:text-white border border-[#3B2213] rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xs"
                    >
                      Load More Furniture ({filteredProducts.length - visibleCount} Remaining)
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#E6DFD5] space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#8C5835] flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1E1E1E]">No Products Matched Your Criteria</h3>
                <p className="text-xs text-[#5C5855] max-w-md mx-auto">
                  Try clearing some of your filters or searching with a broader keyword like "sofa", "bed", or "dining table".
                </p>
                <button
                  onClick={() => setFilters({ priceRange: null, materials: [], finishes: [], minRating: 0, inStockOnly: false })}
                  className="px-6 py-2.5 bg-[#3B2213] text-white text-xs font-semibold rounded-lg hover:bg-[#54321D]"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 5. Mobile Slide-in Filters Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden animate-fade-in">
          <div 
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative ml-auto w-4/5 max-w-sm bg-white h-full shadow-2xl p-5 overflow-y-auto z-10">
            <ProductFilters 
              filters={filters} 
              setFilters={setFilters} 
              totalResults={filteredProducts.length}
              onCloseMobile={() => setIsMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
}
