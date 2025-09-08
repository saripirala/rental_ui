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

  if (!featuredItems || featuredItems.length === 0) {
    return null;
  }

  return (
    <section className="pt-8 pb-12 bg-gradient-to-br from-white via-slate-50 to-rose-50">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Featured Items</h3>
                <p className="text-slate-600">Handpicked premium pieces from our top sellers</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={onViewAll}
            className="hidden lg:flex items-center space-x-2 px-6 py-3 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors font-medium text-slate-700"
          >
            <span>View All</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
          {featuredItems.slice(0, 8).map((item) => {
            const badge = getBadgeInfo(item);
            
            return (
              <div
                key={item.id}
                onClick={() => onItemClick(item.id)}
                className="group cursor-pointer relative"
              >
                {/* Premium Glow Effect for Premium Items */}
                {item.is_featured && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
                
                <div className={`relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  item.is_featured ? 'transform group-hover:-translate-y-1' : 'group-hover:-translate-y-0.5'
                }`}>
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <img
                      src={item.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image"}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay Badges */}
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      {badge && (
                        <div className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm flex items-center space-x-1 ${badge.className}`}>
                          <badge.icon size={12} />
                          <span>{badge.text}</span>
                        </div>
                      )}
                                          </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Toggle favorite');
                      }}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <Heart className="w-4 h-4 text-slate-600" />
                    </button>

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <button className="w-full py-2 px-4 bg-white/90 backdrop-blur-sm text-slate-900 rounded-lg font-medium text-sm hover:bg-white transition-colors">
                          Quick View
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-slate-900 group-hover:text-slate-600 transition-colors line-clamp-1">
                        {item.title}
                      </h4>
                      <div className="flex items-center space-x-1 flex-shrink-0 ml-3">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-bold text-slate-900">{item.rating || '4.9'}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-slate-600">
                        <User className="w-4 h-4 mr-2" />
                        <span className="font-medium">{item.users?.full_name || "Premium Host"}</span>
                        {item.is_preferred_seller && (
                          <Shield className="w-3 h-3 ml-1 text-blue-500" />
                        )}
                      </div>
                      
                      <div className="flex items-center text-sm text-slate-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{item.location || "Premium Location"}</span>
                      </div>
                    </div>

                    {/* Price and Availability */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <IndianRupee className="w-5 h-5 text-slate-900" />
                        <span className="font-bold text-slate-900">{item.price_per_day}</span>
                      </div>
                      
                      <div className="flex items-center">
                        {item.availability ? (
                          <span className="text-emerald-600 font-semibold text-sm bg-emerald-50 px-3 py-1 rounded-full">
                            Available
                          </span>
                        ) : (
                          <span className="text-amber-600 font-semibold text-sm bg-amber-50 px-3 py-1 rounded-full">
                            Booked
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Special Offers for Premium Items */}
                    {item.is_featured && item.discount && (
                      <div className="mt-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-orange-500" />
                          <span className="text-sm font-semibold text-orange-700">
                            {item.discount}% off for 7+ days
                          </span>
                        </div>
                      </div>
                    )}
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
            className="inline-flex items-center space-x-2 px-8 py-3 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
          >
            <span>View All Featured Items</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Feature Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-6 border-t border-slate-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Premium Quality</h3>
            <p className="text-slate-600">Carefully curated luxury items from verified premium sellers</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Verified Sellers</h3>
            <p className="text-slate-600">All featured sellers are identity-verified with proven track records</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Special Offers</h3>
            <p className="text-slate-600">Exclusive discounts and deals available only on featured items</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
