import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useShop();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-4 h-4 text-[#556B2F] shrink-0 mt-0.5" />;
        let borderClass = "border-[#556B2F]/30 bg-white";
        
        if (toast.type === "error") {
          icon = <AlertCircle className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />;
          borderClass = "border-[#C85A32]/30 bg-white";
        } else if (toast.type === "info") {
          icon = <Info className="w-4 h-4 text-[#8C5835] shrink-0 mt-0.5" />;
          borderClass = "border-[#8C5835]/30 bg-white";
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl shadow-xl border ${borderClass} text-xs text-[#1E1E1E] animate-fade-in transition-all`}
          >
            {icon}
            <div className="flex-1 font-medium leading-relaxed">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#5C5855] hover:text-[#1E1E1E] p-0.5"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
