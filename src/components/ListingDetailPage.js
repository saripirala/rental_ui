// components/ListingDetailPage.js
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, IndianRupee, Star } from 'lucide-react'; // Add Star here
import ImageGallery from './ImageGallery';
import ItemDetails from './ItemDetails';
import OwnerProfile from './OwnerProfile';
import AvailabilityCalendar from './AvailabilityCalendar';
import RelatedItems from './RelatedItems';

const ListingDetailPage = ({ listingId, listings, onBack, onBooking }) => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    // Simulate API call - replace with actual API call
    const fetchListing = async () => {
      try {
        // For now, find from existing listings
        const found = listings.find(item => item.id === listingId);
        if (found) {
          setListing(found);
        } else {
          // In real app, make API call here
          const res = await fetch(`https://rental-sharing.onrender.com/api/costumes/${listingId}`);
          if (res.ok) {
            const data = await res.json();
            setListing(data);
          }
        }
      } catch (err) {
        console.error("Error fetching listing:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId, listings]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Item not found</h2>
          <p className="text-slate-600 mb-6">The listing you're looking for doesn't exist.</p>
          <button
            onClick={onBack}
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  const handleDateSelect = (dateStr) => {
    setSelectedDates(prev => {
      if (prev.includes(dateStr)) {
        return prev.filter(d => d !== dateStr);
      } else {
        return [...prev, dateStr].sort();
      }
    });
  };

  const handleBooking = () => {
    if (selectedDates.length === 0) {
      alert("Please select your rental dates first.");
      return;
    }
    onBooking && onBooking(listing, selectedDates);
  };

  const mockUnavailableDates = [
    '2025-09-05', '2025-09-06', '2025-09-15', '2025-09-16'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to listings</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-7 space-y-8">
            <ImageGallery 
              images={listing.images || []} 
              title={listing.title} 
            />
            
            <ItemDetails 
              listing={listing}
              onToggleFavorite={() => console.log('Toggle favorite')}
              onShare={() => console.log('Share item')}
            />
          </div>

          {/* Right Column - Booking and Owner */}
          <div className="lg:col-span-5 mt-8 lg:mt-0 space-y-8">
            {/* Booking Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-slate-900">₹{listing.price_per_day}</span>
                  <span className="text-slate-500">per day</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-slate-400 text-slate-400" />
                  <span className="text-sm font-medium">4.9</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Select your dates
                  </label>
                  <div className="text-xs text-slate-500 mb-3">
                    {selectedDates.length > 0 
                      ? `${selectedDates.length} ${selectedDates.length === 1 ? 'day' : 'days'} selected`
                      : 'Click dates to select your rental period'
                    }
                  </div>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={!listing.availability || selectedDates.length === 0}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  listing.availability && selectedDates.length > 0
                    ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {!listing.availability 
                  ? 'Currently Unavailable'
                  : selectedDates.length === 0 
                  ? 'Select Dates to Book'
                  : `Reserve for ${selectedDates.length} ${selectedDates.length === 1 ? 'day' : 'days'}`
                }
              </button>

              {/* Price Breakdown */}
              {selectedDates.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">${listing.price_per_day} × {selectedDates.length} days</span>
                    <span className="text-slate-900">${(parseFloat(listing.price_per_day) * selectedDates.length).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Service fee</span>
                    <span className="text-slate-900">${(parseFloat(listing.price_per_day) * selectedDates.length * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-100 font-semibold">
                    <span className="text-slate-900">Total</span>
                    <span className="text-slate-900">${(parseFloat(listing.price_per_day) * selectedDates.length * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Calendar */}
            <AvailabilityCalendar
              unavailableDates={mockUnavailableDates}
              onDateSelect={handleDateSelect}
              selectedDates={selectedDates}
            />

            {/* Owner Profile */}
            <OwnerProfile 
              owner={listing.users}
              onMessageOwner={() => console.log('Message owner')}
            />
          </div>
        </div>

        {/* Related Items */}
        <div className="mt-16">
          <RelatedItems
            relatedItems={listings}
            onItemClick={(itemId) => console.log('Navigate to item:', itemId)}
            currentItemId={listing.id}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;