// GoogleSignInButton.js
import React from 'react';
import { Button, Text, View } from 'react-native';
import { useGoogleAuth } from '../../firebase/googleAuthService';  // adjust path as needed

export default function GoogleSignInButton() {
  const { promptAsync, error } = useGoogleAuth();

  return (
    <View>
      <Button
        title="Sign in with Google"
        disabled={!promptAsync}
        onPress={() => promptAsync()}
      />
      {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
    </View>
  );
}
