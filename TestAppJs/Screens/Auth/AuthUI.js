import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from "react-native-paper";
import FormStyle from '../Form/FormStyle';
import { useGoogleAuth } from '../../firebase/googleAuthService';  // adjust path as needed

export default function AuthUI({ user, onLogin, onSignup, onContinueAsGuest, onLogout }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { request = null, promptAsync = () => {}, error: googleError = null } = useGoogleAuth() || {};

  // If user logged in, show welcome + logout
  if (user) {
    return (
      <View style={[FormStyle.container, {backgroundColor: '#fff'}]}>
        <View style={FormStyle.modalCard}>
          <Text style={{ fontSize: 22, marginBottom: 15 }}>
            Welcome, {user.isAnonymous ? 'Guest' : user.email}
          </Text>
          <Button mode="contained" onPress={() => onLogout && onLogout()} style={{ marginTop: 10 }}>Logout</Button>
        </View>
      </View>
    );
  }

  // Otherwise show auth card form
  return (
    <View style={FormStyle.container}>
      <View style={FormStyle.modalCard}>
        <Text style={{ fontSize: 22, marginBottom: 15, fontWeight: 'bold' }}>
          Sign In
        </Text>

        <TextInput
          mode="outlined"
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
          mode="outlined"
          style={FormStyle.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          textContentType="password"
          autoComplete="password"
        />


        <Button mode="contained" onPress={() => onLogin(email, password)} style={{ marginTop: 15 }}>Sign In</Button>

        <Button mode="contained" buttonColor="#DB4437" onPress={() => promptAsync()} disabled={!request} style={{ marginTop: 10 }}>Sign In with Google</Button>

        {googleError && (
          <Text style={{ color: 'red', marginTop: 5 }}>{googleError.message}</Text>
        )}

        <Button mode="contained" buttonColor="#6c757d" onPress={onContinueAsGuest} style={{ marginTop: 10 }}>Continue as Guest</Button>

        <TouchableOpacity onPress={() => onSignup(email, password)} style={{ marginTop: 15, alignSelf: 'center' }}>
          <Text style={{ color: '#007BFF' }}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
