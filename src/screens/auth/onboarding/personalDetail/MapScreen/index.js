import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  StatusBar,
  View,
  Text,
  Pressable,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import {Modalize} from 'react-native-modalize';
import styles from './MapScreen.style';
import FastImage from 'react-native-fast-image';
import location_icon from '../../../../../assets/Location_Pin.png';
import edit_icon from '../../../../../assets/edit_icon.png';
import PrimaryButton from '../../../../../components/primaryButton/index';
import {APP_PRIMARY_COLOR, WHITE_COLOR} from '../../../../../constants/color';
import Geolocation from '@react-native-community/geolocation';
import {
  checkLocationPermission,
  checkLocationPermissionForAndroid,
} from './utils';
import {geoCodeApi} from '../../../../../services/api';
import Loader from '../../../../../components/loader/index';
import {
  ERROR_MESSAGES,
  LABELS,
  mapScreen,
} from '../../../../../constants/constants';
import DeviceInfo from 'react-native-device-info';
import {isUndefined} from 'lodash';

const MapScreen = ({route}) => {
  const navigation = useNavigation();
  const modalizeRef = useRef(null);
  const [mapLatitude, setLatitude] = useState(0);
  const [mapLongitude, setLongitude] = useState(0);
  const [userAddress, setuserAddress] = useState('No location found');
  const mapRef = useRef(null);
  let modalizeSnapValue = 300;
  const initialRegion = {
    latitude: mapLatitude,
    longitude: mapLongitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0922,
  };
  const [region, setRegion] = useState(initialRegion);

  useEffect(() => {
    if (route?.params) {
      mapRef.current.animateToRegion({
        latitude: route?.params.lat,
        longitude: route?.params.lng,
        latitudeDelta: 0.9,
        longitudeDelta: 0.9,
      });
    }
  }, [route.params]);

  const animateToRegion = animateRegion => {
    mapRef.current.animateToRegion(animateRegion, 1000);
  };

  const onLatLongFailed = useCallback(
    async error => {
      console.error(error.code);
      showLocationAlert();
    },
    [showLocationAlert],
  );

  const onLatLongSuccess = useCallback(
    async position => {
      try {
        const {latitude, longitude} = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);

        let response = await geoCodeApi(latitude, longitude);
        const userRegion = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.9,
          longitudeDelta: 0.9,
        };
        setRegion(userRegion);
        animateToRegion(userRegion);
        setuserAddress(response);
      } catch (error) {
        console.error(error.message);
      }
    },
    [setRegion],
  );

  const getExactAddressFromGooglePlace = useCallback(() => {
    let params = route.params;
    let address = params?.userAddress;
    let isDataFromGoogleSearch = params?.isData;
    let incomingAddress = userAddress;
    if (isDataFromGoogleSearch) {
      incomingAddress = address;
    }
    setuserAddress(incomingAddress);
    const userRegion = {
      latitude: route?.params.lat,
      longitude: route?.params.lng,
      latitudeDelta: 0.9,
      longitudeDelta: 0.9,
    };
    setRegion(userRegion);
    animateToRegion(userRegion);
  }, [route, userAddress, setRegion]);

  const showLocationAlert = useCallback(() => {
    Alert.alert(LABELS.alert, ERROR_MESSAGES.turnOnLocation, [
      {text: LABELS.ok, onPress: () => navigation.goBack()},
    ]);
  }, [navigation]);

  const accessUserPermission = useCallback(async () => {
    try {
      let response =
        Platform.OS === LABELS.android
          ? await checkLocationPermissionForAndroid()
          : await checkLocationPermission();
      response
        ? DeviceInfo.isLocationEnabled().then(enabled => {
            enabled
              ? Geolocation.getCurrentPosition(
                  onLatLongSuccess,
                  onLatLongFailed,
                )
              : showLocationAlert();
          })
        : Linking.openSettings();
    } catch (error) {
      console.error(error.message);
    }
  }, [onLatLongFailed, onLatLongSuccess, showLocationAlert]);

  useEffect(() => {
    accessUserPermission();
    !isUndefined(route.params) && getExactAddressFromGooglePlace();
  }, [accessUserPermission, getExactAddressFromGooglePlace, route]);

  const RenderModalForEditingMap = () => {
    return (
      <View>
        <Text style={styles.headerTitle}>{mapScreen.ADDRESS_TITLE}</Text>
        <View style={styles.childrenOneContainer}>
          <View style={styles.ContainerLeftSide}>
            <FastImage source={location_icon} style={styles.locationPin} />
            <View>
              <Text style={styles.userAddress}>{userAddress}</Text>
            </View>
          </View>
          <View style={styles.ContainerRightSide}>
            <Pressable onPress={() => navigation.navigate('GoogleSearch')}>
              <FastImage source={edit_icon} style={styles.editIcon} />
            </Pressable>
          </View>
        </View>
        <View style={styles.primaryBtnContainer}>
          <PrimaryButton
            loginHandler={() =>
              navigation.navigate('PersonalDetails', {
                userAddress,
              })
            }
            title={mapScreen.BTN_TITLE}
            width="80%"
            backgroundColor={APP_PRIMARY_COLOR}
            color={WHITE_COLOR}
          />
        </View>
      </View>
    );
  };

  let isLoading = mapLongitude && mapLatitude;
  if (!isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor={WHITE_COLOR} barStyle="dark-content" />
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        ref={mapRef}
        zoomEnabled
        maxZoomLevel={30}
        minZoomLevel={15}>
        <Marker coordinate={region} />
      </MapView>
      <Modalize
        alwaysOpen={modalizeSnapValue}
        handleStyle={styles.handleStyle}
        handlePosition="inside"
        ref={modalizeRef}
        snapPoint={800}>
        <RenderModalForEditingMap />
      </Modalize>
    </SafeAreaView>
  );
};

export default MapScreen;
