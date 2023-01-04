import React from 'react';
import FastImage from 'react-native-fast-image';
import styles from './LoginButton.style';
import {Text, View, Pressable} from 'react-native';
import googleIcon from '../../assets/googleIcon.png';
import {ACTIVE_OPACITY} from '../../constants/constants';
const LoginButton = ({
  onPress,
  title,
  backgroundColor,
  iconWidth = 20,
  color = '#fff',
}) => {
  return (
    <Pressable
      onPress={onPress}
      activeOpacity={ACTIVE_OPACITY}
      style={[styles.loginButton(backgroundColor)]}>
      <View style={styles.iconAndTextWrapper}>
        <View style={styles.iconContainer}>
          <FastImage source={googleIcon} style={styles.loginIcon(iconWidth)} />
        </View>
        <View style={styles.loginBtnTextContainer}>
          <Text style={[styles.loginButtonText(color)]}>{title}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default LoginButton;
