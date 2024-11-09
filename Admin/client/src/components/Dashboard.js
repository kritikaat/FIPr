import React, { useState, useEffect } from 'react';
import { User, Search as SearchIcon, Bell } from 'lucide-react';
import FormCard from './Formcard';
import SearchBar from './SearchBar';
import Sidebar from './AdminSidebar';
import logoImage from './logo.png'; 

const Dashboard = ({ forms, organizationName = "Institute of Plasma Research" }) => {
  const [filteredForms, setFilteredForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminSidebarOpen, setIsAdminSidebarOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false); // Add notification state

  useEffect(() => {
    setFilteredForms(forms);
    setIsLoading(false);
  }, [forms]);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredForms(forms);
      return;
    }
    const filtered = forms.filter((form) =>
      form.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredForms(filtered);
  };

  const handleNotificationClick = () => {
    // Toggle notification state for demo purposes
    setHasNotifications(!hasNotifications);
    // Here you would typically handle showing a notification panel or modal
  };

  return (
    <div className="min-h-screen bg-gradient-white">
      <header className="bg-gradient-white-50 border-b border-orange-200 shadow-sm">
        <div className="px-10 lg:px-10">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4 group">
              <div className="w-12 h-19 flex items-center justify-center transform transition-transform group-hover:scale-105">
                <img
                  src={logoImage}
                  alt={organizationName}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-orange-500 hidden sm:block tracking-wide">
                  प्लाज्मा अनुसंधान संस्थान
                </h1>
                <h2 className="text-xl font-semibold text-blue-600 hidden sm:block tracking-wide">
                  Institute for Plasma Research
                </h2>
              </div>
            </div>

            <div className="flex items-center space-x-4 flex-1 justify-end max-w-xl">
              <div className={`relative flex-1 max-w-md hidden sm:block transition-all duration-200 ${searchFocused ? 'scale-105' : ''}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={16} className="text-orange-200" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-orange-50 transition-all"
                  placeholder="Search forms..."
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>
              
              {/* Notification Button */}
              <button
                onClick={handleNotificationClick}
                className="p-2 text-blue-600 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-colors duration-200 transform hover:scale-105 relative"
              >
                <Bell size={24} />
                {hasNotifications && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              <button
                onClick={() => setIsAdminSidebarOpen(true)}
                className="p-2 text-blue-600 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-colors duration-200 transform hover:scale-105"
              >
                <User size={24} />
              </button>
            </div>
          </div>
          
          <div className="sm:hidden py-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={16} className="text-orange-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                placeholder="Search forms..."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="px-10 lg:px-5 py-10">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredForms.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <div className="inline-block p-4 rounded-full bg-gray-50 mb-4">
              <SearchIcon size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500">No forms found</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-2 gap-10 animate-fade-in">
            {filteredForms.map((form, index) => (
              <div
                key={form.id}
                className="transform transition-all duration-300 hover:scale-102 hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <FormCard form={form} />
              </div>
            ))}
          </div>
        )}
      </main>

      <Sidebar
        isOpen={isAdminSidebarOpen}
        onClose={() => setIsAdminSidebarOpen(false)}
      />

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;