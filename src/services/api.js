import {GEOCODING_API_KEY} from '@env';
import _ from 'lodash';
import {BASE_URL, GEOCODE_BASE_URL} from '../config/index';

export const geoCodeApi = async (latitude, longitude) => {
  const response = await fetch(
    `${GEOCODE_BASE_URL}${latitude},${longitude}&key=${GEOCODING_API_KEY}`,
  );
  const result = await response.json();
  const formattedAddress = _.first(result.results)?.formatted_address;
  return formattedAddress;
};

export const geoCodeApiNew = async (latitude, longitude) => {
  const response = await fetch(
    `${GEOCODE_BASE_URL}${latitude},${longitude}&key=${GEOCODING_API_KEY}`,
  );

  if (!response.ok) {
    throw new Error(response.statusText || 'Something went wrong');
  }

  return await response.json();
};

export const checkUserInDB = async id => {
  const response = await fetch(`${BASE_URL}getUserProfile?id=${id}`);

  if (!response.ok) {
    throw new Error(response.statusText || 'Something went wrong');
  }

  let result = await response.json();
  return result;
};

export const createUser = async body => {
  let response = await fetch(`${BASE_URL}setUpdateUserProfile`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: body,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText || 'Something went wrong');
  }

  const result = await response.json();
  return result;
};

export const getRequests = async () => {
  let response = await fetch(`${BASE_URL}getRequests`);

  if (!response.ok) {
    throw new Error(response.statusText || 'Something went wrong');
  }

  const result = await response.json();
  return result;
};

export const getCategories = async () => {
  const response = await fetch(`${BASE_URL}getCategories`);
  return await response.json();
};

export const getSubCategories = async id => {
  const response = await fetch(`${BASE_URL}getSubCategories?categoryId=${id}`);
  return await response.json();
};

export const getSubSubCategories = async (categoryId, subCategoryId) => {
  const response = await fetch(
    `${BASE_URL}getSubSubCategories?categoryId=${categoryId}&subCategoryId=${subCategoryId}`,
  );
  return await response.json();
};

export const getSubSubSubCategories = async () => {
  const response = await fetch(`${BASE_URL}getSubSubSubCategories`);

  return await response.json();
};
