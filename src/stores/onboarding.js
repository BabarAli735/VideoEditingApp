import create from 'zustand';

export const useOnboarding = create((set, get) => ({
  id: null,
  address: null,
  auth: null,
  dob: null,
  email: null,
  gender: null,
  profession: null,
  maritalStatus: null,
  sub: null,
  fullName: null,
  getOnboarding: () => {
    return {
      id: get().id,
      address: get().address,
      auth: get().auth,
      dob: get().dob,
      email: get().email,
      gender: get().gender,
      profession: get().profession,
      maritalStatus: get().maritalStatus,
      sub: get().sub,
      fullName: get().fullName,
    };
  },
  getInitialAuth: () => {
    return {
      auth: get().auth,
      email: get().email,
      sub: get().sub,
      id: get().id,
    };
  },
  setInitialAuth: credential => {
    set({
      auth: credential.auth,
      email: credential.email,
      sub: credential.sub,
      id: credential.id,
    });
  },
  setOnboarding: info => {
    set({
      address: info.address,
      auth: info.auth,
      dob: info.dob,
      email: info.email,
      gender: info.gender,
      profession: info.profession,
      maritalStatus: info.maritalStatus,
      sub: info.sub,
      fullName: info.fullName,
    });
  },
  removeOnboarding: () => {
    set({
      address: null,
      auth: null,
      dob: null,
      email: null,
      gender: null,
      profession: null,
      maritalStatus: null,
      sub: null,
      fullName: null,
    });
  },
}));
