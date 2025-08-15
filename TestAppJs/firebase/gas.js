
// googleAuthService.js
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { Platform } from 'react-native';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { ANDROID_CLIENT_IDS } from '../config'; //Platform specific stuff

// Required for expo-auth-session on React Native to handle redirect properly
WebBrowser.maybeCompleteAuthSession();

// Function to get the right Android client ID
function getAndroidClientId() {
  if (__DEV__) return ANDROID_CLIENT_IDS.development; // development build
  if (Constants.expoConfig?.extra?.releaseChannel === 'preview') return ANDROID_CLIENT_IDS.preview; // preview build
  return ANDROID_CLIENT_IDS.production; // production / Play Store
}

const clientId = Platform.select({
  ios: '698263135379-gc985opd966dabf8idn5abt44sm07o3t.apps.googleusercontent.com',
  android: getAndroidClientId(),
  default: '698263135379-jp84uimu0shre49f375drod81n3k7rsg.apps.googleusercontent.com'
});

// Detect if running in Expo Go
const isExpoGo = !!Constants.expoConfig?.runtimeVersion; 


export function useGoogleAuth() {
  const [error, setError] = useState<Error | null>(null);

  const redirectUri = AuthSession.makeRedirectUri({
    scheme: 'com.myapp',
    useProxy: isExpoGo
  });

  console.log("Redirect URI in use:", redirectUri);
  console.log("Client ID:", clientId);
  console.log("Redirect URI:", redirectUri);

  // If clientId or redirectUri is missing, return safe defaults
  if (!clientId || !redirectUri) {
    return {
      request: null,
      promptAsync: () => Promise.reject(new Error('Auth not ready')),
      error: new Error('Client ID or Redirect URI not ready'),
    };
  }


  let authRequest;
  try {
    authRequest = Google.useIdTokenAuthRequest(
      { clientId, redirectUri },
      { useProxy: isExpoGo }
    );
  } catch {
    authRequest = {};
  }

  const request = authRequest?.request ?? null;
  const response = authRequest?.response ?? null;
  const promptAsync = authRequest?.promptAsync ?? (() => Promise.reject('Auth request not ready'));

  useEffect(() => {
   if (!response) return;

    console.log('Google Auth response:', response);

    if (response.type === 'success') {
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

