import React, { useState, useEffect } from 'react';
import { Plus, Calendar, MapPin, User, DollarSign, Package, Loader2, Search, Menu, Heart, Star, Globe } from 'lucide-react';

const RentalApp = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/costumes");
        if (!res.ok) throw new Error("Failed to fetch listings");
        const json = await res.json();

        // your API wraps in { data: [], pagination: {} }
        setListings(json.data || []);
      } catch (err) {
        console.error("Error fetching:", err);
        setError("Unable to load listings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const getTypeColor = (type) => {
    switch(type?.toLowerCase()) {
      case 'costume': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'book': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'accessory': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'bag': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'jewelry': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const handleCheckout = (listing) => {
    alert(`Checkout initiated for "${listing.title}"!\n\nPickup Location: ${listing.location || "Not specified"}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                     Rentals
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">High Fashion • Premium Items</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-white border border-slate-200 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 px-6 py-3 max-w-md mx-8 flex-1">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input
                type="text"
                placeholder="Search designer pieces..."
                className="flex-1 outline-none text-slate-700 placeholder-slate-400"
              />
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-6">
              <button className="hidden lg:flex items-center px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-full transition-colors">
                <Globe className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">EN</span>
              </button>
              <button 
                onClick={() => setShowAddForm(true)}
                className="hidden md:flex items-center px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-full transition-colors text-sm font-medium"
              >
                List your items
              </button>
              <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                <Menu className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10"></div>
        <div className="relative h-96 bg-gradient-to-br from-slate-900 via-slate-800 to-rose-900">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-2xl">
              <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Rent 
                <span className="block bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                  Fashion Pieces
                </span>
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Discover exclusive designer items, vintage treasures, and premium accessories from curated collections
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-slate-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Start Listing</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-32">
            <div className="text-center">
              <Loader2 className="animate-spin text-slate-400 mx-auto mb-4" size={48} />
              <p className="text-slate-600 font-medium">Loading  items...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-32">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Listings Grid */}
        {!loading && !error && listings.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">Featured Items</h3>
                <p className="text-slate-600">Curated collection of premium rental pieces</p>
              </div>
              <div className="text-sm text-slate-500">
                {listings.length} {listings.length === 1 ? 'item' : 'items'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {listings.map((listing) => (
                <div key={listing.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl mb-4">
                    <img
                      src={listing.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image"}
                      alt={listing.title}
                      className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <button className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="w-4 h-4 text-slate-600" />
                    </button>
                    <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${getTypeColor(listing.category)}`}>
                      {listing.category}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-slate-900 group-hover:text-slate-600 transition-colors line-clamp-1">
                        {listing.title}
                      </h4>
                      <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                        <Star className="w-4 h-4 fill-slate-400 text-slate-400" />
                        <span className="text-sm text-slate-600 font-medium">4.9</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-slate-500">
                      <User className="w-4 h-4 mr-1" />
                      <span>{listing.users?.full_name || "Premium Host"}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-slate-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{listing.location || "Location available"}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-slate-900" />
                        <span className="font-bold text-slate-900">{listing.price_per_day}</span>
                        <span className="text-slate-500 text-sm ml-1">/ day</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {listing.availability ? (
                          <span className="text-emerald-600 font-medium text-sm">Available</span>
                        ) : (
                          <span className="text-amber-600 font-medium text-sm">Booked</span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCheckout(listing)}
                      disabled={!listing.availability}
                      className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 mt-4 ${
                        listing.availability
                          ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {listing.availability ? 'Reserve Now' : 'Currently Unavailable'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && listings.length === 0 && (
          <div className="text-center py-32">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package size={40} className="text-slate-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">No items available yet</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Be the first to share your  fashion pieces with the community
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                List Your First Item
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold"> Rentals</h4>
                  <p className="text-sm text-slate-400">Fashion . Accessories</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed max-w-md">
                Connecting fashion lovers with like minded. Rent  items from friends and family.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Explore</h5>
              <ul className="space-y-3 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Designer Dresses</a></li>
                <li><a href="#" className="hover:text-white transition-colors"> Bags</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fine Jewelry</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Vintage Pieces</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-3 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2025  Rentals. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Globe className="w-5 h-5 text-slate-400" />
              <span className="text-slate-400 text-sm">English (US)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RentalApp;