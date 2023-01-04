import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {WHITE} from '../../constants/color';
import styles from '../styles';

const TickButton = ({icon, onPress, size, preview}) => {
  return (
    <Pressable
      style={[preview ? styles.previewTick : styles.tickCon]}
      onPress={onPress}>
      <Icon name={icon} size={size || 20} color={WHITE} />
    </Pressable>
  );
};

export default TickButton;
