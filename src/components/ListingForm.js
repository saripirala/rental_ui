// components/ListingForm.js
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Package, IndianRupee, MapPin, FileText } from 'lucide-react';

const ListingForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const [currentStep, setCurrentStep] = useState(1);
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

  const steps = [
    { number: 1, title: 'Basic Info', icon: Package },
    { number: 2, title: 'Pricing', icon: IndianRupee },
    { number: 3, title: 'Location', icon: MapPin },
    { number: 4, title: 'Details', icon: FileText }
  ];

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Title is required';
      if (formData.title.length < 10) newErrors.title = 'Title must be at least 10 characters';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
      if (formData.description.length < 30) newErrors.description = 'Description must be at least 30 characters';
      if (!formData.category) newErrors.category = 'Category is required';
    }

    if (step === 2) {
      if (!formData.price_per_day) newErrors.price_per_day = 'Daily price is required';
      if (parseFloat(formData.price_per_day) <= 0) newErrors.price_per_day = 'Price must be greater than 0';
    }

    if (step === 3) {
      if (!formData.location.trim()) newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Item Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="e.g., Vintage Chanel Evening Dress"
                className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-slate-100 outline-none transition-all ${
                  errors.title ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-slate-300'
                }`}
                maxLength={80}
              />
              <div className="flex justify-between mt-1">
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                <p className="text-slate-400 text-sm ml-auto">{formData.title.length}/80</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => updateField('category', e.target.value)}
                className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-slate-100 outline-none transition-all ${
                  errors.category ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-slate-300'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Size
                </label>
                <select
                  value={formData.size}
                  onChange={(e) => updateField('size', e.target.value)}
                  className="w-full p-4 border border-slate-200 rounded-xl focus:border-slate-300 focus:ring-2 focus:ring-slate-100 outline-none transition-all"
                >
                  <option value="">Select size</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Color
                </label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => updateField('color', e.target.value)}
                  placeholder="e.g., Midnight Blue"
                  className="w-full p-4 border border-slate-200 rounded-xl focus:border-slate-300 focus:ring-2 focus:ring-slate-100 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Condition *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {conditions.map(condition => (
                  <label key={condition.value} className="relative">
                    <input
                      type="radio"
                      name="condition"
                      value={condition.value}
                      checked={formData.condition === condition.value}
                      onChange={(e) => updateField('condition', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.condition === condition.value
                        ? 'border-slate-900 bg-slate-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}>
                      <div className="font-medium text-slate-900">{condition.label.split(' - ')[0]}</div>
                      <div className="text-sm text-slate-500">{condition.label.split(' - ')[1]}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Describe your item in detail. Include brand, special features, sizing notes, and what makes it special..."
                rows={6}
                className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-slate-100 outline-none transition-all resize-none ${
                  errors.description ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-slate-300'
                }`}
                maxLength={1000}
              />
              <div className="flex justify-between mt-1">
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                <p className="text-slate-400 text-sm ml-auto">{formData.description.length}/1000</p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Daily Rental Price *
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="number"
                  value={formData.price_per_day}
                  onChange={(e) => updateField('price_per_day', e.target.value)}
                  placeholder="0.00"
                  min="1"
                  step="0.01"
                  className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-slate-100 outline-none transition-all ${
                    errors.price_per_day ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-slate-300'
                  }`}
                />
              </div>
              {errors.price_per_day && <p className="text-red-500 text-sm mt-1">{errors.price_per_day}</p>}
              <p className="text-slate-500 text-sm mt-2">
                Set a competitive daily rate. You can always adjust this later.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Cleaning Fee
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    value={formData.cleaning_fee}
                    onChange={(e) => updateField('cleaning_fee', e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl focus:border-slate-300 focus:ring-2 focus:ring-slate-100 outline-none transition-all"
                  />
                </div>
                <p className="text-slate-500 text-sm mt-1">Optional one-time fee</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Security Deposit
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    value={formData.security_deposit}
                    onChange={(e) => updateField('security_deposit', e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl focus:border-slate-300 focus:ring-2 focus:ring-slate-100 outline-none transition-all"
                  />
                </div>
                <p className="text-slate-500 text-sm mt-1">Refundable if no damage</p>
              </div>
            </div>

            {/* Pricing Preview */}
            <div className="bg-slate-50 rounded-xl p-6">
              <h4 className="font-semibold text-slate-900 mb-4">Pricing Preview</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Daily rate</span>
                  <span className="font-medium">₹{formData.price_per_day || '0.00'}</span>
                </div>
                {formData.cleaning_fee && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Cleaning fee</span>
                    <span className="font-medium">₹{formData.cleaning_fee}</span>
                  </div>
                )}
                {formData.security_deposit && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Security deposit</span>
                    <span className="font-medium">₹{formData.security_deposit} (refundable)</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-2 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total for 3 days</span>
                    <span>₹{((parseFloat(formData.price_per_day) || 0) * 3 + (parseFloat(formData.cleaning_fee) || 0)).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Location *
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  placeholder="Enter your city and area"
                  className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-slate-100 outline-none transition-all ${
                    errors.location ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-slate-300'
                  }`}
                />
              </div>
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              <p className="text-slate-500 text-sm mt-2">
                Your exact address won't be shared until a booking is confirmed
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Pickup Instructions
              </label>
              <textarea
                value={formData.pickup_instructions}
                onChange={(e) => updateField('pickup_instructions', e.target.value)}
                placeholder="Provide details about pickup location, parking, building access, preferred times, etc."
                rows={4}
                className="w-full p-4 border border-slate-200 rounded-xl focus:border-slate-300 focus:ring-2 focus:ring-slate-100 outline-none transition-all resize-none"
                maxLength={500}
              />
              <p className="text-slate-400 text-sm mt-1">{formData.pickup_instructions.length}/500</p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Rental Terms & Conditions
              </label>
              <textarea
                value={formData.rental_terms}
                onChange={(e) => updateField('rental_terms', e.target.value)}
                placeholder="Any special terms, care instructions, restrictions, or requirements for renters..."
                rows={5}
                className="w-full p-4 border border-slate-200 rounded-xl focus:border-slate-300 focus:ring-2 focus:ring-slate-100 outline-none transition-all resize-none"
                maxLength={800}
              />
              <p className="text-slate-400 text-sm mt-1">{formData.rental_terms.length}/800</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 mb-3">Before you submit</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Your listing will be reviewed within 12 hours</li>
                <li>• Make sure all information is accurate</li>
                <li>• Photos should be high-quality and well-lit</li>
                <li>• You can edit details after approval</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm ${
                currentStep >= step.number 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-slate-200 text-slate-500'
              }`}>
                <step.icon size={16} />
              </div>
              <div className="ml-3 hidden sm:block">
                <div className={`text-sm font-medium ${
                  currentStep >= step.number ? 'text-slate-900' : 'text-slate-500'
                }`}>
                  {step.title}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`hidden sm:block w-16 h-1 mx-4 rounded ${
                  currentStep > step.number ? 'bg-slate-900' : 'bg-slate-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <form onSubmit={handleSubmit}>
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-100">
            <button
              type="button"
              onClick={currentStep === 1 ? onCancel : prevStep}
              className="px-6 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
            >
              {currentStep === 1 ? 'Cancel' : 'Back'}
            </button>

            <button
              type={currentStep === 4 ? 'submit' : 'button'}
              onClick={currentStep === 4 ? undefined : nextStep}
              className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors font-medium flex items-center space-x-2"
            >
              <span>{currentStep === 4 ? 'Submit for Review' : 'Continue'}</span>
              {currentStep < 4 && <ChevronRight size={16} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListingForm;