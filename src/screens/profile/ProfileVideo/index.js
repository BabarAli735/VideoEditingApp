import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import styles from './ProfileVideo.style';
import 'react-native-get-random-values';
import Video from 'react-native-video';
import Feather from 'react-native-vector-icons/Feather';
import {ProfileVideoIcons} from '../../../constants/icons';
import {WHITE_COLOR} from '../../../constants/color';
import {profileVideo} from '../../../constants/constants';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileVideo = ({route, navigation}) => {
  const [ended, setEnded] = useState(false);
  const [loading, setLoading] = useState(true);

  const afterVideoLoadedFromServer = () => {
    setLoading(false);
  };

  const navigateToRecordVedioScreen = () => {
    navigation.navigate('recordVideo', {
      userObj: route?.params,
    });
  };
  return (
    <>
      <>
        <Pressable style={styles.videoPreview} onPress={() => setEnded(!ended)}>
          <ImageBackground
            source={{uri: route.params.thumbnail}}
            resizeMode="cover"
            style={styles.videoPreview}>
            <Video
              onEnd={() => setEnded(true)}
              source={{
                uri: route.params.mediaDownloadURL,
              }}
              paused={ended}
              resizeMode={'cover'}
              style={styles.videoPreview}
              useTextureView={false}
              playInBackground={false}
              repeat={true}
              disableFocus={true}
              onLoad={afterVideoLoadedFromServer}
              poster={route.params.thumbnail}
              posterResizeMode={'cover'}
            />
            {ended && (
              <Pressable onPress={() => setEnded(false)} style={styles.playBtn}>
                <Icon name={'caret-forward'} size={100} color={WHITE_COLOR} />
              </Pressable>
            )}
          </ImageBackground>
        </Pressable>
      </>
      <View style={styles.changeVideoBtnContainer}>
        <View style={styles.changeVideoBtn}>
          <Feather
            name={ProfileVideoIcons.EDIT}
            size={styles.iconWidth}
            color={WHITE_COLOR}
          />
          <Pressable onPress={navigateToRecordVedioScreen}>
            <Text style={styles.changeVideoBtnText}>
              {profileVideo.CHANGE_VIDEO}
            </Text>
          </Pressable>
        </View>
      </View>
      {loading && (
        <View style={styles.playBtn}>
          <ActivityIndicator color={WHITE_COLOR} size={'large'} />
        </View>
      )}
    </>
  );
};

export default ProfileVideo;
