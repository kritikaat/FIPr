import React, { useState, useEffect } from 'react';
import { 
  Bell, Settings, LogOut, User, 
  FileText, X, Mail, AlertTriangle 
} from 'lucide-react';

const AdminSidebar = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    totalForms: 0,
    totalSubmissions: 0
  });

  useEffect(() => {
    fetchNotifications();
    fetchStats();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const markNotificationAsRead = async (id) => {
    try {
      await fetch(`/api/notifications/${id}/read`, {
        method: 'PUT'
      });
      
      setNotifications(notifications.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST'
      });
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderDashboard = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Forms</p>
            <p className="text-xl font-semibold">{stats.totalForms}</p>
          </div>
          <FileText className="w-5 h-5 text-blue-600" />
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Submissions</p>
            <p className="text-xl font-semibold">{stats.totalSubmissions}</p>
          </div>
          <Mail className="w-5 h-5 text-blue-600" />
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-4">
      {notifications.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          No notifications
        </div>
      ) : (
        notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`p-4 rounded-lg cursor-pointer ${
              notification.read ? 'bg-gray-50' : 'bg-blue-50'
            }`}
            onClick={() => markNotificationAsRead(notification.id)}
          >
            <div className="flex items-start space-x-3">
              <AlertTriangle className={`w-5 h-5 ${
                notification.read ? 'text-gray-500' : 'text-blue-600'
              }`} />
              <div>
                <p className="text-sm">{notification.message}</p>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex-shrink-0 p-4 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold">Admin Panel</h2>
                <p className="text-sm text-gray-500">Dashboard</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-shrink-0 p-4 border-b">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium ${
                activeSection === 'dashboard'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveSection('notifications')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium relative ${
                activeSection === 'notifications'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Notifications
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 p-4 overflow-y-auto min-h-0">
          {activeSection === 'dashboard' && renderDashboard()}
          {activeSection === 'notifications' && renderNotifications()}
        </div>

        {/* Sign Out - Fixed at bottom */}
        <div className="flex-shrink-0 p-4 border-t mt-auto">
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;