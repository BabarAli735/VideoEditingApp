import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {APP_PRIMARY_COLOR} from '../../constants/color';

const CrossButton = ({icon, onPress, size}) => {
  return (
    <Pressable onPress={onPress}>
      <Icon name={icon} size={size || 40} color={APP_PRIMARY_COLOR} />
    </Pressable>
  );
};

export default CrossButton;
