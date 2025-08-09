
import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'; //Android doesn't have modals in RN so cards are used instead
import { NavigationContainer } from '@react-navigation/native';

import IndexLogic from '../Screens/Index/IndexLogic';
import AuthLogic from '../Screens/Auth/AuthLogic';
import HomeLogic from '../Screens/Home/HomeLogic';
import FormLogic from '../Screens/Form/FormLogic';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Index" component={IndexLogic} />

        <Stack.Screen
          name="Auth"
          component={AuthLogic}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
        />

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
