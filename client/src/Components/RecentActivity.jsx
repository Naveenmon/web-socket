import React from 'react'
import { Bell, CreditCard, History, X, ChevronRight, Activity } from 'lucide-react';

const RecentActivity = ({ notifications }) => {
    return (
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
}
  

export default RecentActivity;
