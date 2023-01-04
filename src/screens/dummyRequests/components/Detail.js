import React from 'react';
import {Text} from 'react-native';
import styles from '../reqStyles';

const Detail = ({label, detail}) => {
  return (
    <>
      <Text style={styles.title}>{label}</Text>
      <Text style={styles.detail}>{detail}</Text>
    </>
  );
};

export default Detail;
