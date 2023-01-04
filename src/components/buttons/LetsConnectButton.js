import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {STRINGS} from '../../constants/Strings';
import styles from '../styles';

const LetsConnectButton = ({onPress, title = STRINGS.LETS_CONNECT}) => {
  return (
    <View style={styles.letsConenctCon}>
      <Pressable onPress={onPress} style={styles.letsConenctBtn}>
        <Text style={styles.connectText}>{title || STRINGS.LETS_CONNECT}</Text>
      </Pressable>
    </View>
  );
};

export default LetsConnectButton;
