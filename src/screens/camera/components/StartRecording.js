/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {View, Pressable, Animated, Easing} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';
import DotPoints from '../../../constants/DotPoints';
import styles from '../styles';

/*
This is the animated button that we are using in our camera screen.
*/

const StartRecording = ({
  data,
  recording,
  setRecording,
  percentage,
  setPercentage,
  startRecording,
  stopRecording,
  percentageRef,
  disableRecBtn,
  setDisableRecBtn,
}) => {
  const MAX_TIMER = 30;
  const size = 90; // Size of Button
  const strokeWidth = 5; // Outside stroke around button
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);
  var tempTimer;

  const animation = toValue => {
    if (toValue <= MAX_TIMER) {
      return Animated.timing(progressAnimation, {
        toValue,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(
      value => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / MAX_TIMER;

        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [percentage],
    );

    return () => progressAnimation.removeAllListeners();
  });

  const doClearIntervals = timer => {
    if (timer) {
      clearInterval(timer);
      return;
    }
  };

  useEffect(() => {
    let isComplete;

    if (recording) {
      doClearIntervals(tempTimer);

      tempTimer = setInterval(() => {
        if (isComplete) {
          doClearIntervals(tempTimer);
          setRecording(false);
          stopRecording();
          setDisableRecBtn(true);
          return;
        }
        setPercentage(prev => {
          if (prev < MAX_TIMER) {
            percentageRef.current = 1 + prev;
            return 1 + prev;
          }
          isComplete = true;
          return;
        });
      }, 1000);
    } else if (!recording) {
      doClearIntervals(tempTimer);
    }

    return () => clearInterval(tempTimer);
  }, [recording]);

  useEffect(() => {
    startRecording();

    return () => {
      stopRecording();
      clearInterval(tempTimer);
    };
  }, []);

  return (
    <View style={styles.recCon}>
      <Svg width={size} height={size} style={styles.pos}>
        <G rotation="-90" origin={center}>
          <Circle
            ref={progressRef}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            stroke="rgba(156, 88, 243, 1)"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * 25) / MAX_TIMER}
          />
          {data.map((el, index) => {
            if (el.duration) {
              let {cx, cy, id} = DotPoints[el.duration];
              if (cx && cy) {
                return (
                  <Circle
                    key={index + ':' + id}
                    cx={cx}
                    cy={cy}
                    r={3}
                    fill="#fff"
                  />
                );
              }
            }
          })}
        </G>
      </Svg>
      <Pressable
        disabled={disableRecBtn}
        onPress={() => {
          if (!recording) {
            setRecording(true);
            startRecording();
            return;
          }
          setRecording(false);
          stopRecording();
        }}
        style={styles.startRec}
      />
    </View>
  );
};

export default StartRecording;
