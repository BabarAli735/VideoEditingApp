import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const checkLocationPermission = async () => {
  try {
    const result = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
    switch (result) {
      case RESULTS.UNAVAILABLE:
        return false;
      case RESULTS.DENIED:
        let permission = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
        return permission === RESULTS.GRANTED ? true : false;
      case RESULTS.LIMITED:
        await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
        return false;
      case RESULTS.GRANTED:
        return true;
      case RESULTS.BLOCKED:
        await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
        return false;
    }
  } catch (error) {
    console.error(error);
  }
};

export const checkLocationPermissionForAndroid = async () => {
  try {
    const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    switch (result) {
      case RESULTS.UNAVAILABLE:
        return false;
      case RESULTS.DENIED:
        let permission = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        return permission === RESULTS.GRANTED ? true : false;
      case RESULTS.LIMITED:
        await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        return false;
      case RESULTS.GRANTED:
        return true;
      case RESULTS.BLOCKED:
        await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        return false;
    }
  } catch (error) {
    console.error(error);
  }
};

export const requestPermissions = async () => {
  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization();
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'whenInUse',
    });
  }

  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }
};
