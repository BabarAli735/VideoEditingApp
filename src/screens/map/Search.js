import React from 'react';
import {View, StyleSheet} from 'react-native';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import {GOOGLEPLACE_API_KEY} from '@env';

import {googleSearch} from '../../constants/constants';

import EmptyComponent from './EmptyComponent';
import {APP_PRIMARY_COLOR, BLACK_COLOR} from '../../constants/color';

const Search = ({onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <GooglePlacesAutocomplete
          placeholder={googleSearch.PLACEHOLDER}
          onPress={onPress}
          textInputProps={styles.placeholderTextColor}
          autoFocus={true}
          fetchDetails={true}
          listEmptyComponent={EmptyComponent}
          styles={{
            textInputContainer: styles.textInputContainer,
            textInput: styles.textInput,
            description: styles.description,
          }}
          query={{
            key: GOOGLEPLACE_API_KEY,
            language: 'en',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subContainer: {flex: 1},
  textInputContainer: {
    padding: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: APP_PRIMARY_COLOR,
    height: 60,
    color: APP_PRIMARY_COLOR,
    fontSize: 16,
  },
  description: {
    color: BLACK_COLOR,
  },
});

export default Search;
