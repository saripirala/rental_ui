// components/ItemDetails.js
import React from 'react';
import { Package, Ruler, Palette, Tag, Star, Heart, Share } from 'lucide-react';

const ItemDetails = ({ listing, onToggleFavorite, onShare }) => {
  const details = [
    { label: 'Category', value: listing.category, icon: Package },
    { label: 'Size', value: listing.size || 'One Size', icon: Ruler },
    { label: 'Color', value: listing.color || 'Multi-color', icon: Palette },
    { label: 'Condition', value: listing.condition || 'Excellent', icon: Tag }
  ];

  return (
    <div className="space-y-6">
      {/* Title and Actions */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2 leading-tight">
            {listing.title}
          </h1>
          <div className="flex items-center space-x-4 text-slate-600">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-slate-400 text-slate-400" />
              <span className="font-medium">4.9</span>
              <span className="text-slate-500">(23 reviews)</span>
            </div>
            <span>•</span>
            <span>{listing.location || "Premium Location"}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onShare}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <Share size={16} className="text-slate-600" />
          </button>
          <button
            onClick={onToggleFavorite}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <Heart size={16} className="text-slate-600" />
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold text-slate-900">${listing.price_per_day}</span>
        <span className="text-slate-500">per day</span>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Description</h3>
        <p className="text-slate-600 leading-relaxed">
          {listing.description || "Beautiful, high-quality item available for rent. Perfect for special occasions and events."}
        </p>
      </div>

      {/* Item Details Grid */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Item Details</h3>
        <div className="grid grid-cols-2 gap-4">
          {details.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Icon size={16} className="text-slate-600" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">{label}</div>
                <div className="text-sm font-semibold text-slate-900">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="pt-4 border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-slate-900">Cleaning:</span>
            <span className="text-slate-600 ml-2">Professional cleaning included</span>
          </div>
          <div>
            <span className="font-medium text-slate-900">Insurance:</span>
            <span className="text-slate-600 ml-2">Damage protection covered</span>
          </div>
          <div>
            <span className="font-medium text-slate-900">Delivery:</span>
            <span className="text-slate-600 ml-2">Pickup or local delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;