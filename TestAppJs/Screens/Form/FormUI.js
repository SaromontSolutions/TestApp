import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { Button, TextInput, IconButton } from "react-native-paper";
import FormStyle from "./FormStyle";

const FormUI = ({ email, setEmail, password, setPassword, onSave, onClose }) => {
  return (
    <View style={FormStyle.container}>
        <StatusBar style="auto" />
        <View style={FormStyle.modalCard}>
          <IconButton icon="close" size={24} onPress={ onClose } style={FormStyle.closeButton} />
          <Text> Demo Form </Text>
          <View>
              <TextInput mode="outlined" style={FormStyle.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address"/>
              <TextInput mode="outlined" style={FormStyle.input} placeholder="Password" secureTextEntry={true} value={password} onChangeText={setPassword}/>
              <Button mode="contained" onPress={ onSave }> Save </Button>
          </View>
        </View>
    </View>
  );
};

export default FormUI;