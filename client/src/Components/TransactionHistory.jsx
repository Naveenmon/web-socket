import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const TransactionHistory = () => {
  
  const [transactions, setTransactions] = useState([]);

  const email = localStorage.getItem("email");
  useEffect(()=> {
    axios.post('http://localhost:3001/api/transaction',{email}).then((res)=> {
      console.log(res.data);
      setTransactions(res.data);
    })
  }, [])
  return (
    <div className="flex justify-center w-full">
      <div className="bg-white shadow-lg p-6 w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Transaction History</h2>

        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm"
            >
              {/* Left: Profile Picture & Description */}
              <div className="flex items-center gap-4">
                <img
                  src={transaction.recipientImg}
                  alt="Recipient"
                  className="w-12 h-12 rounded-full border border-gray-300"
                />
                <div>
                  <h4 className="text-lg font-semibold">{transaction.description}</h4>
                  <p className="text-sm text-gray-500">{transaction.time}</p>
                </div>
              </div>

              {/* Right: Amount & Status */}
              <div className="text-right">
                <p className="text-lg font-semibold">{transaction.amount}</p>
                <p
                  className={`text-sm flex items-center ${
                    transaction.status === "Completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  <FaCheckCircle className="mr-1" />
                  {transaction.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
