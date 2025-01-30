import React, { useState, useEffect } from 'react';
import { Bell, CreditCard, History, X, ChevronRight, Activity } from 'lucide-react';
import io from 'socket.io-client';

// NotificationPopup Component
// Previous imports remain the same...

// NotificationPopup Component
const NotificationPopup = ({ notifications, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-4 w-96 bg-white rounded-2xl shadow-xl z-50 max-h-[600px] border border-gray-100">
      <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
          <p className="text-sm text-gray-500">Recent updates</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white rounded-full transition-colors"
        >
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
            <div
              key={notification.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  notification.status === 'success' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  <Activity size={14} className={
                    notification.status === 'success' ? 'text-green-600' : 'text-blue-600'
                  } />
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

// Rest of the components remain the same...

// Header Component
const Header = ({ onNotificationClick, notificationCount }) => (
  <header className="bg-white border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-8">
      <div className="flex justify-between items-center h-20">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          PayFlow
        </h1>
        <div className="flex items-center gap-6">
          <button
            onClick={onNotificationClick}
            className="p-3 hover:bg-gray-50 rounded-xl relative transition-colors"
          >
            <Bell size={20} className="text-gray-600" />
            {notificationCount > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center">
            <span className="text-white font-medium">JD</span>
          </div>
        </div>
      </div>
    </div>
  </header>
);

// Payment Card Component
const PaymentCard = ({ onPayment }) => (
  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
    <div className="flex items-start justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Quick Payment</h2>
        <p className="text-gray-500">Complete your payment securely</p>
      </div>
      <div className="p-4 bg-blue-50 rounded-xl">
        <CreditCard className="text-blue-600 w-6 h-6" />
      </div>
    </div>
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl">
        <p className="text-sm text-gray-600 mb-2">Amount Due</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-gray-800">$299</span>
          <span className="text-gray-500">.00</span>
        </div>
      </div>
      <button
        onClick={onPayment}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <span className="flex items-center justify-center gap-2">
          Pay Now
          <ChevronRight size={16} />
        </span>
      </button>
    </div>
  </div>
);

// Recent Activity Component
const RecentActivity = ({ notifications }) => (
  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
    <div className="flex items-center gap-4 mb-8">
      <div className="p-4 bg-indigo-50 rounded-xl">
        <History className="text-indigo-600 w-6 h-6" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
        <p className="text-gray-500">Track your payment history</p>
      </div>
    </div>
    <div className="space-y-4">
      {notifications.slice(0, 3).map((notification) => (
        <div
          key={notification.id}
          className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100"
        >
          <div className={`p-2 rounded-full ${
            notification.status === 'success' ? 'bg-green-100' : 'bg-blue-100'
          }`}>
            <Activity size={16} className={
              notification.status === 'success' ? 'text-green-600' : 'text-blue-600'
            } />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">{notification.message}</p>
            <p className="text-xs text-gray-500 mt-1">#{notification.transactionId}</p>
          </div>
          <span className="text-xs text-gray-400">{notification.timestamp}</span>
        </div>
      ))}
      {notifications.length === 0 && (
        <div className="text-center py-8">
          <Activity size={32} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No recent activity</p>
        </div>
      )}
    </div>
  </div>
);

// Main Component
const PaymentWebsite = () => {
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('transactionUpdate', (data) => {
      addNotification(data);
    });

    return () => newSocket.disconnect();
  }, []);

  const addNotification = (data) => {
    const newNotification = {
      id: Date.now(),
      message: data.message,
      status: data.status,
      transactionId: data.transactionId,
      timestamp: new Date().toLocaleTimeString()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handlePayment = () => {
    const transactionId = `TXN${Date.now()}`;
    socket?.emit('initiatePayment', {
      transactionId,
      amount: 299.00,
      timestamp: new Date().toISOString()
    });
    
    setTimeout(() => {
      addNotification({
        message: 'Payment initiated successfully',
        status: 'pending',
        transactionId
      });
    }, 500);

    setTimeout(() => {
      addNotification({
        message: 'Payment processed successfully',
        status: 'success',
        transactionId
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onNotificationClick={() => setIsNotificationOpen(!isNotificationOpen)}
        notificationCount={notifications.length}
      />
      
      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <PaymentCard onPayment={handlePayment} />
          <RecentActivity notifications={notifications} />
        </div>
      </main>

      <NotificationPopup
        notifications={notifications}
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </div>
  );
};

export default PaymentWebsite;