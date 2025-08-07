import { StatusBar } from "expo-status-bar";
import { Text, View, Button } from "react-native";
import HomeStyles from "./HomeStyles";

export default function HomeUI ({ onButtonPress }) {
  return (
    <View style={HomeStyles.container}>
      <Text>Hello world!</Text>
      <Button title="press me" onPress={ onButtonPress } />
      <StatusBar style="auto" />
    </View>
  );
}