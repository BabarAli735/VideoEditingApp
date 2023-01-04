import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Linking, Image} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {STRINGS} from '../../constants/Strings';
import IMAGES from '../../constants/images';
import Button from '../../components/buttons/Button';
import styles from './styles';
import Header from '../../components/SimpleHeader';
import {StackActions} from '@react-navigation/native';

import Loader from '../../components/loader';

const PERMISSION_STATUS = {
  notDetermined: 'not-determined',
  denied: 'denied',
  authorized: 'authorized',
};

const CameraPermissions = () => {
  const navigation = useNavigation();

  const [permissions, setPermissions] = useState({
    camera: PERMISSION_STATUS.notDetermined,
    microphone: PERMISSION_STATUS.notDetermined,
  });

  const requestPermissions = async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    const microPermission = await Camera.requestMicrophonePermission();

    setPermissions({
      camera: cameraPermission,
      microphone: microPermission,
    });
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    if (
      permissions.camera === 'authorized' &&
      permissions.microphone === 'authorized'
    ) {
      navigation.dispatch(StackActions.replace('recordVideo'));
    }
  }, [navigation, permissions.camera, permissions.microphone]);

  const requestAfterDenial = async () => {
    await Linking.openSettings();
  };

  if (
    permissions.camera === PERMISSION_STATUS.denied ||
    permissions.microphone === PERMISSION_STATUS.denied
  ) {
    return (
      <>
        <Header onPress={navigation.goBack} />
        <View style={styles.mainContainer}>
          <View style={styles.centerContainer}>
            <Image style={styles.bellImage} source={IMAGES.notificationBell} />

            <Text style={styles.permissionText}>
              {STRINGS.NEEDS_PERMISSION}
            </Text>
          </View>

          <View style={styles.bottomCon}>
            <Button
              onPress={requestAfterDenial}
              title={STRINGS.GRANT_PERMISSION}
            />
          </View>
        </View>
      </>
    );
  }

  return <Loader />;
};

export default CameraPermissions;
