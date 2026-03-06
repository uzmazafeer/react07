import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { db } from '../firebase';
import { doc, updateDoc, addDoc, collection } from "firebase/firestore";

const TransactionActions = ({ userId, currentBalance }) => {

  const [amount, setAmount] = useState('');

  const handleTransaction = async (type) => {

    const numAmount = parseFloat(amount);

    if (!numAmount || numAmount <= 0) {
      return alert("Enter valid amount");
    }

    if (type === 'withdraw' && numAmount > currentBalance) {
      return Swal.fire('Error', 'Insufficient Balance!', 'error');
    }

    const newBalance =
      type === 'deposit'
        ? currentBalance + numAmount
        : currentBalance - numAmount;

    try {

      // user balance update
      const userRef = doc(db, "users", userId);

      await updateDoc(userRef, {
        balance: newBalance
      });

      // transaction save
      await addDoc(collection(db, "transactions"), {
        userId: userId,
        type: type,
        amount: numAmount,
        date: new Date()
      });

      Swal.fire('Success', `${type} Successful`, 'success');

      setAmount('');

    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'Transaction Failed', 'error');
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

      <button
        onClick={() => handleTransaction('deposit')}
        className="bg-green-500 text-white p-3 rounded-lg font-bold"
      >
        Deposit
      </button>

      <button
        onClick={() => handleTransaction('withdraw')}
        className="bg-red-500 text-white p-3 rounded-lg font-bold"
      >
        Withdraw
      </button>

    </div>
  );
};

export default TransactionActions;
