import React from 'react';

const Header = () => {
  // Fallback profile picture if none exists
  const profile = localStorage.getItem('profilePic') || '/path/to/default/profilePic.jpg';

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand name with gradient text */}
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            PayFlow
          </h1>
          
          {/* Profile picture */}
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img src={profile} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
