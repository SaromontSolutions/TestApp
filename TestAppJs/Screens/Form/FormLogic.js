import React, { useState } from "react";
import FormUI from "./FormUI";
import { Alert } from "react-native";
import { supabase } from '../../Utils/supabase'

export default function FormLogic({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSave = async () => {
     Alert.alert("Debug", "Save pressed");
     
    if (!email || !password) {
      Alert.alert("Validation error", "Please enter both email and password");
      return;
    }

    // IMPORTANT: hash password in real 
    const { data, error } = await supabase.from("users").insert([
      {
        email: email,
        password_hash: password, // Replace with hashed password
      },
    ]);

    if (error) {
      Alert.alert("Error saving user", error.message);
    } else {
      Alert.alert("Success", "User saved successfully");
      navigation.goBack(); // close modal after save
    }
  };


  const handleClose = () => {
    navigation.goBack(); // close modal on X button
  };


  return (
    <FormUI
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSave={handleSave}
      onClose={handleClose}
    />
  );

}
