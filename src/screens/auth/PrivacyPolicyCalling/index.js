import {Text, View, Pressable} from 'react-native';
import React from 'react';
import styles from './PrivacyPolicy.style';
import {privacyPolicyCaller} from '../../../constants/constants';

const PrivacyPolicyCaller = () => {
  const goToTermsScreen = () => {};
  const goToPolicyScreen = () => {};

  return (
    <View style={styles.bottomTextBlock}>
      <View style={styles.bottomTextAlign}>
        <Text style={styles.bottomTextSimple}>
          {privacyPolicyCaller.CONTINUE_TO_AGREE}
        </Text>
        <Pressable onPress={goToTermsScreen}>
          <Text style={styles.bottomTextLink}>{privacyPolicyCaller.TERMS}</Text>
        </Pressable>
      </View>
      <View style={styles.bottomTextAlign}>
        <Text style={styles.bottomTextSimple}>
          {privacyPolicyCaller.ACKNOWLEDGE}
        </Text>
        <Pressable onPress={goToPolicyScreen}>
          <Text style={styles.bottomTextLink}>
            {privacyPolicyCaller.PRIVACY_POLICY}
          </Text>
        </Pressable>
        <Text style={styles.bottomTextSimple}>
          {privacyPolicyCaller.LEARN_HOW}
        </Text>
      </View>
      <Text style={styles.bottomTextSimple}>
        {privacyPolicyCaller.COLLECT_AND_SHARE_DATA}
      </Text>
    </View>
  );
};

export default PrivacyPolicyCaller;
