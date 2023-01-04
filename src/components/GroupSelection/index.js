import React from 'react';
import {RadioButton} from '../RadioButton';
import map from 'lodash/map';
import {StyleSheet, View} from 'react-native';

const GroupSelection = ({groups, onSelect, selected}) => {
  return (
    <View style={styles.container}>
      {map(groups, (item, index) => (
        <RadioButton onPress={onSelect} selected={selected} key={index}>
          {item}
        </RadioButton>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default GroupSelection;
