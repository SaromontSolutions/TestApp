console.log('googleAuthService loaded');
export const dummy = 'hello';

// googleAuthService.js
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './firebaseConfig';

// Required for expo-auth-session on React Native to handle redirect properly
WebBrowser.maybeCompleteAuthSession();

/**
 * Hook to handle Google sign-in with Firebase using Expo Auth Session.
 * Returns:
 * - promptAsync: function to trigger Google sign-in flow
 * - user: current Firebase user or null
 * - error: any error encountered during sign-in
 */
export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    // Replace this with your actual Firebase Web client ID
    clientId: "698263135379-jp84uimu0shre49f375drod81n3k7rsg.apps.googleusercontent.com",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch((err) => setError(err));
    } else if (response?.type === 'error') {
      setError(new Error('Google sign-in was cancelled or failed.'));
    }
  }, [response]);

  return { promptAsync, error };
}
