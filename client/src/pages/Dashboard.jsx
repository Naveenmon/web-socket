import React, { useState, useEffect } from 'react';
import { Bell, CreditCard, History, X, ChevronRight, Activity } from 'lucide-react';
import io from 'socket.io-client';
import Header from '../Components/Header';
import PaymentCard from '../Components/PaymentCard';
import RecentActivity from '../Components/RecentActivity';
import NotificationPopup from '../Components/NotificationPopup';


// const NotificationPopup = ({ notifications, isOpen, onClose }) => {
//   if (!isOpen) return null; 
  

//   return (
//     <div className="absolute top-16 right-4 w-96 bg-white rounded-2xl shadow-xl z-50 max-h-[600px] border border-gray-100">
//       <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
//           <p className="text-sm text-gray-500">Recent updates</p>
//         </div>
//         <button 
//           onClick={onClose}
//           className="p-2 hover:bg-white rounded-full transition-colors"
//         >
//           <X size={16} />
//         </button>
//       </div>
//       <div className="overflow-y-auto max-h-[400px] divide-y divide-gray-100">
//         {notifications.length === 0 ? (
//           <div className="p-6 text-center">
//             <Bell size={24} className="text-gray-300 mx-auto mb-2" />
//             <p className="text-gray-500">No new notifications</p>
//           </div>
//         ) : (
//           notifications.map((notification) => (
//             <div
//               key={notification.id}
//               className="p-4 hover:bg-gray-50 transition-colors"
//             >
//               <div className="flex items-start gap-3">
//                 <div className={`p-2 rounded-full ${
//                   notification.status === 'success' ? 'bg-green-100' : 'bg-blue-100'
//                 }`}>
//                   <Activity size={14} className={
//                     notification.status === 'success' ? 'text-green-600' : 'text-blue-600'
//                   } />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium text-gray-800 truncate">{notification.message}</p>
//                   <p className="text-xs text-gray-500 mt-1">#{notification.transactionId}</p>
//                   <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };



// Main Component
const PaymentWebsite = () => {
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('transactionUpdate', (data) => {
      addNotification(data);
    });

    return () => newSocket.disconnect();
  }, []);

  const addNotification = (data) => {
    const newNotification = {
      id: Date.now(),
      message: data.message,
      status: data.status,
      transactionId: data.transactionId,
      timestamp: new Date().toLocaleTimeString()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handlePayment = () => {
    const transactionId = `TXN${Date.now()}`;
    socket?.emit('initiatePayment', {
      transactionId,
      amount: 299.00,
      timestamp: new Date().toISOString()
    });
    
    setTimeout(() => {
      addNotification({
        message: 'Payment initiated successfully',
        status: 'pending',
        transactionId
      });
    }, 500);

    setTimeout(() => {
      addNotification({
        message: 'Payment processed successfully',
        status: 'success',
        transactionId
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onNotificationClick={() => setIsNotificationOpen(!isNotificationOpen)}
        notificationCount={notifications.length}
      />
      
      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <PaymentCard onPayment={handlePayment} />
          <RecentActivity notifications={notifications} />
        </div>
      </main>

      <NotificationPopup
        notifications={notifications}
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </div>
  );
};

export default PaymentWebsite;