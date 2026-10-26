import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2, Check, Image as ImageIcon } from 'lucide-react';
import { CATEGORIES } from '../../data/products';
import { useAdmin } from '../context/AdminContext';

export default function ProductFormModal({ isOpen, onClose, productToEdit, onSave }) {
  const { addProduct, updateProduct } = useAdmin();

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'living-room',
    categoryName: 'Living Room',
    subcategory: '',
    shortDescription: '',
    description: '',
    price: '',
    originalPrice: '',
    stock: '',
    material: 'Solid Sheesham Wood (Indian Rosewood)',
    dimensions: 'L: 72" x W: 36" x H: 30"',
    color: 'Walnut Brown',
    finish: 'Warm Walnut',
    weight: '45 kg',
    room: 'living-room',
    badge: 'New Arrival',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'
    ]
  });

  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        sku: productToEdit.sku || '',
        category: productToEdit.category || 'living-room',
        categoryName: productToEdit.categoryName || 'Living Room',
        subcategory: productToEdit.subcategory || '',
        shortDescription: productToEdit.shortDescription || productToEdit.description?.substring(0, 120) || '',
        description: productToEdit.description || '',
        price: productToEdit.price || '',
        originalPrice: productToEdit.originalPrice || '',
        stock: productToEdit.stock !== undefined ? productToEdit.stock : 10,
        material: productToEdit.material || 'Solid Sheesham Wood',
        dimensions: productToEdit.dimensions || '',
        color: productToEdit.color || 'Walnut Brown',
        finish: productToEdit.finish || 'Warm Walnut',
        weight: productToEdit.weight || '45 kg',
        room: productToEdit.room || productToEdit.category || 'living-room',
        badge: productToEdit.badge || 'Active',
        images: productToEdit.images?.length ? productToEdit.images : [
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'
        ]
      });
    } else {
      // New product defaults
      setFormData({
        name: '',
        sku: `MW-${Math.floor(1000 + Math.random() * 9000)}`,
        category: 'living-room',
        categoryName: 'Living Room',
        subcategory: 'Sofas & Recliners',
        shortDescription: '',
        description: '',
        price: '',
        originalPrice: '',
        stock: '12',
        material: 'Solid Sheesham Wood (Indian Rosewood)',
        dimensions: 'L: 72" x W: 36" x H: 30"',
        color: 'Natural Walnut',
        finish: 'Warm Walnut',
        weight: '48 kg',
        room: 'living-room',
        badge: 'New Arrival',
        images: [
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'
        ]
      });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'category') {
      const cat = CATEGORIES.find(c => c.id === value);
      if (cat) {
        setFormData(prev => ({
          ...prev,
          categoryName: cat.name,
          room: cat.id,
          subcategory: cat.subcategories[0]?.name || ''
        }));
      }
    }
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    if (newImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()]
      }));
      setNewImageUrl('');
    }
  };

  const handleProductImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (PNG, JPG, WEBP).');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, event.target.result]
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const priceNum = Number(formData.price) || 0;
    const origPriceNum = Number(formData.originalPrice) || Math.round(priceNum * 1.3);
    const discount = origPriceNum > priceNum ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100) : 0;

    const payload = {
      ...formData,
      price: priceNum,
      originalPrice: origPriceNum,
      discount: discount,
      stock: Number(formData.stock) || 0
    };

    if (productToEdit) {
      updateProduct(productToEdit.id, payload);
    } else {
      addProduct(payload);
    }

    if (onSave) onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div onClick={onClose} className="fixed inset-0" />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col z-10 border border-[#E9DDCD] overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#5B3826] text-white flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-serif text-xl font-bold">
              {productToEdit ? `Edit Product: ${productToEdit.name}` : "Add New Handcrafted Furniture Product"}
            </h3>
            <p className="text-xs text-[#E9DDCD]/80 mt-0.5">
              Fill in product specifications, solid wood timber grade, pricing, and high-res imagery.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body (Scrollable) */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-[#292724]">
          
          {/* Section 1: Basic Details */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-[#5B3826] border-b border-[#E9DDCD] pb-1.5 uppercase tracking-wider">
              1. General Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Aarambh Solid Sheesham King Bed with Hydraulic Storage"
                  className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl focus:outline-none focus:border-[#5B3826]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">SKU Code *</label>
                <input
                  type="text"
                  required
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="e.g. MW-BED-1001"
                  className="w-full px-3 py-2 font-mono border border-[#E9DDCD] rounded-xl focus:outline-none focus:border-[#5B3826]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Primary Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl focus:outline-none focus:border-[#5B3826] bg-white cursor-pointer"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Subcategory</label>
                <input
                  type="text"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  placeholder="e.g. Hydraulic Storage Beds"
                  className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl focus:outline-none focus:border-[#5B3826]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Product Badge</label>
                <select
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl focus:outline-none focus:border-[#5B3826] bg-white"
                >
                  <option value="Bestseller">Bestseller</option>
                  <option value="New Arrival">New Arrival</option>
                  <option value="Trending">Trending</option>
                  <option value="Festive Deal">Festive Deal</option>
                  <option value="">No Badge</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Short Merchandising Summary</label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Brief one-line summary displayed on cards and search results..."
                className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl focus:outline-none focus:border-[#5B3826]"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Full Product Description & Craftsmanship Details</label>
              <textarea
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe timber kiln seasoning, joinery, finish, comfort, and interior styling..."
                className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl focus:outline-none focus:border-[#5B3826]"
              />
            </div>
          </div>

          {/* Section 2: Pricing & Inventory */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-[#5B3826] border-b border-[#E9DDCD] pb-1.5 uppercase tracking-wider">
              2. Pricing & Stock Control
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-1">Selling Price (INR ₹) *</label>
                <input
                  type="number"
                  required
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 46999"
                  className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl focus:outline-none focus:border-[#5B3826] font-bold text-[#5B3826]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Original MRP Price (INR ₹)</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  placeholder="e.g. 65999"
                  className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl focus:outline-none focus:border-[#5B3826]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Available Stock Quantity *</label>
                <input
                  type="number"
                  required
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="e.g. 15"
                  className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl focus:outline-none focus:border-[#5B3826]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Material, Dimensions & Technical Specs */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-[#5B3826] border-b border-[#E9DDCD] pb-1.5 uppercase tracking-wider">
              3. Specifications, Timber & Finish
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-1">Primary Material *</label>
                <input
                  type="text"
                  required
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  placeholder="e.g. Solid Sheesham Wood"
                  className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl focus:outline-none focus:border-[#5B3826]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Lustre / Wood Finish *</label>
                <input
                  type="text"
                  required
                  name="finish"
                  value={formData.finish}
                  onChange={handleChange}
                  placeholder="e.g. Warm Walnut"
                  className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl focus:outline-none focus:border-[#5B3826]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Color Palette</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="e.g. Walnut Brown"
                  className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl focus:outline-none focus:border-[#5B3826]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Dimensions (L x W x H) *</label>
                <input
                  type="text"
                  required
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  placeholder='e.g. L: 84" x W: 76" x H: 44"'
                  className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl focus:outline-none focus:border-[#5B3826]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Unit Weight</label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g. 115 kg"
                  className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl focus:outline-none focus:border-[#5B3826]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Room Placement</label>
                <select
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#E9DDCD] rounded-xl focus:outline-none focus:border-[#5B3826] bg-white"
                >
                  <option value="living-room">Living Room</option>
                  <option value="bedroom">Bedroom</option>
                  <option value="dining-room">Dining Room</option>
                  <option value="study-office">Study & Office</option>
                  <option value="entryway">Foyer & Entryway</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Product Images */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-[#5B3826] border-b border-[#E9DDCD] pb-1.5 uppercase tracking-wider">
              4. Furniture Photography & Lifestyle Media
            </h4>

            {/* Existing images previews */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative aspect-4/3 rounded-xl overflow-hidden border border-[#E9DDCD] bg-[#F8F6F2] group">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  {idx === 0 && (
                    <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 bg-black/60 text-white text-[9px] rounded font-semibold">
                      Primary Cover
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Add image from System or URL */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Or paste furniture photo URL..."
                className="flex-1 px-3 py-2 border border-[#E9DDCD] rounded-xl focus:outline-none focus:border-[#5B3826]"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="px-3.5 py-2 bg-[#F8F6F2] hover:bg-[#E9DDCD] text-[#5B3826] border border-[#E9DDCD] rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add URL</span>
                </button>
                <label
                  htmlFor="product-image-upload"
                  className="px-4 py-2 bg-[#5B3826] hover:bg-[#4A2E1F] text-white rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer text-xs shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload from System</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="product-image-upload"
                  onChange={handleProductImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

        </form>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-[#F8F6F2] border-t border-[#E9DDCD] flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-[#E9DDCD] text-[#77736D] hover:text-[#292724] rounded-xl font-semibold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-[#5B3826] hover:bg-[#4A2E1F] text-white rounded-xl font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs"
          >
            <Check className="w-4 h-4" />
            <span>{productToEdit ? "Save Product Changes" : "Publish Product to Catalog"}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
