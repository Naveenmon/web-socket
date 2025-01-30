import React from 'react'
import { Bell, CreditCard, History, X, ChevronRight, Activity } from 'lucide-react';

const PaymentCard = ( onPayment ) => {
    const handlePayment = () => {
        
    }
  return (
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
          onClick={handlePayment}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="flex items-center justify-center gap-2">
            Pay Now
            <ChevronRight size={16} />
          </span>
        </button>
      </div>
    </div>
  )
}

export default PaymentCard;
