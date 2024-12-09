import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from '../../assets/splashscreen/logo_splash.png';
import styles from '../../css/style';
const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('WelcomeAuth');
    }, 3000);
  });

  return (
    <View style={splashStyle.container}>
      <View>
        <Image source={Icon} style={{width: 125, height: 79}} />
      </View>
    </View>
  );
};

const splashStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
