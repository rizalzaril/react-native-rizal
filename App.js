// App.js
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import BannerImage from './src/banner';

import SplashScreens from './src/splashScreens';
import NavigationBottom from './src/navigation/navigationBottom';
import styles from './css/style';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/router/router';

const App = () => {
  // const [isShowSplash, setIsShowSplash] = useState(true);
  return (
    <NavigationContainer>
      {/* <NavigationBottom /> */}
      <Router />
    </NavigationContainer>
  );
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsShowSplash(false);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  // return (
  //   <>
  //     {isShowSplash ? (
  //       <SplashScreens />
  //     ) : (
  //     )}
  //   </>
  // );
};

export default App;
