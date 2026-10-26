import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function ProductCard({ product }) {
  const { addToCart, isInWishlist, toggleWishlist, setQuickViewProduct } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const inWishlist = isInWishlist(product.id);

  // Secondary image on hover if available
  const displayImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <div 
      className="group bg-white rounded-xl border border-[#E6DFD5] overflow-hidden hover:shadow-xl hover:border-[#8C5835]/40 transition-all duration-300 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Badges & Actions */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#FAF7F2]">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img 
            src={displayImage} 
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.badge && (
            <span className="px-2 py-0.5 bg-[#3B2213] text-white text-[9.5px] font-medium tracking-wider uppercase rounded shadow-xs">
              {product.badge}
            </span>
          )}
          {product.discount > 0 && (
            <span className="px-2 py-0.5 bg-[#C85A32] text-white text-[9.5px] font-semibold tracking-wider rounded shadow-xs">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Top Right Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            inWishlist 
              ? 'bg-white text-[#C85A32] shadow-md' 
              : 'bg-white/85 text-[#5C5855] hover:text-[#C85A32] hover:bg-white shadow-xs'
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#C85A32]' : ''}`} />
        </button>

        {/* Quick View Button (Reveals on card hover) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setQuickViewProduct(product);
          }}
          className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-3.5 py-1.5 bg-white/95 hover:bg-[#3B2213] text-[#3B2213] hover:text-white rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Finish info */}
          <div className="flex items-center justify-between text-[11px] text-[#8C5835] font-medium mb-1">
            <span className="truncate">{product.categoryName}</span>
            <span className="text-[#5C5855] text-[10px] truncate max-w-[110px]">{product.finish}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-[15px] font-medium text-[#1E1E1E] group-hover:text-[#8C5835] transition-colors line-clamp-2 leading-snug">
            <Link to={`/product/${product.id}`}>
              {product.name}
            </Link>
          </h3>

          {/* Material description snippet */}
          <p className="text-[11px] text-[#5C5855] mt-1 line-clamp-1">
            {product.material}
          </p>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center gap-0.5 bg-[#556B2F] text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
              <span>{product.rating}</span>
              <Star className="w-2.5 h-2.5 fill-white" />
            </div>
            <span className="text-[11px] text-[#5C5855]">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Price & Add to Cart footer */}
        <div className="mt-3 pt-3 border-t border-[#F3EFEA] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#3B2213]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#5C5855] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] text-[#556B2F] font-medium flex items-center gap-0.5 mt-0.5">
              <Check className="w-3 h-3 text-[#556B2F]" />
              Free Doorstep Assembly
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="p-2 bg-[#FAF7F2] hover:bg-[#3B2213] text-[#3B2213] hover:text-white border border-[#D3C5B4] hover:border-[#3B2213] rounded-lg transition-colors shadow-xs"
            title="Add to cart"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
