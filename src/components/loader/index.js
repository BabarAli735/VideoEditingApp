import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {APP_PRIMARY_COLOR} from '../../constants/color';
export default function SimpleLottie() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/83026-loader-animation.json')}
        style={styles.animation}
        autoPlay
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: APP_PRIMARY_COLOR,
    zIndex: 50,
    opacity: 0.7,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  animation: {
    width: 200,
    height: 200,
  },
});
