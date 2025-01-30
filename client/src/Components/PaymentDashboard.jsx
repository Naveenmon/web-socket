import React, { useState } from 'react';
import { Bell, X, Activity, User } from 'lucide-react'; // Adding User icon for the profile section

const Dashboard = () => {
  // State to handle the notification popup visibility
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  // Sample notifications array
  const notifications = [
    {
      id: 1,
      message: 'You have a new audiobook suggestion!',
      transactionId: 'TX1234',
      timestamp: '2025-01-28 10:15 AM',
      status: 'success',
    },
    {
      id: 2,
      message: 'Payment successfully processed for your audiobook!',
      transactionId: 'TX1235',
      timestamp: '2025-01-25 05:30 PM',
      status: 'success',
    },
    {
      id: 3,
      message: 'Your audiobook subscription is about to expire.',
      transactionId: 'TX1236',
      timestamp: '2025-01-20 09:00 AM',
      status: 'pending',
    },
  ];

  // Toggle the notification popup
  const toggleNotificationPopup = () => {
    setNotificationOpen((prev) => !prev);
  };

  // Close the notification popup
  const closeNotificationPopup = () => {
    setNotificationOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-indigo-600 p-4 text-white flex justify-between items-center">
        <h1 className="text-2xl font-bold">Audio</h1>
        <div className="flex items-center gap-4">
          {/* Notification Button */}
          <button
            onClick={toggleNotificationPopup}
            className="relative p-2 hover:bg-indigo-700 rounded-full"
          >
            <Bell size={24} />
            {notifications.length > 0 && (
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notifications.length}
              </div>
            )}
          </button>
          
          {/* Profile Button */}
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center">
                <span className="text-white font-medium">JD</span>
            </div>
        </div>
      </header>

      {/* Notification Pop-up */}
      {isNotificationOpen && (
        <NotificationPopup
          notifications={notifications}
          isOpen={isNotificationOpen}
          onClose={closeNotificationPopup}
        />
      )}

      {/* Main Content */}
      <main className="p-8">
        {/* Your main content goes here */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold">Welcome to your Dashboard!</h3>
        </div>
      </main>
    </div>
  );
};

const NotificationPopup = ({ notifications, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-4 w-96 bg-white rounded-2xl shadow-xl z-50 max-h-[600px] border border-gray-100">
      <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
          <p className="text-sm text-gray-500">Recent updates</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
          <X size={16} />
        </button>
      </div>
      <div className="overflow-y-auto max-h-[400px] divide-y divide-gray-100">
        {notifications.length === 0 ? (
          <div className="p-6 text-center">
            <Bell size={24} className="text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No new notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-full ${
                    notification.status === 'success' ? 'bg-green-100' : 'bg-blue-100'
                  }`}
                >
                  <Activity
                    size={14}
                    className={notification.status === 'success' ? 'text-green-600' : 'text-blue-600'}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">#{notification.transactionId}</p>
                  <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
