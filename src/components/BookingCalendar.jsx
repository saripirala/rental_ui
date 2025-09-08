// components/BookingCalendar.js
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, AlertCircle } from 'lucide-react';

const BookingCalendar = ({ 
  unavailableDates = [], 
  bookedDates = [],
  onDateRangeSelect, 
  selectedStartDate, 
  selectedEndDate,
  minDays = 1,
  maxDays = 30 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoverEndDate, setHoverEndDate] = useState(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    const today = new Date();
    const prevMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    if (prevMonthDate >= new Date(today.getFullYear(), today.getMonth())) {
      setCurrentMonth(prevMonthDate);
    }
  };

  const formatDateString = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isDateUnavailable = (date) => {
    const dateStr = formatDateString(currentMonth.getFullYear(), currentMonth.getMonth(), date);
    return unavailableDates.includes(dateStr) || bookedDates.includes(dateStr);
  };

  const isPastDate = (date) => {
    const today = new Date();
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), date);
    return checkDate < today.setHours(0, 0, 0, 0);
  };

  const isInRange = (date) => {
    if (!selectedStartDate) return false;
    
    const dateStr = formatDateString(currentMonth.getFullYear(), currentMonth.getMonth(), date);
    const checkDate = new Date(dateStr);
    const startDate = new Date(selectedStartDate);
    const endDate = selectedEndDate ? new Date(selectedEndDate) : (hoverEndDate ? new Date(hoverEndDate) : null);
    
    if (!endDate) return dateStr === selectedStartDate;
    
    return checkDate >= startDate && checkDate <= endDate;
  };

  const isRangeStart = (date) => {
    const dateStr = formatDateString(currentMonth.getFullYear(), currentMonth.getMonth(), date);
    return dateStr === selectedStartDate;
  };

  const isRangeEnd = (date) => {
    const dateStr = formatDateString(currentMonth.getFullYear(), currentMonth.getMonth(), date);
    return dateStr === selectedEndDate || dateStr === hoverEndDate;
  };

  const handleDateClick = (date) => {
    if (isPastDate(date) || isDateUnavailable(date)) return;
    
    const dateStr = formatDateString(currentMonth.getFullYear(), currentMonth.getMonth(), date);
    
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // Start new selection
      onDateRangeSelect(dateStr, null);
    } else {
      // Complete selection
      const startDate = new Date(selectedStartDate);
      const endDate = new Date(dateStr);
      
      if (endDate < startDate) {
        // If end date is before start, swap them
        onDateRangeSelect(dateStr, selectedStartDate);
      } else {
        onDateRangeSelect(selectedStartDate, dateStr);
      }
    }
  };

  const handleDateHover = (date) => {
    if (!selectedStartDate || selectedEndDate) return;
    
    const dateStr = formatDateString(currentMonth.getFullYear(), currentMonth.getMonth(), date);
    const startDate = new Date(selectedStartDate);
    const hoverDate = new Date(dateStr);
    
    if (hoverDate >= startDate) {
      setHoverEndDate(dateStr);
    }
  };

  const getDayCount = () => {
    if (!selectedStartDate || !selectedEndDate) return 0;
    const start = new Date(selectedStartDate);
    const end = new Date(selectedEndDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-900">Select Dates</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevMonth}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft size={16} className="text-slate-600" />
          </button>
          <span className="text-sm font-medium text-slate-900 min-w-[120px] text-center">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <button
            onClick={nextMonth}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ChevronRight size={16} className="text-slate-600" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-slate-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mb-6">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} className="h-10"></div>
        ))}
        
        {/* Days of the month */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = i + 1;
          const isUnavailable = isDateUnavailable(date);
          const isPast = isPastDate(date);
          const inRange = isInRange(date);
          const isStart = isRangeStart(date);
          const isEnd = isRangeEnd(date);
          
          return (
            <button
              key={date}
              onClick={() => handleDateClick(date)}
              onMouseEnter={() => handleDateHover(date)}
              onMouseLeave={() => setHoverEndDate(null)}
              disabled={isPast || isUnavailable}
              className={`h-10 flex items-center justify-center text-sm rounded-lg transition-all relative ${
                isPast
                  ? 'text-slate-300 cursor-not-allowed'
                  : isUnavailable
                  ? 'text-slate-400 cursor-not-allowed line-through bg-red-50'
                  : isStart || isEnd
                  ? 'bg-slate-900 text-white font-semibold'
                  : inRange
                  ? 'bg-slate-100 text-slate-900'
                  : 'hover:bg-slate-100 text-slate-700 cursor-pointer'
              }`}
            >
              {date}
            </button>
          );
        })}
      </div>

      {/* Selection Summary */}
      {selectedStartDate && (
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-center justify-between text-sm">
            <div>
              <span className="font-medium text-slate-900">Check-in: </span>
              <span className="text-slate-600">{new Date(selectedStartDate).toLocaleDateString()}</span>
            </div>
            {selectedEndDate && (
              <div>
                <span className="font-medium text-slate-900">Check-out: </span>
                <span className="text-slate-600">{new Date(selectedEndDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
          {selectedEndDate && (
            <div className="mt-2 text-center">
              <span className="font-semibold text-slate-900">{getDayCount()} {getDayCount() === 1 ? 'day' : 'days'} rental</span>
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center space-x-4 mt-4 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-slate-900 rounded"></div>
          <span className="text-slate-600">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-slate-100 rounded"></div>
          <span className="text-slate-600">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-50 rounded"></div>
          <span className="text-slate-600">Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;