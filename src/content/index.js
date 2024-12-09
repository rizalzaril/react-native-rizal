import React from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';

import styles from '../../css/style';

const ContentImage = () => {
  const images = [
    'https://i.pinimg.com/564x/2e/b8/c9/2eb8c98a17bdf5bd6826ef5cb906541a.jpg',
    'https://i.pinimg.com/564x/09/a8/79/09a879ef3520031dbb3b587c03936355.jpg',
    'https://i.pinimg.com/564x/57/e3/0f/57e30ff569caa3df402c39b5c2d8f5d8.jpg',
    'https://i.pinimg.com/564x/1b/c6/1a/1bc61af15bbdadcaf774a295c6ddd6bd.jpg',
    'https://i.pinimg.com/564x/1a/fc/a0/1afca0c02a451e9c7f32cf9d5ef955f1.jpg',
    'https://i.pinimg.com/564x/df/bf/9a/dfbf9a9b27bd0bda8ba19927a6b36c11.jpg',
    'https://i.pinimg.com/564x/67/59/da/6759daa1fc31e013a155d47680f2c1e1.jpg',
    'https://i.pinimg.com/736x/bf/52/00/bf52000fdc3ea7c7e84d9eab7e65ac65.jpg',
  ];

  const RenderImageHeader = () => {
    const rows = [];
    for (let i = 0; i < images.length; i += 2) {
      rows.push(
        <View
          key={i}
          style={[
            styles.row,
            styles.gap12,
            styles.flexCenter,
            styles.marginTop1,
          ]}>
          <Image source={{uri: images[i]}} style={styles.image} />
          {images[i + 1] && (
            <Image source={{uri: images[i + 1]}} style={styles.image} />
          )}
        </View>,
      );
    }
    return rows;
  };
  return <View>{RenderImageHeader()}</View>;
};

export default ContentImage;
