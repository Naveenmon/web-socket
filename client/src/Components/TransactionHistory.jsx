import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaHistory } from "react-icons/fa";
import { UserCircle } from "lucide-react";

// Function to convert paisa to rupees
const convertToRupees = (paisa) => (paisa / 100).toFixed(2);

// Function to format MongoDB date string into a readable format
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    axios.post('http://localhost:3001/api/transaction', { email })
      .then((res) => {
        console.log(res.data);
        setTransactions(res.data);
      })
      .catch((error) => {
        console.error('Failed to fetch transactions:', error);
      });
  }, [email]);

  return (
    <div className="h-screen w-full p-6">
      <div className="max-w-4xl mx-auto h-full bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Transaction History</h2>
            <p className="text-sm text-gray-500 mt-1">Your payment and subscription records</p>
          </div>

          {/* Transactions Container */}
          <div className="flex-1 p-6 overflow-y-auto">
            {transactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <FaHistory className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-lg font-medium">No transactions yet</p>
                <p className="text-sm">Your payment history will appear here</p>
              </div>
            ) : (
              <div className="space-y-6">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="p-6">
                      {/* Transaction Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          {transaction.profilePic ? (
                            <img
                              src={transaction.profilePic}
                              alt={transaction.description}
                              className="w-12 h-12 rounded-full border-2 border-[#ffa3a3]"
                            />
                          ) : (
                            <UserCircle className="w-12 h-12 text-gray-400" />
                          )}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {transaction.name}
                            </h3>
                            <p className="text-sm text-gray-500">{formatDate(transaction.createdAt)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-800">
                            {convertToRupees(transaction.amount)} INR
                          </p>
                          <div
                            className={`flex items-center justify-end gap-1 mt-1 ${
                              transaction.status === "successful"
                                ? "text-green-600"
                                : "text-blue-600"
                            }`}
                          >
                            <FaCheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {transaction.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Transaction Details */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Transaction ID</p>
                            <p className="font-medium text-gray-800">
                              {transaction.orderId}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-500">Payment Method</p>
                            <p className="font-medium text-gray-800">
                              Razorpay
                            </p>
                          </div>
                        </div>
                      </div>
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

export default TransactionHistory;
