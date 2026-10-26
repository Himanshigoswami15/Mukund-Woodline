import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CATEGORIES, PROMOTIONAL_BANNERS } from '../../data/products';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // 1. Admin Authentication - Requires login by default unless active session exists
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('mw_admin_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.isAuthenticated) {
          return parsed;
        }
      }
      return null;
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    // Validate credentials
    if (!email || !password) {
      return { success: false, message: "Please enter both admin email and password." };
    }
    if (password.length < 6) {
      return { success: false, message: "Password must be at least 6 characters long." };
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check against registered admin staff in localStorage or memory
    let registeredStaff = [];
    try {
      const savedStaff = localStorage.getItem('mw_admin_staff');
      if (savedStaff) registeredStaff = JSON.parse(savedStaff);
    } catch {
      // fallback
    }

    const matched = registeredStaff && registeredStaff.find(
      s => s.email && s.email.toLowerCase() === cleanEmail
    );

    if (matched) {
      if (matched.status === 'Suspended') {
        return { success: false, message: "This administrative account is suspended. Please contact the Super Admin." };
      }
      if (matched.password && matched.password !== password) {
        return { success: false, message: "Incorrect password for this administrator account." };
      }

      const session = {
        id: matched.id,
        name: matched.name,
        email: matched.email,
        phone: matched.phone || "+91 98201 44521",
        role: matched.role,
        permissions: matched.permissions,
        canAddAdmins: matched.canAddAdmins !== false,
        avatar: matched.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        isAuthenticated: true,
        lastLogin: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      setAdminUser(session);
      localStorage.setItem('mw_admin_session', JSON.stringify(session));
      return { success: true };
    }

    // Default Super Admin credentials
    const isSuperAdmin = (cleanEmail === 'admin@mukundwoodline.com' || cleanEmail === 'admin@mukulwoodline.com');
    if (isSuperAdmin) {
      if (password !== 'admin123') {
        return { success: false, message: "Incorrect password for administrator account." };
      }

      const session = {
        id: "adm-01",
        name: "Mukund Sharma",
        email: cleanEmail,
        role: "Super Admin",
        canAddAdmins: true,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        isAuthenticated: true,
        lastLogin: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      setAdminUser(session);
      localStorage.setItem('mw_admin_session', JSON.stringify(session));
      return { success: true };
    }

    // Generic authorized staff login check
    if (password === 'admin123') {
      const session = {
        id: "adm-staff",
        name: cleanEmail.includes("rajesh") ? "Rajesh Verma" : 
              (cleanEmail.includes("priya") ? "Priya Nair" : "Store Administrator"),
        email: cleanEmail,
        role: cleanEmail.includes("rajesh") ? "Store Administrator" : "Catalog Manager",
        canAddAdmins: false,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        isAuthenticated: true,
        lastLogin: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      setAdminUser(session);
      localStorage.setItem('mw_admin_session', JSON.stringify(session));
      return { success: true };
    }

    return { success: false, message: "Invalid administrator credentials. Please check email and password." };
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem('mw_admin_session');
  };

  // 2. Products Management State
  const [adminProducts, setAdminProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('mw_admin_products');
      if (saved) return JSON.parse(saved);
    } catch (e) { console.error(e); }

    // Seed enhanced products from PRODUCTS
    return PRODUCTS.map((p, index) => ({
      ...p,
      sku: `MW-${p.category.substring(0, 3).toUpperCase()}-${1000 + index}`,
      stock: [18, 6, 22, 3, 14, 2, 8, 12, 19, 5, 25, 4][index % 12],
      lowStockThreshold: 5,
      status: index === 3 ? "Low Stock" : index === 5 ? "Low Stock" : index === 10 ? "Draft" : "Active",
      salesCount: [42, 68, 35, 19, 54, 38, 29, 21, 14, 11, 48, 17][index % 12],
      updatedAt: "23 Oct 2026, 11:30 AM"
    }));
  });

  // 3. Orders Management State
  const [adminOrders, setAdminOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('mw_admin_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) { console.error(e); }

    return [
      {
        id: "MW-ORD-9281",
        customerName: "Vikram Malhotra",
        customerEmail: "vikram.m@example.com",
        customerPhone: "+91 98201 44521",
        shippingAddress: "Flat 402, Royal Palms, Indiranagar, Bengaluru - 560038",
        date: "23 Oct 2026",
        time: "10:45 AM",
        itemsCount: 2,
        total: 63498,
        paymentMethod: "UPI (Google Pay)",
        status: "Pending", // Pending, Confirmed, In Production, Dispatched, Delivered, Cancelled
        items: [
          { name: "Aarambh Solid Sheesham King Bed", qty: 1, price: 46999, sku: "MW-BED-1000" },
          { name: "Nirvana Solid Teak Fluted Coffee Table", qty: 1, price: 16499, sku: "MW-LIV-1004" }
        ]
      },
      {
        id: "MW-ORD-9280",
        customerName: "Ananya Sengupta",
        customerEmail: "ananya.s@example.com",
        customerPhone: "+91 98112 87654",
        shippingAddress: "Villa 14, Magnolia Enclave, Golf Course Rd, Gurugram - 122002",
        date: "23 Oct 2026",
        time: "09:15 AM",
        itemsCount: 1,
        total: 42999,
        paymentMethod: "Credit Card (HDFC)",
        status: "Confirmed",
        items: [
          { name: "Rajwada 6-Seater Solid Sheesham Dining Set", qty: 1, price: 42999, sku: "MW-DIN-1002" }
        ]
      },
      {
        id: "MW-ORD-9279",
        customerName: "Rohan Verma",
        customerEmail: "rohan.v@example.com",
        customerPhone: "+91 97654 32109",
        shippingAddress: "702, Sea Crest Towers, Bandra West, Mumbai - 400050",
        date: "22 Oct 2026",
        time: "06:30 PM",
        itemsCount: 1,
        total: 38499,
        paymentMethod: "UPI (PhonePe)",
        status: "In Production",
        items: [
          { name: "Virasaat 3-Seater Chesterfield Sofa", qty: 1, price: 38499, sku: "MW-LIV-1001" }
        ]
      },
      {
        id: "MW-ORD-9278",
        customerName: "Pooja Hegde",
        customerEmail: "pooja.h@example.com",
        customerPhone: "+91 98450 11223",
        shippingAddress: "B-201, Jubilee Hills Oasis, Hyderabad - 500033",
        date: "22 Oct 2026",
        time: "03:10 PM",
        itemsCount: 2,
        total: 78998,
        paymentMethod: "Net Banking (ICICI)",
        status: "Dispatched",
        items: [
          { name: "Kashmiri 4-Door Solid Wood Wardrobe", qty: 1, price: 54999, sku: "MW-STO-1003" },
          { name: "Takshashila Executive Sheesham Study Desk", qty: 1, price: 23999, sku: "MW-STU-1005" }
        ]
      },
      {
        id: "MW-ORD-9277",
        customerName: "Deepak Choudhary",
        customerEmail: "deepak.c@example.com",
        customerPhone: "+91 99280 44556",
        shippingAddress: "45, Residency Road, Jodhpur - 342001",
        date: "21 Oct 2026",
        time: "11:20 AM",
        itemsCount: 1,
        total: 26999,
        paymentMethod: "Cash on Delivery",
        status: "Delivered",
        items: [
          { name: "Utsav Hand-Carved Sheesham Pooja Mandir", qty: 1, price: 26999, sku: "MW-HOM-1011" }
        ]
      },
      {
        id: "MW-ORD-9276",
        customerName: "Siddharth Mehra",
        customerEmail: "sid.m@example.com",
        customerPhone: "+91 98200 99887",
        shippingAddress: "12A, Queens Court, Koregaon Park, Pune - 411001",
        date: "20 Oct 2026",
        time: "04:45 PM",
        itemsCount: 1,
        total: 27999,
        paymentMethod: "Credit Card (Axis)",
        status: "Delivered",
        items: [
          { name: "Vistara Solid Wood TV Entertainment Console", qty: 1, price: 27999, sku: "MW-LIV-1006" }
        ]
      }
    ];
  });

  // 4. Customers State
  const [adminCustomers, setAdminCustomers] = useState(() => {
    return [
      {
        id: "CUST-101",
        name: "Vikram Malhotra",
        email: "vikram.m@example.com",
        phone: "+91 98201 44521",
        location: "Bengaluru, Karnataka",
        ordersCount: 3,
        totalSpent: 96497,
        joinedDate: "14 Oct 2026",
        status: "Active"
      },
      {
        id: "CUST-102",
        name: "Ananya Sengupta",
        email: "ananya.s@example.com",
        phone: "+91 98112 87654",
        location: "Gurugram, Haryana",
        ordersCount: 2,
        totalSpent: 81498,
        joinedDate: "18 Oct 2026",
        status: "Active"
      },
      {
        id: "CUST-103",
        name: "Rohan Verma",
        email: "rohan.v@example.com",
        phone: "+91 97654 32109",
        location: "Mumbai, Maharashtra",
        ordersCount: 1,
        totalSpent: 38499,
        joinedDate: "20 Oct 2026",
        status: "Active"
      },
      {
        id: "CUST-104",
        name: "Pooja Hegde",
        email: "pooja.h@example.com",
        phone: "+91 98450 11223",
        location: "Hyderabad, Telangana",
        ordersCount: 4,
        totalSpent: 142996,
        joinedDate: "05 Sep 2026",
        status: "VIP"
      },
      {
        id: "CUST-105",
        name: "Deepak Choudhary",
        email: "deepak.c@example.com",
        phone: "+91 99280 44556",
        location: "Jodhpur, Rajasthan",
        ordersCount: 1,
        totalSpent: 26999,
        joinedDate: "21 Oct 2026",
        status: "Active"
      }
    ];
  });

  // 5. Discounts & Coupons State
  const [adminCoupons, setAdminCoupons] = useState(() => {
    return [
      {
        id: "CPN-01",
        code: "WOODLINE10",
        discountType: "percentage",
        value: 10,
        minOrder: 5000,
        usageLimit: 500,
        usedCount: 142,
        expiryDate: "31 Dec 2026",
        status: "Active"
      },
      {
        id: "CPN-02",
        code: "FESTIVE2500",
        discountType: "flat",
        value: 2500,
        minOrder: 25000,
        usageLimit: 200,
        usedCount: 78,
        expiryDate: "15 Nov 2026",
        status: "Active"
      },
      {
        id: "CPN-03",
        code: "FIRSTHOME",
        discountType: "percentage",
        value: 15,
        minOrder: 40000,
        usageLimit: 100,
        usedCount: 34,
        expiryDate: "30 Nov 2026",
        status: "Active"
      },
      {
        id: "CPN-04",
        code: "MONSOONOFF",
        discountType: "percentage",
        value: 12,
        minOrder: 15000,
        usageLimit: 250,
        usedCount: 250,
        expiryDate: "30 Sep 2026",
        status: "Expired"
      }
    ];
  });

  // 6. Homepage Banners State
  const [adminBanners, setAdminBanners] = useState(() => {
    return PROMOTIONAL_BANNERS.map((b, idx) => ({
      ...b,
      order: idx + 1,
      status: "Active",
      clicks: [1420, 890, 630][idx % 3],
      impressions: [8500, 5200, 4100][idx % 3]
    }));
  });

  // 7. Customer Reviews State
  const [adminReviews, setAdminReviews] = useState(() => {
    return [
      {
        id: "REV-01",
        productName: "Aarambh Solid Sheesham King Bed",
        customerName: "Sunita Kulkarni",
        rating: 5,
        date: "22 Oct 2026",
        comment: "Outstanding solid wood quality. The hydraulic storage lifts like butter with no creaking. Carpenter assembled it cleanly in 45 minutes.",
        status: "Approved",
        verifiedPurchase: true
      },
      {
        id: "REV-02",
        productName: "Virasaat 3-Seater Chesterfield Sofa",
        customerName: "Arjun Singhal",
        rating: 5,
        date: "21 Oct 2026",
        comment: "The velvet fabric is rich and deep charcoal. Solid teak legs feel indestructible. Everyone who visits compliments our living room.",
        status: "Approved",
        verifiedPurchase: true
      },
      {
        id: "REV-03",
        productName: "Nirvana Solid Teak Fluted Coffee Table",
        customerName: "Meenakshi Sundaram",
        rating: 4,
        date: "20 Oct 2026",
        comment: "Banswara marble top looks genuine with subtle grey veins. Extremely heavy and stable. Delivery arrived on time.",
        status: "Approved",
        verifiedPurchase: true
      },
      {
        id: "REV-04",
        productName: "Kashmiri 4-Door Wardrobe",
        customerName: "Devansh Rathore",
        rating: 5,
        date: "19 Oct 2026",
        comment: "Natural cane inlay looks authentic and breathable. No synthetic odor. White-glove team placed it exactly where requested.",
        status: "Pending",
        verifiedPurchase: true
      }
    ];
  });

  // 8. Admin Users and Roles (with Multi-Admin Creation Support)
  const DEFAULT_STAFF = [
    {
      id: "STAFF-01",
      name: "Mukund Sharma",
      email: "owner@mukulwoodline.com",
      phone: "+91 98201 44521",
      role: "Super Admin (Owner)",
      canAddAdmins: true,
      permissions: "Full Access (Store, Finance, Logistics, Settings, Admins)",
      permissionList: ["Products", "Orders", "Inventory", "Discounts", "Banners", "Reviews", "Analytics", "Settings", "Manage Admins"],
      status: "Active",
      invitedBy: "Primary Founder",
      dateAdded: "01 Jan 2026",
      lastActive: "Active Now"
    },
    {
      id: "STAFF-02",
      name: "Rajesh Verma",
      email: "rajesh.v@mukulwoodline.com",
      phone: "+91 98112 33410",
      role: "Store Administrator",
      canAddAdmins: true, // Multiple admins can also add other admins!
      permissions: "Catalog, Inventory, Orders, Discounts, Manage Admins",
      permissionList: ["Products", "Orders", "Inventory", "Discounts", "Manage Admins"],
      status: "Active",
      invitedBy: "Mukund Sharma",
      dateAdded: "15 Jan 2026",
      lastActive: "15 mins ago"
    },
    {
      id: "STAFF-03",
      name: "Priya Nair",
      email: "priya.n@mukulwoodline.com",
      phone: "+91 97405 66782",
      role: "Customer Support Lead",
      canAddAdmins: true, // Multiple admins can also add!
      permissions: "Orders, Reviews, Customer Directory, Manage Admins",
      permissionList: ["Orders", "Reviews", "Customer Directory", "Manage Admins"],
      status: "Active",
      invitedBy: "Mukund Sharma",
      dateAdded: "01 Feb 2026",
      lastActive: "1 hour ago"
    },
    {
      id: "STAFF-04",
      name: "Amit Choudhary",
      email: "amit.c@mukulwoodline.com",
      phone: "+91 96501 88902",
      role: "Warehouse & Logistics Lead",
      canAddAdmins: false,
      permissions: "Inventory, Order Fulfillment, Tracking",
      permissionList: ["Inventory", "Orders"],
      status: "Active",
      invitedBy: "Rajesh Verma (Store Administrator)",
      dateAdded: "10 Feb 2026",
      lastActive: "3 hours ago"
    }
  ];

  const [adminStaff, setAdminStaff] = useState(() => {
    try {
      const saved = localStorage.getItem('mw_admin_staff');
      return saved ? JSON.parse(saved) : DEFAULT_STAFF;
    } catch {
      return DEFAULT_STAFF;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mw_admin_staff', JSON.stringify(adminStaff));
    } catch (e) {
      console.error("Failed to save admin staff", e);
    }
  }, [adminStaff]);

  // Add a single administrator
  const addSingleAdmin = (newAdmin) => {
    const creatorName = adminUser?.name || "Store Administrator";
    const creatorRole = adminUser?.role || "Admin";
    const created = {
      id: `STAFF-${Date.now().toString().slice(-4)}`,
      name: newAdmin.name?.trim() || "Store Executive",
      email: newAdmin.email?.trim().toLowerCase(),
      phone: newAdmin.phone?.trim() || "+91 98000 00000",
      role: newAdmin.role || "Store Administrator",
      canAddAdmins: newAdmin.canAddAdmins ?? true, // multiple admins can also add
      permissions: newAdmin.permissions || "Catalog, Orders, Inventory",
      permissionList: newAdmin.permissionList || ["Products", "Orders", "Inventory"],
      password: newAdmin.password || "admin123",
      status: newAdmin.status || "Active",
      invitedBy: `${creatorName} (${creatorRole})`,
      dateAdded: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      lastActive: "Just created"
    };

    setAdminStaff(prev => [created, ...prev]);
    return created;
  };

  // Add MULTIPLE administrators in a single batch
  const addMultipleAdmins = (adminsList) => {
    const creatorName = adminUser?.name || "Store Administrator";
    const creatorRole = adminUser?.role || "Admin";
    const currentDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    const createdList = adminsList
      .filter(a => a && a.email && a.email.trim())
      .map((a, idx) => ({
        id: `STAFF-${Date.now().toString().slice(-4)}${idx}`,
        name: a.name?.trim() || `Admin User ${idx + 1}`,
        email: a.email.trim().toLowerCase(),
        phone: a.phone?.trim() || "+91 98000 00000",
        role: a.role || "Store Administrator",
        canAddAdmins: a.canAddAdmins ?? true, // multiple admins can also add
        permissions: a.permissions || "Catalog, Orders, Inventory",
        permissionList: a.permissionList || ["Products", "Orders", "Inventory"],
        password: a.password || "admin123",
        status: a.status || "Active",
        invitedBy: `${creatorName} (${creatorRole})`,
        dateAdded: currentDate,
        lastActive: "Just created"
      }));

    if (createdList.length > 0) {
      setAdminStaff(prev => [...createdList, ...prev]);
    }
    return createdList;
  };

  const updateAdminStaff = (id, updatedFields) => {
    setAdminStaff(prev => prev.map(staff => staff.id === id ? { ...staff, ...updatedFields } : staff));
  };

  const deleteAdminStaff = (id) => {
    setAdminStaff(prev => prev.filter(staff => staff.id !== id));
  };

  const toggleAdminStatus = (id) => {
    setAdminStaff(prev => prev.map(staff => {
      if (staff.id === id) {
        const nextStatus = staff.status === 'Active' ? 'Suspended' : 'Active';
        return { ...staff, status: nextStatus };
      }
      return staff;
    }));
  };

  // 9. Website Settings State
  const [settings, setSettings] = useState(() => {
    return {
      storeName: "Mukul Woodlline",
      tagline: "Crafting Comfort. Defining Homes.",
      supportEmail: "concierge@mukulwoodline.com",
      supportPhone: "1800-266-0123",
      whatsappNumber: "+91 98201 44521",
      gstNumber: "08AAACM9823L1ZP",
      workshopAddress: "RIICO Furniture Corridor, Industrial Phase II, Jodhpur - 342001",
      freeShippingThreshold: 5000,
      standardShippingFee: 999,
      maintenanceMode: false,
      enableReviews: true,
      autoApproveReviews: false,
      lowStockNotificationEmail: "inventory@mukulwoodline.com"
    };
  });

  // 10. Admin Notifications
  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      title: "Low Stock Alert",
      message: "Virasaat Chesterfield Sofa has only 2 units remaining in workshop.",
      time: "10 mins ago",
      type: "warning",
      read: false
    },
    {
      id: "notif-2",
      title: "New High-Value Order",
      message: "Order #MW-ORD-9281 (₹63,498) received from Vikram Malhotra.",
      time: "45 mins ago",
      type: "success",
      read: false
    },
    {
      id: "notif-3",
      title: "Review Awaiting Approval",
      message: "New 5-star review submitted for Kashmiri 4-Door Wardrobe.",
      time: "2 hours ago",
      type: "info",
      read: true
    }
  ]);

  // Persist products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mw_admin_products', JSON.stringify(adminProducts));
    } catch (e) { console.error(e); }
  }, [adminProducts]);

  useEffect(() => {
    try {
      localStorage.setItem('mw_admin_orders', JSON.stringify(adminOrders));
    } catch (e) { console.error(e); }
  }, [adminOrders]);

  // Product Actions
  const addProduct = (newProduct) => {
    const p = {
      ...newProduct,
      id: `mw-${Date.now()}`,
      sku: newProduct.sku || `MW-${newProduct.category?.substring(0, 3).toUpperCase() || 'CAT'}-${Math.floor(1000 + Math.random() * 9000)}`,
      rating: 4.8,
      reviewCount: 0,
      salesCount: 0,
      updatedAt: "Just now",
      status: newProduct.stock <= 0 ? "Out of Stock" : newProduct.stock <= 5 ? "Low Stock" : "Active",
      images: newProduct.images?.length ? newProduct.images : [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
      ],
      highlights: newProduct.highlights || ["100% Solid Kiln-Seasoned Wood", "Handcrafted in Jodhpur", "10-Year Warranty"],
      features: newProduct.features || { "Material": newProduct.material || "Solid Sheesham" }
    };
    setAdminProducts(prev => [p, ...prev]);
    return p;
  };

  const updateProduct = (id, updatedFields) => {
    setAdminProducts(prev => prev.map(p => {
      if (p.id === id) {
        const updated = { ...p, ...updatedFields, updatedAt: "Just now" };
        if (updated.stock !== undefined) {
          updated.status = updated.stock <= 0 ? "Out of Stock" : updated.stock <= 5 ? "Low Stock" : (updatedFields.status || p.status);
        }
        return updated;
      }
      return p;
    }));
  };

  const deleteProduct = (id) => {
    setAdminProducts(prev => prev.filter(p => p.id !== id));
  };

  const bulkUpdateProductStatus = (ids, status) => {
    setAdminProducts(prev => prev.map(p => {
      if (ids.includes(p.id)) {
        return { ...p, status, updatedAt: "Just now" };
      }
      return p;
    }));
  };

  const bulkDeleteProducts = (ids) => {
    setAdminProducts(prev => prev.filter(p => !ids.includes(p.id)));
  };

  // Order Actions
  const updateOrderStatus = (orderId, newStatus) => {
    setAdminOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status: newStatus };
      }
      return o;
    }));
  };

  // Coupon Actions
  const addCoupon = (newCoupon) => {
    setAdminCoupons(prev => [
      {
        id: `CPN-${Date.now()}`,
        usedCount: 0,
        status: "Active",
        ...newCoupon
      },
      ...prev
    ]);
  };

  const toggleCoupon = (id) => {
    setAdminCoupons(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: c.status === "Active" ? "Inactive" : "Active" };
      }
      return c;
    }));
  };

  const deleteCoupon = (id) => {
    setAdminCoupons(prev => prev.filter(c => c.id !== id));
  };

  // Review Actions
  const updateReviewStatus = (id, status) => {
    setAdminReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const deleteReview = (id) => {
    setAdminReviews(prev => prev.filter(r => r.id !== id));
  };

  // Calculated Analytics metrics
  const totalRevenue = adminOrders
    .filter(o => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrdersCount = adminOrders.filter(o => o.status === "Pending").length;
  const lowStockCount = adminProducts.filter(p => p.stock <= (p.lowStockThreshold || 5)).length;

  return (
    <AdminContext.Provider
      value={{
        adminUser,
        login,
        logout,
        adminProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        bulkUpdateProductStatus,
        bulkDeleteProducts,
        adminOrders,
        updateOrderStatus,
        adminCustomers,
        adminCoupons,
        addCoupon,
        toggleCoupon,
        deleteCoupon,
        adminBanners,
        setAdminBanners,
        adminReviews,
        updateReviewStatus,
        deleteReview,
        adminStaff,
        setAdminStaff,
        addSingleAdmin,
        addMultipleAdmins,
        updateAdminStaff,
        deleteAdminStaff,
        toggleAdminStatus,
        settings,
        setSettings,
        notifications,
        setNotifications,
        totalRevenue,
        pendingOrdersCount,
        lowStockCount
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
