import AsyncStorage from '@react-native-async-storage/async-storage';
import _, {isNull} from 'lodash';
import moment from 'moment';
import {ASYNC_STORAGE_KEYS, DATE_FORMAT} from '../constants/constants';

export const storeData = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};

export const saveAuthUserLocal = async obj => {
  let authUser = JSON.stringify(obj);
  await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.AUTH_USER, authUser);
};

export const saveAppliedReq = async id => {
  const storedIds = await fetchAppliedReq();
  let temp = isNull(storedIds) ? [...temp, id] : [...storedIds, id];
  let reqId = JSON.stringify(temp);
  await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.REQ_IDS, reqId);
};

export const fetchAppliedReq = async () => {
  const authUser = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.REQ_IDS);
  return JSON.parse(authUser);
};

export const saveDBUserLocal = async obj => {
  let dbUser = JSON.stringify(obj);
  await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.DB_USER, dbUser);
};

export const fetchAuthUserLocal = async () => {
  const authUser = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.AUTH_USER);
  return JSON.parse(authUser);
};

export const fetchDBUserLocal = async () => {
  const dbUser = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.DB_USER);
  return JSON.parse(dbUser);
};

export const getData = async key => {
  return await AsyncStorage.getItem(key);
};

export const cleanStorage = async () => {
  await AsyncStorage.clear();
};

export const dateToString = date => {
  let currentDate = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let convertedToStr = `${month}/${currentDate}/${year}`;
  return convertedToStr;
};

export const unixToDate = unix => {
  return _.isNumber(unix) ? moment.unix(unix).format(DATE_FORMAT) : '';
};

const isCompleted = field => {
  return !_.isEmpty(field) || !_.isNil(field);
};

export const isOnBoardingCompleted = user => {
  const address = user?.address || null;
  const dob = user?.dob || null;
  const fullName = user?.fullName || null;
  const gender = user?.gender || null;
  const introVLog = user?.introVLog || null;
  const maritalStatus = user?.maritalStatus || null;
  const profession = user?.profession || null;

  return (
    isCompleted(address) &&
    isCompleted(dob) &&
    isCompleted(fullName) &&
    isCompleted(gender) &&
    isCompleted(introVLog) &&
    isCompleted(maritalStatus) &&
    isCompleted(profession)
  );
};

export const getHeightByPercentage = (screenHight, percentage) => {
  return (percentage / 100) * screenHight;
};

export const getUserFriendlyAddress = ({results}) => {
  const {
    formatted_address: formattedAddress,
    geometry,
    address_components: addressComponents,
  } = _.first(results);

  let address = [];
  let city = null;
  let state = null;
  let country = null;

  const ADDRESS_TYPES = ['route', 'neighborhood', 'political', 'locality'];

  for (const ac of addressComponents) {
    const {types, long_name} = ac;
    const type = _.first(types);

    if (type === 'country') {
      country = long_name;
    }
    if (type === 'administrative_area_level_1') {
      state = long_name;
    }
    if (type === 'administrative_area_level_2') {
      city = long_name;
    }

    if (_.includes(ADDRESS_TYPES, type)) {
      address = [...address, long_name];
    }
  }

  return {
    address,
    city,
    state,
    country,
    geometry,
    formattedAddress,
  };
};
