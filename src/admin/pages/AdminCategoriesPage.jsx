import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, FolderTree, ArrowRight, X, Check, Image as ImageIcon, Upload } from 'lucide-react';
import { CATEGORIES } from '../../data/products';

// Helper to sanitize and format URL-friendly slugs
const sanitizeSlug = (raw, fallback) => {
  let val = (raw || fallback || '').trim().toLowerCase();
  // Strip protocol and domain if user pasted a full URL
  if (val.startsWith('http://') || val.startsWith('https://')) {
    try {
      const parsed = new URL(val);
      val = parsed.pathname.split('/').filter(Boolean).pop() || 'category';
    } catch {
      val = 'category';
    }
  }
  // Remove special characters, query parameters, keep alphanumeric and dashes
  val = val.split('?')[0].replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return val.substring(0, 40) || `cat-${Date.now().toString().slice(-4)}`;
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('mw_admin_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(c => ({
            ...c,
            slug: sanitizeSlug(c.slug, c.name),
            status: c.status || "Active"
          }));
        }
      }
    } catch (e) {
      console.error(e);
    }
    return CATEGORIES.map(c => ({
      ...c,
      slug: sanitizeSlug(c.slug, c.name),
      status: "Active"
    }));
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mw_admin_categories', JSON.stringify(categories));
    } catch (e) {
      console.error(e);
    }
  }, [categories]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    tagline: '',
    image: '',
    subcategoriesText: ''
  });

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      tagline: '',
      image: '',
      subcategoriesText: 'Sofas, Coffee Tables, Accent Chairs'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      tagline: cat.tagline || '',
      image: cat.image || '',
      subcategoriesText: cat.subcategories?.map(s => s.name).join(', ') || ''
    });
    setIsModalOpen(true);
  };

  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please choose an image file (PNG, JPG, JPEG, WEBP).');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({ ...prev, image: event.target.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const subs = formData.subcategoriesText
      .split(',')
      .map(s => ({ name: s.trim(), slug: sanitizeSlug(s.trim(), s.trim()) }))
      .filter(s => s.name.length > 0);

    const cleanSlug = sanitizeSlug(formData.slug, formData.name);

    if (editingCategory) {
      setCategories(prev => prev.map(c => c.id === editingCategory.id ? {
        ...c,
        name: formData.name,
        slug: cleanSlug,
        tagline: formData.tagline,
        image: formData.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
        subcategories: subs
      } : c));
    } else {
      const newCat = {
        id: cleanSlug || `cat-${Date.now()}`,
        slug: cleanSlug,
        name: formData.name,
        tagline: formData.tagline,
        image: formData.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
        itemCount: 0,
        subcategories: subs,
        status: "Active"
      };
      setCategories(prev => [newCat, ...prev]);
    }
    setIsModalOpen(false);
  };

  const toggleStatus = (id) => {
    setCategories(prev => prev.map(c => c.id === id ? {
      ...c,
      status: c.status === "Active" ? "Hidden" : "Active"
    } : c));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9DDCD]">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#292724]">
            Category & Taxonomy Management ({categories.length})
          </h2>
          <p className="text-xs text-[#77736D] mt-0.5">
            Organize customer navigation mega-menus, room assignments, and furniture subcategories.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#5B3826] hover:bg-[#4A2E1F] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Category</span>
        </button>
      </div>

      {/* Categories Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-3xl border border-[#E9DDCD] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Image Preview & Status Badge */}
            <div className="relative aspect-16/9 bg-[#F8F6F2] overflow-hidden">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Top Action Badges */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                <button
                  onClick={() => toggleStatus(cat.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs cursor-pointer ${
                    cat.status === "Active" 
                      ? 'bg-[#4E7A58] text-white' 
                      : 'bg-[#77736D] text-white'
                  }`}
                >
                  {cat.status}
                </button>
                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="p-1.5 bg-black/60 hover:bg-[#5B3826] text-white backdrop-blur-xs rounded-lg transition-colors cursor-pointer"
                  title="Edit Category"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="p-1.5 bg-black/60 hover:bg-[#B8433E] text-white backdrop-blur-xs rounded-lg transition-colors cursor-pointer"
                  title="Delete Category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] uppercase tracking-wider text-[#E9DDCD] font-bold">
                  {cat.itemCount || 0}+ Products
                </span>
                <h3 className="font-serif text-lg font-bold text-white leading-tight truncate">
                  {cat.name}
                </h3>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#77736D] leading-relaxed line-clamp-2">
                  {cat.tagline || "Handcrafted wooden furniture for contemporary homes."}
                </p>

                {/* Subcategories list */}
                <div className="mt-4 pt-3 border-t border-[#F8F6F2]">
                  <span className="text-[10px] uppercase font-bold text-[#77736D] block mb-1.5">
                    Subcategories ({cat.subcategories?.length || 0})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cat.subcategories && cat.subcategories.length > 0 ? (
                      cat.subcategories.map((sub, i) => (
                        <span key={i} className="px-2 py-0.5 bg-[#F8F6F2] border border-[#E9DDCD] text-[#292724] text-[10px] font-medium rounded-md">
                          {sub.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-[#77736D] italic">No subcategories defined</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action buttons footer: guaranteed visible and shrink-resistant */}
              <div className="mt-5 pt-3 border-t border-[#F8F6F2] flex items-center justify-between gap-2 text-xs min-w-0">
                <span 
                  className="font-mono text-[11px] text-[#77736D] truncate max-w-[140px] sm:max-w-[180px] shrink block"
                  title={`/${cat.slug}`}
                >
                  /{cat.slug}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="px-2.5 py-1.5 bg-[#FAF7F2] hover:bg-[#E9DDCD] text-[#5B3826] border border-[#E9DDCD] rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer shadow-2xs"
                    title="Edit Category"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-[#B8433E] border border-red-200 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer shadow-2xs"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add/Edit Category */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div onClick={() => setIsModalOpen(false)} className="fixed inset-0" />

          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 z-10 border border-[#E9DDCD] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9DDCD]">
              <h3 className="font-serif text-lg font-bold text-[#292724]">
                {editingCategory ? "Edit Category Details" : "Create New Furniture Category"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-[#77736D] hover:text-[#292724] cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs text-[#292724]">
              <div>
                <label className="block font-semibold mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Balcony & Garden Furniture"
                  className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl focus:outline-none focus:border-[#5B3826]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">URL Slug (e.g. balcony-furniture)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. balcony-furniture"
                  className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl font-mono focus:outline-none focus:border-[#5B3826]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Tagline / Subtext</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Weather-resistant solid teak loungers and planters"
                  className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl focus:outline-none focus:border-[#5B3826]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1.5">Category Cover Image (Upload from System)</label>
                
                {/* Hidden native file input */}
                <input
                  type="file"
                  accept="image/*"
                  id="category-image-upload"
                  onChange={handleImageFileUpload}
                  className="hidden"
                />

                {formData.image ? (
                  <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-[#5B3826]/40 p-2 bg-[#F8F6F2]">
                    <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-white">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute top-2 right-2 flex items-center gap-2">
                        <label
                          htmlFor="category-image-upload"
                          className="px-3 py-1.5 bg-white/95 hover:bg-white text-[#5B3826] font-semibold text-xs rounded-lg shadow-sm cursor-pointer flex items-center gap-1.5 transition-all backdrop-blur-xs"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Change Photo</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: '' })}
                          className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm cursor-pointer transition-colors"
                          title="Remove photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#77736D] mt-1.5 text-center">
                      Image loaded from your system. Click "Change Photo" to pick another file.
                    </p>
                  </div>
                ) : (
                  <label
                    htmlFor="category-image-upload"
                    className="flex flex-col items-center justify-center border-2 border-dashed border-[#E9DDCD] hover:border-[#5B3826] bg-[#FAF7F2] hover:bg-[#F3EFEA] rounded-2xl p-6 transition-all cursor-pointer text-center group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#E9DDCD]/50 group-hover:bg-[#5B3826]/10 text-[#5B3826] flex items-center justify-center mb-2.5 transition-colors">
                      <Upload className="w-6 h-6" />
                    </div>
                    <span className="font-semibold text-xs text-[#292724]">
                      Click to choose an image from your computer
                    </span>
                    <span className="text-[11px] text-[#77736D] mt-1">
                      Uploads JPG, PNG, WEBP, or AVIF directly from your system
                    </span>
                  </label>
                )}
              </div>

              <div>
                <label className="block font-semibold mb-1">Subcategories (Comma separated)</label>
                <input
                  type="text"
                  value={formData.subcategoriesText}
                  onChange={(e) => setFormData({ ...formData, subcategoriesText: e.target.value })}
                  placeholder="Loungers, Outdoor Benches, Garden Planters"
                  className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl focus:outline-none focus:border-[#5B3826]"
                />
              </div>

              <div className="pt-3 border-t border-[#E9DDCD] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#E9DDCD] hover:bg-[#F8F6F2] rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5B3826] hover:bg-[#4A2E1F] text-white rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
