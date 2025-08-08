
import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'; //Android doesn't have modals in RN so cards are used instead
import { NavigationContainer } from '@react-navigation/native';

import HomeLogic from '../Screens/Home/HomeLogic';
import FormLogic from '../Screens/Form/FormLogic';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeLogic} />
        <Stack.Screen
          name="Form"
          component={FormLogic}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
