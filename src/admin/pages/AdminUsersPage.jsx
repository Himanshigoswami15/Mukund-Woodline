import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  UserPlus, 
  Users, 
  Trash2, 
  Check, 
  X, 
  Shield, 
  Search, 
  Filter, 
  Plus, 
  Key, 
  Lock, 
  Mail, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  ChevronDown
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function AdminUsersPage() {
  const { 
    adminUser,
    adminStaff, 
    addSingleAdmin, 
    addMultipleAdmins, 
    deleteAdminStaff, 
    toggleAdminStatus 
  } = useAdmin();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modals state
  const [isSingleModalOpen, setIsSingleModalOpen] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [batchMode, setBatchMode] = useState('rows'); // 'rows' or 'paste'

  // Toast banner for feedback
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4500);
  };

  // Single Admin Form State
  const [singleAdmin, setSingleAdmin] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Store Administrator',
    password: 'admin' + Math.floor(100 + Math.random() * 900),
    canAddAdmins: true,
    permissions: ['Products', 'Orders', 'Inventory']
  });

  // Batch Multi-Admin Rows State (starts with 2 pre-filled empty rows)
  const [multiRows, setMultiRows] = useState([
    {
      id: 1,
      name: '',
      email: '',
      phone: '',
      role: 'Store Administrator',
      password: 'admin' + Math.floor(100 + Math.random() * 900),
      canAddAdmins: true
    },
    {
      id: 2,
      name: '',
      email: '',
      phone: '',
      role: 'Customer Support Lead',
      password: 'admin' + Math.floor(100 + Math.random() * 900),
      canAddAdmins: true
    }
  ]);

  // Bulk Paste State
  const [pasteText, setPasteText] = useState('');
  const [pasteDefaultRole, setPasteDefaultRole] = useState('Store Administrator');
  const [pasteCanAddAdmins, setPasteCanAddAdmins] = useState(true);

  // Available Roles
  const AVAILABLE_ROLES = [
    { label: 'Super Admin', desc: 'Full unrestricted control of all store operations, finances, & admins' },
    { label: 'Store Administrator', desc: 'Full access to products, orders, inventory, discounts, and can add admins' },
    { label: 'Workshop & Timber Lead', desc: 'Manage timber stock, workshop batch numbers, and inventory thresholds' },
    { label: 'Order Fulfillment Lead', desc: 'Manage orders, shipments, dispatch tracking, and customer communications' },
    { label: 'Customer Support Lead', desc: 'Manage customer accounts, orders, reviews, and support resolutions' },
    { label: 'Marketing & Discounts Lead', desc: 'Manage promotional banners, coupons, discount codes, and reviews' }
  ];

  const PERMISSION_OPTIONS = [
    'Products & Catalog',
    'Orders & Dispatch',
    'Timber Inventory',
    'Discounts & Coupons',
    'Homepage Banners',
    'Customer Reviews',
    'Analytics & Reports',
    'Manage Other Admins',
    'Store Settings'
  ];

  // Filtered staff list
  const filteredStaff = useMemo(() => {
    return adminStaff.filter(staff => {
      const matchSearch = 
        staff.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.phone?.includes(searchQuery) ||
        staff.role?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchRole = selectedRole === 'All' || staff.role === selectedRole;
      const matchStatus = selectedStatus === 'All' || staff.status === selectedStatus;

      return matchSearch && matchRole && matchStatus;
    });
  }, [adminStaff, searchQuery, selectedRole, selectedStatus]);

  // Stats calculation
  const totalAdminsCount = adminStaff.length;
  const canAddAdminsCount = adminStaff.filter(s => s.canAddAdmins !== false).length;
  const activeAdminsCount = adminStaff.filter(s => s.status === 'Active').length;

  // Single Admin submit
  const handleSingleSubmit = (e) => {
    e.preventDefault();
    if (!singleAdmin.email.trim()) return;

    addSingleAdmin({
      name: singleAdmin.name,
      email: singleAdmin.email,
      phone: singleAdmin.phone,
      role: singleAdmin.role,
      password: singleAdmin.password,
      canAddAdmins: singleAdmin.canAddAdmins,
      permissions: singleAdmin.permissions.join(', ')
    });

    setIsSingleModalOpen(false);
    showToast(`Administrator "${singleAdmin.name || singleAdmin.email}" successfully added!`);
    setSingleAdmin({
      name: '',
      email: '',
      phone: '',
      role: 'Store Administrator',
      password: 'admin' + Math.floor(100 + Math.random() * 900),
      canAddAdmins: true,
      permissions: ['Products', 'Orders', 'Inventory']
    });
  };

  // Multi-Row Admin submit
  const handleBatchRowsSubmit = (e) => {
    e.preventDefault();
    const validRows = multiRows.filter(r => r.email && r.email.trim());
    if (validRows.length === 0) {
      alert("Please provide at least one valid administrator email address.");
      return;
    }

    addMultipleAdmins(validRows.map(r => ({
      name: r.name,
      email: r.email,
      phone: r.phone,
      role: r.role,
      password: r.password,
      canAddAdmins: r.canAddAdmins,
      permissions: r.role === 'Super Admin' 
        ? "Full Access (Store, Finance, Settings, Admins)" 
        : "Catalog, Orders, Inventory, Manage Admins"
    })));

    setIsBatchModalOpen(false);
    showToast(`Successfully added ${validRows.length} administrators in batch!`);
    // reset to two fresh empty rows
    setMultiRows([
      { id: 1, name: '', email: '', phone: '', role: 'Store Administrator', password: 'admin' + Math.floor(100 + Math.random() * 900), canAddAdmins: true },
      { id: 2, name: '', email: '', phone: '', role: 'Customer Support Lead', password: 'admin' + Math.floor(100 + Math.random() * 900), canAddAdmins: true }
    ]);
  };

  // Add another row in Batch form
  const addBatchRow = () => {
    setMultiRows(prev => [
      ...prev,
      {
        id: Date.now(),
        name: '',
        email: '',
        phone: '',
        role: 'Store Administrator',
        password: 'admin' + Math.floor(100 + Math.random() * 900),
        canAddAdmins: true
      }
    ]);
  };

  const removeBatchRow = (id) => {
    if (multiRows.length <= 1) {
      alert("You need at least one row.");
      return;
    }
    setMultiRows(prev => prev.filter(r => r.id !== id));
  };

  const updateBatchRow = (id, field, value) => {
    setMultiRows(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  // Bulk Paste submit
  const handlePasteSubmit = (e) => {
    e.preventDefault();
    if (!pasteText.trim()) return;

    // Supports:
    // email1@domain.com
    // Name, email@domain.com
    // Name, email@domain.com, role
    const lines = pasteText.split('\n').map(l => l.trim()).filter(Boolean);
    const parsed = [];

    for (const line of lines) {
      const parts = line.split(',').map(p => p.trim());
      if (parts.length === 1 && parts[0].includes('@')) {
        parsed.push({
          name: parts[0].split('@')[0].replace(/[._]/g, ' '),
          email: parts[0],
          role: pasteDefaultRole,
          canAddAdmins: pasteCanAddAdmins
        });
      } else if (parts.length >= 2) {
        parsed.push({
          name: parts[0],
          email: parts[1],
          role: parts[2] || pasteDefaultRole,
          canAddAdmins: pasteCanAddAdmins
        });
      }
    }

    if (parsed.length === 0) {
      alert("No valid email addresses found in the pasted content.");
      return;
    }

    addMultipleAdmins(parsed);
    setIsBatchModalOpen(false);
    setPasteText('');
    showToast(`Batch added ${parsed.length} administrators from text!`);
  };

  const copyCreds = (staff) => {
    const text = `Mukund Woodline Admin Portal\nURL: ${window.location.origin}/admin/login\nEmail: ${staff.email}\nRole: ${staff.role}\nPassword: ${staff.password || 'admin123'}`;
    navigator.clipboard?.writeText(text);
    showToast(`Login credentials copied for ${staff.name}!`);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3B2213] text-[#FAF7F2] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#D4AF37]/40 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
          <span className="text-xs font-medium">{toastMsg}</span>
        </div>
      )}

      {/* Header & Title */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E9DDCD]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#5B3826]/10 text-[#5B3826]">
              Multi-Admin Security Suite
            </span>
            <span className="text-xs text-[#77736D]">
              Logged in as <strong className="text-[#3B2213]">{adminUser?.name || 'Super Admin'}</strong> ({adminUser?.role || 'Super Admin'})
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#292724] tracking-tight font-sans mt-1">
            Administrators & Multi-User Governance
          </h2>
          <p className="text-xs sm:text-sm text-[#77736D] mt-0.5 max-w-3xl">
            Authorize team members to administer timber catalog, customer orders, and shop settings. Multiple administrators can also invite and register additional staff members.
          </p>
        </div>

        {/* Action Buttons: Add Single vs Batch Add Multiple */}
        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
          <button
            onClick={() => setIsSingleModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#F8F6F2] text-[#5B3826] border border-[#5B3826]/30 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-[#5B3826]" />
            <span>Add Single Admin</span>
          </button>

          <button
            onClick={() => setIsBatchModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#5B3826] to-[#8C5835] hover:from-[#4A2E1F] hover:to-[#744528] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-[#5B3826]/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Users className="w-4 h-4 text-[#D4AF37]" />
            <span>+ Add Multiple Admins (Batch)</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E9DDCD] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#77736D] uppercase tracking-wider block">
              Total Administrators
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#292724] mt-1 block font-sans tracking-tight">
              {totalAdminsCount}
            </span>
            <span className="text-[11px] text-[#4E7A58] font-medium flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {activeAdminsCount} active accounts
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#5B3826]/10 text-[#5B3826] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E9DDCD] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#77736D] uppercase tracking-wider block">
              Multiple Admin Add Access
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#8C5835] mt-1 block font-sans tracking-tight">
              {canAddAdminsCount} Admins
            </span>
            <span className="text-[11px] text-[#77736D] mt-1 block">
              Can invite & provision other admins
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 text-[#8C5835] flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E9DDCD] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#77736D] uppercase tracking-wider block">
              Current Session
            </span>
            <span className="text-base font-bold text-[#292724] mt-1 block truncate max-w-[180px] font-sans">
              {adminUser?.email || 'admin@mukulwoodline.com'}
            </span>
            <span className="text-[11px] text-[#4E7A58] font-medium mt-1 block">
              256-Bit Encrypted RBAC
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#4E7A58]/10 text-[#4E7A58] flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E9DDCD] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, phone, or role..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F8F6F2] border border-[#E9DDCD] rounded-xl text-[#292724] placeholder-[#77736D] focus:outline-none focus:ring-2 focus:ring-[#5B3826]/20"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77736D]" />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-[#77736D]">
            <Filter className="w-3.5 h-3.5 text-[#5B3826]" />
            <span>Role:</span>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-[#F8F6F2] border border-[#E9DDCD] rounded-xl text-[#292724] focus:outline-none"
            >
              <option value="All">All Roles</option>
              <option value="Super Admin (Owner)">Super Admin</option>
              <option value="Store Administrator">Store Administrator</option>
              <option value="Workshop & Timber Lead">Workshop & Timber Lead</option>
              <option value="Warehouse & Logistics Lead">Logistics Lead</option>
              <option value="Customer Support Lead">Support Lead</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#77736D]">
            <span>Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-[#F8F6F2] border border-[#E9DDCD] rounded-xl text-[#292724] focus:outline-none"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-[#E9DDCD] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#292724]">
            <thead>
              <tr className="bg-[#F8F6F2] border-b border-[#E9DDCD] text-[#77736D] text-[11px] uppercase tracking-wider">
                <th className="py-4 pl-6 pr-3 font-semibold">Staff Member</th>
                <th className="py-4 px-3 font-semibold">Role</th>
                <th className="py-4 px-3 font-semibold">Privileges & Permissions</th>
                <th className="py-4 px-3 font-semibold">Provisioned By</th>
                <th className="py-4 px-3 font-semibold">Status</th>
                <th className="py-4 px-3 font-semibold">Last Active</th>
                <th className="py-4 pr-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F8F6F2]">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-[#F8F6F2]/60 transition-colors">
                  
                  {/* Staff Info */}
                  <td className="py-3.5 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5B3826] to-[#8C5835] text-[#FAF7F2] flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                        {staff.name ? staff.name.charAt(0).toUpperCase() : 'A'}
                      </div>
                      <div>
                        <span className="font-bold text-[#292724] block leading-tight">
                          {staff.name}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] text-[#77736D] mt-0.5">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-[#8C5835]" />
                            {staff.email}
                          </span>
                          {staff.phone && (
                            <span className="hidden sm:inline-block">
                              • {staff.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="py-3.5 px-3">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#5B3826]/10 text-[#5B3826]">
                      {staff.role}
                    </span>
                  </td>

                  {/* Permissions & Can Add Admins badge */}
                  <td className="py-3.5 px-3 max-w-xs">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {staff.canAddAdmins !== false && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9.5px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                          Can Add Admins
                        </span>
                      )}
                      <span className="text-[11px] text-[#77736D] truncate block">
                        {staff.permissions || 'Store Operations'}
                      </span>
                    </div>
                  </td>

                  {/* Provisioned By (Audit Trail) */}
                  <td className="py-3.5 px-3 text-[#77736D] text-[11px]">
                    <span className="block font-medium text-[#292724]">
                      {staff.invitedBy || 'System Provisioned'}
                    </span>
                    <span className="text-[10px] text-[#77736D]/80">
                      {staff.dateAdded || 'Heirloom Admin'}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-3">
                    <button
                      onClick={() => toggleAdminStatus(staff.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-transform active:scale-95 ${
                        staff.status === 'Active'
                          ? 'bg-[#4E7A58]/15 text-[#4E7A58] hover:bg-[#4E7A58]/25'
                          : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                      }`}
                      title="Click to toggle Active / Suspended status"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${staff.status === 'Active' ? 'bg-[#4E7A58]' : 'bg-rose-600'}`} />
                      {staff.status}
                    </button>
                  </td>

                  {/* Last Active */}
                  <td className="py-3.5 px-3 text-[#77736D] text-[11px]">
                    {staff.lastActive || 'Today'}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => copyCreds(staff)}
                        className="p-1.5 text-[#5B3826] hover:bg-[#FAF7F2] rounded-lg transition-colors"
                        title="Copy Login Credentials"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {staff.role.includes("Owner") ? (
                        <span className="text-[10px] text-[#77736D] font-semibold">Primary Founder</span>
                      ) : (
                        <button
                          onClick={() => {
                            if (window.confirm(`Revoke administrative access for "${staff.name}" (${staff.email})?`)) {
                              deleteAdminStaff(staff.id);
                              showToast(`Access revoked for ${staff.name}`);
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Revoke Admin Access"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredStaff.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#77736D]">
                    <Users className="w-10 h-10 text-[#D4AF37]/40 mx-auto mb-2" />
                    <p className="font-serif font-bold text-base text-[#292724]">No administrators match your filters</p>
                    <p className="text-xs mt-1">Try resetting your search query or role filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MODAL 1: ADD MULTIPLE ADMINS (BATCH PROVISIONING)             */}
      {/* ============================================================ */}
      {isBatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div onClick={() => setIsBatchModalOpen(false)} className="fixed inset-0" />

          <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-6 sm:p-8 z-10 border border-[#E9DDCD] space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#E9DDCD]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#5B3826] text-white">
                    Batch Creation
                  </span>
                  <span className="text-xs text-[#77736D]">Multiple Admins Provisioning</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#292724] mt-1">
                  Add Multiple Administrators at Once
                </h3>
                <p className="text-xs text-[#77736D] mt-0.5">
                  Provision accounts for workshop leads, merchandising teams, and regional managers in one step.
                </p>
              </div>

              <button 
                onClick={() => setIsBatchModalOpen(false)}
                className="p-1.5 text-[#77736D] hover:text-[#292724] hover:bg-[#F8F6F2] rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Selector Tabs */}
            <div className="flex border-b border-[#E9DDCD] text-xs font-bold">
              <button
                type="button"
                onClick={() => setBatchMode('rows')}
                className={`pb-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
                  batchMode === 'rows'
                    ? 'border-[#5B3826] text-[#5B3826]'
                    : 'border-transparent text-[#77736D] hover:text-[#292724]'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Multi-Row Form ({multiRows.length} Admins)</span>
              </button>

              <button
                type="button"
                onClick={() => setBatchMode('paste')}
                className={`pb-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
                  batchMode === 'paste'
                    ? 'border-[#5B3826] text-[#5B3826]'
                    : 'border-transparent text-[#77736D] hover:text-[#292724]'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Quick Bulk Paste (CSV / Emails)</span>
              </button>
            </div>

            {/* MODE A: Interactive Multi-Row Form */}
            {batchMode === 'rows' && (
              <form onSubmit={handleBatchRowsSubmit} className="space-y-4">
                <div className="space-y-3">
                  {multiRows.map((row, index) => (
                    <div 
                      key={row.id}
                      className="p-4 rounded-2xl bg-[#F8F6F2] border border-[#E9DDCD] space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-xs text-[#5B3826] flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-[#5B3826] text-white flex items-center justify-center text-[10px]">
                            {index + 1}
                          </span>
                          Admin #{index + 1}
                        </span>

                        {multiRows.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeBatchRow(row.id)}
                            className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                        <div>
                          <label className="block font-semibold mb-1 text-[#292724]">Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Anand Joshi"
                            value={row.name}
                            onChange={(e) => updateBatchRow(row.id, 'name', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-[#E9DDCD] rounded-xl focus:ring-2 focus:ring-[#5B3826]/20"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold mb-1 text-[#292724]">Admin Email *</label>
                          <input
                            type="email"
                            required
                            placeholder="anand.j@woodline.com"
                            value={row.email}
                            onChange={(e) => updateBatchRow(row.id, 'email', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-[#E9DDCD] rounded-xl focus:ring-2 focus:ring-[#5B3826]/20"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold mb-1 text-[#292724]">Assigned Role</label>
                          <select
                            value={row.role}
                            onChange={(e) => updateBatchRow(row.id, 'role', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-[#E9DDCD] rounded-xl focus:ring-2 focus:ring-[#5B3826]/20"
                          >
                            <option value="Super Admin">Super Admin</option>
                            <option value="Store Administrator">Store Administrator</option>
                            <option value="Workshop & Timber Lead">Workshop Lead</option>
                            <option value="Warehouse & Logistics Lead">Logistics Lead</option>
                            <option value="Customer Support Lead">Support Lead</option>
                            <option value="Marketing & Discounts Lead">Marketing Lead</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-semibold mb-1 text-[#292724]">Initial Password</label>
                          <input
                            type="text"
                            value={row.password}
                            onChange={(e) => updateBatchRow(row.id, 'password', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-[#E9DDCD] rounded-xl font-mono text-[11px]"
                          />
                        </div>
                      </div>

                      {/* Can Add Other Admins Checkbox */}
                      <div className="pt-2 flex items-center justify-between text-xs">
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={row.canAddAdmins}
                            onChange={(e) => updateBatchRow(row.id, 'canAddAdmins', e.target.checked)}
                            className="rounded text-[#5B3826] focus:ring-[#5B3826]"
                          />
                          <span className="font-medium text-[#292724]">
                            Allow this administrator to also invite and add other admins
                          </span>
                        </label>
                        <span className="text-[11px] text-[#77736D]">
                          Immediate login enabled at /admin/login
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Row Button */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={addBatchRow}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-[#F8F6F2] text-[#5B3826] border border-[#5B3826]/40 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add Another Admin Row</span>
                  </button>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setIsBatchModalOpen(false)}
                      className="px-4 py-2.5 text-xs text-[#77736D] hover:text-[#292724]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-to-r from-[#5B3826] to-[#8C5835] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                      Provision All {multiRows.length} Administrators
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* MODE B: Quick Bulk Paste */}
            {batchMode === 'paste' && (
              <form onSubmit={handlePasteSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1 text-[#292724]">
                    Paste Email List or CSV Data *
                  </label>
                  <p className="text-[11px] text-[#77736D] mb-2">
                    Enter one administrator per line. Format: <code className="bg-[#F8F6F2] px-1.5 py-0.5 rounded">email@domain.com</code> or <code className="bg-[#F8F6F2] px-1.5 py-0.5 rounded">Full Name, email@domain.com, Role</code>
                  </p>
                  <textarea
                    rows={6}
                    required
                    value={pasteText}
                    onChange={(e) => setPasteText(e.target.value)}
                    placeholder={`Kiran Patel, kiran.p@woodline.com, Store Administrator
Manish Rawat, manish.r@woodline.com, Workshop & Timber Lead
Deepa Sen, deepa.s@woodline.com, Customer Support Lead`}
                    className="w-full p-3 bg-[#F8F6F2] border border-[#E9DDCD] rounded-2xl font-mono text-xs focus:ring-2 focus:ring-[#5B3826]/20 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1 text-[#292724]">Default Role (if unspecified)</label>
                    <select
                      value={pasteDefaultRole}
                      onChange={(e) => setPasteDefaultRole(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E9DDCD] rounded-xl"
                    >
                      <option value="Store Administrator">Store Administrator</option>
                      <option value="Super Admin">Super Admin</option>
                      <option value="Workshop & Timber Lead">Workshop & Timber Lead</option>
                      <option value="Warehouse & Logistics Lead">Logistics Lead</option>
                      <option value="Customer Support Lead">Support Lead</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pasteCanAddAdmins}
                        onChange={(e) => setPasteCanAddAdmins(e.target.checked)}
                        className="rounded text-[#5B3826]"
                      />
                      <span className="font-medium text-[#292724]">
                        Allow batch admins to provision further admins
                      </span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E9DDCD] flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsBatchModalOpen(false)}
                    className="px-4 py-2.5 text-xs text-[#77736D]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#5B3826] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#4A2E1F]"
                  >
                    Batch Import & Provision
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: ADD SINGLE ADMIN (DETAILED RBAC PROVISIONING)        */}
      {/* ============================================================ */}
      {isSingleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div onClick={() => setIsSingleModalOpen(false)} className="fixed inset-0" />

          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 z-10 border border-[#E9DDCD] space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9DDCD]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C5835]">
                  Single Admin Provisioning
                </span>
                <h3 className="font-serif text-xl font-bold text-[#292724]">
                  Add New Administrator
                </h3>
              </div>
              <button 
                onClick={() => setIsSingleModalOpen(false)} 
                className="p-1 text-[#77736D] hover:bg-[#F8F6F2] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSingleSubmit} className="space-y-4 text-xs text-[#292724]">
              <div>
                <label className="block font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={singleAdmin.name}
                  onChange={(e) => setSingleAdmin({ ...singleAdmin, name: e.target.value })}
                  placeholder="e.g. Ramesh Kulkarni"
                  className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl focus:ring-2 focus:ring-[#5B3826]/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Corporate Email Address *</label>
                  <input
                    type="email"
                    required
                    value={singleAdmin.email}
                    onChange={(e) => setSingleAdmin({ ...singleAdmin, email: e.target.value })}
                    placeholder="ramesh.k@woodline.com"
                    className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl focus:ring-2 focus:ring-[#5B3826]/20"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Mobile Contact Phone</label>
                  <input
                    type="tel"
                    value={singleAdmin.phone}
                    onChange={(e) => setSingleAdmin({ ...singleAdmin, phone: e.target.value })}
                    placeholder="+91 98201 00000"
                    className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl focus:ring-2 focus:ring-[#5B3826]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Administrative Role</label>
                <select
                  value={singleAdmin.role}
                  onChange={(e) => setSingleAdmin({ ...singleAdmin, role: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl bg-white"
                >
                  {AVAILABLE_ROLES.map((r, i) => (
                    <option key={i} value={r.label}>
                      {r.label} — {r.desc.substring(0, 48)}...
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Initial Login Password</label>
                <div className="relative">
                  <input
                    type="text"
                    value={singleAdmin.password}
                    onChange={(e) => setSingleAdmin({ ...singleAdmin, password: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl font-mono text-xs pr-10"
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77736D]" />
                </div>
                <span className="text-[10px] text-[#77736D] mt-1 block">
                  Password can be changed by the administrator upon first login.
                </span>
              </div>

              {/* Can Add Other Admins Feature */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={singleAdmin.canAddAdmins}
                    onChange={(e) => setSingleAdmin({ ...singleAdmin, canAddAdmins: e.target.checked })}
                    className="rounded text-[#5B3826] focus:ring-[#5B3826]"
                  />
                  <div>
                    <span className="font-bold text-[#292724] block">
                      Grant Admin Creation Privilege ("Multiple Admins Can Add")
                    </span>
                    <span className="text-[11px] text-[#77736D] block">
                      Allows this administrator to add, invite, and provision new admins from their own account.
                    </span>
                  </div>
                </label>
              </div>

              {/* Granular Permissions */}
              <div>
                <label className="block font-semibold mb-2">Granular Module Access</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {PERMISSION_OPTIONS.map((perm, idx) => (
                    <label key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-[#F8F6F2] hover:bg-[#E9DDCD]/40 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={singleAdmin.permissions.includes(perm)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...singleAdmin.permissions, perm]
                            : singleAdmin.permissions.filter(p => p !== perm);
                          setSingleAdmin({ ...singleAdmin, permissions: updated });
                        }}
                        className="rounded text-[#5B3826]"
                      />
                      <span className="text-[11px] text-[#292724]">{perm}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E9DDCD] flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsSingleModalOpen(false)} 
                  className="px-4 py-2 border border-[#E9DDCD] rounded-xl hover:bg-[#F8F6F2]"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-[#5B3826] hover:bg-[#4A2E1F] text-white rounded-xl font-semibold shadow-sm"
                >
                  Provision Administrator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
