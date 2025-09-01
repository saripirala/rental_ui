// components/ResultsHeader.js
import React from 'react';

const ResultsHeader = ({ resultCount, totalCount, searchTerm, filters, sortBy, onSortChange, SortDropdown }) => {
  const hasActiveFilters = filters.category !== 'All' || 
                          filters.minPrice > 0 || 
                          filters.maxPrice < 100000 || 
                          filters.location.trim() !== '' ||
                          searchTerm.trim() !== '';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h3 className="text-2xl font-bold text-slate-900">
          {hasActiveFilters ? 'Search Results' : 'Featured Items'}
        </h3>
        <p className="text-slate-600 mt-1">
          {resultCount === totalCount 
            ? `${resultCount} ${resultCount === 1 ? 'item' : 'items'} available`
            : `${resultCount} of ${totalCount} ${totalCount === 1 ? 'item' : 'items'}`
          }
          {searchTerm && (
            <span className="text-slate-500"> for "{searchTerm}"</span>
          )}
        </p>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-sm text-slate-600 font-medium">Sort by:</span>
        <SortDropdown sortBy={sortBy} onSortChange={onSortChange} />
      </div>
    </div>
  );
};

export default ResultsHeader;