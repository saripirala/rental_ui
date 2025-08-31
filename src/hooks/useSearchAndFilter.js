import { useState, useMemo } from 'react';

const useSearchAndFilter = (listings) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'All',
    minPrice: 0,
    maxPrice: 1000,
    location: ''
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'All',
      minPrice: 0,
      maxPrice: 1000,
      location: ''
    });
    setSearchTerm('');
  };

  const filteredAndSortedListings = useMemo(() => {
    let filtered = listings.filter(listing => {
      // Search filter
      const matchesSearch = !searchTerm || 
        listing.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description?.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = filters.category === 'All' || 
        listing.category?.toLowerCase() === filters.category.toLowerCase();

      // Price filter
      const price = parseFloat(listing.price_per_day) || 0;
      const matchesPrice = price >= filters.minPrice && price <= filters.maxPrice;

      // Location filter
      const matchesLocation = !filters.location || 
        listing.location?.toLowerCase().includes(filters.location.toLowerCase());

      return matchesSearch && matchesCategory && matchesPrice && matchesLocation;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (parseFloat(a.price_per_day) || 0) - (parseFloat(b.price_per_day) || 0);
        case 'price-high':
          return (parseFloat(b.price_per_day) || 0) - (parseFloat(a.price_per_day) || 0);
        case 'rating':
          return (b.rating || 4.5) - (a.rating || 4.5);
        case 'proximity':
          // Placeholder - would need geolocation logic
          return 0;
        case 'newest':
        default:
          return new Date(b.created_at || '2025-01-01') - new Date(a.created_at || '2025-01-01');
      }
    });

    return filtered;
  }, [listings, searchTerm, filters, sortBy]);

  return {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filters,
    handleFilterChange,
    clearFilters,
    showFilters,
    setShowFilters,
    filteredListings: filteredAndSortedListings,
    resultCount: filteredAndSortedListings.length
  };
};

export default useSearchAndFilter;