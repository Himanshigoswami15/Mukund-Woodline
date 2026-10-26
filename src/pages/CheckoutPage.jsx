import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Truck, 
  MapPin, 
  CreditCard, 
  QrCode, 
  Building2, 
  Check, 
  Lock, 
  ArrowRight,
  ChevronRight,
  Info
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { 
    cart, 
    cartSubtotal, 
    shippingFee, 
    couponDiscountAmount, 
    appliedCoupon, 
    orderTotal, 
    user, 
    addresses, 
    placeOrder, 
    addToast 
  } = useShop();

  // Contact Form state
  const [formData, setFormData] = useState({
    fullName: user?.name || "Vikram Malhotra",
    email: user?.email || "vikram.m@example.com",
    phone: user?.phone || "+91 98201 44521",
    addressLine: addresses[0]?.addressLine || "Flat 402, Royal Palms Residency, 14th Main, Indiranagar",
    city: addresses[0]?.city || "Bengaluru",
    state: addresses[0]?.state || "Karnataka",
    pincode: addresses[0]?.pincode || "560038",
    landmark: "Near BDA Complex",
    assemblyNotes: "Please deliver to 4th floor; service lift available.",
    paymentMethod: "upi" // 'upi', 'card', 'netbanking', 'cod'
  });

  const [upiId, setUpiId] = useState('vikram@okaxis');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="bg-[#FAF7F2] min-h-[60vh] flex items-center justify-center py-16 px-4">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#1E1E1E]">Your Cart is Empty</h2>
          <p className="text-xs text-[#5C5855]">Add furniture before proceeding to checkout.</p>
          <Link to="/shop" className="px-6 py-2.5 bg-[#3B2213] text-white text-xs font-semibold rounded-lg inline-block">
            Explore Furniture
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (isSubmitting) return;

    if (!formData.fullName.trim() || !formData.addressLine.trim() || !formData.pincode.trim()) {
      addToast("Please fill in your recipient name, address and postal pincode.", "error");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const order = placeOrder({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.addressLine}, ${formData.landmark ? formData.landmark + ', ' : ''}${formData.city}, ${formData.state} - ${formData.pincode}`,
        paymentMethod: formData.paymentMethod.toUpperCase()
      });

      setIsSubmitting(false);
      navigate(`/order-success/${order.orderId}`);
    }, 600);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      
      {/* Breadcrumbs */}
      <div className="bg-[#F3EFEA] border-b border-[#E6DFD5] py-2.5">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center gap-1.5 text-xs text-[#5C5855]">
          <Link to="/cart" className="hover:text-[#3B2213]">Cart</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C5835]" />
          <span className="font-semibold text-[#3B2213]">Secure Checkout</span>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E6DFD5]">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E1E]">
              Checkout & Delivery Information
            </h1>
            <p className="text-xs text-[#5C5855] mt-1">
              White-Glove Doorstep Delivery & Certified Carpenter Assembly.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#556B2F]">
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit SSL Secured</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Columns (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Customer Details */}
            <div className="bg-white rounded-2xl border border-[#E6DFD5] p-6 shadow-xs space-y-4">
              <h3 className="font-serif text-base font-bold text-[#1E1E1E] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#3B2213] text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>Contact Details for Order Updates</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs border border-[#D3C5B4] rounded-lg focus:outline-none focus:border-[#3B2213]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">Mobile Number (for SMS & OTP)</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs border border-[#D3C5B4] rounded-lg focus:outline-none focus:border-[#3B2213]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">Email Address (for tax invoice & warranty card)</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs border border-[#D3C5B4] rounded-lg focus:outline-none focus:border-[#3B2213]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="bg-white rounded-2xl border border-[#E6DFD5] p-6 shadow-xs space-y-4">
              <h3 className="font-serif text-base font-bold text-[#1E1E1E] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#3B2213] text-white text-xs flex items-center justify-center font-bold">2</span>
                <span>White-Glove Delivery & Assembly Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">Flat / House No. / Building / Street Address</label>
                  <input
                    type="text"
                    required
                    name="addressLine"
                    value={formData.addressLine}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs border border-[#D3C5B4] rounded-lg focus:outline-none focus:border-[#3B2213]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">Landmark</label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs border border-[#D3C5B4] rounded-lg focus:outline-none focus:border-[#3B2213]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">City</label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs border border-[#D3C5B4] rounded-lg focus:outline-none focus:border-[#3B2213]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">State</label>
                  <input
                    type="text"
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs border border-[#D3C5B4] rounded-lg focus:outline-none focus:border-[#3B2213]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">Postal PIN Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs border border-[#D3C5B4] rounded-lg focus:outline-none focus:border-[#3B2213]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">Carpentry & Assembly Notes (Optional)</label>
                  <input
                    type="text"
                    name="assemblyNotes"
                    placeholder="e.g. Please call 1 hour before arrival; assemble in master bedroom"
                    value={formData.assemblyNotes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs border border-[#D3C5B4] rounded-lg focus:outline-none focus:border-[#3B2213]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Options */}
            <div className="bg-white rounded-2xl border border-[#E6DFD5] p-6 shadow-xs space-y-4">
              <h3 className="font-serif text-base font-bold text-[#1E1E1E] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#3B2213] text-white text-xs flex items-center justify-center font-bold">3</span>
                <span>Select Payment Method</span>
              </h3>

              <div className="space-y-3">
                
                {/* UPI Option */}
                <label className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'upi' ? 'border-[#3B2213] bg-[#FAF7F2] ring-1 ring-[#3B2213]' : 'border-[#E6DFD5] bg-white'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleInputChange}
                        className="text-[#3B2213] focus:ring-[#3B2213]"
                      />
                      <QrCode className="w-5 h-5 text-[#8C5835]" />
                      <div>
                        <span className="text-xs font-bold text-[#1E1E1E] block">UPI / Instant QR Code</span>
                        <span className="text-[11px] text-[#5C5855]">Google Pay, PhonePe, Paytm, BHIM UPI</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#556B2F] bg-[#556B2F]/10 px-2 py-0.5 rounded">Fastest</span>
                  </div>

                  {formData.paymentMethod === 'upi' && (
                    <div className="mt-3 pt-3 border-t border-[#E6DFD5] text-xs">
                      <label className="block text-[11px] font-semibold text-[#5C5855] mb-1">Enter your Virtual Payment Address (UPI ID):</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="w-full sm:w-72 px-3 py-1.5 text-xs bg-white border border-[#D3C5B4] rounded focus:outline-none focus:border-[#3B2213]"
                      />
                    </div>
                  )}
                </label>

                {/* Cards Option */}
                <label className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'card' ? 'border-[#3B2213] bg-[#FAF7F2] ring-1 ring-[#3B2213]' : 'border-[#E6DFD5] bg-white'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="text-[#3B2213] focus:ring-[#3B2213]"
                    />
                    <CreditCard className="w-5 h-5 text-[#8C5835]" />
                    <div>
                      <span className="text-xs font-bold text-[#1E1E1E] block">Credit / Debit Card & No Cost EMI</span>
                      <span className="text-[11px] text-[#5C5855]">Visa, MasterCard, RuPay, Amex</span>
                    </div>
                  </div>
                </label>

                {/* Netbanking Option */}
                <label className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'netbanking' ? 'border-[#3B2213] bg-[#FAF7F2] ring-1 ring-[#3B2213]' : 'border-[#E6DFD5] bg-white'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="netbanking"
                      checked={formData.paymentMethod === 'netbanking'}
                      onChange={handleInputChange}
                      className="text-[#3B2213] focus:ring-[#3B2213]"
                    />
                    <Building2 className="w-5 h-5 text-[#8C5835]" />
                    <div>
                      <span className="text-xs font-bold text-[#1E1E1E] block">Net Banking</span>
                      <span className="text-[11px] text-[#5C5855]">HDFC, ICICI, SBI, Axis, Kotak & 50+ Indian banks</span>
                    </div>
                  </div>
                </label>

                {/* Cash on Delivery Option */}
                <label className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'cod' ? 'border-[#3B2213] bg-[#FAF7F2] ring-1 ring-[#3B2213]' : 'border-[#E6DFD5] bg-white'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="text-[#3B2213] focus:ring-[#3B2213]"
                    />
                    <Truck className="w-5 h-5 text-[#8C5835]" />
                    <div>
                      <span className="text-xs font-bold text-[#1E1E1E] block">Cash on Delivery / Card on Delivery</span>
                      <span className="text-[11px] text-[#5C5855]">Pay securely to our delivery technician after inspection</span>
                    </div>
                  </div>
                </label>

              </div>
            </div>

          </div>

          {/* Right Column: Order Review & Submit (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E6DFD5] p-6 shadow-xs sticky top-28 space-y-4">
              <h3 className="font-serif text-base font-bold text-[#1E1E1E] pb-3 border-b border-[#E6DFD5]">
                Order Summary ({cart.length} Products)
              </h3>

              {/* Items mini list */}
              <div className="divide-y divide-[#F3EFEA] max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.selectedFinish}`} className="py-2.5 flex items-center gap-3 text-xs">
                    <img 
                      src={item.product.images[0]} 
                      alt="" 
                      className="w-12 h-12 rounded-lg object-cover border border-[#E6DFD5] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-[#1E1E1E] truncate block">{item.product.name}</span>
                      <span className="text-[11px] text-[#5C5855]">Qty: {item.quantity} • {item.selectedFinish}</span>
                    </div>
                    <span className="font-bold text-[#3B2213] shrink-0">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="pt-3 border-t border-[#E6DFD5] space-y-2 text-xs">
                <div className="flex justify-between text-[#5C5855]">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-[#1E1E1E]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {couponDiscountAmount > 0 && (
                  <div className="flex justify-between text-[#556B2F]">
                    <span>Coupon Savings:</span>
                    <span className="font-semibold">-₹{couponDiscountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#5C5855]">
                  <span>Doorstep White-Glove Shipping:</span>
                  <span className="font-semibold text-[#556B2F]">
                    {shippingFee === 0 ? "FREE" : `₹${shippingFee.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="flex justify-between text-[#5C5855]">
                  <span>Technician Assembly & Packaging Removal:</span>
                  <span className="font-semibold text-[#556B2F]">FREE</span>
                </div>

                <div className="pt-3 border-t border-[#E6DFD5] flex justify-between items-baseline">
                  <span className="font-serif text-base font-bold text-[#1E1E1E]">Grand Total</span>
                  <span className="font-serif text-2xl font-bold text-[#3B2213]">
                    ₹{orderTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-[#3B2213] hover:bg-[#54321D] disabled:bg-[#5C5855] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Processing Your Furniture Order...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirm Order & Pay ₹{orderTotal.toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E6DFD5] flex items-center gap-2 text-[11px] text-[#5C5855]">
                <Info className="w-4 h-4 text-[#8C5835] shrink-0" />
                <span>Prototype Mode: Simulated Indian merchant gateway transaction. No live charge applied.</span>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
