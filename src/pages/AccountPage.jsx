import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  LogOut, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ChevronRight,
  Plus,
  ShieldCheck,
  Info
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function AccountPage() {
  const { user, setUser, orders, addresses, setAddresses, addToast } = useShop();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'addresses', 'profile'
  
  // New address state
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: user?.name || "Vikram Malhotra",
    phone: user?.phone || "+91 98201 44521",
    addressLine: "",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    type: "Home"
  });

  const handleLogout = () => {
    setUser({ name: "Guest User", email: "", phone: "", isLoggedIn: false });
    addToast("Logged out of customer session.", "info");
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddr.addressLine || !newAddr.pincode) return;
    
    setAddresses(prev => [
      ...prev,
      {
        id: `addr-${Date.now()}`,
        ...newAddr,
        isDefault: prev.length === 0
      }
    ]);
    setIsAddingAddress(false);
    addToast("New delivery address saved!");
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      
      {/* Breadcrumbs */}
      <div className="bg-[#F3EFEA] border-b border-[#E6DFD5] py-2.5">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center gap-1.5 text-xs text-[#5C5855]">
          <Link to="/" className="hover:text-[#3B2213]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C5835]" />
          <span className="font-semibold text-[#3B2213]">Customer Account Dashboard</span>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-8">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl border border-[#E6DFD5] p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-full bg-[#3B2213] text-[#FAF7F2] flex items-center justify-center font-serif text-2xl font-bold shadow-md">
              {user?.name ? user.name.charAt(0) : "V"}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C5835]">
                Woodline Club Member
              </span>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#1E1E1E]">
                {user?.name || "Vikram Malhotra"}
              </h1>
              <p className="text-xs text-[#5C5855]">{user?.email || "vikram.m@example.com"} • {user?.phone || "+91 98201 44521"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/wishlist"
              className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#E6DFD5] text-[#3B2213] border border-[#D3C5B4] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Heart className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Wishlist</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white hover:bg-[#FAF7F2] text-[#C85A32] border border-[#C85A32]/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Nav (3 cols) */}
          <div className="lg:col-span-3 space-y-2">
            {[
              { id: 'orders', label: 'Order History & Tracking', icon: Package, count: orders.length },
              { id: 'addresses', label: 'Saved Delivery Addresses', icon: MapPin, count: addresses.length },
              { id: 'profile', label: 'Personal Information', icon: User }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full p-4 rounded-2xl flex items-center justify-between text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#3B2213] text-white shadow-md'
                      : 'bg-white text-[#5C5855] hover:text-[#1E1E1E] border border-[#E6DFD5]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-[#FAF7F2] text-[#3B2213]'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="p-4 bg-white rounded-2xl border border-[#E6DFD5] text-xs text-[#5C5855] space-y-2">
              <span className="font-bold text-[#1E1E1E] block">Need Assistance?</span>
              <p className="text-[11px] leading-relaxed">
                Connect with your dedicated Mukund Woodline furniture advisor for shipment rescheduling or warranty claims.
              </p>
              <a href="tel:+918002660123" className="text-xs font-bold text-[#8C5835] block hover:underline">
                📞 Toll-Free: 1800-266-0123
              </a>
            </div>
          </div>

          {/* Main Content Pane (9 cols) */}
          <div className="lg:col-span-9">
            
            {/* Tab 1: Orders */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E6DFD5]">
                  <h3 className="font-serif text-lg font-bold text-[#1E1E1E]">
                    Order History & White-Glove Dispatch Status
                  </h3>
                  <span className="text-xs text-[#5C5855]">Real-time logistics tracking</span>
                </div>

                {orders.length > 0 ? (
                  orders.map((ord) => (
                    <div key={ord.orderId} className="bg-white rounded-2xl border border-[#E6DFD5] p-6 shadow-xs space-y-6">
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F3EFEA]">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-[#3B2213]">{ord.orderId}</span>
                            <span className="px-2.5 py-0.5 bg-[#556B2F]/10 text-[#556B2F] text-[10px] font-bold rounded-full">
                              {ord.status}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#5C5855] block mt-0.5">
                            Placed on {ord.date} • Total: <strong>₹{ord.total.toLocaleString('en-IN')}</strong>
                          </span>
                        </div>

                        <div className="text-xs text-[#5C5855]">
                          Delivery to: <strong className="text-[#1E1E1E]">{ord.deliveryAddress}</strong>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#5C5855] mb-3">
                          Fulfillment Milestones
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                          {ord.timeline?.map((step, idx) => (
                            <div key={idx} className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E6DFD5]">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mb-1.5 ${
                                step.done ? 'bg-[#556B2F] text-white' : 'bg-[#D3C5B4] text-white'
                              }`}>
                                {step.done ? "✓" : idx + 1}
                              </div>
                              <span className="font-semibold text-[#1E1E1E] block text-[11px]">{step.step}</span>
                              <span className="text-[10px] text-[#5C5855]">{step.date}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Items */}
                      <div className="divide-y divide-[#F3EFEA] border border-[#E6DFD5] rounded-xl overflow-hidden">
                        {ord.items.map((item, i) => (
                          <div key={i} className="p-3.5 flex items-center justify-between text-xs bg-white">
                            <div className="flex items-center gap-3">
                              {item.image && (
                                <img src={item.image} alt="" className="w-12 h-12 rounded object-cover border border-[#E6DFD5]" />
                              )}
                              <div>
                                <span className="font-semibold text-[#1E1E1E] block">{item.name}</span>
                                <span className="text-[11px] text-[#5C5855]">Qty: {item.quantity} • {item.finish || 'Solid Walnut'}</span>
                              </div>
                            </div>
                            <span className="font-bold text-[#3B2213]">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-2xl p-10 text-center border border-[#E6DFD5]">
                    <Package className="w-10 h-10 text-[#8C5835] mx-auto mb-2" />
                    <h4 className="font-serif text-base font-bold text-[#1E1E1E]">No Orders Yet</h4>
                    <p className="text-xs text-[#5C5855] mt-1">When you place orders, you can track their manufacturing & white-glove delivery here.</p>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Addresses */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E6DFD5]">
                  <h3 className="font-serif text-lg font-bold text-[#1E1E1E]">
                    Saved Delivery Addresses ({addresses.length})
                  </h3>
                  <button
                    onClick={() => setIsAddingAddress(!isAddingAddress)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#3B2213] text-white rounded-lg text-xs font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                </div>

                {isAddingAddress && (
                  <form onSubmit={handleAddAddress} className="bg-white rounded-2xl border border-[#E6DFD5] p-5 shadow-xs space-y-4">
                    <h4 className="font-serif text-sm font-bold text-[#1E1E1E]">Enter New Address</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-semibold mb-1">Recipient Name</label>
                        <input
                          type="text"
                          required
                          value={newAddr.name}
                          onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                          className="w-full px-3 py-1.5 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Phone</label>
                        <input
                          type="tel"
                          required
                          value={newAddr.phone}
                          onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                          className="w-full px-3 py-1.5 border rounded"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block font-semibold mb-1">Address Line</label>
                        <input
                          type="text"
                          required
                          value={newAddr.addressLine}
                          onChange={(e) => setNewAddr({ ...newAddr, addressLine: e.target.value })}
                          className="w-full px-3 py-1.5 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">City</label>
                        <input
                          type="text"
                          required
                          value={newAddr.city}
                          onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                          className="w-full px-3 py-1.5 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">PIN Code</label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={newAddr.pincode}
                          onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                          className="w-full px-3 py-1.5 border rounded"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="px-4 py-2 bg-[#3B2213] text-white text-xs font-semibold rounded">
                        Save Address
                      </button>
                      <button type="button" onClick={() => setIsAddingAddress(false)} className="px-4 py-2 bg-[#FAF7F2] text-[#5C5855] text-xs font-semibold rounded">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="bg-white rounded-2xl border border-[#E6DFD5] p-5 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C5835] bg-[#FAF7F2] px-2 py-0.5 rounded">
                            {addr.type || 'Home'}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] font-semibold text-[#556B2F]">Default</span>
                          )}
                        </div>
                        <h4 className="font-semibold text-xs text-[#1E1E1E]">{addr.name}</h4>
                        <p className="text-xs text-[#5C5855] mt-1 leading-relaxed">{addr.addressLine}</p>
                        <p className="text-xs text-[#5C5855]">{addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="text-xs text-[#5C5855] mt-1">📞 {addr.phone}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#F3EFEA] flex justify-end">
                        <button 
                          onClick={() => setAddresses(prev => prev.filter(a => a.id !== addr.id))}
                          className="text-[11px] text-[#C85A32] hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Profile */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl border border-[#E6DFD5] p-6 shadow-xs space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#1E1E1E] pb-3 border-b border-[#E6DFD5]">
                  Personal Profile & Preferences
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[#5C5855] font-semibold mb-1">Full Name</label>
                    <input
                      type="text"
                      value={user?.name || ""}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5C5855] font-semibold mb-1">Email</label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5C5855] font-semibold mb-1">Mobile Phone</label>
                    <input
                      type="tel"
                      value={user?.phone || ""}
                      onChange={(e) => setUser({ ...user, phone: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div className="pt-3">
                  <button 
                    onClick={() => addToast("Profile details updated successfully!")}
                    className="px-5 py-2 bg-[#3B2213] text-white text-xs font-semibold rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
