import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, ChevronRight, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      
      {/* Breadcrumbs */}
      <div className="bg-[#F3EFEA] border-b border-[#E6DFD5] py-2.5">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center gap-1.5 text-xs text-[#5C5855]">
          <Link to="/" className="hover:text-[#3B2213]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C5835]" />
          <span className="font-semibold text-[#3B2213]">My Wishlist</span>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E6DFD5]">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E1E]">
              My Saved Furniture Wishlist
            </h1>
            <p className="text-xs text-[#5C5855] mt-1">
              Keep track of designs you love and order when ready.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-white border border-[#E6DFD5] rounded-full text-[#3B2213]">
            {wishlistProducts.length} Saved {wishlistProducts.length === 1 ? 'Design' : 'Designs'}
          </span>
        </div>

        {wishlistProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <div 
                key={product.id}
                className="group bg-white rounded-2xl border border-[#E6DFD5] overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative aspect-4/3 bg-[#FAF7F2] overflow-hidden">
                  <Link to={`/product/${product.id}`}>
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#C85A32] flex items-center justify-center shadow-md transition-colors"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {product.discount > 0 && (
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#C85A32] text-white text-[10px] font-bold rounded">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                {/* Info & Move to Cart */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8C5835] block">
                      {product.categoryName}
                    </span>
                    <h3 className="font-serif text-sm font-bold text-[#1E1E1E] group-hover:text-[#8C5835] mt-0.5 line-clamp-2">
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </h3>
                    <p className="text-[11px] text-[#5C5855] mt-1">{product.material}</p>
                    
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-base font-bold text-[#3B2213]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-[#5C5855] line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F3EFEA]">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-full py-2 px-3 bg-[#3B2213] hover:bg-[#54321D] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Shopping Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 bg-white rounded-3xl border border-[#E6DFD5] p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#8C5835] flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1E1E1E]">Your Wishlist is Empty</h3>
            <p className="text-xs text-[#5C5855] leading-relaxed">
              Explore our handcrafted collections and click the heart icon on any product to save it to your wishlist.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#3B2213] text-white rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                <span>Browse Furniture Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
