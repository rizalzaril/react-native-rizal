import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SectionListBasic from '../screens/settings';
import Register from '../screens/Register';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={Register} />{' '}
        {/* Pastikan Anda menggunakan 'Register' sebagai nama layar */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
