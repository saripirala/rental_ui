import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange, onClear, placeholder = "Search items..." }) => {
  return (
    <div className="relative w-80 ml-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-64 pl-10 pr-8 py-2 bg-white border border-slate-200 rounded-full shadow-md hover:shadow-lg focus:shadow-lg focus:border-slate-300 outline-none transition-all duration-300 text-slate-700 placeholder-slate-400 text-sm"
        />
        {searchTerm && (
          <button
            onClick={onClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;