import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Account, Register, SplashScreens, WelcomeAuth} from '../pages';
import NavigationBottom from '../navigation/navigationBottom';
import ChangePassword from '../screens/changePassword';
import AddProducts from '../screens/addProducts';
import Attendance from '../screens/attendance';
const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Register" component={Register} /> */}
      <Stack.Screen
        name="SplashScreens"
        component={SplashScreens}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NavigationBottom"
        component={NavigationBottom}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="WelcomeAuth"
        component={WelcomeAuth}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AddProducts"
        component={AddProducts}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Attendance"
        component={Attendance}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
