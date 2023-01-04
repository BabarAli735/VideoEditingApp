import create from 'zustand';
import {getUserFriendlyAddress} from '../utils/utils';

const initialState = {
  address: [],
  city: null,
  state: null,
  country: null,
  geometry: null,
  formattedAddress: null,
};

export const useMaps = create(set => ({
  ...initialState,
  setLocation: location => {
    const formattedLocation = getUserFriendlyAddress(location);
    set({...formattedLocation});
  },
  removeLocation: () => set(initialState),
}));
