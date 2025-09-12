// components/CategoryFilterBar.js
import React from 'react';
import { User, Users, Baby, Home, BookOpen } from 'lucide-react';

const CategoryFilterBar = ({ selectedCategories, onCategoryToggle, onClearAll }) => {
  const categories = [
    { key: 'men', label: 'MEN', icon: User, count: 45 },
    { key: 'women', label: 'WOMEN', icon: Users, count: 128 },
    { key: 'kids', label: 'KIDS', icon: Baby, count: 32 },
    { key: 'home', label: 'HOME', count: 67 },
    { key: 'books', label: 'BOOKS', icon: BookOpen, count: 23 }
  ];

  const hasActiveFilters = selectedCategories.length > 0;

  return (
    <div className="bg-white border-b border-slate-100 py-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Category Filters - Compact horizontal layout */}
          <div className="flex items-center space-x-8">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.key);
              
              return (
                <button
                  key={category.key}
                  onClick={() => onCategoryToggle(category.key)}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-200 ${
                    isSelected
                      ? 'text-slate-900'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {category.label}
                  {/* Active indicator */}
                  {isSelected && (
                    <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-slate-900 rounded-full"></div>
                  )}
                  {/* Count badge - only show on hover or when active */}
                  <span
                    className={`ml-2 text-xs px-1.5 py-0.5 rounded-full transition-opacity ${
                      isSelected
                        ? 'bg-slate-900 text-white opacity-100'
                        : 'bg-slate-100 text-slate-500 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Clear All Button */}
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="text-xs text-slate-500 hover:text-slate-700 font-small transition-colors"
            >
              Clear All ({selectedCategories.length})
            </button>
          )}
        </div>

        {/* Active Filters Summary - More minimal */}
        {hasActiveFilters && (
          <div className="mt-3 pt-3 border-t border-slate-50">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-medium">Filtering by:</span>
              <div className="flex space-x-2">
                {selectedCategories.map((categoryKey) => {
                  const category = categories.find(c => c.key === categoryKey);
                  return (
                    <span
                      key={categoryKey}
                      className="inline-flex items-center text-xs bg-slate-50 text-slate-600 px-2 py-1 rounded-md font-medium"
                    >
                      {category?.label}
                      <button
                        onClick={() => onCategoryToggle(categoryKey)}
                        className="ml-1 text-slate-400 hover:text-slate-600 text-sm leading-none"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilterBar;