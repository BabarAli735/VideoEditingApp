import React, {useEffect, useState} from 'react';
import {createThumbnail} from 'react-native-create-thumbnail';
import {View, ActivityIndicator, Pressable, FlatList} from 'react-native';
import styles from './styles';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import Video from 'react-native-video';
import {MEDIA_TYPE} from '../../constants/Strings';
import PrimaryButton from '../../components/primaryButton';
import storage from '@react-native-firebase/storage';
import {getImageUrl} from '../../constants/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import {
  APP_PRIMARY_COLOR,
  APP_RED_COLOR,
  LIGHT_RED,
  WHITE,
  WHITE_COLOR,
} from '../../constants/color';
import {useVideoStore} from '../../stores/video';
import {VideoManager} from 'react-native-video-manager';
import CustomModal from '../../components/customModal';
import {RECORD_PROFILE_VIDEO} from '../../constants/constants';
import delete_Icon from '../../assets/delete_Icon.png';
import {FFmpegKit, FFmpegKitConfig, FFprobeKit, Log, ReturnCode} from 'ffmpeg-kit-react-native';
const PreviewRecording = ({route, navigation}) => {
  let videoUri = route?.params?.video[0].path;
  let videoData = route?.params?.video[0];
  let requestDetailPreview = route?.params?.requestDetailPreview;
  let path = '';
  const [ended, setEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [iseDiscarding, setIseDiscarding] = useState(false);

  const {
    setVideoUrl,
    url: videoUrl,
    removeVideoUrl,
  } = useVideoStore(state => state);

  const setThumbnailUrl = useVideoStore(state => state.setThumbnailUrl);

  useEffect(() => {
    if (videoUrl) {
      if (requestDetailPreview === true) {
        navigation.navigate('previewReqData');
      } else {
        navigation.pop(3);
      }
    }
    
    var path1 = `${RNFS.DownloadDirectoryPath}/temp1.ts`;
    var path2 = `${RNFS.DownloadDirectoryPath}/temp2.ts`;
  
    // var path1 = RNFS.DocumentDirectoryPath + '/test1.txt';
   ;


  }, [navigation, requestDetailPreview, videoUrl]);

  const uploadVideo = async () => {
    var path = `${RNFS.DownloadDirectoryPath}/output13.mp4`;
    var writepath = `${RNFS.DownloadDirectoryPath}/testabcdefg.txt`;

   
  //  RNFS.write(writepath,`file 'content://com.android.providers.downloads.documents/document/raw%3A%%2Femulated%2F0%2FDownload%2Foutput6.mp4' file 'content://com.android.providers.downloads.documents/document/raw%3A%2Fstorage%2Femulated%2F0%2FDownload%2Foutput7.mp4'`).then(r=>{
  //   console.log('file written');2Fstorage
  //  })

//     FFmpegKit.execute(`ffmeg -f concat -safe 0 -i ${writepath} -c copy ${path}`).then(async (session) => {
//       const returnCode = await session.getReturnCode();
    
//       if (ReturnCode.isSuccess(returnCode)) {
    
//       console.log('==================Successs');
    
//       } else if (ReturnCode.isCancel(returnCode)) {
    
//         // CANCEL
//       console.log('==================Cancel');
        
    
//       } else {
    
//         // ERROR
//         console.log('==================Error');
    
//       }
  
// })
       
// FFmpegKitConfig.selectDocumentForRead('*/*').then(uri => {
// console.log(uri);
// });
  

FFprobeKit.listFFprobeSessions().then(sessionList => {
  sessionList.forEach(async session => {
    console.log('session',session);
    const sessionId = session.getSessionId();
  });
});
 

    // setLoading(true);

    // try {
    //   getThumbnail();

    //   let storageType = `${MEDIA_TYPE.PROFILE_VIDEOS}`;
    //   const uniqueId = uuidv4();
    //   let ref = `/${storageType}/${uniqueId}`;
    //   const mediaReference = storage().ref(ref);
    //   await mediaReference.putFile(videoUri);
    //   const mediaDownloadURL = await getImageUrl(ref);
    //   setVideoUrl(mediaDownloadURL);
    // } catch (error) {
    //   console.error('catch error => ', error.message);
    // }
    // setLoading(false);
  };

  const getThumbnail = async () => {
    try {
      let thumbnail = await thumbnailGenration(videoData);

      let storageType = `${MEDIA_TYPE.VIDEOS_THUMBNAIL}`;
      const uniqueId = uuidv4();
      let ref = `/${storageType}/${uniqueId}`;
      const mediaReference = storage().ref(ref);
      await mediaReference.putFile(thumbnail);
      const thumbnailUrl = await getImageUrl(ref);
      setThumbnailUrl(thumbnailUrl);
      return;
    } catch (e) {
      return null;
    }
  };

  const thumbnailGenration = async param => {
    try {
      let response = await createThumbnail({url: param.path, timeStamp: 0});
      if (response.path) {
        return response.path;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const goBack = () => {
    navigation.pop(3);
  };

  const onCancel = () => {
    setIseDiscarding(true);
  };

  const onKeepVideo = () => {
    setIseDiscarding(false);
  };

  const onDiscard = async () => {
    await removeVideoUrl();
    goBack();
  };

  const onLoadVideo = () => {
    setLoading(false);
  };

  return (
    <>
      <View style={styles.mainBlock}>
        <Video
          onLoad={onLoadVideo}
          onEnd={() => setEnded(true)}
          source={{
            uri: videoUri,
          }}
          paused={ended}
          resizeMode={'cover'}
          style={styles.videoPreview}
        />

        {ended && !loading && (
          <Pressable onPress={() => setEnded(!ended)} style={styles.playBtn}>
            <Icon name={'caret-forward'} size={100} color={WHITE} />
          </Pressable>
        )}

        {ended && (
          <View style={styles.submitContainer}>
            <View style={styles.submitSubContainer}>
              <View style={styles.submit}>
                <PrimaryButton
                  title="Cancel"
                  backgroundColor={'transparent'}
                  loginHandler={onCancel}
                  width={130}
                  borderColor={WHITE_COLOR}
                  disabled={!ended}
                />
              </View>
              <View style={styles.submit}>
                <PrimaryButton
                  title="Submit"
                  backgroundColor={APP_PRIMARY_COLOR}
                  loginHandler={uploadVideo}
                  width={130}
                  disabled={!ended}
                />
              </View>
            </View>
          </View>
        )}

        {loading && (
          <View style={styles.playBtn}>
            <ActivityIndicator color={WHITE} size={'large'} />
          </View>
        )}
      </View>
      <CustomModal
        visible={iseDiscarding}
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
        onPressBtnLeft={onKeepVideo}
        onPressBtnRight={onDiscard}
        isDeletePopup
      />
    </>
  );
};

export default PreviewRecording;
