import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';

const Distance = ({label}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.text, styles.title]}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  text: {
    fontFamily: 'Montserrat',
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#706E6E',
  },
});

Distance.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Distance;
