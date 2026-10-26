import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  PackagePlus, 
  Percent, 
  Warehouse, 
  ShoppingBag, 
  UserPlus, 
  Image as ImageIcon,
  ArrowRight
} from 'lucide-react';

export default function QuickActionModal({ isOpen, onClose, onOpenAddProduct }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const actions = [
    {
      title: "Add New Furniture Product",
      description: "Create a new Sheesham or Teak furniture listing with SKU, price, dimensions, and photos.",
      icon: PackagePlus,
      color: "text-[#5B3826] bg-[#5B3826]/10",
      action: () => {
        onClose();
        if (onOpenAddProduct) onOpenAddProduct();
        else navigate('/admin/products');
      }
    },
    {
      title: "Create Festive Promo Coupon",
      description: "Configure discount codes like 'WOODLINE10' or flat savings for new homeowners.",
      icon: Percent,
      color: "text-[#C78426] bg-[#C78426]/10",
      action: () => {
        onClose();
        navigate('/admin/discounts');
      }
    },
    {
      title: "Review Low Stock Inventory",
      description: "Inspect products with under 5 units remaining in the Jodhpur workshop.",
      icon: Warehouse,
      color: "text-[#B8433E] bg-[#B8433E]/10",
      action: () => {
        onClose();
        navigate('/admin/inventory');
      }
    },
    {
      title: "Manage Pending Orders",
      description: "Verify new customer payments and trigger white-glove logistics dispatch.",
      icon: ShoppingBag,
      color: "text-[#4E7A58] bg-[#4E7A58]/10",
      action: () => {
        onClose();
        navigate('/admin/orders');
      }
    },
    {
      title: "Update Homepage Hero Banners",
      description: "Refresh lifestyle photography, seasonal headlines, and promotional calls-to-action.",
      icon: ImageIcon,
      color: "text-[#5B3826] bg-[#5B3826]/10",
      action: () => {
        onClose();
        navigate('/admin/banners');
      }
    },
    {
      title: "Invite Admin Staff Member",
      description: "Grant portal access to warehouse managers, support executives, or finance leads.",
      icon: UserPlus,
      color: "text-[#77736D] bg-[#77736D]/10",
      action: () => {
        onClose();
        navigate('/admin/users');
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div onClick={onClose} className="fixed inset-0" />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 z-10 border border-[#E9DDCD]">
        <div className="flex items-center justify-between pb-4 border-b border-[#E9DDCD]">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#292724]">Quick Administration Actions</h3>
            <p className="text-xs text-[#77736D] mt-0.5">Shortcuts to manage your store workflows rapidly</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F8F6F2] hover:bg-[#E9DDCD] text-[#77736D] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((act, idx) => {
            const Icon = act.icon;
            return (
              <button
                key={idx}
                onClick={act.action}
                className="flex items-start gap-3 p-3.5 rounded-2xl border border-[#E9DDCD] bg-[#F8F6F2]/50 hover:bg-white hover:border-[#5B3826] hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className={`w-9 h-9 rounded-xl ${act.color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#292724] group-hover:text-[#5B3826] transition-colors leading-tight">
                    {act.title}
                  </h4>
                  <p className="text-[10px] text-[#77736D] mt-1 leading-snug line-clamp-2">
                    {act.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
