import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical,
  CheckSquare,
  Square,
  Package
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { CATEGORIES } from '../../data/products';
import ProductFormModal from '../components/ProductFormModal';

export default function AdminProductsPage() {
  const { 
    adminProducts, 
    deleteProduct, 
    bulkUpdateProductStatus, 
    bulkDeleteProducts 
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc'); // 'name-asc', 'price-asc', 'price-desc', 'stock-asc', 'stock-desc', 'date-desc'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Selected products for bulk actions
  const [selectedIds, setSelectedIds] = useState([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmBulkDelete, setConfirmBulkDelete] = useState(false);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let result = [...adminProducts];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q) ||
        p.material?.toLowerCase().includes(q) ||
        p.categoryName?.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter(p => p.category === categoryFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(p => p.status === statusFilter);
    }

    // Sorting
    switch (sortBy) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'stock-asc':
        result.sort((a, b) => a.stock - b.stock);
        break;
      case 'stock-desc':
        result.sort((a, b) => b.stock - a.stock);
        break;
      case 'date-desc':
      default:
        // maintain order
        break;
    }

    return result;
  }, [adminProducts, searchQuery, categoryFilter, statusFilter, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Multi-select helpers
  const handleSelectAll = () => {
    if (selectedIds.length === paginatedProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedProducts.map(p => p.id));
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsFormModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsFormModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (confirmDeleteId) {
      deleteProduct(confirmDeleteId);
      setConfirmDeleteId(null);
      setSelectedIds(prev => prev.filter(id => id !== confirmDeleteId));
    }
  };

  const handleBulkDeleteConfirm = () => {
    bulkDeleteProducts(selectedIds);
    setSelectedIds([]);
    setConfirmBulkDelete(false);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9DDCD]">
        <div>
          <h2 className="text-2xl font-extrabold text-[#292724] tracking-tight font-sans">
            Furniture Product Catalog ({adminProducts.length} Items)
          </h2>
          <p className="text-xs text-[#77736D] mt-0.5">
            Manage timber materials, pricing in INR, SKUs, workshop stock, and visual merchandising.
          </p>
        </div>

        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#5B3826] hover:bg-[#4A2E1F] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* 2. Filter & Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E9DDCD] shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 text-xs">
          
          {/* Search Box (5 cols) */}
          <div className="sm:col-span-2 lg:col-span-5 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by title, SKU, or solid timber material..."
              className="w-full pl-9 pr-3 py-2 bg-[#F8F6F2] border border-[#E9DDCD] rounded-xl text-[#292724] focus:outline-none focus:border-[#5B3826]"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77736D]" />
          </div>

          {/* Category Filter (3 cols) */}
          <div className="lg:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-[#F8F6F2] border border-[#E9DDCD] rounded-xl text-[#292724] focus:outline-none focus:border-[#5B3826] cursor-pointer"
            >
              <option value="all">All Categories ({CATEGORIES.length})</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Status Filter (2 cols) */}
          <div className="lg:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-[#F8F6F2] border border-[#E9DDCD] rounded-xl text-[#292724] focus:outline-none focus:border-[#5B3826] cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active in Store</option>
              <option value="Low Stock">Low Stock Alert</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Draft">Draft / Hidden</option>
            </select>
          </div>

          {/* Sort By (2 cols) */}
          <div className="lg:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-[#F8F6F2] border border-[#E9DDCD] rounded-xl text-[#292724] focus:outline-none focus:border-[#5B3826] cursor-pointer"
            >
              <option value="date-desc">Newest First</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="price-asc">Price (Low → High)</option>
              <option value="price-desc">Price (High → Low)</option>
              <option value="stock-asc">Stock (Low → High)</option>
              <option value="stock-desc">Stock (High → Low)</option>
            </select>
          </div>

        </div>

        {/* Bulk Action Controls Bar (When items selected) */}
        {selectedIds.length > 0 && (
          <div className="p-2.5 bg-[#FAF7F2] border border-[#E9DDCD] rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#5B3826]">{selectedIds.length} Products Selected</span>
              <span className="text-[#77736D]">for bulk modification</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => bulkUpdateProductStatus(selectedIds, 'Active')}
                className="px-3 py-1 bg-white hover:bg-[#E9DDCD] border border-[#E9DDCD] text-[#4E7A58] font-semibold rounded-lg transition-colors"
              >
                Set Active
              </button>
              <button
                onClick={() => bulkUpdateProductStatus(selectedIds, 'Draft')}
                className="px-3 py-1 bg-white hover:bg-[#E9DDCD] border border-[#E9DDCD] text-[#77736D] font-semibold rounded-lg transition-colors"
              >
                Set as Draft
              </button>
              <button
                onClick={() => setConfirmBulkDelete(true)}
                className="px-3 py-1 bg-[#B8433E] hover:bg-[#9B3733] text-white font-semibold rounded-lg transition-colors"
              >
                Delete Selected
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Products Table */}
      <div className="bg-white rounded-3xl border border-[#E9DDCD] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#292724]">
            <thead>
              <tr className="bg-[#F8F6F2] border-b border-[#E9DDCD] text-[#77736D] text-[11px] uppercase tracking-wider">
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={paginatedProducts.length > 0 && selectedIds.length === paginatedProducts.length}
                    onChange={handleSelectAll}
                    className="rounded border-[#E9DDCD] text-[#5B3826] focus:ring-[#5B3826]"
                  />
                </th>
                <th className="py-4 pr-3 font-semibold">Product</th>
                <th className="py-4 px-3 font-semibold">SKU Code</th>
                <th className="py-4 px-3 font-semibold">Category</th>
                <th className="py-4 px-3 font-semibold">Price (INR)</th>
                <th className="py-4 px-3 font-semibold">Workshop Stock</th>
                <th className="py-4 px-3 font-semibold">Status</th>
                <th className="py-4 px-3 font-semibold">Last Updated</th>
                <th className="py-4 pr-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F8F6F2]">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((p) => {
                  const isSelected = selectedIds.includes(p.id);

                  let statusBadge = "bg-[#4E7A58]/10 text-[#4E7A58]";
                  if (p.status === "Low Stock") statusBadge = "bg-[#C78426]/10 text-[#C78426]";
                  if (p.status === "Out of Stock") statusBadge = "bg-[#B8433E]/10 text-[#B8433E]";
                  if (p.status === "Draft") statusBadge = "bg-[#77736D]/10 text-[#77736D]";

                  return (
                    <tr 
                      key={p.id}
                      className={`hover:bg-[#F8F6F2]/60 transition-colors ${isSelected ? 'bg-[#FAF7F2]' : ''}`}
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectOne(p.id)}
                          className="rounded border-[#E9DDCD] text-[#5B3826] focus:ring-[#5B3826]"
                        />
                      </td>

                      {/* Product Thumbnail & Name */}
                      <td className="py-3 pr-3">
                        <div className="flex items-center gap-3 min-w-[200px]">
                          <img
                            src={p.images[0]}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover border border-[#E9DDCD] shrink-0 bg-[#F8F6F2]"
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-[#292724] block truncate hover:text-[#5B3826]">
                              {p.name}
                            </span>
                            <span className="text-[11px] text-[#77736D] truncate block">
                              {p.material} • {p.finish}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="py-3 px-3 font-mono font-semibold text-[#5B3826]">
                        {p.sku || `MW-${p.id}`}
                      </td>

                      {/* Category */}
                      <td className="py-3 px-3 text-[#77736D] font-medium">
                        {p.categoryName}
                      </td>

                      {/* Price */}
                      <td className="py-3 px-3">
                        <span className="font-bold text-[#292724] block">₹{p.price.toLocaleString('en-IN')}</span>
                        {p.originalPrice > p.price && (
                          <span className="text-[10px] text-[#77736D] line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                      </td>

                      {/* Stock */}
                      <td className="py-3 px-3">
                        <span className={`font-bold ${p.stock <= 5 ? 'text-[#B8433E]' : 'text-[#292724]'}`}>
                          {p.stock} units
                        </span>
                        {p.stock <= 5 && p.stock > 0 && (
                          <span className="text-[10px] text-[#C78426] block font-semibold">Low stock</span>
                        )}
                        {p.stock === 0 && (
                          <span className="text-[10px] text-[#B8433E] block font-semibold">Out of stock</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusBadge}`}>
                          {p.status}
                        </span>
                      </td>

                      {/* Last Updated */}
                      <td className="py-3 px-3 text-[#77736D] text-[11px]">
                        {p.updatedAt || "23 Oct 2026"}
                      </td>

                      {/* Actions */}
                      <td className="py-3 pr-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleEditClick(p)}
                            className="p-1.5 text-[#5B3826] hover:bg-[#E9DDCD]/40 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(p.id)}
                            className="p-1.5 text-[#B8433E] hover:bg-[#B8433E]/10 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="p-12 text-center text-[#77736D]">
                    <Package className="w-10 h-10 text-[#5B3826] mx-auto mb-2 opacity-50" />
                    <p className="font-semibold text-sm">No furniture products match your query.</p>
                    <p className="text-xs mt-0.5">Try resetting the category filter or searching with another keyword.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 bg-[#F8F6F2] border-t border-[#E9DDCD] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#77736D]">
          <div>
            Showing <strong>{Math.min(1 + (currentPage - 1) * itemsPerPage, filteredProducts.length)}</strong> to <strong>{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</strong> of <strong>{filteredProducts.length}</strong> products
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-[#E9DDCD] bg-white disabled:opacity-40 hover:bg-[#FAF7F2] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg font-semibold transition-colors ${
                  currentPage === page 
                    ? 'bg-[#5B3826] text-white' 
                    : 'bg-white border border-[#E9DDCD] hover:bg-[#FAF7F2] text-[#292724]'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-[#E9DDCD] bg-white disabled:opacity-40 hover:bg-[#FAF7F2] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      <ProductFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        productToEdit={editingProduct}
      />

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-[#E9DDCD] text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-[#B8433E]/10 text-[#B8433E] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#292724]">Confirm Product Deletion</h4>
            <p className="text-xs text-[#77736D] leading-relaxed">
              Are you sure you want to remove this product from the Mukul Woodlline catalog? This action will delist the product from customer storefronts.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 py-2 border border-[#E9DDCD] text-[#77736D] rounded-xl text-xs font-semibold hover:bg-[#F8F6F2]"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-2 bg-[#B8433E] text-white rounded-xl text-xs font-bold hover:bg-[#9B3733]"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Modal */}
      {confirmBulkDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-[#E9DDCD] text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-[#B8433E]/10 text-[#B8433E] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#292724]">Delete {selectedIds.length} Products</h4>
            <p className="text-xs text-[#77736D] leading-relaxed">
              Are you sure you want to delete all {selectedIds.length} selected products in bulk?
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setConfirmBulkDelete(false)}
                className="flex-1 py-2 border border-[#E9DDCD] text-[#77736D] rounded-xl text-xs font-semibold hover:bg-[#F8F6F2]"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkDeleteConfirm}
                className="flex-1 py-2 bg-[#B8433E] text-white rounded-xl text-xs font-bold hover:bg-[#9B3733]"
              >
                Confirm Bulk Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
