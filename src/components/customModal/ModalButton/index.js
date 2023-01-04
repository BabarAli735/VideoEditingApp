import React from 'react';
import styles from './ModalButton.style';
import {Text, Pressable, View} from 'react-native';
const ModalButton = ({
  onPress,
  title,
  backgroundColor,
  color = '#fff',
  width,
  borderColor,
  borderWidth,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.loginButton(backgroundColor, width, borderColor, borderWidth),
      ]}>
      <View style={styles.loginBtnTextContainer}>
        <Text style={[styles.loginButtonText(color)]}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default ModalButton;
