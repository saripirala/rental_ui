// components/ListingForm.js
import React, { useState } from 'react';
import { Package, IndianRupee, MapPin, FileText, ChevronDown } from 'lucide-react';

const ListingForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    size: '',
    color: '',
    condition: 'excellent',
    price_per_day: '',
    location: '',
    availability: true,
    cleaning_fee: '',
    security_deposit: '',
    rental_terms: '',
    pickup_instructions: '',
    ...initialData
  });

  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'costume', label: 'Designer Costume' },
    { value: 'dress', label: 'Dress' },
    { value: 'suit', label: 'Suit' },
    { value: 'accessory', label: 'Accessory' },
    { value: 'bag', label: 'Handbag' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'book', label: 'Book' },
    { value: 'other', label: 'Other' }
  ];

  const conditions = [
    { value: 'excellent', label: 'Excellent - Like new' },
    { value: 'very-good', label: 'Very Good - Minor wear' },
    { value: 'good', label: 'Good - Some signs of use' },
    { value: 'fair', label: 'Fair - Noticeable wear' }
  ];

  const sizes = [
    'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size', 'Custom'
  ];

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic Info validation
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    else if (formData.title.length < 10) newErrors.title = 'Title must be at least 10 characters';
    
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    else if (formData.description.length < 30) newErrors.description = 'Description must be at least 30 characters';
    
    if (!formData.category) newErrors.category = 'Category is required';

    // Pricing validation
    if (!formData.price_per_day) newErrors.price_per_day = 'Daily price is required';
    else if (parseFloat(formData.price_per_day) <= 0) newErrors.price_per_day = 'Price must be greater than 0';

    // Location validation
    if (!formData.location.trim()) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">List Your Item</h2>
        <p className="text-slate-600">Share your luxury items with the community</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8">
        <div className="space-y-8">
          
          {/* Basic Information Section */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Basic Information</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Title */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Item Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="e.g., Vintage Chanel Evening Dress"
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-slate-100 outline-none transition-all text-sm ${
                    errors.title ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-slate-300'
                  }`}
                  maxLength={80}
                />
                <div className="flex justify-between mt-1">
                  {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                  <p className="text-slate-400 text-xs ml-auto">{formData.title.length}/80</p>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Category *
                </label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-slate-100 outline-none transition-all appearance-none text-sm ${
                      errors.category ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-slate-300'
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Condition *
                </label>
                <div className="relative">
                  <select
                    value={formData.condition}
                    onChange={(e) => updateField('condition', e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:border-slate-300 focus:ring-2 focus:ring-slate-100 outline-none transition-all appearance-none text-sm"
                  >
                    {conditions.map(condition => (
                      <option key={condition.value} value={condition.value}>
                        {condition.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Size */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Size
                </label>
                <div className="relative">
                  <select
                    value={formData.size}
                    onChange={(e) => updateField('size', e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:border-slate-300 focus:ring-2 focus:ring-slate-100 outline-none transition-all appearance-none text-sm"
                  >
                    <option value="">Select size</option>
                    {sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Color
                </label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => updateField('color', e.target.value)}
                  placeholder="e.g., Midnight Blue"
                  className="w-full p-3 border border-slate-200 rounded-xl focus:border-slate-300 focus:ring-2 focus:ring-slate-100 outline-none transition-all text-sm"
                />
              </div>

              {/* Description */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Describe your item in detail. Include brand, special features, sizing notes, and what makes it special..."
                  rows={4}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-slate-100 outline-none transition-all resize-none text-sm ${
                    errors.description ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-slate-300'
                  }`}
                  maxLength={1000}
                />
                <div className="flex justify-between mt-1">
                  {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                  <p className="text-slate-400 text-xs ml-auto">{formData.description.length}/1000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="border-t border-slate-100 pt-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Pricing</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Daily Price */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Daily Rental Price *
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    value={formData.price_per_day}
                    onChange={(e) => updateField('price_per_day', e.target.value)}
                    placeholder="0.00"
                    min="1"
                    step="0.01"
                    className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-slate-100 outline-none transition-all text-sm ${
                      errors.price_per_day ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-slate-300'
                    }`}
                  />
                </div>
                {errors.price_per_day && <p className="text-red-500 text-xs mt-1">{errors.price_per_day}</p>}
              </div>

              {/* Cleaning Fee */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Cleaning Fee
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    value={formData.cleaning_fee}
                    onChange={(e) => updateField('cleaning_fee', e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:border-slate-300 focus:ring-2 focus:ring-slate-100 outline-none transition-all text-sm"
                  />
                </div>
                <p className="text-slate-500 text-xs mt-1">Optional one-time fee</p>
              </div>

              {/* Security Deposit */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Security Deposit
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    value={formData.security_deposit}
                    onChange={(e) => updateField('security_deposit', e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:border-slate-300 focus:ring-2 focus:ring-slate-100 outline-none transition-all text-sm"
                  />
                </div>
                <p className="text-slate-500 text-xs mt-1">Refundable if no damage</p>
              </div>
            </div>

            {/* Pricing Preview */}
            <div className="bg-slate-50 rounded-xl p-4 mt-6">
              <h4 className="font-semibold text-slate-900 mb-3 text-sm">Pricing Preview (3 days)</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">Daily rate × 3</span>
                  <span className="font-medium">₹{((parseFloat(formData.price_per_day) || 0) * 3).toFixed(2)}</span>
                </div>
                {formData.cleaning_fee && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Cleaning fee</span>
                    <span className="font-medium">₹{parseFloat(formData.cleaning_fee).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-2 flex justify-between font-semibold text-sm">
                  <span>Total</span>
                  <span>₹{((parseFloat(formData.price_per_day) || 0) * 3 + (parseFloat(formData.cleaning_fee) || 0)).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="border-t border-slate-100 pt-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Location & Pickup</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    placeholder="Enter your city and area"
                    className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-slate-100 outline-none transition-all text-sm ${
                      errors.location ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-slate-300'
                    }`}
                  />
                </div>
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                <p className="text-slate-500 text-xs mt-1">
                  Exact address shared after booking confirmation
                </p>
              </div>

              {/* Pickup Instructions */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Pickup Instructions
                </label>
                <textarea
                  value={formData.pickup_instructions}
                  onChange={(e) => updateField('pickup_instructions', e.target.value)}
                  placeholder="Pickup location, parking, building access, preferred times..."
                  rows={3}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:border-slate-300 focus:ring-2 focus:ring-slate-100 outline-none transition-all resize-none text-sm"
                  maxLength={500}
                />
                <p className="text-slate-400 text-xs mt-1">{formData.pickup_instructions.length}/500</p>
              </div>
            </div>
          </div>

          {/* Additional Details Section */}
          <div className="border-t border-slate-100 pt-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Additional Details</h3>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Rental Terms & Conditions
              </label>
              <textarea
                value={formData.rental_terms}
                onChange={(e) => updateField('rental_terms', e.target.value)}
                placeholder="Special terms, care instructions, restrictions, or requirements for renters..."
                rows={4}
                className="w-full p-3 border border-slate-200 rounded-xl focus:border-slate-300 focus:ring-2 focus:ring-slate-100 outline-none transition-all resize-none text-sm"
                maxLength={800}
              />
              <p className="text-slate-400 text-xs mt-1">{formData.rental_terms.length}/800</p>
            </div>

            {/* Submission Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2 text-sm">Before you submit</h4>
              <ul className="space-y-1 text-xs text-blue-800">
                <li>• Your listing will be reviewed within 12 hours</li>
                <li>• Make sure all information is accurate</li>
                <li>• Photos should be high-quality and well-lit</li>
                <li>• You can edit details after approval</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 mt-8 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-6 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Submit for Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListingForm;