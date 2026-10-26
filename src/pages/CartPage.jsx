import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Tag, 
  ChevronRight,
  Check,
  X
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function CartPage() {
  const navigate = useNavigate();
  const { 
    cart, 
    cartCount, 
    cartSubtotal, 
    cartOriginalTotal, 
    totalSavings, 
    shippingFee, 
    orderTotal, 
    appliedCoupon, 
    couponDiscountAmount, 
    couponError, 
    applyCoupon, 
    removeCoupon, 
    updateQuantity, 
    removeFromCart, 
    freeShippingThreshold, 
    amountNeededForFreeShipping 
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  if (cartCount === 0) {
    return (
      <div className="bg-[#FAF7F2] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-3xl border border-[#E6DFD5] p-8 sm:p-12 max-w-md w-full text-center space-y-4 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-[#FAF7F2] text-[#8C5835] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1E1E1E]">Your Shopping Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-[#5C5855] leading-relaxed">
            Looks like you haven't added any handcrafted furniture to your cart yet. Explore our solid Sheesham beds, Chesterfield sofas, and dining sets!
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#3B2213] hover:bg-[#54321D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
            >
              <span>Explore Furniture Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      
      {/* 1. Breadcrumbs */}
      <div className="bg-[#F3EFEA] border-b border-[#E6DFD5] py-2.5">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center gap-1.5 text-xs text-[#5C5855]">
          <Link to="/" className="hover:text-[#3B2213]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C5835]" />
          <span className="font-semibold text-[#3B2213]">Shopping Cart ({cartCount} Items)</span>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E6DFD5]">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E1E]">
              Your Shopping Cart
            </h1>
            <p className="text-xs text-[#5C5855] mt-1">
              Handcrafted solid timber furniture ready for white-glove doorstep delivery.
            </p>
          </div>
          <Link to="/shop" className="text-xs font-semibold text-[#8C5835] hover:text-[#3B2213]">
            ← Continue Shopping
          </Link>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="mt-6 p-4 bg-white rounded-2xl border border-[#E6DFD5] shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-[#3B2213] mb-2">
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#8C5835]" />
              <span>
                {amountNeededForFreeShipping === 0 
                  ? "🎉 You have qualified for FREE White-Glove Installation & Delivery!" 
                  : `Add ₹${amountNeededForFreeShipping.toLocaleString('en-IN')} more to unlock FREE White-Glove Delivery`}
              </span>
            </div>
            <span className="text-[#8C5835] font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#FAF7F2] h-2.5 rounded-full overflow-hidden border border-[#E6DFD5]">
            <div 
              className="bg-[#556B2F] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Main Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Cart Items List (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div 
                key={`${item.product.id}-${item.selectedFinish}`}
                className="bg-white rounded-2xl border border-[#E6DFD5] p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row gap-4 sm:gap-6 items-start"
              >
                {/* Thumbnail */}
                <Link to={`/product/${item.product.id}`} className="w-full sm:w-32 aspect-4/3 sm:aspect-square rounded-xl overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#E6DFD5]">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C5835]">
                          {item.product.categoryName}
                        </span>
                        <h3 className="font-serif text-sm sm:text-base font-bold text-[#1E1E1E] hover:text-[#8C5835]">
                          <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                        </h3>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedFinish)}
                        className="text-[#5C5855] hover:text-[#C85A32] p-1.5 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#5C5855]">
                      <span>Finish: <strong className="text-[#1E1E1E]">{item.selectedFinish}</strong></span>
                      <span>Warranty: <strong className="text-[#1E1E1E]">{item.product.warranty}</strong></span>
                    </div>

                    <div className="mt-2 text-[11px] text-[#556B2F] flex items-center gap-1 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>Ready for dispatch in {item.product.deliveryDays} business days</span>
                    </div>
                  </div>

                  {/* Quantity & Item Total */}
                  <div className="mt-4 pt-3 border-t border-[#F3EFEA] flex items-center justify-between">
                    <div className="flex items-center border border-[#D3C5B4] rounded-lg overflow-hidden bg-[#FAF7F2]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedFinish)}
                        className="px-2.5 py-1 text-xs font-bold hover:bg-[#E6DFD5] text-[#3B2213]"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-[#1E1E1E]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedFinish)}
                        className="px-2.5 py-1 text-xs font-bold hover:bg-[#E6DFD5] text-[#3B2213]"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-bold text-[#3B2213]">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-[#5C5855] line-through">
                          ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#C85A32] font-semibold">
                        Saved ₹{((item.product.originalPrice - item.product.price) * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Order Summary & Coupon (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Coupon Box */}
            <div className="bg-white rounded-2xl border border-[#E6DFD5] p-5 shadow-xs">
              <h4 className="font-serif text-sm font-bold text-[#1E1E1E] mb-2 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-[#8C5835]" />
                <span>Apply Promo Code</span>
              </h4>

              {appliedCoupon ? (
                <div className="p-3 bg-[#556B2F]/10 border border-[#556B2F]/30 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#556B2F]">{appliedCoupon.code}</span>
                    <p className="text-[11px] text-[#5C5855]">{appliedCoupon.description}</p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="p-1 text-[#C85A32] hover:bg-white rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="e.g. WOODLINE10"
                      className="flex-1 px-3 py-2 text-xs uppercase bg-[#FAF7F2] border border-[#D3C5B4] rounded-lg focus:outline-none focus:border-[#3B2213]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#3B2213] text-white text-xs font-semibold rounded-lg hover:bg-[#54321D]"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-[#C85A32]">{couponError}</p>
                  )}
                  <div className="pt-1 flex flex-wrap gap-2 text-[10px]">
                    <span 
                      onClick={() => applyCoupon('WOODLINE10')} 
                      className="px-2 py-0.5 rounded bg-[#FAF7F2] border border-[#D3C5B4] text-[#8C5835] cursor-pointer hover:bg-[#E6DFD5]"
                    >
                      Use <strong>WOODLINE10</strong> (10% Off)
                    </span>
                    <span 
                      onClick={() => applyCoupon('FESTIVE2500')} 
                      className="px-2 py-0.5 rounded bg-[#FAF7F2] border border-[#D3C5B4] text-[#8C5835] cursor-pointer hover:bg-[#E6DFD5]"
                    >
                      Use <strong>FESTIVE2500</strong> (₹2,500 Off)
                    </span>
                  </div>
                </form>
              )}
            </div>

            {/* Bill Summary */}
            <div className="bg-white rounded-2xl border border-[#E6DFD5] p-5 shadow-xs space-y-3.5">
              <h4 className="font-serif text-sm font-bold text-[#1E1E1E] pb-2 border-b border-[#E6DFD5]">
                Order Bill Summary
              </h4>

              <div className="flex justify-between text-xs text-[#5C5855]">
                <span>Items Subtotal ({cartCount} items):</span>
                <span className="font-semibold text-[#1E1E1E]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {totalSavings > 0 && (
                <div className="flex justify-between text-xs text-[#556B2F]">
                  <span>Product Catalog Discounts:</span>
                  <span className="font-semibold">-₹{totalSavings.toLocaleString('en-IN')}</span>
                </div>
              )}

              {appliedCoupon && couponDiscountAmount > 0 && (
                <div className="flex justify-between text-xs text-[#556B2F]">
                  <span>Coupon ({appliedCoupon.code}):</span>
                  <span className="font-semibold">-₹{couponDiscountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-xs text-[#5C5855]">
                <span>White-Glove Delivery & Assembly:</span>
                <span className={`font-semibold ${shippingFee === 0 ? 'text-[#556B2F]' : 'text-[#1E1E1E]'}`}>
                  {shippingFee === 0 ? "FREE" : `₹${shippingFee.toLocaleString('en-IN')}`}
                </span>
              </div>

              <div className="pt-3 border-t border-[#E6DFD5] flex justify-between items-baseline">
                <div>
                  <span className="font-serif text-sm font-bold text-[#1E1E1E] block">Total Amount</span>
                  <span className="text-[10px] text-[#5C5855]">Inclusive of all taxes & insurance</span>
                </div>
                <span className="font-serif text-2xl font-bold text-[#3B2213]">
                  ₹{orderTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full mt-4 py-3.5 px-6 bg-[#3B2213] hover:bg-[#54321D] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Proceed to Delivery & Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-3 text-center text-[11px] text-[#5C5855] flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#556B2F]" />
                <span>256-Bit SSL Encrypted Checkout Guarantee</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
