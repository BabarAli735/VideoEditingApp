import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/SimpleHeader';
import {BLACK_COLOR, WHITE_COLOR} from '../../constants/color';
import styles from './reqStyles';
import Detail from './components/Detail';
import Button from '../../components/buttons/Button';
import {Camera} from 'react-native-vision-camera';

const RequestDetail = () => {
  const navigation = useNavigation();
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState('not-determined');
  const [microphonePermissionStatus, setMicrophonePermissionStatus] =
    useState('not-determined');
  const [dataValid, setDataValid] = useState(false);

  const assignPermission = async () => {
    setDataValid(false);
    const cameraPermission = await Camera.requestCameraPermission();
    if (cameraPermission === 'authorized') {
      setCameraPermissionStatus(cameraPermission);
    }

    const microPermission = await Camera.requestMicrophonePermission();
    if (microPermission === 'authorized') {
      setMicrophonePermissionStatus(microPermission);
    }

    setDataValid(true);
  };

  const onPressNext = () => {
    assignPermission();
  };

  useEffect(() => {
    if (dataValid === true) {
      if (
        cameraPermissionStatus === 'authorized' &&
        microphonePermissionStatus === 'authorized'
      ) {
        navigation.navigate('recordVideo', {
          previewData: true,
        });
      } else {
        navigation.navigate('Camera', {
          previewData: true,
        });
      }
    }
  }, [
    cameraPermissionStatus,
    dataValid,
    microphonePermissionStatus,
    navigation,
  ]);

  return (
    <>
      <Header
        title={'Request Details'}
        onPress={navigation.goBack}
        backgroundColor={WHITE_COLOR}
        titleColor={BLACK_COLOR}
        color={BLACK_COLOR}
      />
      <ScrollView style={styles.main}>
        <View style={styles.reqCon}>
          <Detail label={'Request'} detail={'Party Invite'} />

          <Detail label={'Title'} detail={'Let’s Hangout'} />

          <Detail label={'Offer'} detail={'I will pay for it'} />

          <Detail label={'Accepting Applicants'} detail={'01'} />

          <Detail label={'Date & Time'} detail={'Anyday, AnyTime'} />

          <Detail
            label={'Expiry Date & Time'}
            detail={'Mon,  28 Nov 2022  /  4:30 PM'}
          />

          <Detail
            label={'Who can view'}
            detail={'Female, 16-17 years, at 10 miles'}
          />

          <Detail label={'Venue'} detail={'Civil Officers Mess'} />
        </View>

        <View style={styles.btnCon}>
          <Button onPress={onPressNext} title="Next" />
        </View>
      </ScrollView>
    </>
  );
};

export default RequestDetail;
