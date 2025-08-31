// components/RelatedItems.js
import React from 'react';
import { Star, DollarSign } from 'lucide-react';

const RelatedItems = ({ relatedItems = [], onItemClick, currentItemId }) => {
  // Filter out current item and limit to 4 items
  const filteredItems = relatedItems
    .filter(item => item.id !== currentItemId)
    .slice(0, 4);

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-slate-900">You might also like</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-xl mb-3">
              <img
                src={item.images?.[0] || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={item.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
            
            <div className="space-y-1">
              <h4 className="font-semibold text-slate-900 group-hover:text-slate-600 transition-colors text-sm line-clamp-1">
                {item.title}
              </h4>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-slate-400 text-slate-400" />
                  <span className="text-xs text-slate-600 font-medium">4.8</span>
                </div>
                
                <div className="flex items-center">
                  <DollarSign className="w-3 h-3 text-slate-900" />
                  <span className="text-sm font-bold text-slate-900">{item.price_per_day}</span>
                  <span className="text-xs text-slate-500 ml-1">/day</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedItems;