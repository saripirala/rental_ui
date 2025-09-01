import React from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isOpen, 
  onToggle,
  categories = ['All', 'Costume', 'Book', 'Accessory', 'Bag', 'Jewelry']
}) => {
  const hasActiveFilters = filters.category !== 'All' || 
                          filters.minPrice > 0 || 
                          filters.maxPrice < 100000 || 
                          filters.location.trim() !== '';

  return (
    <>
      {/* Mobile Filter Toggle */}
      <button
        onClick={onToggle}
        className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-md hover:shadow-lg transition-shadow"
      >
        <Filter size={16} />
        <span className="font-medium">Filters</span>
        {hasActiveFilters && (
          <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
        )}
      </button>

      {/* Filter Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 lg:w-72 bg-white lg:bg-transparent border-r lg:border-r-0 border-slate-200 lg:border-0 shadow-xl lg:shadow-none transform transition-transform duration-300 lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 lg:p-0">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
            <button onClick={onToggle} className="p-2 hover:bg-slate-100 rounded-lg">
              <X size={20} />
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="text-sm text-slate-500 hover:text-slate-700 underline transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="space-y-8">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">Category</label>
              <div className="relative">
                <select
                  value={filters.category}
                  onChange={(e) => onFilterChange('category', e.target.value)}
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:border-slate-300 focus:ring-2 focus:ring-slate-100 outline-none transition-all appearance-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Price Range (₹{filters.minPrice} - ₹{filters.maxPrice})
              </label>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-600 mb-2">Min Price</label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters.minPrice}
                    onChange={(e) => onFilterChange('minPrice', parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-2">Max Price</label>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    value={filters.maxPrice}
                    onChange={(e) => onFilterChange('maxPrice', parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">Location</label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => onFilterChange('location', e.target.value)}
                placeholder="Enter city or area..."
                className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:border-slate-300 focus:ring-2 focus:ring-slate-100 outline-none transition-all"
              />
            </div>

            {/* Mobile Clear Filters */}
            <div className="lg:hidden pt-4">
              <button
                onClick={onClearFilters}
                className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default FilterSidebar;