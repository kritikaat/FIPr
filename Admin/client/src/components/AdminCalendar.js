import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-multi-date-picker';
import { Calendar as CalendarIcon, Save, Loader, CheckCircle2 } from 'lucide-react';

const AdminCalendar = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    fetchBusyDates();
  }, []);

  const fetchBusyDates = async () => {
    setIsFetching(true);
    try {
      const response = await fetch('http://localhost:3000/admin');
      if (!response.ok) throw new Error('Failed to fetch dates');
      
      const data = await response.json();
      const dates = data.dates.map(item => new Date(item.date));
      setSelectedDates(dates);
    } catch (error) {
      console.error('Error fetching dates:', error);
      setSaveMessage('Failed to load existing dates');
    } finally {
      setIsFetching(false);
    }
  };

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
    setSaveMessage(''); // Clear any existing message when dates change
  };

  const handleSave = async () => {
    setIsLoading(true);
    setSaveMessage('');
    try {
      const formattedDates = selectedDates.map(date => 
        date instanceof Date ? date.toISOString() : new Date(date).toISOString()
      );

      const response = await fetch('http://localhost:3000/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dates: formattedDates,
        }),
      });

      if (!response.ok) throw new Error('Failed to save dates');
      
      setSaveMessage('Dates saved successfully');
      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
      await fetchBusyDates();
    } catch (error) {
      console.error('Error saving dates:', error);
      setSaveMessage('Failed to save dates');
    } finally {
      setIsLoading(false);
    }
  };

  const customStyles = {
    calendar: {
      width: 'auto',
      padding: '16px',
      background: 'white',
      border: 'none',
      borderRadius: '8px',
    },
    day: {
      width: '40px',
      height: '40px',
      margin: '2px',
      color: '#374151',
      background: '#f3f4f6',
      borderRadius: '6px',
      fontSize: '0.95rem',
      transition: 'all 0.2s ease',
    },
    today: {
      background: '#f3f4f6',
      color: '#2563eb',
      fontWeight: '600',
      border: '2px solid #93c5fd',
    },
    selected: {
      background: '#bfdbfe',
      color: '#1e40af',
      fontWeight: '600',
    },
    weekDays: {
      fontSize: '0.875rem',
      color: '#4b5563',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="w-6 h-6 text-blue-600 animate-spin" />
        <span className="ml-2 text-gray-600">Loading saved dates...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <CalendarIcon className="w-6 h-6 text-blue-600" />
        <h1 className="text-xl font-semibold text-gray-800">Select Busy Dates</h1>
      </div>

      <Calendar
        value={selectedDates}
        onChange={handleDateChange}
        multiple
        className="rmdp-mobile"
        minDate={new Date()}
        style={customStyles.calendar}
        classNames={{
          day: 'custom-day',
          selected: 'custom-selected',
        }}
      />

      {selectedDates.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Selected Dates:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedDates.map((date, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-md text-sm text-blue-600 border border-blue-100"
              >
                <CalendarIcon className="w-4 h-4" />
                {date instanceof Date 
                  ? date.toLocaleDateString() 
                  : new Date(date).toLocaleDateString()}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        {saveMessage && (
          <div className={`flex items-center gap-2 text-sm ${
            saveMessage.includes('Failed') 
              ? 'text-red-600' 
              : 'text-emerald-600'
          }`}>
            {saveMessage.includes('Failed') ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                {saveMessage}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {saveMessage}
              </span>
            )}
          </div>
        )}
        
        <button 
          onClick={handleSave}
          disabled={selectedDates.length === 0 || isLoading}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm
            transition-all duration-200 ease-in-out
            ${selectedDates.length === 0 || isLoading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700 active:transform active:scale-95'
            }
          `}
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Dates
            </>
          )}
        </button>
      </div>

      <style jsx global>{`
        .custom-day {
          ${Object.entries(customStyles.day).map(([key, value]) => `${key}: ${value};`).join('\n')}
        }
        .custom-day:hover {
          background: #e5e7eb;
          transform: scale(0.95);
        }
        .custom-selected {
          ${Object.entries(customStyles.selected).map(([key, value]) => `${key}: ${value};`).join('\n')}
        }
        .custom-selected:hover {
          background: #93c5fd !important;
        }
        .rmdp-week-day {
          ${Object.entries(customStyles.weekDays).map(([key, value]) => `${key}: ${value};`).join('\n')}
        }
        .rmdp-day:not(.rmdp-disabled):not(.rmdp-day-hidden) {
          transition: all 0.2s ease;
        }
        .rmdp-today {
          ${Object.entries(customStyles.today).map(([key, value]) => `${key}: ${value};`).join('\n')}
        }
        .rmdp-wrapper {
          width: auto !important;
        }
        .rmdp-calendar {
          padding: 0 !important;
        }
        .rmdp-day-picker {
          justify-content: flex-start !important;
          width: auto !important;
        }
        .rmdp-month-picker, .rmdp-year-picker {
          background-color: white !important;
        }
        .rmdp-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .rmdp-header-values {
          margin: 0 1rem;
        }
      `}</style>
    </div>
  );
};

export default AdminCalendar;
