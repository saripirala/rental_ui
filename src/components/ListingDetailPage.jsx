import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, IndianRupee, Heart, Share2, Star, ChevronDown, ChevronRight, Truck, Shield, RotateCcw, MapPin, User } from 'lucide-react';
import ImageGallery from './ImageGallery';
import OwnerProfile from './OwnerProfile';
import AvailabilityCalendar from './AvailabilityCalendar';
import RelatedItems from './RelatedItems';

const ListingDetailPage = ({ listingId, listings, onBack, onStartBooking }) => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [showMoreDetails, setShowMoreDetails] = useState(false);

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

  const mockUnavailableDates = [];

  // Use actual backend data with sensible fallbacks
  const rating = listing.rating || 4.5;
  const reviewCount = listing.reviewCount || 0;
  const pricePerDay = listing.pricePerDay || listing.price || 0;
  const sizes = listing.availableSizes || ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

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
            
            {/* Item Details Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
              {/* Category and Title */}
              <div className="space-y-2">
                {listing.category && (
                  <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    {listing.category}
                  </div>
                )}
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {listing.title || listing.name || 'Item Title'}
                </h1>
              </div>

              {/* Rating */}
              {reviewCount > 0 && (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-lg font-bold text-gray-900">{rating}</span>
                    <div className="flex items-center space-x-1">
                      {renderStars(rating)}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">({reviewCount} Reviews)</span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-gray-900">₹{pricePerDay}</span>
                <span className="text-lg text-gray-600">/ day</span>
              </div>

              {/* Size Selection (if applicable) */}
              {sizes && sizes.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">SELECT SIZE</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-3 border rounded-lg text-sm font-medium transition-colors ${
                          selectedSize === size
                            ? 'border-red-500 bg-red-50 text-red-600'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Availability Status */}
              <div className="flex items-center space-x-2">
                <span className={`w-3 h-3 rounded-full ${listing.availability ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className="text-sm font-medium text-gray-700">
                  {listing.availability ? 'Available for rent' : 'Currently unavailable'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg transition-colors">
                  <Heart size={18} className="text-gray-600" />
                  <span className="text-gray-700">Save</span>
                </button>
                <button className="flex items-center space-x-2 border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg transition-colors">
                  <Share2 size={18} className="text-gray-600" />
                  <span className="text-gray-700">Share</span>
                </button>
              </div>

              {/* Description */}
              {listing.description && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {listing.description}
                  </p>
                </div>
              )}

              {/* Item Details */}
              <div className="border-t pt-6">
                <button
                  onClick={() => setShowMoreDetails(!showMoreDetails)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="font-semibold text-gray-900">ITEM DETAILS</span>
                  {showMoreDetails ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                
                {showMoreDetails && (
                  <div className="mt-4 space-y-3">
                    {listing.category && (
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <span className="text-gray-600">Category:</span>
                        <span className="col-span-2 text-gray-900">{listing.category}</span>
                      </div>
                    )}
                    
                    {listing.size && (
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <span className="text-gray-600">Size:</span>
                        <span className="col-span-2 text-gray-900">{listing.size}</span>
                      </div>
                    )}
                    
                    {listing.color && (
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <span className="text-gray-600">Color:</span>
                        <span className="col-span-2 text-gray-900">{listing.color}</span>
                      </div>
                    )}
                    
                    {listing.brand && (
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <span className="text-gray-600">Brand:</span>
                        <span className="col-span-2 text-gray-900">{listing.brand}</span>
                      </div>
                    )}
                    
                    {listing.condition && (
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <span className="text-gray-600">Condition:</span>
                        <span className="col-span-2 text-gray-900">{listing.condition}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <span className="text-gray-600">Price per day:</span>
                      <span className="col-span-2 text-gray-900 font-medium">₹{pricePerDay}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Location */}
              {listing.location && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPin size={18} className="mr-2" />
                    LOCATION
                  </h3>
                  <p className="text-gray-700">{listing.location}</p>
                </div>
              )}

              {/* Rental Terms */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">RENTAL TERMS</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Shield size={16} className="text-green-500" />
                    <span>Security deposit may be required</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck size={16} className="text-blue-500" />
                    <span>Pickup/delivery options available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RotateCcw size={16} className="text-purple-500" />
                    <span>Return in same condition</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking and Owner */}
          <div className="lg:col-span-5 mt-8 lg:mt-0 space-y-8">
            {/* Booking Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-1">
                  <span className={`w-2 h-2 rounded-full ${listing.availability ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="text-sm font-medium text-slate-600">
                    {listing.availability ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>

              {/* Price Display */}
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-slate-900">₹{pricePerDay}</span>
                  <span className="text-lg text-slate-600">/ day</span>
                </div>
              </div>

              {/* Book Now Button */}
              <button
                onClick={handleBooking}
                disabled={!listing.availability}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 ${
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