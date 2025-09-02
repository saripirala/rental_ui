// hooks/useBookingManagement.js
import { useState, useEffect } from 'react';

const useBookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  // Load existing bookings on mount (optional - for conflict checking)
  useEffect(() => {
    const loadBookings = async () => {
      try {
        // In real app, fetch user's bookings from API
        const response = await fetch('http://localhost:5000/api/bookings');
        if (response.ok) {
          const data = await response.json();
          setBookings(data.bookings || []);
        }
      } catch (error) {
        console.log('Could not load existing bookings:', error);
        // Non-critical error - continue without existing bookings
      }
    };

    loadBookings();
  }, []);

  /**
   * Create a new booking
   * @param {Object} bookingData - Complete booking information
   * @returns {Promise} - Booking result from API
   */
  const createBooking = async (bookingData) => {
    setIsBooking(true);
    setBookingError(null);
    
    try {
      // Validate required fields
      if (!bookingData.listing_id) {
        throw new Error('Listing ID is required');
      }
      if (!bookingData.start_date || !bookingData.end_date) {
        throw new Error('Start and end dates are required');
      }
      if (!bookingData.guest_info?.email) {
        throw new Error('Guest email is required');
      }

      // Check for conflicts before submitting
      const conflicts = getBookingConflicts(
        bookingData.listing_id, 
        bookingData.start_date, 
        bookingData.end_date
      );
      
      if (conflicts.length > 0) {
        throw new Error('Selected dates conflict with existing bookings');
      }

      // Prepare API payload
      const payload = {
        ...bookingData,
        created_at: new Date().toISOString(),
        status: 'confirmed',
        booking_reference: `LR${Date.now()}${Math.floor(Math.random() * 1000)}`
      };

      // Make API call
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Booking failed with status ${response.status}`);
      }

      const result = await response.json();
      
      // Add to local bookings state
      const newBooking = {
        id: result.id || Date.now(),
        ...bookingData,
        status: 'confirmed',
        created_at: new Date().toISOString(),
        booking_reference: result.booking_reference || payload.booking_reference
      };

      setBookings(prev => [...prev, newBooking]);

      return result;
    } catch (error) {
      console.error('Booking creation error:', error);
      setBookingError(error.message);
      throw error;
    } finally {
      setIsBooking(false);
    }
  };

  /**
   * Check for booking conflicts on specific dates
   * @param {string} listingId - ID of the listing
   * @param {string} startDate - Start date (YYYY-MM-DD)
   * @param {string} endDate - End date (YYYY-MM-DD)
   * @returns {Array} - Array of conflicting bookings
   */
  const getBookingConflicts = (listingId, startDate, endDate) => {
    const conflicts = bookings.filter(booking => {
      // Only check bookings for the same listing
      if (booking.listing_id !== listingId) return false;
      
      // Only check confirmed or pending bookings
      if (!['confirmed', 'pending'].includes(booking.status)) return false;
      
      const bookingStart = new Date(booking.start_date);
      const bookingEnd = new Date(booking.end_date);
      const requestStart = new Date(startDate);
      const requestEnd = new Date(endDate);
      
      // Check if date ranges overlap
      return (
        (requestStart <= bookingEnd && requestEnd >= bookingStart)
      );
    });

    return conflicts;
  };

  /**
   * Get all bookings for a specific user (as guest)
   * @param {string} userId - User ID
   * @returns {Array} - User's bookings
   */
  const getUserBookings = (userId) => {
    return bookings.filter(booking => booking.guest_info?.userId === userId);
  };

  /**
   * Get all bookings for a specific host
   * @param {string} hostId - Host user ID
   * @returns {Array} - Host's bookings
   */
  const getHostBookings = (hostId) => {
    return bookings.filter(booking => booking.host_id === hostId);
  };

  /**
   * Get bookings for a specific listing
   * @param {string} listingId - Listing ID
   * @returns {Array} - Listing's bookings
   */
  const getListingBookings = (listingId) => {
    return bookings.filter(booking => booking.listing_id === listingId);
  };

  /**
   * Cancel a booking
   * @param {string} bookingId - Booking ID to cancel
   * @returns {Promise} - Cancellation result
   */
  const cancelBooking = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }

      const result = await response.json();
      
      // Update local state
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled', cancelled_at: new Date().toISOString() }
          : booking
      ));

      return result;
    } catch (error) {
      console.error('Booking cancellation error:', error);
      throw error;
    }
  };

  /**
   * Update booking status
   * @param {string} bookingId - Booking ID
   * @param {string} newStatus - New status
   * @returns {Promise} - Update result
   */
  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }

      const result = await response.json();
      
      // Update local state
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: newStatus, updated_at: new Date().toISOString() }
          : booking
      ));

      return result;
    } catch (error) {
      console.error('Booking status update error:', error);
      throw error;
    }
  };

  /**
   * Get available dates for a listing (excluding booked dates)
   * @param {string} listingId - Listing ID
   * @param {Array} unavailableDates - Dates marked unavailable by host
   * @returns {Array} - Array of unavailable date strings
   */
  const getUnavailableDates = (listingId, unavailableDates = []) => {
    const listingBookings = getListingBookings(listingId);
    const bookedDates = [];

    listingBookings.forEach(booking => {
      if (['confirmed', 'pending'].includes(booking.status)) {
        const start = new Date(booking.start_date);
        const end = new Date(booking.end_date);
        
        // Generate all dates between start and end
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          bookedDates.push(d.toISOString().split('T')[0]);
        }
      }
    });

    return [...new Set([...unavailableDates, ...bookedDates])];
  };

  /**
   * Calculate earnings for a host
   * @param {string} hostId - Host user ID
   * @returns {Object} - Earnings breakdown
   */
  const calculateHostEarnings = (hostId) => {
    const hostBookings = getHostBookings(hostId);
    const completedBookings = hostBookings.filter(b => b.status === 'completed');
    
    const totalRevenue = completedBookings.reduce((sum, booking) => {
      return sum + (booking.pricing?.total || 0);
    }, 0);

    const platformFee = totalRevenue * 0.03; // 3% platform fee
    const netEarnings = totalRevenue - platformFee;

    return {
      totalRevenue,
      platformFee,
      netEarnings,
      bookingCount: completedBookings.length,
      averageBookingValue: completedBookings.length > 0 ? totalRevenue / completedBookings.length : 0
    };
  };

  /**
   * Get booking statistics
   * @returns {Object} - Overall booking statistics
   */
  const getBookingStats = () => {
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const completed = bookings.filter(b => b.status === 'completed').length;
    const cancelled = bookings.filter(b => b.status === 'cancelled').length;

    return {
      total: bookings.length,
      confirmed,
      pending,
      completed,
      cancelled,
      active: confirmed + pending
    };
  };

  return {
    // State
    bookings,
    isBooking,
    bookingError,
    
    // Actions
    createBooking,
    cancelBooking,
    updateBookingStatus,
    
    // Queries
    getBookingConflicts,
    getUserBookings,
    getHostBookings,
    getListingBookings,
    getUnavailableDates,
    
    // Analytics
    calculateHostEarnings,
    getBookingStats,
    
    // Utilities
    clearError: () => setBookingError(null)
  };
};

export default useBookingManagement;