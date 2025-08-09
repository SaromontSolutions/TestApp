import React from 'react';
import IndexUI from "./IndexUI";

  //gets navigation from React navigation because its a screen
  export default function IndexLogic({ navigation }) {
    const handlePress = () => {
      navigation.navigate('Auth');
    };

    return (
      <>
        <IndexUI onButtonPress={ handlePress } />
      </>
    );
  }