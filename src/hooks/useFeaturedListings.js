// hooks/useFeaturedListings.js
import { useState, useEffect, useCallback } from 'react';

const useFeaturedListings = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeaturedItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try featured endpoint first
      const response = await fetch('https://rental-sharing.onrender.com/api/costumes/featured');
      
      if (response.ok) {
        const featuredData = await response.json();
        
        // Your backend returns an array directly, not wrapped in a data property
        if (Array.isArray(featuredData) && featuredData.length > 0) {
          // Map your backend data to frontend format
          const processedItems = featuredData.map(item => ({
            ...item,
            // Map your backend fields to frontend expectations
            users: item.owner, // Your backend uses 'owner' instead of 'users'
            price_per_day: item.price_per_day,
            category: item.category,
            
            // Determine featured type based on your backend fields
            is_featured: item.is_featured && item.price_per_day > 1000, // High-value featured items
            is_preferred_seller: item.owner?.is_business || item.average_rating > 4.5, // Business accounts or high-rated
            is_sponsored: item.featured_until !== null, // Items with featured_until date are sponsored
            
            // Use your backend rating or default
            rating: item.average_rating > 0 ? item.average_rating.toFixed(1) : '4.9',
            
            // Add discount for premium items (you can add this field to backend later)
            discount: item.price_per_day > 1500 ? 15 : item.price_per_day > 1000 ? 10 : null
          }));
          
          setFeaturedItems(processedItems);
          return; // Exit here - don't fall through to fallback
        }
      }
      
      // Fallback to regular listings only if featured endpoint fails or returns empty array
      console.log('No featured items from backend, using fallback data');
      const fallbackResponse = await fetch('https://rental-sharing.onrender.com/api/costumes');
      if (fallbackResponse.ok) {
        const data = await fallbackResponse.json();
        const mockFeatured = (data.data || [])
          .filter(item => item.availability) // Only available items
          .slice(0, 6) // Limit to 6 items
          .map((item, index) => ({
            ...item,
            users: item.users || item.owner,
            is_featured: index === 0, // First item is premium
            is_preferred_seller: index < 2, // First 2 are preferred
            is_sponsored: index >= 4, // Last 2 are sponsored
            rating: (4.5 + Math.random() * 0.5).toFixed(1),
            discount: index === 0 ? 15 : null
          }));
        setFeaturedItems(mockFeatured);
      }
      
    } catch (err) {
      console.error('Error fetching featured items:', err);
      setError('Failed to load featured items');
      setFeaturedItems([]); // Clear items on error
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array is correct here

  useEffect(() => {
    fetchFeaturedItems();
  }, [fetchFeaturedItems]);

  const refreshFeaturedItems = async () => {
    await fetchFeaturedItems();
  };

  return {
    featuredItems,
    loading,
    error,
    refreshFeaturedItems
  };
};

export default useFeaturedListings;