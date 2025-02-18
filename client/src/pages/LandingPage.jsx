import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { ArrowRight, Headphones, BookOpen, Sparkles } from 'lucide-react';
import lottie from '../assets/landing.json'
import logo from '../assets/logo.png'
import SubscriptionPlans from '../Components/SubscriptionPlans';

const AudiobookLanding = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <img src={logo} width={40} height={40} alt="" />
              <span className="text-2xl p-2 font-bold">AudioBook</span>
            </div>
            <div>
              <button className="bg-[#ffa3a3] text-gray-800 px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Start Listening
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Your Stories Come Alive With Every Listen
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Immerse yourself in thousands of audiobooks narrated by world-class performers. Listen anywhere, anytime.
              </p>
              <div className="flex space-x-4">
                <button className="bg-[#ffa3a3] text-gray-800 px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center">
                  Explore Library
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <Player
                autoplay
                loop
                src={lottie}
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose AudioVerse?
            </h2>
            <p className="text-xl text-gray-600">
              Discover a new way to experience your favorite books
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <Headphones className="h-12 w-12 text-[#ffa3a3] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Audio Quality</h3>
              <p className="text-gray-600">
                Crystal clear sound with professional recording quality for the best listening experience
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <BookOpen className="h-12 w-12 text-[#ffa3a3] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Vast Library</h3>
              <p className="text-gray-600">
                Access thousands of titles across all genres, from bestsellers to exclusive originals
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <Sparkles className="h-12 w-12 text-[#ffa3a3] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Features</h3>
              <p className="text-gray-600">
                Personalized recommendations, bookmarking, and cross-device synchronization
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <SubscriptionPlans />
    </div>
  );
};

export default AudiobookLanding;