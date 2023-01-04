import React from 'react';
import {StatusBar, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import PrimaryButton from '../../../components/primaryButton/index';
import {APP_PRIMARY_COLOR, WHITE_COLOR} from '../../../constants/color';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import styles from './GoogleSearch.style';
import {GOOGLEPLACE_API_KEY} from '@env';
import {googleSearch} from '../../../constants/constants';

const GoogleSearch = () => {
  const navigation = useNavigation();

  const EmptyComponent = () => {
    return (
      <View style={styles.emptyCompContainer}>
        <Text style={styles.emptyCompContainerText}>
          {googleSearch.RESULT_NOT_FOUND}
        </Text>
      </View>
    );
  };
  const googlePlaceOnPress = (data, details = null) => {
    navigation.navigate('ProfileMap', {
      userAddress: data?.description,
      lat: details?.geometry?.location?.lat,
      lng: details?.geometry?.location?.lng,
      isData: true,
    });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor={WHITE_COLOR} barStyle="dark-content" />
      <GooglePlacesAutocomplete
        placeholder={googleSearch.PLACEHOLDER}
        onPress={googlePlaceOnPress}
        textInputProps={{placeholderTextColor: styles.placeholderTextColor}}
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
      <View style={styles.primaryBtnContainer}>
        <PrimaryButton
          title={googleSearch.BTN_TITLE}
          width={styles.primaryButtonWidth}
          backgroundColor={APP_PRIMARY_COLOR}
          color={WHITE_COLOR}
        />
      </View>
    </SafeAreaView>
  );
};

export default GoogleSearch;
