import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {googleSearch} from '../../constants/constants';

const EmptyComponent = () => {
  return (
    <View style={styles.emptyCompContainer}>
      <Text style={styles.emptyCompContainerText}>
        {googleSearch.RESULT_NOT_FOUND}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyCompContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyCompContainerText: {
    fontSize: 20,
  },
});

export default EmptyComponent;
