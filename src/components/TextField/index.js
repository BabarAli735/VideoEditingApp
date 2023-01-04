import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';

const TextField = ({title, description}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.text, styles.title]}>{title}</Text>
      </View>
      <View>
        <Text style={[styles.text, styles.description]}>{description}</Text>
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
  description: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
    marginTop: 5,
  },
});

TextField.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default TextField;
