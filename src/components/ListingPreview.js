// components/ListingPreview.js
import React from 'react';
import { Star, IndianRupee, MapPin, User, Calendar, Package, Edit } from 'lucide-react';

const ListingPreview = ({ formData, images, onEdit, onSubmit, onCancel }) => {
  const getTypeColor = (type) => {
    switch(type?.toLowerCase()) {
      case 'costume': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'dress': return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'book': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'accessory': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'bag': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'jewelry': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const totalPrice = (parseFloat(formData.price_per_day) || 0) * 3 + (parseFloat(formData.cleaning_fee) || 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Preview Your Listing</h2>
        <p className="text-slate-600">This is how your listing will appear to potential renters</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg">
        {/* Preview Card */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 p-8">
          {/* Image Section */}
          <div className="lg:col-span-7 mb-8 lg:mb-0">
            {images.length > 0 ? (
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={images[0]?.url}
                    alt={formData.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${getTypeColor(formData.category)}`}>
                    {formData.category}
                  </div>
                </div>
                
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {images.slice(1, 5).map((image, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden">
                        <img
                          src={image.url}
                          alt={`Preview ${index + 2}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-80 bg-slate-100 rounded-2xl flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <Package size={48} className="mx-auto mb-4" />
                  <p>No images uploaded</p>
                </div>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                {formData.title || 'Untitled Item'}
              </h1>
              <div className="flex items-center space-x-4 text-slate-600 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-slate-400 text-slate-400" />
                  <span className="font-medium">New</span>
                </div>
                <span>•</span>
                <span>{formData.location || 'Location not set'}</span>
              </div>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-slate-900">
              ₹{formData.price_per_day || '0.00'}
              </span>
              <span className="text-slate-500">per day</span>
            </div>

            <div>
              <p className="text-slate-600 leading-relaxed">
                {formData.description || 'No description provided'}
              </p>
            </div>

            {/* Item Details */}
            <div className="grid grid-cols-2 gap-4">
              {formData.size && (
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <Package size={16} className="text-slate-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Size</div>
                    <div className="text-sm font-semibold text-slate-900">{formData.size}</div>
                  </div>
                </div>
              )}
              
              {formData.condition && (
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <Star size={16} className="text-slate-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Condition</div>
                    <div className="text-sm font-semibold text-slate-900 capitalize">{formData.condition.replace('-', ' ')}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="bg-slate-50 rounded-xl p-6">
              <h4 className="font-semibold text-slate-900 mb-4">Pricing</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">₹{formData.price_per_day || '0.00'} × 3 days</span>
                  <span className="text-slate-900">₹{((parseFloat(formData.price_per_day) || 0) * 3).toFixed(2)}</span>
                </div>
                {formData.cleaning_fee && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Cleaning fee</span>
                    <span className="text-slate-900">₹{formData.cleaning_fee}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-slate-200 font-semibold">
                  <span className="text-slate-900">Total</span>
                  <span className="text-slate-900">₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-slate-100 p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <button
              onClick={onEdit}
              className="flex items-center space-x-2 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
            >
              <Edit size={16} />
              <span>Edit Listing</span>
            </button>

            <div className="flex space-x-4">
              <button
                onClick={onCancel}
                className="px-6 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors font-medium"
              >
                Submit for Approval
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPreview;
