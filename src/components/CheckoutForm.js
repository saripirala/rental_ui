// components/CheckoutForm.js
import React, { useState } from 'react';
import { User, Mail, Phone, CreditCard, Shield, AlertCircle } from 'lucide-react';

const CheckoutForm = ({ onSubmit, onBack, startDate, endDate, pricing, isProcessing = false }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    agreeToTerms: false,
    agreeToRefund: false
  });

  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    if (!formData.agreeToRefund) newErrors.agreeToRefund = 'You must agree to the refund policy';

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
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Confirm and Pay</h2>
        <p className="text-slate-600">Enter your details to complete the booking</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Personal Information</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-slate-100 outline-none transition-all ${
                  errors.firstName ? 'border-red-300' : 'border-slate-200 focus:border-slate-300'
                }`}
                placeholder="John"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-slate-100 outline-none transition-all ${
                  errors.lastName ? 'border-red-300' : 'border-slate-200 focus:border-slate-300'
                }`}
                placeholder="Doe"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-slate-100 outline-none transition-all ${
                    errors.email ? 'border-red-300' : 'border-slate-200 focus:border-slate-300'
                  }`}
                  placeholder="john.doe@example.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-slate-100 outline-none transition-all ${
                    errors.phone ? 'border-red-300' : 'border-slate-200 focus:border-slate-300'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>
        </div>

        {/* Special Requests */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Special Requests</h3>
          <textarea
            value={formData.specialRequests}
            onChange={(e) => updateField('specialRequests', e.target.value)}
            placeholder="Any special requirements, questions for the owner, or pickup preferences..."
            rows={4}
            className="w-full p-4 border border-slate-200 rounded-xl focus:border-slate-300 focus:ring-2 focus:ring-slate-100 outline-none transition-all resize-none"
            maxLength={500}
          />
          <p className="text-slate-400 text-sm mt-1">{formData.specialRequests.length}/500</p>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Payment Method</span>
          </h3>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900 text-sm">Secure Payment</p>
                <p className="text-blue-700 text-xs">Your payment is protected by our secure payment system</p>
              </div>
            </div>
          </div>

          <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
            <CreditCard className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 font-medium">Payment integration coming soon</p>
            <p className="text-slate-500 text-sm">For now, payment will be handled offline</p>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Terms & Policies</h3>
          
          <div className="space-y-4">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => updateField('agreeToTerms', e.target.checked)}
                className="mt-1 w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-100"
              />
              <div className="text-sm">
                <span className="text-slate-900">I agree to the </span>
                <a href="#" className="text-slate-900 underline hover:text-slate-700">Terms of Service</a>
                <span className="text-slate-900"> and </span>
                <a href="#" className="text-slate-900 underline hover:text-slate-700">Community Guidelines</a>
              </div>
            </label>
            {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.agreeToRefund}
                onChange={(e) => updateField('agreeToRefund', e.target.checked)}
                className="mt-1 w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-100"
              />
              <div className="text-sm">
                <span className="text-slate-900">I understand the </span>
                <a href="#" className="text-slate-900 underline hover:text-slate-700">Cancellation Policy</a>
                <span className="text-slate-900"> and </span>
                <a href="#" className="text-slate-900 underline hover:text-slate-700">Refund Terms</a>
              </div>
            </label>
            {errors.agreeToRefund && <p className="text-red-500 text-sm">{errors.agreeToRefund}</p>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={isProcessing || !startDate || !endDate}
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-200 ${
              !isProcessing && startDate && endDate
                ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin w-4 h-4 border-2 border-slate-400 border-t-white rounded-full" />
                <span>Processing...</span>
              </div>
            ) : (
              `Confirm Booking • $${pricing.total.toFixed(2)}`
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;