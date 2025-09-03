// components/BookingFlow.js
import React, { useState } from 'react';
import { ArrowLeft, Calendar, CreditCard, CheckCircle } from 'lucide-react';
import BookingCalendar from './BookingCalendar';
import BookingSummary from './BookingSummary';
import CheckoutForm from './CheckoutForm';
import BookingConfirmation from './BookingConfirmation';

const BookingFlow = ({ listing, onClose, onBookingComplete }) => {
  const [currentStep, setCurrentStep] = useState(1); // 1: dates, 2: checkout, 3: confirmation
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState(null);

  // Mock unavailable dates - in real app, fetch from API
  const unavailableDates = [
    '2025-09-05', '2025-09-06', '2025-09-15', '2025-09-16', '2025-09-25', '2025-09-30'
  ];

  // Mock existing bookings for conflict checking
  const existingBookings = [
    { start_date: '2025-09-10', end_date: '2025-09-12' },
    { start_date: '2025-09-20', end_date: '2025-09-22' }
  ];

  const calculatePricing = () => {
    if (!selectedStartDate || !selectedEndDate) {
      return { subtotal: 0, serviceFee: 0, cleaningFee: 0, taxes: 0, securityDeposit: 0, total: 0 };
    }

    const dayCount = Math.ceil((new Date(selectedEndDate) - new Date(selectedStartDate)) / (1000 * 60 * 60 * 24)) + 1;
    const dailyRate = parseFloat(listing.price_per_day) || 0;
    const subtotal = dailyRate * dayCount;
    
    // Calculate fees
    const cleaningFee = parseFloat(listing.cleaning_fee) || 15;
    const serviceFee = Math.round(subtotal * 0.12 * 100) / 100; // 12% service fee, rounded
    const taxes = Math.round((subtotal + serviceFee) * 0.08 * 100) / 100; // 8% tax, rounded
    const securityDeposit = parseFloat(listing.security_deposit) || Math.max(dailyRate * 0.5, 50);
    
    // Apply discounts for longer rentals
    let discount = 0;
    if (dayCount >= 7) {
      discount = subtotal * 0.1; // 10% weekly discount
    } else if (dayCount >= 3) {
      discount = subtotal * 0.05; // 5% for 3+ days
    }

    const discountedSubtotal = subtotal - discount;
    const total = discountedSubtotal + cleaningFee + serviceFee + taxes;

    return {
      subtotal: discountedSubtotal,
      originalSubtotal: subtotal,
      discount,
      serviceFee,
      cleaningFee,
      taxes,
      securityDeposit,
      total,
      dayCount
    };
  };

  const pricing = calculatePricing();

  const steps = [
    { number: 1, title: 'Select Dates', icon: Calendar, description: 'Choose your rental period' },
    { number: 2, title: 'Checkout', icon: CreditCard, description: 'Confirm details and pay' },
    { number: 3, title: 'Confirmed', icon: CheckCircle, description: 'Booking complete' }
  ];

  const checkDateConflicts = (startDate, endDate) => {
    const requestStart = new Date(startDate);
    const requestEnd = new Date(endDate);
    
    return existingBookings.some(booking => {
      const bookingStart = new Date(booking.start_date);
      const bookingEnd = new Date(booking.end_date);
      return (requestStart <= bookingEnd && requestEnd >= bookingStart);
    });
  };

  const handleDateRangeSelect = (startDate, endDate) => {
    setError(null);
    
    if (startDate && endDate) {
      // Check for conflicts
      if (checkDateConflicts(startDate, endDate)) {
        setError('Selected dates conflict with existing bookings. Please choose different dates.');
        return;
      }
      
      // Check minimum/maximum rental period
      const dayCount = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
      if (dayCount > 30) {
        setError('Maximum rental period is 30 days. Please select a shorter period.');
        return;
      }
    }
    
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  const handleProceedToCheckout = () => {
    if (!selectedStartDate || !selectedEndDate) {
      setError('Please select your rental dates first.');
      return;
    }
    
    if (error) {
      return; // Don't proceed if there are date conflicts
    }
    
    setCurrentStep(2);
  };

  const handleCheckoutSubmit = async (checkoutData) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Validate dates one more time before submission
      if (checkDateConflicts(selectedStartDate, selectedEndDate)) {
        throw new Error('Date conflict detected. Please select different dates.');
      }

      // Prepare booking payload
      const bookingPayload = {
        listing_id: listing.id,
        host_id: listing.users?.id,
        start_date: selectedStartDate,
        end_date: selectedEndDate,
        guest_info: {
          ...checkoutData,
          userId: 'current_user_id' // In real app, get from auth context
        },
        pricing: pricing,
        special_requests: checkoutData.specialRequests,
        status: 'confirmed',
        payment_status: 'completed',
        created_at: new Date().toISOString()
      };

      // Simulate API call - replace with actual endpoint
      const response = await fetch('https://rental-sharing.onrender.com/api/bookings', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // Add auth headers here
        },
        body: JSON.stringify(bookingPayload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Booking failed. Please try again.');
      }

      const result = await response.json();
      
      // Create booking confirmation data
      setBookingData({
        id: result.id || `LR${Date.now()}`,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
        pricing: pricing,
        guestInfo: checkoutData,
        confirmedAt: new Date().toISOString(),
        status: 'confirmed'
      });

      setCurrentStep(3);
      
      // Notify parent component
      onBookingComplete && onBookingComplete({
        ...result,
        listing: listing,
        dates: { start: selectedStartDate, end: selectedEndDate }
      });

    } catch (error) {
      console.error('Booking error:', error);
      setError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToStep = (step) => {
    setCurrentStep(step);
    setError(null);
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Select Your Dates';
      case 2: return 'Confirm & Pay';
      case 3: return 'Booking Confirmed';
      default: return 'Book Item';
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7 mb-8 lg:mb-0">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">When would you like to rent this item?</h3>
                <p className="text-slate-600">Select your check-in and check-out dates</p>
              </div>

              <BookingCalendar
                unavailableDates={unavailableDates}
                bookedDates={existingBookings.flatMap(booking => {
                  const dates = [];
                  const start = new Date(booking.start_date);
                  const end = new Date(booking.end_date);
                  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
                    dates.push(d.toISOString().split('T')[0]);
                  }
                  return dates;
                })}
                onDateRangeSelect={handleDateRangeSelect}
                selectedStartDate={selectedStartDate}
                selectedEndDate={selectedEndDate}
              />

              {error && (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}
            </div>

            <div className="lg:col-span-5">
              <BookingSummary
                listing={listing}
                startDate={selectedStartDate}
                endDate={selectedEndDate}
                pricing={pricing}
                onEdit={() => {
                  setSelectedStartDate(null);
                  setSelectedEndDate(null);
                  setError(null);
                }}
              />
              
              <div className="mt-6">
                <button
                  onClick={handleProceedToCheckout}
                  disabled={!selectedStartDate || !selectedEndDate || !!error}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                    selectedStartDate && selectedEndDate && !error
                      ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {!selectedStartDate || !selectedEndDate 
                    ? 'Select dates to continue'
                    : error
                    ? 'Resolve date conflict first'
                    : `Continue to Checkout • ₹${pricing.total.toFixed(2)}`
                  }
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Confirm and Pay</h3>
                <p className="text-slate-600">Enter your details to complete the booking</p>
              </div>

              <CheckoutForm
                onSubmit={handleCheckoutSubmit}
                onBack={() => handleBackToStep(1)}
                startDate={selectedStartDate}
                endDate={selectedEndDate}
                pricing={pricing}
                isProcessing={isProcessing}
              />

              {error && (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-5 mt-8 lg:mt-0">
              <div className="sticky top-24">
                <BookingSummary
                  listing={listing}
                  startDate={selectedStartDate}
                  endDate={selectedEndDate}
                  pricing={pricing}
                  onEdit={() => handleBackToStep(1)}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <BookingConfirmation
            booking={bookingData}
            listing={listing}
            onBackToHome={onClose}
            onDownloadReceipt={() => {
              // Generate and download receipt
              const receiptData = {
                booking: bookingData,
                listing: listing,
                downloadedAt: new Date().toISOString()
              };
              console.log('Download receipt:', receiptData);
              alert('Receipt download started! (Feature coming soon)');
            }}
            onContactHost={() => {
              // Navigate to messaging or open contact modal
              console.log('Contact host for listing:', listing.id);
              alert('Opening message thread with host... (Feature coming soon)');
            }}
          />
        );

      default:
        return (
          <div className="text-center py-20">
            <p className="text-slate-600">Invalid step</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={currentStep === 3 ? onClose : onClose}
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">
                {currentStep === 3 ? 'Back to listings' : 'Back to item'}
              </span>
            </button>

            <div className="hidden sm:block text-center">
              <h2 className="text-xl font-bold text-slate-900">{getStepTitle()}</h2>
              <p className="text-sm text-slate-500">{listing.title}</p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    currentStep >= step.number 
                      ? 'bg-slate-900 text-white' 
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    <step.icon size={16} />
                  </div>
                  
                  <div className="ml-3 hidden lg:block">
                    <div className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-slate-900' : 'text-slate-500'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-slate-400">{step.description}</div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`hidden lg:block w-12 h-1 mx-4 rounded transition-all ${
                      currentStep > step.number ? 'bg-slate-900' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {renderStepContent()}
      </main>

      {/* Bottom Navigation for Mobile */}
      {currentStep < 3 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <button
              onClick={currentStep === 1 ? onClose : () => handleBackToStep(currentStep - 1)}
              className="px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-medium"
            >
              {currentStep === 1 ? 'Cancel' : 'Back'}
            </button>

            <div className="text-center flex-1 mx-4">
              <p className="text-sm text-slate-500">Step {currentStep} of {steps.length}</p>
              {currentStep === 1 && selectedStartDate && selectedEndDate && (
                <p className="text-sm font-medium text-slate-900">
                  ${pricing.total.toFixed(2)} total
                </p>
              )}
            </div>

            {currentStep === 1 ? (
              <button
                onClick={handleProceedToCheckout}
                disabled={!selectedStartDate || !selectedEndDate || !!error}
                className={`px-6 py-3 rounded-xl font-medium ${
                  selectedStartDate && selectedEndDate && !error
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            ) : (
              <div className="px-6 py-3">
                <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingFlow;