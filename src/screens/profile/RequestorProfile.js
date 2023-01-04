import {useNavigation} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from '../home/styles';
import Loader from '../../components/loader';
import Video from 'react-native-video';
import {WHITE_COLOR} from '../../constants/color';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/SimpleHeader';
import moment from 'moment';

const RequestorProfile = ({route}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [ended, setEnded] = useState(false);
  const vid = useRef(null);

  const onEnded = () => {
    vid.current.seek(0);
    setEnded(true);
  };

  return (
    <>
      {loading && <Loader />}

      <View style={styles.grow}>
        <Pressable style={styles.videoPreview} onPress={() => setEnded(!ended)}>
          <Video
            onEnd={() => onEnded()}
            ref={vid}
            source={{
              uri: route.params.introVLog,
            }}
            paused={ended}
            resizeMode={'cover'}
            style={styles.videoPreview}
            useTextureView={false}
            playInBackground={false}
            repeat={true}
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
            poster={route.params.thumbnail}
            posterResizeMode={'cover'}
            progressUpdateInterval={1000}
          />

          <Header
            onPress={navigation.goBack}
            backgroundColor={'transparent'}
            barStyle="light-content"
          />

          {ended && (
            <Pressable onPress={() => setEnded(false)} style={styles.playBtn}>
              <Icon name={'caret-forward'} size={100} color={WHITE_COLOR} />
            </Pressable>
          )}
        </Pressable>

        <View style={[styles.bottomCon, styles.bMargin]}>
          <Text style={styles.name}>
            {route.params.fullName}, {moment().diff(route.params.dob, 'years')}
          </Text>
          <Text style={styles.whyConnect}>{route.params.profession}</Text>
        </View>
      </View>
    </>
  );
};

export default RequestorProfile;
