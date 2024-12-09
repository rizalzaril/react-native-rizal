import React, {Component} from 'react';
import {Animated, Text, StyleSheet} from 'react-native';

class ShakingText extends Component {
  constructor(props) {
    super(props);
    this.shakeAnimation = new Animated.Value(0);
  }

  shake = () => {
    this.shakeAnimation.setValue(0);
    Animated.sequence([
      Animated.timing(this.shakeAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(this.shakeAnimation, {
        toValue: -1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(this.shakeAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(this.shakeAnimation, {
        toValue: -1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(this.shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  render() {
    const {style, children} = this.props;
    const shakeStyle = {
      transform: [
        {
          translateX: this.shakeAnimation.interpolate({
            inputRange: [-1, 1],
            outputRange: [-10, 10],
          }),
        },
      ],
    };

    return (
      <Animated.Text style={[style, shakeStyle]}>{children}</Animated.Text>
    );
  }
}

const styles = StyleSheet.create({
  description: hasError => ({
    color: hasError ? 'red' : 'black',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  }),
});

export default ShakingText;
