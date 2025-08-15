

//googleAuthService.js 
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

console.log('Constants.executionEnvironment:', Constants.executionEnvironment);
console.log('Constants.appOwnership:', Constants.appOwnership);
console.log('__DEV__:', __DEV__);

// Function to get the right Android client ID
function getAndroidClientId() {
  if (!ANDROID_CLIENT_IDS) return null;

  if (__DEV__ && ANDROID_CLIENT_IDS.development) 
    return ANDROID_CLIENT_IDS.development;
  if (Constants.expoConfig?.extra?.releaseChannel === 'preview' && ANDROID_CLIENT_IDS.preview) 
    return ANDROID_CLIENT_IDS.preview;

  return ANDROID_CLIENT_IDS.production ?? null;
}

// Function to get the right client ID
const clientId = Platform.select({
  ios: '698263135379-gc985opd966dabf8idn5abt44sm07o3t.apps.googleusercontent.com',
  android: getAndroidClientId(),
  default: '698263135379-jp84uimu0shre49f375drod81n3k7rsg.apps.googleusercontent.com'
});

// is ExpoGo
const useProxy = __DEV__;
const scheme = !useProxy ? 'com.myapp' : undefined; // only set scheme for standalone

//const redirectUri = 'https://auth.expo.io/@saromontsolutions/TestAppJs'; 
// const redirectUri = AuthSession.makeRedirectUri({
//   scheme,
//   useProxy,
// });

const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
console.log('Redirect URI:', redirectUri);

/** * Hook to handle Google sign-in with Firebase using Expo Auth Session. * Returns: * - promptAsync: function to trigger Google sign-in flow * - user: current Firebase user or null * - error: any error encountered during sign-in */ 
export function useGoogleAuth() { 

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      //clientId: "698263135379-jp84uimu0shre49f375drod81n3k7rsg.apps.googleusercontent.com",
      clientId,
      redirectUri, 
    }, { useProxy} );
    
    const [error, setError] = useState(null); 
    useEffect(() => { if (!response){ return; } 
    console.log('Google Auth response:', response); 
    if (response?.type === 'success') {
       const { id_token } = response.params;
      console.log('ID Token:', id_token); 
      if (id_token) { 
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential).catch((err) => { 
          console.error('Firebase sign-in failed:', err); setError(err); 
        }); 
      } else {
         setError(new Error('No id_token returned from Google')); 
        } 
      } else if (response?.type === 'error') { 
        setError(new Error('Google sign-in was cancelled or failed.')); 
      } 
    }, 
    
    [response]); return { request, promptAsync, error };
   }