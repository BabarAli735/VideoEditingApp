import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const StarPoint = ({label}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome name={'star'} size={15} color={'#ffff'} />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.text}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'row', padding: 10},
  iconContainer: {flex: 0.2, justifyContent: 'center', alignItems: 'center'},
  labelContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    fontFamily: 'Montserrat',
    color: '#ffff',
    fontWeight: '400',
    fontSize: 20,
  },
});

StarPoint.propTypes = {
  label: PropTypes.string.isRequired,
};

export default StarPoint;
