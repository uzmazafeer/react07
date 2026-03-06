import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
// Add your Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAxacNgRKjkOAe7ucUhQLCVAKMRpjGHqmw",
  authDomain: "bank2026-2eeb8.firebaseapp.com",
  projectId: "bank2026-2eeb8",
  storageBucket: "bank2026-2eeb8.firebasestorage.app",
  messagingSenderId: "518851507753",
  appId: "1:518851507753:web:861fd7dce80b7e6d9e4e38",
  measurementId: "G-QG66K05H80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
