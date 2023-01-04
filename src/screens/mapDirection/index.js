import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoding';
import {APP_PRIMARY_COLOR, WHITE_COLOR} from '../../constants/color';
import Loader from '../../components/loader';
import {GEOCODING_API_KEY, GEOCODING_STRING_TO_LAT_KEY} from '@env';
import {MAP_DIRECTION} from '../../constants/constants';
import styles from './MapDirections.style';
import {ION_ICONS} from '../../constants/icons';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';

const MapDirections = ({navigation}) => {
  const [coordinates, setCoordinates] = useState([]);
  Geocoder.init(GEOCODING_API_KEY);

  useEffect(() => {
    Geocoder.from('Phase 2 Hayatabad, Peshawar, Pakistan')
      .then(json => {
        let location = json.results[0].geometry.location;
        setCoordinates(current => [...current, location]);
      })
      .catch(error => console.warn(error));
    Geocoder.from(
      '2GGP+945, Sher Ali Town Peshawar, Khyber Pakhtunkhwa, Pakistan',
    )
      .then(json => {
        let location = json.results[0].geometry.location;
        setCoordinates(current => [...current, location]);
      })
      .catch(error => console.warn(error));
  }, []);

  if (coordinates[0] === undefined) {
    return <Loader />;
  }

  const backToHomeScreen = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.maps}
        initialRegion={{
          latitude: coordinates[0]?.lat,
          longitude: coordinates[0]?.lng,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        }}>
        <MapViewDirections
          origin={{latitude: coordinates[0].lat, longitude: coordinates[0].lng}}
          destination={{
            latitude: parseFloat(coordinates[1]?.lat),
            longitude: parseFloat(coordinates[1]?.lng),
          }}
          apikey={GEOCODING_STRING_TO_LAT_KEY}
          strokeWidth={5}
          strokeColor={APP_PRIMARY_COLOR}
          optimizeWaypoints={true}
        />
        <Marker
          title={MAP_DIRECTION.marker_title_request}
          pinColor={APP_PRIMARY_COLOR}
          coordinate={{
            latitude: coordinates[0].lat,
            longitude: coordinates[0].lng,
          }}
        />
        <Marker
          title={MAP_DIRECTION.marker_title_you}
          pinColor={APP_PRIMARY_COLOR}
          coordinate={{
            latitude: coordinates[1]?.lat,
            longitude: coordinates[1]?.lng,
          }}
        />
      </MapView>
      <View style={styles.backBtnContainer}>
        <Pressable onPress={backToHomeScreen} style={styles.backBtn}>
          <Icon name={ION_ICONS.checkOutline} size={25} color={WHITE_COLOR} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default MapDirections;
