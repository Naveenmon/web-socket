import React from 'react';
import { Headphones } from 'lucide-react';

const AudioBookDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Left Column - Book Cover */}
          <div>
            <div className="aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/api/placeholder/400/500"
                alt="Book Cover"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Book Details and Subscription */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                The Midnight Library
              </h1>
              <p className="text-gray-600 mb-4">By Matt Haig • Narrated by Carey Mulligan</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Headphones className="h-5 w-5 text-[#f6b092] mr-2" />
                  <span className="text-gray-600">48k listeners</span>
                </div>
              </div>
            </div>

            <div className="prose max-w-none text-gray-600">
              <p>
                Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived...
              </p>
            </div>

            {/* Subscription Options */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Choose Your Plan</h3>
              
              <div className="border rounded-xl p-6 bg-gray-50 hover:border-[#f6b092] transition-colors cursor-pointer">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Monthly Premium</h4>
                    <p className="text-gray-600">Full access to our entire library</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">$14.99</p>
                    <p className="text-sm text-gray-500">per month</p>
                  </div>
                </div>
                <button className="w-full bg-[#f6b092] text-gray-800 py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Start Premium
                </button>
              </div>

              <div className="border rounded-xl p-6 hover:border-[#f6b092] transition-colors cursor-pointer">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Annual Premium</h4>
                    <p className="text-gray-600">Save 20% with yearly billing</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">$143.88</p>
                    <p className="text-sm text-gray-500">$11.99/month</p>
                  </div>
                </div>
                <button className="w-full border-2 border-[#f6b092] text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-[#f6b092] transition-all">
                  Choose Annual
                </button>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-2">All Plans Include:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-[#f6b092] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited access to all audiobooks
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-[#f6b092] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  High-quality audio (320kbps)
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-[#f6b092] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Offline listening
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioBookDashboard;