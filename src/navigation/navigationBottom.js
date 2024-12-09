import React from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Account from '../screens/account';
import Explorer from '../screens/explorer';
import HomeScreen from '../screens/home';
import AddProducts from '../screens/addProducts';
import SectionListBasic from '../screens/settings';
import {createStackNavigator} from '@react-navigation/stack';
import Register from '../screens/Register';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faStore, faMessage, faUser} from '@fortawesome/free-solid-svg-icons';
const Tab = createBottomTabNavigator();

export default function NavigationBottom() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'black',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          alignItems: 'center',
          height: 50,
          marginTop: 1,
          padding: 12,
        },
        contentStyle: {marginBottom: 0},
      }}>
      <Tab.Screen
        name="    "
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faStore}
              size={24} // Specify the size directly if using react-native-fontawesome
              color={focused ? 'black' : 'grey'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="   "
        component={Explorer}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faMessage}
              size={24} // Specify the size directly if using react-native-fontawesome
              color={focused ? 'black' : 'grey'}
            />
          ),
        }}
      />

      <Tab.Screen
        name=" "
        component={Account}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faUser}
              size={24} // Specify the size directly if using react-native-fontawesome
              color={focused ? 'black' : 'grey'}
            />
          ),
        }}
      />
      {/* 
      <Tab.Screen
        name="     "
        component={AddProducts}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faUser}
              size={24} // Specify the size directly if using react-native-fontawesome
              color={focused ? 'black' : 'grey'}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}
