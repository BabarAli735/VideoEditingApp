import storage from '@react-native-firebase/storage';

export const getImageUrl = async ref => {
  return await storage().ref(ref).getDownloadURL();
};
