import { StatusBar } from "expo-status-bar"; //Top of screen bar
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import IndexStyle from "./IndexUI";

export default function IndexUI ({ onButtonPress }) {
  return (
    <View style={IndexStyle.container}>
      <StatusBar style="auto" />
      <Text>Welcome to TestApp</Text>
      <Button  mode="contained" onPress={ onButtonPress }> Login </Button>
    </View>
  );
}