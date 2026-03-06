import React from 'react';

const TransactionList = ({ transactions }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="font-bold mb-4">Recent Transactions</h3>
      <div className="space-y-3">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-medium capitalize">{tx.type}</p>
              <p className="text-xs text-gray-500">{new Date(tx.created_at).toLocaleDateString()}</p>
            </div>
            <p className={`font-bold ${tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
              {tx.type === 'deposit' ? '+' : '-'}${tx.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};