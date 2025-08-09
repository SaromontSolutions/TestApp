import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInAnonymously, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcqP-o1ZWS_IY2m3-gpfrA-lnlE65Myfk",
  authDomain: "testapp-fff04.firebaseapp.com",
  projectId: "testapp-fff04",
  storageBucket: "testapp-fff04.firebasestorage.app",
  messagingSenderId: "698263135379",
  appId: "1:698263135379:web:d748aa3846c8c2a0ae5966",
  measurementId: "G-54NE0WBDRZ"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export the auth instance so other files can use it
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();