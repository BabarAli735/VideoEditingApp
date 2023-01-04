import {View} from 'react-native';
import React, {useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';

import map from 'lodash/map';

import PrimaryButton from '../../components/primaryButton';
import styles from './Acknowledge.style';
import {APP_PRIMARY_COLOR} from '../../constants/color';
import StarPoint from '../../components/StarPoint';
import logo from '../../assets/images/logo_without.png';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/SimpleHeader';
import AbsoluteBackImage from '../../components/AbsoluteBackImage';

import {COMMANDMENTS} from '../../constants/Strings';
import {useVideoStore} from '../../stores/video';
import {useLetsConnect} from '../../stores/letsConnect';
import _ from 'lodash';

const Acknowledge = ({route}) => {
  const navigation = useNavigation();
  const videoUrl = useVideoStore(state => state.url);
  const removeVideoUrl = useVideoStore(state => state.removeVideoUrl);
  const setSuccessMessage = useLetsConnect(state => state.setSuccessMessage);

  const onSubmit = () => {
    if (route.params) {
      const {navigator, screen} = route.params;
      navigation.navigate(navigator, {
        screen,
      });
    } else {
      navigation.navigate('Root', {
        screen: 'camera',
      });
    }
  };

  useEffect(() => {
    if (videoUrl && _.isNil(route.params)) {
      const onConnected = async () => {
        await removeVideoUrl();
        setSuccessMessage('Your application has been submitted successfully!');
        navigation.navigate('Root', {
          screen: 'letsConnectPreview',
        });
      };

      if (videoUrl) {
        onConnected();
      }
    }
  }, [navigation, removeVideoUrl, setSuccessMessage, videoUrl, route]);

  return (
    <>
      <Header
        title={'Acknowledge'}
        onPress={navigation.goBack}
        backgroundColor={APP_PRIMARY_COLOR}
        barStyle="light-content"
      />
      <View style={styles.container}>
        <AbsoluteBackImage src={logo} />
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.listContainer}>
            {map(COMMANDMENTS, (point, index) => (
              <StarPoint label={point} key={index} />
            ))}
          </View>
        </ScrollView>
        <View style={styles.submitContainer}>
          <View style={styles.submit}>
            <PrimaryButton
              loginHandler={onSubmit}
              title="Acknowledged"
              backgroundColor={'#ffff'}
              color={APP_PRIMARY_COLOR}
              on
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default Acknowledge;
