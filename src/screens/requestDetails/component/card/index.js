import React from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './Card.style';

const Card = ({title, subTitle, cta, onClick}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardLeftContainer}>
        <Text style={styles.leftText}>{title}</Text>
        <Text style={styles.leftSubText}>{subTitle}</Text>
      </View>
      <Pressable onPress={onClick}>
        <Text style={styles.rightText}>{cta}</Text>
      </Pressable>
    </View>
  );
};

export default Card;
