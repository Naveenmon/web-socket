import React, { useState } from 'react';
import { MessageSquare, CreditCard, Menu, X, Bell, User } from 'lucide-react';
import Message from '../Components/Message';
import TransactionHistory from '../Components/TransactionHistory';
import { Player } from '@lottiefiles/react-lottie-player';
import lottieAnimation from '../assets/landing.json'; // 

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentRoute, setCurrentRoute] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (currentRoute) {
      case 'messages':
        return <Message />;
      case 'payments':
        return <TransactionHistory />;
      default:
        return (
            <div className="flex-1 bg-gray-50 p-8">
              {/* Lottie Animation */}
              <div className="mb-8">
                <Player
                  autoplay
                  loop
                  src={lottieAnimation}
                  className="w-full max-w-md"
                />
              </div>
              <h1 className="text-3xl font-bold text-center text-gray-900 mt-6">Welcome to Your Dashboard!</h1>
            </div>
          );
         
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button onClick={toggleSidebar} className="lg:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          <button
            onClick={() => setCurrentRoute('messages')}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg ${
              currentRoute === 'messages' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <MessageSquare className="h-5 w-5" />
            <span>Messages</span>
          </button>
          <button
            onClick={() => setCurrentRoute('payments')}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg mt-2 ${
              currentRoute === 'payments' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <CreditCard className="h-5 w-5" />
            <span>Payment History</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button onClick={toggleSidebar} className="lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto flex justify-end">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
