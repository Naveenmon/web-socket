import React from 'react'

const TransactionHistory = () => {
    const transactions = [
        { id: 1, description: "Payment to Audiobook", amount: "$100" },
        { id: 2, description: "Payment to Audiobook", amount: "$50" },
        { id: 3, description: "Payment to Audiobook", amount: "$200" },
      ];
    
      return (
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold">Your Recent Transactions</h2>
          <table className="w-full mt-4">
            <thead>
              <tr>
                <th className="text-left">ID</th>
                <th className="text-left">Description</th>
                <th className="text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default TransactionHistory
