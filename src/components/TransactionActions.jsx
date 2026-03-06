import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { db, auth } from "../config/firebase.js"; 
import { doc, updateDoc, increment, addDoc, collection } from "firebase/firestore";
const TransactionActions = ({ userId, currentBalance }) => {
  const [amount, setAmount] = useState('');

  const handleTransaction = async (type) => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) return alert("Enter valid amount");

    if (type === 'withdraw' && numAmount > currentBalance) {
      return Swal.fire('Error', 'Insufficient Balance!', 'error');
    }

    try {
      // Update user balance in Firestore
      const userDocRef = doc(db, 'users', userId);
      const balanceChange = type === 'deposit' ? numAmount : -numAmount;
      await updateDoc(userDocRef, {
        balance: increment(balanceChange)
      });

      // Save transaction record
      await addDoc(collection(db, 'transactions'), {
        userId,
        type,
        amount: numAmount,
        timestamp: new Date()
      });

      Swal.fire('Success', `${type.charAt(0).toUpperCase() + type.slice(1)} Successful`, 'success');
      setAmount('');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <input 
        type="number" 
        placeholder="Enter Amount" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)}
        className="col-span-2 p-2 rounded border"
      />
      <button onClick={() => handleTransaction('deposit')} className="bg-green-500 text-white p-3 rounded-lg font-bold">Deposit</button>
      <button onClick={() => handleTransaction('withdraw')} className="bg-red-500 text-white p-3 rounded-lg font-bold">Withdraw</button>
    </div>
  );
};