// components/BookingConfirmation.js
import React from 'react';
import { CheckCircle, Calendar, MapPin, User, IndianRupee, Download, MessageCircle, Package, Mail, Phone, Clock, Shield } from 'lucide-react';

const BookingConfirmation = ({ booking, listing, onBackToHome, onDownloadReceipt, onContactHost }) => {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const dayCount = Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24)) + 1;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-10">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Booking Confirmed!</h1>
        <p className="text-xl text-slate-600 mb-2">
          Your rental request has been successfully processed
        </p>
        <p className="text-sm text-slate-500">
          Confirmation sent to {booking.guestInfo.email}
        </p>
      </div>

      {/* Main Booking Card */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl mb-8">
        {/* Header with Booking ID */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Rental Confirmation</h2>
              <p className="text-slate-300 text-lg">Booking ID: #{booking.id || 'LR' + Date.now()}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-300 text-sm">Confirmed on</p>
              <p className="text-white font-semibold">
                {new Date(booking.confirmedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Item Information */}
          <div className="flex space-x-6 mb-8 pb-8 border-b border-slate-100">
            <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src={listing.images?.[0] || "https://via.placeholder.com/128x128?text=No+Image"}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{listing.title}</h3>
              <div className="space-y-2">
                <div className="flex items-center text-slate-600">
                  <User className="w-5 h-5 mr-3" />
                  <span className="font-medium">Hosted by {listing.users?.full_name || "Premium Host"}</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Package className="w-5 h-5 mr-3" />
                  <span className="capitalize">{listing.category} • {listing.size || 'One Size'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rental Period & Guest Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Rental Period */}
            <div className="bg-slate-50 rounded-2xl p-6">
              <h4 className="font-bold text-slate-900 mb-6 flex items-center space-x-3">
                <Calendar className="w-6 h-6" />
                <span>Rental Period</span>
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-slate-600 font-medium">CHECK-IN</p>
                    <p className="text-lg font-bold text-slate-900">{formatDate(booking.startDate)}</p>
                    <p className="text-sm text-slate-500">After 10:00 AM</p>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-slate-600" />
                  </div>
                </div>
                
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-slate-600 font-medium">CHECK-OUT</p>
                      <p className="text-lg font-bold text-slate-900">{formatDate(booking.endDate)}</p>
                      <p className="text-sm text-slate-500">Before 6:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 text-center">
                  <p className="font-bold text-slate-900 text-lg">
                    {dayCount} {dayCount === 1 ? 'Day' : 'Days'} Rental
                  </p>
                </div>
              </div>
            </div>

            {/* Guest Information */}
            <div className="bg-slate-50 rounded-2xl p-6">
              <h4 className="font-bold text-slate-900 mb-6 flex items-center space-x-3">
                <User className="w-6 h-6" />
                <span>Guest Information</span>
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 font-medium">NAME</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {booking.guestInfo.firstName} {booking.guestInfo.lastName}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-600">{booking.guestInfo.email}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-600">{booking.guestInfo.phone}</span>
                </div>

                {booking.guestInfo.specialRequests && (
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-600 font-medium mb-2">SPECIAL REQUESTS</p>
                    <p className="text-sm text-slate-700 bg-white rounded-lg p-3">
                      {booking.guestInfo.specialRequests}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-8">
            <h4 className="font-bold text-slate-900 mb-6 flex items-center space-x-3">
              <IndianRupee className="w-6 h-6 text-green-600" />
              <span>Payment Summary</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Rental cost ({dayCount} days)</span>
                  <span className="font-medium text-slate-900">${booking.pricing.subtotal.toFixed(2)}</span>
                </div>
                {booking.pricing.cleaningFee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Cleaning fee</span>
                    <span className="font-medium text-slate-900">${booking.pricing.cleaningFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Service fee</span>
                  <span className="font-medium text-slate-900">${booking.pricing.serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Taxes</span>
                  <span className="font-medium text-slate-900">${booking.pricing.taxes.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-slate-900 text-lg">Total Paid</span>
                  <span className="font-bold text-slate-900 text-2xl">${booking.pricing.total.toFixed(2)}</span>
                </div>
                {booking.pricing.securityDeposit > 0 && (
                  <div className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Shield className="w-4 h-4" />
                      <span className="font-medium">Security Deposit: ${booking.pricing.securityDeposit.toFixed(2)}</span>
                    </div>
                    <p className="text-xs">Will be refunded within 3-5 days after return</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <h4 className="font-bold text-blue-900 mb-4 flex items-center space-x-3">
              <Clock className="w-6 h-6" />
              <span>What happens next?</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3 text-sm text-blue-800">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>You'll receive a detailed confirmation email within 5 minutes</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>The host will contact you 24-48 hours before pickup</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Bring a valid photo ID for item verification</span>
                </li>
              </ul>
              <ul className="space-y-3 text-sm text-blue-800">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Inspect the item carefully during pickup</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Return in same condition by check-out time</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Rate your experience after return</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
            <h4 className="font-bold text-amber-900 mb-4">Important Reminders</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-800">
              <div>
                <p className="font-medium mb-2">Pickup Instructions:</p>
                <p>{listing.pickup_instructions || "Contact the host for specific pickup details and location."}</p>
              </div>
              <div>
                <p className="font-medium mb-2">Care Instructions:</p>
                <p>{listing.rental_terms || "Handle with care and return in original condition. Professional cleaning included."}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={onDownloadReceipt}
              className="flex items-center justify-center space-x-3 px-6 py-4 border-2 border-slate-200 text-slate-700 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all font-medium"
            >
              <Download size={20} />
              <span>Download Receipt</span>
            </button>
            
            <button
              onClick={onContactHost}
              className="flex items-center justify-center space-x-3 px-6 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
            >
              <MessageCircle size={20} />
              <span>Message Host</span>
            </button>

            <button
              onClick={() => navigator.share && navigator.share({
                title: 'I just booked on  Rentals!',
                text: `Just booked "${listing.title}" for ${dayCount} days`,
                url: window.location.href
              })}
              className="flex items-center justify-center space-x-3 px-6 py-4 border-2 border-slate-200 text-slate-700 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all font-medium"
            >
              <Package size={20} />
              <span>Share Booking</span>
            </button>
          </div>

          {/* Back to Home */}
          <div className="text-center pt-6 border-t border-slate-100">
            <button
              onClick={onBackToHome}
              className="text-slate-600 hover:text-slate-900 underline transition-colors font-medium"
            >
              ← Back to Listings
            </button>
          </div>
        </div>
      </div>

      {/* Support Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
        <h4 className="font-semibold text-slate-900 mb-2">Need Help?</h4>
        <p className="text-slate-600 text-sm mb-4">
          Our support team is available 24/7 to assist you with your rental
        </p>
        <div className="flex justify-center space-x-4">
          <button className="text-slate-600 hover:text-slate-900 underline text-sm font-medium">
            Contact Support
          </button>
          <span className="text-slate-300">•</span>
          <button className="text-slate-600 hover:text-slate-900 underline text-sm font-medium">
            Help Center
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;