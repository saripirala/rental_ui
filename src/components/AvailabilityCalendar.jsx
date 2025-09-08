// components/AvailabilityCalendar.js
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const AvailabilityCalendar = ({ unavailableDates = [], onDateSelect, selectedDates = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const isDateUnavailable = (date) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return unavailableDates.includes(dateStr);
  };

  const isDateSelected = (date) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return selectedDates.includes(dateStr);
  };

  const isPastDate = (date) => {
    const today = new Date();
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), date);
    return checkDate < today.setHours(0, 0, 0, 0);
  };

  const handleDateClick = (date) => {
    if (isPastDate(date) || isDateUnavailable(date)) return;
    
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    onDateSelect && onDateSelect(dateStr);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-900">Availability</h3>
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

      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} className="h-10"></div>
        ))}
        
        {/* Days of the month */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = i + 1;
          const isUnavailable = isDateUnavailable(date);
          const isSelected = isDateSelected(date);
          const isPast = isPastDate(date);
          
          return (
            <button
              key={date}
              onClick={() => handleDateClick(date)}
              disabled={isPast || isUnavailable}
              className={`h-10 flex items-center justify-center text-sm rounded-lg transition-all ${
                isSelected 
                  ? 'bg-slate-900 text-white'
                  : isPast
                  ? 'text-slate-300 cursor-not-allowed'
                  : isUnavailable
                  ? 'text-slate-400 cursor-not-allowed line-through'
                  : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              {date}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-slate-100 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-slate-900 rounded"></div>
          <span className="text-slate-600">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-slate-200 rounded"></div>
          <span className="text-slate-600">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-slate-100 rounded line-through"></div>
          <span className="text-slate-600">Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;