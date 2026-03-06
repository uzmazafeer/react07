import React from 'react';
import { useSelector } from 'react-redux';

const BalanceCard = () => {
  // Maan lete hain aapka balance redux ke 'auth' ya 'user' slice mein hai
  const { balance } = useSelector((state) => state.auth.user);

  return (
    <div className="bg-linear-to-r from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-lg mb-6">
      <p className="text-sm opacity-80">Total Balance</p>
      <h2 className="text-4xl font-bold mt-1">${balance.toLocaleString()}</h2>
    </div>
  );
};

export default BalanceCard;