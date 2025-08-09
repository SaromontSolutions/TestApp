import React from 'react';
import HomeUI from "./HomeUI";

  //gets navigation from React navigation because its a screen
  export default function HomeLogic({ navigation }) {
    const handlePress = () => {
      navigation.navigate('Form');
    };

    return (
      <>
        <HomeUI onButtonPress={ handlePress } />
      </>
    );
  }