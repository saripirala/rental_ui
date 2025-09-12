import React from 'react';
import { useState } from "react";
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
  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <>
      {/* Filter Toggle Button - Always visible */}
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-md hover:shadow-lg transition-shadow"
      >
        <Filter size={16} />
        <span className="font-medium">Filters</span>
        {hasActiveFilters && (
          <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
        )}
        <ChevronDown 
          size={16} 
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Filter Dropdown Panel */}
      {isOpen && (
        <>
          <div className="absolute left-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
                <button onClick={onToggle} className="p-2 hover:bg-slate-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    Category
                  </label>
                  <div className="relative">
                    {/* Dropdown Button */}
                    <button
                      onClick={() => setCategoryOpen(!categoryOpen)}
                      className="w-full flex justify-between items-center p-3 bg-white border border-slate-200 rounded-xl text-left text-sm font-medium text-slate-700 hover:border-slate-300 focus:ring-2 focus:ring-slate-100 focus:outline-none"
                    >
                      <span>{filters.category || "Select Category"}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform ${
                          categoryOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {/* Dropdown Menu */}
                    {categoryOpen && (
                      <ul className="absolute z-10 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-md max-h-40 overflow-y-auto">
                        {categories.map((cat) => (
                          <li
                            key={cat}
                            onClick={() => {
                              onFilterChange("category", cat);
                              setCategoryOpen(false);
                            }}
                            className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer first:rounded-t-xl last:rounded-b-xl"
                          >
                            {cat}
                          </li>
                        ))}
                      </ul>
                    )}
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
                        max="100000"
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

                {/* Clear Filters Button */}
                {hasActiveFilters && (
                  <div className="pt-4 border-t border-slate-200">
                    <button
                      onClick={onClearFilters}
                      className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Overlay to close dropdown when clicking outside */}
          <div 
            className="fixed inset-0 z-40"
            onClick={onToggle}
          />
        </>
      )}
    </>
  );
};

export default FilterSidebar;