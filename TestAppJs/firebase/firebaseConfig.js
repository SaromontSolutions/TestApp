import { initializeApp } from 'firebase/app';
import { 
  initializeAuth, 
  getReactNativePersistence, 
  GoogleAuthProvider 
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// Initialize auth with React Native persistence (AsyncStorage)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Export Google provider for use in auth logic
export const googleProvider = new GoogleAuthProvider();
