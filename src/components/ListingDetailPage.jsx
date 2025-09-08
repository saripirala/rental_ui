// components/ListingDetailPage.js - Updated for Booking Flow
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, IndianRupee } from 'lucide-react';
import ImageGallery from './ImageGallery';
import ItemDetails from './ItemDetails';
import OwnerProfile from './OwnerProfile';
import AvailabilityCalendar from './AvailabilityCalendar';
import RelatedItems from './RelatedItems';

const ListingDetailPage = ({ listingId, listings, onBack, onStartBooking }) => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // Updated booking handler - now navigates to booking flow
  const handleBooking = () => {
    onStartBooking && onStartBooking(listing);
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
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm font-medium text-slate-600">Available</span>
                </div>
              </div>

              {/* Quick Preview Calendar */}
              <AvailabilityCalendar
                unavailableDates={mockUnavailableDates}
                onDateSelect={() => {}} // Disabled - for preview only
                selectedDates={[]}
              />

              {/* Book Now Button */}
              <button
                onClick={handleBooking}
                disabled={!listing.availability}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 mt-6 ${
                  listing.availability
                    ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {listing.availability ? 'Reserve Now' : 'Currently Unavailable'}
              </button>

              <p className="text-center text-slate-500 text-sm mt-3">
                You won't be charged yet
              </p>
            </div>

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