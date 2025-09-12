// components/ActiveFiltersBar.js
import React from 'react';
import { X } from 'lucide-react';

const ActiveFiltersBar = ({ 
  filters, 
  selectedCategories, 
  onFilterChange, 
  onCategoryToggle, 
  onClearAll 
}) => {
  const activeFilters = [];

  // Add category filters
  if (selectedCategories && selectedCategories.length > 0) {
    selectedCategories.forEach(category => {
      activeFilters.push({
        type: 'category',
        key: category,
        label: category.toUpperCase(),
        onRemove: () => onCategoryToggle(category)
      });
    });
  }

  // Add main category filter (from FilterSidebar)
  if (filters.category && filters.category !== 'All') {
    activeFilters.push({
      type: 'mainCategory',
      key: 'category',
      label: filters.category,
      onRemove: () => onFilterChange('category', 'All')
    });
  }

  // Add price range filter
  if (filters.minPrice > 0 || filters.maxPrice < 100000) {
    activeFilters.push({
      type: 'price',
      key: 'price',
      label: `₹${filters.minPrice} - ₹${filters.maxPrice}`,
      onRemove: () => {
        onFilterChange('minPrice', 0);
        onFilterChange('maxPrice', 100000);
      }
    });
  }

  // Add location filter
  if (filters.location && filters.location.trim() !== '') {
    activeFilters.push({
      type: 'location',
      key: 'location',
      label: filters.location,
      onRemove: () => onFilterChange('location', '')
    });
  }

  // Don't render if no active filters
  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border-b border-slate-100 py-3">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          {/* Clear All Button */}
          <button
            onClick={onClearAll}
            className="text-sm font-medium text-rose-600 hover:text-rose-700 transition-colors uppercase tracking-wide"
          >
            CLEAR ALL
          </button>

          {/* Active Filter Chips */}
          <div className="flex items-center space-x-2 flex-wrap">
            {activeFilters.map((filter, index) => (
              <div
                key={`${filter.type}-${filter.key}-${index}`}
                className="inline-flex items-center bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full text-sm font-medium border border-slate-200"
              >
                <span>{filter.label}</span>
                <button
                  onClick={filter.onRemove}
                  className="ml-2 p-0.5 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X size={12} className="text-slate-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveFiltersBar;