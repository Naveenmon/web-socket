import React from 'react';
import { NavLink } from 'react-router-dom';  // Use NavLink for active link styling
import { History, MessageCircle } from 'lucide-react';

const SideMenu = () => {
  return (
    <div className="w-64 bg-white shadow-md h-full flex flex-col">
      <div className="p-6 text-xl font-semibold text-gray-900 border-b">Menu</div>
      <div className="flex-1 mt-6">
        <ul className="space-y-4 px-6">
          {/* Transaction History Link */}
          <li>
            <NavLink 
              to="/overview/transactions" 
              className="flex items-center space-x-3 py-3 rounded-md transition-all hover:bg-gray-100"
              // Apply active class to the link
              activeClassName="bg-[#ffa3a3] text-white"
            >
              <History size={20} />
              <span>Transaction History</span>
            </NavLink>
          </li>
          
          {/* Messages Link */}
          <li>
            <NavLink 
              to="/overview/messages" 
              className="flex items-center space-x-3 py-3 rounded-md transition-all hover:bg-gray-100"
              // Apply active class to the link
              activeClassName="bg-[#ffa3a3] text-white"
            >
              <MessageCircle size={20} />
              <span>Messages</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
