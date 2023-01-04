import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import isNil from 'lodash/isNil';

const UserInfoCard = ({name, age, maritalStatus, profession, gender}) => {
  const GenderIcon = () => {
    switch (gender) {
      case 1:
        return <Ionicons name={'male'} size={21} color={'blue'} />;
      case 3:
        return (
          <FontAwesome name={'transgender-alt'} size={21} color={'#000000'} />
        );
      default:
        return <Ionicons name={'female'} size={21} color={'#F13CF4'} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.titleInnerContainer}>
          <Text style={[styles.text, styles.titleText, styles.titleName]}>
            {name},{' '}
          </Text>
          <Text style={[styles.text, styles.titleText, styles.titleAge]}>
            {age}
          </Text>
        </View>
        {!isNil(gender) && (
          <View style={styles.iconContainer}>
            <GenderIcon />
          </View>
        )}
      </View>
      <View>
        <Text style={[styles.text, styles.description]}>
          {maritalStatus}, {profession}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 15,
    paddingVertical: 25,
    backgroundColor: '#F1EEF6',
  },
  iconContainer: {
    flex: 0.1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  text: {
    fontFamily: 'Montserrat',
  },
  titleContainer: {flex: 1, flexDirection: 'row'},
  titleInnerContainer: {flex: 0.9, flexDirection: 'row', flexWrap: 'wrap'},
  titleText: {
    fontSize: 25,
    color: '#000000',
    paddingTop: 5,
  },
  titleName: {
    fontWeight: '600',
  },
  titleAge: {
    fontWeight: '400',
  },
  description: {
    fontSize: 15,
    fontWeight: '400',
    color: '#706E6E',
    marginTop: 2,
  },
  locationContainer: {flex: 1, flexDirection: 'row', marginTop: 10},
  locationIconContainer: {
    flex: 0.07,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  locationTextContainer: {
    flex: 0.88,
  },
  locationText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000000',
    marginTop: 2,
  },
});

UserInfoCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  maritalStatus: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
  gender: PropTypes.number,
};

export default UserInfoCard;
