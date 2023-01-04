import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  AppState,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';

import styles from '../../camera/styles';
import {STRINGS, MEDIA_TYPE} from '../../../constants/Strings';
import IconButton from '../../../components/buttons/IconButton';
import TickButton from '../../../components/buttons/TickButton';
import CrossButton from '../../../components/buttons/CrossButton';
import RecordButtonContainer from '../../camera/RecordButtonContainer';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import storage from '@react-native-firebase/storage';
import {getImageUrl} from '../../../constants/utils';
import CustomModal from '../../../components/customModal';
import {createUser} from '../../../services/api';
import {isNull} from 'lodash';
import SucccessModal from '../../../components/successModal';
import {APP_RED_COLOR, WHITE_COLOR, LIGHT_RED} from '../../../constants/color';
import {RECORD_PROFILE_VIDEO} from '../../../constants/constants';
import {RECORD_PROFILE_VIDEO_ICONS} from '../../../constants/icons';
import delete_Icon from '../../../assets/delete_Icon.png';

const RecordVideo = ({route}) => {
  const navigation = useNavigation();
  const cameraPermission = Camera.getCameraPermissionStatus();
  const microphonePermission = Camera.getMicrophonePermissionStatus();
  const camRef = useRef(null);
  const devices = useCameraDevices();
  const frontDevice = devices.front;
  const backDevice = devices.back;
  const [frontMode, setIsFrontMode] = useState(true);
  const appState = useRef(AppState.currentState);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [recordBtnStatus, setRecordBtnStatus] = useState(false);
  const [data, setData] = useState([]);
  const [recording, setRecording] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [disableRecBtn, setDisableRecBtn] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState('not-determined');
  const [microphonePermissionStatus, setMicrophonePermissionStatus] =
    useState('not-determined');

  useEffect(() => {
    assignPermission();
  }, []);

  const assignPermission = async () => {
    const acquiredCameraPermission = await Camera.requestCameraPermission();
    if (acquiredCameraPermission === 'authorized') {
      setCameraPermissionStatus(acquiredCameraPermission);
    }

    const microPermission = await Camera.requestMicrophonePermission();
    if (microPermission === 'authorized') {
      setMicrophonePermissionStatus(microPermission);
    }
  };

  const percentageRef = useRef();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
      } else {
        stopRecording();
      }
      appState.current = nextAppState;
    });
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const receivedDataHandler = async () => {
    try {
      if (data && data.length) {
        await uploadVideo(data[0].path);
        resetVideo();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetStack = () => {
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

  const uploadVideo = async videoPath => {
    setLoading(true);
    try {
      let mediaDownloadURL = null;
      let storageType = `${MEDIA_TYPE.PROFILE_VIDEOS}`;
      const uniqueId = uuidv4();
      let ref = `/${storageType}/${uniqueId}`;
      const mediaReference = storage().ref(ref);
      await mediaReference.putFile(videoPath);
      mediaDownloadURL = await getImageUrl(ref);
      let response = await createUser({
        introVLog: mediaDownloadURL,
        id: route.params.userObj.id,
        sub: route.params.userObj.sub,
      });

      if (!isNull(response)) {
        setIsSuccessModal(true);
        setTimeout(() => {
          setIsSuccessModal(false);
          resetStack();
        }, 4000);
      }
    } catch (error) {
      console.error('catch error => ', error.message);
    }
  };

  const startRecording = async () => {
    try {
      await camRef?.current?.startRecording({
        onRecordingFinished: video => {
          setIsTorchOn(false);
          let nData = [
            ...data,
            {
              id: data.length,
              path: video.path,
              duration: percentageRef.current,
              frontCamera: frontMode,
            },
          ];
          setData(nData);
        },
        onRecordingError: error => {
          console.error(error);
        },
      });
    } catch (error) {
      console.error('Error: ' + error);
    }
  };

  const stopRecording = async () => {
    try {
      await camRef?.current?.stopRecording();
    } catch (error) {
      console.error(error);
    }
  };

  if (
    cameraPermission !== 'authorized' &&
    microphonePermission !== 'authorized'
  ) {
    if (frontMode && (frontDevice == null || backDevice == null)) {
      return <></>;
    }
  }

  const goBack = () => {
    navigation.goBack();
  };

  const resetVideo = () => {
    let newArr = data.slice(0, -1);
    let newPercent = 0;

    if (newArr.length > 0) {
      newPercent = newArr[newArr.length - 1].duration;
    }
    setPercentage(newPercent);
    setData(newArr);
    setDisableRecBtn(false);
    setData([]);
    setRecordBtnStatus(false);
    setRecording(false);
    setDisableRecBtn(false);
  };

  const keepVideo = () => {
    setVisible(false);
  };

  const discardVideo = () => {
    resetVideo();
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const flipCameraMode = () => {
    setIsFrontMode(mode => !mode);
  };

  const flipTorchMode = () => {
    setIsTorchOn(torchState => !torchState);
  };

  const startRecodingStatusOn = () => {
    setRecording(true);
    setRecordBtnStatus(true);
  };

  return (
    <SafeAreaView style={styles.mainBlock}>
      <View style={styles.mainBlock}>
        {devices == null ? (
          <></>
        ) : (
          <Camera
            ref={camRef}
            device={frontMode ? frontDevice : backDevice}
            isActive={true}
            torch={isTorchOn === true ? 'on' : 'off'}
            video={true}
            audio={true}
            focusable={true}
            enableZoomGesture={true}
            style={[StyleSheet.absoluteFill]}
          />
        )}
        {isSuccessModal ? (
          <SucccessModal
            successMsg={RECORD_PROFILE_VIDEO.successMsg}
            visible={true}
          />
        ) : null}

        {!recording && (
          <>
            <View style={styles.iconsContainer}>
              <IconButton
                icon={RECORD_PROFILE_VIDEO_ICONS.back}
                onPress={goBack}
              />
              <Text style={styles.recordHeading}>{STRINGS.RECORD}</Text>
            </View>

            <>
              <View style={styles.cameraIcon}>
                <IconButton
                  onPress={flipCameraMode}
                  icon={
                    frontMode
                      ? RECORD_PROFILE_VIDEO_ICONS.camera_outline
                      : RECORD_PROFILE_VIDEO_ICONS.camera_reverse_outline
                  }
                />
              </View>

              {!frontMode && (
                <View style={styles.torchIcon}>
                  <IconButton
                    onPress={flipTorchMode}
                    icon={RECORD_PROFILE_VIDEO_ICONS.flash_light_outline}
                  />
                </View>
              )}
            </>
          </>
        )}

        <View style={styles.camBlock}>
          <Pressable
            activeOpacity={0.6}
            disabled={disableRecBtn}
            onPress={startRecodingStatusOn}>
            <RecordButtonContainer
              recordBtnStatus={recordBtnStatus}
              data={data}
              recording={recording}
              percentage={percentage}
              setData={setData}
              setRecording={setRecording}
              setPercentage={setPercentage}
              startRecording={startRecording}
              stopRecording={stopRecording}
              camRef={camRef}
              percentageRef={percentageRef}
              disableRecBtn={disableRecBtn}
              setDisableRecBtn={setDisableRecBtn}
            />
          </Pressable>
        </View>

        {data.length && !recording ? (
          <View style={styles.cameraBtnBlock}>
            <CrossButton
              onPress={showModal}
              icon={RECORD_PROFILE_VIDEO_ICONS.close_circle_outline}
            />
            <TickButton
              onPress={receivedDataHandler}
              icon={RECORD_PROFILE_VIDEO_ICONS.checkmark}
            />
          </View>
        ) : null}
        <CustomModal
          visible={visible}
          icon={delete_Icon}
          iconBgColor={LIGHT_RED}
          headerTitle={RECORD_PROFILE_VIDEO.discardClip}
          bodyText={RECORD_PROFILE_VIDEO.bodyText}
          leftBtnTitle={RECORD_PROFILE_VIDEO.cancel}
          rightBtnTitle={RECORD_PROFILE_VIDEO.discard}
          btnLeftBorderWidth={1}
          btnLeftBorderColor={APP_RED_COLOR}
          btnLeftColor={APP_RED_COLOR}
          btnRightBgColor={APP_RED_COLOR}
          setVisible={setVisible}
          onPressBtnLeft={keepVideo}
          onPressBtnRight={discardVideo}
        />

        {loading && (
          <View style={styles.playBtn}>
            <ActivityIndicator color={WHITE_COLOR} size={'large'} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default RecordVideo;
