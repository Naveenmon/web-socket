import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Replace with your backend URL

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({ name: '', email: '', profilePic: '' });

  useEffect(() => {
    const storedUser = {
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      profilePic: localStorage.getItem('profilePic'),
    };
    setUser(storedUser);

    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);

  return (
    <div className="flex-1 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Messages</h2>
      {messages.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No messages available</div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-[#ffa3a3] bg-opacity-10 rounded-lg shadow-md">
              <img
                src={msg.senderProfilePic || 'https://via.placeholder.com/50'}
                alt="Sender"
                className="w-10 h-10 rounded-full border border-[#ffa3a3]"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-semibold text-gray-800">{msg.senderName}</h4>
                  <p className="text-xs text-gray-500">{msg.senderEmail}</p>
                </div>
                <p className="mt-2 text-gray-700 font-medium">{msg.title}</p>
                <p className="text-sm text-gray-600">{msg.body}</p>
                <p className="text-xs text-gray-400 mt-2">{msg.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
