import React from 'react';

const Messages = () => {
  return (
    <div className="flex-1 p-8 bg-white">
      <h2 className="text-xl font-semibold mb-6">Messages</h2>
      <div className="space-y-4">
        <div className="border-b pb-4">
          <p className="font-semibold">Welcome to the platform!</p>
          <p className="text-gray-600">We are glad to have you with us.</p>
        </div>
        <div className="border-b pb-4">
          <p className="font-semibold">Your payment was successful.</p>
          <p className="text-gray-600">Thank you for your recent transaction.</p>
        </div>
        <div className="border-b pb-4">
          <p className="font-semibold">Your subscription is about to expire.</p>
          <p className="text-gray-600">Renew your subscription to continue enjoying our services.</p>
        </div>
      </div>
    </div>
  );
};

export default Messages;
