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
    <div className="bg-white border-b border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-4 lg:mb-0">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.key);
              const Icon = category.icon;
              
              return (
                <label key={category.key} className="relative cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onCategoryToggle(category.key)}
                    className="sr-only"
                  />
                  <div
                    className={`flex items-center space-x-3 px-6 py-3 rounded-full border-2 transition-all duration-200 ${
                      isSelected
                        ? 'bg-slate-900 border-slate-900 text-white shadow-lg'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {Icon && (
                      <Icon 
                        size={18} 
                        className={isSelected ? 'text-white' : 'text-slate-500'} 
                      />
                    )}
                    <span className="font-semibold text-sm tracking-wide">
                      {category.label}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {category.count}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Clear All Button */}
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="text-slate-600 hover:text-slate-900 text-sm font-medium underline transition-colors"
            >
              Clear All ({selectedCategories.length})
            </button>
          )}
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center space-x-3 text-sm text-slate-600">
              <span className="font-medium">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((categoryKey) => {
                  const category = categories.find(c => c.key === categoryKey);
                  return (
                    <span
                      key={categoryKey}
                      className="inline-flex items-center space-x-1 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      <span>{category?.label}</span>
                      <button
                        onClick={() => onCategoryToggle(categoryKey)}
                        className="ml-1 hover:text-slate-900 transition-colors"
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