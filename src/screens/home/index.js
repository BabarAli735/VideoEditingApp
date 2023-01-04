import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {getRequests} from '../../services/api';
import Loader from '../../components/loader/index';
import RequestInfoData from './components/RequestInfoData';
import {useLetsConnect} from '../../stores/letsConnect';
import styles from './styles';
import {fetchAppliedReq} from '../../utils/utils';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [refHeight, setRefHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [appliedVideos, setAppliedVideos] = useState([]);

  const onViewCallBack = React.useCallback(viewableItems => {
    setActiveIndex(viewableItems?.changed[0]?.index);
  }, []);

  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});
  const setApplyVideoId = useLetsConnect(state => state.setApplyVideoId);

  useEffect(() => {
    getStoredIds();
  }, []);

  const getStoredIds = async () => {
    const storedIds = await fetchAppliedReq();
    setAppliedVideos(storedIds);
  };

  useEffect(() => {
    getRequestsList();
  }, []);

  const getRequestsList = async () => {
    setIsLoading(true);
    try {
      const requestList = await getRequests();
      setRequests(requestList);
    } catch (error) {}
    setIsLoading(false);
  };

  const onConnect = item => {
    setApplyVideoId(item.id);

    navigation.navigate('Root', {
      screen: 'letsConnect',
      params: item,
    });
  };

  const clickOnMiles = item => {
    navigation.navigate('Root', {
      screen: 'mapDirection',
      params: item,
    });
  };

  const onRequestorProfile = user => {
    navigation.navigate('Root', {
      screen: 'requestorProfile',
      params: user,
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <>
        {!appliedVideos?.includes(item?.id) ? (
          <RequestInfoData
            item={item}
            refHeight={refHeight}
            activeIndex={activeIndex}
            index={index}
            clickOnMiles={clickOnMiles}
            onConnect={onConnect}
            appliedVideos={appliedVideos}
            onRequestorProfile={onRequestorProfile}
          />
        ) : null}
      </>
    );
  };

  const getLayout = nativeEvent => {
    const windowHeight = nativeEvent.layout.height;
    setRefHeight(windowHeight);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View
      style={styles.grow}
      onLayout={({nativeEvent}) => getLayout(nativeEvent)}>
      <FlatList
        contentContainerStyle={styles.grow}
        data={requests}
        renderItem={renderItem}
        viewabilityConfig={viewConfigRef.current}
        keyExtractor={item => item.id}
        pagingEnabled
        onViewableItemsChanged={onViewCallBack}
      />
    </View>
  );
};

export default HomeScreen;
