import React, { useState } from 'react';
import { Plus, Edit, Trash2, FolderTree, ArrowRight, X, Check, Image as ImageIcon } from 'lucide-react';
import { CATEGORIES } from '../../data/products';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(CATEGORIES.map(c => ({
    ...c,
    status: "Active"
  })));

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
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
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

  const handleSave = (e) => {
    e.preventDefault();
    const subs = formData.subcategoriesText
      .split(',')
      .map(s => ({ name: s.trim(), slug: s.trim().toLowerCase().replace(/\s+/g, '-') }))
      .filter(s => s.name.length > 0);

    if (editingCategory) {
      setCategories(prev => prev.map(c => c.id === editingCategory.id ? {
        ...c,
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        tagline: formData.tagline,
        image: formData.image,
        subcategories: subs
      } : c));
    } else {
      const newCat = {
        id: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        name: formData.name,
        tagline: formData.tagline,
        image: formData.image,
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
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => toggleStatus(cat.id)}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs cursor-pointer ${
                    cat.status === "Active" 
                      ? 'bg-[#4E7A58] text-white' 
                      : 'bg-[#77736D] text-white'
                  }`}
                >
                  {cat.status}
                </button>
              </div>
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[10px] uppercase tracking-wider text-[#E9DDCD] font-bold">
                  {cat.itemCount || 0}+ Products
                </span>
                <h3 className="font-serif text-lg font-bold text-white leading-tight">
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
                    {cat.subcategories?.map((sub, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#F8F6F2] border border-[#E9DDCD] text-[#292724] text-[10px] font-medium rounded-md">
                        {sub.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="mt-5 pt-3 border-t border-[#F8F6F2] flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-[#77736D]">/{cat.slug}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="p-1.5 text-[#5B3826] hover:bg-[#E9DDCD]/40 rounded-lg transition-colors"
                    title="Edit Category"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 text-[#B8433E] hover:bg-[#B8433E]/10 rounded-lg transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
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
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-[#77736D] hover:text-[#292724]">
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
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">URL Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. balcony-furniture"
                  className="w-full px-3 py-2 border rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Tagline / Subtext</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Weather-resistant solid teak loungers and planters"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Subcategories (Comma separated)</label>
                <input
                  type="text"
                  value={formData.subcategoriesText}
                  onChange={(e) => setFormData({ ...formData, subcategoriesText: e.target.value })}
                  placeholder="Loungers, Outdoor Benches, Garden Planters"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-[#E9DDCD] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5B3826] text-white rounded-xl font-semibold flex items-center gap-1.5"
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
