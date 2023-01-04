import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import edit_icon from '../../assets/edit_icon.png';

import {mapScreen} from '../../constants/constants';

import PrimaryButton from '../../components/primaryButton';
import {
  APP_PRIMARY_COLOR,
  GRAY_COLOR,
  WHITE_COLOR,
} from '../../constants/color';

import Search from './Search';
import _ from 'lodash';

const MapSearch = ({
  onSelect,
  location,
  city,
  state,
  country,
  expanded,
  onModalExpand,
  onSelectAddress,
}) => {
  return expanded ? (
    <Search onPress={onSelectAddress} />
  ) : (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Pressable onPress={onModalExpand} style={styles.pressableContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.addressContainer}>
              <View style={styles.upperAddressContainer}>
                <View style={styles.leftIconContainer}>
                  <SimpleLineIcons
                    name={'location-pin'}
                    size={21}
                    color={APP_PRIMARY_COLOR}
                  />
                </View>
                <View style={styles.addressFieldContainer}>
                  <Text style={styles.addressText}>{location}</Text>
                  <Text style={styles.stateCountryText}>
                    {_.reject([city, state, country], _.isNull).join(', ')}
                  </Text>
                </View>
              </View>
              <View style={styles.rightImageContainer}>
                <FastImage source={edit_icon} style={styles.editIcon} />
              </View>
            </View>
          </View>
        </Pressable>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            loginHandler={onSelect}
            title={mapScreen.BTN_TITLE}
            width="80%"
            backgroundColor={APP_PRIMARY_COLOR}
            color={WHITE_COLOR}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '30%',
    marginTop: 10,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  pressableContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressContainer: {flex: 1, flexDirection: 'row'},
  upperAddressContainer: {
    flex: 0.8,
    flexDirection: 'row',
  },
  leftIconContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressFieldContainer: {
    flex: 0.95,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  addressText: {fontSize: 16, fontWeight: '600', color: 'black'},
  stateCountryText: {fontSize: 12, fontWeight: '400', color: 'black'},
  rightImageContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationPin: {
    width: 16,
    height: 25,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderTextColor: GRAY_COLOR,
});

export default MapSearch;
