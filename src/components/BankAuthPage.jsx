import React, { useState } from "react";
import { motion } from "framer-motion";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom"; // 1. useNavigate import kiya

// 🔹 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAxacNgRKjkOAe7ucUhQLCVAKMRpjGHqmw",
  authDomain: "bank2026-2eeb8.firebaseapp.com",
  projectId: "bank2026-2eeb8",
  storageBucket: "bank2026-2eeb8.firebasestorage.app",
  messagingSenderId: "518851507753",
  appId: "1:518851507753:web:861fd7dce80b7e6d9e4e38",
  measurementId: "G-QG66K05H80"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function BankAuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // 2. navigate function initialize kiya

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        // Login Successful Alert
        Swal.fire({
          title: 'Success!',
          text: 'Login Successful ✅',
          icon: 'success',
          confirmButtonColor: '#2563eb'
        }).then(() => {
          navigate("/dashboard"); // Dashboard par bhejein
        });
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        // Signup Successful Alert
        Swal.fire({
          title: 'Created!',
          text: 'Account Created Successfully ✅',
          icon: 'success',
          confirmButtonColor: '#2563eb'
        }).then(() => {
          navigate("/dashboard"); // Dashboard par bhejein
        });
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, provider);
      Swal.fire({
        title: 'Google Login',
        text: 'Google Authentication Successful ✅',
        icon: 'success',
        confirmButtonColor: '#2563eb'
      }).then(() => {
        navigate("/dashboard"); // Dashboard par bhejein
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-900 via-indigo-800 to-purple-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          {isLogin ? "Bank Login" : "Bank Sign Up"}
        </h2>

        {error && (
          <div className="bg-red-500/20 text-red-200 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="my-4 text-center text-white">OR</div>

        <button
          onClick={handleGoogleAuth}
          className="w-full bg-white text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Continue with Google
        </button>

        <p className="text-center text-white mt-6 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-blue-300 cursor-pointer hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </motion.div>
    </div>
  );
}