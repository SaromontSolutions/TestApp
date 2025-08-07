import { Alert } from "react-native";
import HomeUI from "./HomeUI";

  export default function HomeLogic() {
    const handlePress = () => {
      Alert.alert("Btn pressed");
    };

    return (
        <>
        <HomeUI onButtonPress={ handlePress } />
        </>
    );
  }