import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { 
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  signInAnonymously,
  onAuthStateChanged
} from 'firebase/auth'; //Package

import { auth } from '../../firebase/firebaseConfig';  // adjust path as needed

import { useGoogleAuth } from '../../firebase/googleAuthService';  // your hook

import AuthUI from './AuthUI';

export default function AuthLogic() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  // Use the hook here
  const { promptAsync, error: googleError } = useGoogleAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (initializing) setInitializing(false);
      if (currentUser) {
        navigation.replace('Home');
      }
    });
    return unsubscribe;
  }, [initializing, navigation]);

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      alert(`Login failed: ${e.message}`);
    }
  };

  const handleSignup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      alert(`Signup failed: ${e.message}`);
    }
  };

  // Now your Google sign-in just triggers the hook's promptAsync
  const handleGoogleSignin = () => {
    if (promptAsync) {
      promptAsync();
    } else {
      alert("Google sign-in not ready");
    }
  };

  const handleContinueAsGuest = async () => {
    try {
      await signInAnonymously(auth);
    } catch (e) {
      alert(`Guest sign-in failed: ${e.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (e) {
      alert(`Logout failed: ${e.message}`);
    }
  };

  if (initializing) return null;

  return (
    <AuthUI
      user={user}
      onLogin={handleLogin}
      onSignup={handleSignup}
      onGoogleSignin={handleGoogleSignin}
      onContinueAsGuest={handleContinueAsGuest}
      onLogout={handleLogout}
      googleError={googleError}  // optionally pass error to UI
    />
  );
}

