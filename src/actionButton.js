import React from 'react';
import {View} from 'react-native';
import Buttons from '../src/button/button'; // Adjust the import if necessary

const ActionButton = ({title, onPress}) => {
  return (
    <View style={{marginTop: 12}}>
      <Buttons title={title} onPress={onPress} />
    </View>
  );
};

export default ActionButton;
