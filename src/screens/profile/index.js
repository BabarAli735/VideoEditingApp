import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StatusBar, View, Text, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import InputField from '../../components/InputField/index';
import {
  ProfileScreen,
  profileVideo,
  RECORD_PROFILE_VIDEO,
} from '../../constants/constants';
import styles from './Profile.style';
import PrimaryButton from '../../components/primaryButton/index';
import {
  APP_PRIMARY_COLOR,
  APP_RED_COLOR,
  LIGHT_RED,
  WHITE_COLOR,
} from '../../constants/color';
import DatePickerField from '../../components/datePicker/index';
import AddressField from '../../components/addressField/index';
import _, {isNull} from 'lodash';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FastImage from 'react-native-fast-image';
import {ProfileScreenIcons} from '../../constants/icons';
import {checkUserInDB, createUser} from '../../services/api';
import {cleanStorage, fetchDBUserLocal} from '../../utils/utils';
import Loader from '../../components/loader/index';
import GroupSelection from '../../components/GroupSelection';
import {GENDER, MARITAL_STATUS} from '../../constants/constants';
import CustomModal from '../../components/customModal';
import sign_out from '../../assets/sign_out.png';
import delete_icon from '../../assets/delete_Icon.png';

import {GOOGLE_LOGIN_API_KEY} from '@env';
import {useFocusEffect} from '@react-navigation/native';
import {useMaps} from '../../stores/useMaps';
import {useVideoStore} from '../../stores/video';
import SucccessModal from '../../components/successModal';

