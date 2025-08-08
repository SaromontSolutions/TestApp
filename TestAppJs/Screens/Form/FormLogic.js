import React from "react";
import FormUI from "./FormUI";
import { Alert } from "react-native";

export default function FormLogic({ navigation }) {
  const handleSave = () => {
    // your save logic here
    navigation.goBack(); // close modal after save
  };

  const handleClose = () => {
    navigation.goBack(); // close modal on X button
  };

  return <FormUI onButtonPress={handleSave} onClose={handleClose} />;
}
