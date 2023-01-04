import React from 'react';
import {Pressable, Text} from 'react-native';
import styles from '../styles';

const Button = ({title, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.buttonCon}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </Pressable>
  );
};

export default Button;