const ProfileTab = ({navigation}) => {
  const [loader, setLoader] = useState(true);
  const [visible, setVisible] = useState(false);
  const [toggleDatePicker, setToggleDatePicker] = useState(false);
  const [isDeleteAccountBtnPressed, setIsDeleteAccountBtnPressed] =
    useState(false);
  const videoUrl = useVideoStore(state => state.url);
  const removeVideoUrl = useVideoStore(state => state.removeVideoUrl);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const [user, setUser] = useState(null);
  const nonMutableUser = useRef(null);

  const {formattedAddress, removeLocation} = useMaps(state => state);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        try {
          const {id} = await fetchDBUserLocal();
          let fireStoreUser = await checkUserInDB(id);

          setUser(fireStoreUser);
          nonMutableUser.current = fireStoreUser;
        } catch (error) {
          console.error(error);
        }
        setLoader(false);
      };

      if (_.isNull(formattedAddress)) {
        fetchUser();
      }

      return () => {
        removeLocation();
        // Run  somelogisx when user leave screen,
        // Cleaning caches or cancelling subscriptions
      };
    }, [formattedAddress, removeLocation]),
  );

  useEffect(() => {
    if (formattedAddress) {
      setUser(currentState => ({...currentState, address: formattedAddress}));
    }

    if (videoUrl) {
      updateProfileVideo();
    }
  }, [formattedAddress, updateProfileVideo, videoUrl]);

  const updateProfileVideo = useCallback(async () => {
    let response = await createUser({
      introVLog: videoUrl,
      id: user.id,
      sub: user.sub,
    });

    await removeVideoUrl();

    if (!isNull(response)) {
      setIsSuccessModal(true);
      setTimeout(() => {
        setIsSuccessModal(false);
      }, 4000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeVideoUrl, videoUrl]);

  const onToggleDatePicker = () => {
    setToggleDatePicker(currentState => !currentState);
  };

  const onSelectDate = async unix => {
    handleChange('dob', unix);

    const mutatedUser = {...user, dob: unix};
    try {
      await onUpdate(mutatedUser);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (name, value) => {
    setUser(currentState => ({
      ...currentState,
      [name]: value,
    }));
  };

  const onUpdate = async mutatedUser => {
    await createUser(mutatedUser);
  };

  const onSelectGender = async gender => {
    handleChange('gender', gender);

    const mutatedUser = {...user, gender};
    try {
      await onUpdate(mutatedUser);
    } catch (error) {
      console.error(error);
    }
  };
  const onSelectMaritalStatus = async maritalStatus => {
    handleChange('maritalStatus', maritalStatus);
    const mutatedUser = {...user, maritalStatus};
    try {
      await onUpdate(mutatedUser);
    } catch (error) {
      console.error(error);
    }
  };

  const updateOnBlur = async name => {
    const field = user[name];
    let mutatedUser = user;

    if (!_.isEmpty(field)) {
      mutatedUser = {...mutatedUser, [name]: _.trim(field)};

      try {
        await onUpdate(mutatedUser);
      } catch (error) {
        console.error(error);
      }
    } else {
      mutatedUser = {...mutatedUser, [name]: nonMutableUser.current[name]};
    }

    setUser(mutatedUser);
  };

  const navigateToAuth = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Root',
          state: {
            routes: [{name: 'Auth'}],
          },
        },
      ],
    });
  };
  const signOut = async () => {
    try {
      let apiKey = GOOGLE_LOGIN_API_KEY;
      GoogleSignin.configure({
        webClientId: apiKey,
      });

      setVisible(false);
      await auth().signOut();
      if (user.auth === 'google') {
        await GoogleSignin.signOut();
      }

      await cleanStorage();
      navigateToAuth();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAccount = () => {
    setIsDeleteAccountBtnPressed(false);
  };
  const staySignIN = () => {
    setIsDeleteAccountBtnPressed(false);
    setVisible(false);
  };

  const navigateToMaps = () => {
    navigation.navigate('Root', {
      screen: 'Maps',
    });
  };

  const navigateToProfileVideo = () => {
    navigation.navigate('Root', {
      screen: 'ProfileVideoStack',
      params: {
        mediaDownloadURL: user.introVLog,
        id: user.id,
        sub: user.sub,
        thumbnail: user?.thumbnail,
      },
    });
  };

  const tryToDeleteAccount = () => {
    setIsDeleteAccountBtnPressed(true);
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor={WHITE_COLOR} barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrolViewContainer}>
        <View style={styles.videoThumbnailContainer}>
          <FastImage
            style={styles.thumbnail}
            source={{
              uri: user?.thumbnail, // this can be replaced with exact url
            }}
            resizeMode={'cover'}
          />
          <Pressable onPress={navigateToProfileVideo} style={styles.playIcon}>
            <Fontisto
              name={ProfileScreenIcons.PLAY}
              size={styles.playIconWidth}
              color={WHITE_COLOR}
            />
          </Pressable>
        </View>

        {isSuccessModal ? (
          <SucccessModal
            successMsg={RECORD_PROFILE_VIDEO.successMsg}
            visible={true}
          />
        ) : null}

        <InputField
          onChangeText={handleChange}
          name="fullName"
          value={user?.fullName || ''}
          onBlur={updateOnBlur}
          title={ProfileScreen.FULL_NAME}
          placeholder={ProfileScreen.FULL_NAME_PLACEHOLDER}
          icon={ProfileScreen.FULL_NAME_ICON}
          width={styles.fullNameIconWidth}
          height={styles.fullNameIconHeight}
        />
        <InputField
          onChangeText={handleChange}
          name="profession"
          value={user?.profession || ''}
          onBlur={updateOnBlur}
          isDate
          title={ProfileScreen.PROFESSION}
          placeholder={ProfileScreen.PROFESSION_PLACEHOLDER}
          icon={ProfileScreen.PROFESSION_ICON}
          width={styles.professionIconWidth}
          height={styles.professionIconHeight}
        />
        <DatePickerField
          title={ProfileScreen.DATE_OF_BIRTH}
          placeholder={ProfileScreen.DATE_OF_BIRTH_PLACEHOLDER}
          value={user?.dob || ''}
          onSelect={onSelectDate}
          onToggle={onToggleDatePicker}
          toggle={toggleDatePicker}
          icon={ProfileScreen.DATE_OF_BIRTH_ICON}
          width={styles.datePickerIconWidth}
          height={styles.datePickerIconHeight}
        />

        <AddressField
          navigationHandler={navigateToMaps}
          value={user?.address || ''}
          title={ProfileScreen.ADDRESS}
          placeholder={ProfileScreen.ADDRESS_PLACEHOLDER}
          icon={ProfileScreen.ADDRESS_ICON}
          width={styles.addressIconWidth}
          height={styles.addressIconHeight}
        />

        <Text style={styles.text}>{ProfileScreen.GENDER}</Text>
        <View style={styles.radioButtonRow}>
          <GroupSelection
            groups={_.values(GENDER)}
            onSelect={onSelectGender}
            selected={user?.gender || ''}
          />
        </View>
        <Text style={styles.text}>{ProfileScreen.RELATIONSHIP_STATUS}</Text>
        <View style={styles.radioButtonRow}>
          <GroupSelection
            groups={_.values(MARITAL_STATUS)}
            onSelect={onSelectMaritalStatus}
            selected={user?.maritalStatus || ''}
          />
        </View>

        <View style={styles.ButtonRow}>
          <PrimaryButton
            loginHandler={() => setVisible(true)}
            title={ProfileScreen.PRIMARY_BTN_SIGN_OUT}
            width={styles.primaryButtonWidth}
            backgroundColor={APP_PRIMARY_COLOR}
            color={WHITE_COLOR}
          />
          <Pressable onPress={tryToDeleteAccount} style={styles.deleteAccount}>
            <Text style={styles.deleteAccountText}>
              {ProfileScreen.DELETE_ACCOUNT}
            </Text>
          </Pressable>
        </View>
        <CustomModal
          visible={isDeleteAccountBtnPressed}
          icon={delete_icon}
          iconBgColor={LIGHT_RED}
          headerTitle={profileVideo.DELETE_ACCOUNT_HEADER}
          bodyText={profileVideo.DELETE_ACCOUNT_BODY}
          headerTextColor={APP_RED_COLOR}
          isDeletePopup={isDeleteAccountBtnPressed}
          leftBtnTitle={profileVideo.CANCEL}
          rightBtnTitle={profileVideo.DELETE}
          btnLeftBorderWidth={1}
          btnLeftBorderColor={APP_RED_COLOR}
          btnLeftColor={APP_RED_COLOR}
          btnRightBgColor={APP_RED_COLOR}
          setVisible={setVisible}
          onPressBtnLeft={staySignIN}
          onPressBtnRight={deleteAccount}
        />

        <CustomModal
          visible={visible}
          icon={sign_out}
          iconBgColor={'#E6D1FF'}
          headerTitle={profileVideo.SIGN_OUT_HEADER}
          isDeletePopup={isDeleteAccountBtnPressed}
          leftBtnTitle={profileVideo.CANCEL}
          rightBtnTitle={profileVideo.SIGN_OUT}
          btnLeftBorderWidth={1}
          btnLeftBorderColor={APP_PRIMARY_COLOR}
          btnLeftColor={APP_PRIMARY_COLOR}
          btnRightBgColor={APP_PRIMARY_COLOR}
          setVisible={setVisible}
          onPressBtnLeft={staySignIN}
          onPressBtnRight={signOut}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileTab;
