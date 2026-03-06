// Example: Using Firebase Authentication in your app
import { auth } from './config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

// Sign up
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Sign up error:", error.message);
    throw error;
  }
};

// Sign in
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Sign in error:", error.message);
    throw error;
  }
};

// Sign out
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign out error:", error.message);
    throw error;
  }
};

// Monitor auth state
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
