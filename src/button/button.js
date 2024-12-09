// ../src/button/button.js
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Buttons = ({title, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
    width: 200,
    height: 36,
    borderWidth: 2,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Buttons;
