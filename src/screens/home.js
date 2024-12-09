import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  ButtonProps,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEdit,
  faRectangleList,
  faPlusSquare,
} from '@fortawesome/free-regular-svg-icons';

import {Switch} from 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';

import ContentImage from '../content';
import styles from '../../css/style';
import BannerImage from '../banner';
import PropsDinamis from '../catagory';
import StateDinamis from '../state';

const HomeScreen = ({initialValue = false, onToggle, navigation, route}) => {
  const handleGoTo = screen => {
    navigation.navigate(screen);
  };

  // const {userName} = route.params;

  const [isOn, setIsOn] = useState(initialValue);
  const [animationValue] = useState(new Animated.Value(initialValue ? 1 : 0));

  const toggleSwitch = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    Animated.timing(animationValue, {
      toValue: newValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    if (onToggle) {
      onToggle(newValue);
    }
  };

  const translateX = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 28], // Adjust based on thumb and track size
  });

  return (
    <View style={homeStyle.container}>
      <View style={homeStyle.body}>
        <Text style={{fontSize: 20, padding: 12}}>Hello, User </Text>
        <View style={homeStyle.productHeader}>
          <Text style={{color: 'black', fontSize: 30}}>Products</Text>
          <TouchableOpacity
            onPress={() => handleGoTo('AddProducts')}
            style={{
              width: 40,
              height: 40,
              backgroundColor: colors.primary,
              alignItems: 'center',
              borderRadius: 40 / 2,
            }}>
            <Text style={{fontSize: 28, color: colors.white}}>+</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={homeStyle.content}>
            <View style={homeStyle.card}>
              {/* PRODUCT */}
              <View style={{flexDirection: 'row', gap: 12}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 10, color: 'black'}}>
                    SKU. #012345678
                  </Text>
                  <Image
                    style={homeStyle.productImage}
                    source={{
                      uri: 'https://i.pinimg.com/564x/30/30/c6/3030c64942a6ba7877fc507b4f2acb90.jpg',
                    }}
                  />
                  <View style={{marginTop: 12}}>
                    <TouchableOpacity
                      onPress={toggleSwitch}
                      style={styles.container}>
                      <View
                        style={[
                          homeStyle.track,
                          {backgroundColor: isOn ? '#2A9079' : '#dcdde1'},
                        ]}>
                        {isOn ? (
                          <Text style={homeStyle.switchTextOn}>ON</Text>
                        ) : (
                          <Text style={homeStyle.switchTextOff}>OFF</Text>
                        )}
                        <Animated.View
                          style={[
                            homeStyle.thumb,
                            {transform: [{translateX}]},
                            {backgroundColor: isOn ? '#FFC700' : '#1F7378'},
                          ]}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{maxWidth: 100}}>
                  <View style={{flexDirection: 'row', gap: 8}}>
                    <Text style={homeStyle.productTitle}>Cake</Text>
                    <View style={homeStyle.badge}>
                      <Text style={homeStyle.badgeText}>5.0</Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', gap: 8, marginTop: 12}}>
                    <View>
                      <Text style={homeStyle.productInfo}>Stock Available</Text>
                      <Text style={homeStyle.productInfo}>Total Weight</Text>
                      <Text style={homeStyle.productInfo}>Total Price</Text>
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                      <Text style={homeStyle.productInfo}>1000 pax</Text>
                      <Text style={homeStyle.productInfo}>100 gram</Text>
                      <Text style={homeStyle.productInfo}>Rp. 500.000</Text>
                    </View>
                  </View>
                </View>
                <View style={homeStyle.actionCard}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={homeStyle.icon}
                    size={20}
                  />
                  <FontAwesomeIcon
                    icon={faRectangleList}
                    style={homeStyle.icon}
                    size={20}
                  />
                </View>
              </View>
              {/* END PRODUCT */}
            </View>
            <View style={homeStyle.card}>
              {/* PRODUCT */}
              <View style={{flexDirection: 'row', gap: 12}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 10, color: 'black'}}>
                    SKU. #012345678
                  </Text>
                  <Image
                    style={homeStyle.productImage}
                    source={{
                      uri: 'https://i.pinimg.com/564x/30/30/c6/3030c64942a6ba7877fc507b4f2acb90.jpg',
                    }}
                  />
                  <View style={{marginTop: 12}}>
                    <TouchableOpacity
                      onPress={toggleSwitch}
                      style={styles.container}>
                      <View
                        style={[
                          homeStyle.track,
                          {backgroundColor: isOn ? '#2A9079' : '#dcdde1'},
                        ]}>
                        {isOn ? (
                          <Text style={homeStyle.switchTextOn}>ON</Text>
                        ) : (
                          <Text style={homeStyle.switchTextOff}>OFF</Text>
                        )}
                        <Animated.View
                          style={[
                            homeStyle.thumb,
                            {transform: [{translateX}]},
                            {backgroundColor: isOn ? '#FFC700' : '#1F7378'},
                          ]}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{maxWidth: 100}}>
                  <View style={{flexDirection: 'row', gap: 8}}>
                    <Text style={homeStyle.productTitle}>Cake</Text>
                    <View style={homeStyle.badge}>
                      <Text style={homeStyle.badgeText}>5.0</Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', gap: 8, marginTop: 12}}>
                    <View>
                      <Text style={homeStyle.productInfo}>Stock Available</Text>
                      <Text style={homeStyle.productInfo}>Total Weight</Text>
                      <Text style={homeStyle.productInfo}>Total Price</Text>
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                      <Text style={homeStyle.productInfo}>1000 pax</Text>
                      <Text style={homeStyle.productInfo}>100 gram</Text>
                      <Text style={homeStyle.productInfo}>Rp. 500.000</Text>
                    </View>
                  </View>
                </View>
                <View style={homeStyle.actionCard}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={homeStyle.icon}
                    size={20}
                  />
                  <FontAwesomeIcon
                    icon={faRectangleList}
                    style={homeStyle.icon}
                    size={20}
                  />
                </View>
              </View>
              {/* END PRODUCT */}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const {width, height} = Dimensions.get('window');
const colors = {
  primary: '#1F7378',
  white: '#ffffff',
};
const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },

  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },

  body: {
    flex: 1,
    backgroundColor: '#E8E7E7',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    width: '90%', // Responsive width
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center',
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    width: 30,
    height: 30,
    padding: 5,
    alignItems: 'center',
  },
  badgeText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  track: {
    width: 50,
    height: 25,
    borderRadius: 20,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginHorizontal: 10,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 18,
    position: 'absolute',
  },
  switchTextOn: {
    position: 'absolute',
    color: 'white',
    top: 5,
    left: 5,
    fontWeight: 'bold',
    zIndex: 5,
    fontSize: 11,
  },
  switchTextOff: {
    position: 'absolute',
    color: '#1F7378',
    fontWeight: 'bold',
    top: 5,
    left: 23,
    zIndex: 5,
    fontSize: 11,
  },
  productImage: {
    height: width * 0.2,
    width: width * 0.2,
    borderRadius: (width * 0.2) / 2,
    marginTop: 10,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  productInfo: {
    fontSize: 12,
    color: colors.primary,
    lineHeight: 20,
  },
  actionCard: {
    height: 120,
    width: 40,
    position: 'absolute',
    backgroundColor: colors.primary,
    alignItems: 'center',
    padding: 20,
    marginTop: '5%',
    right: 0,
    borderRadius: 25,
    justifyContent: 'space-between',
  },
  icon: {
    color: 'white',
  },
});

export default HomeScreen;
