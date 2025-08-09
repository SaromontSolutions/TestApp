// Handles all Firebase Auth state and logic
import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../../firebase/firebaseConfig';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInAnonymously
} from 'firebase/auth';

import AuthUI from './AuthUI';

export default function AuthLogic() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (initializing) setInitializing(false);
      if (currentUser) setModalVisible(false); // close modal if signed in
      else setModalVisible(true);
    });
    return unsubscribe;
  }, []);

  // Email/password login
  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      alert(`Login failed: ${e.message}`);
    }
  };

  // Email/password signup
  const handleSignup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      alert(`Signup failed: ${e.message}`);
    }
  };

  // Sign in with Google popup
  const handleGoogleSignin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      alert(`Google sign-in failed: ${e.message}`);
    }
  };

  // Continue as guest (anonymous)
  const handleContinueAsGuest = async () => {
    try {
      await signInAnonymously(auth);
    } catch (e) {
      alert(`Guest sign-in failed: ${e.message}`);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setModalVisible(true);
    } catch (e) {
      alert(`Logout failed: ${e.message}`);
    }
  };

  if (initializing) return null;

  if (!user) {
    return (
      <AuthUI
        visible={modalVisible}
        onLogin={handleLogin}
        onSignup={handleSignup}
        onGoogleSignin={handleGoogleSignin}
        onContinueAsGuest={handleContinueAsGuest}
      />
    );
  }

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>Welcome, {user.isAnonymous ? "Guest" : user.email}</Text>
      <TouchableOpacity onPress={handleLogout} style={{marginTop: 20, padding: 10, backgroundColor: '#007BFF', borderRadius: 8}}>
        <Text style={{color:'white'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
