import React, {useEffect, useState} from 'react';
import {ImageBackground, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import {WHITE} from '../../../constants/color';
import styles from '../styles';

const VideoComponent = ({activeIndex, index, video, thumbnail, stopVideo}) => {
  const [ended, setEnded] = useState(true);

  useEffect(() => {
    if (stopVideo) {
      setEnded(true);
      return;
    }

    if (activeIndex === index) {
      setEnded(false);
    } else {
      setEnded(true);
    }
  }, [activeIndex, index, stopVideo]);

  return (
    <Pressable style={styles.videoPreview} onPress={() => setEnded(!ended)}>
      <ImageBackground
        source={{uri: thumbnail}}
        resizeMode="cover"
        style={styles.videoPreview}>
        <Video
          onEnd={() => setEnded(true)}
          source={{
            uri: video,
          }}
          paused={ended}
          resizeMode={'cover'}
          style={styles.videoPreview}
          useTextureView={false}
          playInBackground={false}
          repeat={true}
          disableFocus={true}
          poster={thumbnail}
          posterResizeMode={'cover'}
        />
        {ended && (
          <Pressable onPress={() => setEnded(false)} style={styles.playBtn}>
            <Icon name={'caret-forward'} size={100} color={WHITE} />
          </Pressable>
        )}
      </ImageBackground>
    </Pressable>
  );
};
export default VideoComponent;
