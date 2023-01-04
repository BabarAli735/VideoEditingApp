import {View} from 'react-native';
import React from 'react';
import TextField from '../../components/TextField';
import {ScrollView} from 'react-native-gesture-handler';
import UserInfoCard from '../../components/UserInfoCard';
import Distance from '../../components/Distance';
import PrimaryButton from '../../components/primaryButton';
import styles from './LetsConnect.style';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/SimpleHeader';
import {WHITE_COLOR} from '../../constants/color';

const LetsConnect = () => {
  const navigation = useNavigation();

  const onSubmit = () => {
    navigation.navigate('Root', {
      screen: 'acknowledge',
    });
  };

  return (
    <>
      <Header onPress={navigation.goBack} backgroundColor={WHITE_COLOR} />
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.listContainer}>
            <UserInfoCard
              name={'Shifa'}
              age={24}
              maritalStatus={'Single'}
              profession={'UI/UX Engineer'}
              gender={0}
            />
            <View style={styles.detailsContainer}>
              <TextField title="Request" description="Let’s Have Some Coffee" />
              <TextField title="Title" description="Let’s Hangout" />
              <TextField title="Offer" description="I will pay for it" />
              <TextField title="Date, Time" description="Any Day, Any Time" />
              <View style={styles.venueContainer}>
                <View style={styles.venueText}>
                  <TextField title="Venue" description="Civil Officers Mess" />
                </View>
                <View style={styles.venueDistance}>
                  <Distance label="3.0 miles" />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.submitContainer}>
          <View style={styles.submit}>
            <PrimaryButton
              title="Accept Offer"
              backgroundColor={'#7752A2'}
              loginHandler={onSubmit}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default LetsConnect;
