import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  MapPin, 
  Check, 
  Layers, 
  Ruler, 
  Sparkles, 
  Share2, 
  CreditCard,
  CheckCircle2,
  PackageCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/products/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    pincode, 
    pincodeCity, 
    checkPincode,
    addToast,
    products
  } = useShop();

  const sourceProducts = (products && products.length > 0) ? products : PRODUCTS;
  const product = sourceProducts.find(p => p.id === id) || sourceProducts[0];
  const inWishlist = isInWishlist(product.id);

  // Gallery active index
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedFinish, setSelectedFinish] = useState(product.finish);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs', 'dimensions', 'warranty', 'care'
  const [pincodeInput, setPincodeInput] = useState(pincode);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIdx(0);
    setSelectedFinish(product.finish);
  }, [id, product]);

  const handlePincodeSubmit = (e) => {
    e.preventDefault();
    checkPincode(pincodeInput);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedFinish);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast("Product link copied to clipboard!");
    }
  };

  // Magnifier effect
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`,
      backgroundImage: `url(${product.images[activeImageIdx] || product.images[0]})`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  // Related products from same category or room
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && (p.category === product.category || p.room === product.room)).slice(0, 4);

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      
      {/* 1. Breadcrumbs */}
      <div className="bg-[#F3EFEA] border-b border-[#E6DFD5] py-2.5">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center gap-1.5 text-xs text-[#5C5855]">
          <Link to="/" className="hover:text-[#3B2213]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C5835]" />
          <Link to={`/category/${product.category}`} className="hover:text-[#3B2213]">{product.categoryName}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C5835]" />
          <span className="font-semibold text-[#3B2213] truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* 2. Main Product Hero (Gallery + Purchase Panel) */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Gallery Column (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnails row/column */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[580px] shrink-0 scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 bg-white transition-all shrink-0 cursor-pointer ${
                    activeImageIdx === idx 
                      ? 'border-[#3B2213] ring-2 ring-[#3B2213]/20 shadow-md' 
                      : 'border-[#E6DFD5] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Stage Image with Zoom Preview */}
            <div className="relative flex-1 rounded-2xl overflow-hidden bg-white border border-[#E6DFD5] shadow-md aspect-4/3 sm:aspect-square">
              <img 
                src={product.images[activeImageIdx] || product.images[0]} 
                alt={product.name}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="w-full h-full object-cover cursor-crosshair"
              />

              {/* Magnifier Lens box */}
              <div 
                style={zoomStyle}
                className="absolute inset-0 pointer-events-none bg-no-repeat bg-[length:200%_200%] transition-opacity duration-150 z-20"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                {product.badge && (
                  <span className="px-3 py-1 bg-[#3B2213] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm">
                    {product.badge}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="px-3 py-1 bg-[#C85A32] text-white text-xs font-bold rounded-lg shadow-sm">
                    Save {product.discount}% Off
                  </span>
                )}
              </div>

              {/* Share & Wishlist button */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full bg-white/90 text-[#3B2213] hover:bg-white flex items-center justify-center shadow-md transition-colors"
                  title="Share product link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${
                    inWishlist ? 'bg-white text-[#C85A32]' : 'bg-white/90 text-[#5C5855] hover:text-[#C85A32]'
                  }`}
                  title={inWishlist ? "Saved to Wishlist" : "Save to Wishlist"}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#C85A32]' : ''}`} />
                </button>
              </div>

              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md pointer-events-none hidden sm:block">
                Hover cursor over image to zoom details
              </div>
            </div>

          </div>

          {/* Product Purchase Panel (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Room tag */}
              <div className="flex items-center justify-between text-xs text-[#8C5835] font-semibold tracking-wide uppercase">
                <span>{product.categoryName}</span>
                <span className="text-[#5C5855] font-normal">SKU: {product.id.toUpperCase()}</span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-4xl font-normal sm:font-medium text-[#1E1E1E] mt-2 leading-tight tracking-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 bg-[#556B2F] text-white px-2.5 py-1 rounded-md text-xs font-bold">
                  <span>{product.rating}</span>
                  <Star className="w-3.5 h-3.5 fill-white" />
                </div>
                <span className="text-xs text-[#5C5855] font-medium">
                  {product.reviewCount} Verified Owner Reviews
                </span>
                <span className="text-[#E6DFD5]">•</span>
                <span className="text-xs text-[#556B2F] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  In Stock & Ready
                </span>
              </div>

              {/* Price Box */}
              <div className="mt-5 p-4 bg-white rounded-2xl border border-[#E6DFD5] shadow-xs">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-[#3B2213]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-base text-[#5C5855] line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-[#C85A32] bg-[#C85A32]/10 px-2 py-0.5 rounded">
                    You Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({product.discount}%)
                  </span>
                </div>
                <p className="text-[11px] text-[#5C5855] mt-1.5">
                  Price inclusive of 18% GST. No hidden handling fees.
                </p>

                {/* EMI Indicator */}
                <div className="mt-3 pt-3 border-t border-[#F3EFEA] flex items-center gap-2 text-xs text-[#3B2213]">
                  <CreditCard className="w-4 h-4 text-[#8C5835]" />
                  <span>
                    No Cost EMI from <strong>₹{Math.round(product.price / 6).toLocaleString('en-IN')}/month</strong> on major cards.
                  </span>
                </div>
              </div>

              {/* Finish Selector */}
              <div className="mt-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3B2213] block mb-2">
                  Select Handcrafted Wood Finish: <strong className="text-[#8C5835] font-semibold">{selectedFinish}</strong>
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {["Warm Walnut", "Honey Teak", "Provincial Teak", "Natural Teak"].map((fin) => (
                    <button
                      key={fin}
                      onClick={() => setSelectedFinish(fin)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedFinish === fin
                          ? 'border-[#3B2213] bg-[#3B2213] text-white shadow-xs'
                          : 'border-[#D3C5B4] bg-white text-[#5C5855] hover:border-[#3B2213]'
                      }`}
                    >
                      {fin}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pincode & Delivery Checker */}
              <div className="mt-6 p-4 bg-[#F8F5F0] rounded-2xl border border-[#E6DFD5]">
                <div className="flex items-center justify-between text-xs font-bold text-[#3B2213] mb-2">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#8C5835]" />
                    <span>Delivery & Installation Availability</span>
                  </div>
                </div>

                <form onSubmit={handlePincodeSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value)}
                    maxLength={6}
                    placeholder="Enter 6-digit PIN code"
                    className="flex-1 px-3 py-2 text-xs bg-white border border-[#D3C5B4] rounded-lg focus:outline-none focus:border-[#3B2213]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#3B2213] text-white text-xs font-semibold rounded-lg hover:bg-[#54321D]"
                  >
                    Check
                  </button>
                </form>

                <div className="mt-2 text-xs text-[#556B2F] font-medium flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#556B2F]" />
                  <span>{pincodeCity}</span>
                </div>
                <p className="text-[11px] text-[#5C5855] mt-1">
                  Includes free doorstep transit, room-of-choice positioning, and technician assembly.
                </p>
              </div>

              {/* Quantity Selector & CTA Buttons */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#D3C5B4] rounded-xl overflow-hidden bg-white shadow-xs">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2.5 text-sm font-bold text-[#3B2213] hover:bg-[#FAF7F2]"
                    >
                      -
                    </button>
                    <span className="px-3.5 py-2.5 text-xs font-bold text-[#1E1E1E]">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2.5 text-sm font-bold text-[#3B2213] hover:bg-[#FAF7F2]"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => addToCart(product, quantity, selectedFinish)}
                    className="flex-1 py-3 px-5 bg-[#3B2213] hover:bg-[#54321D] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Cart</span>
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 px-5 bg-[#B4845C] hover:bg-[#8C5835] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <PackageCheck className="w-4 h-4" />
                  <span>Buy Now • Express Checkout</span>
                </button>
              </div>

              {/* Value propositions */}
              <div className="mt-6 pt-4 border-t border-[#E6DFD5] grid grid-cols-3 gap-2 text-center text-[11px] text-[#5C5855]">
                <div className="p-2 bg-white rounded-lg border border-[#E6DFD5]">
                  <ShieldCheck className="w-4 h-4 text-[#8C5835] mx-auto mb-1" />
                  <span className="font-semibold text-[#1E1E1E] block">10-Year Warranty</span>
                  <span>Structural Integrity</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-[#E6DFD5]">
                  <Truck className="w-4 h-4 text-[#8C5835] mx-auto mb-1" />
                  <span className="font-semibold text-[#1E1E1E] block">Free Assembly</span>
                  <span>Carpenter Included</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-[#E6DFD5]">
                  <RotateCcw className="w-4 h-4 text-[#8C5835] mx-auto mb-1" />
                  <span className="font-semibold text-[#1E1E1E] block">7-Day Return</span>
                  <span>Zero Risk Guarantee</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 3. Deep Specifications, Dimensions & Craftsmanship Tabs */}
        <div className="mt-16 bg-white rounded-3xl border border-[#E6DFD5] p-6 sm:p-10 shadow-xs">
          {/* Tabs bar */}
          <div className="flex items-center gap-2 border-b border-[#E6DFD5] pb-4 overflow-x-auto scrollbar-none">
            {[
              { id: 'specs', label: 'Specifications & Materials' },
              { id: 'dimensions', label: 'Dimensions & Weight' },
              { id: 'warranty', label: 'Warranty & Assembly' },
              { id: 'care', label: 'Solid Wood Care Guide' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#3B2213] text-white shadow-xs'
                    : 'text-[#5C5855] hover:text-[#1E1E1E] hover:bg-[#FAF7F2]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Specs */}
          {activeTab === 'specs' && (
            <div className="pt-6 animate-fade-in space-y-6">
              <p className="text-xs sm:text-sm text-[#5C5855] leading-relaxed">
                {product.description}
              </p>

              <div>
                <h4 className="font-serif text-sm font-bold text-[#1E1E1E] mb-3">Key Highlights:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#5C5855]">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#556B2F] shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-serif text-sm font-bold text-[#1E1E1E] mb-3">Technical Specifications:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {Object.entries(product.features).map(([key, val]) => (
                    <div key={key} className="p-3 bg-[#FAF7F2] rounded-xl flex justify-between">
                      <span className="text-[#5C5855]">{key}:</span>
                      <span className="font-semibold text-[#1E1E1E] text-right ml-4">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Dimensions */}
          {activeTab === 'dimensions' && (
            <div className="pt-6 animate-fade-in space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E6DFD5]">
                  <Ruler className="w-5 h-5 text-[#8C5835] mb-2" />
                  <span className="text-xs text-[#5C5855] block">Dimensions</span>
                  <span className="font-serif text-base font-bold text-[#1E1E1E]">{product.dimensions}</span>
                </div>
                <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E6DFD5]">
                  <Layers className="w-5 h-5 text-[#8C5835] mb-2" />
                  <span className="text-xs text-[#5C5855] block">Unit Weight</span>
                  <span className="font-serif text-base font-bold text-[#1E1E1E]">{product.weight}</span>
                </div>
                <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E6DFD5]">
                  <Truck className="w-5 h-5 text-[#8C5835] mb-2" />
                  <span className="text-xs text-[#5C5855] block">Packaging</span>
                  <span className="font-serif text-base font-bold text-[#1E1E1E]">3-Layer Foam & Wooden Crate</span>
                </div>
              </div>
              <p className="text-xs text-[#5C5855] mt-2 leading-relaxed">
                Tip: Please measure stairways, doorways, and elevator dimensions prior to ordering to ensure seamless room delivery.
              </p>
            </div>
          )}

          {/* Tab 3: Warranty */}
          {activeTab === 'warranty' && (
            <div className="pt-6 animate-fade-in space-y-4 text-xs sm:text-sm text-[#5C5855] leading-relaxed">
              <h4 className="font-serif text-base font-bold text-[#1E1E1E]">
                {product.warranty}
              </h4>
              <p>
                Our 10-Year Structural Warranty protects your investment against any timber seasoning defects, joint separation, and natural termite resistance under standard home use conditions.
              </p>
              <p>
                Complimentary assembly is conducted by Mukund Woodline certified technicians on the day of delivery. Any hydraulic mechanisms and moving hardware are demonstrated and safety-tested before handover.
              </p>
            </div>
          )}

          {/* Tab 4: Care */}
          {activeTab === 'care' && (
            <div className="pt-6 animate-fade-in space-y-3 text-xs sm:text-sm text-[#5C5855] leading-relaxed">
              <h4 className="font-serif text-base font-bold text-[#1E1E1E]">
                Natural Wood Preservation
              </h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Dust regularly using a clean, lint-free cotton cloth.</li>
                <li>Avoid prolonged direct exposure to intense harsh sunlight and rain moisture.</li>
                <li>Always use coasters under warm beverages and damp vases to protect the hand-rubbed finish.</li>
                <li>Treat with natural beeswax furniture polish once every 12 months to nourish the wood grain.</li>
              </ul>
            </div>
          )}
        </div>

        {/* 4. Related Handcrafted Furniture */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#E6DFD5]">
              <h3 className="font-serif text-2xl font-bold text-[#1E1E1E]">
                Complementary Furniture for Your Home
              </h3>
              <Link to="/shop" className="text-xs font-semibold text-[#8C5835] hover:text-[#3B2213]">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
