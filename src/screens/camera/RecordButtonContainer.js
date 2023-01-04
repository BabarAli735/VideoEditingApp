import React from 'react';
import {SafeAreaView} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import RecordButton from './components/StartRecording';

import styles from './styles';

const RecordButtonContainer = ({
  recordBtnStatus,
  data,
  recording,
  percentage,
  setData,
  setRecording,
  setPercentage,
  startRecording,
  stopRecording,
  camRef,
  percentageRef,
  disableRecBtn,
  setDisableRecBtn,
}) => {
  return (
    <SafeAreaView style={styles.mainBlock}>
      {!recordBtnStatus ? (
        <Svg height="100" width="100">
          <Circle
            cx="50"
            cy="50"
            r="40"
            stroke="rgba(156, 88, 243, 0.54)"
            strokeWidth="5"
            fill="none"
          />
          <Circle cx="50" cy="50" r="34" fill="rgba(156, 88, 243, 1)" />
        </Svg>
      ) : (
        <RecordButton
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
      )}
    </SafeAreaView>
  );
};

export default RecordButtonContainer;
