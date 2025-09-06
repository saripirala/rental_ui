// hooks/useCategoryFilter.js
import { useState, useMemo } from 'react';

const useCategoryFilter = (listings) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categoryKeywords = {
    men: ['men', 'male', 'masculine', 'man', 'suit', 'tuxedo'],
    women: ['women', 'female', 'feminine', 'woman', 'dress', 'gown', 'costume', 'jewelry'],
    kids: ['kids', 'children', 'child', 'baby', 'toddler', 'youth', 'angel', 'fairy'],
    home: ['home', 'decor', 'furniture', 'kitchen', 'living', 'Fan'],
    books: ['book', 'novel', 'magazine', 'journal', 'reading']
  };

  const toggleCategory = (categoryKey) => {
    setSelectedCategories(prev => 
      prev.includes(categoryKey)
        ? prev.filter(c => c !== categoryKey)
        : [...prev, categoryKey]
    );
  };

  const clearAllCategories = () => {
    setSelectedCategories([]);
  };

  const getItemCategory = (item) => {
    const title = item.title?.toLowerCase() || '';
    const category = item.category?.toLowerCase() || '';
    const description = item.description?.toLowerCase() || '';
    const gender = item.gender?.toLowerCase() || '';
    
    const searchText = `${title} ${category} ${description} ${gender}`;

    // Check for specific matches
    if (gender === 'male' || categoryKeywords.men.some(keyword => searchText.includes(keyword))) {
      return 'men';
    }
    if (gender === 'female' || categoryKeywords.women.some(keyword => searchText.includes(keyword))) {
      return 'women';
    }
    if (categoryKeywords.kids.some(keyword => searchText.includes(keyword))) {
      return 'kids';
    }
    if (categoryKeywords.home.some(keyword => searchText.includes(keyword))) {
      return 'home';
    }
    if (categoryKeywords.books.some(keyword => searchText.includes(keyword))) {
      return 'books';
    }

    // Default fallback based on category
    if (category.includes('costume') || category.includes('dress') || category.includes('jewelry')) {
      return 'women'; // Default assumption
    }
    
    return null; // No category match
  };

  const filteredListings = useMemo(() => {
    if (selectedCategories.length === 0) {
      return listings;
    }

    return listings.filter(item => {
      const itemCategory = getItemCategory(item);
      return itemCategory && selectedCategories.includes(itemCategory);
    });
  }, [listings, selectedCategories]);

  const getCategoryCounts = useMemo(() => {
    const counts = {
      men: 0,
      women: 0,
      kids: 0,
      home: 0,
      books: 0
    };

    listings.forEach(item => {
      const category = getItemCategory(item);
      if (category && counts.hasOwnProperty(category)) {
        counts[category]++;
      }
    });

    return counts;
  }, [listings]);

  return {
    selectedCategories,
    toggleCategory,
    clearAllCategories,
    filteredListings,
    getCategoryCounts
  };
};

export default useCategoryFilter;