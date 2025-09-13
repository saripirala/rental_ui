// components/FeaturedListings.js
import React from 'react';
import { Star, IndianRupee, Crown, Shield, Sparkles, ChevronRight, Heart, User, MapPin } from 'lucide-react';

const FeaturedListings = ({ featuredItems, onItemClick, onViewAll }) => {
  const getBadgeInfo = (item) => {
    if (item.is_featured) {
      return {
        icon: Crown,
        text: 'Premium',
        className: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
      };
    }
    if (item.is_preferred_seller) {
      return {
        icon: Shield,
        text: 'Verified',
        className: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
      };
    }
    if (item.is_sponsored) {
      return {
        icon: Sparkles,
        text: 'Sponsored',
        className: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
      };
    }
    return null;
  };

  if (!featuredItems || featuredItems.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-br from-white via-slate-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Featured Items</h3>
                <p className="text-sm text-slate-600">Handpicked premium pieces</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={onViewAll}
            className="hidden lg:flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
          >
            <span>View All</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {featuredItems.slice(0, 10).map((item) => {
            const badge = getBadgeInfo(item);
            
            return (
              <div
                key={item.id}
                onClick={() => onItemClick(item.id)}
                className="group cursor-pointer bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={item.images?.[0] || "https://via.placeholder.com/400x400?text=No+Image"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badge */}
                  {badge && (
                    <div className={`absolute top-2 left-2 px-1.5 py-0.5 rounded text-xs font-bold flex items-center space-x-0.5 ${badge.className} shadow-sm`}>
                      <badge.icon size={10} />
                      <span>{badge.text}</span>
                    </div>
                  )}

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Toggle favorite');
                    }}
                    className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                  >
                    <Heart className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                  
                  {/* Rating Badge */}
                  {!badge && (
                    <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm rounded px-1.5 py-0.5 flex items-center space-x-0.5 shadow-sm">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold text-gray-800">{item.rating || '4.9'}</span>
                    </div>
                  )}
                </div>
                
                {/* Content - Fixed Height */}
                <div className="p-3 flex flex-col flex-1">
                  {/* Brand/Host Name */}
                  <div className="flex items-center text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                    <span className="truncate">{item.users?.full_name || "Premium Host"}</span>
                    {item.is_preferred_seller && (
                      <Shield className="w-3 h-3 ml-1 text-blue-500 flex-shrink-0" />
                    )}
                  </div>
                  
                  {/* Title - Fixed height container */}
                  <div className="h-10 mb-2">
                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
                      {item.title}
                    </h4>
                  </div>
                  
                  {/* Location */}
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{item.location || "Premium Location"}</span>
                  </div>
                  
                  {/* Spacer to push bottom content down */}
                  <div className="flex-1"></div>
                  
                  {/* Bottom Section */}
                  <div className="space-y-2">
                    {/* Special Offer for Featured Items */}
                    {item.is_featured && item.discount && (
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-md p-2 mb-2">
                        <div className="flex items-center space-x-1">
                          <Sparkles className="w-3 h-3 text-orange-500" />
                          <span className="text-xs font-semibold text-orange-700">
                            {item.discount}% off 7+ days
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Price and Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline space-x-1">
                        <span className="text-xs text-gray-500">Rs.</span>
                        <span className="text-lg font-bold text-gray-900">{item.price_per_day}</span>
                      </div>
                      
                      {/* Availability Status */}
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-1.5 ${
                          item.availability ? 'bg-emerald-500' : 'bg-red-500'
                        }`} />
                        <span className={`text-xs font-semibold ${
                          item.availability ? 'text-emerald-600' : 'text-red-600'
                        }`}>
                          {item.availability ? 'Available' : 'Booked'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Book Now Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (item.availability) {
                          console.log('Start booking', item);
                        }
                      }}
                      disabled={!item.availability}
                      className={`w-full py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        item.availability
                          ? 'bg-gray-900 hover:bg-gray-800 text-white shadow-sm hover:shadow-md transform hover:-translate-y-0.5'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {item.availability ? 'Book Now' : 'Unavailable'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="lg:hidden text-center">
          <button
            onClick={onViewAll}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
          >
            <span>View All Featured</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;