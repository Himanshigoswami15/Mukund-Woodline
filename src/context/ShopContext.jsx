import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { saveOrderToNeon } from '../services/neonService';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('mw_cart');
      return saved ? JSON.parse(saved) : [
        { product: PRODUCTS[0], quantity: 1, selectedFinish: "Warm Walnut" }
      ];
    } catch {
      return [{ product: PRODUCTS[0], quantity: 1, selectedFinish: "Warm Walnut" }];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('mw_wishlist');
      return saved ? JSON.parse(saved) : ["mw-102", "mw-105"];
    } catch {
      return ["mw-102", "mw-105"];
    }
  });

  // Customer state
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('mw_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.email && parsed.email !== "vikram.m@example.com") {
          return parsed;
        }
      }
      return {
        name: "",
        email: "",
        phone: "",
        isLoggedIn: false
      };
    } catch {
      return {
        name: "",
        email: "",
        phone: "",
        isLoggedIn: false
      };
    }
  });

  // Saved Delivery Addresses
  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('mw_addresses');
      return saved ? JSON.parse(saved) : [
        {
          id: "addr-1",
          name: "Vikram Malhotra",
          phone: "+91 98201 44521",
          addressLine: "Flat 402, Royal Palms Residency, 14th Main, Indiranagar",
          city: "Bengaluru",
          state: "Karnataka",
          pincode: "560038",
          isDefault: true,
          type: "Home"
        }
      ];
    } catch {
      return [];
    }
  });

  // Orders history
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('mw_orders');
      return saved ? JSON.parse(saved) : [
        {
          orderId: "MW-2026-89104",
          date: "14 Oct 2026",
          status: "Delivered",
          items: [
            {
              id: "mw-105",
              name: "Nirvana Solid Teak Minimalist Fluted Coffee Table",
              price: 16499,
              quantity: 1,
              image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=400&q=80"
            }
          ],
          total: 16499,
          deliveryAddress: "Indiranagar, Bengaluru - 560038",
          timeline: [
            { step: "Order Placed", date: "14 Oct 2026", done: true },
            { step: "Quality Checked & Packed", date: "15 Oct 2026", done: true },
            { step: "Dispatched from Jodhpur Workshop", date: "16 Oct 2026", done: true },
            { step: "Delivered & Assembled", date: "18 Oct 2026", done: true }
          ]
        }
      ];
    } catch {
      return [];
    }
  });

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  // Pincode state
  const [pincode, setPincode] = useState("560038");
  const [pincodeCity, setPincodeCity] = useState("Bengaluru (Eligible for Free White-Glove Delivery)");

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Modals
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mw_cart', JSON.stringify(cart));
    } catch (e) { console.error(e); }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('mw_wishlist', JSON.stringify(wishlist));
    } catch (e) { console.error(e); }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('mw_user', JSON.stringify(user));
    } catch (e) { console.error(e); }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('mw_orders', JSON.stringify(orders));
    } catch (e) { console.error(e); }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('mw_addresses', JSON.stringify(addresses));
    } catch (e) { console.error(e); }
  }, [addresses]);

  // Toast handler
  const addToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (product, quantity = 1, selectedFinish) => {
    const finish = selectedFinish || product.finish || "Standard";
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedFinish === finish
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [...prev, { product, quantity, selectedFinish: finish }];
    });
    addToast(`Added "${product.name}" to your shopping cart.`);
  };

  const removeFromCart = (productId, selectedFinish) => {
    setCart(prev => prev.filter(
      item => !(item.product.id === productId && (!selectedFinish || item.selectedFinish === selectedFinish))
    ));
    addToast("Item removed from cart.", "info");
  };

  const updateQuantity = (productId, newQuantity, selectedFinish) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, selectedFinish);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && (!selectedFinish || item.selectedFinish === selectedFinish)) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const product = PRODUCTS.find(p => p.id === productId);
      const name = product ? product.name : "Item";
      if (exists) {
        addToast(`Removed "${name}" from Wishlist.`, "info");
        return prev.filter(id => id !== productId);
      } else {
        addToast(`Saved "${name}" to your Wishlist!`, "success");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartOriginalTotal = cart.reduce((sum, item) => sum + (item.product.originalPrice * item.quantity), 0);
  const totalSavings = cartOriginalTotal - cartSubtotal;

  // Coupon handling
  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === "WOODLINE10") {
      setAppliedCoupon({ code: "WOODLINE10", discountPercent: 10, description: "10% Welcome Discount Applied" });
      setCouponError("");
      addToast("Coupon WOODLINE10 applied! 10% discount added.", "success");
      return true;
    } else if (clean === "FESTIVE2500") {
      if (cartSubtotal < 25000) {
        setCouponError("Minimum order of ₹25,000 required for FESTIVE2500");
        return false;
      }
      setAppliedCoupon({ code: "FESTIVE2500", flatDiscount: 2500, description: "Flat ₹2,500 Festive Savings" });
      setCouponError("");
      addToast("Coupon FESTIVE2500 applied! Saved ₹2,500.", "success");
      return true;
    } else {
      setCouponError("Invalid coupon code. Try 'WOODLINE10' or 'FESTIVE2500'");
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
    addToast("Coupon removed.", "info");
  };

  let couponDiscountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      couponDiscountAmount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.flatDiscount) {
      couponDiscountAmount = appliedCoupon.flatDiscount;
    }
  }

  const shippingFee = cartSubtotal >= 5000 || cartSubtotal === 0 ? 0 : 999;
  const orderTotal = Math.max(0, cartSubtotal - couponDiscountAmount + shippingFee);
  const freeShippingThreshold = 5000;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const checkPincode = (code) => {
    const pin = code.trim();
    if (/^[1-9][0-9]{5}$/.test(pin)) {
      setPincode(pin);
      if (pin.startsWith("11") || pin.startsWith("12")) {
        setPincodeCity("Delhi NCR (Next Day Delivery Available)");
      } else if (pin.startsWith("40") || pin.startsWith("41")) {
        setPincodeCity("Mumbai & Pune (Delivery in 2 Days)");
      } else if (pin.startsWith("56") || pin.startsWith("57")) {
        setPincodeCity("Bengaluru (Delivery in 2 Days)");
      } else if (pin.startsWith("50")) {
        setPincodeCity("Hyderabad (Delivery in 3 Days)");
      } else if (pin.startsWith("60")) {
        setPincodeCity("Chennai (Delivery in 3 Days)");
      } else {
        setPincodeCity("Pan-India Delivery Verified (3-5 Days)");
      }
      addToast(`Delivery available to pincode ${pin}!`, "success");
      return true;
    } else {
      addToast("Please enter a valid 6-digit Indian PIN code.", "error");
      return false;
    }
  };

  const placeOrder = (orderDetails) => {
    const newOrderId = `MW-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      orderId: newOrderId,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: "Order Confirmed",
      items: cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        finish: item.selectedFinish,
        image: item.product.images[0]
      })),
      total: orderTotal,
      subtotal: cartSubtotal,
      discount: couponDiscountAmount,
      shippingFee,
      deliveryAddress: orderDetails.address,
      paymentMethod: orderDetails.paymentMethod,
      customerName: orderDetails.fullName,
      customerPhone: orderDetails.phone,
      customerEmail: orderDetails.email,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      timeline: [
        { step: "Order Placed", date: "Today", done: true },
        { step: "Artisan Quality Inspection", date: "In 24 hours", done: false },
        { step: "Dispatched via White-Glove Logistics", date: "In 48 hours", done: false },
        { step: "Doorstep Delivery & Assembly", date: "Within 3-4 days", done: false }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);

    // Persist order to Neon Lakebase Postgres
    saveOrderToNeon({
      id: newOrderId,
      customerName: orderDetails.fullName,
      customerEmail: orderDetails.email,
      customerPhone: orderDetails.phone,
      items: newOrder.items,
      totalAmount: orderTotal,
      status: "Order Confirmed",
      shippingAddress: orderDetails.address,
      paymentMethod: orderDetails.paymentMethod,
      createdAt: new Date().toISOString()
    }).catch(err => {
      console.warn('[ShopContext] Failed to sync order to Neon:', err);
    });

    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        cartCount: cart.reduce((total, item) => total + item.quantity, 0),
        cartSubtotal,
        cartOriginalTotal,
        totalSavings,
        couponDiscountAmount,
        shippingFee,
        orderTotal,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        freeShippingThreshold,
        amountNeededForFreeShipping,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
        user,
        setUser,
        addresses,
        setAddresses,
        orders,
        placeOrder,
        toasts,
        addToast,
        removeToast,
        pincode,
        pincodeCity,
        checkPincode,
        quickViewProduct,
        setQuickViewProduct,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        searchQuery,
        setSearchQuery,
        isMobileMenuOpen,
        setIsMobileMenuOpen
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
