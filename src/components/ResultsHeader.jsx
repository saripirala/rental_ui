// components/ResultsHeader.js
import React from 'react';

const ResultsHeader = ({ 
  resultCount, 
  totalCount, 
  searchTerm, 
  filters, 
  sortBy, 
  onSortChange,
  SortDropdown, 
  selectedCategories, 
  categoryFilteredListings, 
  handleClearAllFilters 
}) => {
  const hasActiveFilters = filters.category !== 'All' || 
                          filters.minPrice > 0 || 
                          filters.maxPrice < 100000 || 
                          filters.location.trim() !== '' ||
                          searchTerm.trim() !== '';

  // Safely get the length or default to 0
  const categoryListingsLength = categoryFilteredListings?.length || 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h3 className="text-2xl font-bold text-slate-900">
          {selectedCategories.length > 0 || searchTerm || filters.category !== 'All' ? 'Search Results' : 'All Items'}
        </h3>
        <p className="text-slate-600 mt-1">
          {resultCount === categoryListingsLength 
            ? `${resultCount} ${resultCount === 1 ? 'item' : 'items'} available`
            : `${resultCount} of ${categoryListingsLength} ${categoryListingsLength === 1 ? 'item' : 'items'}`
          }
          {searchTerm && (
            <span className="text-slate-500"> for "{searchTerm}"</span>
          )}
          {selectedCategories.length > 0 && (
            <span className="text-slate-500"> in {selectedCategories.join(', ').toUpperCase()}</span>
          )}
        </p>
      </div>
      
      <div className="flex items-center space-x-4">
        {(selectedCategories.length > 0 || searchTerm || filters.category !== 'All' || filters.minPrice > 0 || filters.maxPrice < 1000 || filters.location) && (
          <button
            onClick={handleClearAllFilters}
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Clear All Filters
          </button>
        )}
        <span className="text-sm text-slate-600 font-medium">Sort by:</span>
        <SortDropdown sortBy={sortBy} onSortChange={onSortChange} />
      </div>
    </div>
  );
};

export default ResultsHeader;