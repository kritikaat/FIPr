import React, { useState, useEffect } from 'react';

const Calendar = ({ onSelectDates, selectedDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Update parent component with selected dates on mount and whenever `selectedDates` changes
  useEffect(() => {
    onSelectDates(selectedDates);
  }, [selectedDates, onSelectDates]);

  // Function to render the calendar days with selected dates highlighted
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Render blank days for the start of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(<div key={`empty-${i}`} className="day w-full h-12"></div>);
    }

    // Render each day with selection highlighting
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      const isSelected = selectedDates.some(d => d === dateString); // Check if the date is in selectedDates

      days.push(
        <div
          key={day}
          className={`day w-full h-12 flex items-center justify-center cursor-pointer transition duration-300 ease-in-out 
            ${isSelected ? 'bg-red-300' : 'bg-gray-300 hover:bg-red-400'}`}
          onClick={() => toggleDate(dateString)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  // Function to toggle the selected state of a date
  const toggleDate = (dateString) => {
    let updatedDates;
    if (selectedDates.includes(dateString)) {
      updatedDates = selectedDates.filter(d => d !== dateString); // Remove date if already selected
    } else {
      updatedDates = [...selectedDates, dateString]; // Add date if not selected
    }
    onSelectDates(updatedDates); // Update parent with new dates array
  };

  return (
    <div>
      <div className="calendar-nav flex justify-between items-center mb-2">
        <button 
          className="py-1 px-2 bg-gray-800 text-white rounded hover:bg-blue-800"
          onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
        >
          Previous
        </button>
        <h2 className="text-lg">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button 
          className="py-1 px-2 bg-gray-800 text-white rounded hover:bg-blue-800"
          onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
        >
          Next
        </button>
      </div>
      <div className="calendar grid grid-cols-7 gap-1 mt-5">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
