import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import LetsConnectButton from '../../../components/buttons/LetsConnectButton';
import RequestInfo from './RequestInfo';
import styles from '../styles';
import VideoComponent from './Video';
import {useIsFocused} from '@react-navigation/native';

const RequestInfoData = ({
  refHeight,
  activeIndex,
  index,
  item,
  onConnect,
  clickOnMiles,
  onRequestorProfile,
}) => {
  const {title, videoUrl, user, offerTitle, requestTitle, thumbnail} = item;

  const [stopVideo, setStopVideo] = useState(false);
  const screenIsFocused = useIsFocused();
  useEffect(() => {
    screenIsFocused ? setStopVideo(false) : setStopVideo(true);
  }, [screenIsFocused]);

  return (
    <View style={{height: refHeight}} key={index}>
      <View style={styles.videoContainer}>
        <VideoComponent
          activeIndex={activeIndex}
          index={index}
          video={videoUrl}
          thumbnail={thumbnail}
          stopVideo={stopVideo}
        />
      </View>
      <View style={styles.bottomCon}>
        <RequestInfo
          clickOnMiles={clickOnMiles}
          title={title}
          name={user?.fullName}
          userId={user}
          offerTitle={offerTitle}
          requestTitle={requestTitle}
          onRequestorProfile={onRequestorProfile}
        />
        <LetsConnectButton onPress={() => onConnect(item)} />
      </View>
    </View>
  );
};

export default RequestInfoData;
