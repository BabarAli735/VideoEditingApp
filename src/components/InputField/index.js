import React from 'react';
import {View, Text, TextInput} from 'react-native';

import FastImage from 'react-native-fast-image';
import styles from './InputField.style';
import {getIcon} from './utils';

const InputField = ({
  title,
  onChangeText,
  placeholder,
  name,
  icon,
  width,
  height,
  isDate,
  onBlur,
  value,
}) => {
  return (
    <View style={styles.InputFieldContainer}>
      {title && <Text style={styles.label}>{title}</Text>}
      <View style={styles.inputContainer}>
        <View style={styles.inputBlock}>
          <TextInput
            onBlur={e => onBlur(name, e)}
            value={value}
            editable={isDate}
            onChangeText={v => onChangeText(name, v)}
            placeholder={placeholder}
            placeholderTextColor={styles.placeholderColor}
            underlineColorAndroid="transparent"
            style={styles.TextInputStyleClass}
          />

          <FastImage
            source={getIcon(icon)}
            style={styles.Icon(width, height)}
          />
        </View>
      </View>
    </View>
  );
};

export default InputField;
