import React, {useEffect, useState} from 'react';
import {StatusBar, View, Text, ScrollView, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import _, {trim} from 'lodash';

import styles from './PersonalDetail.style';

import {useVideoStore} from '../../../../stores/video';
import {useOnboarding} from '../../../../stores/onboarding';

import {
  GENDER,
  MARITAL_STATUS,
  PersonalScreen,
} from '../../../../constants/constants';
import {APP_PRIMARY_COLOR, WHITE_COLOR} from '../../../../constants/color';
import {createUser} from '../../../../services/api';

import InputField from '../../../../components/InputField/index';
import PrimaryButton from '../../../../components/primaryButton';
import DatePickerField from '../../../../components/datePicker';
import AddressField from '../../../../components/addressField';
import GroupSelection from '../../../../components/GroupSelection';
import {
  saveDBUserLocal,
  fetchAuthUserLocal,
  fetchDBUserLocal,
} from '../../../../utils/utils';
import {useMaps} from '../../../../stores/useMaps';

const PersonalDetail = ({route}) => {
  const navigation = useNavigation();
  const [toggleDatePicker, setToggleDatePicker] = useState(false);

  // global stores
  const videoUrl = useVideoStore(state => state.url);
  const videoThumbnail = useVideoStore(state => state.thumbnail);
  const removeVideoUrl = useVideoStore(state => state.removeVideoUrl);
  const setOnboarding = useOnboarding(state => state.setOnboarding);
  const getOnboarding = useOnboarding(state => state.getOnboarding);
  const getInitialAuth = useOnboarding(state => state.getInitialAuth);
  const {formattedAddress, removeLocation} = useMaps(state => state);

  const [user, setUser] = useState({
    id: null,
    fullName: null,
    profession: null,
    gender: null,
    maritalStatus: null,
    dob: null,
    address: null,
    auth: null,
    email: null,
    introVLog: null,
    sub: null,
  });

  useEffect(() => {
    const onNavigateHome = () => {
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
    };

    const initializeUser = async () => {
      try {
        const data = await getOnboarding();
        let boardedUser = {
          ...data,
          introVLog: videoUrl,
          thumbnail: videoThumbnail,
        };
        const dbUser = await createUser(boardedUser);

        await saveDBUserLocal(dbUser);

        onNavigateHome();
      } catch (error) {
        Alert.alert('', error.message, [
          {text: 'OK', onPress: () => console.info('OK Pressed')},
        ]);
      }
    };

    if (videoUrl) {
      initializeUser();
    }

    return () => {
      removeVideoUrl();
    };
  }, [getOnboarding, navigation, removeVideoUrl, videoThumbnail, videoUrl]);

  const handleChange = (name, value) => {
    setUser(currentState => ({
      ...currentState,
      [name]: value,
    }));
  };

  const onSelectGender = g => {
    handleChange('gender', g);
  };

  const onSelectMaritalStatus = m => {
    handleChange('maritalStatus', m);
  };

  const navigateToMaps = () => {
    navigation.navigate('Maps');
  };

  const submitData = async () => {
    let {email, auth, sub, id} = getInitialAuth();
    let address = route?.params?.userAddress;

    if (
      _.isEmpty(user.fullName) ||
      _.isEmpty(user.profession) ||
      _.isEmpty(user.gender) ||
      _.isEmpty(user.maritalStatus) ||
      !_.isNumber(user.dob) ||
      _.isNull(formattedAddress)
    ) {
      Alert.alert('', PersonalScreen.ALERT_TITLE, [
        {text: 'OK', onPress: () => console.info('OK Pressed')},
      ]);
    } else {
      const info = {
        ...user,
        profession: trim(user.profession),
        address: trim(formattedAddress),
        dob: user.dob,
        gender: trim(user.gender),
        maritalStatus: trim(user.maritalStatus),
        email,
        sub,
        auth,
        fullName: trim(user.fullName),
        id,
      };

      setOnboarding(info);
      await removeLocation();
      navigation.navigate('Root', {
        screen: 'camera',
      });
    }
  };

  const onSelectDate = unix => {
    handleChange('dob', unix);
  };

  const onToggleDatePicker = () => {
    setToggleDatePicker(currentState => !currentState);
  };

  const updateOnBlur = async name => {
    const field = user[name];
    const mutatedUser = {...user, [name]: _.trim(field)};

    setUser(mutatedUser);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor={WHITE_COLOR} barStyle="dark-content" />
      <View>
        <Text style={styles.headerTitle}>{PersonalScreen.APPHEADER_TITLE}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrolViewContainer}>
        <InputField
          onChangeText={handleChange}
          onBlur={updateOnBlur}
          name="fullName"
          value={user?.fullName || ''}
          title={PersonalScreen.FULL_NAME}
          placeholder={PersonalScreen.FULL_NAME_PLACEHOLDER}
          icon={PersonalScreen.FULL_NAME_ICON}
          width={20}
          height={20}
        />

        <InputField
          onChangeText={handleChange}
          onBlur={updateOnBlur}
          name="profession"
          value={user?.profession || ''}
          isDate
          title={PersonalScreen.PROFESSION}
          placeholder={PersonalScreen.PROFESSION_PLACEHOLDER}
          icon={PersonalScreen.PROFESSION_ICON}
          width={25}
          height={20}
        />

        <DatePickerField
          title={PersonalScreen.DATE_OF_BIRTH}
          placeholder={PersonalScreen.DATE_OF_BIRTH_PLACEHOLDER}
          value={user.dob}
          onSelect={onSelectDate}
          onToggle={onToggleDatePicker}
          toggle={toggleDatePicker}
          icon={PersonalScreen.DATE_OF_BIRTH_ICON}
          width={25}
          height={25}
        />

        <AddressField
          navigationHandler={navigateToMaps}
          value={formattedAddress || ''}
          title={PersonalScreen.ADDRESS}
          placeholder={PersonalScreen.ADDRESS_PLACEHOLDER}
          icon={'location'}
          width={16.8}
          height={25.22}
        />

        <Text style={styles.text}>{PersonalScreen.GENDER}</Text>
        <View style={styles.radioButtonRow}>
          <GroupSelection
            groups={_.values(GENDER)}
            onSelect={onSelectGender}
            selected={user?.gender || ''}
          />
        </View>

        <Text style={styles.text}>{PersonalScreen.RELATIONSHIP_STATUS}</Text>
        <View style={styles.radioButtonRowForRelationShipStatus}>
          <GroupSelection
            groups={_.values(MARITAL_STATUS)}
            onSelect={onSelectMaritalStatus}
            selected={user?.maritalStatus || ''}
          />
        </View>

        <View style={styles.ButtonRow}>
          <PrimaryButton
            title={PersonalScreen.PRIMARYBTN_Cancel}
            width={styles.primaryBtnWidth}
            color={APP_PRIMARY_COLOR}
          />
          <PrimaryButton
            loginHandler={submitData}
            title={PersonalScreen.PRIMARYBTN_DONE}
            width={styles.primaryBtnWidth}
            backgroundColor={APP_PRIMARY_COLOR}
            color={WHITE_COLOR}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalDetail;
