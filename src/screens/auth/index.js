import React from 'react';
import {View, StatusBar} from 'react-native';

import LoginScreen from './LoginScreen';
import styles from './LoginScreen.style';
import {APP_PRIMARY_COLOR} from '../../constants/color';

const AuthScreen = () => {
  return (
    <View style={styles.safeContainer}>
      <StatusBar backgroundColor={APP_PRIMARY_COLOR} barStyle="light-content" />
      <LoginScreen />
    </View>
  );
};

export default AuthScreen;
