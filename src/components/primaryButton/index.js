import React from 'react';
import styles from './primaryButton.style';
import {Text, Pressable, View} from 'react-native';
import {ACTIVE_OPACITY} from '../../constants/constants';
const LoginButton = ({
  loginHandler,
  title,
  backgroundColor,
  color = '#fff',
  width,
  borderColor,
  disabled,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={loginHandler}
      activeOpacity={ACTIVE_OPACITY}
      style={[styles.loginButton(backgroundColor, width, borderColor)]}>
      <View style={styles.loginBtnTextContainer}>
        <Text style={[styles.loginButtonText(color)]}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default LoginButton;
