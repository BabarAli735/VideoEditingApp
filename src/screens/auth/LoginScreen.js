import React, {useEffect, useState} from 'react';
import {Text, View, SafeAreaView, Platform} from 'react-native';
import logo from '../../assets/logo.png';
import {useNavigation} from '@react-navigation/native';
import styles from './LoginScreen.style';
import LoginButton from '../../components/loginButton/LoginButton';
import FastImage from 'react-native-fast-image';
import {
  ASYNC_STORAGE_KEYS,
  ERROR,
  loginScreen,
} from '../../constants/constants';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import {checkUserInDB} from '../../services/api';
import Loader from '../../components/loader/index';
import PrivacyPolicyCaller from './PrivacyPolicyCalling';
import {GOOGLE_LOGIN_API_KEY} from '@env';
import {
  isOnBoardingCompleted,
  saveAuthUserLocal,
  saveDBUserLocal,
  storeData,
} from '../../utils/utils';
import {WHITE_COLOR, BLACK_COLOR} from '../../constants/color';
import {useOnboarding} from '../../stores/onboarding';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);

  const setInitialAuth = useOnboarding(state => state.setInitialAuth);

  useEffect(() => {
    let apiKey = GOOGLE_LOGIN_API_KEY;
    GoogleSignin.configure({
      webClientId: apiKey,
    });
  }, []);

  const existingUser = user => {
    const isBoarded = isOnBoardingCompleted(user);

    if (!isBoarded) {
      navigation.navigate('PersonalDetails');
    } else {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Root',
            state: {
              routes: [{name: 'App'}],
            },
          },
        ],
      });
    }
  };

  const newUserSignup = () => {
    navigation.navigate('PersonalDetails');
  };

  async function onGoogleButtonPress() {
    try {
      setLoader(true);
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken, user: googleUser} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const {user} = await auth().signInWithCredential(googleCredential);
      const {_user} = user;

      await storeData(ASYNC_STORAGE_KEYS.TOKEN, idToken);
      await storeData(ASYNC_STORAGE_KEYS.USER_ID, _user.uid);

      let dbUser = await checkUserInDB(_user.uid);

      await setInitialAuth({
        email: user.email,
        sub: googleUser.id,
        auth: 'google',
        id: _user.uid,
      });

      await saveDBUserLocal(dbUser);
      await saveAuthUserLocal(_user);

      dbUser ? existingUser(dbUser) : newUserSignup();
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  }

  async function onAppleButtonPress() {
    try {
      setLoader(true);
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      if (!appleAuthRequestResponse.identityToken) {
        throw new Error(ERROR);
      }
      setLoader(true);
      const {identityToken, nonce} = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );
      let {user} = await auth().signInWithCredential(appleCredential);
      const {_user} = user;

      storeData(ASYNC_STORAGE_KEYS.TOKEN, identityToken);
      storeData(ASYNC_STORAGE_KEYS.USER_ID, _user.uid);

      let dbUser = await checkUserInDB(_user.uid);
      let appleUser = appleAuthRequestResponse;

      await setInitialAuth({
        email: user.email,
        sub: appleUser.user,
        auth: 'google',
        id: _user.uid,
      });

      await saveDBUserLocal(dbUser);
      await saveAuthUserLocal(_user);

      dbUser ? existingUser(dbUser) : newUserSignup();
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  }

  return (
    <SafeAreaView style={styles.mainBlock}>
      {loader && <Loader />}
      <View style={styles.logoMainContainer}>
        <View style={styles.logoContainer}>
          <FastImage source={logo} style={styles.logo} />
        </View>
        <View style={styles.horizontalLineContainer}>
          <View style={styles.horizontalLine} />
          <Text style={styles.horizontalLineText}>{loginScreen.TITLE}</Text>
          <View style={styles.horizontalLine} />
        </View>
      </View>
      <View style={styles.loginButtons}>
        <LoginButton
          onPress={onGoogleButtonPress}
          title={loginScreen.GOOGLE_LOGIN_TITLE}
          color={BLACK_COLOR}
          backgroundColor={WHITE_COLOR}
        />

        {Platform.OS === 'ios' ? (
          <AppleButton
            buttonStyle={AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.SIGN}
            style={styles.appleButton}
            cornerRadius={20}
            onPress={onAppleButtonPress}
          />
        ) : null}
      </View>
      <PrivacyPolicyCaller />
    </SafeAreaView>
  );
};

export default LoginScreen;
