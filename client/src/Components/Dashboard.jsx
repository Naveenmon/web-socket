import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import lottieAnimation from '../assets/landing.json'; // Your Lottie animation file

const Dashboard = () => {
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
};

export default Dashboard;
