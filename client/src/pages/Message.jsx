import React, { useState } from "react";

// Header component
const Header = () => {
  const profile = localStorage.getItem('profilePic') || '/path/to/default/profilePic.jpg'; // Fallback profile picture
  
  return (
    <header className="bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-16 py-4">
          {/* Brand Name */}
          <h1 className="text-2xl font-bold bg-[#ffa3a3] bg-clip-text text-transparent">
            Audio
          </h1>
          
          {/* Profile Picture */}
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img src={profile} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};

// Main Dashboard Component
const Dashboard = ({ name = "John Doe" }) => {
  const [activeTab, setActiveTab] = useState("transaction");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8 flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Welcome, {name}!</h1>

        {/* Tab Switchers */}
        <div className="flex justify-center gap-8 mb-8">
          <div
            className={`text-lg font-semibold cursor-pointer transition-all ${
              activeTab === "transaction" ? "border-b-4 border-[#ffa3a3]" : ""
            }`}
            onClick={() => setActiveTab("transaction")}
          >
            Transaction History
          </div>
          <div
            className={`text-lg font-semibold cursor-pointer transition-all ${
              activeTab === "messages" ? "border-b-4 border-[#ffa3a3]" : ""
            }`}
            onClick={() => setActiveTab("messages")}
          >
            Messages
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="w-full max-w-7xl mx-auto flex flex-col">
          {activeTab === "transaction" ? (
            <TransactionHistory />
          ) : (
            <Messages />
          )}
        </div>
      </div>
    </div>
  );
};

// Sample Component for Transaction History
const TransactionHistory = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 flex-1">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Recent Transactions</h2>
      <ul className="space-y-4">
        <li className="flex justify-between items-center py-3 border-b border-gray-200">
          <span>Transaction #1</span>
          <span className="text-green-500 font-semibold">$100</span>
        </li>
        <li className="flex justify-between items-center py-3 border-b border-gray-200">
          <span>Transaction #2</span>
          <span className="text-green-500 font-semibold">$50</span>
        </li>
        <li className="flex justify-between items-center py-3 border-b border-gray-200">
          <span>Transaction #3</span>
          <span className="text-green-500 font-semibold">$200</span>
        </li>
      </ul>
    </div>
  );
};

// Sample Component for Messages
const Messages = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 flex-1">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Messages</h2>
      <ul className="space-y-4">
        <li className="border-b pb-3">
          <p className="font-semibold">Welcome to the platform!</p>
          <p className="text-gray-600">We are glad to have you with us.</p>
        </li>
        <li className="border-b pb-3">
          <p className="font-semibold">Your payment was successful</p>
          <p className="text-gray-600">Thank you for your recent transaction.</p>
        </li>
        <li className="border-b pb-3">
          <p className="font-semibold">Your subscription is about to expire</p>
          <p className="text-gray-600">Renew your subscription to continue enjoying our services.</p>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
