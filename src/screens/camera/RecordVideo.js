import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  AppState,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';

import styles from './styles';
import {STRINGS} from '../../constants/Strings';
import IconButton from '../../components/buttons/IconButton';
import TickButton from '../../components/buttons/TickButton';
import CrossButton from '../../components/buttons/CrossButton';
import RecordButtonContainer from './RecordButtonContainer';
import Header from '../../components/SimpleHeader';

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
    if (data && data.length) {
      const newData = data;
      resetVideo();
      navigation.navigate('Root', {
        screen: 'preview',
        params: {
          video: newData,
          requestDetailPreview: route?.params?.previewData,
        },
      });
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
    await camRef?.current?.stopRecording();
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

        {!recording && (
          <>
            <Header
              title={STRINGS.RECORD}
              onPress={goBack}
              backgroundColor="transparent"
            />
            <>
              <View style={styles.cameraIcon}>
                <IconButton
                  onPress={() => setIsFrontMode(mode => !mode)}
                  icon={frontMode ? 'camera-outline' : 'camera-reverse-outline'}
                />
              </View>

              {!frontMode && (
                <View style={styles.torchIcon}>
                  <IconButton
                    onPress={() => setIsTorchOn(torchState => !torchState)}
                    icon={'flashlight-outline'}
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
            onPress={() => {
              setRecording(true);
              setRecordBtnStatus(true);
            }}>
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
            <CrossButton onPress={resetVideo} icon="close-circle-outline" />
            <TickButton onPress={receivedDataHandler} icon="checkmark" />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default RecordVideo;
