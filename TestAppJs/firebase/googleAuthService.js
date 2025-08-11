
// googleAuthService.js
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './firebaseConfig';
import * as AuthSession from 'expo-auth-session'; //test

// Required for expo-auth-session on React Native to handle redirect properly
WebBrowser.maybeCompleteAuthSession();

const redirectUri = 'https://auth.expo.io/@saromontsolutions/TestAppJs';
/**
 * Hook to handle Google sign-in with Firebase using Expo Auth Session.
 * Returns:
 * - promptAsync: function to trigger Google sign-in flow
 * - user: current Firebase user or null
 * - error: any error encountered during sign-in
 */
export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: "698263135379-jp84uimu0shre49f375drod81n3k7rsg.apps.googleusercontent.com", 
      redirectUri,  // Explicitly pass the proxy redirect URI here
    },
    { useProxy: true }
  );

  const [error, setError] = useState(null);


  useEffect(() => {
    if (!response){
      return;
    }
    console.log('Google Auth response:', response);
    if (response?.type === 'success') {
      const { id_token } = response.params;
      console.log('ID Token:', id_token);
      if (id_token) {
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential).catch((err) => {
          console.error('Firebase sign-in failed:', err);
          setError(err);
        });
      } else {
        setError(new Error('No id_token returned from Google'));
      }
    } else if (response?.type === 'error') {
      setError(new Error('Google sign-in was cancelled or failed.'));
    }
  }, [response]);




  return { request, promptAsync, error };
}
