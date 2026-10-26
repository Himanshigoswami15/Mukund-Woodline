import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Calendar, 
  ArrowRight, 
  Printer, 
  Phone, 
  MapPin,
  Clock
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function OrderSuccessPage() {
  const { orderId } = useParams();
  const { orders } = useShop();

  const order = orders.find(o => o.orderId === orderId) || orders[0] || {
    orderId: orderId || "MW-2026-99231",
    date: new Date().toLocaleDateString('en-GB'),
    total: 46999,
    deliveryAddress: "Flat 402, Royal Palms, Indiranagar, Bengaluru - 560038",
    paymentMethod: "UPI",
    items: [],
    estimatedDelivery: "3 days from today",
    timeline: [
      { step: "Order Placed", date: "Today", done: true },
      { step: "Seasoned Timber Inspection", date: "In 24 hours", done: false },
      { step: "Dispatched via White-Glove Logistics", date: "In 48 hours", done: false },
      { step: "Doorstep Delivery & Assembly", date: "Within 3-4 days", done: false }
    ]
  };

  useEffect(() => {
    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3B2213', '#B4845C', '#556B2F', '#C85A32', '#D4AF37']
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Celebration Header Card */}
        <div className="bg-white rounded-3xl border border-[#E6DFD5] p-8 sm:p-12 text-center shadow-lg space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#556B2F]/10 text-[#556B2F] flex items-center justify-center mx-auto ring-8 ring-[#556B2F]/5">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C5835] block">
            Order Confirmed & Received
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1E1E]">
            Thank You for Choosing Mukul Woodlline!
          </h1>

          <p className="text-xs sm:text-sm text-[#5C5855] max-w-lg mx-auto leading-relaxed">
            Your handcrafted solid wood order has been registered at our Jodhpur furniture atelier. We have dispatched a confirmation SMS and tax invoice to your contact details.
          </p>

          <div className="pt-2 inline-flex items-center gap-3 bg-[#FAF7F2] border border-[#E6DFD5] px-4 py-2 rounded-xl text-xs">
            <span className="text-[#5C5855]">Order Reference:</span>
            <strong className="text-[#3B2213] font-mono text-sm">{order.orderId}</strong>
          </div>
        </div>

        {/* Order Details & Timeline Card */}
        <div className="bg-white rounded-3xl border border-[#E6DFD5] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E6DFD5]">
            <div>
              <span className="text-xs text-[#5C5855]">Estimated White-Glove Delivery Date:</span>
              <div className="font-serif text-lg font-bold text-[#3B2213] flex items-center gap-2 mt-0.5">
                <Calendar className="w-4 h-4 text-[#8C5835]" />
                <span>{order.estimatedDelivery || "Within 3-4 Business Days"}</span>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FAF7F2] hover:bg-[#E6DFD5] border border-[#D3C5B4] text-[#3B2213] text-xs font-semibold rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Tax Invoice</span>
            </button>
          </div>

          {/* Delivery Timeline Steps */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#1E1E1E] mb-4">
              Order Fulfillment Journey
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {order.timeline?.map((step, idx) => (
                <div key={idx} className="relative p-3 bg-[#FAF7F2] rounded-xl border border-[#E6DFD5]">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${
                    step.done ? 'bg-[#556B2F] text-white' : 'bg-[#D3C5B4] text-white'
                  }`}>
                    {idx + 1}
                  </div>
                  <h5 className="text-xs font-bold text-[#1E1E1E]">{step.step}</h5>
                  <span className="text-[11px] text-[#5C5855] block mt-0.5">{step.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Purchased Items */}
          {order.items && order.items.length > 0 && (
            <div>
              <h4 className="font-serif text-sm font-bold text-[#1E1E1E] mb-3">
                Items in This Shipment
              </h4>
              <div className="divide-y divide-[#F3EFEA] border border-[#E6DFD5] rounded-xl overflow-hidden">
                {order.items.map((item, i) => (
                  <div key={i} className="p-3.5 flex items-center justify-between text-xs bg-white">
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img src={item.image} alt="" className="w-12 h-12 rounded object-cover border border-[#E6DFD5]" />
                      )}
                      <div>
                        <span className="font-semibold text-[#1E1E1E] block">{item.name}</span>
                        <span className="text-[11px] text-[#5C5855]">Qty: {item.quantity} • Finish: {item.finish}</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#3B2213]">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shipping destination & payment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E6DFD5]">
              <div className="flex items-center gap-1.5 font-bold text-[#3B2213] mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#8C5835]" />
                <span>Delivery Address</span>
              </div>
              <p className="text-[#5C5855] leading-relaxed">{order.deliveryAddress}</p>
            </div>

            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E6DFD5]">
              <div className="flex items-center gap-1.5 font-bold text-[#3B2213] mb-1">
                <Package className="w-3.5 h-3.5 text-[#8C5835]" />
                <span>Payment & Assembly</span>
              </div>
              <p className="text-[#5C5855] leading-relaxed">
                Method: <strong>{order.paymentMethod}</strong><br />
                Assembly: <strong>Free Carpenter Setup Included</strong><br />
                Amount Paid: <strong>₹{order.total?.toLocaleString('en-IN')}</strong>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#E6DFD5] flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              to="/account"
              className="text-xs font-semibold text-[#8C5835] hover:text-[#3B2213]"
            >
              View Order in Customer Account Dashboard →
            </Link>

            <Link
              to="/shop"
              className="px-6 py-2.5 bg-[#3B2213] hover:bg-[#54321D] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <span>Explore More Furniture</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
