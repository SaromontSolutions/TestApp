import { StatusBar } from "expo-status-bar"; //Top of screen bar
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import HomeStyle from "./HomeStyle";

export default function HomeUI ({ onButtonPress }) {
  return (
    <View style={HomeStyle.container}>
      <StatusBar style="auto" />
      <Text>Hello world</Text>
      <Button  mode="contained" onPress={ onButtonPress }> Open Form </Button>
    </View>
  );
}