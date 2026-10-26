import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Printer, 
  Clock, 
  CheckCircle2, 
  Truck, 
  XCircle, 
  ChevronRight, 
  MapPin, 
  Calendar,
  X,
  CreditCard,
  User,
  PackageCheck
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function AdminOrdersPage() {
  const { adminOrders, updateOrderStatus } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    let result = [...adminOrders];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.toLowerCase().includes(q) ||
        o.shippingAddress.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(o => o.status === statusFilter);
    }

    return result;
  }, [adminOrders, searchQuery, statusFilter]);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9DDCD]">
        <div>
          <h2 className="text-2xl font-extrabold text-[#292724] tracking-tight font-sans">
            Customer Orders & White-Glove Logistics ({adminOrders.length})
          </h2>
          <p className="text-xs text-[#77736D] mt-0.5">
            Track payments, update workshop production stages, and coordinate carpenter installation appointments.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#F8F6F2] border border-[#E9DDCD] text-[#5B3826] rounded-xl text-xs font-semibold shadow-2xs transition-colors self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>Export Orders Report</span>
        </button>
      </div>

      {/* 2. Filter & Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E9DDCD] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order ID, customer name, phone..."
            className="w-full pl-9 pr-3 py-2 bg-[#F8F6F2] border border-[#E9DDCD] rounded-xl text-[#292724] focus:outline-none focus:border-[#5B3826]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77736D]" />
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {["all", "Pending", "Confirmed", "In Production", "Dispatched", "Delivered", "Cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-[#5B3826] text-white shadow-2xs'
                  : 'bg-[#F8F6F2] text-[#77736D] hover:text-[#292724]'
              }`}
            >
              {st === "all" ? "All Orders" : st}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Orders Table */}
      <div className="bg-white rounded-3xl border border-[#E9DDCD] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#292724]">
            <thead>
              <tr className="bg-[#F8F6F2] border-b border-[#E9DDCD] text-[#77736D] text-[11px] uppercase tracking-wider">
                <th className="py-4 pl-6 pr-3 font-semibold">Order ID</th>
                <th className="py-4 px-3 font-semibold">Date & Time</th>
                <th className="py-4 px-3 font-semibold">Customer Details</th>
                <th className="py-4 px-3 font-semibold">Destination City</th>
                <th className="py-4 px-3 font-semibold">Items</th>
                <th className="py-4 px-3 font-semibold">Amount</th>
                <th className="py-4 px-3 font-semibold">Payment</th>
                <th className="py-4 px-3 font-semibold">Status</th>
                <th className="py-4 pr-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F8F6F2]">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((ord) => {
                  let badge = "bg-[#4E7A58]/10 text-[#4E7A58]";
                  if (ord.status === "Pending") badge = "bg-[#B8433E]/10 text-[#B8433E]";
                  if (ord.status === "Confirmed") badge = "bg-[#5B3826]/10 text-[#5B3826]";
                  if (ord.status === "In Production") badge = "bg-[#C78426]/10 text-[#C78426]";
                  if (ord.status === "Dispatched") badge = "bg-[#2E5C38]/10 text-[#2E5C38]";

                  return (
                    <tr key={ord.id} className="hover:bg-[#F8F6F2]/60 transition-colors">
                      <td className="py-3.5 pl-6 pr-3 font-mono font-bold text-[#5B3826]">
                        {ord.id}
                      </td>
                      <td className="py-3.5 px-3 text-[#77736D]">
                        <span className="block text-[#292724] font-medium">{ord.date}</span>
                        <span className="text-[10px]">{ord.time}</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-bold text-[#292724] block">{ord.customerName}</span>
                        <span className="text-[10px] text-[#77736D] block">{ord.customerPhone}</span>
                      </td>
                      <td className="py-3.5 px-3 text-[#77736D] max-w-[140px] truncate">
                        {ord.shippingAddress}
                      </td>
                      <td className="py-3.5 px-3 font-medium">
                        {ord.itemsCount} {ord.itemsCount === 1 ? 'Piece' : 'Pieces'}
                      </td>
                      <td className="py-3.5 px-3 font-bold text-[#292724]">
                        ₹{ord.total.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-3 text-[#77736D] text-[11px]">
                        {ord.paymentMethod}
                      </td>
                      <td className="py-3.5 px-3">
                        <select
                          value={ord.status}
                          onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border-none focus:outline-none cursor-pointer ${badge}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="In Production">In Production</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3.5 pr-6 text-right">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-3 py-1 bg-[#F8F6F2] hover:bg-[#E9DDCD] text-[#5B3826] rounded-lg font-semibold transition-colors"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="p-12 text-center text-[#77736D]">
                    <ShoppingBag className="w-10 h-10 text-[#5B3826] mx-auto mb-2 opacity-50" />
                    <p className="font-semibold text-sm">No orders found matching this filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details & Invoice Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div onClick={() => setSelectedOrder(null)} className="fixed inset-0" />

          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 z-10 border border-[#E9DDCD] max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-[#E9DDCD]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-bold text-[#5B3826]">{selectedOrder.id}</span>
                  <span className="px-2.5 py-0.5 bg-[#5B3826]/10 text-[#5B3826] text-[10px] font-bold rounded-full">
                    {selectedOrder.status}
                  </span>
                </div>
                <p className="text-xs text-[#77736D] mt-0.5">
                  Placed on {selectedOrder.date} at {selectedOrder.time}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-2 rounded-xl bg-[#F8F6F2] hover:bg-[#E9DDCD] text-[#5B3826]"
                  title="Print Tax Invoice"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 rounded-xl bg-[#F8F6F2] hover:bg-[#E9DDCD] text-[#77736D]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Customer & Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#F8F6F2] rounded-2xl border border-[#E9DDCD]">
                <div className="flex items-center gap-1.5 font-bold text-[#5B3826] mb-1">
                  <User className="w-3.5 h-3.5" />
                  <span>Customer Information</span>
                </div>
                <p className="font-semibold text-[#292724]">{selectedOrder.customerName}</p>
                <p className="text-[#77736D]">{selectedOrder.customerEmail}</p>
                <p className="text-[#77736D] mt-0.5">📞 {selectedOrder.customerPhone}</p>
              </div>

              <div className="p-4 bg-[#F8F6F2] rounded-2xl border border-[#E9DDCD]">
                <div className="flex items-center gap-1.5 font-bold text-[#5B3826] mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Delivery Address</span>
                </div>
                <p className="text-[#77736D] leading-relaxed">{selectedOrder.shippingAddress}</p>
                <span className="text-[10px] text-[#4E7A58] font-semibold mt-1 block">
                  ✓ Free White-Glove Installation Included
                </span>
              </div>
            </div>

            {/* Line Items */}
            <div>
              <h4 className="font-serif text-sm font-bold text-[#292724] mb-3">
                Ordered Handcrafted Furniture
              </h4>
              <div className="divide-y divide-[#F8F6F2] border border-[#E9DDCD] rounded-2xl overflow-hidden">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between text-xs bg-white">
                    <div>
                      <span className="font-bold text-[#292724] block">{item.name}</span>
                      <span className="text-[11px] text-[#77736D] font-mono">SKU: {item.sku || 'MW-ITEM'} • Qty: {item.qty}</span>
                    </div>
                    <span className="font-bold text-[#5B3826]">
                      ₹{(item.price * item.qty).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Payment Summary */}
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E9DDCD] space-y-2 text-xs">
              <div className="flex justify-between text-[#77736D]">
                <span>Payment Method:</span>
                <span className="font-semibold text-[#292724]">{selectedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-[#77736D]">
                <span>White-Glove Doorstep Shipping:</span>
                <span className="font-semibold text-[#4E7A58]">FREE (Promotional Waiver)</span>
              </div>
              <div className="pt-2 border-t border-[#E9DDCD] flex justify-between items-baseline font-serif">
                <span className="font-bold text-sm text-[#292724]">Total Invoice Value</span>
                <span className="font-bold text-xl text-[#5B3826]">
                  ₹{selectedOrder.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Status Change Control in Modal */}
            <div className="pt-2 border-t border-[#E9DDCD] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#77736D]">Update Order State:</span>
              <div className="flex gap-2">
                {["In Production", "Dispatched", "Delivered"].map(statusOption => (
                  <button
                    key={statusOption}
                    onClick={() => handleStatusChange(selectedOrder.id, statusOption)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      selectedOrder.status === statusOption 
                        ? 'bg-[#5B3826] text-white shadow-xs' 
                        : 'bg-[#F8F6F2] hover:bg-[#E9DDCD] text-[#5B3826]'
                    }`}
                  >
                    Set {statusOption}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
