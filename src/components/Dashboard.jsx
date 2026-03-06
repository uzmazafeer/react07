import React, { useState, useEffect } from "react";
// Import check: Agar config folder src ke andar hai
import { db, auth } from "../config/firebase.js"; 
import { doc, onSnapshot, updateDoc, increment } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"; 
import Swal from 'sweetalert2';

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Auth state check karein (Login hai ya nahi)
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // 2. Firestore se real-time data lein
        const userRef = doc(db, "users", currentUser.uid);
        const unsubscribeDb = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setBalance(docSnap.data().balance || 0);
          } else {
            console.log("Firestore mein is user ka data nahi mila!");
          }
          setLoading(false);
        }, (err) => {
          console.error("Firestore Error:", err);
          setLoading(false);
        });

        return () => unsubscribeDb();
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleTransaction = async (type) => {
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      return Swal.fire("Error", "Please enter a valid amount", "error");
    }

    try {
      const userRef = doc(db, "users", user.uid);
      
      if (type === "withdraw" && numAmount > balance) {
        return Swal.fire("Error", "Insufficient balance!", "error");
      }

      await updateDoc(userRef, {
        balance: increment(type === "deposit" ? numAmount : -numAmount)
      });

      setAmount("");
      Swal.fire("Success", `${type === "deposit" ? "Deposited" : "Withdrawn"} Successfully!`, "success");
    } catch (error) {
      console.error("Transaction Error:", error);
      Swal.fire("Error", "Transaction failed!", "error");
    }
  };

  // Screen white hone se bachane ke liye ye checks:
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <h2 className="text-2xl animate-pulse">Checking Wallet...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-4">
        <h2 className="text-xl mb-4">Aap login nahi hain!</h2>
        <button 
          onClick={() => window.location.href = "/"}
          className="bg-blue-600 px-6 py-2 rounded-lg"
        >
          Go to Login Page
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8 flex flex-col items-center">
       {/* UI Content */}
      <div className="bg-linear-to-br from-blue-600 to-indigo-800 p-8 rounded-3xl text-white shadow-2xl w-full max-w-md mb-8">
        <p className="opacity-70">User Wallet</p>
        <p className="font-mono text-sm mb-4">{user.email}</p>
        <h3 className="text-lg">Current Balance</h3>
        <h1 className="text-5xl font-bold mt-2">${balance.toLocaleString()}</h1>
      </div>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 space-y-4">
        <input 
          type="number" 
          placeholder="Enter Amount" 
          className="w-full p-4 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-blue-500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="flex gap-4">
          <button onClick={() => handleTransaction('deposit')} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95">Deposit</button>
          <button onClick={() => handleTransaction('withdraw')} className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95">Withdraw</button>
        </div>
      </div>
    </div>
  );
}