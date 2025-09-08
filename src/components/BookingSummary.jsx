// components/BookingSummary.js
import React from 'react';
import { Calendar, IndianRupee, MapPin, User, Package, AlertCircle, Info } from 'lucide-react';

const BookingSummary = ({ listing, startDate, endDate, pricing, onEdit }) => {
  const dayCount = startDate && endDate 
    ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1
    : 0;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">Booking Summary</h3>
      
      {/* Item Info */}
      <div className="flex space-x-4 mb-6 pb-6 border-b border-slate-100">
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={listing.images?.[0] || "https://via.placeholder.com/80x80?text=No+Image"}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-slate-900 mb-1">{listing.title}</h4>
          <div className="flex items-center text-sm text-slate-500 mb-2">
            <User className="w-4 h-4 mr-1" />
            <span>{listing.users?.full_name || "Premium Host"}</span>
          </div>
          <div className="flex items-center text-sm text-slate-500">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{listing.location}</span>
          </div>
        </div>
      </div>

      {/* Date Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-slate-900">Rental Period</h4>
          <button
            onClick={onEdit}
            className="text-sm text-slate-600 hover:text-slate-900 underline transition-colors"
          >
            Edit dates
          </button>
        </div>
        
        {startDate && endDate ? (
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="flex items-center space-x-2 text-slate-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">Check-in</span>
                </div>
                <div className="font-semibold text-slate-900">{formatDate(startDate)}</div>
              </div>
              <div>
                <div className="flex items-center space-x-2 text-slate-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">Check-out</span>
                </div>
                <div className="font-semibold text-slate-900">{formatDate(endDate)}</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-200 text-center">
              <span className="font-semibold text-slate-900">{dayCount} {dayCount === 1 ? 'day' : 'days'} rental</span>
            </div>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <p className="text-amber-700 text-sm">Please select your rental dates first</p>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-4">
        <h4 className="font-semibold text-slate-900">Price Breakdown</h4>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">
              Price Breakdown{parseFloat(listing.price_per_day).toFixed(2)} × {dayCount} {dayCount === 1 ? 'day' : 'days'}
            </span>
            <span className="font-medium text-slate-900">
              ₹{(parseFloat(listing.price_per_day) * dayCount).toFixed(2)}
            </span>
          </div>
          
          {pricing.cleaningFee > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-600">Cleaning fee</span>
              <span className="font-medium text-slate-900">₹{pricing.cleaningFee.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-slate-600">Service fee</span>
            <span className="font-medium text-slate-900">₹{pricing.serviceFee.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-slate-600">Taxes</span>
            <span className="font-medium text-slate-900">₹{pricing.taxes.toFixed(2)}</span>
          </div>

          {pricing.securityDeposit > 0 && (
            <div className="flex justify-between pt-3 border-t border-slate-200">
              <div className="flex items-center space-x-1">
                <span className="text-slate-600">Security deposit</span>
                <Info className="w-4 h-4 text-slate-400" />
              </div>
              <span className="font-medium text-slate-600">₹{pricing.securityDeposit.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between pt-3 border-t border-slate-200 font-semibold text-lg">
            <span className="text-slate-900">Total</span>
            <span className="text-slate-900">₹{pricing.total.toFixed(2)}</span>
          </div>
        </div>

        {pricing.securityDeposit > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-blue-700 text-xs">
              Security deposit will be refunded within 3-5 business days after return, pending item inspection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;