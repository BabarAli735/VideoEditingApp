import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  Linking,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import MapView from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import Loader from '../../components/loader';
import Address from './Address';
import {ERROR_MESSAGES, LABELS} from '../../constants/constants';
import {geoCodeApiNew} from '../../services/api';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  checkLocationPermission,
  checkLocationPermissionForAndroid,
} from './permissions';
import _ from 'lodash';
import {
  APP_PRIMARY_COLOR,
  BLACK_COLOR,
  GRAY_COLOR,
  PURPLE,
  WHITE_COLOR,
} from '../../constants/color';

import {useMaps} from '../../stores/useMaps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ION_ICONS} from '../../constants/icons';

const initialRegion = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.0022,
  longitudeDelta: 0.0022,
};

const MapScreen = () => {
  const navigation = useNavigation();
  const [mapLatitude, setLatitude] = useState(0);
  const [mapLongitude, setLongitude] = useState(0);
  const {
    address,
    city,
    state: countryState,
    country,
    setLocation,
  } = useMaps(state => state);
  const [expanded, setExpanded] = useState(false);
  const mapRef = useRef(null);
  const [region, setRegion] = useState(initialRegion);
  const [currentLocation, setCurrentLocation] = useState(false);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['30%', '70%'], []);

  const handleSheetChanges = useCallback(index => {
    setExpanded(index);
  }, []);

  const onModalExpand = () => {
    bottomSheetRef.current.expand();
  };
  const onModalRest = () => {
    bottomSheetRef.current.collapse();
  };

  const animateToRegion = animateRegion => {
    mapRef.current.animateToRegion(animateRegion, 1000);
  };

  const showLocationAlert = useCallback(() => {
    Alert.alert(LABELS.alert, ERROR_MESSAGES.turnOnLocation, [
      {text: LABELS.ok, onPress: () => navigation.goBack()},
    ]);
  }, [navigation]);

  useEffect(() => {
    if (mapLatitude && mapLongitude) {
      const userRegion = {
        latitude: mapLatitude,
        longitude: mapLongitude,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0022,
      };
      setRegion(userRegion);
    }
  }, [mapLatitude, mapLongitude]);

  useEffect(() => {
    const onLatLongSuccess = async position => {
      try {
        const {latitude, longitude} = position.coords;
        let response = await geoCodeApiNew(latitude, longitude);
        await setLocation(response);

        const userRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0022,
        };

        setLatitude(latitude);
        setLongitude(longitude);
        animateToRegion(userRegion);
      } catch (error) {
        console.error(error.message);
      }
    };
    const onLatLongFailed = async error => {
      console.error(error.code);
      showLocationAlert();
    };

    const accessUserPermission = async () => {
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
    };

    accessUserPermission();
  }, [setLocation, showLocationAlert, currentLocation]);

  const onSelectAddress = async (data, details = null) => {
    const latitude = details.geometry.location.lat;
    const longitude = details.geometry.location.lng;
    const userRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.0022,
      longitudeDelta: 0.0022,
    };
    let response = await geoCodeApiNew(latitude, longitude);

    setRegion(userRegion);
    await setLocation(response);
    setLatitude(userRegion.latitude);
    setLongitude(userRegion.longitude);
    animateToRegion(userRegion);
    onModalRest();
  };

  const onSave = () => {
    navigation.goBack();
  };

  const callGeocodingApi = async mapRegion => {
    try {
      const {latitude, longitude} = mapRegion;
      let response = await geoCodeApiNew(latitude, longitude);

      setRegion(mapRegion);
      await setLocation(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  const onRegionChange = mapRegion => {
    callGeocodingApi(mapRegion);
  };

  const onRegionChangeComplete = (mapRegion, gesture) => {
    if (Platform.OS === LABELS.android) {
      if (gesture.isGesture) {
        onRegionChange(mapRegion);
      }
    } else {
      onRegionChange(mapRegion);
    }
  };

  let isLoading = mapLongitude && mapLatitude;
  if (!isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor={WHITE_COLOR} barStyle="dark-content" />
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={region}
          initialRegion={initialRegion}
          ref={mapRef}
          onRegionChangeComplete={onRegionChangeComplete}
        />
        <View style={styles.markerFixed}>
          <FontAwesome name={ION_ICONS.mapMarker} size={40} color={PURPLE} />
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.currentLocation}
          onPress={() => setCurrentLocation(currentState => !currentState)}>
          <MaterialIcons
            name={ION_ICONS.myLocation}
            size={20}
            color={BLACK_COLOR}
          />
        </TouchableOpacity>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <Address
          location={_.isEmpty(address) ? LABELS.noLocation : address.join(' ')}
          city={city}
          state={countryState}
          country={country}
          expanded={expanded}
          onModalExpand={onModalExpand}
          onModalReset={onModalRest}
          onSelect={onSave}
          latitude={mapLatitude}
          longitude={mapLongitude}
          onSelectAddress={onSelectAddress}
        />
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  mapContainer: {
    width: '100%',
    height: '70%',
  },
  map: {
    flex: 1,
  },
  modalContainer: {
    flex: 0.2,
  },
  handleStyle: {
    width: '20%',
    backgroundColor: '#C4C4C4',
  },

  roofStyle: {
    position: 'absolute',
  },
  headerTitle: {
    marginLeft: 20,
    paddingTop: 40,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  childrenOneContainer: {
    flexDirection: 'row',
    height: 150,
    justifyContent: 'space-between',
    paddingTop: 30,
  },
  ContainerLeftSide: {
    flexDirection: 'row',
    width: '75%',
  },

  userAddress: {
    fontSize: 20,
    textAlign: 'justify',
    color: '#000',
  },

  locationPin: {
    width: 16,
    height: 25,
  },

  ContainerRightSide: {
    width: '10%',
  },
  editIcon: {
    width: 20,
    height: 20,
  },

  primaryBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  placeholderTextColor: GRAY_COLOR,
  markerFixed: {
    left: '50%',

    position: 'absolute',
    top: '50%',
  },
  currentLocation: {
    right: 20,
    backgroundColor: 'white',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  marker: {
    height: 48,
    width: 48,
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20,
  },
});

export default MapScreen;
