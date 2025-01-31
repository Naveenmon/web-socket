import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Messages</h2>
      {messages.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No messages available</div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="p-4 bg-[#ffa3a3] bg-opacity-10 rounded-lg shadow-md">
              <h4 className="text-sm font-semibold">{msg.senderName}</h4>
              <p className="text-sm">{msg.body}</p>
              <p className="text-xs text-gray-500">{msg.timestamp}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;