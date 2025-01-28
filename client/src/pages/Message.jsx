import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

const Message = () => {
    const [message, setMessage] = useState('');
    const [receivedMessage, setReceivedMessage] = useState('');

    const handleButton = () => {
        if (message.trim()) {
            socket.emit("send_message", message); 
            setMessage(''); 
        }
    };

    useEffect(() => {
        socket.on("received_message", (data) => {
            console.log("Data:", data);
            setReceivedMessage(data);
        });
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen p-8">
            <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full">
                
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    type="text"
                    className="w-full p-4 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <button 
                    onClick={handleButton}
                    className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Send
                </button>
            </div>

            {receivedMessage && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-xl w-full max-w-md">
                    <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Received Message</h2>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-inner text-lg text-gray-800">
                        <p>{receivedMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Message;
