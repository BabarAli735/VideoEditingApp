import {View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import SuccessModal from '../../components/successModal';
import {LETS_CONNECT} from '../../constants/constants';
import {useLetsConnect} from '../../stores/letsConnect';
import {saveAppliedReq} from '../../utils/utils';

const Preview = () => {
  const navigation = useNavigation();
  const getReqId = useLetsConnect(state => state.getApplyVideoId);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onNavigateHome = () => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Root',
            state: {
              routes: [{name: 'App'}],
            },
          },
        ],
      });
    };

    getStoreReqId();

    const timeout = setTimeout(async () => {
      setVisible(false);
      onNavigateHome();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [getReqId, getStoreReqId, navigation]);

  const getStoreReqId = useCallback(async () => {
    const id = await getReqId();
    saveAppliedReq(id?.reqId);
  }, [getReqId]);

  return (
    <View>
      <SuccessModal successMsg={LETS_CONNECT.success} visible={visible} />
    </View>
  );
};

export default Preview;
