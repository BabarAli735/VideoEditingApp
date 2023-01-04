import React, {useState} from 'react';
import {View, Modal, Text} from 'react-native';
import VideoComponent from '../home/components/Video';
import RequestInfo from '../home/components/RequestInfo';
import {useNavigation} from '@react-navigation/native';
import styles from '../home/styles';
import LetsConnectButton from '../../components/buttons/LetsConnectButton';
import IconButton from '../../components/buttons/IconButton';
import {ION_ICONS} from '../../constants/icons';
import Icon from 'react-native-vector-icons/Ionicons';
import {APP_PRIMARY_COLOR} from '../../constants/color';
import {SUCCESS} from '../../constants/constants';
import {useRequestDetails} from '../../stores/createRequest';
import {useVideoStore} from '../../stores/video';
import {fetchDBUserLocal} from '../../utils/utils';

const RequestInfoData = () => {
  const {request, offer, title, dateAndTime, miles} = useRequestDetails(
    state => state,
  );
  const {setVideoUrl, url} = useVideoStore(state => state);
  const navigation = useNavigation();
  const [toggleModal, setToggleModal] = useState(false);
  const [userName, setUserName] = useState('');

  const fetchDBUserFromLocal = async () => {
    let {fullName} = await fetchDBUserLocal();
    setUserName(fullName);
  };

  fetchDBUserFromLocal();
  const onPressBack = () => {
    navigation.pop(3);
  };

  const publishReq = () => {
    setToggleModal(true);
    setTimeout(() => {
      setToggleModal(false);
      navigation.navigate('App');
    }, 3000);
  };

  const onToggleModal = () => {
    setToggleModal(!toggleModal);
  };

  return (
    <View style={styles.mainCon}>
      <VideoComponent
        activeIndex={0}
        index={1}
        video={url}
        thumbnail={
          'https://firebasestorage.googleapis.com/v0/b/nooberly-32a6f.appspot.com/o/videos_thumbnail%2Fdcf5251b-4754-499e-a535-9b714dc8b20a?alt=media&token=55ebf16d-1223-41ba-93b4-202cce4e26e0'
        }
      />

      <View style={styles.inline}>
        <IconButton onPress={onPressBack} icon={ION_ICONS.checkOutline} />
      </View>

      <View style={styles.bottomCon}>
        <RequestInfo
          title={`#${title}`}
          name={userName}
          offerTitle={offer}
          requestTitle={request}
          dateAndTime={dateAndTime}
          miles={miles}
          preview
        />

        <LetsConnectButton onPress={publishReq} title={'Publish'} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={toggleModal}
        onRequestClose={onToggleModal}>
        <View style={styles.modalMain}>
          <View style={styles.modalView}>
            <Icon
              name={ION_ICONS.checkmark}
              color={APP_PRIMARY_COLOR}
              size={100}
            />
            <Text style={styles.modalText}>{SUCCESS.success_application}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RequestInfoData;
