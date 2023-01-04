import {View, StyleSheet} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

const AbsoluteBackImage = ({src}) => {
  return (
    <View style={styles.logoContainer}>
      <FastImage source={src} style={styles.logo} />
    </View>
  );
};

AbsoluteBackImage.propTypes = {
  src: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  logoContainer: {
    position: 'absolute',
    opacity: 0.15,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 280,
    height: 360,
  },
});

export default AbsoluteBackImage;
