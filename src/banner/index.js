import React from 'react';
import {View, Image, Text} from 'react-native';
import styles from '../../css/style';
const BannerImage = () => {
  return (
    <View style={[styles.row, styles.flexCenter, styles.marginTop1]}>
      <Image
        source={{
          uri: 'https://i.pinimg.com/564x/f8/64/09/f864092d2988ea49ed09437bbb150a8e.jpg',
        }}
        style={{width: 350, height: 200}}
      />
    </View>
  );
};

export default BannerImage;
