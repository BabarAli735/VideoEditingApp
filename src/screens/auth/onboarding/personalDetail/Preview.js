import {View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import SuccessModal from '../../../../components/successModal';
import {ON_BOARDING} from '../../../../constants/constants';

const Preview = () => {
  const navigation = useNavigation();

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

    const timeout = setTimeout(() => {
      onNavigateHome();
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [navigation]);

  return (
    <View>
      <SuccessModal successMsg={ON_BOARDING.success} visible={true} />
    </View>
  );
};

export default Preview;
