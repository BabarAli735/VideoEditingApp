import React, {useState, useRef, useEffect} from 'react';
import {StatusBar, View, Text, Pressable, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import MapView from 'react-native-maps';
import {Modalize} from 'react-native-modalize';
import styles from './ProfileMapScreen.style';
import FastImage from 'react-native-fast-image';
import location_icon from '../../../assets/Location_Pin.png';
import edit_icon from '../../../assets/edit_icon.png';
import PrimaryButton from '../../../components/primaryButton/index';
import {APP_PRIMARY_COLOR, WHITE_COLOR} from '../../../constants/color';
import Geolocation from '@react-native-community/geolocation';
import {
  checkLocationPermission,
  checkLocationPermissionForAndroid,
} from '../../auth/onboarding/personalDetail/MapScreen/utils';
import {geoCodeApi, createUser} from '../../../services/api';
import Loader from '../../../components/loader/index';
import {mapScreen} from '../../../constants/constants';

const MapScreen = ({route}) => {
  const navigation = useNavigation();
  const modalizeRef = useRef(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [userId, setuserId] = useState(route?.params?.id);
  const [userSubId, setUserSubId] = useState(route?.params?.sub);
  const [userAddress, setuserAddress] = useState('No location found');
  const mapRef = useRef(null);
  let modalizeSnapValue = 300;

  const regionState = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0922,
  };

  useEffect(() => {
    if (route?.params.isData) {
      mapRef.current.animateToRegion({
        latitude: route?.params.lat,
        longitude: route?.params.lng,
        latitudeDelta: 0.9,
        longitudeDelta: 0.9,
      });
    }
  }, [route.params]);

  useEffect(() => {
    const geoCodingApi = async () => {
      let response = await geoCodeApi(latitude, longitude);
      setuserAddress(response);
    };

    geoCodingApi();
    checkLocationPermission();
  }, [latitude, longitude]);

  useEffect(() => {
    const getExactAddressFromGooglePlace = () => {
      let params = route.params;
      let address = params?.userAddress;
      let isDataFromGoogleSearch = params?.isData;
      let incomingAddress = userAddress;
      if (isDataFromGoogleSearch) {
        incomingAddress = address;
      }

      setuserAddress(incomingAddress);
    };

    getExactAddressFromGooglePlace();
  }, [route.params, userAddress]);

  useEffect(() => {
    const getLocation = () => {
      const result = checkLocationPermissionForAndroid();
      result.then(res => {
        if (res) {
          Geolocation.getCurrentPosition(
            position => {
              setLatitude(position?.coords?.latitude);
              setLongitude(position?.coords?.longitude);
            },
            error => {
              Alert.alert('Location', error.message, [
                {text: 'OK', onPress: () => navigation.goBack()},
              ]);
            },
            {enableHighAccuracy: false, timeout: 30000, maximumAge: 10000},
          );
        }
      });
    };
    getLocation();
  }, [navigation]);

  const navigateToGooglePlacesSearch = () => {
    navigation.navigate('GoogleSearch');
  };

  const saveInDBAndNavigateToMap = async () => {
    let updatedUser = {
      address: userAddress,
      sub: userSubId,
      id: userId,
    };
    try {
      await createUser(updatedUser);
      navigation.navigate('ProfileScreen', {
        isAddressUpdated: 'true',
      });
    } catch (error) {
      console.error(error);
    }
  };
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
            <Pressable onPress={navigateToGooglePlacesSearch}>
              <FastImage source={edit_icon} style={styles.editIcon} />
            </Pressable>
          </View>
        </View>
        <View style={styles.primaryBtnContainer}>
          <PrimaryButton
            loginHandler={saveInDBAndNavigateToMap}
            title={mapScreen.BTN_TITLE}
            width={styles.primaryBtnWidth}
            backgroundColor={APP_PRIMARY_COLOR}
            color={WHITE_COLOR}
          />
        </View>
      </View>
    );
  };

  let isLoading = longitude && latitude;
  if (!isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor={WHITE_COLOR} barStyle="dark-content" />
      <MapView
        style={styles.map}
        initialRegion={regionState}
        ref={mapRef}
        zoomEnabled
        maxZoomLevel={30}
        minZoomLevel={15}
        zoomControlEnabled
        showsCompass
        showsBuildings
        showsIndoors
        showsScale
        showsIndoorLevelPicker
        showsMyLocationButton
        showsPointsOfInterest
        showsTraffic
        showsUserLocation
      />
      <Modalize
        adjustToContentHeight
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
