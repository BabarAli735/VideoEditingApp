import React from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './Card.style';
import FastImage from 'react-native-fast-image';
import GroupIcon from '../../../../../assets/Group.png';

const Card = ({title, subTitle, onClick}) => {
  return (
    <Pressable onPress={onClick} style={styles.cardContainer}>
      <View style={styles.cardLeftContainer}>
        <FastImage
          style={{width: 48, height: 48}}
          source={GroupIcon}
          resizeMode={'contain'}
        />
      </View>
      <View>
        <Text style={styles.middleHeader}>{title}</Text>
        <Text style={styles.middleDescription}>{subTitle}</Text>
      </View>
    </Pressable>
  );
};

export default Card;
