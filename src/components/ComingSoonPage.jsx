import React, { useState } from 'react';
import { Menu, Heart, Star, Package, Calendar, MapPin } from 'lucide-react';

const ComingSoonPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you can add email collection logic
      setTimeout(() => setIsSubmitted(false), 3000);
    }
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
                <div className="flex items-center justify-center p-4">
                  <img src="/rental.png" alt="Rentals Logo" className="w-12 h-12" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                    Rentals
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">Own Less, Access More</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-6">
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
        <div className="relative h-[400px] bg-gradient-to-br from-slate-900 via-slate-800 to-rose-900">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-3xl text-center mx-auto">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Coming Soon
                <span className="block bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent mt-2">
                  Rent Anything You Need
                </span>
              </h2>
              <p className="text-xl text-slate-200 mb-8 leading-relaxed max-w-2xl mx-auto">
                We're building the ultimate rental marketplace for fashion, accessories, books, furniture and more. 
                Get ready to own less and access more!
              </p>

              {/* Email Signup */}
              <div className="mb-8">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for early access"
                    className="flex-1 px-6 py-4 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-slate-900 placeholder-slate-500"
                    required
                  />
                  <button 
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-full hover:from-rose-700 hover:to-pink-700 transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {isSubmitted ? 'Thank You!' : 'Notify Me'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent mb-4">
              What's Coming
            </h3>
            <p className="text-lg text-slate-600">Experience the future of sharing economy</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-rose-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Fashion & Accessories</h4>
              <p className="text-sm text-slate-600">Rent designer clothes, bags, jewelry and more for special occasions</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-rose-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Flexible Booking</h4>
              <p className="text-sm text-slate-600">Book items for days, weeks, or months with easy scheduling</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-rose-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Local Delivery</h4>
              <p className="text-sm text-slate-600">Get items delivered to your doorstep from nearby renters</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-rose-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Trusted Community</h4>
              <p className="text-sm text-slate-600">Verified users, ratings, and secure payments for peace of mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent mb-4">
              Categories Available Soon
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {['Fashion', 'Accessories', 'Books', 'Furniture', 'Electronics', 'Sports', 'Travel Gear', 'Home Decor'].map((category) => (
              <div key={category} className="px-6 py-3 bg-gradient-to-r from-slate-100 to-rose-50 rounded-full border border-slate-200">
                <span className="font-medium text-slate-700">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm text-slate-500">&copy; 2025 Rentals. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoonPage;