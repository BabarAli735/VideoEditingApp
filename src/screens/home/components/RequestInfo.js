import React from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from '../styles';

const RequestInfo = ({
  clickOnMiles,
  title,
  name,
  requestTitle,
  offerTitle,
  preview,
  dateAndTime,
  miles,
  userId,
  onRequestorProfile,
}) => {
  return (
    <>
      <View style={styles.userInfo}>
        <Text style={styles.reqInfoText}>{title}</Text>
        {!preview && (
          <Pressable onPress={clickOnMiles}>
            <Text style={styles.reqInfoText}>3.0 miles</Text>
          </Pressable>
        )}
      </View>

      <Pressable onPress={() => onRequestorProfile(userId)}>
        <Text style={styles.name}>{name}</Text>
      </Pressable>
      <Text style={styles.whyConnect}>{requestTitle}</Text>

      <Text style={styles.reqOtherInfo}>Offer: {offerTitle}</Text>
      <Text style={styles.reqOtherInfo}>{dateAndTime}</Text>
      {!preview && (
        <View style={styles.userInfo}>
          <Text style={styles.reqOtherInfo}>Applied: 0 Accepted: 0</Text>
          <Text style={styles.reqOtherInfo}>Today</Text>
        </View>
      )}
    </>
  );
};

export default RequestInfo;
