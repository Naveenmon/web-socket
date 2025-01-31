import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { UserCircle } from 'lucide-react';

const socket = io('http://localhost:3001');

const Messages = () => {
  const email = localStorage.getItem('email');
  const name = localStorage.getItem('name');
  const profilePic = localStorage.getItem('profilePic');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);

  const isOwnMessage = (messageEmail) => messageEmail === email;

  return (
    <div className="h-screen w-full p-6">
      <div className="max-w-4xl mx-auto h-full bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
            <p className="text-sm text-gray-500 mt-1">Your payment updates and system messages</p>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-6 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <UserCircle className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-lg font-medium">No messages yet</p>
                <p className="text-sm">Payment notifications will appear here</p>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex gap-4 ${
                      isOwnMessage(msg.senderEmail) ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <img src={profilePic} />
                    </div>

                    {/* Message Content */}
                    <div
                      className={`flex-1 max-w-2xl ${
                        isOwnMessage(msg.senderEmail)
                          ? 'bg-[#ffa3a3] bg-opacity-20'
                          : 'bg-gray-100'
                      } rounded-2xl p-4 shadow-sm`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-gray-800">
                          {isOwnMessage(msg.senderEmail) ? 'You' : msg.senderName}
                        </h4>
                        <span className="text-xs text-gray-500">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{msg.body}</p>
                      {msg.senderEmail && (
                        <p className="text-xs text-gray-500 mt-2">{msg.senderEmail}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;