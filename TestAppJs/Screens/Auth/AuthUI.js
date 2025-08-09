import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import FormStyle from '../Form/FormStyle';

export default function AuthUI({ user, onLogin, onSignup, onGoogleSignin, onContinueAsGuest }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  // If user logged in, show welcome + logout
  if (user) {
    return (
      <View style={[FormStyle.container, {backgroundColor: '#fff'}]}>
        <View style={FormStyle.modalCard}>
          <Text style={{ fontSize: 22, marginBottom: 15 }}>
            Welcome, {user.isAnonymous ? 'Guest' : user.email}
          </Text>
          <TouchableOpacity
            style={FormStyle.button}
            onPress={() => onLogout && onLogout()}
          >
            <Text style={FormStyle.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Otherwise show auth card form
  return (
    <View style={FormStyle.container}>
      <View style={FormStyle.modalCard}>
        <Text style={{ fontSize: 22, marginBottom: 15, fontWeight: 'bold' }}>
          {isSignup ? 'Sign Up' : 'Sign In'}
        </Text>

        <TextInput
          style={FormStyle.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
        />
        <TextInput
          style={FormStyle.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          textContentType="password"
          autoComplete="password"
        />

        <TouchableOpacity
          style={FormStyle.button}
          onPress={() => (isSignup ? onSignup(email, password) : onLogin(email, password))}
        >
          <Text style={FormStyle.buttonText}>{isSignup ? 'Sign Up' : 'Sign In'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[FormStyle.button, { backgroundColor: '#DB4437', marginTop: 10 }]}
          onPress={onGoogleSignin}
        >
          <Text style={FormStyle.buttonText}>Sign In with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[FormStyle.button, { backgroundColor: '#6c757d', marginTop: 10 }]}
          onPress={onContinueAsGuest}
        >
          <Text style={FormStyle.buttonText}>Continue as Guest</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsSignup(!isSignup)}
          style={{ marginTop: 15, alignSelf: 'center' }}
        >
          <Text style={{ color: '#007BFF' }}>
            {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
