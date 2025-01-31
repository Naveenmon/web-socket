import React, { useState } from 'react';
import { MessageSquare, CreditCard, Menu, X, Bell, User } from 'lucide-react';
import Message from '../Components/Message';
import TransactionHistory from '../Components/TransactionHistory';
import { Player } from '@lottiefiles/react-lottie-player';
import lottieAnimation from '../assets/landing.json'; // 
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
  const name = localStorage.getItem('name');
  const profilePic = localStorage.getItem('profilePic');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentRoute, setCurrentRoute] = useState('dashboard');

  const navigate = useNavigate();

  const handleLogout = () => {
    googleLogout(); 
    localStorage.removeItem('name'); 
    localStorage.removeItem('profilePic'); 
    localStorage.removeItem('email');
    navigate('/login'); 
  };

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
          <Link to={'/'}>
            <img src={logo} width={40} height={40} alt="logo" />
          </Link>
          <h1 className="text-xl font-bold">AudioBook</h1>
          <button onClick={toggleSidebar} className="lg:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          <button
            onClick={() => setCurrentRoute('messages')}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg ${
              currentRoute === 'messages' ? 'bg-[#ffded9] text-black' : 'hover:bg-[#ffded9]'
            }`}
          >
            <MessageSquare className="h-5 w-5" />
            <span>Messages</span>
          </button>
          <button
            onClick={() => setCurrentRoute('payments')}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg mt-2 ${
              currentRoute === 'payments' ? 'bg-[#ffded9] text-black' : 'hover:bg-[#ffded9]'
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
            
            <div className="flex items-center space-x-4 ml-auto pr-8">
              <img 
                src={profilePic} 
                alt="user" 
                className="w-12 h-12 rounded-full object-cover border-2 border-[#ffa3a3]" 
              />
              
              <p className="font-semibold text-gray-800">{name}</p>

              <button 
                onClick={handleLogout}
                className="bg-[#ffa3a3] text-white px-2 py-1 rounded-md hover:bg-[#ffb7b7] transition duration-300"
              >
                Logout
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
