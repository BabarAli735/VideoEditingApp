import React from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from '../InputField/InputField.style';
import {getIcon} from '../InputField/utils';

const AddressField = ({
  title,
  placeholder,
  icon,
  width,
  height,
  value,
  navigationHandler,
}) => {
  return (
    <Pressable onPress={navigationHandler} style={styles.InputFieldContainer}>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputBlock}>
          <View style={styles.textInputWidth}>
            <TextInput
              editable={false}
              placeholder={placeholder}
              placeholderTextColor={styles.placeholderColor}
              value={value}
              underlineColorAndroid="transparent"
              style={styles.TextInputStyleClass}
            />
          </View>

          <FastImage
            source={getIcon(icon)}
            style={styles.Icon(width, height)}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default AddressField;
