import create from 'zustand';

export const useRequestDetails = create((set, get) => ({
  request: null,
  title: null,
  offer: null,
  acceptingApplicants: null,
  dateAndTime: null,
  expiryDateAndTime: null,
  gender: null,
  age: null,
  miles: null,
  venue: null,

  setRequest: request => set({request}),

  setOffer: offer => set({offer}),

  setRequestDetail: info => {
    set({
      request: info.request,
      title: info.title,
      offer: info.offer,
      acceptingApplicants: info.acceptingApplicants,
      dateAndTime: info.dateAndTime,
      expiryDateAndTime: info.expiryDateAndTime,
      gender: info.gender,
      age: info.age,
      miles: info.miles,
      venue: info.venue,
    });
  },
}));
