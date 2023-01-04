import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../components/SimpleHeader';
import Detail from '../component/detail';
import styles from './RequestSummary.style';
import Button from '../../../components/buttons/Button';
import {Camera} from 'react-native-vision-camera';
import {WHITE_COLOR, BLACK_COLOR} from '../../../constants/color';
import {useRequestDetails} from '../../../stores/createRequest';
import {REQUEST_SUMMARY} from '../../../constants/constants';

const RequestSummary = () => {
  const {
    request,
    offer,
    title,
    acceptingApplicants,
    dateAndTime,
    expiryDateAndTime,
    gender,
    age,
    miles,
    venue,
  } = useRequestDetails(state => state);

  const navigation = useNavigation();
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState('not-determined');
  const [microphonePermissionStatus, setMicrophonePermissionStatus] =
    useState('not-determined');
  const [dataValid, setDataValid] = useState(false);

  const assignPermission = async () => {
    setDataValid(false);
    const cameraPermission = await Camera.requestCameraPermission();
    if (cameraPermission === REQUEST_SUMMARY.authorized) {
      setCameraPermissionStatus(cameraPermission);
    }

    const microPermission = await Camera.requestMicrophonePermission();
    if (microPermission === REQUEST_SUMMARY.authorized) {
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
        cameraPermissionStatus === REQUEST_SUMMARY.authorized &&
        microphonePermissionStatus === REQUEST_SUMMARY.authorized
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
        title={REQUEST_SUMMARY.headerTitle}
        onPress={navigation.goBack}
        backgroundColor={WHITE_COLOR}
        titleColor={BLACK_COLOR}
      />
      <ScrollView style={styles.main}>
        <View style={styles.reqCon}>
          <Detail label={REQUEST_SUMMARY.request} detail={request} />

          <Detail label={REQUEST_SUMMARY.title} detail={title} />

          <Detail label={REQUEST_SUMMARY.offer} detail={offer} />

          <Detail
            label={REQUEST_SUMMARY.applicants}
            detail={acceptingApplicants}
          />

          <Detail label={REQUEST_SUMMARY.dateAndTime} detail={dateAndTime} />

          <Detail
            label={REQUEST_SUMMARY.expiryDateAndTime}
            detail={expiryDateAndTime}
          />

          <Detail
            label={REQUEST_SUMMARY.expiryDateAndTime}
            detail={`${gender}, ${age} years, at ${miles} miles`}
          />

          <Detail label={REQUEST_SUMMARY.venue} detail={venue} />
        </View>

        <View style={styles.btnCon}>
          <Button onPress={onPressNext} title={REQUEST_SUMMARY.next} />
        </View>
      </ScrollView>
    </>
  );
};

export default RequestSummary;
