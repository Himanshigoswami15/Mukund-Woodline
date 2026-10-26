import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function QuickViewModal() {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    isInWishlist, 
    toggleWishlist 
  } = useShop();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0"
      />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10 border border-[#E6DFD5]">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 text-[#3B2213] hover:bg-[#3B2213] hover:text-white flex items-center justify-center shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Gallery */}
          <div className="p-6 bg-[#FAF7F2] border-r border-[#E6DFD5] flex flex-col justify-between">
            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-white border border-[#E6DFD5] shadow-inner mb-4">
              <img 
                src={product.images[activeImageIdx] || product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#3B2213] text-white text-[11px] font-semibold rounded shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail row */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIdx === idx ? 'border-[#3B2213] ring-2 ring-[#3B2213]/20' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[#E6DFD5] flex items-center justify-around text-[11px] text-[#5C5855]">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#8C5835]" />
                Free White-Glove Setup
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C5835]" />
                {product.warranty}
              </span>
            </div>
          </div>

          {/* Right Column: Product details */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#8C5835] font-semibold mb-1">
                {product.categoryName} • {product.room.replace('-', ' ')}
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1E1E1E] leading-snug">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 bg-[#556B2F] text-white px-2 py-0.5 rounded text-xs font-bold">
                  <span>{product.rating}</span>
                  <Star className="w-3 h-3 fill-white" />
                </div>
                <span className="text-xs text-[#5C5855]">
                  ({product.reviewCount} verified homeowner reviews)
                </span>
              </div>

              {/* Price section */}
              <div className="mt-4 p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E6DFD5]">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-[#3B2213]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-[#5C5855] line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-[#C85A32] bg-[#C85A32]/10 px-2 py-0.5 rounded">
                    Save {product.discount}%
                  </span>
                </div>
                <p className="text-[11px] text-[#5C5855] mt-1">
                  Inclusive of all taxes. Free doorstep white-glove installation included.
                </p>
                <div className="text-[11px] text-[#8C5835] font-medium mt-1">
                  No Cost EMI starts at ₹{Math.round(product.price / 6).toLocaleString('en-IN')}/month
                </div>
              </div>

              {/* Specifications preview */}
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#F3EFEA]">
                  <span className="text-[#5C5855]">Primary Material:</span>
                  <span className="font-semibold text-[#1E1E1E]">{product.material}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F3EFEA]">
                  <span className="text-[#5C5855]">Finish:</span>
                  <span className="font-semibold text-[#1E1E1E]">{product.finish}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F3EFEA]">
                  <span className="text-[#5C5855]">Dimensions:</span>
                  <span className="font-semibold text-[#1E1E1E]">{product.dimensions}</span>
                </div>
              </div>

              <p className="mt-3 text-xs text-[#5C5855] line-clamp-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Actions: Quantity & Add to Cart */}
            <div className="mt-6 pt-4 border-t border-[#E6DFD5] space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#D3C5B4] rounded-lg overflow-hidden bg-white">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-sm font-semibold hover:bg-[#FAF7F2] text-[#3B2213]"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-[#1E1E1E]">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-sm font-semibold hover:bg-[#FAF7F2] text-[#3B2213]"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#3B2213] hover:bg-[#54321D] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart • ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2.5 rounded-lg border transition-colors ${
                    inWishlist 
                      ? 'border-[#C85A32] bg-[#C85A32]/10 text-[#C85A32]' 
                      : 'border-[#D3C5B4] hover:border-[#3B2213] text-[#5C5855]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#C85A32]' : ''}`} />
                </button>
              </div>

              <div className="text-center">
                <Link
                  to={`/product/${product.id}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#8C5835] hover:text-[#3B2213] transition-colors"
                >
                  <span>View Full Product Specifications & Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
