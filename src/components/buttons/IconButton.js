import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {WHITE} from '../../constants/color';
import styles from '../styles';

const IconButton = ({icon, onPress, customStyle}) => {
  return (
    <Pressable style={[styles.backCon, customStyle]} onPress={onPress}>
      <Icon name={icon} size={25} color={WHITE} />
    </Pressable>
  );
};

export default IconButton;
