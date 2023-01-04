import React from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './DatePicker.style';
import birthday_icon from '../../assets/birthday_icon.png';
import {APP_PRIMARY_COLOR, BLACK_COLOR} from '../../constants/color';
import DatePicker from 'react-native-date-picker';
import _ from 'lodash';
import moment from 'moment';
import {DATE_FORMAT} from '../../constants/constants';

const DatePickerField = ({
  title,
  placeholder,
  width,
  height,
  value,
  onSelect,
  onToggle,
  toggle,
}) => {
  let convertedToStr = _.isNumber(value)
    ? moment.unix(value).format(DATE_FORMAT)
    : '';

  return (
    <>
      {toggle && (
        <DatePicker
          modal
          textColor={APP_PRIMARY_COLOR}
          open={toggle}
          date={
            _.isEmpty(convertedToStr) ? new Date() : moment.unix(value).toDate()
          }
          mode={'date'}
          onConfirm={date => onSelect(moment(date).unix())}
          onCancel={onToggle}
        />
      )}
      <Pressable onPress={onToggle} style={styles.InputFieldContainer}>
        <Text style={styles.label}>{title}</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputBlock}>
            <TextInput
              editable={false}
              onPressIn={onToggle}
              value={convertedToStr}
              placeholderTextColor={BLACK_COLOR}
              placeholder={placeholder}
              underlineColorAndroid="transparent"
              style={styles.TextInputStyleClass}
            />
            <FastImage
              source={birthday_icon}
              style={styles.Icon(width, height)}
            />
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default DatePickerField;
